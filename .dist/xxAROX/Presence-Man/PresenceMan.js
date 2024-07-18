"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresenceMan = void 0;
const JSON5 = require("json5");
const event_1 = require("bdsx/event");
const launcher_1 = require("bdsx/launcher");
const fs_1 = require("fs");
const path_1 = require("path");
const process_1 = require("process");
const Logger_1 = require("../Logger");
class PresenceMan {
    static get static() {
        return PresenceMan._static;
    }
    constructor() {
        PresenceMan._static = this;
        this.logger = new Logger_1.Logger("Presence-Man", s => s.blue);
        this.logger.debug(this.getDataFolder());
        if (!(0, fs_1.existsSync)(this.getDataFolder()))
            (0, fs_1.mkdirSync)(this.getDataFolder(), { recursive: true });
        this.onLoad();
        launcher_1.bedrockServer.afterOpen().then(() => this.onEnable());
        this.getEventManager().serverStop.on(() => this.onDisable());
    }
    getDataFolder(...args) {
        return (0, path_1.join)((0, process_1.cwd)(), "plugins", "Presence-Man", ...args);
    }
    getConfig(reload = false) {
        if (reload || !this.config)
            this.config = JSON5.parse(this.getDataFolder("config.jsonc"));
        return this.config;
    }
    onLoad() {
        this.saveResouce("README.md");
        this.logger.info("Loading..");
    }
    saveResouce(filename, overwrite = false) {
        const from = (0, path_1.join)(__dirname, "../", "../", "../", "resources", filename);
        if (!(0, fs_1.existsSync)((from)) || overwrite)
            (0, fs_1.copyFileSync)(from, this.getDataFolder(filename));
    }
    async onEnable() {
        this.logger.info("Enabled!");
    }
    onDisable() {
        this.logger.info("Disabling..");
    }
    getServer() {
        return launcher_1.bedrockServer.serverInstance;
    }
    /**
     * getEventManager
     */
    getEventManager() {
        return event_1.events;
    }
}
exports.PresenceMan = PresenceMan;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJlc2VuY2VNYW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMveHhBUk9YL1ByZXNlbmNlLU1hbi9QcmVzZW5jZU1hbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwrQkFBK0I7QUFDL0Isc0NBQW9DO0FBQ3BDLDRDQUE4QztBQUM5QywyQkFBeUQ7QUFDekQsK0JBQTRCO0FBQzVCLHFDQUE4QjtBQUM5QixzQ0FBbUM7QUFFbkMsTUFBYSxXQUFXO0lBRWIsTUFBTSxLQUFLLE1BQU07UUFDcEIsT0FBTyxXQUFXLENBQUMsT0FBTyxDQUFDO0lBQy9CLENBQUM7SUFJRDtRQUNJLFdBQVcsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQzNCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxlQUFNLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFBO1FBQ3ZDLElBQUksQ0FBQyxJQUFBLGVBQVUsRUFBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFBRSxJQUFBLGNBQVMsRUFBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUUsRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztRQUMxRixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZCx3QkFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRU0sYUFBYSxDQUFDLEdBQUcsSUFBYztRQUNsQyxPQUFPLElBQUEsV0FBSSxFQUFDLElBQUEsYUFBRyxHQUFFLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFTSxTQUFTLENBQUMsU0FBa0IsS0FBSztRQUNwQyxJQUFJLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNO1lBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQXNCLENBQUM7UUFDL0csT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFTyxNQUFNO1FBQ1YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUNqQyxDQUFDO0lBRU0sV0FBVyxDQUFDLFFBQWdCLEVBQUUsWUFBcUIsS0FBSztRQUMzRCxNQUFNLElBQUksR0FBRyxJQUFBLFdBQUksRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3pFLElBQUksQ0FBQyxJQUFBLGVBQVUsRUFBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksU0FBUztZQUFFLElBQUEsaUJBQVksRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQzNGLENBQUM7SUFFTSxLQUFLLENBQUMsUUFBUTtRQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUVoQyxDQUFDO0lBRU0sU0FBUztRQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFTSxTQUFTO1FBQ1osT0FBTyx3QkFBYSxDQUFDLGNBQWMsQ0FBQztJQUN4QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxlQUFlO1FBQ2xCLE9BQU8sY0FBTSxDQUFDO0lBQ2xCLENBQUM7Q0FDSjtBQXhERCxrQ0F3REMifQ==