export function _tokenExpired(expiration: number): boolean {
    return Math.floor(new Date().getTime() / 100) >= expiration;
}
