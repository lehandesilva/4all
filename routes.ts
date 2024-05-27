/**
 * An array of routes that are accessible to the public
 * The routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/", "/search"];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to the homepage
 * @type {string[]}
 */
export const authRoutes = ["/login", "/signUp"];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix used for API authentication
 * @type {string}
 */
export const apiAuthPrefix = "api/auth";

/**
 * The default redirect path after logged in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";
