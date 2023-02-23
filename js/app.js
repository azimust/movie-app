const API_KEY = '4da49863-91c1-4613-a6f0-bbbbd2349b00';
const API_URL_POPULAR = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1';
const API_URL_SEARCH = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword='

getMovies(API_URL_POPULAR)

async function getMovies(url) {
    const response = await fetch(url, {
        headers:{
            'X-API-KEY': '4da49863-91c1-4613-a6f0-bbbbd2349b00',
            'Content-Type': API_KEY,
        },
    });
    const responseData = await response.json();
    showMovies(responseData);
}

function getClassByRate(vote){
    if(vote >= 7){
        return 'green'
    } else if (vote > 5) {
        return 'orange'
    }else{
        return 'red'
    }
}

function showMovies(data) {
    const movies = document.querySelector('.movies');

    //Очищаем предыдущие фильмы
    document.querySelector('.movies').innerHTML = '';

    data.films.forEach((movie) => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <div class="movie__cover-inner">
            <img src="${movie.posterUrlPreview}" alt="${movie.nameRu}" class="movie__cover">
            <div class="movie__cover--darkened"></div>
        </div>
        <div class="movie__info">
            <div class="movie__title">${movie.nameRu}</div>
            <div class="movie__category">${movie.genres.map((genres) => ` ${genres.genre}`)}</div>
            <div class="movie__average movie__average--${getClassByRate(movie.rating)}">${movie.rating}</div>
        </div>
        `;
        movies.appendChild(movieEl);
    });
};

const form = document.querySelector('form');
const search = document.querySelector('.header__search');
const btn = document.querySelector('.header__btn')

btn.addEventListener('click', (e) => {
    e.preventDefault();

    const apiSearchUrl = `${API_URL_SEARCH}${search.value}`
    if(search.value) {
        getMovies(apiSearchUrl);

        search.value = '';
    }
});