import { openai, supabase} from "./config.js";
import movies from "./content.js";

export async function seed() {
    console.log(movies)
    const movieList = movies.map(movie => movie.content)
    console.log(movieList)
}
