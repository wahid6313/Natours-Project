const fs = require("fs");

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../wahid.json`));

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: "succes",
    requested: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};
exports.getTour = (req, res) => {
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
exports.createTour = (req, res) => {
  console.log(req.body);
  res.send("done");
};
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      tour: "< Updated tour Here>",
    },
  });
};
exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: "success",
    data: null,
  });
};
