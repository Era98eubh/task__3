"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../libs/verifyToken");
const cusercontroller_1 = require("../controllers/cusercontroller");
const router = (0, express_1.Router)();
router.post('/api/nuser', cusercontroller_1.createCuser);
router.post('/api/nuser/login', cusercontroller_1.loginCuser);
router.get('/api/nuser', verifyToken_1.TokenValidation, cusercontroller_1.getCusers);
router.get('/api/nuser/:id', cusercontroller_1.getCuser);
router.put('/api/nuser/:id', cusercontroller_1.updateCusers);
router.delete('/api/nuser/:id', cusercontroller_1.deleteCusers);
exports.default = router;
//# sourceMappingURL=nuserRoutes.js.map