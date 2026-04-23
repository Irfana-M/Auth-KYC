"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const inversify_1 = require("inversify");
const user_models_1 = __importDefault(require("../models/user.models"));
let UserRepository = class UserRepository {
    async findByEmail(email) {
        return user_models_1.default.findOne({ email });
    }
    async create(userData) {
        const user = new user_models_1.default(userData);
        return user.save();
    }
    async findAllPaginated(page = 1, limit = 10, search = '') {
        page = Math.max(1, page);
        limit = Math.max(10, limit);
        const skip = (page - 1) * limit;
        const query = search ? { email: { $regex: search, $options: 'i' } } : {};
        const [users, total] = await Promise.all([
            user_models_1.default.find(query)
                .select('-password')
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 }),
            user_models_1.default.countDocuments(query),
        ]);
        console.log(users);
        return {
            users,
            total,
            pages: Math.ceil(total / limit),
        };
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, inversify_1.injectable)()
], UserRepository);
