import { getDb } from "./db.js";

const insertItem = async (item) => {
  const db = await getDb();
  const now = Date.now();

  await db.runAsync(
    `
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
};

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

const isItemSaved = async (tmdb_id) => {
  const db = await getDb();

  const item = await db.getFirstAsync(
    `SELECT saved FROM items WHERE tmdb_id = ?`,
    [tmdb_id]
  );
  if (!item) return;

  const isSaved = item.saved === 1 ? true : false;

  return isSaved;
};

const deleteItem = async (tmdb_id) => {
  if (!tmdb_id) throw new Error("id is required");
  const db = await getDb();
  try {
    await db.runAsync("DELETE FROM items WHERE tmdb_id = ?", [tmdb_id]);

  } catch (error) {
    console.error("Database delete failed:", error);
    throw error;
  }
};

const getPinnedItems = async (mediaType) => {
  const db = await getDb();
  try {
    return await db.getAllAsync(
      "SELECT * FROM items WHERE media_type = ? AND pinned = ? AND watched = ? ORDER BY created_at DESC",
      [mediaType, 1, 0]
    );
  } catch (error) {
    console.error("Database query failed:", error);
    throw error;
  }
};

const getPinnedState = async (tmdb_id) => {
  const db = await getDb();
  try {
    const row = await db.getFirstAsync(
      `SELECT pinned FROM items WHERE tmdb_id = ?`,
      [tmdb_id]
    );
    return row && typeof row.pinned !== "undefined" ? row.pinned : 0;
  } catch (error) {
    console.error("Database query failed:", error);
    throw error;
  }
};

const togglePinned = async (tmdb_id, isPinned, isWatched, isSaved) => {
  if (!tmdb_id) throw new Error("tmdb_id is required");
  if (isWatched)
    alert("This item is marked as watched. Watched items can't be pinned.");

  const db = await getDb();

  const { currentlyPinnedItems } = await db.getFirstAsync(
    `SELECT COUNT(*) AS count FROM items WHERE pinned = 1;`
  );

  // Limit pinned items to 3
  if (currentlyPinnedItems >= 3) {
    throw new Error("You can only pin up to 3 items.");
  }

  const newValue = isPinned ? 0 : 1;
  await db.runAsync("UPDATE items SET pinned = ? WHERE tmdb_id = ?", [
    newValue,
    tmdb_id,
  ]);

  return newValue;
};

const toggleWatched = async (tmdb_id, isWatched) => {
  if (!tmdb_id) throw new Error("tmdb_id is required");
  const db = await getDb();
  const newValue = isWatched ? 0 : 1;
  await db.runAsync("UPDATE items SET watched = ? WHERE tmdb_id = ?", [
    newValue,
    tmdb_id,
  ]);
  return newValue;
};

const getWatchState = async (tmdb_id) => {
  if (!tmdb_id) throw new Error("tmdb_id is required");
  const db = await getDb();
  const row = await db.getFirstAsync(
    `SELECT watched FROM items WHERE tmdb_id = ?`,
    [tmdb_id]
  );
  return row && typeof row.watched !== "undefined" ? row.watched : 0;
};

export {
  deleteItem,
  getPinnedItems,
  getPinnedState,
  getSavedItems,
  getWatchState,
  insertItem,
  isItemSaved,
  togglePinned,
  toggleWatched,
};
