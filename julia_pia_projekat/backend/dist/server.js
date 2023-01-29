"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_routes_1 = __importDefault(require("./routers/user.routes"));
const grad_routes_1 = __importDefault(require("./routers/grad.routes"));
const agencija_routes_1 = __importDefault(require("./routers/agencija.routes"));
const mikro_routes_1 = __importDefault(require("./routers/mikro.routes"));
const ulica_routes_1 = __importDefault(require("./routers/ulica.routes"));
const nekretnina_routes_1 = __importDefault(require("./routers/nekretnina.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
mongoose_1.default.connect('mongodb://localhost:27017/projekat');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('db connection ok');
});
const router = express_1.default.Router();
router.use('/korisnici', user_routes_1.default);
router.use('/gradovi', grad_routes_1.default);
router.use('/agencije', agencija_routes_1.default);
router.use('/mikrolokacije', mikro_routes_1.default);
router.use('/ulice', ulica_routes_1.default);
router.use('/nekretnine', nekretnina_routes_1.default);
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map