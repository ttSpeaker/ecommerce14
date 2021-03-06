require('dotenv').config();

const cors = require('cors');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const connectMongoDB = require('./utils/mongo-client').connectMongoDB;

const authRoutes = require('./routes/auth');
const productsRouter = require('./routes/products');

const app = express();
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

const STATIC_PATH = path.join(__dirname, '..', 'client', 'build');

app.use('/api/products', productsRouter);
app.use('/api/auth', authRoutes);
app.use('/api', (req, res, next) => {
  res.status(404).json({ message: 'Not found' });
});

app.use(express.static(STATIC_PATH));
app.get('/*', (req, res) => {
  res.sendFile(path.join(STATIC_PATH, 'index.html'));
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectMongoDB();
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

startServer();
