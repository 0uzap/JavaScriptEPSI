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
    this.camion = config.camion || 0;

    this.passif = config.passif || 0;
    this.shopItemsConfig = config.shopItems || [];
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
   );

   this.randomSpawn = new RandomSpawn(
    this.gameElement,
    this.onGoldenCookieClick,
    () => this.passif // on passe une fonction pour que le passif reste à jour
  );

  this.loadShopItems();

  }

  loadShopItems() {
    this.shopItemsConfig.forEach(savedItem => {
      const item = this.shop.items.find(i => i.name === savedItem.name);
      if (item) {
        item.quantite = savedItem.quantite;
        item.prix = savedItem.prix;
        this.passif += item.passif * item.quantite;
        item.update();
      }
    });
  }

  save() {
    const shopItemsToSave = this.shop.items.map(item => ({
      name: item.name,
      quantite: item.quantite,
      prix: item.prix
    }));

    const saveData = {
      camion: this.camion,
      passif: this.passif,
      shopItems: shopItemsToSave
    };

    console.log("Saving game data:", saveData),
    localStorage.setItem("gameSave", JSON.stringify(saveData));
  }

  static load() {
    const saved = localStorage.getItem("gameSave");
    if (saved) {
      return JSON.parse(saved);
    } else {
      return {
        camion: 0,
        passif: 0,
        shopItems: []
      };
    }
  }

  // Lance le jeu
  start() {
    this.render();
    setInterval( () => {
        this.camion += this.passif;
        window.requestAnimationFrame(() => {
            this.updateScore();
        });
        this.save()
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
    this.save();
  };

  onPurchase = (item) => {
    console.log(item);
    if (this.camion >= item.prix) {
        this.camion -= item.prix;
        item.quantite += 1;
        item.prix = 10 + item.quantite * 3;
        this.passif += item.passif;

        item.update();
        this.save();
    }   
  }

  onGoldenCookieClick = (bonus) => {
  this.camion += bonus;
  window.requestAnimationFrame(() => {
    this.updateScore();
    });
  };

  
}
