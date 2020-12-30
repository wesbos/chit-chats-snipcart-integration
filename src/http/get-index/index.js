"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const data_1 = __importDefault(require("@begin/data"));
async function handler(req) {
    const person = await data_1.default.set({
        table: 'people',
        name: 'Scott',
        age: Math.floor(Math.random() * 100),
    });
    const people = await data_1.default.get({
        table: 'people',
        limit: 100,
        begin: 'Scott',
    });
    return {
        headers: {
            'content-type': 'text/html; charset=utf8',
            'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
        },
        statusCode: 200,
        body: JSON.stringify(people),
    };
}
exports.handler = handler;
