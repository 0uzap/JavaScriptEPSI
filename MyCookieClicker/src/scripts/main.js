import "../styles/style.css";
import { Game } from "./game";

document.querySelector("#app").innerHTML = `
    <h1>Welcome to my camion Clicker!</h1>
    <main id="game">
    </main>
`;

const game = new Game({
  camion: 0,
});

game.start();
