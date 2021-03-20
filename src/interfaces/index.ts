export interface ConstructorProps {
    client_id: string;
    client_secret: string;
    redirect_uri: string;
    scope?: string;
}

export interface SpotifyCredsProps {
    client_id: string;
    response_type: "code" | "token";
    redirect_uri: string;
    scope?: string;
};

export interface SpotifyCallbackRes {
    data: {
        access_token: string;
        refresh_token: string;
    }
}