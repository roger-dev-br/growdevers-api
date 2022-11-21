import { DatabaseConnection } from "./main/database";
import { runServer } from "./main/server";

DatabaseConnection.connect().then(runServer);
