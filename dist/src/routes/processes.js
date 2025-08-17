"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const processController_1 = require("../controllers/processController");
const router = (0, express_1.Router)();
router.get('/defaults', processController_1.processController.getElements);
router.post('/setdefaults', processController_1.processController.setDefaults);
router.post('/runproc', processController_1.processController.createElement);
exports.default = router;
