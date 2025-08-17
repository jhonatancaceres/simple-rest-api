"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const cors = require('cors');
exports.app = (0, express_1.default)();
const port = 3000;
exports.app.use(express_1.default.json());
// Health check endpoint
exports.app.get('/', (req, res) => {
    res.json({ message: 'API is running' });
});
exports.app.use(cors({
    origin: [
        'http://localhost:8081',
        'exp://192.168.100.26:8081',
        'http://192.168.100.xxx:8081'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Accept'
    ],
    exposedHeaders: ['Content-Range', 'X-Content-Range'], // If using pagination
    credentials: true,
    maxAge: 86400 // Preflight cache duration
}));
exports.app.use('/api/v1', routes_1.default);
exports.app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
console.log(process.env);
// Basic CORS setup (adjust for production)
