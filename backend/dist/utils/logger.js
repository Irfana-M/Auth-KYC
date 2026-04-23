"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = {
    info: (message) => console.log(`[INFO] ${new Date().toISOString()} ${message}`),
    error: (message, error) => {
        if (error instanceof Error) {
            console.error(`[ERROR] ${new Date().toISOString()} ${message} - ${error.message}`);
        }
        else {
            console.error(`[ERROR] ${new Date().toISOString()} ${message}`, error ?? '');
        }
    },
};
exports.default = logger;
