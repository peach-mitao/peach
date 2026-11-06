/* The denial line shared by Docker first-run setup and access setup: the source is not the local machine or the LAN, or it carried a proxy-forwarding header (ADR-0149).
 * The server's 403 body carries the same line (`routes_auth.FIRST_ACCESS_DENIED`). */
export const FIRST_ACCESS_DENIED = 'Open Peach from the machine that hosts it or from the same LAN to finish setup, or set PEACH_ACCESS_PASSWORD when the container starts.';
