// Function to extract only the necessary fields for the database and to display the details page
// Enables sending an item object instead of providing all parameters individually.
export function mapDetails(tmdb, mediaType) {
  const isMovie = mediaType === 'movie';
  
  return {
    tmdb_id: tmdb.id,
    media_type: mediaType,
    title: isMovie ? tmdb.title : tmdb.name,
    overview: tmdb.overview ?? null,
    year: (() => {
        // Grab the first 4 characters to display the year
        const date = isMovie ? tmdb.release_date : tmdb.first_air_date;
        return date ? Number(date.slice(0, 4)) : null;
    })(),

    poster_path: tmdb.poster_path ?? null,
    vote_average: typeof tmdb.vote_average === 'number' ? tmdb.vote_average : null,
    runtime_minutes: isMovie ? (tmdb.runtime ?? null) : null,
    seasons_count: !isMovie ? (tmdb.number_of_seasons ?? null) : null,
    episodes_count: !isMovie ? (tmdb.number_of_episodes ?? null) : null,
    genres_json: JSON.stringify(tmdb.genres || []),
    providers_json: JSON.stringify(tmdb?.["watch/providers"]?.results || {}),
    cast_json: JSON.stringify(tmdb?.credits?.cast || []),
  };
}

// Function to extract only the fields required for displaying the preview cards
export function mapPreview(tmdb, mediaType){
    const isMovie = mediaType === "movie"

    return {
        tmdb_id: tmdb.id,
        media_type: mediaType,
        title: isMovie ? tmdb.title : tmdb.name,
        poster_path: tmdb.poster_path ?? null,
        year: (() => {
            // Grab the first 4 characters to display the year
            const date = isMovie ? tmdb.release_date : tmdb.first_air_date;
            return date ? Number(date.slice(0,4)) : null;
        })(),
    }
}