const insertItem =  async (item) => {
    const db = await getDb()
    const now = Date.now();

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
    );
}

const listItemsByMediaType = async (mediaType) => {
    const db = await getDb()
    const allRows = await db.getAllAsync(`SELECT * FROM items WHERE media_type = ? ORDER BY created_at DESC`, [mediaType])
    return allRows
}

const deleteItem = async (id) => {
    const db = await getDb()
    await db.runAsync('DELETE FROM items WHERE id = ?', [id])
}

const togglePinned = async (id, isPinned) => {
    const db = await getDb()
    
    if(!isPinned){
        await db.runAsync('UPDATE items SET pinned = ? WHERE id = ?', [1, id]);    
    }
    else {
        await db.runAsync('UPDATE items SET pinned = ? WHERE id = ?', [0, id]);
    }

}

const toggleWatched = async (id, isWatched) => {
    const db = await getDb()
    if(!isWatched){
        await db.runAsync('UPDATE items SET watched = ? WHERE id = ?', [1, id]);
    }else {
        await db.runAsync('UPDATE items SET watched = ? WHERE id = ?', [0, id]);
    }
    
}