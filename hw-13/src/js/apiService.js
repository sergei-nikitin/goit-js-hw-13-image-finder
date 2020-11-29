import { KEY, BASE_URL } from '../js/variables';
import imgCard from '../templaites/img_card.hbs';
import getRefs from '../js/refs';
const per_page = 12;

export default class ApiService {
    constructor() { 
        this.searchQuery = '';
        this.page = 1;
    }
    //             USING PROMISE
    // fetchArticles() {
    //     return fetch(`${BASE_URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&page=${this.page}&per_page=${per_page}`)
    //         .then(response => response.json())
            // .then(data => {
            //     this.page += 1;
            //     return data.hits;
            // });
    // } 

//                 USING ASYNC/AWAIT
    async fetchArticles() {
        const response = await fetch(`${BASE_URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&page=${this.page}&per_page=${per_page}`);
        const result = await response.json();
        this.page += 1;
        return result.hits;       
    }

    resetPage() {
        this.page = 1;
    }
    
    get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}