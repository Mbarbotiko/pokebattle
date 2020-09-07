
const computerChoosePokemon = () => {

    // const whichPokemon = Math.floor(Math.random() * 151);
    const whichPokemon = Math.floor(Math.random() * 151);
    //choose a random pokemon
    const computersPokemon = document.querySelectorAll('.pokemon-card')[whichPokemon];
    return whichPokemon;



}


module.exports = computerChoosePokemon();




