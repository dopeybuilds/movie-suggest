import { findMatches } from "./search.js";
const movieForm = document.getElementById("movie-form")
const resultSection = document.getElementById("result")
const movieTitle = document.getElementById("title")
const movieDescription = document.getElementById("description")
const movieNextBtn = document.getElementById("next-movie-button")
let matchesArray = []
let currentIndex = 0

movieForm.addEventListener("submit", async e => {
    e.preventDefault()
    const questionOne = document.getElementById("question-1").value
    const questionTwo = document.getElementById("question-2").value
    const questionThree = document.getElementById("question-3").value
    const userText = `${questionOne}, ${questionTwo}, ${questionThree}`;
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
})

function showMovie() {
    const current = matchesArray[currentIndex]
    movieTitle.textContent = `${current.title} - ${current.release_year}`
    movieDescription.textContent = current.content

    if (currentIndex === matchesArray.length - 1) {
        movieNextBtn.textContent = "Start Over"
    } else {
        movieNextBtn.textContent = "Next Movie"
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