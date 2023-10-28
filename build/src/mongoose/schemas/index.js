"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.Counter = exports.Order = exports.Company = exports.Customer = exports.User = exports.orderSchema = exports.itemOrderSchema = exports.companySchema = exports.customerSchema = exports.userSchema = exports.counterSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const utils_1 = require("../../utils");
exports.counterSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true
    },
    seq: {
        type: Number
    }
});
exports.userSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
        index: true
    },
    login: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    imageProfile: {
        type: String,
        required: false
    }
});
exports.customerSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    cnpj: {
        type: String,
        required: true
    },
    ie: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    }
});
exports.companySchema = new mongoose_1.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    cnpj: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: false
    }
});
exports.itemOrderSchema = new mongoose_1.Schema({
    product: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    ipi: {
        type: Number
    },
    desc1: {
        type: Number
    },
    desc2: {
        type: Number
    }
});
exports.orderSchema = new mongoose_1.Schema({
    orderId: {
        type: Number,
        required: true
    },
    userId: {
        type: Number,
        ref: 'userSchema',
    },
    customerId: {
        type: String,
        ref: 'customerSchema'
    },
    companyId: {
        type: String,
        ref: 'companySchema'
    },
    user: {
        type: Object,
        ref: 'userSchema',
    },
    customer: {
        type: Object,
        ref: 'customerSchema',
    },
    company: {
        type: Object,
        ref: 'companySchema',
    },
    annotation: {
        type: String
    },
    paymentCondition: {
        type: String
    },
    shippingCompany: {
        type: String
    },
    items: [exports.itemOrderSchema],
    total: Number,
    closed: {
        type: Boolean,
        default: false
    },
});
exports.orderSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const doc = this;
        next();
    });
});
exports.userSchema.pre('save', { document: true, query: true }, function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const exceptionToThrow = (0, utils_1.isEmpty)(this._doc.name) ?
            utils_1.Validator.exceptionsMsgs.requiredExceptionUserName :
            (0, utils_1.isEmpty)(this._doc.login) ?
                utils_1.Validator.exceptionsMsgs.requiredExceptionUserLogin :
                (0, utils_1.isEmpty)(this._doc.password) ?
                    utils_1.Validator.exceptionsMsgs.requiredExceptionUserPwd :
                    null;
        if (exceptionToThrow)
            throw exceptionToThrow;
        else
            next();
    });
});
exports.userSchema.post('save', function (error, doc, next) {
    var _a;
    if (!doc.items) {
        throw Error('Nenhum item foi inserido ');
    }
    const exceptionToThrow = (0, utils_1.isEmpty)(doc.name) ?
        utils_1.Validator.exceptionsMsgs.requiredExceptionUserName :
        (0, utils_1.isEmpty)(doc.login) ?
            utils_1.Validator.exceptionsMsgs.requiredExceptionUserLogin :
            (0, utils_1.isEmpty)(doc.password) ?
                utils_1.Validator.exceptionsMsgs.requiredExceptionUserPwd :
                (0, utils_1.isDuplicated)(error, (_a = error === null || error === void 0 ? void 0 : error.keyValue) === null || _a === void 0 ? void 0 : _a.login) ?
                    utils_1.Validator.exceptionsMsgs.duplicatedExceptionLogin : null;
    if (exceptionToThrow)
        throw exceptionToThrow;
    else
        next();
});
exports.orderSchema.post('save', function (error, doc, next) {
});
exports.orderSchema.pre('save', function (next) {
    var _a, _b;
    const order = this;
    if (!((_b = (_a = order === null || order === void 0 ? void 0 : order._doc) === null || _a === void 0 ? void 0 : _a.items) === null || _b === void 0 ? void 0 : _b.length)) {
        throw Error('Nenhum item foi inserido');
    }
    if (order) {
        const total = order.items.reduce((acc, item) => {
            if (item.price && item.quantity) {
                let itemTotal = item.price * item.quantity;
                if (item.ipi) {
                    const ipi = item.ipi / 100;
                    itemTotal += itemTotal * ipi;
                }
                if (item.desc1) {
                    const discountAmount1 = (item.desc1 / 100) * itemTotal;
                    itemTotal -= discountAmount1;
                }
                if (item.desc2) {
                    const discountAmount2 = (item.desc2 / 100) * itemTotal;
                    itemTotal -= discountAmount2;
                }
                return acc + itemTotal;
            }
            else {
                return acc;
            }
        }, 0);
        order.total = total;
    }
    next();
});
exports.orderSchema.pre('updateOne', { document: true, query: true }, function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const order = this._update;
        if (!order.items) {
            throw Error('Nenhum dado alterado');
        }
        if (order) {
            const total = order.items.reduce((acc, item) => {
                if (item.price && item.quantity) {
                    let itemTotal = item.price * item.quantity;
                    if (item.ipi) {
                        const ipi = item.ipi / 100;
                        itemTotal += itemTotal * ipi;
                    }
                    if (item.desc1) {
                        const discountAmount1 = (item.desc1 / 100) * itemTotal;
                        itemTotal -= discountAmount1;
                    }
                    if (item.desc2) {
                        const discountAmount2 = (item.desc2 / 100) * itemTotal;
                        itemTotal -= discountAmount2;
                    }
                    return acc + itemTotal;
                }
                else {
                    return acc;
                }
            }, 0);
            order.total = total;
        }
        next();
    });
});
exports.orderSchema.post('updateOne', function (error, doc, next) {
    next();
});
exports.User = mongoose_1.default.model('users', exports.userSchema);
exports.Customer = mongoose_1.default.model('customers', exports.customerSchema);
exports.Company = mongoose_1.default.model('companies', exports.companySchema);
exports.Order = mongoose_1.default.model('orders', exports.orderSchema);
exports.Counter = mongoose_1.default.model('counters', exports.counterSchema);
