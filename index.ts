import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mainRoutes from './src/routes/mainRoutes';
import authRoutes from './src/routes/authRoutes';
import helmet from 'helmet';
import cors from 'cors';
import session from 'express-session';
import { PrismaClient } from '@prisma/client';
import MySQLStore from 'express-mysql-session';
import { createConnection } from 'net';
dotenv.config();

let prisma = new PrismaClient();

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

const app: express.Express = express();

//? mau disini bisa untuk req.session
// declare module 'express-session' {
//   interface SessionData {
//     userId: string;
//   }
// }

// export {};

declare global {
  namespace Express {
    interface Request {
      userId: string; // Menambahkan properti userId dengan tipe string
      role: string; // Menambahkan properti role dengan tipe string
    }
  }
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use(
  session({
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
  })
);

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

app.use(mainRoutes);
app.use(authRoutes);

// const port = process.env.PORT;

// app.listen(port, () => {
//   console.log(`server running at localhost://${port}`);
// });

const port = process.env.NODE_ENV === 'test' ? process.env.TEST_PORT : 5000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.info('RESTful API start'));
}

export default app;
