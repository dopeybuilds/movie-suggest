import { openai, supabase } from "./config.js";

export async function findMatches(text) {
    const response = await openai.embeddings.create ({
        model: "text-embedding-3-small",
        input: text
    })

    const embedding = response.data[0].embedding
    const { data, error} = await supabase.rpc("match_movies", {
        query_embedding: embedding,
        match_threshold: 0.1,
        match_count: 3
    })

    if (error) {
        console.error(error)
    } else
        return data
}