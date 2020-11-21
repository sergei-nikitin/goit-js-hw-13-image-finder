import './styles.css';
import imgCard from './templaites/img_card.hbs';
import getRefs from './js/refs';
import { KEY, BASE_URL, per_page, page } from './js/variables';



const refs = getRefs();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMoreFoto);

function onSearch(e) {
    e.preventDefault();

    const searchQuery = e.currentTarget.elements.query.value;


    fetch(`${BASE_URL}?key=${KEY}&q=${searchQuery}&image_type=photo&page=${page}&per_page=${per_page}`)
        .then(r => r.json())
        .then(d => marckUpCard(d.hits))
    .catch(error => console.log('ошибка'));
}

function marckUpCard(data) {
    refs.gallery.insertAdjacentHTML('beforeend', imgCard(data))
}

function onLoadMoreFoto (e){}
