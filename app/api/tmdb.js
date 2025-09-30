const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_TOKEN}`, // Bearer Key stored in .env file
  },
};

// Function to extract only the necessary fields for the database.
// Enables sending an item object instead of providing all parameters individually.
function mapTmdbToItem(tmdb, mediaType) {
  const isMovie = mediaType === 'movie';
  
  return {
    tmdb_id: tmdb.id,
    media_type: mediaType,
    title: isMovie ? tmdb.title : tmdb.name,
    overview: tmdb.overview ?? null,
    year: (() => {
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

export async function searchMovies(query){

    try{
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}`, options)
        const json = await response.json()   
        return json
    }
    catch(error){
        console.error(`Error: ${error.message}`)
    }    
}

export async function searchShows(query){

    try{
        const response = await fetch(`https://api.themoviedb.org/3/search/tv?query=${query}`, options)
        const json = await response.json()
        return json
    }
    catch(error){
        console.error(`Error: ${error.message}`)
    }
    
}

export async function getTrendingMovies(){

    try{
        const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day`, options)
        const json = await response.json()
        return json
    }
    catch(error){
        console.error(`Error: ${error.message}`)
    }
    
}

export async function getTrendingShows(){

    try{
        const response = await fetch(`https://api.themoviedb.org/3/trending/tv/day`, options)
        const json = await response.json()
        return json
    }
    catch(error){
        console.error(`Error: ${error.message}`)
    }
    
}

export async function getMovieDetails(id){

    try{
        // TODO: Figure out how to access the backdrop and poser paths
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}`, options)
        const json = await response.json()
        const movie = mapTmdbToItem(json, 'movie')
        
        return movie
    }
    catch(error){
        console.error(`Error: ${error.message}`)
    }
    
}

export async function getShowDetails(id){

    try{
        // TODO: Figure out how to access the backdrop and poser paths
        const response = await fetch(`https://api.themoviedb.org/3/tv/${id}`, options)
        const json = await response.json()
        const show = mapTmdbToItem(json, 'show')
        
        return show
    }
    catch(error){
        console.error(`Error: ${error.message}`)
    }
    
}