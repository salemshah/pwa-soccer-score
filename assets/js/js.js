
navigator.serviceWorker.register('/service-worker.js').then(console.log).catch(console.error);
const url = `http://localhost:4000/api/data`;
const cardContainer = document.getElementById('card-container');
fetch(url).then(async (res) => {
    const data = await res.json()
    function generateCard(player) {
        return `
          <div class="card mb-3">
            <div class="team-logo d-flex align-self-center mt-3">
                <img src="${player.team.crest}" class="img-fluid" alt="${player.team.name} crest">
            </div>
            <div class="card-body">
              <h5 class="card-title">${player.player.name}</h5>
              <p class="card-text">Nationality: ${player.player.nationality}</p>
              <p class="card-text">Matches Played: ${player.playedMatches}</p>
              <p class="card-text">Goals: ${player.goals}</p>
              <p class="card-text">Assists: ${player.assists}</p>
              <p class="card-text">Penalties: ${player.penalties}</p>
            </div>
          </div>
      `;

    }

    if (data?.scorers.length) {

        data?.scorers?.forEach(item => {
            const cardElement = document.createElement('div');
            cardElement.className = 'col-6 col-md-3';
            cardElement.innerHTML = generateCard(item);
            cardContainer.appendChild(cardElement);
        });
    }
}).catch(error => {
    console.log("error =====> ", error)
})