const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: String,
  creator: String,
  description: String,
  imgURL: String,
});

const Event = mongoose.model("Event", eventSchema);

module.exports = { Event };


/*

Event
	* name
	* location
  * creator
	* description
	* imgURL

EventDate
  * Fecha
  * eventID
	* date
	* time
	* price
  * capacity
  * occupied

*/