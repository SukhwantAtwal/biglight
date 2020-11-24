// Type your JavaScript code here.

/* Wait until everything is loaded in the DOM */
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    /* Only do stuff if on mobile version of Amazon Site */
    if (document.documentElement.classList.contains('a-mobile')) {
    
        /* HTML template for Mobile Promo */
        const saMobilePromoTemplate = `
            <div class="sg-col-inner">
                <div class="sa-mobile-promo-container">
                    <p class="sa-mobile-promo-heading">Get 50% off</p>
                    <p class="sa-mobile-promo-heading">all Amazon products</p>
                    <p class="sa-mobile-promo-code">Use code: <span>AZ50</span></p>
                    <p class="sa-mobile-promo-tacs">T&amp;C Apply</p>
                </div>
            </div>
        `;

        const saMobilePromoSection = document.createElement("div");

        saMobilePromoSection.id = "saMobilePromoSection";
        saMobilePromoSection.innerHTML = saMobilePromoTemplate;
        saMobilePromoSection.setAttribute('class','s-result-item s-widget sg-col sg-col-12-of-12');
    
        const saSearchContainerElem = document.getElementById('search');
        /* Find the first search result data attribute in all elements with the class s-result-item */
        let saSearchResultList = document.body.querySelectorAll('.s-result-item[data-component-type="s-search-result"]');
        let saFirstSearchResult = saSearchResultList[0];
        console.log('First Result is ',saFirstSearchResult);

        /* Append the Mobile Promo section after the first search result element */
        saFirstSearchResult.after(saMobilePromoSection);
    
        /* The search result area has filters which update the search result list via Ajax */ 
        /* - so detect when the elemnt id="search" div attributes change (AJAX is firing) and reappend Mobile Promo */
        const saSearchObserver = new MutationObserver(() => {
            console.log('Search Area changed');
            saSearchResultList = document.body.querySelectorAll('.s-result-item[data-component-type="s-search-result"]');
            saFirstSearchResult = saSearchResultList[0];
            saFirstSearchResult.after(saMobilePromoSection);
        });

        saSearchObserver.observe(saSearchContainerElem, {attributes: true});

    }

});