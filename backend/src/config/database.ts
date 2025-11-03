import { Sequelize } from 'sequelize';
import { logger } from '@/utils/logger';

const sequelize = new Sequelize({
  dialect: 'postgres',
  url: process.env.DATABASE_URL,
  logging: (msg) => logger.debug(msg),
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export async function connectDatabase(): Promise<void> {
  try {
    await sequelize.authenticate();
    logger.info('Database connection established successfully');

    // Sync all models with database
    await sequelize.sync({ alter: false });
    logger.info('Database synchronized successfully');
  } catch (error) {
    logger.error('Unable to connect to database:', error);
    throw error;
  }
}

export { sequelize };