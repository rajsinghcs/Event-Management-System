const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { auth, requireRole } = require('../server/authMiddleware');

// Helper to convert _id to id
function toClientEvent(event) {
  if (!event) return event;
  const obj = event.toObject ? event.toObject() : event;
  obj.id = obj._id.toString();
  delete obj._id;
  delete obj.__v;
  if (obj.registrations) {
    obj.registrations = obj.registrations.map(r => {
      if (r._id) {
        r.id = r._id.toString();
        delete r._id;
      }
      return r;
    });
  }
  return obj;
}

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events.map(toClientEvent));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get "my events" for attendee (must come before :id route)
router.get('/my-events', auth, requireRole('attendee'), async (req, res) => {
  try {
    const events = await Event.find({ 'registrations.userId': req.user.id });
    res.json(events.map(toClientEvent));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get event by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(toClientEvent(event));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create event (organiser only)
router.post('/', auth, requireRole('organiser'), async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(toClientEvent(event));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update event (organiser only)
router.put('/:id', auth, requireRole('organiser'), async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(toClientEvent(event));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete event (organiser only)
router.delete('/:id', auth, requireRole('organiser'), async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get registrations for an event (organiser only)
router.get('/:id/registrations', auth, requireRole('organiser'), async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event.registrations.map(r => ({
      id: r._id?.toString() || '',
      name: r.name,
      email: r.email,
      registeredAt: r.registeredAt,
      userId: r.userId || null
    })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Register for event (attendee only, uses logged-in user)
router.post('/:id/register', auth, requireRole('attendee'), async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    // Prevent duplicate registration
    if (event.registrations.some(r => r.userId?.toString() === req.user.id)) {
      return res.status(400).json({ error: 'Already registered' });
    }
    event.registrations.push({
      name: req.user.name,
      email: req.user.email,
      userId: req.user.id,
    });
    await event.save();
    res.status(201).json(toClientEvent(event));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router; 