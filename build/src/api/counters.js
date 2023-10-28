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
exports.countersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const methods_1 = require("../mongoose/dataSource/methods");
const index_1 = require("../mongoose/schemas/index");
const routes_1 = require("../routes/routes");
const utils_1 = require("../utils");
const route = express_1.default.Router();
exports.countersRoutes = route;
route.post(routes_1.ApiRoutesNames.counters, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var counter = yield methods_1.DataSource.create({
            data: req.body,
            model: index_1.Counter,
        });
        if (counter) {
            res.status(200).json(utils_1.ApiUtils.apiResult({ data: counter, success: true, }));
        }
        else {
            res.status(404).json(utils_1.ApiUtils.apiResult({ data: {}, success: false, msg: 'Erro ao cadastrar' }));
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
    next();
}));
route.get(`${routes_1.ApiRoutesNames.counters}/:id`, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req === null || req === void 0 ? void 0 : req.params.id;
        var whereObject = query != null ? JSON.parse(query) : {};
        var counters = yield index_1.Counter.find({
            _id: whereObject
        });
        if (counters) {
            res.status(200).json(utils_1.ApiUtils.apiResult({ data: counters, success: true, count: counters.length }));
        }
        else {
            res.status(404).json(utils_1.ApiUtils.apiResult({ data: [], success: false }));
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
route.get(routes_1.ApiRoutesNames.counters, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const where = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.where;
        const exclude = (_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.exclude;
        var counters = yield methods_1.DataSource.read({
            model: index_1.Counter,
        });
        if (counters) {
            res.status(200).json(utils_1.ApiUtils.apiResult({ data: counters, success: true, count: counters.length }));
        }
        else {
            res.status(404).json(utils_1.ApiUtils.apiResult({ data: [], success: false }));
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
    next();
}));
route.put(routes_1.ApiRoutesNames.counters, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const filter = { _id: data.id };
        var counter = yield methods_1.DataSource.update({
            data: data,
            model: index_1.Counter,
            options: {
                where: {
                    filter: filter
                }
            }
        });
        if (counter) {
            res.status(200).json(utils_1.ApiUtils.apiResult({ data: counter, success: true, }));
        }
        else {
            res.status(404).json(utils_1.ApiUtils.apiResult({ data: {}, success: false, msg: 'Erro ao cadastrar' }));
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
    next();
}));
