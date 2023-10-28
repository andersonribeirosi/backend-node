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
exports.DataSource = void 0;
class DataSource {
    static create({ data, model, options }) {
        return __awaiter(this, void 0, void 0, function* () {
            var response;
            try {
                const newData = yield model.create(data);
                response = yield model.findById(newData._id).select(options === null || options === void 0 ? void 0 : options.exclude);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static read({ model, options }) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            var response;
            try {
                var whereObject = ((_a = options === null || options === void 0 ? void 0 : options.where) === null || _a === void 0 ? void 0 : _a.filter) != null ? JSON.parse((_b = options === null || options === void 0 ? void 0 : options.where) === null || _b === void 0 ? void 0 : _b.filter) : {};
                var response = yield model.find(whereObject)
                    .select(options === null || options === void 0 ? void 0 : options.exclude)
                    .collation({ locale: "en" }) // insensível a maiúsculas/minúsculas
                    .sort(options === null || options === void 0 ? void 0 : options.sort)
                    .lean()
                    .exec();
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static update({ data, model, options }) {
        return __awaiter(this, void 0, void 0, function* () {
            var response;
            try {
                response = yield model.updateOne(options === null || options === void 0 ? void 0 : options.where, data);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.DataSource = DataSource;
