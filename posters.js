const omdbKEY = import.meta.env.VITE_OMDB_API_KEY

export async function getPoster(title, year) {
    const url = `https://omdbapi.com/?apikey=${omdbKEY}&t=${encodeURIComponent(title)}&y=${year}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "False") {
        console.warn("OMDb:", data.Error)
        return null
    } else {
        return data
    }
}