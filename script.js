'use strict';
//以下都是预先提取html中的原件到javascript里来，简化后续代码
const scoreEl0 = document.getElementById('score--0');
const scoreEl1 = document.getElementById('score--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const diceImg = document.querySelector('.dice');
const playerEl0 = document.querySelector('.player--0');
const playerEl1 = document.querySelector('.player--1');
const currentScoreEl0 = document.getElementById('current--0');
const currentScoerEl1 = document.getElementById('current--1');

//设置变量初始值
let score, currentScore, activePlayer, playing;
// 格式化函数
const init = function () {
  score = [0, 0]; //双方总分初始值都是0，且每刷新一轮游戏就回到0
  currentScore = 0; //用一个变量控制当下数字的和
  activePlayer = 0; //设置初始玩家为0，同时用0来对应score数组的首位元素
  playing = true; //用来控制游戏是否可玩
  scoreEl0.textContent = 0; //设置当前各位玩家持有分数均显示为0
  scoreEl1.textContent = 0;
  currentScoreEl0.textContent = 0;
  currentScoerEl1.textContent = 0;
  diceImg.classList.add('hidden'); //隐藏骰子图标
  playerEl0.classList.remove('player--winner');
  playerEl1.classList.remove('player--winner');
  playerEl0.classList.add('player--active');
  playerEl1.classList.remove('player--active');
};
// 页面首次加载时先格式化
init();
//转换玩家函数
const switchPlayer = function () {
  currentScore = 0; //设置掷到1的玩家的当前分数为0
  document.getElementById(`current--${activePlayer}`).textContent = 0; //并显示为0
  // 然后转换玩家，if（activePlayer===0）activePlayer = 1；else activePlayer = 0
  activePlayer = activePlayer === 0 ? 1 : 0;
  //并用toggle（class名）将两个玩家的画面设计对调显示
  playerEl0.classList.toggle('player--active');
  playerEl1.classList.toggle('player--active');
};

//掷骰子动作
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1; //随机生成1个1～6之间的整数
    diceImg.src = `dice-${dice}.png`; //将生成的数字对应到骰子图片上
    diceImg.classList.remove('hidden'); //并显示目前数字对应的骰子图片

    //掷出骰子后只有数字不是1的情况下才会有分数
    if (dice != 1) {
      currentScore += dice; // 当数字不是1 的情况下，将掷出来的数字加到现有的数字上
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; // 并将画面上的文本显示为相加后的数字
    } else {
      // 当数字是1的时候，当前玩家的分数清零，且转换到另外一位玩家
      switchPlayer();
    }
  }
});

// Hold分数按钮
btnHold.addEventListener('click', function () {
  if (playing) {
    // 将当前玩家的当前分数加到总分上
    score[activePlayer] += currentScore;
    // 然后显示他的总分数，并转换玩家
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    // 如果总分大于或者等于100，就结束游戏
    if (score[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      playing = false;
      // 否则就自动转换玩家
    } else {
      switchPlayer();
    }
  }
});

// reset the game
btnNew.addEventListener('click', init);
