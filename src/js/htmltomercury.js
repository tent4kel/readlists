import { createMercuryArticle, CORS_PROXY } from "./utils.js";

/**
 * Processes HTML content and converts it into a MercuryArticle.
 * @param {string} html - The HTML content to process.
 * @returns {Promise<MercuryArticle>}
 */
export function processArticleHtml(html) {
    // The URL parameter is not used since the HTML is directly provided
    return createMercuryArticle("", html);
}