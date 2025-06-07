import { ClickableArea } from "./clickable-area";
import { Shop } from "./shop";
import { RandomSpawn } from "./random-spawn";
import "../styles/game.css";

export class Game {
  // Game Properties
  camion = 0;
  passif = 0;

  // Game Elements
  gameElement = null;
  scoreElement = null;

  // Game Components
  clickableArea = null;
  shop = null;
  randomSpawn = null;


  constructor(config) {
    // Récupère le nombre de camion de base via la configuration.
    this.camion = config.camion;
    // Récupère l'élément avec l'id game.
    this.gameElement = document.querySelector("#game");
    // Crée le composant ClickableArea qui gère la logique de la zone cliquable.
    // On passe en argument l'élément Game pour permettre l'ajout d'HTML à l'intérieur.
    // Et une fonction Callback pour réagir à l'événement de clique.
    this.clickableArea = new ClickableArea(
      this.gameElement,
      this.onClickableAreaClick
    );
   this.shop = new Shop(
    this.gameElement,
    this.onPurchase,
   ) ;
   this.randomSpawn = new RandomSpawn(
    this.gameElement,
    this.onGoldenCookieClick,
    () => this.passif // on passe une fonction pour que le passif reste à jour
  );

  }

  // Lance le jeu
  start() {
    this.render();
    setInterval( () => {
        this.camion += this.passif;
        window.requestAnimationFrame(() => {
            this.updateScore();
        })
    }, 1000
    );

    this.randomSpawn.startSpawning();  
  }

  // Génère les éléments à afficher.
  render() {
    this.renderScore();
    this.clickableArea.render();
    this.shop.render();
  }

  // Génère l'affichage du score.
  renderScore() {
    this.scoreElement = document.createElement("section");
	this.scoreElement.id = "game-score";
    this.gameElement.append(this.scoreElement);
    this.updateScore();
  }

  // Met à jour l'affichage du score.
  updateScore() {
    this.scoreElement.innerHTML = `
        <span>${this.camion.toFixed(1)} people isekaied</span>
    `;
  }

  // Ici on utilise une fonction fléchée pour avoir encore accès au this de Game.
  // Sans fonction fléchée, le this serait celui de l'élément lié au click.
  onClickableAreaClick = () => {
    // On ajoute 1 point aux camion pour chaque click.
    this.camion += 1;
    // Par soucis de performance car les changements au DOM sont très lourd,
    // On demande à la Window d'attendre la prochaine frame d'animation
    // pour réaliser les changements.
    window.requestAnimationFrame(() => {
      this.updateScore();
    });
  };

  onPurchase = (item) => {
    console.log(item);
    if (this.camion >= item.prix) {
        this.camion -= item.prix;
        item.quantite += 1;
        item.prix = 10 + item.quantite * 3;
        this.passif += item.passif;

         item.update();
    }   
  }

  onGoldenCookieClick = (bonus) => {
  this.camion += bonus;
  window.requestAnimationFrame(() => {
    this.updateScore();
    });
  };

  
}
