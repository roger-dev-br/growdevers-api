import { DatabaseConnection } from "./main/database";
import { RedisConnection } from "./main/database/redis.connection";
import { runServer } from "./main/server";

Promise.all([DatabaseConnection.connect(), RedisConnection.connect()])
    .then(runServer)
    .catch((error: any) => {
        console.log("Erro ao iniciar o servido.");
        console.log(error);
    });
