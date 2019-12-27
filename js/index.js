var globalCharacter 

function setBackground() {
    let background = document.createElement("canvas")
    background.id = "background"
    background.width = 700
    background.height = 700
    let context = background.getContext('2d')
    let main = document.querySelector('body')
    main.append(background)
}
function menuScreen() {
    // create canvas tag 
    let battleS = document.createElement("canvas")
    // console.log(battleS)
    battleS.id = "battleS"
    battleS.width = 700;
    battleS.height = 700
    let context = battleS.getContext('2d')
    
    // slap it on dom
    let main = document.querySelector('body')
    // console.log(main)
    main.append(battleS)
    
    //add title to battle screen 
    context.font = "bold 60px Arial";
    context.fillText("Full Stack Quest", (battleS.width / 2) - 250, (battleS.height / 2) - 200)


    //buttons in menu box
    let menuBox = document.createElement("div")
    menuBox.id = "menuBox"
    let startButton = document.createElement("button")
    startButton.innerText = "START"
    startButton.id = "startButton"
    menuBox.append(startButton)
    let continueButton = document.createElement("button")
    continueButton.innerText = "CONTINUE"
    continueButton.id = "continueButton"
    continueButton.addEventListener("click", (event) => {
        // helper method continueFromSaveState()
        continueFromSaveState()
    })
    menuBox.append(continueButton)
    let highscore = document.createElement("button")
    highscore.innerText = "HIGH SCORE"
    highscore.id = "highscore"
    highscore.addEventListener("click", () => {
        highscoreMenu()
    })
    menuBox.append(highscore)
    //slap menubox
    main.append(menuBox)
    startButton.addEventListener("click", (event) => {
        menuBox.style.display = "none"
        enterName()
    })
}
function enterName() {
    let main = document.querySelector('body')
    //container for the enter name menu
    let enterBox = document.createElement("div")
    enterBox.id = "enterBox"
    //header prompt asking for name
    let pleaseEnterName = document.createElement("b")
    pleaseEnterName.id = "pleaseEnterName"
    pleaseEnterName.innerText = "Please Enter Your Name"
    enterBox.append(pleaseEnterName)
    //input field 
    let nameField = document.createElement("input")
    nameField.id = "nameField"
    nameField.type = "text"
    enterBox.append(nameField)
    //submit button
    let submitNewName = document.createElement("button")
    submitNewName.id = "submitNewName"
    submitNewName.innerText = "Submit"
    enterBox.append(submitNewName)

    // back button 
    let backFrom2A = document.createElement("button")
    backFrom2A.id = 'backFrom2A'
    backFrom2A.innerText = 'Back'
    backFrom2A.addEventListener('click', (event) => {
        enterBox.style.display = 'none'
        menuBox.style.display = "block"
    })
    enterBox.append(backFrom2A)

    submitNewName.addEventListener('click', (event) => {
        // submitNameAndStartGame(nameField)
        enterBox.style.display = 'none'
        makeStatBox(nameField)
    })

    main.append(enterBox)
}

function makeStatBox() {
    let main = document.querySelector('body')
    // make main statBox Element
    let statBox = document.createElement("div")
    statBox.id = 'statBox'
    // add stats and show name + submit button 
    let statSection = document.createElement("section")
    statSection.id = 'statSection'
    statSection.innerText = `Stats for ${nameField.value}`
    // UL for all the stats
    let statUl = document.createElement("ul")
    statUl.id = 'statUl'
    // attack li 
    let attackLi = document.createElement("li")
    attackLi.id = 'attackLi'
    let attackvalue = Math.floor(Math.random() * 10)
    attackLi.innerText = `${attackvalue}/10 -- Attack`
    statUl.append(attackLi)
    // health li
    let healthLi = document.createElement("li")
    healthLi.id = 'healthLi'
    let healthvalue = (Math.floor(Math.random() * 100) + 50)
    healthLi.innerText = `${healthvalue}/150 -- Health`
    statUl.append(healthLi)

    statSection.append(statUl)
    statBox.append(statSection)


    // back button
    let backFrom2B = document.createElement('button')
    backFrom2B.id = 'backFrom2B'
    backFrom2B.innerText = 'Back'
    statBox.append(backFrom2B)
    // reroll button 
    let rerollButton = document.createElement("button")
    rerollButton.id = 'rerollButton'
    rerollButton.innerText = 'ReRoll'
    statBox.append(rerollButton)
    // start game button
    let startGameButton = document.createElement('button')
    startGameButton.id = 'startGameButton'
    startGameButton.innerText = "Start Game"
    statBox.append(startGameButton)

    main.append(statBox)


    backFrom2B.addEventListener("click", (event) => {
        statBox.style.display = 'none'
        let enterBox = document.querySelector("#enterBox")
        enterBox.style.display = 'block'
    })

    rerollButton.addEventListener('click', (event) => {
        attackvalue = Math.floor(Math.random() * 10)
        attackLi.innerText = `${attackvalue}/10 -- Attack`
        healthvalue = (Math.floor(Math.random() * 100) + 50)
        healthLi.innerText = `${healthvalue}/150 -- Health`
    })
    
    startGameButton.addEventListener('click', (event) => {
        statBox.style.display = 'none'
        // console.log(nameField.value)
        // console.log(attackvalue)
        // console.log(healthvalue)
        fetch("http://localhost:3000/players", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
                name: `${nameField.value}`,
                pattack: `${attackvalue}`,
                phealth: `${healthvalue}`,
                pmaxhealth: `${healthvalue}`
            })
        })
        .then(r => r.json())
        .then((playercharacter)=> {
        // console.log(playercharacter)
            globalCharacter = playercharacter
            startGame(playercharacter)
        })
    })
}


function startGame() {
    let battleS = document.querySelector("#battleS")
    // console.log(battleS)
    battleS.style.display = 'none'

    let main = document.querySelector('body')
    //fight container
    let fightDiv = document.createElement('div')
    fightDiv.id = 'fightDiv'
    main.append(fightDiv)
    // insert character sprite
    let characterSprite = document.createElement("img")
    characterSprite.src = 'sprite.png'
    characterSprite.id = 'characterSprite'
    fightDiv.append(characterSprite)
    // healthbar 
    let healthbar = document.createElement("section")
    healthbar.id = 'healthbar'
    healthbar.innerText = `HEALTH : ${globalCharacter.player.phealth} / ${globalCharacter.player.pmaxhealth}`
    fightDiv.append(healthbar)

    // enemy health bar
    let ehealthbar = document.createElement("section")
    ehealthbar.id = 'ehealthbar'
    ehealthbar.innerText = `ENEMY : ${globalCharacter.enemy.ehealth} / ${globalCharacter.enemy.emaxhealth}`
    fightDiv.append(ehealthbar)

    // enemy sprite 
    let robotSprite = document.createElement('img')
    robotSprite.src = 'robot.png'
    robotSprite.id = 'robotSprite'
    fightDiv.append(robotSprite)
    // attack button
    let attackButton = document.createElement("button")
    attackButton.id = 'attackButton'
    attackButton.innerText = 'Attack'
    fightDiv.append(attackButton)
    // defend button 
    let defendButton = document.createElement("button")
    defendButton.id = 'defendButton'
    defendButton.innerText = 'Defend'
    fightDiv.append(defendButton)

    // attack, what happens? make sure memory is updated.
    attackButton.addEventListener('click', (event) => {
        attackSequence(globalCharacter)
    })
    // defened, what happens? make sure memory is updated.
    defendButton.addEventListener('click', (event) => {
        defenseSequence(globalCharacter)
    })
    // Back to main menu - take memory object and send it to database
}

function attackSequence() {
    globalCharacter.player.phealth -= (globalCharacter.enemy.eattack)
    globalCharacter.enemy.ehealth -= (globalCharacter.player.pattack)
    healthbar.innerText = `HEALTH : ${globalCharacter.player.phealth} / ${globalCharacter.player.pmaxhealth}`
    ehealthbar.innerText = `ENEMY : ${globalCharacter.enemy.ehealth} / ${globalCharacter.enemy.emaxhealth}`

    if (globalCharacter.player.phealth <= 0) {
        /// game over hide fightDiv, show menuBox fetch patch player
        alert("You have died a painful and horrible death, goodbye.")
        // fetch helper for update player 
        globalCharacter.player.phealth = 1 
        fetchPatchPlayer()
        // go back to menu
        fightDiv.parentNode.removeChild(fightDiv)
        // menuBox
        menuBox.style.display = 'block'
        battleS.style.display = 'block'

    } else if (globalCharacter.enemy.ehealth <= 0) {
        /// game win hide fightDiv, show menuBox fetch patch player
        // fetch helper for update player
        fetchPatchPlayer()

        // ask if continue or go back to main menu 
        // delete alert 

        alert("You have defeated this nefarious foe and shower in its blood.")
        // go back to menu 
        fightDiv.parentNode.removeChild(fightDiv)
        // show menuBox
        menuBox.style.display = 'block'
        battleS.style.display = 'block'
    } else {
        /// show damage message 
        alert(`You did ${globalCharacter.player.pattack} damage, and took ${globalCharacter.enemy.eattack} damage`)
    }
}

function defenseSequence() {
    if (globalCharacter.player.phealth < globalCharacter.player.pmaxhealth) {
        globalCharacter.player.phealth += 2
        if (globalCharacter.player.phealth > globalCharacter.player.pmaxhealth) {
            globalCharacter.player.phealth -= (globalCharacter.player.phealth - globalCharacter.player.pmaxhealth)
        }
        healthbar.innerText = `HEALTH : ${globalCharacter.player.phealth} / ${globalCharacter.player.pmaxhealth}`
        alert(`You have been healed!`)
    } else {
        // already max health alert
        alert("You are already at Max Health")
    }
}

function fetchPatchPlayer () {
    let idvar = globalCharacter.player.id 
    let phealthvar = globalCharacter.player.phealth
    fetch(`http://localhost:3000/players/${idvar}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            phealth: `${phealthvar}`
        })
    })
    .then(r => r.json())
    .then((newsies) => {
        console.log(newsies)
        globalCharacter = newsies
    })
}

function continueFromSaveState() {
    menuBox.style.display = 'none'
    let main = document.querySelector('body')

    let continueBox = document.createElement("div")
    main.append(continueBox)
    // enter name field for continue search
    let continueNameField = document.createElement("input")
    continueNameField.id = 'continueNameField'
    continueBox.append(continueNameField)

    // search button 
    let searchNameButton = document.createElement("button")
    searchNameButton.id = 'searchNameButton'
    searchNameButton.innerText = 'Search for this name'
    continueBox.append(searchNameButton)

    // event listener for search box. 
    searchNameButton.addEventListener('click', (event) => {
        // make a custom route in rails
        // send :name 
        fetch(`http://localhost:3000/players/search/${continueNameField.value}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(r => r.json())
        .then((response) => {
            // console.log(response)
            if (confirm(`Is this your savefile? ${response.player.name}, atk ${response.player.pattack}, health ${response.player.phealth}, maxhealth ${response.player.pmaxhealth}`)) {
                // start game with this savefile 
                globalCharacter = response
                startGame()
                continueBox.style.display = 'none'
            }
            
        })
        .catch(() => {
            // console.log("ERROR")
            alert("We could not find this name in the database")
        })

        
    })

    // back button for continueBox 
    let backButton3A = document.createElement("button")
    backButton3A.id = 'backButton3A'
    backButton3A.innerText = 'Back'
    continueBox.append(backButton3A)

    backButton3A.addEventListener('click', () => {
        continueBox.style.display = 'none'
        menuBox.style.display = 'block'
    })

}

// high score button 

function highscoreMenu() {
    menuBox.style.display = 'none'
    let main = document.querySelector("body")

    let highBox = document.createElement("div")
    highBox.id = 'highBox'
    main.append(highBox)

    // back button 
    let backButton4B = document.createElement("button")
    backButton4B.id = 'backButton4B'
    backButton4B.innerText = 'Back'
    highBox.append(backButton4B)
    
    backButton4B.addEventListener('click', (event) => {
        highBox.style.display = 'none'
        menuBox.style.display = 'block'
    })

    // highest attack button 
    // fetch - sort - 
    let highAttackButton = document.createElement("button")
    highAttackButton.id = 'highAttackButton'
    highAttackButton.innerText = 'Highest Attack Stat'
    highBox.append(highAttackButton)

    highAttackButton.addEventListener('click', (event) => {
        highBox.style.display = 'none'
        let highAttackBox = document.createElement("div")
        highAttackBox.id = 'highAttackBox'
        main.append(highAttackBox)

        fetch("http://localhost:3000/highattack")
        .then(r => r.json())
        .then((response) => {
            showHighScore("Highest Attack", response)
        })
    })
    let highHPButton = document.createElement("button")
    highHPButton.id = 'highHPButton'
    highHPButton.innerText = 'Highest HP Stat'
    highBox.append(highHPButton)

    highHPButton.addEventListener('click', (event) => {
        highBox.style.display = 'none'
        let highAttackBox = document.createElement("div")
        highAttackBox.id = 'highAttackBox'
        main.append(highAttackBox)

        fetch("http://localhost:3000/highHP")
        .then(r => r.json())
        .then((response) => {
            showHighScore("Highest HP", response)
        })
    })
    let highKillButton = document.createElement("button")
    highKillButton.id = 'highKillButton'
    highKillButton.innerText = 'Highest Kills Stat'
    highBox.append(highKillButton)

    highKillButton.addEventListener('click', (event) => {
        highBox.style.display = 'none'
        let highAttackBox = document.createElement("div")
        highAttackBox.id = 'highAttackBox'
        main.append(highAttackBox)

        fetch("http://localhost:3000/highKill")
        .then(r => r.json())
        .then((response) => {
            /////

            let highAttackP = document.createElement('p')
            highAttackP.id = 'highAttackP'
            highAttackP.innerText = `Most Kills`
            highAttackBox.append(highAttackP)
    
            let firstPlayerDiv = document.createElement('div')
            firstPlayerDiv.id = 'firstPlayerDiv'
            firstPlayerDiv.innerText = `NAME: ${response.player1.name} ATK: ${response.player1.pattack} HP: ${response.player1.pmaxhealth} KILLS: ${response.player1.encounters}`
            highAttackBox.append(firstPlayerDiv)
            
            let secondPlayerDiv = document.createElement('div')
            secondPlayerDiv.id = 'secondPlayerDiv'
            secondPlayerDiv.innerText = `NAME: ${response.player2.name} ATK: ${response.player2.pattack} HP: ${response.player2.pmaxhealth} KILLS: ${response.player2.encounters}`
            highAttackBox.append(secondPlayerDiv)
    
            let thirdPlayerDiv = document.createElement('div')
            thirdPlayerDiv.id = 'thirdPlayerDiv'
            thirdPlayerDiv.innerText = `NAME: ${response.player3.name} ATK: ${response.player3.pattack} HP: ${response.player3.pmaxhealth} KILLS: ${response.player3.encounters}`
            highAttackBox.append(thirdPlayerDiv)
    
            let backButton4D = document.createElement('button')
            backButton4D.id = 'backButton4D'
            backButton4D.innerText = "Back"
            highAttackBox.append(backButton4D)
            backButton4D.addEventListener('click', (event) => {
                highAttackBox.parentNode.removeChild(highAttackBox)
                highBox.style.display = 'block'
            })


            ////
        })
    })

    // show high scores helper function 
    function showHighScore(highestSomething, response) {
        let highAttackP = document.createElement('p')
        highAttackP.id = 'highAttackP'
        highAttackP.innerText = `${highestSomething}`
        highAttackBox.append(highAttackP)

        let firstPlayerDiv = document.createElement('div')
        firstPlayerDiv.id = 'firstPlayerDiv'
        firstPlayerDiv.innerText = `NAME: ${response.player1.name} ATK: ${response.player1.pattack} HP: ${response.player1.pmaxhealth}`
        highAttackBox.append(firstPlayerDiv)
        
        let secondPlayerDiv = document.createElement('div')
        secondPlayerDiv.id = 'secondPlayerDiv'
        secondPlayerDiv.innerText = `NAME: ${response.player2.name} ATK: ${response.player2.pattack} HP: ${response.player2.pmaxhealth}`
        highAttackBox.append(secondPlayerDiv)

        let thirdPlayerDiv = document.createElement('div')
        thirdPlayerDiv.id = 'thirdPlayerDiv'
        thirdPlayerDiv.innerText = `NAME: ${response.player3.name} ATK: ${response.player3.pattack} HP: ${response.player3.pmaxhealth}`
        highAttackBox.append(thirdPlayerDiv)

        let backButton4D = document.createElement('button')
        backButton4D.id = 'backButton4D'
        backButton4D.innerText = "Back"
        highAttackBox.append(backButton4D)
        backButton4D.addEventListener('click', (event) => {
            highAttackBox.parentNode.removeChild(highAttackBox)
            highBox.style.display = 'block'
        })
    }





    // highest maxhp 
    // fetch - sort -


    // most kills
    // fetch - sort - 


}



setBackground()
menuScreen()
