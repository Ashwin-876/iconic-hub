import { connectToDatabase } from '../../utils/mongodb';

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
  { id: 'n3', text: "Subscription transaction approved for Nisha Mehta ($19.99/mo)", time: "12m ago", type: "finance" }
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

export default async function handler(req, res) {
  let dbConnection;
  try {
    const { db } = await connectToDatabase();
    dbConnection = db;
  } catch (error) {
    return res.status(503).json({ error: 'Database connection offline', fallback: true });
  }

  // Collection handles
  const usersCol = dbConnection.collection('users');
  const coursesCol = dbConnection.collection('courses');
  const eventsCol = dbConnection.collection('events');
  const notificationsCol = dbConnection.collection('notifications');
  const statsCol = dbConnection.collection('stats');

  // GET: Fetch all states
  if (req.method === 'GET') {
    try {
      // Seed if collections are empty
      if (await usersCol.countDocuments() === 0) await usersCol.insertMany(DEFAULT_USERS);
      if (await coursesCol.countDocuments() === 0) await coursesCol.insertMany(DEFAULT_COURSES);
      if (await eventsCol.countDocuments() === 0) await eventsCol.insertMany(DEFAULT_EVENTS);
      if (await notificationsCol.countDocuments() === 0) await notificationsCol.insertMany(DEFAULT_NOTIFICATIONS);
      
      let stats = await statsCol.findOne({ id: 'platform_stats' });
      if (!stats) {
        stats = { id: 'platform_stats', revenue: 82561, ai_queries: 4822 };
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
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // POST: Execute db mutations
  if (req.method === 'POST') {
    const { action, payload } = req.body;

    try {
      if (action === 'registerUser') {
        const newUser = {
          id: String(Date.now()),
          progress: 0,
          joined: new Date().toISOString().split('T')[0],
          status: 'Active',
          ...payload
        };
        await usersCol.insertOne(newUser);
        await addNotification(dbConnection, `New student registered: ${newUser.name} (${newUser.email})`, 'user');
        return res.status(200).json(newUser);
      }

      if (action === 'enrollCourse') {
        const { courseId, email } = payload;
        await coursesCol.updateOne({ id: courseId }, { $inc: { students: 1 } });
        const course = await coursesCol.findOne({ id: courseId });
        await addNotification(dbConnection, `${email} enrolled in course: ${course?.title || courseId}`, 'course');
        return res.status(200).json({ success: true });
      }

      if (action === 'makePayment') {
        const { amount, details } = payload;
        await statsCol.updateOne({ id: 'platform_stats' }, { $inc: { revenue: amount } });
        await addNotification(dbConnection, `Payment of $${amount} received from ${details}`, 'finance');
        return res.status(200).json({ success: true });
      }

      if (action === 'registerEvent') {
        const { eventId, studentName } = payload;
        await eventsCol.updateOne({ id: eventId }, { $inc: { attendees: 1 } });
        const eventItem = await eventsCol.findOne({ id: eventId });
        await addNotification(dbConnection, `${studentName} registered for event: ${eventItem?.title || eventId}`, 'event');
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
        await addNotification(dbConnection, `New course submitted for review: ${newCourse.title} by ${newCourse.instructor}`, 'course');
        return res.status(200).json(newCourse);
      }

      if (action === 'approveCourse') {
        const { courseId } = payload;
        await coursesCol.updateOne({ id: courseId }, { $set: { status: 'Approved' } });
        const course = await coursesCol.findOne({ id: courseId });
        await addNotification(dbConnection, `Course approved: ${course?.title || courseId}`, 'course');
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
        await addNotification(dbConnection, `New event scheduled: ${newEvent.title}`, 'event');
        return res.status(200).json(newEvent);
      }

      if (action === 'cancelEvent') {
        const { eventId } = payload;
        await eventsCol.deleteOne({ id: eventId });
        await addNotification(dbConnection, `Event cancelled: ID ${eventId}`, 'event');
        return res.status(200).json({ success: true });
      }

      if (action === 'logAIQuery') {
        await statsCol.updateOne({ id: 'platform_stats' }, { $inc: { ai_queries: 1 } });
        return res.status(200).json({ success: true });
      }

      return res.status(400).json({ error: 'Unknown action type' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
