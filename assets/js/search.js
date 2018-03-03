'use strict';

(function() {
    const asidePanel = document.getElementById('js-guide-aside');
    const searchField = document.getElementById('js-search');
    const searchClearBtn = document.getElementById('js-search-clear');
    const links = document.querySelectorAll('.js-atlas-nav-ln');

    const waiteForSearch = 'js-searching';
    const hasResults = 'js-found';
    const isRelevant = 'js-relevant';

    function startSearch() {
        asidePanel.classList.add(waiteForSearch);
    }

    function finishSearch() {
        asidePanel.classList.remove(waiteForSearch);
    }

    function clearSearch() {
        asidePanel.classList.remove(hasResults);
        links.forEach(link => link.classList.remove(isRelevant));
        searchField.value = '';
    }

    function search(event) {
        const term = event.target.value;
        if (!term) {
            clearSearch();
        }

        links.forEach(link => {
            if (link.getAttribute('href') === '') {
                return;
            }
            const elementText = link.textContent;

            if (term.length && ~elementText.indexOf(term)) {
                const asideContent = document.getElementById('js-atlas-aside-content');
                if (asideContent.scrollTo() !== undefined) {
                    asideContent.scrollTo(0, link);
                }
                asidePanel.classList.add(hasResults);
                link.classList.add(isRelevant);
            } else {
                link.classList.remove(isRelevant);
            }
        });
    }

    searchField.addEventListener('keyup', search);
    searchField.addEventListener('focus', startSearch);
    searchField.addEventListener('blur', finishSearch);
    searchClearBtn.addEventListener('click', clearSearch);
}());
