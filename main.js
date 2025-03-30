const gameStatus = {
    scores : {
        scoreA: 0,
        scoreB: 0
    },
    sets: {
        setsA: 0,
        setsB: 0
    },
    winner: null,
    actualSet: 0,
    gameWinner: null   
}

const gameSettings = {
    teamAName: "Time A",
    teamBName: "Time B",
    winScore: 10,
    winByTwoRule: true,
    setsToWin: 3
}

const settingsButton = document.getElementById("settings-button")
const settingsModal = document.getElementById("settings-modal")
const closeModalButton = document.getElementById("close-modal")
const saveSettingsButton = document.getElementById("save-settings")

const aPlusKey = "D"
const aMinusKey = "A"
const bPlusKey = "L"
const bMinusKey = "J"

const repeatKey = "R"
const newGameKey = "N"

const repeatButton = document.getElementById("repeat-score")
const newGameButton = document.getElementById("new-game")

function checkGameWinner(){   
    console.log(gameStatus.sets["setsA"] + " A")
    console.log(gameStatus.sets["setsB"] + " B")
    if(gameStatus.sets.setsA >= gameSettings.setsToWin){
        gameStatus.gameWinner = "Time A"
        console.log(gameStatus.gameWinner + " ganhou o Jogo")
    }
    else if(gameStatus.sets.setsB >= gameSettings.setsToWin){
        gameStatus.gameWinner = "Time B"
        console.log(gameStatus.gameWinner + " ganhou o Jogo")
    }
}

saveSettingsButton.addEventListener("click", () => {
    gameSettings.teamAName = document.getElementById("team-a-name").value || "Time A"
    gameSettings.teamBName = document.getElementById("team-b-name").value || "Time B"
    gameSettings.winScore = parseInt(document.getElementById("points-to-win").value, 10) || 10
    gameSettings.winByTwoRule = document.getElementById("win-by-two").checked
    gameSettings.setsToWin = parseInt(document.getElementById("sets-to-win").value, 10) || 3
    
    document.getElementById("team-a").innerHTML = gameSettings["teamAName"]
    document.getElementById("team-b").innerHTML = gameSettings["teamBName"]

    console.log(gameSettings.winScore)
    console.log(gameSettings.winByTwoRule)
})

function insertScore (scoreId, score){
    gameStatus.scores[scoreId] += score
    document.getElementById(scoreId).innerHTML = gameStatus.scores[scoreId]
}

function addScore (buttonId, scoreId, increment, key){
    const button = document.getElementById(buttonId)
    button.addEventListener("click", () =>{
        if(gameStatus.scores[scoreId] + increment <0){
            return
        }
        insertScore (scoreId, increment)
        narratePoint(gameStatus.scores["scoreA"], gameStatus.scores["scoreB"])
        checkWinner(gameStatus.scores)
    })
    document.addEventListener("keydown", (event) =>{
        if(event.key.toUpperCase() === key.toUpperCase()){
            if(gameStatus.scores[scoreId] + increment <0){
                return
            }
            insertScore (scoreId, increment)
            narratePoint(gameStatus.scores["scoreA"], gameStatus.scores["scoreB"])
            checkWinner(gameStatus.scores)
        }
    })
}

function narratePoint(scoreA, scoreB){
    const audioA = new Audio (`audio/${scoreA}.mp3`)
    const audioB = new Audio (`audio/${scoreB}.mp3`)
    const comparisonAudio = new Audio (`audio/a.mp3`)
    audioA.play()
    audioA.addEventListener("ended", () => {
        comparisonAudio.play()
        comparisonAudio.addEventListener("ended", () =>{
            audioB.play()
        })
    })
}

function checkWinner(){
    if(gameSettings.winByTwoRule == true){
        if(gameStatus.scores["scoreA"] >= gameSettings.winScore -1 && gameStatus.scores["scoreB"] >= gameSettings.winScore -1){
            winByTwo()
            checkGameWinner()
            return
        }
    }
    
    let teamA = gameStatus.scores.scoreA
    let teamB = gameStatus.scores.scoreB

    if(teamA >= gameSettings.winScore){
        gameStatus.winner = "setsA"
        insertSet("setsA")
        console.log(gameStatus.winner)
        console.log("time A ganhou o set")
        checkGameWinner()
    }
    else if(teamB >= gameSettings.winScore){
        gameStatus.winner = "setsB"
        insertSet("setsB")
        console.log(gameStatus.winner)
        console.log("time B ganhou o set")
        checkGameWinner()
    }
    else{
        console.log("time A: " + teamA)
        console.log("time B: " + teamB)
    }    
}

function newGame(){
    gameStatus.scores.scoreA = 0
    gameStatus.scores.scoreB = 0
    
    gameStatus.sets.setsA = 0
    gameStatus.sets.setsB = 0
    
    gameStatus.actualSet = null
    gameStatus.winner = null

    document.getElementById("scoreA").innerHTML = 0
    document.getElementById("scoreB").innerHTML = 0

    resetHtmlHistory("set-1", "history-1")
    resetHtmlHistory("set-2", "history-2")
    resetHtmlHistory("set-3", "history-3")
    resetHtmlHistory("set-4", "history-4")
    resetHtmlHistory("set-5", "history-5")      
}

function resetHtmlHistory(set, history){
    document.getElementById(set).innerHTML = ""
    document.getElementById(history).innerHTML = ""
}

function insertSet(setsId){
    
    gameStatus.actualSet += 1
    gameStatus.sets[setsId] += 1
    console.log(gameStatus.actualSet + "º set atual")
   
    if(gameStatus.winner == "setsA"){
        document.getElementById(`set-${gameStatus.actualSet}`).innerHTML = gameSettings["teamAName"]
        document.getElementById(`history-${gameStatus.actualSet}`).innerHTML = `${gameStatus.scores["scoreA"]} a ${gameStatus.scores["scoreB"]}`
    }
    else{
        document.getElementById(`set-${gameStatus.actualSet}`).innerHTML = gameSettings["teamBName"]
        document.getElementById(`history-${gameStatus.actualSet}`).innerHTML = `${gameStatus.scores["scoreB"]} a ${gameStatus.scores["scoreA"]}`
    } 
    document.getElementById("scoreA").innerHTML = 0
    document.getElementById("scoreB").innerHTML = 0
    
    gameStatus.scores["scoreA"] = 0
    gameStatus.scores["scoreB"] = 0 
    gameStatus.winner = null
}

function winByTwo(){
    const pointDifference = Math.abs(gameStatus.scores["scoreA"] - gameStatus.scores["scoreB"])
    if(pointDifference == 2){
        gameStatus.winner = gameStatus.scores["scoreA"] > gameStatus.scores["scoreB"] ? "setsA" : "setsB"
        console.log(gameStatus.winner + " vencedor por 2")
        insertSet(gameStatus.winner)
        return
    }
}

settingsButton.addEventListener("click", () =>{
    settingsModal.classList.remove("hidden")
})

closeModalButton.addEventListener("click", () => {
    settingsModal.classList.add("hidden")
})

newGameButton.addEventListener("click", newGame)
document.addEventListener("keydown", (event) => {
    if(event.key.toUpperCase() == newGameKey){
        newGame()
    }
})

repeatButton.addEventListener("click", () =>{
    narratePoint(gameStatus.scores["scoreA"], gameStatus.scores["scoreB"])
})
document.addEventListener("keydown", (event) => {
    if(event.key.toUpperCase() == repeatKey){
        narratePoint(gameStatus.scores["scoreA"], gameStatus.scores["scoreB"])
    }
})

addScore("a-plus-button", "scoreA", 1, aPlusKey),
addScore("a-minus-button", "scoreA", -1, aMinusKey),
addScore("b-plus-button", "scoreB", 1, bPlusKey),
addScore("b-minus-button", "scoreB", -1, bMinusKey)