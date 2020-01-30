import Router from "koa-router";
import Koa from "koa";
import fs from "fs";
import path from "path";

const router = new Router();

const weather = (server: Koa<Koa.DefaultState, Koa.DefaultContext>) => {
  server.use(async (ctx: Koa.Context, next: Koa.Next) => {
    router.get("/homelist", async (ctx: Koa.Context) => {
      fs.readFile(path.join(__dirname, "../src/json/homelist.json"), "utf-8", (err, data) => {
        if (!err) {
          ctx.body = data;
        }
      });

      // ctx.body = {
      //   status: 1,
      //   message: "success"
      // };
    });

    server.use(router.routes()).use(router.allowedMethods());

    await next();
  });
};

export default weather;
