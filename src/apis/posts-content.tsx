import * as core from "express-serve-static-core";
const https = require("https");

export function bindPostContent(router: core.Router) {
  router.get("/post", (req, res) => {
    let id = req.query.id;
    https
      .get(
        `https://public-api.wordpress.com/rest/v1.1/sites/truecaller.blog/posts/${id}`,
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
