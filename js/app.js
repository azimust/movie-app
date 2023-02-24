const API_KEY = '4da49863-91c1-4613-a6f0-bbbbd2349b00';
const API_URL_POPULAR = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1';
const API_URL_SEARCH = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=';
const API_URL_MOVIE_DETAILS = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/';

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

        movieEl.addEventListener('click', () => openModal(movie.filmId))

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

// Modal
let modalEl = document.querySelector('.modal');

async function openModal(id) {
    const response = await fetch(API_URL_MOVIE_DETAILS + id, {
        headers:{
            'X-API-KEY': '4da49863-91c1-4613-a6f0-bbbbd2349b00',
            'Content-Type': API_KEY,
        },
    });
    const responseData = await response.json();

    modalEl.classList.add('modal--show');
    document.body.classList.add('stop-scrolling');

    modalEl.innerHTML = `
    <div class="modal__card">
        <img src="${responseData.posterUrl}" alt="" class="modal__movie-backdrop">
        <h2>
            <span class="modal__movie-title">Название - ${responseData.nameRu}</span>
            <span class="modal__movie-release-year">${responseData.year}</span>
        </h2>
        <ul class="modal__movie-info">
            <div class="loader"></div>
            <li class="modal__movie-genre">Жанр - ${responseData.genres.map((el) => `<span>${el.genre}</span>`)}</li>
            <li class="modal__movie-runtime">Время - ${responseData.filmLength} минут</li>
            <li>Сайт: <a href="${responseData.webUrl}" class="modal__movie-site">${responseData.webUrl}</a></li>
            <li class="modal__movie-overview">Описание - ${responseData.description}</li>
        </ul>
        <button type="button" class="modal__button-close">Закрыть</button>
    </div>
    `
    const btnClose = document.querySelector('.modal__button-close');
    btnClose.addEventListener('click', () => closeModal());
};

function closeModal() {
    modalEl.classList.remove('modal--show');
    document.body.classList.remove('stop-scrolling');
};

window.addEventListener('click', (e) => {
    if(e.target === modalEl) {
        closeModal();
    }
});

window.addEventListener('keydown', (e) => {
    if(e.keyCode === 27){
        closeModal();
    }
});