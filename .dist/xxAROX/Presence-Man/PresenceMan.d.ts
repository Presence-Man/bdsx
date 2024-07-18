import { ServerInstance } from "bdsx/bds/server";
import { events } from "bdsx/event";
import { Logger } from "../Logger";
export declare class PresenceMan {
    private static _static;
    static get static(): PresenceMan;
    private config;
    readonly logger: Logger;
    constructor();
    getDataFolder(...args: string[]): string;
    getConfig(reload?: boolean): PresenceManConfig;
    private onLoad;
    saveResouce(filename: string, overwrite?: boolean): void;
    onEnable(): Promise<void>;
    onDisable(): void;
    getServer(): ServerInstance;
    /**
     * getEventManager
     */
    getEventManager(): typeof events;
}
interface PresenceManConfig {
    token: string;
    client_id: string;
    server: string;
    update_skin: boolean;
    default_presence: {
        enabled: boolean;
        state: null | string;
        details: null | string;
        large_image_key: null | string;
        large_image_text: null | string;
    };
}
export {};
