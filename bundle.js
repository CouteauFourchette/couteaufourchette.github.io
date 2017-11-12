/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class SortAnimation {
  constructor(canvas, ctx, cards) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.cards = cards;
    this.render();
  }

  animate(doneCallback, highlight) {
    let finishedCycle = true;
    if (highlight) {
      this.cards[highlight].selected = true;
    }
    for (let i = 0; i <= this.cards.length - 1; i += 1) {
      this.cards[i].moveToPosition();
      if (this.cards[i].moving === true) {
        finishedCycle = false;
      }
    }
    this.render();
    if (!finishedCycle) {
      window.requestAnimationFrame(() => {
        this.animate(doneCallback, highlight);
      });
    } else {
      setTimeout(() => {
        if (highlight) {
          this.cards[highlight].selected = false;
        }
        if (doneCallback) {
          doneCallback();
        }
      }, 100);
    }
  }

  swapCard(i, j) {
    this.cards[i].nextPosition = j;
    this.cards[j].nextPosition = i;
    const swap = this.cards[i];
    this.cards[i] = this.cards[j];
    this.cards[j] = swap;
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'rgb(59, 84, 167)';
    this.cards.forEach((card) => {
      card.render(this.ctx, this.canvas.height);
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (SortAnimation);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__card__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bubble_sort_animation__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__quick_sort_animation__ = __webpack_require__(4);




document.addEventListener('DOMContentLoaded', () => {
  const bubbleSortButton = document.querySelector('.startBubblesort');
  const bubbleSortCanvas = document.getElementById('bubblesortCanvas');
  bubbleSortCanvas.height = 100;
  bubbleSortCanvas.width = 380;
  const bubbleSortctx = bubbleSortCanvas.getContext('2d');
  const cards = __WEBPACK_IMPORTED_MODULE_0__card__["a" /* default */].generateCards(20);
  const bubbleAnim = new __WEBPACK_IMPORTED_MODULE_1__bubble_sort_animation__["a" /* default */](bubbleSortCanvas, bubbleSortctx, cards);
  bubbleSortButton.addEventListener('click', () => {
    bubbleAnim.bubbleSort();
  });
  const bubbleQuickSortButton = document.querySelector('.shuffleBubblesort');
  bubbleQuickSortButton.addEventListener('click', () => {
    bubbleAnim.cards = __WEBPACK_IMPORTED_MODULE_0__card__["a" /* default */].generateCards(20);
    bubbleAnim.render();
  });

  const quickSortButton = document.querySelector('.startQuicksort');
  const quickSortCanvas = document.getElementById('quicksortCanvas');
  quickSortCanvas.height = 100;
  quickSortCanvas.width = 380;
  const quickSortctx = quickSortCanvas.getContext('2d');
  const quickCards = __WEBPACK_IMPORTED_MODULE_0__card__["a" /* default */].generateCards(20);
  const quickAnim = new __WEBPACK_IMPORTED_MODULE_2__quick_sort_animation__["a" /* default */](quickSortCanvas, quickSortctx, quickCards);
  quickSortButton.addEventListener('click', () => {
    quickAnim.quickSort(0, quickCards.length - 1);
  });
  const shuffleQuickSortButton = document.querySelector('.shuffleQuicksort');
  shuffleQuickSortButton.addEventListener('click', () => {
    quickAnim.cards = __WEBPACK_IMPORTED_MODULE_0__card__["a" /* default */].generateCards(20);
    quickAnim.render();
  });
});



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Card {
  constructor(position, height) {
    this.position = position;
    this.nextPosition = position;
    this.height = height;
    this.selected = false;
    this.moving = false;
    this.y = 0;
    this.x = 0;
  }
  render(ctx, canvasHeight) {
    ctx.save();
    if (this.selected) {
      ctx.fillStyle = 'rgb(146, 30, 84)';
    }
    ctx.fillRect(40 + (this.position * 15) + this.x, canvasHeight - this.height, 10, this.height);
    ctx.restore();
  }

  moveToPosition() {
    if (((this.position * 15) + this.x) > (this.nextPosition * 15)) {
      this.x -= 1;
      this.moving = true;
    } else if (((this.position * 15) + this.x) < (this.nextPosition * 15)) {
      this.x += 1;
      this.moving = true;
    } else {
      this.position = this.nextPosition;
      this.x = 0;
      this.moving = false;
    }
  }

  static generateCards(numberOfCards = 20) {
    const cards = [];
    for (let i = 0; i <= numberOfCards; i += 1) {
      const height = Math.floor((Math.random() * 60) + 10);
      const card = new Card(i, height);
      cards.push(card);
    }
    return cards;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Card);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sort_animation__ = __webpack_require__(0);


class BubbleSortAnimation extends __WEBPACK_IMPORTED_MODULE_0__sort_animation__["a" /* default */] {
  next(n, isSorted) {
    let sorted = isSorted;
    if (this.cards[n].height < this.cards[n - 1].height) {
      this.swapCard(n, n - 1);
      sorted = false;
    }

    if (n < this.cards.length - 1) {
      window.setTimeout(() => {
        this.animate(() => {
          this.next(n + 1, sorted);
        }, n);
      }, 0);
    } else {
      this.bubbleSort(sorted);
    }
  }
  bubbleSort(isSorted) {
    const sorted = isSorted || false;

    if (!sorted) {
      this.next(1, true);
    } else {
      this.render();
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (BubbleSortAnimation);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sort_animation__ = __webpack_require__(0);


class QuickSortAnimation extends __WEBPACK_IMPORTED_MODULE_0__sort_animation__["a" /* default */] {
  partition(low, high) {
    const pivot = this.cards[high];
    let i = low - 1;
    for (let j = low; j < high; j += 1) {
      if (this.cards[j].height < pivot.height) {
        i += 1;
        this.swapCard(i, j);
      }
    }
    this.swapCard(i + 1, high);
    return (i + 1);
  }

  quickSort(low, high) {
    if (low < high) {
      window.requestAnimationFrame(() => {
        const pivotPos = this.partition(low, high);
        this.animate(() => {
          this.quickSort(low, pivotPos - 1);
          this.quickSort(pivotPos + 1, high);
        }, pivotPos);
      });
    } else {
      console.log('hi');
      this.render();
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (QuickSortAnimation);


/***/ })
/******/ ]);