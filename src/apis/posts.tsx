import * as core from "express-serve-static-core";
const https = require("https");

export function bindPosts(router: core.Router) {
  router.get("/posts", (req, res) => {
    let offset = req.query.offset;
    let limit = req.query.limit;
    https
      .get(
        `https://public-api.wordpress.com/rest/v1.1/sites/truecaller.blog/posts/?offset=${offset}&number=${limit
      }`,
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
