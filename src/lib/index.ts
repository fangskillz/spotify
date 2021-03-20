import fetch, { Response } from "node-fetch";
import qs from "querystring";

//interfaces
import {
    ConstructorProps,
    SpotifyCredsProps,
    SpotifyCallbackRes
} from "../interfaces/index";

class Spotify {
    private client_id: string;
    private client_secret: string;
    private redirect_uri: string;
    private scope?: string;

    constructor(self: ConstructorProps) {
        this.client_id = self.client_id;
        this.client_secret = self.client_secret;
        this.redirect_uri = self.redirect_uri;
        this.scope = self.scope;
    };


    createAuth(creds: SpotifyCredsProps): string {
        return `https://accounts.spotify.com/authorize?client_id=${this.client_id}&repsonse_type=${this.response_type}&redirect_uri=${encodeURIComponent(this.redirect_uri)}&scope=${encodeURIComponent(this.scope)}`;
    };

    async handleCallback(code: string): Promise<SpotifyCallbackRes> {
        const res: any = await fetch(`https://accounts.spotify.com/api/token`, {
            method: "post",
            headers: {
                "Authorization": `Basic ${Buffer.from(`${this.client_id}:${this.client_secret}`).toString('base64')}`
            },
            body: qs.stringify({
                code,
                grant_type: "authorization_code",
                redirect_uri: `${this.redirect_uri}`
            })
        });
        return {
            data: {
                access_token: res.body.access_token,
                refresh_token: res.body.refresh_token
            }
        };
    };
};