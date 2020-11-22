import './styles.css';
import imgCard from './templaites/img_card.hbs';
import getRefs from './js/refs';
import { KEY, BASE_URL, per_page, page } from './js/variables';
import ApiService from './js/apiService';

const apiServise = new ApiService();
const refs = getRefs();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMoreFoto);
refs.btnUp.addEventListener('click', onScrollUp)


function onSearch(e) {
    e.preventDefault();

    apiServise.query = e.currentTarget.elements.query.value;
    apiServise.resetPage();
    apiServise.fetchArticles().then(articles => {
        clearGallery();
        console.log(articles);
        marckUpCard(articles);
    });

    
}

function marckUpCard(data) {
    refs.gallery.insertAdjacentHTML('beforeend', imgCard(data))
}

function clearGallery() {
    refs.gallery.innerHTML = '';
}

function onLoadMoreFoto() {
    apiServise.fetchArticles().then(articles => {
        // console.log(articles);
        marckUpCard(articles);
    });
    // scrollDown();
    // window.scrollTo(0, 0)
   
}
 

function onScrollUp() {
    window.scrollTo(0, 0)
}



function scrollDown() {
    const windowCoords = document.documentElement.clientHeight;
    (function scroll() {
      if (window.pageYOffset < windowCoords) {
        window.scrollBy(0, -10);
        setTimeout(scroll, 200);
      }
      if (window.pageYOffset > windowCoords) {
        window.scrollTo(0, windowCoords);
      }
    })();
  }