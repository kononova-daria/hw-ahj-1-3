import Game from './Game';
import UserAction from './UserActions';

const game = new Game();

game.bindToDOM(document.querySelector('#game-container'), document.querySelector('.addition'), document.querySelector('.btn'));
game.drawGame();

const controller = new UserAction(game);
controller.init();
