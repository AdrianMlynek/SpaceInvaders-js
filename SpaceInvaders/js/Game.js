import {Spaceship} from './SpaceShip.js'
import {Enemy} from './Enemy.js'
class Game {
  #htmlElements = {
    spaceship: document.querySelector('[data-spaceship]'),
    container: document.querySelector('[data-container]'),
    lives: document.querySelector('[data-lives]'),
    score: document.querySelector('[data-score]'),
  }
  #ship = new Spaceship(this.#htmlElements.spaceship, this.#htmlElements.container)
  
  #enemies = []
  #lives = null
  #score = null
  #enemiesInterval = null
  #checkPositionInterval = null
  #createEnemyInterval = null

  init () {
    this.#ship.init()
    this.#newGame()
  }

  #newGame() {
    this.#enemiesInterval = 30
    this.#lives = 3
    this.#score = 0
    this.#updateLivesText();
    this.#updateScoreText();
    this.#createEnemyInterval = setInterval(()=> this.#randomNewEnemy(), 1000)
    this.#checkPositionInterval = setInterval(()=> this.#checkPosition(), 1)
  }
#randomNewEnemy() {
  const randomNumber = Math.floor(Math.random() * 5) + 1;
  randomNumber % 5 ? this.#createNewEnemy( this.#htmlElements.container, this.#enemiesInterval , 'enemy', 'explosion') :  this.#createNewEnemy(this.#htmlElements.container, this.#enemiesInterval * 2 , 'enemy--big','explosion--big', 3)
}

#createNewEnemy(...params) {
  const enemy = new Enemy( ...params)
    enemy.init()
    this.#enemies.push(enemy)
}

  #checkPosition() {
    this.#enemies.forEach((enemy, enemyIndex, enemiesArr) =>
    {
      const enemyPosition  = {
        top: enemy.element.offsetTop,
        right: enemy.element.offsetLeft + enemy.element.offsetWidth,
        bottom: enemy.element.offsetTop + enemy.element.offsetHeight,
        left: enemy.element.offsetLeft
      }
      if(enemyPosition.top > window.innerHeight) {
        enemy.explode()
        enemiesArr.splice(enemyIndex,1)
        this.#updateLives()
      }
      this.#ship.missles.forEach((missle, missleIndex, missleArr) =>
      {
        const misslePosition  = {
          top: missle.element.offsetTop,
          right: missle.element.offsetLeft + missle.element.offsetWidth,
          bottom: missle.element.offsetTop + missle.element.offsetHeight,
          left: missle.element.offsetLeft
        }
        if(misslePosition.bottom >= enemyPosition.top && misslePosition.top <= enemyPosition.bottom
          && misslePosition.right >= enemyPosition.left && misslePosition.left <= enemyPosition.right) {
            missle.remove()
            missleArr.splice(missleIndex,1)
            
            enemy.hit()
            if(!enemy.lives) {
              enemiesArr.splice(enemyIndex, 1)
              this.#updateScore( )
            }
            
        }
        if(misslePosition.bottom < 0) {
          missle.remove()
          missleArr.splice(missleIndex,1)
        }
      })
    })
  }

  #updateScore() {
    this.#score++
    this.#enemiesInterval--
    this.#updateScoreText()
  }

  #updateScoreText() {
    this.#htmlElements.score.textContent = `Score: ${this.#score}`
  }

  #updateLives() {
    this.#lives--
    this.#updateLivesText()
  }
  #updateLivesText() {
    this.#htmlElements.lives.textContent = `Lives: ${this.#lives}`
  }
  
}

window.onload = function () {
  const game = new Game()
  game.init()
}
