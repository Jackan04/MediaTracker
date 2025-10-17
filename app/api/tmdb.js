import { mapCast, mapDetails, mapProviders } from "./mappers";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_TOKEN}`, // Bearer Key stored in .env file
  },
};

// Filtered Search by predefined media type
export async function searchByMediaType(mediaType, query) {
  const isMovie = mediaType === "movie";

  const cleanQuery = query.trim().toLowerCase();
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/${mediaType}?query=${cleanQuery}`,
      options
    );
    const json = await response.json();

    const searchResults = json.results.map((result) =>
      mapDetails(result, isMovie ? "movie" : "tv")
    ); // Map each item from the search results to get only the necessary fields

    return searchResults;
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

// General Search (both movies and shows)
export async function searchMedia(query) {
  const cleanQuery = query.trim().toLowerCase();

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${cleanQuery}`,
      options
    );
    const json = await response.json();

    // Filter out people from the search result
    const searchResults = json.results
      .filter(
        (result) => result.media_type === "movie" || result.media_type === "tv"
      )
      .map((result) => mapDetails(result, result.media_type));

    return searchResults;
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

export async function getTrendingMovies() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day`,
      options
    );
    const json = await response.json();

    const trendingMovies = json.results.map(
      (movie) => mapDetails(movie, "movie") // Map each item from the trending movies to get only the necessary fields
    ); 

    return trendingMovies;
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

export async function getTrendingShows() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/tv/day`,
      options
    );
    const json = await response.json();
    const trendingShows = json.results.map((show) => mapDetails(show, "tv")); // Map each item from the trending shows to get only the necessary fields

    return trendingShows;
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

export async function getItemDetails(tmdb_id, mediaType) {
  try {
    const endpoint = mediaType === "movie" ? "movie" : "tv";
    const response = await fetch(
      `https://api.themoviedb.org/3/${endpoint}/${tmdb_id}`,
      options
    );
    const json = await response.json();
    const item = mapDetails(json, mediaType);

    return item;
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

export async function getCast(tmdb_id, media_type) {
  try {
    const endpoint = media_type === "movie" ? "movie" : "tv";
    const response = await fetch(
      `https://api.themoviedb.org/3/${endpoint}/${tmdb_id}/credits`,
      options
    );
    const json = await response.json();
    const items = json.cast.map((item) => mapCast(item, media_type)); // Map each cast item
    return items;
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

export async function getProviders(tmdb_id, media_type) {
  try {
    const endpoint = media_type === "movie" ? "movie" : "tv";
    const response = await fetch(
      `https://api.themoviedb.org/3/${endpoint}/${tmdb_id}/watch/providers`,
      options
    );
    const json = await response.json();

    // Get Swedish providers for all three categories
    const swedenProviders = json.results?.SE;

    if (!swedenProviders) {
      return { stream: [], buy: [], rent: [] }; 
    }
    
    const streamProviders =
      swedenProviders.flatrate?.map((item) => ({
        ...mapProviders(item), // Map each provider item for type "stream"
        type: "stream", 
      })) || [];

    const buyProviders =
      swedenProviders.buy?.map((item) => ({
        ...mapProviders(item), // Map each provider item for type "buy"
        type: "buy",
      })) || [];

    const rentProviders =
      swedenProviders.rent?.map((item) => ({
        ...mapProviders(item), // Map each provider item for type "rent"
        type: "rent",
      })) || [];

    return {
      stream: streamProviders,
      buy: buyProviders,
      rent: rentProviders,
    };
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return { stream: [], buy: [], rent: [] }; 
  }
}
