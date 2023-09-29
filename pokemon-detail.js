let currentPokemonId = null;

document.addEventListener('DOMContentLoaded',()=>{
    const Max_Pokemon = 649;
    const pokemonID = new URLSearchParams(window.location.search).get('id');
    const id = parseInt(pokemonID,10);

    if(id < 1 || id > Max_Pokemon){
        return (window.location.href = './index.html')
    }
    currentPokemonId = id;
    loadPokemon(id);
})

async function loadPokemon(id){
    try{
        const[pokemons,pokemonSpecies]= await Promise.all([(fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)).then((response)=>{
            return response.json();
        }),
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((response)=>{
            return response.json();
        }),
    ])

    const abilitiesWrapper = document.querySelector('.pokemon-detail-wrap .pokemon-detail-move');
    abilitiesWrapper.innerHTML = '';


    if(currentPokemonId === id){
        displayPokemonDetails(pokemon);
        const flavorText = getEnglishFlavorText(pokemonSpecies);
        document.querySelector('.body3-fonts.pokemon-description').textContent = flavorText

        const[leftArrow,rightArrow]=['#leftArrow','#rightArrow'].map((sel)=>{
            document.querySelector(sel);
        })
    }


    return true;
    }
    catch(error){
        console.error('An Error Occured While Fetching Pokemon Data :',error);
        return false;
    }
}