import { events } from "bdsx/event";
import { PresenceMan } from "./src/xxAROX/Presence-Man/PresenceMan";

console.log('[plugin:Bdsx] allocated');
const PresenceManPlugin = PresenceMan.static;
(async () => {
    await PresenceManPlugin.onEnable();
    events.serverStop.on(() => PresenceManPlugin.onDisable());
});

events.serverOpen.on(()=>{
    console.log('[plugin:Bdsx] launching');
});

events.serverClose.on(()=>{
    console.log('[plugin:Bdsx] closed');
});

