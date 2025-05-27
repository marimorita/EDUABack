import { DataSource } from "typeorm";
import { envs } from "../../config";
import { ReceptionistEntity } from "../entities/auth/Receptionist/receptionist.entity";
import { DirectorEntity } from "../entities/auth/Director/director.entity";
import { DriveCapEntity } from "../entities/auth/DriveCap/driveCap.entity";
import { HistorialEntity } from "../entities/auth/Historial/historial.entity";
import { MemberTeamEntity } from "../entities/auth/MemberTeam/memberTeam.entity";
import { NotificacionesEntity } from "../entities/auth/Notifications/notifications.entity";
import { VisitorEntity } from "../entities/auth/Visitor/visitor.entity";

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: envs.DB_HOST,
    port: envs.DB_PORT,
    username: envs.DB_USERNAME,
    password: envs.DB_PASSWORD,
    database: envs.DB_DATABASE,
    logging: false,
    entities: [ReceptionistEntity, DirectorEntity, DriveCapEntity, HistorialEntity,MemberTeamEntity, NotificacionesEntity, VisitorEntity],
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