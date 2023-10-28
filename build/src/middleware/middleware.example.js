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
exports.MiddlewareExample = void 0;
const MiddlewareExample = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`req.path: ${req.path}`);
    console.log(`req.method: ${req.method}`);
    console.log(`req.headers: ${JSON.stringify(req.headers)}`);
    console.log(`req.params: ${JSON.stringify(req.params)}`);
    console.log(`req.query: ${JSON.stringify(req.query)}`);
    const error = false;
    if (error) {
        res.status(500).send('exit');
        return;
    }
    next();
});
exports.MiddlewareExample = MiddlewareExample;
