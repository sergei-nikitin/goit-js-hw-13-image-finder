import { KEY, BASE_URL } from '../js/variables';
import imgCard from '../templaites/img_card.hbs';
import getRefs from '../js/refs';


import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Material.css';
// import 'material-design-icons/iconfont/material-icons.css';

// import '@pnotify/core/dist/Angeler.css';

import { defaults } from '@pnotify/core';
import { error, alert } from '@pnotify/core';


defaults.styling = 'material';
// defaults.icons = 'material';
// defaults.delay = 2500;
// defaults.hide = false;
// defaults.autoOpen = false;
// defaults.icon =  true;

// const myError = error ({
//     text: "  I'm an error message.",
//     type: 'error',
//     delay: 2500,
// });



const per_page = 12;

export default class ApiService {
    constructor() { 
        this.searchQuery = '';
        this.page = 1;
    }
    //             USING PROMISE
    fetchArticles() {
        return fetch(`${BASE_URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&page=${this.page}&per_page=${per_page}`)
    
            .then(response => { 
                if (response.status === 404) {
                alert('status 404');
            }    
               return response.json()
    })
            .then(data => {
                 if (data.totalHits > 0 && this.page === 1) {
                 alert({
            text: `Получено ${data.total} фотографий`,
            type: 'info',
            delay: 3000,
        });
            } else if (data.totalHits === 0) {
                   error({
            text: 'введите более специфичное название ',
            type: 'info',
            delay: 3000,
        });
            }
                this.page += 1;
                return data.hits;
            })
    }      

//                 USING ASYNC/AWAIT
    // async fetchArticles() {
    //     try {
    //         const response = await fetch(`${BASE_URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&page=${this.page}&per_page=${per_page}`);
    //         const result = await response.json();
    //         if (result.totalHits > 0 && this.page === 1) {
    //              alert({
    //         text: `Получено ${result.total} фотографий`,
    //         type: 'info',
    //         delay: 3000,
    //     });
    //         } else if (result.totalHits === 0) {
    //                error({
    //         text: 'введите более специфичное название ',
    //         type: 'info',
    //         delay: 3000,
    //     });
    //         }
    //         this.page += 1;
    //     return result.hits;
         
    //     } catch (err) {
    //         console.log('чтото пошло не так');
    //     };
    //     }
    

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