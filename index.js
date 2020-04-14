const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const shortid = require("shortid");

const router = require('./router');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

//Setting up database
mongoose
  .connect('mongodb://sudip1234:sudip1234@cluster0-shard-00-00-ilzjo.mongodb.net:27017,cluster0-shard-00-01-ilzjo.mongodb.net:27017,cluster0-shard-00-02-ilzjo.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log("DB Connected!"))
  .catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
  });

app.use('/api/exercise', router);


const listener = app.listen(5000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});