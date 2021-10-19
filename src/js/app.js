import Game from './Game';
import UserAction from './UserActions';

const game = new Game();

game.bindToDOM(document.querySelector('#game-container'), document.querySelector('.addition'));
game.drawGame();

const controller = new UserAction(game);
controller.init();
