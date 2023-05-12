const fs = require("fs");
const { pipeline } = require("stream");
const csv = require("csvtojson");

const csvFilePath = `${__dirname}/csvdirectory/nodejs-hw1-ex1.csv`;

pipeline(
  fs.createReadStream(csvFilePath),
  csv({
    noheader: false,
    headers: ["book", "author", "amount", "price"],
  }),
  fs.createWriteStream(`${__dirname}/task3.txt`),
  (err) => {
    if (err) {
      console.error("Pipeline failed", err);

    } else {
      console.log("Pipeline succeeded");
    }
  }
);
