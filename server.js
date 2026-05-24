const express = require("express");
const mongodb = require("./data/database");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger.json");

const app = express();
const port = 8080;

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/books", require("./routes/books"));
app.use("/authors", require("./routes/authors"));

app.get("/", (req, res) => {
  res.send("Library API");
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on ${port}`);
    });
  }
});