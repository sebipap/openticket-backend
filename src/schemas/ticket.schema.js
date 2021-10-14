const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  dateID: String,
  ownerID: String,
  ownerName: String,
  ownerEmail: String
})

const Ticket = mongoose.model("EventTicket", ticketSchema);

module.exports = { Ticket };


