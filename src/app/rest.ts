import "reflect-metadata";
import { LoggerInterface } from "../core/logger/logger.interface.js";
import { ConfigInterface } from "../core/config/config.interface.js";
import express, { Express } from "express";
import { AppComponent } from "../types/app-component.enum.js";
import { inject, injectable } from "inversify";
import { DatabaseClientInterface } from "../core/database-client/database-client.interface.js";
import { getMongoURI } from "../core/helpers/db.js";
import { ControllerInterface } from "../core/controller/controller.interface.js";
import { ExceptionFilterInterface } from "../core/expception-filters/exception-filter.interface.js";

@injectable()
export default class Application {
  private expressApp: Express;

  constructor(
    @inject(AppComponent.LoggerInterface) private logger: LoggerInterface,
    @inject(AppComponent.ConfigInterface) private config: ConfigInterface,

    @inject(AppComponent.DatabaseClientInterface)
    private databaseClient: DatabaseClientInterface,
    @inject(AppComponent.CityController)
    private cityController: ControllerInterface,
    @inject(AppComponent.ExceptionFilterInterface)
    private exceptionFilter: ExceptionFilterInterface,
    @inject(AppComponent.UserController)
    private userController: ControllerInterface,
    @inject(AppComponent.OfferController)
    private offerController: ControllerInterface,
    @inject(AppComponent.CommentController)
    private commentController: ControllerInterface
  ) {
    this.expressApp = express();
  }

  public initRoutes() {
    this.expressApp.use("/categories", this.cityController.router);
    this.expressApp.use("/users", this.userController.router);
    this.expressApp.use("/offers", this.offerController.router);
    this.expressApp.use("/comments", this.commentController.router);
  }

  public initMiddleware() {
    this.expressApp.use(express.json());
    this.expressApp.use(

      "/upload",
      express.static(this.config.get("UPLOAD_DIRECTORY"))

    );
  }

  public initExceptionFilters() {
    this.expressApp.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public async init() {

    this.logger.info("Application initialization…");
    this.logger.info(`Get value from env $PORT: ${this.config.get("PORT")}`);

    const uri = getMongoURI(
      // this.config.get('DB_USER'),
      // this.config.get('DB_PASSWORD'),
      this.config.get("DB_HOST"),
      this.config.get("DB_PORT"),
      this.config.get("DB_NAME")
    );

    await this.databaseClient.connect(uri);

    this.initMiddleware();
    this.initRoutes();
    this.initExceptionFilters();
    this.expressApp.listen(this.config.get("PORT"));
    this.logger.info(
      `Server started on http://localhost:${this.config.get("PORT")}`
    );

  }
}
