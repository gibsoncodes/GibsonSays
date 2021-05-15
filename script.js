let allowClicks = true;
let simonText = document.querySelector(".simonText");
let gameBody = document.querySelector(".game");
let innerTileBlue = document.querySelector(".b");
let innerTileRed = document.querySelector(".r");
let innerTileGreen = document.querySelector(".g");
let innerTileYellow = document.querySelector(".y");
let theme1 = document.querySelector(".theme1");
let theme2 = document.querySelector(".theme2");
let theme3 = document.querySelector(".theme3");
let theme4 = document.querySelector(".theme4")
let HTML = document.querySelector("html");
let body = document.querySelector("body");

theme1.addEventListener("click", () => {changeTheme(theme1)})
theme2.addEventListener("click", () => {changeTheme(theme2)})
theme3.addEventListener("click", () => {changeTheme(theme3)})
theme4.addEventListener("click", () => {changeTheme(theme4)})

// let theme1 = document.querySelector(".theme1");
let inners = [innerTileBlue, innerTileGreen, innerTileYellow, innerTileRed];

let startBtn = document.querySelector(".start");
let roundHTML = document.querySelector(".round");
let levelClearedHTML = document.querySelector(".level-clear");

let redTile = document.querySelector(".red");
let greenTile = document.querySelector(".green");
let blueTile = document.querySelector(".blue");
let yellowTile = document.querySelector(".yellow");
let tiles = [blueTile, greenTile, yellowTile, redTile];

function changeTheme(theme) {
    let val = theme.getAttribute("set");
    if (val == 1) {
        HTML.style.backgroundColor = "#f4a261";
        body.style.backgroundColor = "#f4a261";
        redTile.style.backgroundColor = "#2a9d8f";
        greenTile.style.backgroundColor = "#e9c46a";
        blueTile.style.backgroundColor = "#e76f51";
        yellowTile.style.backgroundColor = "#264653";
    } else if (val == 2) {
        HTML.style.backgroundColor = "#98c1d9";
        body.style.backgroundColor = "#98c1d9";
        redTile.style.backgroundColor = "#006d77";
        greenTile.style.backgroundColor = "#293241";
        blueTile.style.backgroundColor = "#d9ae94";
        yellowTile.style.backgroundColor = "#3d5a80";
    } else if (val == 3) {
        HTML.style.backgroundColor = "#dde5b6";
        body.style.backgroundColor = "#dde5b6";
        redTile.style.backgroundColor = "#f0ead2";
        greenTile.style.backgroundColor = "#adc178";
        blueTile.style.backgroundColor = "#6c584c";
        yellowTile.style.backgroundColor = "#84a59d";
    } else if (val == 4) {
        HTML.style.backgroundColor = "#84a59d";
        body.style.backgroundColor = "#84a59d";
        redTile.style.backgroundColor = "#9d8189";
        greenTile.style.backgroundColor = "#f6bd60";
        blueTile.style.backgroundColor = "#f7ede2";
        yellowTile.style.backgroundColor = "#f28482";
    }
}

class Game {
    constructor () {
        this.pattern = [];
        this.currentIndex = 0;
        this.round = 1;
    }
    start() {
        allowClicks = true;
        simonText.innerHTML = "SIMON";
        simonText.classList.add("hidden");
        for (let i =0; i < tiles.length; i++) {
            tiles[i].classList.remove("dark");
        }
        this.nextRound();
    }

    loseGame() {
        stopClicks();
        allowClicks = false;
        loseHTML(this.round);
        this.pattern = [];
        this.currentIndex = 0;
        this.round = 0;
    }

    checkGuess (color) {
        if (this.pattern[this.currentIndex] != color) {
            this.loseGame();
        } else {
            this.currentIndex++;
            if (this.currentIndex === this.pattern.length) {
                this.levelCleared();
            }
        }
    }

    randomTile () {
        let val = Math.floor(Math.random() * 4);
        this.pattern.push(val);
    }

    levelCleared() {
        this.round++;
        this.currentIndex = 0;
        setTimeout(() => {
            updateRound(this.round);
            clearedAnimation();
        }, 1500);
        setTimeout( () => {
            this.nextRound();
        }, 3400)
    }

    nextRound () {
        stopClicks();
        this.randomTile();
        for (let i = 0; i < this.pattern.length; i++) {
            setTimeout( () => {startClicks()}, 1500 * this.pattern.length - 1);
            setTimeout( () => {
                highlightTile(inners[this.pattern[i]]);
            }, 1500 * i)
        }
    }


}

let simon = new Game();

startBtn.addEventListener("click", beginGame);
for (let i = 0; i < tiles.length; i++) {
    tiles[i].addEventListener("click", (event) => {
        event.stopPropagation();
        stopClicks();
        clickTile(i)
    });
}

function loseHTML(round) {
    simonText.classList.remove("hidden");
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].classList.add("dark");
    }
    simonText.innerHTML = `The House Always Wins: <br> You Won ${round - 1} Rounds.`;
    startBtn.addEventListener("click", beginGame);
}

function clearedAnimation() {
    simonText.classList.remove("hidden");
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].classList.add("dark");
        setTimeout( () => {
            tiles[i].classList.remove("dark");
        }, 1400);
    }
    setTimeout(() => {
        simonText.classList.add("hidden");
    }, 1400);
}

function beginGame() {
    startBtn.removeEventListener("click", beginGame);
    roundHTML.innerHTML = "Round: 1";
    simon.start();
}

function updateRound(round) {
    roundHTML.innerHTML = `Round: ${round}`;
}

function highlightTile(tile) {
    tile.id = "full";
    setTimeout( () => {
        tile.id = null;
    }, 1300);
}

function clickTile(tile) {
    inners[tile].id = "full";
    setTimeout( () => {
        inners[tile].id = null;
        startClicks();
    }, 1300);
    simon.checkGuess(tile);
}

function stopClicks() {
    gameBody.classList.add("noClicks");
}

function startClicks() {
    if (!allowClicks) return 0;
    gameBody.classList.remove("noClicks");
}