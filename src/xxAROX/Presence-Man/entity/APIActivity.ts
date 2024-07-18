/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */

import { ActivityType } from "./ActivityType";

export class APIActivity {
	client_id: null|string;
	type: ActivityType;
	state: string | null;
	details: string | null;
	end: number | null;
	large_icon_key: string | null;
	large_icon_text: string | null;
	small_icon_key: string | null;
	small_icon_text: string | null;
	party_max_player_count: number | null;
	party_player_count: number | null;

	constructor(
		type: ActivityType,
		state?: string,
		details?: string,
		end?: number,
		large_icon_key?: string,
		large_icon_text?: string,
		small_icon_key?: string,
		small_icon_text?: string,
		party_max_player_count?: number,
		party_player_count?: number,
		client_id?: string
	) {
		this.type = type;
		this.state = state || null;
		this.details = details || null;
		this.end = end || null;
		this.large_icon_key = large_icon_key || null;
		this.large_icon_text = large_icon_text || null;
		this.small_icon_key = small_icon_key || null;
		this.small_icon_text = small_icon_text || null;
		this.party_max_player_count = party_max_player_count || null;
		this.party_player_count = party_player_count || null;
		this.client_id = client_id || null;
	}

	serialize(): any {
		return {
			client_id: this.client_id,
			type: this.type,
			state: this.state,
			details: this.details,
			end: this.end,
			large_icon_key: this.large_icon_key,
			large_icon_text: this.large_icon_text,
			party_max_player_count: this.party_max_player_count,
			party_player_count: this.party_player_count,
		};
	}

	static deserialize(json: any): APIActivity {
		const activity = new APIActivity(ActivityType.PLAYING);
		activity.client_id = json.client_id;
        // @ts-ignore
		activity.type = json.type ? ActivityType[(json.type || "playing").toUpperCase()] : ActivityType.PLAYING;
		activity.state = json.state ? json.state : json.state || null;
		activity.details = json.details ? json.details : json.details || null;
		activity.end = json.end ? json.end : json.end || null;
		activity.large_icon_key = json.large_icon_key ? json.large_icon_key : json.large_icon_key || null;
		activity.large_icon_text = json.large_icon_text ? json.large_icon_text : json.large_icon_text || null;
		activity.party_max_player_count = json.party_max_player_count ? json.party_max_player_count : json.party_max_player_count || null;
		activity.party_player_count = json.party_player_count ? json.party_player_count : json.party_player_count || null;
		return activity;
	}
}
