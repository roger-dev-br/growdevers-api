import { DatabaseConnection } from "./main/database";
import { runServer } from "./main/server";

import { exampleRedis } from "./examples/redis/redis.example";

DatabaseConnection.connect().then(() => {
    runServer();
    exampleRedis();
});
