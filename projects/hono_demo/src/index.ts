import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { etag } from "hono/etag";
import { logger } from "hono/logger";
import { basicAuth } from "hono/basic-auth"; // 登录校验
import { bearerAuth } from "hono/bearer-auth"; // JWT校验
import { cache } from "hono/cache"; // 缓存中间件
import { compress } from "hono/compress"; //  gzip deflate 压缩资源
import { cors } from "hono/cors"; // 跨域请求资源
import { secureHeaders } from "hono/secure-headers";
import { csrf } from "hono/csrf"; // 预防csrf攻击
import { ipRestriction } from "hono/ip-restriction"; // ip 限制 添加白名单控制  灰度控制
import { getConnInfo } from "@hono/node-server/conninfo";
import { timeout } from "hono/timeout"; // 请求超时控制
import { jwt } from "hono/jwt";
import type { JwtVariables } from "hono/jwt"; // jwt 类型验证
import { some, every, except } from "hono/combine"; // 处理多个中间件的函数
import { prettyJSON } from "hono/pretty-json"; // 优化json 输出

const app = new Hono();
app.use(csrf());
app.use(prettyJSON());
app.use(etag(), logger(), compress());
app.use("/timeout", timeout(5000)); // 请求超时控制

// Handling a route json 返回
app.get("/api/data", async (c) => {
  // Your route handler logic
  return c.json({ data: "Your data here" });
});

app.use(
  "/api2/*",
  cors({
    origin: "http://example.com",
    allowHeaders: ["X-Custom-Header", "Upgrade-Insecure-Requests"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
    maxAge: 600,
    credentials: true,
  })
);

app.use(
  "*",
  ipRestriction(getConnInfo, {
    // 只允许本机访问地址
    denyList: [],
    allowList: ["127.0.0.1", "::1"],
  })
);
app.use(
  "*",
  cache({
    cacheName: "taue",
    cacheControl: "max-age=3600",
  })
);
app.use(
  "/auth/*",
  basicAuth({
    username: "zhangsan",
    password: "123456",
  })
);

app.get("/auth/page", (c) => {
  return c.text("You are authorized");
});
app.get("/", (c) => {
  // console.log(c.req.param("id"));
  return c.text("Hello Hono!");
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
