
const header = document.querySelector(".header");
const main = document.querySelector(".main");
const all = document.querySelector(".all");

var storedContent = localStorage.getItem('pokemonContent');
console.log(storedContent);

let URL = "https://pokeapi.co/api/v2/pokemon/";

fetch(URL + storedContent)
.then((response) => response.json())
.then((data) => showData(data));

function showData(data){

    
    
    

    let moves = data.moves.map(
        (move) => `
        <p class="skill flying">${move.move.name}</p>
        `
      );
      moves= moves.join("");

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
    div.classList.add("allheader");
    div.innerHTML=`
    <div class="circle-div">
            <img src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name}" alt="${data.name}">    
            <div id="circle" class="${data.types[0].type.name}-color">
            </div>
        </div> 

        <div class="poke-info">
            <div class="name">
                <h2 class="pokemon-Name">${data.name}</h2>
                <p class="pokemon-id">N°${PokeId}</p>
            </div>

            <div class="element">
             ${types}   
            </div>
        </div>
    `;
    header.append(div);


    

    const div2 = document.createElement("div");
    div2.classList.add("allpokemondata");
    div2.innerHTML = `
            <div class="pokemon-details">

            <div class="card">
                <div class="tittle">
                    <img src="./img/weight.png" alt="Weight Icon" class="detail-img">
                    <p class="detail-tittle"> Weight</p>
                </div>

                <div class="description">
                    <p id="weight">${data.weight}Kg</p>
                </div>
            </div>

            <div class="card">
                <div class="tittle"> 
                    <img src="./img/height.png" alt="Height Icon" class="detail-img">
                    <p class="detail-tittle"> Height</p>
                </div>

                <div class="description" >
                    <p id="height">${data.height}m</p>
                </div>
            </div>

            <div class="card">
                <div class="tittle">
                    <img src="./img/category.png" alt="Category Icon" class="detail-img">
                    <p class="detail-tittle"> Category</p>
                </div>

                <div class="description">
                    <p id="category">${data.forms[0].name}</p>
                </div>
            </div>

            <div class="card">

                <div class="tittle">
                    <img src="./img/skill.png" alt="Skill Icon" class="detail-img">
                    <p class="detail-tittle"> Abilities</p>
                </div>
            
                <div class="description">
                    <p id="abilities">${data.abilities[0].ability.name}</p>
                </div>

            </div>

        </div>

        <div class="skills-Tittle">
            <p>Movements</p>
            <hr>
        </div>

        <div class="skills-box">
           ${moves}
            
        </div>

    `;

    all.append(div2);
}