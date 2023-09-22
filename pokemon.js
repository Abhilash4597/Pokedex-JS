const Max_Pokemon = 1281;
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
    console.log(data.results)
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
    }
    catch{

    }
}
