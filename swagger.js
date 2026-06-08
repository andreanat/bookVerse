const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "BookVerse API",
    description: "School library API for managing books and authors at Academia Juárez"
  },
  host: "cse341-library-api-904b.onrender.com",
  schemes: ["https"]
};

const outputFile = "./swagger.json";
const routes = ["./server.js"];

swaggerAutogen(outputFile, routes, doc);
