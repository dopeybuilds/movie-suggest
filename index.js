import { getPoster} from "./posters.js"
import { findMatches } from "./search.js";
const movieForm = document.getElementById("movie-form")
const resultSection = document.getElementById("result")
const movieTitle = document.getElementById("title")
const movieDescription = document.getElementById("description")
const movieNextBtn = document.getElementById("next-movie-button")
const moviePoster = document.getElementById("poster")
const movieDetails = document.getElementById("details")
const submitBtn = movieForm.querySelector('button[type="submit"]')
let matchesArray = []
let currentIndex = 0

movieForm.addEventListener("submit", async e => {
    e.preventDefault()
    const questionOne = document.getElementById("question-1").value
    const questionTwo = document.getElementById("question-2").value
    const questionThree = document.getElementById("question-3").value
    const userText = `${questionOne}, ${questionTwo}, ${questionThree}`;

    submitBtn.disabled = true
    submitBtn.textContent = "Finding movies..."

    try {
        const result = await findMatches(userText);

        if (!result || result.length === 0) {
            alert("No results found")
        } else {
            matchesArray = result
            currentIndex = 0
            movieForm.hidden = true;
            resultSection.hidden = false;
            showMovie()
        }
    } finally {
        submitBtn.disabled = false
        submitBtn.textContent = "Let's Go"
    }
})

async function showMovie() {
    const current = matchesArray[currentIndex]
    movieTitle.textContent = `${current.title}`
    movieDescription.textContent = current.content
    moviePoster.hidden = true
    moviePoster.src = ""
    movieDetails.replaceChildren()
    const omdbReply = await getPoster(current.title, current.release_year)

    if (currentIndex === matchesArray.length - 1) {
        movieNextBtn.textContent = "Start Over"
    } else {
        movieNextBtn.textContent = "Next Movie"
    }

    if (omdbReply) {
        if (omdbReply.Poster !== "N/A") {
            moviePoster.hidden = false
            moviePoster.src = omdbReply.Poster
        }

        const chips = [omdbReply.Year, omdbReply.Runtime, omdbReply.Genre, `★ ${omdbReply.imdbRating}`]
            .filter(text => text && !text.includes("N/A"))

        chips.forEach(text => {
            const chip = document.createElement("span")
            chip.classList.add("chip")
            chip.textContent = text
            movieDetails.append(chip)
        })
    }
}

movieNextBtn.addEventListener("click", e => {
    if (currentIndex === matchesArray.length - 1) {
        movieForm.hidden = false;
        resultSection.hidden = true;
        movieForm.reset()
    } else {
        currentIndex++
        showMovie()
    }
})