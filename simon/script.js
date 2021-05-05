let allowClicks = false;

let startBtn = document.querySelector(".start");
let roundHTML = document.querySelector(".round");
let levelClearedHTML = document.querySelector(".level-clear");

let redTile = document.querySelector(".red");
let greenTile = document.querySelector(".green");
let blueTile = document.querySelector(".blue");
let yellowTile = document.querySelector(".yellow");
let tiles = [blueTile, greenTile, yellowTile, redTile];

class Game {
    constructor () {
        this.pattern = [];
        this.currentIndex = 0;
        this.round = 1;
    }
    start() {
        this.nextRound();
    }

    loseGame() {
        console.log("hi");
        this.pattern = [];
        this.currentIndex = 0;
        this.round = 0;
        updateRound(this.round);
    }

    checkGuess (color) {
        console.log(color);
        console.log(this.pattern[this.currentIndex]);
        if (this.pattern[this.currentIndex] != color) {
            this.loseGame();
        } else {
            this.currentIndex++;
        }
        if (this.currentIndex === this.pattern.length) {
            this.levelCleared();
        }
    }

    randomTile () {
        let val = Math.floor(Math.random() * 4);
        console.log(val);
        this.pattern.push(val);
    }

    levelCleared() {
        this.round++;
        this.currentIndex = 0;
        updateRound(this.round);
        allowClicks = false;
        setTimeout( () => {
            this.nextRound();
        }, 1500)
    }

    nextRound () {
        console.log(this.pattern);
        allowClicks = true;
        this.randomTile();
        for (let i = 0; i < this.pattern.length; i++) {
            setTimeout( () => {
                highlightTile(tiles[this.pattern[i]]);
            }, 1500 * i)
        }
    }


}

let simon = new Game();

startBtn.addEventListener("click", beginGame);
for (let i = 0; i < tiles.length; i++) {
    tiles[i].addEventListener("click", () => { clickTile(tiles[i])} );
}

function beginGame() {
    startBtn.classList.add("hidden");
    simon.start();
}

function updateRound(round) {
    roundHTML.innerHTML = `Round: ${round}`;
    if (round !== 0) {
        levelClearedHTML.classList.remove("hidden");
        setTimeout ( () => {
            levelClearedHTML.classList.add("hidden");
        }, 2000);
    }
}

function highlightTile(tile) {
    tile.classList.add("highlight");
    setTimeout( () => {
        tile.classList.remove("highlight");
    }, 1300);
}

function clickTile(tile) {
    if (!allowClicks) return 0;
    let color = tile.getAttribute("value");
    tile.classList.add("highlight");
    setTimeout( () => {
        tile.classList.remove("highlight");
    }, 500);
    simon.checkGuess(color);
}