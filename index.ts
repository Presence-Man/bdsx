import { ActivityType } from "./src/xxAROX/Presence-Man/entity/ActivityType";
import { APIActivity, DefaultActivities } from "./src/xxAROX/Presence-Man/entity/APIActivity";
import { PresenceMan } from "./src/xxAROX/Presence-Man/PresenceMan";
new PresenceMan();

const getSkinURL = PresenceMan.static.getSkinURL;
const getHeadURL = PresenceMan.static.getHeadURL;
const setActivity = PresenceMan.static.setActivity;

export {
    APIActivity,
    ActivityType,
    DefaultActivities,

    getSkinURL,
    getHeadURL,
    setActivity
};