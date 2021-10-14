// Schemas
const { Event } = require("../schemas/event.schema");
const { Date } = require("../schemas/date.schema");
const { Ticket } = require("../schemas/ticket.schema");

const { checkJwt, getUserID } = require("../authz/check-jwt");

const bookSeat = async (dateID) => {
  const date = await Date.findById(dateID);
  date.occupied++;
  await date.save();
  console.log(date.occupied);
};

const createTicket = async (req, res) => {
  const userID = getUserID(req.headers.authorization);

  const { dateID, ownerName, ownerEmail } = req.body;
  const ticketObj = { ownerID: userID, dateID, ownerEmail, ownerName };
  const dateObj = await Date.findById(dateID);
  const { capacity, occupied } = dateObj;
  const available = capacity - occupied;

  if (available > 0) {
    console.log(ticketObj);
    try {
      const newTicket = new Ticket(ticketObj);
      newTicket.save();
      ticketID = newTicket._id;
      bookSeat(dateID);
      res.status(200).send({ msg: "Ticket Bought", id: ticketID });
    } catch (error) {
      res.status(400).send({ msg: error });
    }
  } else {
    res.status(400).send({ msg: "No Spaces Left" });
  }
};

const getTicketData = async (req, res) => {
  const ticketID = req.params.ticketID;
  res.send(await allTicketDataByID(ticketID));
};


const getUserTickets = async (req, res) => {
  try {
    const userID = getUserID(req.headers.authorization);
    const tickets = await Ticket.find({ ownerID: userID });

    const ticketsRes = await Promise.all(
      tickets.map((ticket) => allTicketDataByID(ticket._id))
    );
    console.log(ticketsRes);
    res.send(ticketsRes);
  } catch (err) {
    res.send({ error: "Forbidden" });
  }
};

const allTicketDataByID = async (ticketID) => {
  try {
    const ticketObj = await Ticket.findById(ticketID);
    const { dateID, ownerID, ownerName, ownerEmail } = ticketObj;
    const dateObj = await Date.findById(dateID);
    const { eventID, date, time, price } = dateObj;
    const eventObj = await Event.findById(eventID);
    const { name, location } = eventObj;
    return {
      ticketID,
      dateID,
      ownerID,
      ownerName,
      ownerEmail,
      date,
      time,
      price,
      name,
      location,
    };
  } catch (error) {
    return { err: "Incorrect Ticket ID" };
  }
};

module.exports = {
  createTicket,
  getTicketData,
  getUserTickets,
};
