"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const midtransPayment_1 = __importDefault(require("../../middleware/midtransPayment"));
const router = express_1.default.Router();
// midtrans API payment
router.post('/paymentAPI', midtransPayment_1.default.payment);
exports.default = router;
