"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
console.log("CLOUDINARY CHECK:");
console.log("CLOUD NAME:", process.env.CLOUD_NAME);
console.log("API KEY:", process.env.API_KEY);
console.log("API SECRET:", process.env.API_SECRET);
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
exports.default = cloudinary_1.v2;
