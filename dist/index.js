"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const mainRoutes_1 = __importDefault(require("./src/routes/mainRoutes"));
const authRoutes_1 = __importDefault(require("./src/routes/authRoutes"));
const paymentRoutes_1 = __importDefault(require("./src/routes/paymentRoutes"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const client_1 = require("@prisma/client");
dotenv_1.default.config();
let prisma = new client_1.PrismaClient();
// const options = {
//   host: 'localhost',
//   port: 3306,
//   user: 'root',
//   password: 'root',
//   database: 'prisma_typescript_1',
// };
// const obj: MySQLStore = new MySQLStore();
// sessionStore
//   .onReady()
//   .then(() => {
//     // MySQL session store ready for use.
//     console.log('MySQLStore ready');
//   })
//   .catch((error: any) => {
//     // Something went wrong.
//     console.error(error);
//   });
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    credentials: true,
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
}));
app.use((0, express_session_1.default)({
    secret: '83jadjadfah92382hahfagaygd282',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: 'auto',
        maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    // store: sessionStore,
    // store: new PrismaSessionStore(new PrismaClient(), {
    //   checkPeriod: 2 * 60 * 1000, //ms
    //   dbRecordIdIsSessionId: true,
    //   dbRecordIdFunction: undefined,
    // }),
    // store: new RedisStoreConstructor({ client: redisClient }), // for redis
}));
// app.use(
//   contentSecurityPolicy({
//     useDefaults: true,
//     directives: {
//       defaultSrc: ["'self'", 'default.example'],
//       scriptSrc: ["'self'", 'js.example.com'],
//       objectSrc: ["'none'"],
//       upgradeInsecureRequests: [],
//     },
//     reportOnly: false,
//   })
// );
app.use(mainRoutes_1.default);
app.use(authRoutes_1.default);
app.use(paymentRoutes_1.default);
// const port = process.env.PORT;
// app.listen(port, () => {
//   console.log(`server running at localhost://${port}`);
// });
const port = process.env.NODE_ENV === 'test' ? process.env.TEST_PORT : 5000;
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => console.info('RESTful API start'));
}
exports.default = app;
