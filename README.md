# BDSX
> [!IMPORTANT]
> This plugin is not full tested yet.

## How to install?
1.  Go into the `./bdsx-root/plugins` folder and open a new terminal
2.  Type `git clone https://github.com/Presence-Man/presence-man-bdsx.git` and press enter
3.  Start server `./bdsx-root/bdsx.<bat | sh>`
4.  Let the server boot, then type /stop *(Now the important files are created in bdsx-root/plugin_data)*
5.  Go into `./bdsx-root/plugin_data/Presence-Man` and configure config.jsonc (.jsonc --> json with comments)
6.  Start server again `./bdsx-root/bdsx.<bat | sh>`
7.  If you done everything correctly, users that are using our [application](https://github.com/presence-man/application/releases) should have an activity with your server now!

> [!TIP]
> For more information about presence-man configuration, check out on our [discord](https://presence-man.com/discord) > [#getting-started-as-a-server-owner](https://discord.com/channels/1128740911183036448/1257708145405595770)

<details>
<summary>API for developers:</summary>

```ts
import * as PresenceMan from "@bdsx/presence-man-bdsx";
import {
    APIActivity, ActivityType, DefaultActivities,
    getSkinURL, getHeadURL, setActivity
}, * as PresenceMan from "./index";

// NOTE: Update activity
// Also works: const activity_oop = new APIActivity();
const activity_default = PresenceMan.DefaultActivities.activity();
const activity_ends_in_15mins = PresenceMan.DefaultActivities.ends_in(Date.now() +(1000 *60 *15), activity_default);
const activity_players_left = PresenceMan.DefaultActivities.players_left(9, 16, activity_ends_in_15mins);
PresenceMan.setActivity(player, activity_players_left); // update
PresenceMan.setActivity(player, null); // clear

// NOTE: Get skin/head url
const gray = false;
const size = 128; // 128x128
PresenceMan.getSkinURL(player, gray);
PresenceMan.getHeadURL(player, !gray, scale);
```

#### Also add presence-man dependency,when using it in another plugin/s:
```json
"dependencies": {
    "@bdsx/presence-man-bdsx": "^0.1.0"
}
```
> *But you have to install it via git clone*

</details>