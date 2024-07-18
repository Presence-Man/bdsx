import { ServerInstance, DedicatedServer } from "bdsx/bds/server";
import * as JSON5 from "json5";
import { events } from "bdsx/event";
import { bedrockServer } from "bdsx/launcher";
import { copyFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { cwd } from "process";
import { Logger } from "../Logger";

export class PresenceMan {
    private static _static: PresenceMan;
    public static get static(): PresenceMan{
        return PresenceMan._static;
    }
    private config: PresenceManConfig;
    public readonly logger: Logger;

    public constructor() {
        PresenceMan._static = this;
        this.logger = new Logger("Presence-Man", s => s.blue);
        this.logger.debug(this.getDataFolder())
        if (!existsSync(this.getDataFolder())) mkdirSync(this.getDataFolder(), {recursive: true});
        this.onLoad();
        bedrockServer.afterOpen().then(() => this.onEnable());
        this.getEventManager().serverStop.on(() => this.onDisable());
    }

    public getDataFolder(...args: string[]): string{
        return join(cwd(), "plugins", "Presence-Man", ...args);
    }

    public getConfig(reload: boolean = false): PresenceManConfig{
        if (reload || !this.config) this.config = JSON5.parse(this.getDataFolder("config.jsonc")) as PresenceManConfig;
        return this.config;
    }

    public saveResouce(filename: string, overwrite: boolean = false): void{
        const from = join(__dirname, "../", "../", "../", "resources", filename);
        if (!existsSync((from)) || overwrite) copyFileSync(from, this.getDataFolder(filename));
    }

    private onLoad(): void{
        this.logger.info("Loading..");
        this.saveResouce("README.md");
    }

    public async onEnable(): Promise<void>{
        this.logger.info("Enabled!")
        
    }

    public onDisable(): void{
        this.logger.info("Disabling..");
    }

    public getServer(): ServerInstance{
        return bedrockServer.serverInstance;
    }

    /**
     * getEventManager
     */
    public getEventManager() {
        return events;
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