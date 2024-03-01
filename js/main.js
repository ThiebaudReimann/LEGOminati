/**
 * LOAD ALERT
 */
function loadMainAlert() {
    const jsonFilePath = '../json/news.json';
    const alert = document.getElementById('main-alert');
    fetch(jsonFilePath)
        .then(response => response.json())
        .then(data => {
            if(data.show) {
                alert.classList.replace('alert-dark', data.color);
                alert.innerHTML = data.message;
                alert.style.display = 'block';
            }
        });
}

/**
 * IMAGE CAROUSEL
 */

function loadImageCarousel() {
    const jsonFilePath = '../json/img-carousel.json';

    const carouselIndicators = document.querySelector('.carousel-indicators');
    const carouselInner = document.querySelector('.carousel-inner');

    fetch(jsonFilePath)
        .then(response => response.json())
        .then(data => {
            first = Math.floor(Math.random() * data.length);
            data.forEach((entry, index) => {
                isFirst = index == first;
                langGerman = window.location.href.includes('/de/');

                // Carousel Indicators
                const newIndicatorButton = document.createElement('button');
                newIndicatorButton.type = 'button';
                newIndicatorButton.setAttribute('data-bs-target', '#about-img-carousel');
                newIndicatorButton.setAttribute('data-bs-slide-to', index);
                newIndicatorButton.setAttribute('aria-label', `Slide ${index}`);
                if (isFirst) {
                    newIndicatorButton.classList.add('active');
                    newIndicatorButton.setAttribute('aria-current', "true")
                }
                carouselIndicators.appendChild(newIndicatorButton);

                //Carousel Inner
                //create Div
                const innerDiv = document.createElement('div');
                innerDiv.classList.add('carousel-item');
                if (isFirst) {
                    innerDiv.classList.add('active');
                }
                //create inner Markup
                const innerDivMarkup = `<img src="${entry.imagePath}" class="d-block w-100" alt="${entry.altText}">`;
                innerDiv.innerHTML = innerDivMarkup;
                carouselInner.appendChild(innerDiv);
            });
        })
        .catch(error => {
            console.error('Error loading the JSON file:', error);
        });
}

/**
 * TEAM GRID
 */

function loadTeamGrid() {

    const jsonFilePath = '../json/team-members.json';

    const teamGridContainer = document.getElementById('team-grid-container');
    const langGer = window.location.href.includes('/de/');
    fetch(jsonFilePath)
        .then(response => response.json())
        .then(data => {
            data.members.forEach((member, index) => {
                
                const cardMarkup = `
                    <a href="${data.link ? (langGer ? `/de/member/?m=${member.name}` : `/en/member/?m=${member.name}`) : ""}" class="text-light text-decoration-none"><div class="Teamcard">
                    <img src="${member.img}" alt="Avatar ${index + 1}">
                    <h4>${member.name}</h4>
                    <p>${member.description}</p>
                </div></a>
                `;

                const newDiv = document.createElement('div');

                newDiv.innerHTML = cardMarkup;

                teamGridContainer.appendChild(newDiv);
            });
        })
        .catch(error => {
            console.error('Error loading the JSON file:', error);
        });
}

/**
 * COMPETITION ACCORDION
 */

function loadCompAccordion() {
    const jsonFilePath = '../json/comp-accordion.json';

    const accordion = document.getElementById('competitionAccordion');
    const fllText = document.getElementById('fllText');
    const langGerman = window.location.href.includes('/de/');
    const langFrench = window.location.href.includes('/fr/');

    fetch(jsonFilePath)
        .then(response => response.json())
        .then(data => {
            fllText.innerHTML = data.fllText[langGerman ? "de" : (langFrench ? "fr" : "en")];
            data.accordion.forEach((entry, index) => {
                const accordionMarkup = `
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapse${index + 1}" aria-expanded="false"
                            aria-controls="collapse${index + 1}">
                            ${langGerman ? entry.de.head : (langFrench ? entry.fr.head : entry.en.head)}
                        </button>
                    </h2>
                    <div id="collapse${index + 1}" class="accordion-collapse collapse"
                        data-bs-parent="#competitionAccordion">
                        <div class="accordion-body">
                            ${langGerman ? entry.de.body : (langFrench ? entry.fr.body : entry.en.body)}
                        </div>
                    </div>
                `;

                const newElement = document.createElement('div');
                newElement.classList.add('accordion-item');

                newElement.innerHTML = accordionMarkup;

                accordion.appendChild(newElement);
            });
        })
        .catch(error => {
            console.error('Error loading the JSON file:', error);
        });
}

/**
 * ARCHIV
 */
function loadBlog() {
    const jsonFilePath = '../json/blog.json';

    const myTab = document.getElementById('myTab');
    const myTabContent = document.getElementById('myTabContent');

    fetch(jsonFilePath)
        .then(response => response.json())
        .then(data => {
            data.forEach((entry, index) => {
                const isActive = index === 0;

                // Button
                const newListItem = document.createElement('li');
                newListItem.classList.add('nav-item');
                newListItem.setAttribute('role', 'presentation');
                const newButtonHTML = `<button class="nav-link ${isActive ? 'active' : ''}" id="${entry.shortId}-tab" data-bs-toggle="tab" data-bs-target="#${entry.shortId}-tab-pane" type="button" role="tab" aria-controls="${entry.shortId}-tab-pane" aria-selected="${isActive}">${entry.jahr}</button>`;
                newListItem.innerHTML = newButtonHTML;

                // Content
                const newTabContentItem = document.createElement('div');
                newTabContentItem.classList.add('tab-pane');
                newTabContentItem.classList.add('fade');
                if (isActive) {
                    newTabContentItem.classList.add('show');
                    newTabContentItem.classList.add('active');
                }
                newTabContentItem.id = `${entry.shortId}-tab-pane`;
                newTabContentItem.setAttribute('role', 'tabpanel');
                newTabContentItem.setAttribute('aria-labelledby', `${entry.shortId}-tab`);

                const langGerman = window.location.href.includes('/de/');
                const langFrench = window.location.href.includes('/fr/');
                const hasIconLink = entry.iconLink != null;
                const text = `
                    <h1>${langGerman ? entry.name.de : (langFrench ? entry.name.fr : entry.name.en)} <a href="${hasIconLink ? entry.iconLink : "#"}"><img src="${entry.saisonIcon}" height="40px"></a></h1>
                    <br/>
                    ${langGerman ? entry.text.de : (langFrench ? entry.text.fr : entry.text.en)}
                `;

                newTabContentItem.innerHTML = text;
                // Add to HTML
                myTab.appendChild(newListItem);
                myTabContent.appendChild(newTabContentItem);
            });
        })
        .catch(error => {
            console.error('Error loading the JSON file:', error);
        });
}


document.addEventListener('DOMContentLoaded', function () {
    loadMainAlert();
    loadImageCarousel();
    loadTeamGrid();
    loadCompAccordion();
    loadBlog();
});

