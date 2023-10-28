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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const counters_1 = require("../mongoose/dataSource/counters");
const index_1 = require("../mongoose/schemas/index");
const routes_1 = require("../routes/routes");
const utils_1 = require("../utils");
const route = express_1.default.Router();
exports.ordersRoutes = route;
route.post(routes_1.ApiRoutesNames.orders, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const nextOrderId = yield new counters_1.CountersDataSource(index_1.Counter).seqNext('orders');
        if (!data.orderId)
            data.orderId = nextOrderId;
        const newOrder = yield index_1.Order.create(data);
        const order = yield index_1.Order.find({
            orderId: newOrder.orderId
        });
        if (order) {
            res.status(200).json(utils_1.ApiUtils.apiResult({ data: order, success: true, }));
        }
        else {
            res.status(404).json(utils_1.ApiUtils.apiResult({ data: {}, success: false, msg: 'Erro ao cadastrar' }));
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
route.get(routes_1.ApiRoutesNames.orders, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const query = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.where;
        var whereObject = query != null ? JSON.parse(query) : {};
        var orders = yield index_1.Order.find(whereObject)
            .collation({ locale: "en" }) // classificação insensível a maiúsculas/minúsculas
            .sort({ 'company.name': 1 })
            .lean()
            .exec();
        if (orders) {
            res.status(200).json(utils_1.ApiUtils.apiResult({ data: orders, success: true, count: orders.length }));
        }
        else {
            res.status(404).json(utils_1.ApiUtils.apiResult({ data: [], success: false }));
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
route.get(`${routes_1.ApiRoutesNames.orders}/:id`, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req === null || req === void 0 ? void 0 : req.params.id;
        var whereObject = query != null ? JSON.parse(query) : {};
        var orders = yield index_1.Order.find({
            orderId: whereObject
        });
        if (orders) {
            res.status(200).json(utils_1.ApiUtils.apiResult({ data: orders, success: true, count: orders.length }));
        }
        else {
            res.status(404).json(utils_1.ApiUtils.apiResult({ data: [], success: false }));
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
route.put(routes_1.ApiRoutesNames.orders, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const filter = { orderId: data.orderId };
        const newOrder = yield index_1.Order.updateOne(filter, data);
        if (newOrder) {
            res.status(200).json(utils_1.ApiUtils.apiResult({ data: newOrder, success: true, }));
        }
        else {
            res.status(404).json(utils_1.ApiUtils.apiResult({ data: {}, success: false, msg: 'Erro ao cadastrar' }));
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
