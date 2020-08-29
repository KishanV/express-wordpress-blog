require("source-map-support").install();
import "core-js/stable";
import "regenerator-runtime/runtime";
import * as core from "express-serve-static-core";
import * as express from "express";
import { Express } from "express";
import { bindPosts } from "./apis/posts";
import { bindPostContent } from "./apis/posts-content";
import { bindCategories } from "./apis/categories";

const bodyParser = require("body-parser");

export class App {
  express: Express;
  port: number = 6060;
  router: core.Router;

  constructor() {
    this.express = express();
    this.router = express.Router();
    this.mountRoutes();
    this.express.listen(this.port, (err: any) => {
      if (err) {
        return console.log(err);
      }
      return console.log(`server is listening on ${this.port}`);
    });
  }

  private mountRoutes(): void {
    const router = this.router;

    router.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      if (next) next();
    });

    router.use(bodyParser.json({ limit: "50mb" }));
    router.use(
      bodyParser.urlencoded({
        extended: true,
        limit: "150mb",
      })
    );

    this.bindApis();
    this.express.use("/", router);
  }

  private bindApis() {
    bindPosts(this.router);
    bindPostContent(this.router);
    bindCategories(this.router);
  }
}

new App();
