const { createServer } = require("./index.js");

const app = createServer();
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV === "production") {
  // For IIS deployment
  module.exports = app;
} else {
  // For local development
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
