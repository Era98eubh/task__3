"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Nuser_1 = require("./entities/Nuser");
const Notification_1 = require("./entities/Notification");
const Issue_1 = require("./entities/Issue");
const Counter_1 = require("./entities/Counter");
const Cuser_1 = require("./entities/Cuser");
const express_1 = __importDefault(require("express"));
const nuserRoutes_1 = __importDefault(require("./routes/nuserRoutes"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1234",
    database: "queueapp",
    entities: [Nuser_1.Nuser, Notification_1.Notification, Issue_1.Issue, Counter_1.Counter, Cuser_1.Cuser],
    synchronize: true,
    logging: false,
});
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(nuserRoutes_1.default);
AppDataSource.initialize()
    .then(() => {
    console.log('db connected');
    app.listen(8080, () => {
        console.log('app runing');
    });
})
    .catch((error) => console.log(error));
//# sourceMappingURL=index.js.map