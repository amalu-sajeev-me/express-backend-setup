import './bin/config';
import { container } from "tsyringe";
import { Application } from "./app";

(async function main() {
  const app = container.resolve(Application);
  await app.bootstrap();
  app.start();
})();