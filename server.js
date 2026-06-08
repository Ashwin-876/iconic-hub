/**
 * ICONIC HUB - Standalone Express Backend Server
 * Handles direct MongoDB connection, API routes, and seeding.
 */

const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 5002;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/iconichub';

app.use(cors());
app.use(express.json());

// Cached DB Connection
let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }
  const client = await MongoClient.connect(MONGODB_URI, {
    connectTimeoutMS: 5000,
    socketTimeoutMS: 5000,
  });
  const db = client.db();
  cachedClient = client;
  cachedDb = db;
  return { client, db };
}

// Seed Data definition
const DEFAULT_USERS = [
  { id: '1', name: 'Ashwin Kumar', email: 'ashwin@gmail.com', role: 'Student', status: 'Active', progress: 85, path: 'AI Engineer', joined: '2026-05-01' },
  { id: '2', name: 'Dr. Elena Volkov', email: 'elena@iconichub.io', role: 'Instructor', status: 'Verified', progress: 100, path: 'Deep Learning', joined: '2025-10-12' },
  { id: '3', name: 'Sarah Jenkins', email: 'sarah.j@anthropic.com', role: 'Mentor', status: 'Verified', progress: 95, path: 'NLP Specialist', joined: '2026-02-15' },
  { id: '4', name: 'Marcus Chen', email: 'marcus@nvidia.com', role: 'Instructor', status: 'Verified', progress: 100, path: 'MLOps Architect', joined: '2026-01-20' },
  { id: '5', name: 'Nisha Mehta', email: 'nisha@gmail.com', role: 'Student', status: 'Pending Verification', progress: 34, path: 'Frontend Developer', joined: '2026-06-02' },
  { id: '6', name: 'Devon Wright', email: 'devon.w@gmail.com', role: 'Student', status: 'Active', progress: 62, path: 'DevOps Engineer', joined: '2026-04-18' }
];

const DEFAULT_COURSES = [
  { id: '101', title: 'Neural Networks & Deep Learning', category: 'AI & Machine Learning', status: 'Approved', instructor: 'Dr. Elena Volkov', students: 1240, rating: 4.9 },
  { id: '102', title: 'Mastering Kubernetes in Production', category: 'DevOps & Cloud', status: 'Approved', instructor: 'Marcus Chen', students: 850, rating: 4.8 },
  { id: '103', title: 'Advanced React Architecture Patterns', category: 'Web Development', status: 'Pending Review', instructor: 'Ashwin Kumar', students: 0, rating: 0.0 },
  { id: '104', title: 'Generative AI Applications with LLMs', category: 'AI & Machine Learning', status: 'Approved', instructor: 'Sarah Jenkins', students: 2310, rating: 4.95 }
];

const DEFAULT_EVENTS = [
  { id: 'ev1', title: 'Global GenAI Hackathon 2026', category: 'Hackathons', date: '2026-06-12', status: 'Upcoming', venue: 'Virtual & SF Campus', attendees: 512, limit: 1000 },
  { id: 'ev2', title: 'Deep Learning Model Tuning Workshop', category: 'Workshops', date: '2026-06-18', status: 'Upcoming', venue: 'Virtual / Zoom', attendees: 240, limit: 300 },
  { id: 'ev3', title: 'Agentic Workflows with Gemini API', category: 'Workshops', date: '2026-06-25', status: 'Upcoming', venue: 'Virtual / Google Meet', attendees: 185, limit: 250 },
  { id: 'ev4', title: 'Scaling LLMs in Production: Guest Lecture', category: 'Guest Lectures', date: '2026-05-28', status: 'Past', venue: 'Auditorium A', attendees: 420, limit: 500 }
];

const DEFAULT_NOTIFICATIONS = [
  { id: 'n1', text: "Ashwin Kumar selected career goal: AI & ML Engineer", time: "Just now", type: "info" },
  { id: 'n2', text: "AI Tutor generated code playground project: Vector Embeddings Masterclass", time: "4m ago", type: "ai" },
  { id: 'n3', text: "Subscription transaction approved for Nisha Mehta (₹1,659/mo)", time: "12m ago", type: "finance" }
];

async function addNotification(db, text, type) {
  const notificationsCol = db.collection('notifications');
  const count = await notificationsCol.countDocuments();
  if (count === 0) {
    await notificationsCol.insertMany(DEFAULT_NOTIFICATIONS);
  }
  await notificationsCol.insertOne({
    id: String(Date.now()),
    text,
    type,
    time: 'Just now'
  });
}

// API endpoint handler matching next.js api behavior
app.get('/api/db', async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    
    const usersCol = db.collection('users');
    const coursesCol = db.collection('courses');
    const eventsCol = db.collection('events');
    const notificationsCol = db.collection('notifications');
    const statsCol = db.collection('stats');

    // Seed if empty
    if (await usersCol.countDocuments() === 0) await usersCol.insertMany(DEFAULT_USERS);
    if (await coursesCol.countDocuments() === 0) await coursesCol.insertMany(DEFAULT_COURSES);
    if (await eventsCol.countDocuments() === 0) await eventsCol.insertMany(DEFAULT_EVENTS);
    if (await notificationsCol.countDocuments() === 0) await notificationsCol.insertMany(DEFAULT_NOTIFICATIONS);

    let stats = await statsCol.findOne({ id: 'platform_stats' });
    if (!stats) {
      stats = { id: 'platform_stats', revenue: 0, ai_queries: 4822 };
      await statsCol.insertOne(stats);
    }

    const users = await usersCol.find({}).toArray();
    const courses = await coursesCol.find({}).toArray();
    const events = await eventsCol.find({}).toArray();
    const notifications = await notificationsCol.find({}).sort({ _id: -1 }).limit(50).toArray();

    return res.status(200).json({
      users,
      courses,
      events,
      notifications,
      revenue: stats.revenue,
      ai_queries: stats.ai_queries
    });
  } catch (error) {
    console.warn('⚠️ MongoDB connection offline, serving fallback schema config:', error.message);
    return res.status(503).json({ error: 'Database connection offline', fallback: true });
  }
});

app.post('/api/db', async (req, res) => {
  const { action, payload } = req.body;
  
  try {
    const { db } = await connectToDatabase();
    const usersCol = db.collection('users');
    const coursesCol = db.collection('courses');
    const eventsCol = db.collection('events');
    const statsCol = db.collection('stats');

    if (action === 'registerUser') {
      const newUser = {
        id: String(Date.now()),
        progress: 0,
        joined: new Date().toISOString().split('T')[0],
        status: 'Active',
        ...payload
      };
      await usersCol.insertOne(newUser);
      await addNotification(db, `New student registered: ${newUser.name} (${newUser.email})`, 'user');
      return res.status(200).json(newUser);
    }

    if (action === 'enrollCourse') {
      const { courseId, email } = payload;
      await coursesCol.updateOne({ id: courseId }, { $inc: { students: 1 } });
      const course = await coursesCol.findOne({ id: courseId });
      await addNotification(db, `${email} enrolled in course: ${course?.title || courseId}`, 'course');
      return res.status(200).json({ success: true });
    }

    if (action === 'makePayment') {
      const { amount, details } = payload;
      await statsCol.updateOne({ id: 'platform_stats' }, { $inc: { revenue: amount } });
      await addNotification(db, `Payment of ₹${amount} received from ${details}`, 'finance');
      return res.status(200).json({ success: true });
    }

    if (action === 'registerEvent') {
      const { eventId, studentName } = payload;
      await eventsCol.updateOne({ id: eventId }, { $inc: { attendees: 1 } });
      const eventItem = await eventsCol.findOne({ id: eventId });
      await addNotification(db, `${studentName} registered for event: ${eventItem?.title || eventId}`, 'event');
      return res.status(200).json({ success: true });
    }

    if (action === 'createCourse') {
      const newCourse = {
        id: String(Date.now()),
        status: 'Pending Review',
        students: 0,
        rating: 0.0,
        ...payload
      };
      await coursesCol.insertOne(newCourse);
      await addNotification(db, `New course submitted for review: ${newCourse.title} by ${newCourse.instructor}`, 'course');
      return res.status(200).json(newCourse);
    }

    if (action === 'approveCourse') {
      const { courseId } = payload;
      await coursesCol.updateOne({ id: courseId }, { $set: { status: 'Approved' } });
      const course = await coursesCol.findOne({ id: courseId });
      await addNotification(db, `Course approved: ${course?.title || courseId}`, 'course');
      return res.status(200).json({ success: true });
    }

    if (action === 'addEvent') {
      const newEvent = {
        id: String(Date.now()),
        status: 'Upcoming',
        attendees: 0,
        ...payload
      };
      await eventsCol.insertOne(newEvent);
      await addNotification(db, `New event scheduled: ${newEvent.title}`, 'event');
      return res.status(200).json(newEvent);
    }

    if (action === 'cancelEvent') {
      const { eventId } = payload;
      await eventsCol.deleteOne({ id: eventId });
      await addNotification(db, `Event cancelled: ID ${eventId}`, 'event');
      return res.status(200).json({ success: true });
    }

    if (action === 'logAIQuery') {
      await statsCol.updateOne({ id: 'platform_stats' }, { $inc: { ai_queries: 1 } });
      return res.status(200).json({ success: true });
    }

    return res.status(400).json({ error: 'Unknown action' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`📡 Backend Server listening on http://localhost:${PORT}`);
});
