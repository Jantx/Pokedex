const pokemonList = document.querySelector("#poke-list");
const buttonsH = document.querySelectorAll(".btn-header");

let URL = "https://pokeapi.co/api/v2/pokemon/";


for (let i= 1; i<=151; i++){
    fetch(URL + i)
    .then((response) => response.json())
    .then(data => showPokemon(data))
}

function showPokemon(data){

    let types = data.types.map(type => `
    <p class="${type.type.name} type">${type.type.name}</p>
    `);
    types = types.join('');

    let PokeId = data.id.toString();

    if (PokeId.length === 1 ) {
        PokeId = "00" + PokeId;
    }else if(PokeId.length === 2 ){
        PokeId = "0" + PokeId;
    }

    const div = document.createElement("iv");
    div.classList.add("pokemon")
    div.innerHTML =`
        <p class="pokemon-id-back">#${PokeId}</p>
        <div class="image-pokemon">
            <img src="${data.sprites.other["official-artwork"].front_default}" alt="pikachu">
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

buttonsH.forEach(button => button.addEventListener("click", (event) => {
    const buttonId= event.currentTarget.id;

    pokemonList.innerHTML= "";

    for (let i= 1; i<=151; i++){
        fetch(URL + i)
        .then((response) => response.json())
        .then(data => {

            if (buttonId === "see-all") {
                showPokemon(data);
            } else{

                const types = data.types.map(type => type.type.name);
                if (types.some(type => type.includes(buttonId))) {
                    showPokemon(data);
                }
            }
        })
    }

}));