import { Module } from '@nestjs/common';
import { applicationDatabaseProvider } from './applicationDatabase.provider';

@Module({
  providers: [...applicationDatabaseProvider],
  exports: [...applicationDatabaseProvider],
})
export class applicationDatabaseModule {}
