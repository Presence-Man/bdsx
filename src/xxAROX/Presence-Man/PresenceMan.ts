import { ServerInstance } from "bdsx/bds/server";

import { events } from "bdsx/event";
import { bedrockServer } from "bdsx/launcher";
import { join } from "path";

export class PresenceMan {
    private static _static: PresenceMan;
    public static get static(): PresenceMan{
        return PresenceMan._static || new PresenceMan();
    }

    private constructor() {
        PresenceMan._static = this;
        this.onLoad();
    }

    public getDataFolder(...args: string[]): string{
        return join(...args);
    }

    private onLoad(): void{
        console.log(this.getDataFolder("config.json"));
        
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