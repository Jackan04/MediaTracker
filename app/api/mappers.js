// Assistance from ChatGPT to provide the mapper
// TMDB API response mapper for database storage
export function mapDetails(tmdb, mediaType) {
  const isMovie = mediaType === "movie";

  // TMDB returns relative poster paths like "/abc123.jpg"
  // Using w500 as default size, can be adjusted depending on where it's used
  const posterBaseUrl = "https://image.tmdb.org/t/p/w500";

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
    homepage: `https://www.themoviedb.org/${mediaType}/${tmdb.id}`,
    poster_path: tmdb.poster_path
      ? `${posterBaseUrl}${tmdb.poster_path}`
      : null,
    vote_average: tmdb.vote_average ? tmdb.vote_average : null,
    runtime_minutes: isMovie ? tmdb.runtime : null,
    seasons: !isMovie && tmdb.seasons ? tmdb.seasons : null,
    episodes_count: !isMovie && tmdb.seasons ? tmdb.seasons.episode_count : null,

    // These three are stringified for SQLite compatibility
    // Then parsed back to objects/arrays when needed in UI components
    genres_json: JSON.stringify(tmdb.genres || []),
    providers_json: JSON.stringify(tmdb?.["watch/providers"]?.results || {}),
    cast_json: JSON.stringify(tmdb?.credits?.cast || []),
  };
}
