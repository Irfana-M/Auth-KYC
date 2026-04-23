"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapUserToDTO = void 0;
const mapUserToDTO = (user) => {
    return {
        id: user._id.toString(),
        email: user.email,
        kycSubmitted: !!user.kycSubmitted,
    };
};
exports.mapUserToDTO = mapUserToDTO;
