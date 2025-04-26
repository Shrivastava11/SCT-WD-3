let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = false;
let vsComputer = false;

function startGame(mode) {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  vsComputer = (mode === 'computer');
  document.getElementById('status').textContent = `Player ${currentPlayer}'s turn`;
  document.getElementById('reset').classList.remove('hidden');
  renderBoard();
}

function renderBoard() {
  const boardDiv = document.getElementById('board');
  boardDiv.innerHTML = '';
  board.forEach((cell, i) => {
    const cellDiv = document.createElement('div');
    cellDiv.classList.add('cell');
    cellDiv.textContent = cell;
    cellDiv.addEventListener('click', () => handleClick(i));
    boardDiv.appendChild(cellDiv);
  });
}

function handleClick(index) {
  if (!gameActive || board[index] !== '') return;

  board[index] = currentPlayer;
  renderBoard();

  if (checkWinner()) {
    document.getElementById('status').textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (board.every(cell => cell !== '')) {
    document.getElementById('status').textContent = 'It\'s a tie!';
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  document.getElementById('status').textContent = `Player ${currentPlayer}'s turn`;

  if (vsComputer && currentPlayer === 'O') {
    setTimeout(computerMove, 500);
  }
}

function computerMove() {
  let available = board.map((v, i) => v === '' ? i : null).filter(v => v !== null);
  let move = available[Math.floor(Math.random() * available.length)];
  handleClick(move);
}

function checkWinner() {
  const wins = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  return wins.some(comb => {
    const [a, b, c] = comb;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function resetGame() {
  startGame(vsComputer ? 'computer' : 'player');
}
