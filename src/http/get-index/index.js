"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
async function handler(req) {
    console.log('hey');
    return {
        headers: {
            'content-type': 'text/html; charset=utf8',
            'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
        },
        statusCode: 200,
        body: JSON.stringify({ ok: true }),
    };
}
exports.handler = handler;
