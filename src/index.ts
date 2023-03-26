import express, {
  Express,
  Request,
  Response,
} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { DataSource } from 'typeorm';

const app: Express = express();
dotenv.config();

express.json();
app.use(express.urlencoded({ extended: true }));

app.use(cors());

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: ['src/**/*.entity.ts'],
  synchronize: true,
});

const PORT = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT);
    console.log('Database synced');
  })
  .catch((err) => {
    console.log('Database sync failed');
    console.log(err);
  });
