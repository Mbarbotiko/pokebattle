(() => {

    class Pokemon {
        //https://pokeapi.co/ doesnt have weaknesses though
        constructor(name, type, hp, strength) {
            this.name = name,
                this.type = type,
                this.hp = hp,
                this.strength = strength


        }
        attack(otherPokemon) {
            let attackStrength = 10;
            if (otherPokemon.weakness.includes(this.type)) {
                attackStrength = attackStrength * 3;
            }
            return otherPokemon.hp = otherPokemon.hp - attackStrength;
        }

        getWeakness(type) {
            const weaknessByType = {
                Electric: ['Ground', 'Grass'],
                Water: ['Electric', 'Grass'],
                Fire: ['Water'],
                Grass: ['Fire'],
                Ground: ['Water', 'Grass'],
                Psychic: ['Psychic'],
                Fighting: ['Psychic'],
                Flying: ['Electric']
            }
            return this.weakness = weaknessByType[type];
        }
    }



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


    const showOrHideElement = (showOrHide, selector) => {
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


    const appStateButton = document.querySelector('.start-game');
    appStateButton.addEventListener('click', (e) => {
        const element = event.target;

        const appState = element.getAttribute('data-appState');
        //console.log('button state', appState)
        switch (appState) {
            case 'error': getPokemon();
                break;
            case 'player-select': //choose pokemon function
                break;
            case 'computer-select'://run computer choose pokemon function
                break;
            case 'ready':startGame(savePlayersChoices())
                break;
        }

    });

    //create function to call when button for startbattle text changes when app state changes

    const dataStateButton = {
        loading: {
            dataAttribute: 'loading',
            text: 'Loading Pokemon'
        },
        playerSelect: {
            dataAttribute: 'player-select',
            text: 'Choose your Pokemon'
        },
        computerSelect: {
            dataAttribute: 'computer-select',
            text: 'Opponent is choosing their Pokemon'
        },
        error: {
            dataAttribute: 'error',
            text: 'Reload Pokemon'
        },
        ready: {
            dataAttribute: 'ready',
            text: 'Start the battle!'
        }
    }
    //pass what state the button should be in 
    const startBattleButtonState = (dataState) => {
        // console.log(dataState)
        const button = document.querySelector('.start-game');
        button.setAttribute('data-appState', dataState.dataAttribute);
        button.innerText = dataState.text
    }

    const appendPokemon = (location, name, url) => {
        const appendTo = document.getElementById(location);
        const pokeImage = document.createElement('img');
        pokeImage.src = url;
        const pokeName = document.createElement('p');
        const pokeText = document.createTextNode(name);
        pokeName.appendChild(pokeText);
        appendTo.prepend(pokeImage);
        const h4 = appendTo.querySelector('h4');
        appendTo.insertBefore(pokeName, h4)

    }

    const savePlayersChoices = (playersPokemon, computersPokemon) => {
        const array = [];
        array.push(playersPokemon);
        array.push(computersPokemon);
        // const startGame = (array) => {
        //     console.log(array)
     
        //  } need to pass this array to onclick function in the switch, or save it locally or in session.
     
    }


    


    const choosePokemon = (name, url, hp, type) => {
        //function for event listener on click of cards
        // let player1 = [];
        // player1.push(name, url, hp, type);
        // console.log('player1', player1);
        appendPokemon('player-pokemon', name, url);
        //change button state to let user know the computer is choosing now
        startBattleButtonState(dataStateButton.computerSelect);
        const player1 = new Pokemon(name, type, hp, 'Water');//water is wrong 
        const computerChoosePokemon = () => {
            setTimeout(() => {
                // const whichPokemon = Math.floor(Math.random() * 151);
                const whichPokemon = Math.floor(Math.random() * 3);
                //choose a random pokemon
                const computersPokemon = document.querySelectorAll('.pokemon-card')[whichPokemon];
                const location = 'opponent-pokemon';
                const name = computersPokemon.getAttribute('data-name');
                const url = computersPokemon.getAttribute('data-image');
                const hp = computersPokemon.getAttribute('data-hp');
                const type = computersPokemon.getAttribute('data-type');
                // let computer = [];
                // computer.push(name, url, hp, type);
                const computer = new Pokemon(name, type, hp, 'Water');//water is wrong dont use
                appendPokemon(location, name, url);
                startBattleButtonState(dataStateButton.ready);
                //console.log(player1);
                savePlayersChoices(player1, computer);
            }, 3500);//delay the choice so it looks like user is deliberating

        }
        computerChoosePokemon();
        //return the users choice



    };








    const getPokemon = () => {
        showOrHideElement('show', '.loading');
        showOrHideElement('hide', '.error');
        // const allPokemonURL = 'https://pokeapi.co/api/v2/pokemon?limit=150&offset=0';
        const allPokemonURL = 'https://pokeapi.co/api/v2/pokemon?limit=3&offset=0';
        const response = fetch(allPokemonURL)
            .then((response) => {
                const responseData = response.json();
                return responseData;
            }).then((responseData) => {
                const pokeURL = responseData.results;
                //  console.log('response poke url', pokeURL);
                return pokeURL;
            }).then((pokeURL) => {
                return pokeURL;
            }).then((pokeURL) => {
                showOrHideElement('hide', '.error');
                startBattleButtonState(dataStateButton.playerSelect);

                pokeURL.forEach(item => {
                    const singlePokeURL = item.url;
                    const response = fetch(singlePokeURL)
                        .then((response) => {
                            const responseData = response.json();
                            return responseData;
                        })
                        .then((responseData) => {
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
                            colmb4.addEventListener('click', (e) => {
                                const pokemon = e.target.closest('.pokemon-card');
                                const name = pokemon.getAttribute('data-name');
                                const url = pokemon.getAttribute('data-image');
                                const hp = pokemon.getAttribute('data-hp');
                                const type = pokemon.getAttribute('data-type');
                                // console.log(name, hp, type);
                                choosePokemon(name, url, hp, type);
                            })

                        })

                })

            })
            .catch(() => {

                showOrHideElement('show', '.error');
                startBattleButtonState(dataStateButton.error);

            }).finally(() => {
                showOrHideElement('hide', '.loading');
            })
    }

    getPokemon();







})();