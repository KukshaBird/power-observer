import express from 'express';

// Routes
import heartbeatRouter from './routes/heartbeat';

const app = express();

app.use('/heartbeat', heartbeatRouter);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3000, (error) => console.log(error || 'Server is running'));

