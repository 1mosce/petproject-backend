import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config(); // Load environment variables from .env file

export const applicationDatabaseProvider = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> => {
      const connectionString = process.env.DB_CONNECTION_STRING;
      if (!connectionString) {
        throw new Error(
          'DB_CONNECTION_STRING is not defined in the environment variables.',
        );
      }
      return mongoose.connect(connectionString);
    },
  },
];
