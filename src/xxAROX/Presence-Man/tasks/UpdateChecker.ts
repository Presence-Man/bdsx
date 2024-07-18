import * as JSON5 from "json5";
import * as semver from "semver";
import { WebUtils } from "../../utils";
import { PresenceMan } from "../PresenceMan";
import { Gateway } from "../entity/Gateway";

export class UpdateChecker {
    public static running: boolean = false;
    public static task: null|NodeJS.Timeout = null;


    public static start(): void{
        const cb = () => {
            if (UpdateChecker.running) return;
            UpdateChecker.running = true;
            UpdateChecker.performUpdate();
        };
        cb();
        UpdateChecker.task = setInterval(cb, 1000 *60 *60); // NOTE: 60 minutes
    }
    public static stop(): void{
        if (UpdateChecker.task) clearInterval(UpdateChecker.task);
        UpdateChecker.running = false;
    }

    private static readonly LATEST_VERSION_URL: string = "https://raw.githubusercontent.com/Presence-Man/bdsx/main/package.json";
    private static async performUpdate(): Promise<void>{
        try {
            const body = (await WebUtils.get(UpdateChecker.LATEST_VERSION_URL)).body.trim();
            console.log("`" + body + "`");
            const latest = JSON5.parse(body).version;
            const needUpdate = semver.gt(latest, PresenceMan.static.getPKG().version);
            if (needUpdate) {
                PresenceMan.static.logger.info("Your version of Presence-Man is out of date. To avoid issues please update it to the latest version!");
                PresenceMan.static.logger.info("Download: " + Gateway.getUrl() + "/downloads/bdsx");
                UpdateChecker.stop()
            } else PresenceMan.static.logger.debug("Presence-Man is up to date!")
        } catch (e) {
            
            PresenceMan.static.logger.error("Error while fetching latest version: ", e);
        } finally {
            UpdateChecker.running = false;
        }
    }
}