const pokemonList = document.querySelector("#poke-list");
let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i= 1; i<=151; i++){
    fetch(URL + i)
    .then((Response) => response.json())
    .then(data => console.log(data))
}

function showPokemon(data){

    const div = document.createElement("div");
    div.classList.add("pokemon")
    div.innerHTML =`
        <p class="pokemon-id-back">#25</p>
        <div class="image-pokemon">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" alt="pikachu">
        </div>
        <div class="data-pokemon">
            <div class="content-name">
                <p class="pokemon-id">#025</p>
                <h2 class="name-pokemon">Pikachu</h2>
            </div>
                <div class="pokemon-tipes">
                    <p class="electric tipe">ELECTRIC</p>
                    <p class="fighting tipe">FIGHTING</p>      
                </div>
                <div class="pokemon-stats">
                    <p class="stat">4m</p>
                    <p class="stat">60kg</p>
            </div>
        </div>
    `;
    pokemonList.append(div);
}

