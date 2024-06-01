const loadallPlayer = (playerName) => {
  fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${playerName}`)
      .then(res => res.json())
      .then(data => {
          console.log(data.player);
          displayPlayer(data);
      });
};

loadallPlayer('');

const displayPlayer = (data) => {
  const playersContainer = document.getElementById("players-container");
  playersContainer.innerHTML = '';

  if (data.player) {
      data.player.forEach(player => {
          const playerDiv = document.createElement('div');
          playerDiv.classList.add("col");
          playerDiv.innerHTML = `
              <div class="card bg-success border border-warning">
                  <img src="${player.strThumb}" class="card-img-top" alt="${player.strPlayer}">
                  <div class="card-body">
                      <div class="d-flex justify-content-between align-items-center mb-3">
                          <div>
                              <h3 class="text-warning">${player.strPlayer}</h3>
                          </div>
                          <div>
                              <a href="${player.strInstagram}" target="_blank" class="text-danger m-1"><i class="fa-brands fa-instagram fa-2x"></i></a>
                          </div>
                      </div>
                      <h6 class="text-white">Team: ${player.strTeam}</h6>
                      <p class="text-white m-0">Plays: ${player.strSport}</p>
                      <p class="text-white m-0">Position: ${player.strPosition}</p>
                      <p class="text-white m-0">Nationality: ${player.strNationality}</p>
                  </div>
                  <div class="card-footer d-flex align-items-center justify-content-between">
                      <button onclick="singlePlayer('${player.idPlayer}')" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
                      <button id="add-player-button-${player.idPlayer}" onclick="addSinglePlayer('${player.idPlayer}')" class="btn btn-info">Add To Team</button>
                  </div>
              </div>
          `;
          playersContainer.appendChild(playerDiv);
      });
  } else {
      playersContainer.innerHTML = `<h4 class="text-danger">Sorry sir No player your team.</h4>`;
  }
};

const searchItem = (event) => {
  event.preventDefault();
  const playerName = document.getElementById('searchInput').value;
  if (playerName) {
      loadallPlayer(playerName);
  } else {
      document.getElementById('players-container').innerHTML = '';
  }
  document.getElementById('searchInput').value = '';
};

document.getElementById('searchForm').addEventListener('submit', searchItem);


document.getElementById('searchInput').addEventListener('input', function(event) {
  const playerName = event.target.value;
  if (playerName) {
      loadallPlayer(playerName);
  } else {
      document.getElementById('players-container').innerHTML = '';
  }
});


const single_player = (player) => {
  const title = document.getElementById("single-player-title");
  const body = document.getElementById("single-player-body");
  console.log(player.strPlayer);
  title.innerText = player.strPlayer;

  body.innerHTML = `
      <div class="card text-white">
          <div class="row   g-0">
              <div class="col-md-4 d-flex justify-content-center align-items-center">
                  <img src=${player.strThumb} class="img-fluid rounded-start" alt="${player.strPlayer}">
              </div>
              <div class="col-md-8">
                  <div class="card-body">
                      <p class="text-white"><small class="text-primary">Gender: ${player.strGender}</small></p>
                      <p class="card-title text-primary">Nationality: ${player.strNationality}</p>
                      <p class="card-title text-primary">Play: ${player.strSport}</p>
                      <p class="card-title text-primary">Position: ${player.strPosition}</p>
                      <p class="text-warning">${player.strDescriptionEN.slice(0, 80)}</p>
                      
                  </div>
              </div>
          </div>
      </div>
  `;
}

const addSinglePlayer = (id) => {
  fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`)
      .then(res => res.json())
      .then(data => {
          addTeam(data.players[0]);
      });
}
const singlePlayer = (id) => {
  fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`)
      .then(res => res.json())
      .then(data => {
          single_player(data.players[0]);
      });
}


let addPlayer = [];
document.getElementById("added-players-quantity").innerText = 0;

const addTeam = (player) => {
  if (addPlayer.length < 11) {
      if (addPlayer.some(p => p.idPlayer === player.idPlayer)) {
          alert('Already added');
      } else {
          addPlayer.push(player);
          document.getElementById(`add-player-button-${player.idPlayer}`).disabled = true;
          document.getElementById(`add-player-button-${player.idPlayer}`).innerText = "Added Succesfully";
          viewaddPlayer();
      }
  } else {
      alert("Sorry! you do not added more than 11 Players!");
  }
}

const viewaddPlayer = () => {
  document.getElementById("added-players-quantity").innerText = addPlayer.length;

  const addPlayerContainer = document.getElementById("added-players-container");
  addPlayerContainer.innerHTML = '';

  if (addPlayer.length > 0) {
      addPlayerContainer.classList.add("border", "border-info");
      addPlayer.forEach(player => {
          const playerDiv = document.createElement('div');
          playerDiv.classList.add("col");
          playerDiv.innerHTML = `
          <div class="card bg-success border border-info">
          <img src="${player.strThumb}" class="card-img-top" alt="${player.strPlayer}">
          <div class="card-body">
              <div class="d-flex justify-content-between align-items-center mb-1">
                  <div>
                      <h3 class="text-warning">${player.strPlayer}</h3>
                  </div>
                  <div>
                      <a href="${player.strInstagram}" target="_blank" class="text-danger m-1"><i class="fa-brands fa-instagram fa-2x"></i></a>
                  </div>
              </div>
              <h6 class="text-white">Team: ${player.strTeam}</h6>
              <p class="text-white m-0">Plays: ${player.strSport}</p>
              <p class="text-white m-0">Position: ${player.strPosition}</p>
              <p class="text-white m-0">Nationality: ${player.strNationality}</p>
          </div>
                  <div class="card-footer d-flex align-items-center justify-content-between">
                      <button onclick="singlePlayer('${player.idPlayer}')" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
                      <button onclick="removeFromTeam('${player.idPlayer}')" class="btn btn-danger">Remove</button>
                  </div>
              </div>
          `;
          addPlayerContainer.appendChild(playerDiv);
      });
  } else {
      addPlayerContainer.innerHTML = `<h4 class="text-danger">No Players Added.</h4>`;
  }
}

const removeFromTeam = (playerID) => {
  addPlayer = addPlayer.filter(player => player.idPlayer != playerID);
  document.getElementById(`add-player-button-${playerID}`).disabled = false;
  document.getElementById(`add-player-button-${playerID}`).innerText = "Add To Team";
  viewaddPlayer();
}
