// Assistance from ChatGPT to provide these mappers

// TMDB API response mappers: 
    // mapDetails() for database storage and details page for search results and trending items
    // mapPreview() for preview card components 
    // mapSearchResults() for search result components


export function mapDetails(tmdb, mediaType) {
  const isMovie = mediaType === 'movie';
  const posterBaseUrl = "https://image.tmdb.org/t/p/w500";  // TMDB only gives a unique poster path, like "/abc123.jpg".
                                                            // To display the image, I have to prepend it with a base URL
  
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

    poster_path: tmdb.poster_path ? `${posterBaseUrl}${tmdb.poster_path}` : null,
    vote_average: typeof tmdb.vote_average === 'number' ? tmdb.vote_average : null,
    runtime_minutes: isMovie ? (tmdb.runtime ?? null) : null,
    seasons_count: !isMovie ? (tmdb.number_of_seasons ?? null) : null,
    episodes_count: !isMovie ? (tmdb.number_of_episodes ?? null) : null,

    // These three are stringified for SQLite compatibility
    // Then parsed back to objects/arrays when needed in UI components
    genres_json: JSON.stringify(tmdb.genres || []),
    providers_json: JSON.stringify(tmdb?.["watch/providers"]?.results || {}),
    cast_json: JSON.stringify(tmdb?.credits?.cast || []),
  };
}

