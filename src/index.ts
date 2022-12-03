import { DatabaseConnection } from "./main/database";
import { RedisConnection } from "./main/database/redis.connection";
import { runServer } from "./main/server";

DatabaseConnection.connect().then(RedisConnection.connect).then(runServer);
