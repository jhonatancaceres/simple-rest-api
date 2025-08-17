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
const yaml = __importStar(require("js-yaml"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const { exec } = require('child_process');
const imageService_1 = require("../src/services/imageService");
const prisma_1 = require("../src/lib/prisma");
const imageUtils_1 = require("../src/utils/imageUtils");
const users = () => __awaiter(void 0, void 0, void 0, function* () {
    const email = 'test@example.com';
    const user = yield prisma_1.prisma.user.findMany({
        where: {
            email,
        },
    });
    if (user) {
        console.log(`User ${email} exists. No re-inserted.`);
        return;
    }
    yield prisma_1.prisma.user.create({
        data: {
            email
        },
    });
    console.log(`Seeded users: ${email}`);
});
const findOrCreateImage = (filename) => __awaiter(void 0, void 0, void 0, function* () {
    const [image] = yield imageService_1.imageService.getImageByOriginalName(filename);
    if (image) {
        console.log('Exists');
        return image;
    }
    const sourcePath = path.join(__dirname, 'data/project-images', filename);
    const stats = yield fs.statSync(sourcePath);
    const newFilename = (0, imageUtils_1.generateFileName)('image', filename);
    const destPath = path.join('uploads/images/general', newFilename);
    yield fs.copyFileSync(sourcePath, destPath);
    const newImage = {
        originalname: filename,
        filename: (0, imageUtils_1.generateFileName)('image', filename),
        size: stats.size,
        path: destPath,
        mimetype: (0, imageUtils_1.getMimeType)(filename)
    };
    console.log('Created');
    return imageService_1.imageService.createElement(newImage);
});
const projects = () => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.project.deleteMany();
    console.log('Deleted all existing projects');
    const filePath = path.join(process.cwd(), './prisma/data/projects.yaml');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = yaml.load(fileContent);
    const projects = data.map(project => (Object.assign(Object.assign({}, project), { duration: `${project.duration}` })));
    const newProjects = [];
    for (let project of projects) {
        const image = yield findOrCreateImage(project.image);
        if (image) {
            newProjects.push(Object.assign(Object.assign({}, project), { imageId: image.id, image: undefined }));
        }
    }
    // Insert projects into database
    yield prisma_1.prisma.project.createMany({
        data: newProjects,
    });
    console.log(`Seeded ${newProjects.length} / ${projects.length} projects`);
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield users();
        yield projects();
    });
}
main().catch(e => console.error(e));
