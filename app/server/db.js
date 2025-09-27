import * as SQLite from 'expo-sqlite'

const DATABASE_NAME = "db.db"

let dbInstance = null

const getDb = async () => {
  if(!dbInstance){
    dbInstance = await SQLite.openDatabaseAsync(DATABASE_NAME);
  }
  return dbInstance
}

// Initialazation of. database on launch
const initDb = async () => { 

    try{
        const db = await getDb()
        console.log(`Database open`);
        
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
            updated_at INTEGER NOT NULL,
            UNIQUE (tmdb_id, media_type)
        );
        `);

        const allRows = await db.getAllAsync('SELECT * FROM items');
        return allRows;
    }
    catch(error){
      console.error(error.message)
      throw error
   }
}

const insertItem =  async () => {
    const db = await getDb()
    
    await db.runAsync(`
-- Re-runnable: replaces same (tmdb_id, media_type) if already inserted
INSERT OR REPLACE INTO items
(tmdb_id, media_type, title, overview, year, poster_path, vote_average, runtime_minutes, seasons_count, episodes_count,
 genres_json, providers_json, cast_json, saved, pinned, watched, created_at, updated_at)
VALUES
-- Movie: The Matrix
(603,'movie','The Matrix','A hacker discovers reality is a simulation.',1999,'/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',8.7,136,NULL,NULL,
 '["Action","Sci-Fi"]',
 '[{"provider_id":8,"provider_name":"Netflix"}]',
 '[{"id":6384,"name":"Keanu Reeves","character":"Neo","profile_path":"/p.jpg"},{"id":2975,"name":"Laurence Fishburne","character":"Morpheus","profile_path":"/p2.jpg"}]',
 1,0,1, strftime('%s','now')*1000, strftime('%s','now')*1000),

-- Movie: Interstellar
(157336,'movie','Interstellar','Explorers travel through a wormhole in space.',2014,'/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',8.6,169,NULL,NULL,
 '["Adventure","Drama","Sci-Fi"]',
 '[{"provider_id":119,"provider_name":"Amazon Prime Video"}]',
 '[{"id":10297,"name":"Matthew McConaughey","character":"Cooper","profile_path":"/m.jpg"},{"id":1813,"name":"Anne Hathaway","character":"Brand","profile_path":"/m2.jpg"}]',
 1,1,1, strftime('%s','now')*1000, strftime('%s','now')*1000),

-- Movie: Inception
(27205,'movie','Inception','A thief enters dreams to steal secrets.',2010,'/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg',8.4,148,NULL,NULL,
 '["Action","Sci-Fi","Thriller"]',
 '[{"provider_id":337,"provider_name":"Apple TV"}]',
 '[{"id":6193,"name":"Leonardo DiCaprio","character":"Cobb","profile_path":"/l.jpg"},{"id":24045,"name":"Joseph Gordon-Levitt","character":"Arthur","profile_path":"/l2.jpg"}]',
 1,0,0, strftime('%s','now')*1000, strftime('%s','now')*1000),

-- TV: Game of Thrones
(1399,'tv','Game of Thrones','Noble families vie for control of the Iron Throne.',2011,'/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg',8.4,NULL,8,73,
 '["Drama","Fantasy"]',
 '[{"provider_id":118,"provider_name":"HBO Max"}]',
 '[{"id":1223786,"name":"Emilia Clarke","character":"Daenerys Targaryen","profile_path":"/e.jpg"},{"id":239019,"name":"Kit Harington","character":"Jon Snow","profile_path":"/e2.jpg"}]',
 1,0,0, strftime('%s','now')*1000, strftime('%s','now')*1000),

-- TV: Stranger Things
(66732,'tv','Stranger Things','Mysteries unfold in a small town after a boy disappears.',2016,'/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg',8.6,NULL,4,34,
 '["Drama","Mystery","Sci-Fi"]',
 '[{"provider_id":8,"provider_name":"Netflix"}]',
 '[{"id":10990,"name":"Winona Ryder","character":"Joyce Byers","profile_path":"/s.jpg"},{"id":1083010,"name":"Millie Bobby Brown","character":"Eleven","profile_path":"/s2.jpg"}]',
 1,1,0, strftime('%s','now')*1000, strftime('%s','now')*1000),

-- TV: The Office (US)
(2316,'tv','The Office (US)','A mockumentary on a group of typical office workers.',2005,'/qWnJzyZhyy74gjpSjIXWmuk0ifX.jpg',8.6,NULL,9,201,
 '["Comedy"]',
 '[{"provider_id":119,"provider_name":"Amazon Prime Video"}]',
 '[{"id":103,"name":"Steve Carell","character":"Michael Scott","profile_path":"/o.jpg"},{"id":21705,"name":"John Krasinski","character":"Jim Halpert","profile_path":"/o2.jpg"}]',
 1,0,1, strftime('%s','now')*1000, strftime('%s','now')*1000),

-- TV: Chernobyl
(87108,'tv','Chernobyl','A dramat

`)


}

const listItemsByMediaType = async (mediaType) => {

}

const deleteItem = async (id) => {

}

const togglePinned = async (id) => {

}

const toggleWatched = async (id) => {

}



export  {getDb, initDb, insertItem}