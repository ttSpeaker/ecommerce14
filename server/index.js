const express = require("express");
const path = require("path");

const app = express();

const STATIC_PATH = path.join(__dirname, "..", "client", "build");

app.use("/api", (req, res, next) => {
  res.send("api");
});

app.use(express.static(STATIC_PATH));
app.get("/*", (req, res) => {
  res.sendFile(path.join(STATIC_PATH, "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
