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
exports.CountersDataSource = void 0;
class CountersDataSource {
    constructor(models) {
        this.models = models;
    }
    createSeqNext(collectionName) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const counter = yield ((_a = this.models) === null || _a === void 0 ? void 0 : _a.create({
                    id: collectionName,
                    seq: 0
                }));
                return counter;
            }
            catch (error) {
                console.error('Erro ao criar o contador de sequencia:', error);
                throw error;
            }
        });
    }
    seqNext(collectionName) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Encontra o contador com o nome 'orders' e o atualiza
                const counter = yield ((_a = this.models) === null || _a === void 0 ? void 0 : _a.findOneAndUpdate({ id: collectionName }, { $inc: { seq: 1 } }, // Incrementa o campo seq em 1
                { new: true }));
                // O novo valor de seq no contador representa o próximo orderId
                const nextOrderId = counter.seq;
                return nextOrderId;
            }
            catch (error) {
                console.error('Erro ao incrementar o orderId:', error);
                throw error;
            }
        });
    }
}
exports.CountersDataSource = CountersDataSource;
