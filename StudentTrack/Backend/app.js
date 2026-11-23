const express = require('express');
const cors = require('cors');

const app = express();

const allowedOrigins = [
  'http://localhost:5174',
  'http://localhost:4173',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));

app.disable('x-powered-by');

app.use(express.json());

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const subjectRoutes = require('./routes/subject');
app.use('/api/subjects', subjectRoutes);

const sessionRoutes = require('./routes/session');
app.use('/api/sessions', sessionRoutes);

const attendanceRoutes = require('./routes/attendance');
app.use('/api/attendance', attendanceRoutes);

const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);

const adminAttendanceRoutes = require('./routes/adminAttendance');
app.use('/api/admin/attendance', adminAttendanceRoutes);

app.get('/', (req, res) => {
  res.send('Attendance Tracker API is running...');
});

module.exports = app;
