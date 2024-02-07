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

loadTeamGrid();

