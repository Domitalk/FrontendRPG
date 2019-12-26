// function startGame() {

// }
function setBackground() {
    let background = document.createElement("canvas")
    background.id = "background"
    background.width = 700
    background.height = 700
    let context = background.getContext('2d')
    let main = document.querySelector('body')
    main.append(background)
}
function battleScreen() {
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
    //submit button event listener 
///////////////////////////////////
//////////////////////////////////
/////////////////////////////////
    submitNewName.addEventListener('click', (event) => {
        submitNameAndStartGame(nameField)
    })

    main.append(enterBox)
}

function submitNameAndStartGame(nameField) {
    console.log(nameField.value)
}



setBackground()
battleScreen()
