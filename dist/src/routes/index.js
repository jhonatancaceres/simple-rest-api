"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messages_1 = __importDefault(require("./messages"));
const processes_1 = __importDefault(require("./processes"));
const router = (0, express_1.Router)();
/*router.use('/users', userRoutes);
router.use('/images', imageRoutes);
router.use('/projects', projectRoutes);*/
router.use('/messages', messages_1.default);
router.use('/process', processes_1.default);
exports.default = router;
