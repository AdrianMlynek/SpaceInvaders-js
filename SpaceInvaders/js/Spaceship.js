import {Missle} from './Missle.js'

export class Spaceship {
  missles = []
  #modifier = 7;
  #leftArrow = false;
  #rightArrow = false;
  constructor(element, container) {
    this.element = element
    this.container = container
  }
  init () {
    this.#setX()
    this.#eventListeners()
    this.#gameLoop()
  }
  #setX() {
    this.element.style.bottom = '0px'
    this.element.style.left = `${window.innerWidth / 2 - this.#getX()}px`
  }
  #getX() {
    return this.element.offsetLeft + this.element.offsetWidth / 2
  }
  #eventListeners() {
    window.addEventListener('keydown', ({keyCode}) => {
      switch(keyCode) {
        case 37:
          this.#leftArrow = true
          break
        case 39:
          this.#rightArrow = true
          break
      }
    })
    window.addEventListener('keyup', ({keyCode}) => {
      switch(keyCode) {
        case 32:
          this.#shoot()
          break

        case 37:
          this.#leftArrow = false
          break

        case 39:
          this.#rightArrow = false
          break
      }
    })
  }
  #gameLoop = () => {
    this.#whatKey()
    requestAnimationFrame(this.#gameLoop)
  }
  #whatKey() {
    if(this.#leftArrow && this.#getX() > 12) {
      this.element.style.left = `${parseInt(this.element.style.left, 10) - this.#modifier}px`
    }
    if(this.#rightArrow && this.#getX() + 12 < window.innerWidth) {
      this.element.style.left = `${parseInt(this.element.style.left, 10) + this.#modifier}px`
    }
  }
  #shoot() {
    const missle = new Missle(this.#getX(), this.element.offsetTop, this.container)
    missle.init()
    this.missles.push(missle)
  }
}
