const Booking = require('../../models/booking');
const { transformEvent, transformBooking } = require('./merge');
const Event = require('../../models/event');

module.exports = {
  bookings: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('You are not authenticated');
    }
    try {
      const bookings = await Booking.find();
      return bookings.map(booking => {
        return transformBooking(booking);
      });
    } catch (err) {
      throw err;
    }
  },
  cancelBooking: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('You are not authenticated');
    }
    try {
      const booking = await Booking.findById({ _id: args.bookingId }).populate(
        'event'
      );
      const event = transformEvent(booking.event);
      await Booking.deleteOne({ _id: args.bookingId });
      return event;
    } catch (err) {
      throw err;
    }
  },
  bookEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('You are not authenticated');
    }
    try {
      const fetchedEvent = await Event.findOne({ _id: args.eventId });
      const booking = new Booking({
        user: req.userId,
        event: fetchedEvent
      });
      const result = await booking.save();
      return transformBooking(result);
    } catch (err) {
      throw err;
    }
  }
};
