import { ServerInstance, DedicatedServer } from "bdsx/bds/server";

import { events } from "bdsx/event";
import { bedrockServer } from "bdsx/launcher";
import { copyFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { cwd } from "process";
import JSON5 from "json5";

export class PresenceMan {
    private static _static: PresenceMan;
    public static get static(): PresenceMan{
        return PresenceMan._static || new PresenceMan();
    }

    private constructor() {
        PresenceMan._static = this;
        if (!existsSync(this.getDataFolder())) mkdirSync(this.getDataFolder(), {recursive: true});
        this.onLoad();
    }

    public getDataFolder(...args: string[]): string{
        return join(cwd(), "plugins", "Presence-Man", ...args);
    }

    public getConfig(reload: boolean = false): PresenceManConfig{
        this.config = JSON5.parse(this.getDataFolder("config.yml"));
    }

    private onLoad(): void{
        this.saveResouce("README.md");
    }

    public saveResouce(filename: string, overwrite: boolean = false): void{
        const from = join(__dirname, "../", "../", "../", "resources", filename);
        if (!existsSync((from)) || overwrite) copyFileSync(from, this.getDataFolder(filename));
    }

    public async onEnable(): Promise<void>{
        
    }

    public onDisable(): void{
        
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