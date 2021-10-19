export default class Game {
  constructor() {
    this.addition = null;
    this.cellScore = null;
    this.boardSize = 4;
    this.container = null;
    this.cells = [];
    this.goblin = null;
    this.currentIndex = null;
    this.timerId = null;
  }

  bindToDOM(container, addition) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('Container is not HTMLElement');
    }

    if (!(addition instanceof HTMLElement)) {
      throw new Error('Addition is not HTMLElement');
    }

    this.container = container;
    this.addition = addition;
  }

  checkBinding() {
    if (this.container === null) {
      throw new Error('Board not bind to DOM');
    }

    if (this.addition === null) {
      throw new Error('Addition not bind to DOM');
    }
  }

  drawAddition() {
    this.checkBinding();

    const elText = document.createElement('span');
    elText.textContent = 'Количество набранных баллов: ';
    this.addition.appendChild(elText);

    const elScore = document.createElement('span');
    elScore.textContent = '0';
    this.addition.appendChild(elScore);

    this.cellScore = elScore;
  }

  drawBoard() {
    this.checkBinding();

    for (let i = 0; i < this.boardSize ** 2; i += 1) {
      const cellEl = document.createElement('div');
      cellEl.classList.add('cell', `number-${i + 1}`);
      this.container.appendChild(cellEl);
    }

    this.cells = Array.from(this.container.children);

    const cellGoblin = document.createElement('div');
    cellGoblin.classList.add('goblin');

    const index = Math.floor(Math.random() * (this.cells.length));

    this.cells[index].appendChild(cellGoblin);
    this.currentIndex = index;
    this.goblin = cellGoblin;
  }

  redrawPositions() {
    const goblin = document.querySelector('.goblin');

    let newIndex = Math.floor(Math.random() * (this.cells.length));
    while (newIndex === this.currentIndex) {
      newIndex = Math.floor(Math.random() * (this.cells.length));
    }

    this.cells[newIndex].appendChild(goblin);
    this.currentIndex = newIndex;
  }

  drawGame() {
    this.drawAddition();
    this.drawBoard();

    this.timerId = setInterval(() => this.redrawPositions(), 1000);
  }
}
