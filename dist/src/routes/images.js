"use strict";
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
const express_1 = require("express");
const upload_1 = require("../config/upload");
const imageController_1 = require("../controllers/imageController");
const prisma_1 = require("../lib/prisma");
const router = (0, express_1.Router)();
// Upload image to specific folder
router.post('/upload', upload_1.upload.single('image'), imageController_1.imageController.uploadImage);
router.post('/upload/:folder', upload_1.upload.single('image'), imageController_1.imageController.uploadImage);
// Serve images
router.get('/images/:folder/:filename', imageController_1.imageController.getImage);
router.get('/:filename', imageController_1.imageController.getImageByFilename);
// Delete image
//router.delete('/images/:id', imageController.deleteImage);
// Get all images (optional)
router.get('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const images = yield prisma_1.prisma.image.findMany({
        select: {
            id: true,
            filename: true,
            originalName: true,
            filePath: true,
            createdAt: true
        }
    });
    const imagesWithUrls = images.map((img) => (Object.assign(Object.assign({}, img), { url: `/api/images/${img.filePath}` })));
    res.json(imagesWithUrls);
}));
exports.default = router;
