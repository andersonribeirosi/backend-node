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
exports.authenticationsRoute = void 0;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const routes_1 = require("../routes/routes");
const index_1 = require("../mongoose/schemas/index");
const route = express_1.default.Router();
exports.authenticationsRoute = route;
route.post(routes_1.ApiRoutesNames.authentication, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        if (!data.login || !data.password) {
            return res.status(422).send('Usuário inválido');
        }
        var user = yield index_1.User.find({
            login: data.login,
            password: data.password
        }).select('-password');
        if (!(user === null || user === void 0 ? void 0 : user.length))
            throw Error("Usuário e/ou senha inválidos");
        const secret = process.env.SECRET || 'root';
        const token = jsonwebtoken_1.default.sign({ user }, secret, { expiresIn: "1d" });
        const result = {
            user,
            token,
        };
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
