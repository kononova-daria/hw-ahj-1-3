export default class UserAction {
  constructor(game) {
    this.game = game;
    this.scores = 0;
    this.missed = 0;
    this.timerId = null;
    this.eventProcessing = (event) => {
      if (event.target === this.game.goblin) {
        this.success();
      } else {
        this.fail();
      }
    };
    this.wasStarted = false;
  }

  init() {
    this.game.button.addEventListener('click', () => this.new());

    // eslint-disable-next-line no-alert
    alert('Для начала нажмите на кнопку "Новая игра"');
  }

  success() {
    this.scores += 1;

    this.game.cellScore.textContent = `${this.scores}`;

    clearInterval(this.timerId);
    this.game.redrawPositions();
    this.timerId = setInterval(() => {
      this.game.redrawPositions();
      this.fail();
    }, 1000);
  }

  fail() {
    this.missed += 1;

    this.game.cellFailure.textContent = `${this.missed}`;

    if (this.missed === 5) {
      // eslint-disable-next-line no-alert
      alert(`К сожалению, Вы пропустили 5 появлений гоблинов и проиграли! Ваш счет - ${this.scores} баллов.`);

      this.end();
    }
  }

  new() {
    if (this.wasStarted) {
      this.game.container.removeEventListener('click', this.eventProcessing);
      clearInterval(this.timerId);
    }

    this.scores = 0;
    this.missed = 0;

    this.game.cellFailure.textContent = `${this.missed}`;
    this.game.cellScore.textContent = `${this.scores}`;

    this.game.container.addEventListener('click', this.eventProcessing);

    this.timerId = setInterval(() => {
      this.game.redrawPositions();
      this.fail();
    }, 1000);

    if (!this.wasStarted) this.wasStarted = true;
  }

  end() {
    clearInterval(this.timerId);

    this.game.container.removeEventListener('click', this.eventProcessing);

    this.wasStarted = false;
  }
}
