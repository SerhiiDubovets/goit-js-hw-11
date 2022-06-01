import './sass/style.scss';
import Notiflix from 'notiflix';
import NewsArticlesService from './new-service.js';
import articles from './templates/articles.hbs';

const refs = {
  formEl: document.querySelector('#search-form'),
  inputEl: document.querySelector('[type="text"]'),
  formBtmEl: document.querySelector('.form-btm'),
  articlesContainer: document.querySelector('.gallery'),
  loadMoreBtm: document.querySelector('.load-more'),
};

const newsArticlesService = new NewsArticlesService();

hideloadMoreBtm();

refs.formEl.addEventListener('submit', onSearch);
refs.loadMoreBtm.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  newsArticlesService.query = refs.inputEl.value.toLowerCase().trim();
  if (newsArticlesService.query === '') {
    Notiflix.Notify.info(
      'Sorry, there are no images matching your search query. Please try again.',
    );
    return;
  } else {
    newsArticlesService.resetPage();
    newsArticlesService.fetchArticles().then(({ hits, totalHits }) => {
      if (hits.length === 0) {
        Notiflix.Notify.info(
          'Sorry, there are no images matching your search query. Please try again.',
        );
        return;
      } else {
        clearArticle();
        articlesMarkup(hits);
        refs.loadMoreBtm.classList.remove('is-hidden');
        Notiflix.Notify.info(`Total of images: ${totalHits}`);
      }

      console.log(totalHits);
    });
  }
}

function onLoadMore() {
  newsArticlesService.fetchArticles().then(hits => {
    if (hits.length < 40) {
      hideloadMoreBtm();
      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.',
      );
      return;
    } else {
      articlesMarkup(hits);
      console.log(hits.length);
    }
  });
}

function articlesMarkup(hits) {
  refs.articlesContainer.insertAdjacentHTML('beforeend', articles(hits));
}

function clearArticle() {
  refs.articlesContainer.innerHTML = '';
}

function hideloadMoreBtm() {
  refs.loadMoreBtm.classList.add('is-hidden');
}
