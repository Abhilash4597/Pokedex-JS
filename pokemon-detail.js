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

        leftArrow.removeEventListner('click',navigatePokemon);
        rightArrow.removeEventListner('click',navigatePokemon);
    
        if(id!==1){
            leftArrow.addEventListener('click',()=>{
                navigatePokemon(id - 1);
            })
        }
        if(id!==649){
            rightArrow.addEventListener('click',()=>{
                navigatePokemon(id + 1);
            })
        }
    
        window.history.pushState({},'',`./detail.html?id=${id}`)
    }

    return true;
    }

    catch(error){
        console.error('An Error Occured While Fetching Pokemon Data :',error);
        return false;
    }
}

async function navigatePokemon(id){
    currentPokemonId = id;
    await loadPokemon(id)
}

const typeColors = {
    normal:'#A8A878',
    fire:'#F08030',
    water:'#6890F0',
    electric:'#F8D030',
    grass:'#78C850',
    fighting:'#C03028',
    poison:'#A040A0',
    ground:'#E0C068',
    flying:'#A890F0',
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    dark: "#EE99AC",
}