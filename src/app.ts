import http from 'http';
import express, { Request, Response } from 'express';
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./routes";
import { injectable } from 'tsyringe';
import { envProxy } from './bin/EnvValidator';

@injectable()
export class Application{
    public httpServer!: http.Server;
    public app!: express.Application;
    private isInitialized = false;

    private _initialize = async (): Promise<void> => {
        if (this.isInitialized) return;
        this.app = express();
        this.httpServer = http.createServer(this.app);
        this.isInitialized = true;
    }

    private _applyMiddlewares = () => {
        this.app.use(express.json(), express.urlencoded());
    }

    private _applyRouter = () => {
        RegisterRoutes(this.app);
    }
    private _serveDocs = () => {
        this
            .app
            .use('/docs', swaggerUi.serve, async (_req: Request, res: Response) => {
                return res.send(
                    swaggerUi.generateHTML(await import("../build/swagger.json")),
                );
        });
    }
    public bootstrap = async () => {
        await this._initialize();
        this._applyMiddlewares();
        this._applyRouter();
        this._serveDocs();
        return this;
    }
    public start = () => {
        const { PORT } = envProxy.validatedEnvObj!;
        this.httpServer.listen(PORT, () => {
            console.log(`server started running at localhost:${PORT}`);
        });
    }
}