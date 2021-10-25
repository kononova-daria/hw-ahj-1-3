export default class Game {
  constructor() {
    this.addition = null;
    this.cellScore = null;
    this.cellFailure = null;
    this.button = null;
    this.boardSize = 4;
    this.container = null;
    this.cells = [];
    this.goblin = null;
    this.currentIndex = null;
  }

  bindToDOM(container, addition, button) {
    if (!(container instanceof HTMLElement)) throw new Error('Container is not HTMLElement');
    if (!(addition instanceof HTMLElement)) throw new Error('Addition is not HTMLElement');
    if (!(button instanceof HTMLElement)) throw new Error('Button is not HTMLElement');

    this.container = container;
    this.addition = addition;
    this.button = button;
  }

  checkBinding() {
    if (this.container === null) throw new Error('Board not bind to DOM');
    if (this.addition === null) throw new Error('Addition not bind to DOM');
    if (this.button === null) throw new Error('Button not bind to DOM');
  }

  drawAddition() {
    this.checkBinding();

    const divSuccess = document.createElement('div');
    this.addition.appendChild(divSuccess);

    const elTextS = document.createElement('span');
    elTextS.textContent = 'Количество набранных баллов: ';
    divSuccess.appendChild(elTextS);

    const elScore = document.createElement('span');
    elScore.textContent = '0';
    divSuccess.appendChild(elScore);

    const divFailure = document.createElement('div');
    this.addition.appendChild(divFailure);

    const elTextF = document.createElement('span');
    elTextF.textContent = 'Количество промахов: ';
    divFailure.appendChild(elTextF);

    const elNumber = document.createElement('span');
    elNumber.textContent = '0';
    divFailure.appendChild(elNumber);

    const btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.classList.add('button');
    btn.textContent = 'Новая игра';
    this.button.appendChild(btn);

    this.cellScore = elScore;
    this.cellFailure = elNumber;
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
  }
}
