
(() => {
    let playersPokemonChoice = [];
    //store user and computer pokemon choices
    let computersPokemonChoice = [];
    let gameStart = false;
    //store game state, false = not yet started

    class Pokemon {
        //create pokemon object class
        constructor(name, type, hp) {
            this.name = name,
                this.type = type,
                this.hp = hp
        }
        attack(otherPokemon) {
            let attackStrength = 10;
            if (otherPokemon.weakness.includes(this.type)) {
                attackStrength = attackStrength * 3;
            }
            return otherPokemon.hp = otherPokemon.hp - attackStrength;
        }
        getWeakness(type) {
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
            return this.weakness = weaknessByType[type] || defaultValue;
        }
    }

    const showOrHideElement = (showOrHide, selector) => {
        const elementToHide = document.querySelector(selector);
        if (elementToHide) {
            if (showOrHide === 'show') {
                elementToHide.style.display = 'block';
            } else {
                elementToHide.style.display = 'none';
            }
        }
    }

    const appStateButton = document.querySelector('.start-game');
    //click event for game button, get its attribute to determine what function to call next in the game
    appStateButton.addEventListener('click', (e) => {
        const element = e.target;
        const appState = element.getAttribute('data-appState');
        switch (appState) {
            case 'error': getPokemon();
                break;
            case 'ready': startGame();
                break;
            case 'reset': resetGame();
                break;
        }

    });

    //game button state (also game state)
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
        button.innerText = dataState.text;
    }
    //when a pokemon is chosen by the user or the computer, reusable function to append the pokemon to the DOM
    const appendPokemon = (location, name, url) => {
        const appendTo = document.getElementById(location);
        const pokeImage = document.createElement('img');
        pokeImage.src = url;
        const pokeName = document.createElement('p');
        pokeName.textContent = name;
        appendTo.append(pokeImage);
        appendTo.append(pokeName)
    }
    //collect users choice function
    const choosePokemon = (name, url, hp, type) => {
        if (playersPokemonChoice.length === 0) {
            appendPokemon('player-pokemon', name, url);
            startBattleButtonState(dataStateButton.computerSelect);
            playersPokemonChoice.push(name, url, hp, type);
            const computerChoosePokemon = () => {
                setTimeout(() => {
                    const whichPokemon = Math.floor(Math.random() * 151);
                    const computersPokemon = document.querySelectorAll('.pokemon-card')[whichPokemon];
                    const location = 'opponent-pokemon';
                    const name = computersPokemon.getAttribute('data-name');
                    const url = computersPokemon.getAttribute('data-image');
                    const hp = computersPokemon.getAttribute('data-hp');
                    const type = computersPokemon.getAttribute('data-type');
                    computersPokemonChoice.push(name, url, hp, type);
                    appendPokemon(location, name, url);
                    startBattleButtonState(dataStateButton.ready);
                }, 3500);
                //delay the choice so it looks like user is deliberating

            }
            computerChoosePokemon();
        }

    };
    //pokemon battle function
    const pokeFight = (pokemonOne, pokemonTwo) => {
        const playerPokemon = document.querySelector('#player-pokemon img');
        const opponentPokemon = document.querySelector('#opponent-pokemon img');
        const hpMeter = document.querySelector('.pokemon-hp h4');
        const modal = document.querySelector('#fight-result');
        const closeModal = document.querySelector('[data-dismiss="modal"]');
        closeModal.addEventListener('click', function () {
            modal.style.display = 'none';
        });
        pokemonOne.getWeakness(pokemonOne.type);
        pokemonTwo.getWeakness(pokemonTwo.type);
        const battleMusic = new Audio();
        battleMusic.src = 'public/sounds/battle.mp3';
        battleMusic.play();
        battleMusic.volume = .1;
        let startFight = setInterval(function () {
            //check to see if the fight should end
            if (pokemonOne.hp > 0 && pokemonTwo.hp > 0) {
                if (pokemonOne.hp > 0) {
                    hpMeter.innerText = pokemonOne.hp + '|' + pokemonTwo.hp;
                    pokemonOne.attack(pokemonTwo);
                    playerPokemon.classList.remove('down');
                    playerPokemon.classList.add('up');
                    setTimeout(function () {
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
                }
            }

        }, 3000);

    }
    //game start function
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
        parents[0].firstElementChild.removeChild(removeImage1);
        parents[0].firstElementChild.removeChild(removeParagraph1);
        parents[1].firstElementChild.removeChild(removeImage2);
        parents[1].firstElementChild.removeChild(removeParagraph2);
        hpMeter.innerText = '';
        //reset the button
        startBattleButtonState(dataStateButton.playerSelect);
    }
    //fetch call to get pokemon from API
    const getPokemon = () => {
        showOrHideElement('show', '.loading');
        showOrHideElement('hide', '.error');
        const allPokemonURL = 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0';
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
                //need to loop over all pokemon URL's returned to get individual pokemon data from API
                pokeURL.forEach(item => {
                    const singlePokeURL = item.url;
                    const response = fetch(singlePokeURL)
                        .then((response) => {
                            const responseData = response.json();
                            return responseData;
                        })
                        .then((responseData) => {
                            //when there is a response set variables and place variables into DOM
                            let pokeName = responseData.forms[0].name;
                            const pokeImage = responseData.sprites.front_default;
                            pokeName = pokeName.charAt(0).toUpperCase() + pokeName.substring(1);
                            const pokeHP = responseData.stats[0].base_stat;
                            const pokeType = responseData.types[0].type.name;

                            let colmb4 = document.createElement('div');
                            colmb4.className = "col-mb-4";

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

                            //add event listener to each card created, get all attributes passed and send to choosePokemon function
                            document.querySelector('.pokemon-cards').appendChild(colmb4);
                            colmb4.addEventListener('click', (e) => {
                                const pokemon = e.target.closest('.pokemon-card');
                                const name = pokemon.getAttribute('data-name');
                                const url = pokemon.getAttribute('data-image');
                                const hp = pokemon.getAttribute('data-hp');
                                const type = pokemon.getAttribute('data-type');
                                choosePokemon(name, url, hp, type);
                            });

                        });
                });

            })
            .catch((error) => {
                showOrHideElement('show', '.error');
                startBattleButtonState(dataStateButton.error);

            }).finally(() => {
                showOrHideElement('hide', '.loading');
            })
    }
    getPokemon();
})();