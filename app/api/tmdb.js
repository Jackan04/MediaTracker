import { mapDetails, mapPreview } from "./mappers";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_TOKEN}`, // Bearer Key stored in .env file
  },
};

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
        const movie = mapDetails(json, 'movie')
        
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
        const show = mapDetails(json, 'show')
        
        return show
    }
    catch(error){
        console.error(`Error: ${error.message}`)
    }
    
}