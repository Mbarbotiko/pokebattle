(function () {
    getPokemon();
    function getPokemon() {
        showOrHideElement('show', '.loading');
        // const allPokemonURL = 'https://pokeapi.co/api/v2/pokemon?limit=150&offset=0';
        const allPokemonURL = 'https://pokeapi.co/api/v2/pokemon?limit=3&offset=0';
        const response = fetch(allPokemonURL)
            .then(function (response) {
                const responseData = response.json();
                return responseData;
            }).then(function (responseData) {
                const pokeURL = responseData.results;
                //  console.log('response poke url', pokeURL);
                return pokeURL;
            }).then(function (pokeURL) {
                return pokeURL;
            }).then(function (pokeURL) {
                pokeURL.forEach(item => {
                    const singlePokeURL = item.url;
                    const response = fetch(singlePokeURL)
                        .then(function (response) {
                            const responseData = response.json();
                            return responseData;
                        })
                        .then(function (responseData) {
                            let pokeName = responseData.forms[0].name;
                            const pokeImage = responseData.sprites.front_default;
                            pokeName = pokeName.charAt(0).toUpperCase() + pokeName.substring(1);
                            const pokeHP = responseData.stats[0].base_stat;
                            const pokeType = responseData.types[0].type.name;

                            let colmb4 = document.createElement('div');
                            colmb4.className = "col mb-4";

                            let cardh100 = document.createElement('div');
                            cardh100.className = "card h-100 pokemon-card";
                            cardh100.setAttribute('data-name', pokeName);
                            cardh100.setAttribute('data-image', pokeImage);
                            cardh100.setAttribute('data-hp', pokeHP);
                            cardh100.setAttribute('data-type', pokeType);


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


                            //before appending the first card remove the spinner
                            document.querySelector('.pokemon-cards').appendChild(colmb4);
                            colmb4.addEventListener('click', function (e) {
                                const pokemon = e.target.closest('.pokemon-card');
                                const name = pokemon.getAttribute('data-name');
                                const url = pokemon.getAttribute('data-image');
                                const hp = pokemon.getAttribute('data-hp');
                                const type = pokemon.getAttribute('data-type');
                                console.log(name, url, hp, type)
                            })

                        }).then(function () {
                            showOrHideElement('hide', '.error');
                        })

                });
            })
            .catch(function () {
                console.log('uhoh');
                showOrHideElement('show', '.error');

            }).finally(function () {
                showOrHideElement('hide', '.loading');
            })
    }

    const tryAgainButton = document.querySelector('.try-again');
    tryAgainButton.addEventListener('click', function () {
        getPokemon();
    })

    function showOrHideElement(showOrHide, selector) {
        const elementToHide = document.querySelector(selector);
        if (elementToHide) {
            if (showOrHide === 'show') {
                elementToHide.style.display = 'block';

            }
            if (showOrHide === 'hide') {
                elementToHide.style.display = 'none';

            }
        }

    }

    //user chooses a pokemon
    const startGameButton = document.querySelector('.start-game'); startGameButton.addEventListener('click', startGame);

    function choosePokemon(a, b, c, d) {
        let player1 = [];
        player1.push(a, b, c, d);
        console.log(player1);
        return player1;
    };

    function startGame(g) {
        console.log(g)
        console.log('test')
    }




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

})();