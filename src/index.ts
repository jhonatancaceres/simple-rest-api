import express from 'express';
import routes from './routes';

const cors = require('cors');

export const app = express();
const port = 3000;

app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

app.use(cors({
  origin: [
    'http://localhost:8081',
    'exp://192.168.100.26:8081',
    'http://192.168.100.xxx:8081'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept'
  ],
  exposedHeaders: ['Content-Range', 'X-Content-Range'], // If using pagination
  credentials: true,
  maxAge: 86400 // Preflight cache duration
}));

app.use('/api/v1', routes);

app.listen(port,() => {
  console.log(`Server is running on http://localhost:${port}`);
});

console.log(process.env)




// Basic CORS setup (adjust for production)
