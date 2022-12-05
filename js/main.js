'use script'

var gInterval
var gLevel = 16

var gNums = createNums(gLevel)
var gNextNum = 1



function onInit() {
    renderBoard()
}

function renderBoard() {
    var strHtml = ''
    var length = gNums.length ** 0.5

    for (var i = 0; i < length; i++) {
        strHtml += `<tr>`

        for (var j = 0; j < length; j++) {
            var cell = drawNums(gNums)

            strHtml += `<td class="nums" onclick="cellClicked(this,${cell})">${cell}</td>`

        }

        strHtml += `</tr>\n`
    }

    var elBoard = document.querySelector('.board')

    elBoard.innerHTML = strHtml

}

function cellClicked(elClickedNum, cell) {
    console.log(elClickedNum, cell);
    var elCount = document.querySelector('.counter')
    if (cell !== gNextNum) return
    if (cell === 1) gInterval = setInterval(timer, 1000)

    if (cell >= gLevel) {
        elCount.innerText = '😁'
        clearInterval(gInterval)
        return
    }
    gNextNum++
    elClickedNum.classList.add('locked')
    elCount.innerText = gNextNum

}

function timer() {
    //sec
    var elSec = document.querySelector('.sec')
    var currSec = elSec.innerText
    currSec++
    elSec.innerText = currSec
    //min
    var elMin = document.querySelector('.min')
    var currMin = elMin.innerText
    if (currSec > 60) {
        currMin++
        elMin.innerText = currMin
        //need to reset the sec
        currSec = 0
        elSec.innerText = currSec
    }

}

function chooseDifficult(lvl) {
    gLevel = lvl
    restart()
}

function restart() {
    gNextNum = 1
    gNums = createNums(gLevel)
    clearInterval(gInterval)
    document.querySelector('.min').innerText = '00'
    document.querySelector('.sec').innerText = '00'
    document.querySelector('.counter').innerText = gNextNum
    onInit()

}

function drawNums() {
    var idx = getRandomInt(0, gNums.length)
    var num = gNums[idx]
    gNums.splice(idx, 1)
    return num

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function createNums(length) {
    var nums = []
    for (var i = 1; i <= length; i++) {
        nums.push(i)
    }
    return nums
}
