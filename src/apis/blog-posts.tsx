import * as core from "express-serve-static-core";
const https = require("https");

export function BlogPost(router: core.Router) {
  router.get("/", (req, res) => {
    https
      .get(
        "https://public-api.wordpress.com/rest/v1.1/sites/en.blog.wordpress.com/posts/?number=2",
        (httpRes) => {
          let body = "";
          httpRes.on("data", (chunk) => {
            body += chunk;
          });
          httpRes.on("end", () => {
            try {
              let json = JSON.parse(body);
              res.json(json);
            } catch (error) {
              console.error(error.message);
            }
          });
        }
      )
      .on("error", (error) => {
        console.error(error.message);
      });
  });
}
