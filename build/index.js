"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const authentication_1 = require("./src/api/authentication");
const companies_1 = require("./src/api/companies");
const counters_1 = require("./src/api/counters");
const customers_1 = require("./src/api/customers");
const orders_1 = require("./src/api/orders");
const uploads_1 = require("./src/api/uploads");
const users_1 = require("./src/api/users");
const utils_1 = require("./src/utils");
const expressPort = process.env.HTTP_PORT;
const mongoDbUrl = process.env.MONDB_URI || '';
const mongoDbName = process.env.MONDB_NAME || '';
const app = (0, express_1.default)();
app.use(body_parser_1.default.json({ limit: '50mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use([
    // AuthenticationMiddleware,
    counters_1.countersRoutes,
    uploads_1.uploadsRoutes,
    authentication_1.authenticationsRoute,
    users_1.usersRoutes,
    customers_1.customersRoutes,
    orders_1.ordersRoutes,
    companies_1.companiesRoutes,
]);
app.get('/', (req, res) => { res.send('Server is running...'); });
(0, utils_1.createDefaultConfig)();
mongoose_1.default.connect(`${mongoDbUrl}/${mongoDbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected!');
});
app.listen(expressPort, () => {
    console.log(`Servidor rodando em http://localhost:${expressPort}`);
});
