// function startGame() {

// }

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
    menuBox.append(continueButton)
    let highscore = document.createElement("button")
    highscore.innerText = "HIGH SCORE"
    highscore.id = "highscore"
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

    //submit button event listener 
///////////////////////////////////
//////////////////////////////////
/////////////////////////////////
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


function startGame(playercharacter) {
    let battleS = document.querySelector("#battleS")
    // console.log(battleS)
    battleS.style.display = 'none'

    let main = document.querySelector('body')
    //fight container
    let fightDiv = document.createElement('div')
    main.append(fightDiv)
    // insert character sprite
    let characterSprite = document.createElement("img")
    characterSprite.src = 'sprite.png'
    characterSprite.id = 'characterSprite'
    fightDiv.append(characterSprite)
    // healthbar 
    let healthbar = document.createElement("section")
    healthbar.id = 'healthbar'
    healthbar.innerText = `HEALTH : ${globalCharacter.phealth} / ${globalCharacter.pmaxhealth}`
    fightDiv.append(healthbar)
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

}





setBackground()
menuScreen()
