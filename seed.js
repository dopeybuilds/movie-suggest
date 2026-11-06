import { openai, supabase } from "./config.js";
import movies from "./content.js";

export async function seed() {
    const movieList = movies.map(movie => movie.content)

    const response = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: movieList
    })
    console.log(response)
    const rows =  movies.map((movie, i) =>({
        title: movie.title, release_year: movie.releaseYear, content: movie.content, embedding: response.data[i].embedding
    }))
    console.log(rows)

    const { error } = await supabase.from("movies").insert(rows)

    if (error) {
        console.error(error)
    } else {
        console.log("Successfully inserted movies")
    }
}