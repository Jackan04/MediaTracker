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
            created_at,
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
}

const deleteItem = async (id) => {
    const db = await getDb()

}

const togglePinned = async (id) => {
    const db = await getDb()

}

const toggleWatched = async (id) => {
    const db = await getDb()

}