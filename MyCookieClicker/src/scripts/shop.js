import { ShopItem } from "./shopItem";

export class Shop {
    gameElement = null;
    onPurchase = null;

    constructor(gameElement, onPurchase) {
        this.gameElement = gameElement;
        this.onPurchase = onPurchase;
    }

    render() {
        this.shopElement = document.createElement("aside");
        this.shopElement.id = "game-shop";

        this.shopElement.innerHTML = `
            <h2>Garage</h2>
        `;
        this.shopListElement = document.createElement("ul");

        const v4 = new ShopItem(this.shopListElement, this.onPurchase, "v4", 10, 0, 0.1);
        v4.render();
        
        this.gameElement.append(this.shopElement);
        this.shopElement.append(this.shopListElement);
    }
}