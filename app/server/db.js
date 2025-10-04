import * as SQLite from 'expo-sqlite';

const DATABASE_NAME = "db.db"

let dbInstance = null

const getDb = async () => {
  try {
    if (!dbInstance) {
      dbInstance = await SQLite.openDatabaseAsync(DATABASE_NAME);
    }
    return dbInstance;
  } catch (error) {
    console.error("Error retrieving the database:", error);
    throw error;
  }
};


// Initialazation of db on launch
const initDb = async () => { 

    try{
        const db = await getDb()
        console.log(`Database open`);
        
        // Assistance from ChatGPT in generating this SQLite schema
        await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tmdb_id INTEGER NOT NULL,
            media_type TEXT NOT NULL CHECK (media_type IN ('movie','tv')),
            title TEXT NOT NULL,
            overview TEXT,
            year INTEGER,
            poster_path TEXT,
            vote_average REAL,
            runtime_minutes INTEGER,
            seasons_count INTEGER,
            episodes_count INTEGER,

            genres_json TEXT,         
            providers_json TEXT,      
            cast_json TEXT,

            saved INTEGER NOT NULL DEFAULT 1,
            pinned INTEGER NOT NULL DEFAULT 0,
            watched INTEGER NOT NULL DEFAULT 0,

            created_at INTEGER NOT NULL,
            UNIQUE (tmdb_id, media_type)
        );
        
        // Indexes for better query performance
        CREATE INDEX IF NOT EXISTS idx_items_media_type ON items(media_type);
        CREATE INDEX IF NOT EXISTS idx_items_created_at ON items(created_at DESC);
        `);

  const existing = await db.getFirstAsync('SELECT COUNT(*) as count FROM items;');

    if (existing.count === 0) {
      console.log('Seeding dummy data...');

      const now = Date.now();

      await db.runAsync(
        `INSERT INTO items (
          tmdb_id, media_type, title, overview, year, poster_path, vote_average,
          runtime_minutes, seasons_count, episodes_count,
          genres_json, providers_json, cast_json,
          saved, pinned, watched, created_at
        ) VALUES
          (1001, 'movie', 'Inception', 'A mind-bending thriller by Christopher Nolan.', 2010, '/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg', 8.8, 148, NULL, NULL, '["Action","Sci-Fi"]', '[]', '[]', 1, 1, 0, ?),
          (1002, 'movie', 'The Dark Knight', 'Batman faces the Joker in Gotham.', 2008, '/qJ2tW6WMUDux911r6m7haRef0WH.jpg', 9.0, 152, NULL, NULL, '["Action","Crime"]', '[]', '[]', 1, 0, 1, ?),
          (2001, 'tv', 'Breaking Bad', 'A chemistry teacher becomes a meth producer.', 2008, '/ggFHVNu6YYI5L9pCfOacjizRGt.jpg', 9.5, NULL, 5, 62, '["Crime","Drama"]', '[]', '[]', 1, 0, 1, ?),
          (2002, 'tv', 'Stranger Things', 'A group of kids uncover supernatural mysteries.', 2016, '/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg', 8.7, NULL, 4, 34, '["Sci-Fi","Thriller"]', '[]', '[]', 1, 0, 0, ?)
        `,
        [now, now, now, now]
      );

      console.log('Dummy data inserted.');
    }

    // Return current rows
    const allRows = await db.getAllAsync('SELECT * FROM items');
    return allRows;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export { getDb, initDb };