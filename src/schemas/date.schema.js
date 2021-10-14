const mongoose = require("mongoose");

const dateSchema = new mongoose.Schema({
  eventID: String,
  date: String,
  time: String,
  price: String,
  capacity: Number,
  occupied: Number,
});

const Date = mongoose.model("EventDate", dateSchema);

module.exports = { Date };


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