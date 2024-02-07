/**
 * TEAM GRID
 */

function loadTeamGrid() {

    const jsonFilePath = '../json/team-members.json';

    const teamGridContainer = document.getElementById('team-grid-container');

    fetch(jsonFilePath)
        .then(response => response.json())
        .then(data => {
            data.forEach((member, index) => {
                const cardMarkup = `
                    <div class="card">
                        <img src="${member.img}" alt="Avatar ${index + 1}">
                        <h4>${member.name}</h4>
                        <p>${member.description}</p>
                    </div>
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
                
                const langGerman = window.location.href.endsWith('de/');

                const text = `
                <h1>${entry.name} <img src="${entry.saisonIcon}" height="40px"></h1>
                <br/>
                ${langGerman ? entry.text['de'] : entry.text['en']}
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


document.addEventListener('DOMContentLoaded', function() {
    loadTeamGrid();
    loadBlog();
});

