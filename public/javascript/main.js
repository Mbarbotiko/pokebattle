
(() => {



    /*

    style the app
    create a heart meter
    load pokemon in order
    https://daveceddia.com/waiting-for-promises-in-a-loop/
    Media screens
    clean up code
    */


    let playersPokemonChoice = [];
    let computersPokemonChoice = [];
    let gameStart = false;



    class Pokemon {
        constructor(name, type, hp) {
            this.name = name,
                this.type = type,
                this.hp = hp

        }
        attack(otherPokemon) {
            let attackStrength = 10;
            if (otherPokemon.weakness.includes(this.type)) {//this.type is undefined in the game call
                attackStrength = attackStrength * 3;
            }
            return otherPokemon.hp = otherPokemon.hp - attackStrength;
        }

        getWeakness(type) {
            //need to do some error handling on this, because if key is not found error is thrown
            let defaultValue = ['none'];
            const weaknessByType = {
                electric: ['ground', 'grass'],
                water: ['electric', 'grass'],
                fire: ['water'],
                grass: ['fire'],
                ground: ['water', 'grass'],
                psychic: ['psychic'],
                fighting: ['psychic'],
                flying: ['electric']
            }
            return this.weakness = weaknessByType[type] || defaultValue
        }
    }

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
        switch (appState) {
            case 'error': getPokemon();
                break;
            case 'player-select': //choose pokemon function
                break;
            case 'computer-select'://run computer choose pokemon function
                break;
            case 'ready': startGame();
                break;
            case 'in-progress': //
                break;
            case 'reset': resetGame();
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
        },
        inprogress: {
            dataAttribute: 'in-progress',
            text: 'Battle in Progress'
        },
        reset: {
            dataAttribute: 'reset',
            text: 'Reset'
        }
    }
    //pass what state the button should be in 
    const startBattleButtonState = (dataState) => {
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




    const choosePokemon = (name, url, hp, type) => {
        if (playersPokemonChoice.length === 0) {
            //need to remove ability of selecting multiple pokemon 
            appendPokemon('player-pokemon', name, url);
            //change button state to let user know the computer is choosing now
            startBattleButtonState(dataStateButton.computerSelect);
            // const player1 = new Pokemon(name, type, hp, 'Water');//water is wrong 

            playersPokemonChoice.push(name, url, hp, type);


            const computerChoosePokemon = () => {
                setTimeout(() => {
                    // const whichPokemon = Math.floor(Math.random() * 151);
                    const whichPokemon = Math.floor(Math.random() * 151);
                    //choose a random pokemon
                    const computersPokemon = document.querySelectorAll('.pokemon-card')[whichPokemon];
                    const location = 'opponent-pokemon';
                    const name = computersPokemon.getAttribute('data-name');
                    const url = computersPokemon.getAttribute('data-image');
                    const hp = computersPokemon.getAttribute('data-hp');
                    const type = computersPokemon.getAttribute('data-type');

                    computersPokemonChoice.push(name, url, hp, type);
                    // const computer = new Pokemon(name, type, hp, 'Water');//water is wrong dont use
                    appendPokemon(location, name, url);
                    startBattleButtonState(dataStateButton.ready);


                }, 3500);//delay the choice so it looks like user is deliberating

            }
            computerChoosePokemon();
        }

    };

    const pokeFight = (pokemonOne, pokemonTwo) => {

        const playerPokemon = document.querySelector('#player-pokemon img');
        const opponentPokemon = document.querySelector('#opponent-pokemon img');
        const hpMeter = document.querySelector('.pokemon-hp h4');
        const modal = document.querySelector('#fight-result');
        const closeModal = document.querySelector('[data-dismiss="modal"]');
        closeModal.addEventListener('click', function () {
            modal.style.display = 'none';
        });

        //add animation here with delays
        pokemonOne.getWeakness(pokemonOne.type);
        pokemonTwo.getWeakness(pokemonTwo.type);
        // do {
        // backgroundMusic.pause();
        const battleMusic = new Audio();
        battleMusic.src = 'public/sounds/battle.mp3';
        battleMusic.play();

        let startFight = setInterval(function () {
            //check to see if the fight should end
            if (pokemonOne.hp > 0 && pokemonTwo.hp > 0) {

                if (pokemonOne.hp > 0) {
                    hpMeter.innerText = pokemonOne.hp + '|' + pokemonTwo.hp;
                    pokemonOne.attack(pokemonTwo);
                    // playerPokemon.classList.add('up');
                    playerPokemon.classList.remove('down');
                    playerPokemon.classList.add('up');
                    setTimeout(function () {
                        //  playerPokemon.classList.remove('up');
                        playerPokemon.classList.remove('up');
                        playerPokemon.classList.add('down');
                        hpMeter.innerText = pokemonOne.hp + '|' + pokemonTwo.hp;
                    }, 500);
                }
                if (pokemonTwo.hp > 0) {
                    //after getting hit check for hp before running a return attack
                    setTimeout(function () {
                        hpMeter.innerText = pokemonOne.hp + '|' + pokemonTwo.hp;
                        pokemonTwo.attack(pokemonOne);
                        opponentPokemon.classList.remove('down');
                        opponentPokemon.classList.add('up');

                    }, 1500);
                    setTimeout(function () {
                        opponentPokemon.classList.remove('up');
                        opponentPokemon.classList.add('down');
                        hpMeter.innerText = pokemonOne.hp + '|' + pokemonTwo.hp;
                    }, 2000);
                }

            } else {

                if (pokemonOne.hp <= 0 || pokemonTwo.hp <= 0) {
                    clearInterval(startFight);
                    battleMusic.pause();
                    // backgroundMusic.play();
                    let winner = '';
                    //if pokemonOne hp is greater than 0 they're the winner else the winner is the other pokemon
                    pokemonOne.hp > 0 ? winner = 'Your ' + pokemonOne.name : winner = 'Opponents ' + pokemonTwo.name;
                    //change button here to reset the game
                    startBattleButtonState(dataStateButton.reset);
                    hpMeter.innerText = pokemonOne.hp + '|' + pokemonTwo.hp;

                    modal.style.display = 'block';
                    let modalMessage = modal.querySelector('.modal-body p');
                    modalMessage.innerText = `The winner is : ${winner}`
                    return;
                    //return alert(`The winner is : ${winner}`);

                }
            }

        }, 3000);

    }


    const startGame = () => {
        if (!gameStart) {
            gameStart = true;
            const playerName = playersPokemonChoice[0];
            const playerType = playersPokemonChoice[3];
            let playerHP = playersPokemonChoice[2];
            if (typeof (playerHP) !== 'number') {
                playerHP = parseInt(playerHP);
            }
            const player = new Pokemon(playerName, playerType, playerHP);


            const opponentName = computersPokemonChoice[0];
            const opponentType = computersPokemonChoice[3];
            let opponentHP = computersPokemonChoice[2];
            if (typeof (opponentHP) !== 'number') {
                opponentHP = parseInt(opponentHP);
            }
            const opponent = new Pokemon(opponentName, opponentType, opponentHP);


            pokeFight(player, opponent);
            startBattleButtonState(dataStateButton.inprogress);
        }
    }

    const resetGame = () => {
        //reset the array
        playersPokemonChoice = [];
        computersPokemonChoice = [];
        gameStart = false;

        //remove pokemon from DOM
        const parents = document.querySelectorAll('.chosen-pokemon');
        const removeImage1 = parents[0].querySelector('img');
        const removeParagraph1 = parents[0].querySelector('p');
        const removeImage2 = parents[1].querySelector('img');
        const removeParagraph2 = parents[1].querySelector('p');
        const hpMeter = document.querySelector('.pokemon-hp h4');
        parents[0].removeChild(removeImage1);
        parents[0].removeChild(removeParagraph1);
        parents[1].removeChild(removeImage2);
        parents[1].removeChild(removeParagraph2);
        hpMeter.innerText = '';

        //reset the button
        startBattleButtonState(dataStateButton.playerSelect);


    }




    const getPokemon = () => {
        showOrHideElement('show', '.loading');
        showOrHideElement('hide', '.error');
        const allPokemonURL = 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0';
        // const allPokemonURL = 'https://pokeapi.co/api/v2/pokemon?limit=3&offset=0';
        const response = fetch(allPokemonURL)
            .then((response) => {
                const responseData = response.json();
                return responseData;
            }).then((responseData) => {
                const pokeURL = responseData.results;
                return pokeURL;
            }).then((pokeURL) => {
                return pokeURL;
            }).then((pokeURL) => {
                showOrHideElement('hide', '.error');
                startBattleButtonState(dataStateButton.playerSelect);

                pokeURL.forEach(item => {
                    return new Promise((resolve, reject) => {
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
                                    choosePokemon(name, url, hp, type);
                                })

                            })
                            .then((responseData) => {
                                resolve(responseData);

                            })


                    })


                })

            })
            .catch((error) => {

                showOrHideElement('show', '.error');
                startBattleButtonState(dataStateButton.error);
                reject(error);

            }).finally(() => {
                showOrHideElement('hide', '.loading');
            })
    }

    getPokemon();







})();