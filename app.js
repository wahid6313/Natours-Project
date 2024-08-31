const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/wahid.json`));

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "succes",
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  // if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "'Invalid Id",
    });
  }

  res.status(200).json({
    status: "succes",
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  console.log(req.body);
  res.send("done");
};

const updateTour = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      tour: "< Updated tour Here>",
    },
  });
};

const deleteTour = (req, res) => {
  res.status(204).json({
    status: "success",
    data: null,
  });
};

// app.get("/api/v1/tours", getAllTours);
// app.get("/api/v1/tours/:id", getTour);
// app.post("/api/v1/tours", createTour);
// app.patch("/api/v1/tours/:id", updateTour);
// app.delete("/api/v1/tours/:id", deleteTour);

app.route("/api/v1/tours").get(getAllTours).post(createTour);
app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}... `);
});
