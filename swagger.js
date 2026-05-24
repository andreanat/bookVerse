const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Library API",
    description: "API documentation for Library API"
  },
host: "cse341-library-api-904b.onrender.com",
schemes: ["https"]
};

const outputFile = "./swagger.json";
const routes = ["./server.js"];

swaggerAutogen(outputFile, routes, doc);