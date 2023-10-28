"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const routes_1 = require("../routes/routes");
const route = express_1.default.Router();
exports.uploadsRoutes = route;
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        // Define o diretório onde os arquivos serão salvos
        cb(null, './uploads'); // Certifique-se de que a pasta "uploads" exista
    },
    filename: (req, file, cb) => {
        // Define o nome do arquivo (no exemplo, usa o nome original)
        cb(null, Date.now() + path_1.default.extname(file.originalname));
    },
});
const upload = (0, multer_1.default)({ storage });
route.post(routes_1.ApiRoutesNames.uploads, upload.single('file'), (req, res) => {
    var _a;
    // O arquivo foi carregado com sucesso e os detalhes do arquivo estão em req.file
    const imagePath = `/uploads/${(_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.filename}`;
    res.json({ imagePath });
    res.send(req.body);
});
