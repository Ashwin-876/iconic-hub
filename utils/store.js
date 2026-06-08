const IS_CLIENT = typeof window !== 'undefined';
const API_URL = IS_CLIENT && window.location.hostname === 'localhost' ? 'http://localhost:5002/api/db' : '/api/db';

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

class RealtimeDatabase {
  constructor() {
    this.listeners = new Set();
    this.channel = IS_CLIENT ? new BroadcastChannel('lms_realtime_db') : null;
    
    if (this.channel) {
      this.channel.onmessage = () => {
        this.notifyListeners();
      };
    }

    if (IS_CLIENT) {
      this.fetchState();
      setInterval(() => this.fetchState(), 6000);
    }
  }

  async fetchState() {
    try {
      const res = await fetch(API_URL);
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('db_users', JSON.stringify(data.users));
        localStorage.setItem('db_courses', JSON.stringify(data.courses));
        localStorage.setItem('db_events', JSON.stringify(data.events));
        localStorage.setItem('db_notifications', JSON.stringify(data.notifications));
        localStorage.setItem('db_revenue', String(data.revenue));
        localStorage.setItem('db_ai_queries', String(data.ai_queries));
        this.broadcastChange();
      }
    } catch (err) {
      console.warn('⚠️ Syncing state from API failed, using cached offline state:', err.message);
    }
  }

  async postMutation(action, payload) {
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, payload })
      });
      this.fetchState();
    } catch (err) {
      console.warn('⚠️ Posting mutation to API failed, using offline fallback:', err.message);
    }
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notifyListeners() {
    this.listeners.forEach(cb => cb());
  }

  broadcastChange() {
    if (this.channel) {
      this.channel.postMessage({ type: 'SYNC_STATE' });
    }
    this.notifyListeners();
  }

  getUsers() {
    if (!IS_CLIENT) return DEFAULT_USERS;
    const val = localStorage.getItem('db_users');
    return val ? JSON.parse(val) : DEFAULT_USERS;
  }

  getCourses() {
    if (!IS_CLIENT) return DEFAULT_COURSES;
    const val = localStorage.getItem('db_courses');
    return val ? JSON.parse(val) : DEFAULT_COURSES;
  }

  getEvents() {
    if (!IS_CLIENT) return DEFAULT_EVENTS;
    const val = localStorage.getItem('db_events');
    return val ? JSON.parse(val) : DEFAULT_EVENTS;
  }

  getNotifications() {
    if (!IS_CLIENT) return DEFAULT_NOTIFICATIONS;
    const val = localStorage.getItem('db_notifications');
    return val ? JSON.parse(val) : DEFAULT_NOTIFICATIONS;
  }

  getRevenue() {
    if (!IS_CLIENT) return 82561;
    const val = localStorage.getItem('db_revenue');
    return val ? Number(val) : 82561;
  }

  getAIQueries() {
    if (!IS_CLIENT) return 4822;
    const val = localStorage.getItem('db_ai_queries');
    return val ? Number(val) : 4822;
  }

  registerUser(user) {
    const users = this.getUsers();
    const newUser = {
      id: String(Date.now()),
      progress: 0,
      joined: new Date().toISOString().split('T')[0],
      status: 'Active',
      ...user
    };
    users.push(newUser);
    localStorage.setItem('db_users', JSON.stringify(users));
    
    this.addNotification({
      text: `New student registered: ${newUser.name} (${newUser.email})`,
      type: 'user'
    });

    this.broadcastChange();
    this.postMutation('registerUser', user);
    return newUser;
  }

  addNotification(notif) {
    const notifs = this.getNotifications();
    const newNotif = {
      id: String(Date.now()),
      time: 'Just now',
      ...notif
    };
    notifs.unshift(newNotif);
    localStorage.setItem('db_notifications', JSON.stringify(notifs.slice(0, 50)));
  }

  enrollCourse(courseId, email) {
    const courses = this.getCourses();
    const courseIndex = courses.findIndex(c => c.id === courseId);
    if (courseIndex !== -1) {
      courses[courseIndex].students = (courses[courseIndex].students || 0) + 1;
      localStorage.setItem('db_courses', JSON.stringify(courses));
    }
    
    this.addNotification({
      text: `${email} enrolled in course: ${courses[courseIndex]?.title || courseId}`,
      type: 'course'
    });

    this.broadcastChange();
    this.postMutation('enrollCourse', { courseId, email });
  }

  makePayment(amount, details) {
    const current = this.getRevenue();
    const next = current + amount;
    localStorage.setItem('db_revenue', String(next));

    this.addNotification({
      text: `Payment of $${amount} received from ${details}`,
      type: 'finance'
    });

    this.broadcastChange();
    this.postMutation('makePayment', { amount, details });
  }

  registerEvent(eventId, studentName) {
    const events = this.getEvents();
    const idx = events.findIndex(e => e.id === eventId);
    if (idx !== -1) {
      events[idx].attendees = (events[idx].attendees || 0) + 1;
      localStorage.setItem('db_events', JSON.stringify(events));
    }

    this.addNotification({
      text: `${studentName} registered for event: ${events[idx]?.title || eventId}`,
      type: 'event'
    });

    this.broadcastChange();
    this.postMutation('registerEvent', { eventId, studentName });
  }

  createCourse(course) {
    const courses = this.getCourses();
    const newCourse = {
      id: String(Date.now()),
      status: 'Pending Review',
      students: 0,
      rating: 0.0,
      ...course
    };
    courses.unshift(newCourse);
    localStorage.setItem('db_courses', JSON.stringify(courses));

    this.addNotification({
      text: `New course submitted for review: ${newCourse.title} by ${newCourse.instructor}`,
      type: 'course'
    });

    this.broadcastChange();
    this.postMutation('createCourse', course);
  }

  approveCourse(courseId) {
    const courses = this.getCourses();
    const idx = courses.findIndex(c => c.id === courseId);
    if (idx !== -1) {
      courses[idx].status = 'Approved';
      localStorage.setItem('db_courses', JSON.stringify(courses));

      this.addNotification({
        text: `Course approved: ${courses[idx].title}`,
        type: 'course'
      });

      this.broadcastChange();
    }
    this.postMutation('approveCourse', { courseId });
  }

  addEvent(event) {
    const events = this.getEvents();
    const newEvent = {
      id: String(Date.now()),
      status: 'Upcoming',
      attendees: 0,
      ...event
    };
    events.unshift(newEvent);
    localStorage.setItem('db_events', JSON.stringify(events));

    this.addNotification({
      text: `New event scheduled: ${newEvent.title}`,
      type: 'event'
    });

    this.broadcastChange();
    this.postMutation('addEvent', event);
  }

  cancelEvent(eventId) {
    const events = this.getEvents();
    const filtered = events.filter(e => e.id !== eventId);
    localStorage.setItem('db_events', JSON.stringify(filtered));
    
    this.addNotification({
      text: `Event cancelled: ID ${eventId}`,
      type: 'event'
    });

    this.broadcastChange();
    this.postMutation('cancelEvent', { eventId });
  }

  logAIQuery() {
    const current = this.getAIQueries();
    localStorage.setItem('db_ai_queries', String(current + 1));
    this.broadcastChange();
    this.postMutation('logAIQuery', {});
  }
}

export const realtimeDb = new RealtimeDatabase();
