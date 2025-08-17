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
exports.messageController = void 0;
const messages = [];
exports.messageController = {
    getElements: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.json(messages);
    }),
    createElement: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(req.body);
        const item = req.body;
        messages.push(item);
        res.json(item);
    }),
    deleteAll: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        messages.forEach(it => messages.pop());
        res.json(`Done: ${messages.length}`);
    })
};
