"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageController = void 0;
const imageService_1 = require("../services/imageService");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const prisma_1 = require("../lib/prisma");
const imageUtils_1 = require("../utils/imageUtils");
exports.imageController = {
    uploadImage: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }
            const savedImage = yield imageService_1.imageService.createElement(Object.assign(Object.assign({}, req.file), { originalName: req.file.originalname }));
            res.json({
                message: 'Image uploaded successfully',
                image: {
                    id: savedImage.id,
                    filename: savedImage.filename,
                    url: `/api/images/${req.params.folder || 'general'}/${req.file.filename}`
                }
            });
        }
        catch (error) {
            console.error('Upload error:', error);
            res.status(500).json({ error: 'Upload failed' });
        }
    }),
    getImage: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { folder, filename } = req.params;
            const imagePath = path.join(process.cwd(), 'uploads', 'images', folder, filename);
            // Check if file exists
            if (!fs.existsSync(imagePath)) {
                return res.status(404).json({ error: 'Image not found' });
            }
            // Get file stats for headers
            const stats = fs.statSync(imagePath);
            const mimeType = (0, imageUtils_1.getMimeType)(filename);
            // Set appropriate headers
            res.setHeader('Content-Type', mimeType);
            res.setHeader('Content-Length', stats.size);
            res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
            // Stream the file
            const fileStream = fs.createReadStream(imagePath);
            fileStream.pipe(res);
        }
        catch (error) {
            console.error('Error serving image:', error);
            res.status(500).json({ error: 'Error serving image' });
        }
    }),
    getImageByFilename: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { filename } = req.params;
            const dbImage = yield prisma_1.prisma.image.findFirst({ where: { filename } });
            const imagePath = (dbImage === null || dbImage === void 0 ? void 0 : dbImage.filePath) || '';
            // Check if file exists
            if (!fs.existsSync(imagePath)) {
                return res.status(404).json({ error: 'Image not found' });
            }
            // Get file stats for headers
            const stats = fs.statSync(imagePath);
            const mimeType = (0, imageUtils_1.getMimeType)(filename);
            // Set appropriate headers
            res.setHeader('Content-Type', mimeType);
            res.setHeader('Content-Length', stats.size);
            res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
            // Stream the file
            const fileStream = fs.createReadStream(imagePath);
            fileStream.pipe(res);
        }
        catch (error) {
            console.error('Error serving image:', error);
            res.status(500).json({ error: 'Error serving image' });
        }
    }),
    deleteImage: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            // Find image in database
            const image = yield prisma_1.prisma.image.findUnique({
                where: { id: parseInt(id) }
            });
            if (!image) {
                return res.status(404).json({ error: 'Image not found' });
            }
            // Delete physical file
            if (fs.existsSync(image.filePath)) {
                fs.unlinkSync(image.filePath);
            }
            // Delete from database
            yield prisma_1.prisma.image.delete({
                where: { id: parseInt(id) }
            });
            res.json({ message: 'Image deleted successfully' });
        }
        catch (error) {
            console.error('Delete error:', error);
            res.status(500).json({ error: 'Delete failed' });
        }
    })
};
