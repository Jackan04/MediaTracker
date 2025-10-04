import { getDb } from './db.js';

const insertItem =  async (item) => {
    const db = await getDb()
    const now = Date.now()

    await db.runAsync(`
        INSERT INTO items (
            tmdb_id,
            media_type,
            title,
            overview,
            year,
            poster_path,
            vote_average,
            runtime_minutes,
            seasons_count,
            episodes_count,
            genres_json,         
            providers_json,      
            cast_json,
            saved,
            pinned,
            watched,
            created_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(tmdb_id, media_type)
        DO UPDATE SET saved = 1;`,
        [
            item.tmdb_id,
            item.media_type,
            item.title,
            item.overview,
            item.year,
            item.poster_path,
            item.vote_average,
            item.runtime_minutes,
            item.seasons_count,
            item.episodes_count,
            item.genres_json,
            item.providers_json,
            item.cast_json,
            1, // saved toggle
            0, // pinned toggle
            0, // watched toggle
            now, // created_at
        ]
    )
}

const getSavedItems = async (mediaType, isWatched) => {
  const db = await getDb();
  return await db.getAllAsync(
    `SELECT *
     FROM items
     WHERE media_type = ? AND watched = ?
     ORDER BY created_at DESC`,
    
     [mediaType, isWatched ? 1 : 0]
  );
};

const deleteItem = async (id) => {
    if(!id) throw new Error("id is required")
    const db = await getDb()
    try{
        await db.runAsync('DELETE FROM items WHERE id = ?', [id])
    }
    catch(error){
        console.error("Database delete failed:", error);
        throw error;
    }
}

const togglePinned = async (id, isPinned) => {
    if(!id) throw new Error("id is required")
    const db = await getDb()
    
    const { pinnedItems } = await db.getFirstAsync(
        `SELECT COUNT(*) AS count FROM items WHERE pinned = 1;`
    );
    
    // Limit pinned items to 3
    if (pinnedItems >= 3) {
        throw new Error('You can only pin up to 3 items.');
    }


    if(!isPinned){
        await db.runAsync('UPDATE items SET pinned = ? WHERE id = ?', [1, id]) 
    }
    else {
        await db.runAsync('UPDATE items SET pinned = ? WHERE id = ?', [0, id])
    }

}

const toggleWatched = async (id, isWatched) => {
    if(!id) throw new Error("id is required")
    const db = await getDb()
    if(!isWatched){
        await db.runAsync('UPDATE items SET watched = ? WHERE id = ?', [1, id])
    }else {
        await db.runAsync('UPDATE items SET watched = ? WHERE id = ?', [0, id])
    }
    
}

export { deleteItem, getSavedItems, insertItem, togglePinned, toggleWatched };
