import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function queryDatabase<T = any>(query: string, params: any[]): Promise<{ rows: T[] }> {
  try {
    const client = await pool.connect();

    try {
      const result = await client.query(query, params);
      
      return result;
    } finally {
    
      client.release();
    }
  } catch (err) {
    console.error('Error executing query', err);
    throw err; 
  }
}
