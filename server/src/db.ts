import { createConnection } from 'typeorm';
import path from 'path';
import { DB_HOST, DB_NAME, DB_PASS, DB_USER } from './constants';

const connectDB = async () => {
  return await createConnection({
    type: 'postgres',
    port: 5432,
    host: DB_HOST,
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASS,
    entities: [],
    synchronize: false,
    logging: true,
    migrations: [path.join(__dirname, './migrations/*.ts')],
  }).then(() => console.log('DB CONNECTED SUCCESSFULY'));
};

export default connectDB;
