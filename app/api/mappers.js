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
    episodes_count:
      !isMovie && tmdb.seasons ? tmdb.seasons.episode_count : null,

    // These three are stringified for SQLite compatibility
    // Then parsed back to objects/arrays when needed in UI components
    genres_json: JSON.stringify(tmdb.genres || []),
  };
}

export function mapCast(tmdb) {
  const profileBaseUrl = "https://image.tmdb.org/t/p/w185";

  return {
    id: tmdb.id,
    name: tmdb.name,
    character: tmdb.character,
    profile: `${profileBaseUrl}${tmdb.profile_path}`,
  };
}

export function mapProviders(tmdb) {
  const logoBaseUrl = `https://image.tmdb.org/t/p/w92`;

  return {
    id: tmdb.provider_id,
    name: tmdb.provider_name,
    logo: `${logoBaseUrl}${tmdb.logo_path}`,
  };
}
