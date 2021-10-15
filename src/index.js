//Required External Modules
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require('mongoose');
const path = require("path")

const { clientOrigins, serverPort, dbURL, nodeEnviroment } = require("./config/env.dev");
const { eventsRouter } = require("./events/events.router");

//App Variables
const app = express();
const apiRouter = express.Router();

//App Configuration
mongoose.connect(dbURL);

app.use(helmet());
app.use(cors({ origin: clientOrigins }));
app.use(express.json());

app.use("/api", apiRouter);

apiRouter.use("/events", eventsRouter);

app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).send(err.message);
});


if(nodeEnviroment === 'production') {
  console.log('You are in production')
  app.use(express.static(path.join(__dirname, 'build')));


  app.get('/*', function (req, res) {
    res.sendFile (path.join(__dirname, 'build'))
  });

}



//Server Activation
app.listen(serverPort, () =>
  console.log(`API Server listening on port ${serverPort}`)
);
