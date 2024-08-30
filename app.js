const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("hello world");
});

app.post("/", (req, res) => {
  res.json({ name: "wahid ali", country: "India" });
});

const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}... `);
});
