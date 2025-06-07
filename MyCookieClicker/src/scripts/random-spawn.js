import GoldenwheelImg from "../assets/golden-wheel.webp"; 

export class RandomSpawn {
  gameElement = null;
  onGoldenClick = null;
  passiveGain = 0;

  constructor(gameElement, onGoldenClick, passiveGain) {
    this.gameElement = gameElement;
    this.onGoldenClick = onGoldenClick;
    this.passiveGain = passiveGain;
  }

  startSpawning() {
    setInterval(() => {
      this.spawnGoldenwheel();
    }, 15000); // toutes les 15 secondes
  }

  spawnGoldenwheel() {
    const wheel = document.createElement("img");
    wheel.src = GoldenwheelImg;
    wheel.className = "golden-wheel";
    wheel.alt = "Golden wheel";
    wheel.style.position = "absolute";
    wheel.style.width = "64px";
    wheel.style.height = "64px";

    // Position aléatoire dans la fenêtre
    const x = Math.random() * (window.innerWidth - 64);
    const y = Math.random() * (window.innerHeight - 64);
    wheel.style.left = `${x}px`;
    wheel.style.top = `${y}px`;

    // Animation d'apparition
    wheel.classList.add("fade-in");

    // Gestion du clic
    wheel.addEventListener("click", () => {
      const bonus = Math.floor(1 + Math.random() * this.passiveGain() * 1000);
      this.onGoldenClick(bonus);
      wheel.remove();
    });

    // Ajout au DOM
    document.body.appendChild(wheel);

    // Disparition automatique après 5s
    setTimeout(() => {
      wheel.classList.add("fade-out");
      setTimeout(() => wheel.remove(), 1000); // attend la fin du fondu
    }, 5000);
  }
}
