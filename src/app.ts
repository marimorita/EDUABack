import { envs } from "./config";
import { Server } from "./presentation/server";
import { AppRoutes } from "./presentation/routes";
import { AppDataSource } from "./Data/MySQL/OrmConfig";

(() => {
    main();
})()

async function main() {
    try {
        await AppDataSource.initialize()
        new Server({
            port: envs.PORT,
            routes: AppRoutes.routes
        }).start();
    } catch (error) {
        console.log("Error during Data Source initialization", error);
    }
}