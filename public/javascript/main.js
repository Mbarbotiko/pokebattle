(function () {
    // const allPokemonURL = 'https://pokeapi.co/api/v2/pokemon?limit=150&offset=0';
    // fetch(allPokemonURL)
    //     .then(response => {
    //         return response.json();
    //     })
    //     .then(response => {
    //         const results = response.results;
    //         console.log(results)
    //     }).catch(error => {
    //         console.log(error)
    //     }

    //async/await instead:

    async function getPokemon() {
        const allPokemonURL = 'https://pokeapi.co/api/v2/pokemon?limit=150&offset=0';
        const response = await fetch(allPokemonURL);
        const responseData = await response.json();
        const pokeURL = responseData.results;
        pokeURL.forEach(item => {
          //  console.log(item.url);
            const singlePokeURL = item.url;
            (async function(){
                const response = await fetch(singlePokeURL);
                const responseData = await response.json();
                let pokeName = responseData.forms[0].name;
                const pokeImage = responseData.sprites.front_default;console.log(responseData)
                // pokeName = pokeName.charAt(0).toUppercase() + pokeName.substring(1);
               // console.log(responseData)
            //    console.log(pokeName)
            //    console.log(pokeImage)
            // const pokeCard = `        <div class="row row-cols-1 row-cols-md-6">
            // <div class="col mb-4">
            //     <div class="card h-100">
            //         <img src="${pokeImage}"
            //             class="card-img-top" alt="...">
            //         <div class="card-body">
            //             <p class="card-text">Bulbasaur</p>
            //         </div>
            //     </div>
            // </div>`

         

      
            let colmb4 = document.createElement('div');
            colmb4.className="col mb-4";

            let cardh100 = document.createElement('div');
            cardh100.className = "card h-100";

            let imgCard = document.createElement('img');
            imgCard.src = pokeImage;
            imgCard.className = "card-img-top";

            let cardBody = document.createElement('div');

            cardBody.className = "card-body";

            let pText = document.createElement('p');
            pText.className = "card-text";

            let textNode = document.createTextNode(pokeName)

            colmb4.appendChild(cardh100);

            cardh100.appendChild(imgCard);

            cardh100.appendChild(cardBody);

            cardBody.appendChild(pText);

            pText.appendChild(textNode);
    


            document.querySelector('.pokemon-cards').appendChild(colmb4);



            })();
        
           
 
        });
       
    }

    getPokemon().catch(error => {
        console.log(error);
    })







    // function pokemon() {
    //     class Pokemon {
    //         //https://pokeapi.co/ doesnt have weaknesses though
    //         constructor(name, type, hp, strength) {
    //             this.name = name,
    //                 this.type = type,
    //                 this.hp = hp,
    //                 this.strength = strength


    //         }
    //         attack(otherPokemon) {
    //             let attackStrength = 10;
    //             if (otherPokemon.weakness.includes(this.type)) {
    //                 attackStrength = attackStrength * 3;
    //             }
    //             return otherPokemon.hp = otherPokemon.hp - attackStrength;
    //         }

    //         getWeakness(type) {
    //             const weaknessByType = {
    //                 Electric: ['Ground', 'Grass'],
    //                 Water: ['Electric', 'Grass'],
    //                 Fire: ['Water'],
    //                 Grass: ['Fire'],
    //                 Ground: ['Water', 'Grass'],
    //                 Psychic: ['Psychic'],
    //                 Fighting: ['Psychic'],
    //                 Flying: ['Electric']
    //             }
    //             return this.weakness = weaknessByType[type];
    //         }
    //     }



    //     const pikachu = new Pokemon('Pikachu', 'Electric', 100, 'Water');
    //     const squirtle = new Pokemon('Squirtle', 'Water', 100, 'Fire');
    //     const bulbasaur = new Pokemon('Bulbasaur', 'Grass', 100, 'Ground');
    //     const charmander = new Pokemon('Charmander', 'Fire', 100, 'Grass');


    //     function pokeFight(pokemonOne, pokemonTwo) {
    //         pokemonOne.getWeakness(pokemonOne.type);
    //         pokemonTwo.getWeakness(pokemonTwo.type);
    //         do {
    //             pokemonOne.attack(pokemonTwo);
    //             pokemonTwo.attack(pokemonOne);
    //             console.log(`${pokemonOne.name} HP: ${pokemonOne.hp}, ${pokemonTwo.name} HP: ${pokemonTwo.hp}`);
    //         } while (pokemonOne.hp > 0 && pokemonTwo.hp > 0);
    //         //run this while hp of either pokemon is greater than 0
    //         let winner = '';
    //         //if pokemonOne hp is greater than 0 they're the winner else the winner is the other pokemon
    //         pokemonOne.hp > 0 ? winner = pokemonOne.name : winner = pokemonTwo.name;

    //         return `The winner is : ${winner}`

    //     }

    //     console.log(pokeFight(bulbasaur, pikachu))

    //     console.log(Pokemon.prototype, Object.getPrototypeOf(Pokemon), pikachu.hasOwnProperty('weakness'))


    //     console.log('type' in pikachu)

    // }

}) ();