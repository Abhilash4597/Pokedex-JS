const Max_Pokemon = 649;
const listWrapper = document.querySelector('.list-wrapper');
const searchInput = document.querySelector('#search-input');
const numberFilter = document.querySelector('#number');
const nameFilter = document.querySelector('#name');
const notFoundMessage = document.querySelector('#not-found-message');

let allPokemons = [];

fetch(`https://pokeapi.co/api/v2/pokemon?limit=${Max_Pokemon}`)
.then((response)=>{
    return response.json();
})
.then((data)=>{
    allPokemons = data.results;
    displayPokemons(allPokemons);
})

async function fetchPokimonBeforeRedirect(id){
    try{
        const[pokemons,pokemonSpecies]= await Promise.all([(fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)).then((response)=>{
            return response.json();
        }),
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((response)=>{
            return response.json();
        }),
    
    ])
    return true;
    }
    catch(error) {
        console.error('Failed to fetch Pokemon data before redirect')
    }
}

function displayPokemons(pokemon){
    listWrapper.innerHTML ='';

    pokemon.forEach((pokemon) => {
        const pokemonID = pokemon.url.split('/')[6];
        const listItem = document.createElement('div');
        listItem.className = 'list-item';
        listItem.innerHTML = `
        <div class="number-wrap">
            <p class="caption-fonts">#${pokemonID}</p>
        </div>
        <div class="img-wrap">
            <img src="https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg" alt="${pokemon.name}">
        </div>
        <div class="name-wrap">
            <p class="body3-fonts">#${pokemon.name}</p>
        </div>
        `
        
        listItem.addEventListener('click',async ()=>{
            const success = await fetchPokimonBeforeRedirect(pokemonID);

            if(success){
                window.location.href = `./detail.html?id=${pokemonID}`;
            }
        })

        listWrapper.appendChild(listItem);
    });
}