"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const payment = async (req, res) => {
    const midtransUrl = 'https://app.sandbox.midtrans.com/snap/v1/transactions';
    const midtransOptions = {
        method: 'POST',
        headers: { accept: 'application/json', 'content-type': 'application/json' },
        body: JSON.stringify({ transaction_details: { order_id: 'order-id' } }),
    };
    try {
        const midtransResponse = await (0, node_fetch_1.default)(midtransUrl, midtransOptions);
        const midtransJson = await midtransResponse.json();
        res.status(200).json(midtransJson);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create payment' });
    }
};
exports.default = { payment };
