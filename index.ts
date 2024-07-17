
import { events } from "bdsx/event";

console.log('[plugin:Bdsx] allocated');

events.serverOpen.on(()=>{
    console.log('[plugin:Bdsx] launching');
});

events.serverClose.on(()=>{
    console.log('[plugin:Bdsx] closed');
});

