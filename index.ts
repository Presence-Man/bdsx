import { events } from "bdsx/event";
import { PresenceMan } from "./src/xxAROX/Presence-Man/PresenceMan";

console.log('[Presence-Man:Bdsx] allocated');
const PresenceManPlugin = PresenceMan.static;
events.serverStop.on(() => PresenceManPlugin.onDisable());

events.serverOpen.on(async ()=>{
    await PresenceManPlugin.onEnable();
    console.log('[Presence-Man:Bdsx] launching');
});

