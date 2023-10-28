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
exports.AuthenticationMiddleware = void 0;
const routes_1 = require("../routes/routes");
const schemas_1 = require("../mongoose/schemas");
const utils_1 = require("../utils");
const CheckAuthentication = (authToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!authToken)
            throw Error('Token inválido');
        let authenticated = false;
        var decToken = utils_1.CryptUtils.parseJwt(authToken.replace('Bearer ', ''));
        const expirationDate = new Date(decToken.exp * 1000);
        const currentDate = new Date();
        if (decToken) {
            if (expirationDate <= currentDate)
                throw Error('Token expirou');
            var users = yield schemas_1.User.find({
                _id: decToken.user[0]._id
            }).select('-password');
            authenticated = users.length > 0;
        }
        return true;
    }
    catch (error) {
        console.log(`authentication error: ${error.message}`);
    }
});
const AuthenticationMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.path !== routes_1.ApiRoutesNames.authentication) {
        const authToken = req.headers.authorization;
        const authenticated = yield CheckAuthentication(authToken);
        if (!authenticated) {
            res.status(401).send('Token inválido');
            return;
        }
    }
    next();
});
exports.AuthenticationMiddleware = AuthenticationMiddleware;
