let scores = { scoreA: 0, scoreB: 0 }
let winner = null
let sets = { setsA: 0, setsB: 0 }
let actualSet = null



const aPlusKey = "D"
const aMinusKey = "A"
const bPlusKey = "L"
const bMinusKey = "J"

const repeatKey = "R"
const newGameKey = "N"

const repeatButton = document.getElementById("repeat-score")
const newGameButton = document.getElementById("new-game")

function insertScore (scoreId, score){
    scores[scoreId] += score
    document.getElementById(scoreId).innerHTML = scores[scoreId]
}

function addScore (buttonId, scoreId, increment, key){
    const button = document.getElementById(buttonId)
    button.addEventListener("click", () =>{
        if(scores[scoreId] + increment <0){
            return
        }
        insertScore (scoreId, increment)
        narratePoint(scores["scoreA"], scores["scoreB"])
        checkWinner(scores)
    })
    document.addEventListener("keydown", (event) =>{
        if(event.key.toUpperCase() === key.toUpperCase()){
            if(scores[scoreId] + increment <0){
                return
            }
            insertScore (scoreId, increment)
            narratePoint(scores["scoreA"], scores["scoreB"])
            checkWinner(scores)
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

function checkWinner(scores){
    const teams = Object.keys(scores)
    if(scores["scoreA"] >= 14 && scores["scoreB"] >= 14){
        winByTwo()
        return
    }
    for(let i = 0; i < teams.length; i++){
        const team = teams[i]
        if(scores[team] >= 15){
            if (!winner){
                winner = team
                console.log(winner)
                const winnerAudio = new Audio (`audio/dois-sets-a-um-${team}.mp3`)
                winnerAudio.play()
                if(winner == teams[0]){
                    insertSet(sets["setsA"])                    
                    return
                }
                insertSet(sets["setsB"])
            }
            break
        }        
    }
}

function newGame(){
    scores["scoreA"] = 0
    scores["scoreB"] = 0
    
    sets["setsA"] = 0
    sets["setsB"] = 0
    
    actualSet = null
    winner = null
    
    document.getElementById("scoreA").innerHTML = 0
    document.getElementById("scoreB").innerHTML = 0
    document.getElementById("set-1").innerHTML = ""
    document.getElementById("history-1").innerHTML = ""
    document.getElementById("set-2").innerHTML = ""
    document.getElementById("history-2").innerHTML = ""
    document.getElementById("set-3").innerHTML = ""
    document.getElementById("history-3").innerHTML = ""    
}

function insertSet(setsId){
    actualSet += 1
    sets[setsId] += 1
    console.log(actualSet)
    if(winner == ["scoreA"]){
        document.getElementById(`set-${actualSet}`).innerHTML = "A"
        document.getElementById(`history-${actualSet}`).innerHTML = `${scores["scoreA"]} a ${scores["scoreB"]}`
        document.getElementById("scoreA").innerHTML = 0
        document.getElementById("scoreB").innerHTML = 0
        scores["scoreA"] = 0
        scores["scoreB"] = 0
        winner = null
        return
    }
    document.getElementById(`set-${actualSet}`).innerHTML = "B"
    document.getElementById(`history-${actualSet}`).innerHTML = `${scores["scoreB"]} a ${scores["scoreA"]}`
    document.getElementById("scoreA").innerHTML = 0
    document.getElementById("scoreB").innerHTML = 0
    scores["scoreA"] = 0
    scores["scoreB"] = 0
    winner = null
}

function winByTwo(){
    const pointDifference = Math.abs(scores["scoreA"] - scores["scoreB"])
    if(pointDifference == 2){
        winner = scores["scoreA"] > scores["scoreB"] ? "scoreA" : "scoreB"
        insertSet(sets[winner])
        return
    }
}

newGameButton.addEventListener("click", newGame)
document.addEventListener("keydown", (event) => {
    if(event.key.toUpperCase() == newGameKey){
        newGame()
    }
})

repeatButton.addEventListener("click", () =>{
    narratePoint(scores["scoreA"], scores["scoreB"])
})
document.addEventListener("keydown", (event) => {
    if(event.key.toUpperCase() == repeatKey){
        narratePoint(scores["scoreA"], scores["scoreB"])
    }
})

addScore("a-plus-button", "scoreA", 1, aPlusKey),
addScore("a-minus-button", "scoreA", -1, aMinusKey),
addScore("b-plus-button", "scoreB", 1, bPlusKey),
addScore("b-minus-button", "scoreB", -1, bMinusKey)









