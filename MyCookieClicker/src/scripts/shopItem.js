export class ShopItem {
  shopListElement = null;
  onPurchase = null;
  name = null;
  prix = null;
  quantite = null;
  passif = null;

  constructor(shopListElement, onPurchase, name, prix, quantite, passif) {
    this.shopListElement = shopListElement;
    this.onPurchase = onPurchase;
    this.name = name;
    this.prix = prix;
    this.quantite = quantite;
    this.passif = passif;
  }

  render() {
    this.shopItemElement = document.createElement("li");
    this.shopItemElement.id = "shopElement";

    this.shopItemElement.innerHTML = `
        <h3>${this.name}</h3>
        <p>Prix : <span class="prix">${this.prix}</span></p>
        <p>Quantité : <span class="quantite">${this.quantite}</span></p>
    `;

    this.prixElement = this.shopItemElement.querySelector(".prix");
    this.quantiteElement = this.shopItemElement.querySelector(".quantite");

    this.buttonElement = document.createElement("button");

    this.buttonElement.textContent = "Acheter";
    this.buttonElement.addEventListener("click", () => this.onPurchase(this));

    this.shopListElement.append(this.shopItemElement);
    this.shopItemElement.append(this.buttonElement);
  }

    update() {
        this.prixElement.textContent = this.prix;
        this.quantiteElement.textContent = this.quantite;
    }
}
