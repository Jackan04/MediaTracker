import { mapDetails, mapPreview, mapSearchResults } from "./mappers";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_TOKEN}`, // Bearer Key stored in .env file
  },
};

// Filtered Search by predefined media type
export async function searchByMediaType(mediaType, query){
    const isMovie = mediaType === "movie"

    const cleanQuery = query.trim().toLowerCase()
    try{
        const response = await fetch(`https://api.themoviedb.org/3/search/${mediaType}?query=${cleanQuery}`, options)
        const json = await response.json()   

        const searchResults = json.results.map(result => mapSearchResults(result, isMovie ? "movie" : "tv")) // Map each item from the search results to get only the necessary fields

        return searchResults
    }
    catch(error){
        console.error(`Error: ${error.message}`)
    }    
}

// General Search (both movies and shows)
export async function searchMedia(query){
    const cleanQuery = query.trim().toLowerCase()

    try{
        const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${cleanQuery}`, options)
        const json = await response.json()   

        // Filter out people from the search result
        const searchResults = json.results
            .filter(result => result.media_type === 'movie' || result.media_type === 'tv')
            .map(result => mapSearchResults(result, result.media_type))

        return searchResults
    }
    catch(error){
        console.error(`Error: ${error.message}`)
    }    
}



export async function getTrendingMovies(){

    try{
        const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day`, options)
        const json = await response.json()
        
        const trendingMovies = json.results.map(movie => mapPreview(movie, 'movie')) // Map each item from the trending movies to get only the necessary fields

        return trendingMovies
    }
    catch(error){
        console.error(`Error: ${error.message}`)
    }
    
}

export async function getTrendingShows(){

    try{
        const response = await fetch(`https://api.themoviedb.org/3/trending/tv/day`, options)
        const json = await response.json()
        const trendingShows = json.results.map(show => mapPreview(show, 'tv')) // Map each item from the trending shows to get only the necessary fields
        
        return trendingShows 
    }
    catch(error){
        console.error(`Error: ${error.message}`)
    }
    
}

export async function getMovieDetails(id){

    try{
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}`, options)
        const json = await response.json()
        const movie = mapDetails(json, 'movie')
        
        return movie
    }
    catch(error){
        console.error(`Error: ${error.message}`)
    }
    
}

export async function getShowDetails(id){

    try{
        const response = await fetch(`https://api.themoviedb.org/3/tv/${id}`, options)
        const json = await response.json()
        const show = mapDetails(json, 'tv')
        
        return show
    }
    catch(error){
        console.error(`Error: ${error.message}`)
    }
    
}