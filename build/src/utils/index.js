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
exports.ApiUtils = exports.CryptUtils = exports.isEmpty = exports.isDuplicated = exports.Validator = exports.createDefaultConfig = exports.createCompaniesDefault = exports.createCustomersDefault = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const counters_1 = require("../mongoose/dataSource/counters");
const methods_1 = require("../mongoose/dataSource/methods");
const schemas_1 = require("../mongoose/schemas");
const createCustomersDefault = () => __awaiter(void 0, void 0, void 0, function* () {
    var customers = [
        {
            "id": yield new counters_1.CountersDataSource(schemas_1.Counter).seqNext('customers'),
            "name": "ATACADÃO DO PARAFUSOS LTDA",
            "cnpj": "08.145.526/0001-15",
            "ie": "16.115.567-10",
            "phone": "83 99156-1345",
            "email": "atacadaodosparafusos@atacadaodosparafusos.com"
        },
        {
            "id": yield new counters_1.CountersDataSource(schemas_1.Counter).seqNext('customers'),
            "name": "ALMEIDA COM. DIST. LTDA",
            "cnpj": "15.240.132/0001-10",
            "ie": "16.120.157-10",
            "phone": "83 98840-2055",
            "email": "almeidadistribuidor@almeidadistribuidor.com"
        },
        {
            "id": yield new counters_1.CountersDataSource(schemas_1.Counter).seqNext('customers'),
            "name": "RAMOS E MACEDO & CIA LTDA",
            "cnpj": "01.145.526/0001-15",
            "ie": "10.225.567-10",
            "phone": "83 99158-1030",
            "email": "ramosemacedo@ramosemacedo.com"
        },
        {
            "id": yield new counters_1.CountersDataSource(schemas_1.Counter).seqNext('customers'),
            "name": "SHOPPING DA ELETRICIDADE",
            "cnpj": "07.125.226/0001-08",
            "ie": "16.115.567-10",
            "phone": "83 98889-1122",
            "email": "shoppingdaeletricidade@gmail.com"
        },
        {
            "id": yield new counters_1.CountersDataSource(schemas_1.Counter).seqNext('customers'),
            "name": "MIRO FERRAGENS E FERRAMENTAS",
            "cnpj": "06.445.886/0001-12",
            "ie": "18.555.527-20",
            "phone": "83 98888-1404",
            "email": "atacadaodosparafusos@atacadaodosparafusos.com"
        },
    ];
    for (const customer of customers) {
        var users = yield schemas_1.Customer.find({
            name: customer === null || customer === void 0 ? void 0 : customer.name
        });
        if (!users[0])
            yield methods_1.DataSource.create({
                data: customer,
                model: schemas_1.Customer,
            });
        else
            return;
    }
});
exports.createCustomersDefault = createCustomersDefault;
const createCompaniesDefault = () => __awaiter(void 0, void 0, void 0, function* () {
    var companies = [
        {
            "id": yield new counters_1.CountersDataSource(schemas_1.Counter).seqNext('companies'),
            "name": "COPPERSTEEL BIMETÁLICOS",
            "cnpj": "01.045.556/0001-10",
            "email": "coppersteel@coppersteel.com"
        },
        {
            "id": yield new counters_1.CountersDataSource(schemas_1.Counter).seqNext('companies'),
            "name": "INTELLI INDÚSTRIA DE TERMINAIS ELÉTRICOS",
            "cnpj": "02.072.456/0001-18",
            "email": "intelli@intelli.com"
        },
        {
            "id": yield new counters_1.CountersDataSource(schemas_1.Counter).seqNext('companies'),
            "name": "METALÚRGICA SÃO RAPHAEL",
            "cnpj": "10.075.456/0001-92",
            "email": "saoraphael@saoraphael.com"
        },
        {
            "id": yield new counters_1.CountersDataSource(schemas_1.Counter).seqNext('companies'),
            "name": "DUTOPLAST",
            "cnpj": "08.360.656/0001-75",
            "email": "dutoplast@dutoplast.com"
        },
        {
            "id": yield new counters_1.CountersDataSource(schemas_1.Counter).seqNext('companies'),
            "name": "GERMER S/A",
            "cnpj": "03.239.098/0002-50",
            "email": "germer@germer.com"
        }
    ];
    for (const company of companies) {
        var users = yield schemas_1.Company.find({
            name: company === null || company === void 0 ? void 0 : company.name
        });
        if (!users[0])
            yield methods_1.DataSource.create({
                data: company,
                model: schemas_1.Company,
            });
        else
            return;
    }
});
exports.createCompaniesDefault = createCompaniesDefault;
const createDefaultConfig = () => __awaiter(void 0, void 0, void 0, function* () {
    var users = yield schemas_1.User.find({
        login: 'root'
    });
    if (!users[0]) {
        yield new counters_1.CountersDataSource(schemas_1.Counter).createSeqNext('users');
        var nextOrderId = yield new counters_1.CountersDataSource(schemas_1.Counter).seqNext('users');
        const defaultUser = {
            id: nextOrderId,
            name: 'root',
            login: 'root',
            password: '123'
        };
        yield methods_1.DataSource.create({
            data: defaultUser,
            model: schemas_1.User,
            options: {
                exclude: '-password'
            }
        });
        // CRIA OS OUTROS SEQUENCIADORES
        yield new counters_1.CountersDataSource(schemas_1.Counter).createSeqNext('companies');
        yield new counters_1.CountersDataSource(schemas_1.Counter).createSeqNext('customers');
        yield new counters_1.CountersDataSource(schemas_1.Counter).createSeqNext('orders');
    }
    else {
        return;
    }
    (0, exports.createCompaniesDefault)();
    (0, exports.createCustomersDefault)();
});
exports.createDefaultConfig = createDefaultConfig;
class Validator {
}
exports.Validator = Validator;
Validator.exceptionsMsgs = {
    requiredExceptionUserName: new Error('O nome do usuário é obrigatório'),
    requiredExceptionUserLogin: new Error('O login é obrigatório'),
    requiredExceptionUserPwd: new Error('A senha é obrigatória'),
    duplicatedExceptionLogin: new Error('Já existe um login com este nome')
};
const isDuplicated = (error, keyValue) => (keyValue && (error === null || error === void 0 ? void 0 : error.name) === 'MongoServerError' && (error === null || error === void 0 ? void 0 : error.code) === 11000);
exports.isDuplicated = isDuplicated;
const isEmpty = (value, include) => ['', null, undefined, ...(include || [])].indexOf(value) !== -1;
exports.isEmpty = isEmpty;
// CRYPT
class CryptUtils {
    static crypt(text) {
        const encrypt = crypto_js_1.default.AES.encrypt(text, CryptUtils.secretKey).toString();
        return encrypt;
    }
    static cryptMD5(text) {
        var hash = crypto_js_1.default.MD5(CryptUtils.secretKey + text).toString();
        return hash;
    }
    static parseJwt(token) {
        if (token) {
            var base64Payload = token.split('.')[1];
            var payload = Buffer === null || Buffer === void 0 ? void 0 : Buffer.from(base64Payload, 'base64');
            return JSON.parse(payload.toString());
        }
    }
}
exports.CryptUtils = CryptUtils;
CryptUtils.secretKey = process.env.secretAuthKey || 'root';
CryptUtils.decrypt = (text) => {
    const bytes = crypto_js_1.default.AES.decrypt(text, CryptUtils.secretKey);
    const decrypt = bytes.toString(crypto_js_1.default.enc.Utf8);
    return decrypt;
};
class ApiUtils {
    static apiResult({ data, success, count, msg }) {
        return {
            data,
            success,
            count,
            msg
        };
    }
}
exports.ApiUtils = ApiUtils;
