const axios = require('axios').default;
export default class NewsArticlesService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchArticles() {
    const API_KEY = '27695405-68b104771e9635aa9e6d8bef2';
    const URL = `https://pixabay.com/api/`;
    try {
      const response = await fetch(
        `${URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`,
      );
      const newHits = await response.json();
      this.page += 1;
      return newHits.hits;
    } catch (error) {
      return error;
    }
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
