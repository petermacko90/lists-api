import type { LibSQLDatabase } from 'drizzle-orm/libsql';
import * as schema from '../db/schema.ts';
import type { Client } from '@libsql/client';

export type Database = LibSQLDatabase<typeof schema> & {
  $client: Client;
};

export type Error = { error: string };
