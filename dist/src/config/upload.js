"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const imageUtils_1 = require("../utils/imageUtils");
// Ensure upload directory exists
const uploadDir = 'uploads/images';
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const subfolder = req.params.folder || 'general';
        const fullPath = `uploads/images/${subfolder}`;
        // Create subfolder if it doesn't exist
        if (!fs_1.default.existsSync(fullPath)) {
            fs_1.default.mkdirSync(fullPath, { recursive: true });
        }
        cb(null, fullPath);
    },
    filename: (req, file, cb) => {
        cb(null, (0, imageUtils_1.generateFileName)(file.fieldname, file.originalname));
    }
});
exports.upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (allowedTypes.some(type => file.mimetype === type)) {
            cb(null, true);
        }
        else {
            cb(new Error('Invalid file type. Only images allowed.'));
        }
    }
});
