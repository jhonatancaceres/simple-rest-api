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
exports.projectController = void 0;
const prisma_1 = require("../lib/prisma");
exports.projectController = {
    getElements: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const elements = (yield prisma_1.prisma.project.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                image: { select: { filename: true } }
            }
        })).map(item => (Object.assign(Object.assign({}, item), { imageUrl: item.image.filename })));
        res.json(elements);
    }),
    createElement: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const item = yield prisma_1.prisma.project.create({
            data: req.body
        });
        res.json(item);
    }),
    updateElement: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const { email, name } = req.body;
        const user = yield prisma_1.prisma.user.update({
            where: { id: Number(id) },
            data: { email, name },
        });
        res.json(user);
    }),
    getElementById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const item = yield prisma_1.prisma.project.findUnique({
            where: { id: parseInt(req.params.id) }
        });
        res.json(item);
    })
};
