import { DataSource } from "typeorm";
import { envs } from "../../config";
import { ReceptionistEntity } from "../entities/auth/Receptionist/receptionist.entity";
import { connect } from "http2";

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: envs.DB_HOST,
    port: envs.DB_PORT,
    username: envs.DB_USERNAME,
    password: envs.DB_PASSWORD,
    database: envs.DB_DATABASE,
    logging: false,
    entities: [ReceptionistEntity],
    migrations: [],
    subscribers: [],
    extra: {
        connectionLimit: 10,
        connectTimeout: 60000,
       },
   })

   AppDataSource.initialize()   
    .then(() => {
         console.log("DataBase Mysql connected");
    })
    .catch((error:any) => {
        console.log("DataBase Mysql connection error");
        throw error;    
    });