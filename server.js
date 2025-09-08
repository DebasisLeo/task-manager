const express = require('express');
const bodyParser = require('body-parser');

const taskRoutes = require('./routes/tasks');

const app = express();


app.use(bodyParser.json());


app.use('/tasks', taskRoutes);


app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
