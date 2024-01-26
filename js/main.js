const pokemonList = document.querySelector("#poke-list");
const buttonsH = document.querySelectorAll(".btn-header");
const body = document.querySelector(".body");
window.pokemonName = "";

let URL = "https://pokeapi.co/api/v2/pokemon/";
let allPokemonData = []; // Almacena todos los datos de los Pokémon

// Función para realizar una solicitud y obtener datos de un Pokémon
function fetchPokemonData(id) {
  return fetch(URL + id)
    .then((response) => response.json())
    .then((data) => {
      allPokemonData.push(data);
    });
}

// Crear un array de promesas para todas las solicitudes
const fetchPromises = [];
for (let i = 1; i <= 387; i++) {
  fetchPromises.push(fetchPokemonData(i));
}

// Esperar a que todas las solicitudes se completen
Promise.all(fetchPromises)
  .then(() => {
    // Una vez que todas las solicitudes se han completado, ordenar y mostrar los Pokémon
    sortPokemonById();
  })
  .catch((error) => {
    console.error("Error fetching Pokemon data:", error);
  });

function showPokemon(data) {
  let types = data.types.map(
    (type) => `
    <p class="${type.type.name} type">${type.type.name}</p>
    `
  );
  types = types.join("");

  let PokeId = data.id.toString();

  if (PokeId.length === 1) {
    PokeId = "00" + PokeId;
  } else if (PokeId.length === 2) {
    PokeId = "0" + PokeId;
  }

  const div = document.createElement("div");
  div.classList.add("pokemon");
  div.innerHTML = `
        <p class="pokemon-id-back">#${PokeId}</p>
        <div class="image-pokemon">
            <img src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name}" class="pokeImage">
        </div>
        <div class="data-pokemon">
            <div class="content-name">
                <p class="pokemon-id">#${PokeId}</p>
                <h2 class="name-pokemon">${data.name}</h2>
            </div>
                <div class="pokemon-types">
                    ${types}    
                </div>
                <div class="pokemon-stats">
                    <p class="stat">${data.height}m</p>
                    <p class="stat">${data.weight}kg</p>
            </div>
        </div>
    `;

  pokemonList.append(div);
}

// Ordenar todos los Pokémon por número (id)
function sortPokemonById() {
  allPokemonData.sort((a, b) => a.id - b.id);
  pokemonList.innerHTML = ""; // Limpia la lista antes de mostrar los Pokémon ordenados
  allPokemonData.forEach((pokemon) => showPokemon(pokemon));
}

// Event listener para el botón "Sort by ID"
document.getElementById("sort-by-id").addEventListener("click", sortPokemonById);

buttonsH.forEach((button) =>
  button.addEventListener("click", (event) => {
    const buttonId = event.currentTarget.id;

    pokemonList.innerHTML = "";

    allPokemonData.forEach((data) => {
      const types = data.types.map((type) => type.type.name);
      if (buttonId === "see-all" || types.some((type) => type.includes(buttonId))) {
        showPokemon(data);
      }
    });
  })
);

document.addEventListener("DOMContentLoaded", function () {
  const pokemonList = document.querySelector("#poke-list");

  // Agregar un evento clic al contenedor principal
  pokemonList.addEventListener("click", function (event) {
    // Verificar si el clic se realizó en una imagen de Pokémon
    if (event.target.classList.contains("pokeImage")) {
      // Obtén el elemento padre del clic actual, que es el contenedor .pokemon
      var pokemonContainer = event.target.closest(".pokemon");

      // Verifica si se encontró el contenedor y obtén el elemento con la clase .name-pokemon
      if (pokemonContainer) {
        var pokemonNameElement = pokemonContainer.querySelector(".name-pokemon");

        // Obtén y muestra el contenido del elemento .name-pokemon
        var content = pokemonNameElement.textContent;
        console.log(content);
        localStorage.setItem("pokemonContent", content);
      }
    }

    window.location.href = "pokemon.html";
  });
});
