// Schemas
const { Event } = require("../schemas/event.schema");
const { Date } = require("../schemas/date.schema");
const { checkJwt, getUserID } = require("../authz/check-jwt");


const createNewEvent = (req, res) => {
  const userID = getUserID(req.headers.authorization);
  const eventObj = {
    name: req.body.eventName,
    location: req.body.location,
    creator: userID,
    description: req.body.description,
    imgURL: req.body.imgURL,
  };

  try {
    const newEvent = new Event(eventObj);
    newEvent.save();
    eventID = newEvent._id
    res.status(200).send({msg: "Event Submitted", id: eventID});
  } catch (error) {
    res.status(400).send({msg: error});
  }


}

const getAllEvents = async (req, res) => {
  const events = await Event.find({});
  res.send(events);
}

const getUserEvents = async (req, res) => {
  const userID = getUserID(req.headers.authorization);
  const events = await Event.find({creator: userID});
  res.send(events);
}

const getEventByID = async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.send(event);
}


module.exports = {
  createNewEvent,
  getAllEvents,
  getEventByID,
  getUserEvents
  
};
