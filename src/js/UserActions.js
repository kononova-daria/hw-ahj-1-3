export default class UserAction {
  constructor(game) {
    this.game = game;
    this.scores = 0;
    this.missed = 0;
  }

  init() {
    this.game.container.addEventListener('click', (event) => {
      if (event.target === this.game.goblin) {
        this.success();
      } else {
        this.fail();
      }
    });
  }

  success() {
    this.scores += 1;

    this.game.cellScore.textContent = `${this.scores}`;

    clearInterval(this.game.timerId);
    this.game.redrawPositions();
    this.game.timerId = setInterval(() => this.game.redrawPositions(), 1000);
  }

  fail() {
    this.missed += 1;

    if (this.missed === 5) {
      // eslint-disable-next-line no-alert
      alert(`К сожалению, Вы пропустили 5 появлений гоблинов и проиграли! Ваш счет - ${this.scores} баллов.`);

      this.scores = 0;
      this.missed = 0;

      this.game.cellScore.textContent = `${this.scores}`;
    }
  }
}
