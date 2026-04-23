"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const db_1 = require("./config/db");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const kyc_routes_1 = __importDefault(require("./routes/kyc.routes"));
console.log('=== ENVIRONMENT CHECK ===');
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUD_NAME);
console.log('CLOUDINARY_API_KEY:', process.env.API_KEY ? 'LOADED' : 'MISSING');
console.log('CLOUDINARY_API_SECRET:', process.env.API_SECRET ? 'LOADED' : 'MISSING');
console.log('========================');
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const corsOptions = {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)(corsOptions));
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use('/api/users', user_routes_1.default);
app.use("/api", kyc_routes_1.default);
app.get('/', (req, res) => {
    res.send('✅ MERN Auth + KYC API is running');
});
app.use(errorHandler_1.default);
const start = async () => {
    await (0, db_1.connectDB)();
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
};
start();
