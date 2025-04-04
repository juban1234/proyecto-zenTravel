"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const register_1 = __importDefault(require("./Routes/register"));
const login_1 = __importDefault(require("./Routes/login"));
const profile_1 = __importDefault(require("./Routes/profile"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/register', register_1.default);
app.use('/login', login_1.default);
app.use('/profile', profile_1.default);
// app.use('/reserva', )
// app.use('/registerHotel',registerHotel);
const PORT = process.env.PORT || 10101;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
