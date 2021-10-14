// Schemas
const { Event } = require("../schemas/event.schema");
const { Date } = require("../schemas/date.schema");
const { checkJwt, getUserID } = require("../authz/check-jwt");

const newDate = async (req, res) => {
  const userID = getUserID(req.headers.authorization);
  const eventID = req.params.eventID;
  const { date, time, price, capacity } = req.body;
  const dateObj = { eventID, date, time, price, capacity, occupied: 0 };
  try {
    const event = await Event.findById(eventID);
    const ownerID = event.creator;
    const isOwner = userID == ownerID;

    if (isOwner) {
      const newDate = new Date(dateObj);
      newDate.save();
      console.log(dateObj);
      res.status(200).send({ msg: "Date Submitted" });
    } else {
      res.status(400).send({ msg: "Not Authorized" });
    }
  } catch (error) {
    res.status(400).send({ msg: error });
  }
};

const getDates = async (req, res) => {
  const dates = await Date.find({ eventID: req.params.eventID });

  try {
    res.status(200).send(dates);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  newDate,
  getDates,
};
