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
exports.imageService = void 0;
const prisma_1 = require("../lib/prisma");
exports.imageService = {
    createElement: (image) => __awaiter(void 0, void 0, void 0, function* () {
        return prisma_1.prisma.image.create({
            data: {
                filename: image.filename,
                originalName: image.originalname,
                filePath: image.path,
                fileSize: image.size,
                mimeType: image.mimetype
            }
        });
    }),
    // used only for seed command
    getImageByOriginalName: (originalName) => __awaiter(void 0, void 0, void 0, function* () {
        const element = yield prisma_1.prisma.image.findMany({
            where: { originalName },
        });
        return element;
    })
};
