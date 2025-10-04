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
        
        CREATE INDEX IF NOT EXISTS idx_items_media_type ON items(media_type);
        CREATE INDEX IF NOT EXISTS idx_items_created_at ON items(created_at DESC);
      `);
    const allRows = await db.getAllAsync('SELECT * FROM items');
    return allRows;
  
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export { getDb, initDb };
