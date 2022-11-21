import cors from "cors";
import express from "express";
import { makeRoutes } from "./routes.config";

export const createServer = () => {
    const app = express();
    app.use(express.json());
    app.use(cors());

    makeRoutes(app);

    return app;
};
