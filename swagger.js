const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "BookVerse API",
    description: "BookVerse API is a school library management system for Academia Juárez. It manages books, authors, students, and checkouts."
  },
  host: "cse341-library-api-904b.onrender.com",
  schemes: ["https"]
};

const outputFile = "./swagger.json";
const routes = ["./server.js"];

swaggerAutogen(outputFile, routes, doc);
