import * as core from "express-serve-static-core";
const https = require("https");

export function bindCategories(router: core.Router) {
  router.get("/categories", (req, res) => { 
    https
      .get(
        `https://public-api.wordpress.com/rest/v1/sites/en.blog.wordpress.com/categories/?number=15`,
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
