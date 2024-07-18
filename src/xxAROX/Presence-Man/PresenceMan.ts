import { MinecraftPacketIds } from "bdsx/bds/packetids";
import { ServerInstance, DedicatedServer } from "bdsx/bds/server";
import * as JSON5 from "json5";
import {decay} from "bdsx/decay";
import { events } from "bdsx/event";
import { fsutil } from "bdsx/fsutil";
import { bedrockServer } from "bdsx/launcher";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { cwd } from "process";
import { Logger } from "../Logger";
import Collection from "../Collection";
import { Gateway } from "./entity/Gateway";
import { APIActivity, DefaultActivities } from "./entity/APIActivity";
import { UpdateChecker } from "./tasks/UpdateChecker";
import { APIRequest } from "./entity/APIRequest";
import { Player } from "bdsx/bds/player";
import { WebUtils } from "../utils";
import { getServers } from "dns";
import { SerializedSkin } from "bdsx/bds/skin";
import { PacketIdToType } from "bdsx/bds/packets";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";

export class PresenceMan {
    private static _static: PresenceMan;
    public static get static(): PresenceMan{
        return PresenceMan._static;
    }
    private config: PresenceManConfig;
    public readonly logger: Logger;

    //#region plugin base
    public constructor() {
        if (PresenceMan._static) return;
        PresenceMan._static = this;
        this.logger = new Logger("Presence-Man", s => s.blue);
        if (!existsSync(this.getDataFolder())) mkdirSync(this.getDataFolder(), {recursive: true});
        this.onLoad();
        bedrockServer.afterOpen().then(() => this.onEnable());
        this.getEventManager().serverStop.on(() => this.onDisable());
    }

    public getPKG(): any{
        return JSON.parse(readFileSync(join(__dirname, "../", "../", "../", "package.json")).toString());
    }

    public getDataFolder(...args: string[]): string{
        return join(cwd(), "..", "plugin_data", "Presence-Man", ...args);
    }

    public getConfig(reload: boolean = false): PresenceManConfig{
        if (!this.saveResouce("config.jsonc")) writeFileSync(this.getDataFolder("config.jsonc"), "{\n\t\n}");
        if (reload || !this.config) this.config = JSON5.parse(readFileSync(this.getDataFolder("config.jsonc")).toString()) as PresenceManConfig;
        return this.config;
    }

    public async saveResouce(filename: string, overwrite: boolean = false): Promise<boolean>{
        const from = join(__dirname, "../", "../", "../", "resources", filename);
        if (!existsSync(from)) return false;
        if (!existsSync(this.getDataFolder(filename)) || overwrite) await fsutil.copyFile(from, this.getDataFolder(filename));
        return existsSync(this.getDataFolder(filename));
    }

    public getServer(): ServerInstance{
        return bedrockServer.serverInstance;
    }

    public getEventManager() {
        return events;
    }
    //#endregion

    public static readonly presences: Collection<String, APIActivity> = new Collection();
    public static default_activity: APIActivity;

    private async onLoad(): Promise<void>{
        await this.saveResouce("README.md", true);
        await this.saveResouce("config.jsonc");
        await Gateway.fetchGatewayInformation();
    }

    public async onEnable(): Promise<void>{
        
        if (this.getConfig().default_presence.enabled) {
            events.playerJoin.on(event => {
                console.log("getAddress: ", event.player.getNetworkIdentifier().getAddress());
                this.setActivity(event.player, DefaultActivities.activity());
            })
        }
        if (this.getConfig().update_skin) {
            events.packetBefore(MinecraftPacketIds.PlayerSkin).on((packet, networkIdentifier) => {
                const player = networkIdentifier.getActor();
                if (player !== null) PresenceMan.static.saveSkin(player, packet.skin);
            });
        }
        events.playerLeft.on(event => this.offline(event.player));
        UpdateChecker.start();
    }

    public onDisable(): void{
        UpdateChecker.stop();
    }

    public getHeadURL(xuid: string, gray: boolean = false, size: number = 64): string{
        size = !size ? Math.min(512, Math.max(16, size)) : 64;
        let url = APIRequest.URI_GET_HEAD + xuid;
        if (size !== undefined) url += `?size=${size}`;
        if (gray) url += size !== undefined ? "&gray" : "?gray";
        return Gateway.getUrl() + url;
    }

    public getSkinURL(xuid: string, gray: boolean = false){
        return Gateway.getUrl() + APIRequest.URI_GET_SKIN + xuid + (gray ? "?gray" : "");
    }

    public async setActivity(player: Player, activity: null|APIActivity): Promise<void>{
        if (bedrockServer.isClosed()) return;
        if (decay.isDecayed(player)) {
            this.logger.error("Player " + player.getName() + " is decayed!");
            return;
        }
        const xuid = player.getXuid();
        const ip = player.getNetworkIdentifier().getAddress();
        const gamertag = player.getName();
        if (await WebUtils.isFromSameHost(ip)) return;

        const cfg = this.getConfig();
        const request = new APIRequest(APIRequest.URI_UPDATE_PRESENCE, {}, true);
        request.header("Token", cfg.token);

        request.body("ip", ip);
        request.body("xuid", xuid);
        request.body("server", cfg.server);
        activity!.client_id = cfg.client_id;
        request.body("api_activity", activity?.serialize());

        const response = await request.request();
        if (response.code === 200) {
            if (!activity) PresenceMan.presences.delete(xuid);
            else PresenceMan.presences.set(player.getXuid(), activity);
        } else PresenceMan.static.logger.warn(`Failed to update presence for ${gamertag}: ${JSON.parse(response.body).message}`);
    }

    /**
     * @internal
     */
    public async offline(player: Player): Promise<void>{
        if (decay.isDecayed(player)) {
            this.logger.error("Player " + player.getName() + " is decayed!");
            return;
        }
        const xuid = player.getXuid();
        const ip = player.getNetworkIdentifier().getAddress();
        if (await WebUtils.isFromSameHost(ip)) return;

        const cfg = this.getConfig();
        const request = new APIRequest(APIRequest.URI_UPDATE_OFFLINE, {}, true);
        request.header("Token", cfg.token);

        request.body("ip", ip);
        request.body("xuid", xuid);

        await request.request();
        PresenceMan.presences.delete(xuid);
    }
    /**
     * @internal
     */
    public async saveSkin(player: Player, skin?: SerializedSkin) {
        if (decay.isDecayed(player)) {
            this.logger.error("Player " + player.getName() + " is decayed!");
            return;
        }
        if (!skin) skin = player.getSkin();
        const xuid = player.getXuid();
        const ip = player.getNetworkIdentifier().getAddress();
        const gamertag = player.getName();
        // TODO:
        //      1. Convert skin to png file
    }
}
interface PresenceManConfig {
    token: string
    client_id: string
    server: string
    update_skin: boolean
    
    default_presence: {
        enabled: boolean
        state: null|string
        details: null|string
        large_image_key: null|string
        large_image_text: null|string
    }
}