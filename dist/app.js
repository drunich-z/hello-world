"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const categories_1 = __importDefault(require("./routes/categories"));
const cards_1 = __importDefault(require("./routes/cards"));
const reset_1 = __importDefault(require("./routes/reset"));
const app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(cors_1.default());
const publicPath = path_1.default.resolve(__dirname, '../public');
const indexPath = path_1.default.resolve(__dirname, '../public/index.html');
// if query not starts with '/api/' string - send file from wwwroot
app.use(/^(?!\/api\/)/, express_1.default.static(publicPath));
// if file doesn't exists - send index.html
app.use(/^(?!\/api\/)/, (req, res) => {
    res.sendFile(indexPath);
});
app.use('/api/categories', categories_1.default);
app.use('/api/cards', cards_1.default);
app.use('/api/reset', reset_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server EFK-SRV started on ${PORT} port`));
//# sourceMappingURL=app.js.map