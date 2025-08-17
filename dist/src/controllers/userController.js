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
exports.userController = void 0;
const prisma_1 = require("../lib/prisma");
exports.userController = {
    getElements: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const elements = yield prisma_1.prisma.user.findMany();
        res.json(elements);
    }),
    getElementById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const user = yield prisma_1.prisma.user.findUnique({
            where: { id: Number(id) },
        });
        res.json(user);
    }),
    createElement: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, name } = req.body;
        const user = yield prisma_1.prisma.user.create({
            data: { email, name },
        });
        res.json(user);
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
    deleteElement: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        yield prisma_1.prisma.user.delete({
            where: { id: Number(id) },
        });
        res.json({ message: 'User deleted' });
    })
};
