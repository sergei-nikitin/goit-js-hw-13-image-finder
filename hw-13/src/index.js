import './styles.css';
import imgCard from './templaites/img_card.hbs';
import getRefs from './js/refs';
import { KEY, BASE_URL, per_page, page } from './js/variables';
import ApiService from './js/apiService';

const apiServise = new ApiService();
const refs = getRefs();


refs.searchForm.addEventListener('submit', onSearch);
// using the load more button
// refs.loadMoreBtn.addEventListener('click', onLoadMoreFoto);
refs.btnUp.addEventListener('click', onScrollUp)


function onSearch(e) {
    e.preventDefault();

    apiServise.query = e.currentTarget.elements.query.value;
    apiServise.resetPage();
    apiServise.fetchArticles().then(articles => {
        clearGallery();
        marckUpCard(articles);
    });

    
}

function marckUpCard(data) {
    refs.gallery.insertAdjacentHTML('beforeend', imgCard(data))
}

function clearGallery() {
    refs.gallery.innerHTML = '';
}


const onEntry = entries => {
    entries.forEach(entry => {

        if (entry.isIntersecting && apiServise.query !== '') {
            apiServise.fetchArticles().then(articles => {
        marckUpCard(articles);
    });
            
        }
    });
};

const options = {
    rootMargin: '350px',
};
const observer = new IntersectionObserver(onEntry, options);


observer.observe(refs.sentinel);


function onScrollUp() {
    window.scrollTo(0, 0)
}




// using the load more button

// function onLoadMoreFoto() {
//     apiServise.fetchArticles().then(articles => {
//         marckUpCard(articles);
//     });
//     // scrollDown(); 
// }
 



// function scrollDown() {
//     let windowHeight = document.body.scrollHeight;
//     setTimeout(() => {
//         window.scrollTo({
//             top: windowHeight,
//             left: 0,
//             behavior: 'smooth',
//         });
//     }, 250);
// }
   