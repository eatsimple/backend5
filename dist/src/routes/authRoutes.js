"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("../../middleware/auth"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// login-logout
router.post('/login', auth_1.default.Login);
router.delete('/logout', auth_1.default.Logout);
router.get('/getMe', auth_1.default.getMe);
exports.default = router;
