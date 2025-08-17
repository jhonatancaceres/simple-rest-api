"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFileName = exports.getMimeType = void 0;
const path_1 = __importDefault(require("path"));
const getMimeType = (filename) => {
    const ext = path_1.default.extname(filename).toLowerCase();
    const mimeTypes = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.webp': 'image/webp'
    };
    return mimeTypes[ext] || 'application/octet-stream';
};
exports.getMimeType = getMimeType;
const generateFileName = (fieldname, originalname) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path_1.default.extname(originalname);
    return `${fieldname}-${uniqueSuffix}${extension}`;
};
exports.generateFileName = generateFileName;
