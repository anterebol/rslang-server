const logger = require('./common/logging');

// uncaughtException is been catching by Winston
process.on('unhandledRejection', reason => {
  process.emit('uncaughtException', reason);
});

const mongoose = require('mongoose');
const { PORT } = require('./common/config');
const app = require('./app');

mongoose.connect(
  'mongodb+srv://aleks:11041996God@cluster0.vsa9jos.mongodb.net/?',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }
);

const db = mongoose.connection;

db.on('error', () => logger.error('MongoDB connection error:')).once(
  'open',
  () => {
    logger.info('Successfully connect to DB');
    app.listen(PORT, () =>
      logger.info(`App is running on http://localhost:${PORT}`)
    );
  }
);
