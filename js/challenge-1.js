// Type your JavaScript code here.

/* Wait until everything is loaded in the DOM */
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    /* Only do stuff if on mobile version of Amazon Site */
    if (document.documentElement.classList.contains('a-mobile')) {

        /* Determine if Element is in viewport */
        const saInViewport = (elem)  => {
            // console.log("checkviewport");
            let bounding = elem.getBoundingClientRect();
            return (
                bounding.top >= 0 &&
                bounding.left >= 0 &&
                bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        };

        /* HTML template for Mobile Bottom Slider */
        const saMobileSliderTemplate = `
            <div class="am-bottom-slider-container">

                <select name="quantity" autocomplete="off" id="quantityMobileSlide" tabindex="0" class="a-native-dropdown">
                    <option value="1" selected="">1</option>
                    <option value="2">2</option>
                </select>

                <div id="buybox.addToCart" class="a-section">
                    <span class="a-button a-button-primary a-button-icon" id="a-autoid-3">
                        <span class="a-button-inner">
                            <i class="a-icon a-icon-cart"></i>
                            <input id="mobile-add-to-cart-button" name="submit.add-to-cart" title="Add to Shopping Basket" class="a-button-input" type="submit" aria-labelledby="a-autoid-3-announce">
                            <span class="a-button-text a-text-left" aria-hidden="true" id="a-autoid-3-announce">Add to Basket</span>
                        </span>
                    </span>
                </div>

            </div>
        `;

        const saPrimaryAddButtonElem = document.getElementById('add-to-cart-button');
        const saMobileSlider = document.createElement("div");

        saMobileSlider.id = "saMobileSlider";
        saMobileSlider.innerHTML = saMobileSliderTemplate;

        /* Check if existing Add button in viewport before showing Mobile Slider Gizmo */
        if (saInViewport(saPrimaryAddButtonElem)) {
            saMobileSlider.setAttribute('class','am-bottom-slider-wrapper saHide');
        }
        else {
            saMobileSlider.setAttribute('class','am-bottom-slider-wrapper');
        }
        document.body.appendChild(saMobileSlider);

        /* Hide Mobile Gizmo if existing Add button in viewport while scrolling */
        const saMobileSliderElem = document.getElementById('saMobileSlider');
        document.addEventListener('scroll', () => {

            if (saInViewport(saPrimaryAddButtonElem)) {
                saMobileSliderElem.classList.add('saHide'); 
            }
            else {
                saMobileSliderElem.classList.remove('saHide');
            }
        });


        /* Entangle Mobile Slider and Existing Quantity Select Inputs */
        const saMobileSliderSelectElem = document.getElementById('quantityMobileSlide');
        const saSelectQuantityDropdownElem = document.getElementById('mobileQuantityDropDown');
        const saFakeQuantityDropdownElem = document.querySelector('#a-autoid-0-announce .a-dropdown-prompt');
        const saHiddenQuantityFieldElem = document.getElementById('quantity');

        /* Change Existing Quantity Select when Mobile Slider Quantity Select changed */
        saMobileSliderSelectElem.addEventListener('change', (event) => {
            console.log('Mobile Quantity Changed', event.target.selectedIndex);
            saSelectQuantityDropdownElem.selectedIndex = event.target.selectedIndex;
            saFakeQuantityDropdownElem.textContent = event.target.selectedIndex + 1;
            saHiddenQuantityFieldElem.value = event.target.selectedIndex + 1;
        });

        /* and do the reverse */
        const saObserver = new MutationObserver(() => {
            console.log('Existing Quantity changed');
            let saNewValue = saFakeQuantityDropdownElem.innerHTML;
            saMobileSliderSelectElem.selectedIndex = parseInt(saNewValue) - 1;
            saHiddenQuantityFieldElem.value = parseInt(saNewValue);
        });

        saObserver.observe(saFakeQuantityDropdownElem, {childList: true});

        /* Submit normal form if mobile Slider Add to Basket button clicked */
        const saMobileAddToCartButtonElem = document.getElementById('mobile-add-to-cart-button');
        saMobileAddToCartButtonElem.addEventListener('click', (event) => {
            document.getElementById("addToCart").submit();
        });

    }

});
