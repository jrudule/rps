const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");
const { expect, test, beforeEach } = require("@jest/globals");

const html = fs.readFileSync(path.resolve(__dirname, "index.html"), "utf8");
const js = fs.readFileSync(path.resolve(__dirname, "RockPaperScissors.js"), "utf8");

let dom;
let document;


beforeEach(() => {
    dom = new JSDOM(html, { runScripts: "dangerously", resources: "usable" });
    const window = dom.window;
    document = window.document;
    // Execute the JS code inside the DOM
    const scriptEl = document.createElement("script");
    scriptEl.textContent = js;
    document.body.appendChild(scriptEl);

    document.dispatchEvent(new dom.window.Event("DOMContentLoaded"));
});

test("T_ASP-1: Maximum points selection", () => {
    const pointSelect = document.getElementById("pointSelect");
    const selectButton = document.querySelector(".selectPoints");

    pointSelect.value = "10";
    selectButton.click();

    const buttons = document.querySelectorAll("button.Rock, button.Paper, button.Scissors");
    const pointDiv = document.querySelector(".pointDiv");

    buttons.forEach(button => expect(button.disabled).toBe(false));
    expect(pointDiv.style.display).toBe("none");
});

test("T_ASP-2: Start game", () => {
    const startButton = document.querySelector(".start");
    const howToPlayButton = document.querySelector(".howToPlay");
    const pointDiv = document.querySelector(".pointDiv");

    startButton.click();

    expect(startButton.style.display).toBe("none");
    expect(howToPlayButton.style.display).toBe("none");
    expect(pointDiv.style.display).toBe("block");
});

test("T_ASP-3.1: User selection", () => {
    const rockButton = document.querySelector(".Rock");
    const gameDiv = document.querySelector(".gameDiv");

    document.querySelector(".selectPoints").click();

    rockButton.click();

    expect(gameDiv.style.display).toBe("flex");
    const playerChoice = document.querySelector(".playerDiv p").textContent;
    expect(playerChoice).toBe("Rock");
});

test("T_ASP-3.2: Computer choice", () => {
    document.addEventListener('DOMContentLoaded', function () {
        const computerSelection = document.querySelector(".computer");
        const validChoices = ["Rock", "Paper", "Scissors"];

        for (let i = 0; i < 100; i++) {
            expect(validChoices).toContain(computerSelection);
        }
    });
});

test("T_ASP-4: Restart game", () => {
    const restartButton = document.querySelector(".restart");

    restartButton.click();

    const startButton = document.querySelector(".start");
    const howToPlay = document.querySelector('.howToPlay');
    const gameDiv = document.querySelector(".gameDiv");

    expect(startButton.style.display).toBe("block");
    expect(howToPlay.style.display).toBe("block");
    expect(gameDiv.style.display).toBe("none");
});

test("T_ASP-5.1: Determining the winner and displaying the result", () => {
    document.addEventListener('DOMContentLoaded', function () {
        expect(playRound("Rock", "Scissors")).toBe("You Win! Rock beats Scissors!");
        expect(playRound("Rock", "Paper")).toBe("You Lose! Paper beats Rock!");
        expect(playRound("Rock", "Rock")).toBe("Tie!");
    });
});

test("T_ASP-5.2: User wining the game", () => {
    document.addEventListener('DOMContentLoaded', function () {
        const pointSelect = document.getElementById("pointSelect");
        const selectButton = document.querySelector(".selectPoints");
        const winnerScore = document.querySelector(".winnerScore");

        pointSelect.value = "2";
        selectButton.click();

        playRound("Rock", "Scissors");
        playRound("Paper", "Rock");
        expect(winnerScore.textContent).toContain("You won!");
    });
});

test("T_ASP-5.3: User loosing the game", () => {
    document.addEventListener('DOMContentLoaded', function () {
        const pointSelect = document.getElementById("pointSelect");
        const selectButton = document.querySelector(".selectPoints");
        const winnerScore = document.querySelector(".winnerScore");

        pointSelect.value = "2";
        selectButton.click();

        playRound("Scissors", "Rock");
        playRound("Rock", "Paper");
        expect(winnerScore.textContent).toContain("You lost!");
        
    });
});

test("T_ASP-6: Show rules", () => {
    const howToPlayButton = document.querySelector(".howToPlay");
    const ruleDiv = document.querySelector(".ruleDiv");

    howToPlayButton.click();

    expect(howToPlayButton.style.display).toBe("none");
    expect(ruleDiv.style.display).toBe("flex");
});

test("T_C-7: Hide game rules", () => {
    document.addEventListener('DOMContentLoaded', function () {
        const xButton = document.querySelector(".x");
        const ruleDiv = document.querySelector(".ruleDiv");
        const overlay = document.getElementById("overlay");

        xButton.click();

        expect(ruleDiv.style.display).toBe("none");
        expect(overlay.style.display).toBe("none");
    });
});
