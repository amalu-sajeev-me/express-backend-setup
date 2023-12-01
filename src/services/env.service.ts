import { envProxy } from "../bin/EnvValidator"
import { injectable } from "tsyringe";

@injectable()
export class EnvService{
    public isDev = (): boolean => {
        return envProxy.validatedEnvObj!.NODE_ENV === 'development';
    }
}