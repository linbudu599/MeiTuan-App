import Koa from "koa";
import Router from "koa-router";
// import chalk from "chalk";

const app = new Koa();

const router = new Router();

// const consoler = (str: string, color: "red" | "yellow" | "green") => {
//   const printer = chalk[color] || chalk.yellow;
//   console.log(printer(str));
// };

app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild"
  );
  ctx.set("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  if (ctx.method == "OPTIONS") {
    ctx.body = 200;
  } else {
    await next();
  }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  // consoler("Server Start on http://localhost:3000", "green");
  console.log("Server Start on http://localhost:3000");
});
