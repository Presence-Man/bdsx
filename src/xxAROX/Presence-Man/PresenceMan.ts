import { ServerInstance, DedicatedServer } from "bdsx/bds/server";
import * as JSON5 from "json5";
import { events } from "bdsx/event";
import { fsutil } from "bdsx/fsutil";
import { bedrockServer } from "bdsx/launcher";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { cwd } from "process";
import { Logger } from "../Logger";
import Collection from "../Collection";
import { Gateway } from "./entity/Gateway";
import { APIActivity } from "./entity/APIActivity";
import { UpdateChecker } from "./tasks/UpdateChecker";

export class PresenceMan {
    private static _static: PresenceMan;
    public static get static(): PresenceMan{
        return PresenceMan._static;
    }
    private config: PresenceManConfig;
    public readonly logger: Logger;

    //#region plugin base
    public constructor() {
        PresenceMan._static = this;
        this.logger = new Logger("Presence-Man", s => s.blue);
        if (!existsSync(this.getDataFolder())) mkdirSync(this.getDataFolder(), {recursive: true});
        this.onLoad();
        bedrockServer.afterOpen().then(() => this.onEnable());
        this.getEventManager().serverStop.on(() => this.onDisable());
    }

    public getPKG(): any{
        return readFileSync(JSON.parse(join(__dirname, "../", "../", "../", "package.json")));
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

    public static presences: Collection<String, APIActivity> = new Collection();
    public static default_activity: APIActivity;

    private async onLoad(): Promise<void>{
        this.logger.info("Loading..");
        await this.saveResouce("README.md", true);
        await this.saveResouce("config.jsonc");
        await Gateway.fetchGatewayInformation();
    }

    public async onEnable(): Promise<void>{
        UpdateChecker.start();
        this.logger.info("Enabled!");
    }

    public onDisable(): void{
        UpdateChecker.stop();
        this.logger.info("Disabling..");
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