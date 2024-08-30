const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());
// app.get("/", (req, res) => {
//   res.status(200).send("hello world");
// });

// app.post("/", (req, res) => {
//   res.json({ name: "wahid ali", country: "India" });
// });

const tours = JSON.parse(fs.readFileSync(`${__dirname}/wahid.json`));

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "succes",
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.post("/api/v1/tours", (req, res) => {
  console.log(req.body);
  res.send("done");
});

const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}... `);
});
