// Required External Modules and Interfaces
const express = require("express");
const { checkJwt, getUserID } = require("../authz/check-jwt");
// Services
const {createNewEvent, getAllEvents, getEventByID, getUserEvents} = require("./events.service")
const {newDate, getDates} = require("./dates.service")
const { createTicket, getTicketData, getUserTickets } = require("./tickets.service")
// Router Definition
const eventsRouter = express.Router();

//Controller Definitions

// Create a new event
eventsRouter.post("/create-new", checkJwt,createNewEvent);
// Get all events
eventsRouter.get("/all", getAllEvents );
// Get all events from logged in user
eventsRouter.post("/user-events", getUserEvents);
// Get event data by event id
eventsRouter.get("/id/:id", getEventByID);
// Create a new date for an event
eventsRouter.post("/:eventID/new-date", checkJwt, newDate);
// Get all dates from an event
eventsRouter.get("/:eventID/dates", getDates)
// Create a ticket for a date for a logged in user
eventsRouter.post("/ticket/create-ticket", createTicket)
// Get data for a created ticket
eventsRouter.get("/ticket/:ticketID", getTicketData)
// Get al tickets bought by user
eventsRouter.post("/ticket/user", getUserTickets)



module.exports = {
  eventsRouter,
};
