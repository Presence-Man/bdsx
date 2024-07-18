import { PresenceMan } from "../PresenceMan";

export class APIRequest {
    public static readonly URI_UPDATE_PRESENCE = "/api/v1/servers/update_presence";
    public static readonly URI_UPDATE_SKIN = "/api/v1/images/skins/update";
    public static readonly URI_UPDATE_OFFLINE = "/api/v1/servers/offline";
    public static readonly URI_GET_SKIN = "/api/v1/images/skins/";
    public static readonly URI_GET_HEAD = "/api/v1/images/heads/";

    private headers: {[key: string]: string} = {};
    private _body: {[key: string]: string} = {};
    private postMethod: boolean;
    private uri: string;

    constructor(uri: string, body: {[key: string]: string}, postMethod: boolean) {
        this.headers['Content-Type'] = 'application/json';
        this.uri = uri;
        this._body = body;
        this.postMethod = postMethod;
        this.header('Serversoftware', "BDSX");
    }

    getUri(): string{
        return this.uri;
    }

    header(key: string, value: string): APIRequest{
        this.headers[key] = value;
        return this;
    }

    body(key: string, value: string): APIRequest{
        this._body[key] = value;
        return this;
    }

    isPostMethod(): boolean{
        return this.postMethod;
    }
}