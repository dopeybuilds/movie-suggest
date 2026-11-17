const omdbKEY = import.meta.env.VITE_OMDB_API_KEY

export async function getPoster(title, year) {
    const url = `https://omdbapi.com/?apikey=${omdbKEY}/&t=${encodeURIComponent(title)}/&y=${year}`;

    await fetch(url);
    const response = await fetch(url);

    console.log(data)
}