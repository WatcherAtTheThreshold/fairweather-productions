// Enhanced floating particles system
const container = document.getElementById('particles');
const colors = ['golden', 'purple', 'silver'];

for (let i = 0; i < 60; i++) {
    const particle = document.createElement('div');
    particle.className = `particle ${colors[Math.floor(Math.random() * colors.length)]}`;
    
    // Random size between 1px and 6px
    const size = Math.random() * 5 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random horizontal position
    particle.style.left = Math.random() * 100 + '%';
    
    // Random animation delay
    particle.style.animationDelay = Math.random() * 30 + 's';
    
    // Random animation duration between 20-40 seconds
    particle.style.animationDuration = (Math.random() * 20 + 20) + 's';
    
    // Random horizontal drift
    particle.style.setProperty('--drift', (Math.random() - 0.5) * 200 + 'px');
    
    container.appendChild(particle);
}

// Enhanced parallax effect for mist
let ticking = false;
function updateParallax() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;
    document.querySelector('.mist-overlay').style.transform = `translateY(${rate}px)`;
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);

// Game overlay functions
function showOverlay(text, className = '', duration = 3000) {
    const overlay = document.getElementById('gameOverlay');
    const overlayText = document.getElementById('overlayText');
    
    overlayText.textContent = text;
    overlayText.className = `overlay-text ${className}`;
    overlay.classList.add('show');
    
    if (duration > 0) {
        setTimeout(() => {
            overlay.classList.remove('show');
        }, duration);
    }
}

function hideOverlay() {
    const overlay = document.getElementById('gameOverlay');
    overlay.classList.remove('show');
}

function createCheckmateExplosion() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // Create 40-60 massive explosion particles
    const numParticles = Math.random() * 21 + 40;
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'checkmate-particle';
        
        // Very large particles
        const size = Math.random() * 25 + 15;
        const colors = [
            'rgba(233, 30, 99, 1)', 
            'rgba(255, 87, 34, 1)', 
            'rgba(138, 43, 226, 1)',
            'rgba(255, 215, 0, 1)',
            'rgba(255, 69, 0, 1)',
            'rgba(220, 20, 60, 1)',
            'rgba(255, 255, 255, 1)'
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Random direction for explosion
        const angle = (Math.PI * 2 * i) / numParticles + (Math.random() - 0.5) * 0.5;
        const distance = Math.random() * 300 + 200;
        
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.background = `radial-gradient(circle, ${color}, rgba(255,255,255,0.5))`;
        particle.style.position = 'fixed';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.boxShadow = `0 0 30px ${color}, 0 0 60px ${color}, 0 0 90px ${color}`;
        particle.style.zIndex = '999';
        
        // Add explosion movement
        particle.style.setProperty('--final-x', Math.cos(angle) * distance + 'px');
        particle.style.setProperty('--final-y', Math.sin(angle) * distance + 'px');
        
        document.body.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 3000);
    }
}

// Back to top functionality
const topButton = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        topButton.classList.add('show');
    } else {
        topButton.classList.remove('show');
    }
});

topButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Mobile menu functionality
const mobileMenuButton = document.getElementById('mobileMenuButton');
const navLinks = document.getElementById('navLinks');

mobileMenuButton.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    
    // Update button text and icon
    if (navLinks.classList.contains('open')) {
        mobileMenuButton.textContent = '✕ Close';
    } else {
        mobileMenuButton.textContent = '☰ Menu';
    }
});

// Close mobile menu when clicking on a link
navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        navLinks.classList.remove('open');
        mobileMenuButton.textContent = '☰ Menu';
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav')) {
        navLinks.classList.remove('open');
        mobileMenuButton.textContent = '☰ Menu';
    }
});

class ChessGame {
    constructor() {
        this.board = this.initializeBoard();
        this.currentPlayer = 'white';
        this.selectedSquare = null;
        this.gameOver = false;
        this.moveHistory = [];
        this.lastAIMove = null; // Track last AI move for highlighting
        this.enPassantTarget = null;
        this.castlingRights = {
            white: { kingside: true, queenside: true },
            black: { kingside: true, queenside: true }
        };
        this.halfMoveClock = 0;
        this.fullMoveNumber = 1;
        this.gameStarted = false;
        
        this.pieces = {
            white: {
                king: '♔', queen: '♕', rook: '♖', 
                bishop: '♗', knight: '♘', pawn: '♙'
            },
            black: {
                king: '♚', queen: '♛', rook: '♜', 
                bishop: '♝', knight: '♞', pawn: '♟'
            }
        };
        
        // Piece names for descriptive notation
        this.pieceNames = {
            king: 'King', queen: 'Queen', rook: 'Rook',
            bishop: 'Bishop', knight: 'Knight', pawn: 'Pawn'
        };
        
        this.createBoard();
        this.updateDisplay();
        this.updateMoveHistory();
        
        // Initialize button states
        setTimeout(() => {
            const showLastMoveBtn = document.getElementById('showLastMoveBtn');
            if (showLastMoveBtn) {
                showLastMoveBtn.disabled = true;
            }
            // Show "Begin Game" overlay
            showOverlay('Begin Game', 'begin', 2500);
        }, 500);
    }
    
    initializeBoard() {
        const board = Array(8).fill(null).map(() => Array(8).fill(null));
        
        // Place pieces in starting positions
        const backRow = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
        
        for (let col = 0; col < 8; col++) {
            board[0][col] = { type: backRow[col], color: 'black' };
            board[1][col] = { type: 'pawn', color: 'black' };
            board[6][col] = { type: 'pawn', color: 'white' };
            board[7][col] = { type: backRow[col], color: 'white' };
        }
        
        return board;
    }
    
    createBoard() {
        const boardElement = document.getElementById('chessBoard');
        boardElement.innerHTML = '';
        
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                square.className = `square ${(row + col) % 2 === 0 ? 'light' : 'dark'}`;
                square.dataset.row = row;
                square.dataset.col = col;
                square.addEventListener('click', (e) => this.handleSquareClick(row, col));
                boardElement.appendChild(square);
            }
        }
    }
    
    updateDisplay() {
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {
            const row = parseInt(square.dataset.row);
            const col = parseInt(square.dataset.col);
            const piece = this.board[row][col];
            
            square.innerHTML = '';
            square.className = `square ${(row + col) % 2 === 0 ? 'light' : 'dark'}`;
            
            if (piece) {
                const pieceElement = document.createElement('span');
                pieceElement.className = `piece ${piece.color}`;
                pieceElement.textContent = this.pieces[piece.color][piece.type];
                square.appendChild(pieceElement);
            }
        });
        
        this.updateGameStatus();
    }
    
    updateGameStatus() {
        const statusElement = document.getElementById('gameStatus');
        
        if (this.gameOver) {
            if (this.isCheckmate(this.currentPlayer)) {
                statusElement.textContent = `Checkmate! ${this.currentPlayer === 'white' ? 'Black' : 'White'} wins!`;
                // Create massive explosion first, then show checkmate text
                createCheckmateExplosion();
                setTimeout(() => {
                    showOverlay('Checkmate', 'checkmate', 3000); // 3 seconds to match CSS animation
                }, 1500);
            } else if (this.isStalemate(this.currentPlayer)) {
                statusElement.textContent = 'Stalemate! Draw!';
                showOverlay('Stalemate', 'checkmate', 3000);
            }
        } else if (this.isInCheck(this.currentPlayer)) {
            statusElement.textContent = `${this.currentPlayer === 'white' ? 'White' : 'Black'} is in check!`;
            this.highlightKingInCheck();
            // Show dramatic "Check" overlay
            showOverlay('Check', 'check', 1800); // 0.6s * 3 pulses = 1.8s
        } else {
            statusElement.textContent = `${this.currentPlayer === 'white' ? 'White' : 'Black'} to move`;
        }
    }
    
    highlightKingInCheck() {
        const kingPosition = this.findKing(this.currentPlayer);
        if (kingPosition) {
            const square = document.querySelector(`[data-row="${kingPosition.row}"][data-col="${kingPosition.col}"]`);
            square.classList.add('check');
        }
    }
    
    handleSquareClick(row, col) {
        if (this.gameOver || this.currentPlayer === 'black') return;
        
        // Clear previous highlights
        document.querySelectorAll('.square').forEach(sq => {
            sq.classList.remove('selected', 'valid-move', 'check');
        });
        
        const piece = this.board[row][col];
        
        if (this.selectedSquare) {
            const selectedRow = this.selectedSquare.row;
            const selectedCol = this.selectedSquare.col;
            
            if (row === selectedRow && col === selectedCol) {
                // Deselect current square
                this.selectedSquare = null;
                this.updateDisplay();
                return;
            }
            
            if (this.isValidMove(selectedRow, selectedCol, row, col)) {
                this.makeMove(selectedRow, selectedCol, row, col);
                this.selectedSquare = null;
                
                // Check for game over
                if (this.isCheckmate('black')) {
                    this.gameOver = true;
                } else if (this.isStalemate('black')) {
                    this.gameOver = true;
                } else {
                    // AI move
                    setTimeout(() => this.makeAIMove(), 500);
                }
                
                this.updateDisplay();
                return;
            }
        }
        
        if (piece && piece.color === this.currentPlayer) {
            this.selectedSquare = { row, col };
            const square = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            square.classList.add('selected');
            
            // Highlight valid moves
            this.highlightValidMoves(row, col);
        }
    }
    
    highlightValidMoves(row, col) {
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                if (this.isValidMove(row, col, r, c)) {
                    const square = document.querySelector(`[data-row="${r}"][data-col="${c}"]`);
                    square.classList.add('valid-move');
                }
            }
        }
    }
    
    isValidMove(fromRow, fromCol, toRow, toCol) {
        const piece = this.board[fromRow][fromCol];
        if (!piece || piece.color !== this.currentPlayer) return false;
        
        // Check if move is within board
        if (toRow < 0 || toRow >= 8 || toCol < 0 || toCol >= 8) return false;
        
        // Check if target square has same color piece
        const targetPiece = this.board[toRow][toCol];
        if (targetPiece && targetPiece.color === piece.color) return false;
        
        // Check piece-specific movement rules
        if (!this.isPieceMovementValid(piece, fromRow, fromCol, toRow, toCol)) return false;
        
        // Check if move would put own king in check
        const tempBoard = this.copyBoard();
        this.board[toRow][toCol] = piece;
        this.board[fromRow][fromCol] = null;
        
        const wouldBeInCheck = this.isInCheck(piece.color);
        
        this.board = tempBoard;
        
        return !wouldBeInCheck;
    }
    
    isPieceMovementValid(piece, fromRow, fromCol, toRow, toCol) {
        const rowDiff = toRow - fromRow;
        const colDiff = toCol - fromCol;
        const absRowDiff = Math.abs(rowDiff);
        const absColDiff = Math.abs(colDiff);
        
        switch (piece.type) {
            case 'pawn':
                return this.isValidPawnMove(piece, fromRow, fromCol, toRow, toCol);
            case 'rook':
                return (rowDiff === 0 || colDiff === 0) && this.isPathClear(fromRow, fromCol, toRow, toCol);
            case 'bishop':
                return absRowDiff === absColDiff && this.isPathClear(fromRow, fromCol, toRow, toCol);
            case 'queen':
                return ((rowDiff === 0 || colDiff === 0) || (absRowDiff === absColDiff)) && 
                       this.isPathClear(fromRow, fromCol, toRow, toCol);
            case 'knight':
                return (absRowDiff === 2 && absColDiff === 1) || (absRowDiff === 1 && absColDiff === 2);
            case 'king':
                return absRowDiff <= 1 && absColDiff <= 1;
            default:
                return false;
        }
    }
    
    isValidPawnMove(piece, fromRow, fromCol, toRow, toCol) {
        const direction = piece.color === 'white' ? -1 : 1;
        const startRow = piece.color === 'white' ? 6 : 1;
        const rowDiff = toRow - fromRow;
        const colDiff = Math.abs(toCol - fromCol);
        
        // Moving forward
        if (colDiff === 0) {
            if (rowDiff === direction && !this.board[toRow][toCol]) return true;
            if (fromRow === startRow && rowDiff === 2 * direction && !this.board[toRow][toCol]) return true;
        }
        
        // Capturing
        if (colDiff === 1 && rowDiff === direction) {
            if (this.board[toRow][toCol]) return true;
            // En passant
            if (this.enPassantTarget && 
                this.enPassantTarget.row === toRow && 
                this.enPassantTarget.col === toCol) return true;
        }
        
        return false;
    }
    
    isPathClear(fromRow, fromCol, toRow, toCol) {
        const rowStep = toRow === fromRow ? 0 : (toRow > fromRow ? 1 : -1);
        const colStep = toCol === fromCol ? 0 : (toCol > fromCol ? 1 : -1);
        
        let currentRow = fromRow + rowStep;
        let currentCol = fromCol + colStep;
        
        while (currentRow !== toRow || currentCol !== toCol) {
            if (this.board[currentRow][currentCol]) return false;
            currentRow += rowStep;
            currentCol += colStep;
        }
        
        return true;
    }
    
    makeMove(fromRow, fromCol, toRow, toCol) {
        const piece = this.board[fromRow][fromCol];
        const capturedPiece = this.board[toRow][toCol];
        
        // Create particle effects
        if (capturedPiece) {
            this.createCaptureParticles(toRow, toCol);
        } else {
            this.createMoveParticles(toRow, toCol);
        }
        
        // Handle en passant capture
        if (piece.type === 'pawn' && this.enPassantTarget && 
            toRow === this.enPassantTarget.row && toCol === this.enPassantTarget.col) {
            this.board[fromRow][toCol] = null;
            // En passant is also a capture, create particles
            this.createCaptureParticles(fromRow, toCol);
        }
        
        // Move piece
        this.board[toRow][toCol] = piece;
        this.board[fromRow][fromCol] = null;
        
        // Handle pawn promotion
        if (piece.type === 'pawn' && (toRow === 0 || toRow === 7)) {
            this.board[toRow][toCol] = { type: 'queen', color: piece.color };
            // Pawn promotion gets extra sparkles!
            setTimeout(() => this.createMoveParticles(toRow, toCol), 200);
        }
        
        // Set en passant target
        this.enPassantTarget = null;
        if (piece.type === 'pawn' && Math.abs(toRow - fromRow) === 2) {
            this.enPassantTarget = { row: fromRow + (toRow - fromRow) / 2, col: toCol };
        }
        
        // Update move counters
        if (piece.type === 'pawn' || capturedPiece) {
            this.halfMoveClock = 0;
        } else {
            this.halfMoveClock++;
        }
        
        if (this.currentPlayer === 'black') {
            this.fullMoveNumber++;
        }
        
        // Record move with descriptive notation
        let moveNotation = this.getDescriptiveNotation(piece, fromRow, fromCol, toRow, toCol, capturedPiece);
        
        // Switch players first to check the opponent's status
        this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
        
        // Add chess conditions (check, checkmate, etc.) after player switch
        moveNotation = this.addMoveConditions(moveNotation, piece);
        
        // Store the move in history
        this.moveHistory.push({
            from: { row: fromRow, col: fromCol },
            to: { row: toRow, col: toCol },
            piece: piece,
            captured: capturedPiece,
            notation: moveNotation,
            moveNumber: this.fullMoveNumber,
            player: piece.color
        });
        
        // Update move history display if it's a player move
        if (piece.color === 'white') {
            this.updateMoveHistory();
        }
    }
    
    isInCheck(color) {
        const kingPosition = this.findKing(color);
        if (!kingPosition) return false;
        
        const opponentColor = color === 'white' ? 'black' : 'white';
        
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.board[row][col];
                if (piece && piece.color === opponentColor) {
                    if (this.isPieceMovementValid(piece, row, col, kingPosition.row, kingPosition.col)) {
                        return true;
                    }
                }
            }
        }
        
        return false;
    }
    
    findKing(color) {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.board[row][col];
                if (piece && piece.type === 'king' && piece.color === color) {
                    return { row, col };
                }
            }
        }
        return null;
    }
    
    isCheckmate(color) {
        if (!this.isInCheck(color)) return false;
        return this.getAllValidMoves(color).length === 0;
    }
    
    isStalemate(color) {
        if (this.isInCheck(color)) return false;
        return this.getAllValidMoves(color).length === 0;
    }
    
    getAllValidMoves(color) {
        const moves = [];
        
        for (let fromRow = 0; fromRow < 8; fromRow++) {
            for (let fromCol = 0; fromCol < 8; fromCol++) {
                const piece = this.board[fromRow][fromCol];
                if (piece && piece.color === color) {
                    for (let toRow = 0; toRow < 8; toRow++) {
                        for (let toCol = 0; toCol < 8; toCol++) {
                            if (this.isValidMove(fromRow, fromCol, toRow, toCol)) {
                                moves.push({ from: { row: fromRow, col: fromCol }, to: { row: toRow, col: toCol } });
                            }
                        }
                    }
                }
            }
        }
        
        return moves;
    }
    
    makeAIMove() {
        if (this.gameOver || this.currentPlayer !== 'black') return;
        
        const moves = this.getAllValidMoves('black');
        if (moves.length === 0) {
            this.gameOver = true;
            this.updateDisplay();
            return;
        }
        
        // AI "thinking" delay - varies based on move complexity
        const thinkingTime = Math.random() * 1500 + 800; // 800-2300ms
        
        // Show AI is thinking
        const statusElement = document.getElementById('gameStatus');
        statusElement.textContent = "AI is thinking...";
        
        setTimeout(() => {
            // Simple AI: random move with slight preference for captures
            let bestMove = moves[0];
            let bestScore = -1000;
            
            for (const move of moves) {
                let score = Math.random() * 10;
                
                // Prefer captures
                if (this.board[move.to.row][move.to.col]) {
                    score += 50;
                }
                
                // Prefer center control
                if ((move.to.row >= 3 && move.to.row <= 4) && (move.to.col >= 3 && move.to.col <= 4)) {
                    score += 10;
                }
                
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = move;
                }
            }
            
            // Store this move as the last AI move
            this.lastAIMove = {
                from: { row: bestMove.from.row, col: bestMove.from.col },
                to: { row: bestMove.to.row, col: bestMove.to.col }
            };
            
            // Clear any existing highlights
            document.querySelectorAll('.square').forEach(sq => {
                sq.classList.remove('ai-from', 'ai-to');
            });
            
            // Make the move
            this.makeMove(bestMove.from.row, bestMove.from.col, bestMove.to.row, bestMove.to.col);
            
            // Highlight AI's move
            const fromSquare = document.querySelector(`[data-row="${bestMove.from.row}"][data-col="${bestMove.from.col}"]`);
            const toSquare = document.querySelector(`[data-row="${bestMove.to.row}"][data-col="${bestMove.to.col}"]`);
            
            if (fromSquare) fromSquare.classList.add('ai-from');
            if (toSquare) toSquare.classList.add('ai-to');
            
            // Remove highlights after animation
            setTimeout(() => {
                if (fromSquare) fromSquare.classList.remove('ai-from');
                if (toSquare) toSquare.classList.remove('ai-to');
            }, 2000);
            
            // Enable the show last move button
            document.getElementById('showLastMoveBtn').disabled = false;
            
            // Check for game over
            if (this.isCheckmate('white')) {
                this.gameOver = true;
            } else if (this.isStalemate('white')) {
                this.gameOver = true;
            }
            
            this.updateDisplay();
            this.updateMoveHistory();
        }, thinkingTime);
    }
    
    copyBoard() {
        return this.board.map(row => row.map(piece => piece ? { ...piece } : null));
    }
    
    coordinateToAlgebraic(row, col) {
        const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
        return files[col] + ranks[row];
    }
    
    // Enhanced descriptive notation function with chess terminology
    getDescriptiveNotation(piece, fromRow, fromCol, toRow, toCol, capturedPiece) {
        const colorName = piece.color === 'white' ? 'White' : 'Black';
        const pieceName = this.pieceNames[piece.type];
        const toSquare = this.coordinateToAlgebraic(toRow, toCol);
        
        let notation = `${colorName} ${pieceName} moves to ${toSquare}`;
        
        // Add capture information
        if (capturedPiece) {
            const capturedColorName = capturedPiece.color === 'white' ? 'White' : 'Black';
            const capturedPieceName = this.pieceNames[capturedPiece.type];
            notation += ` and takes ${capturedColorName} ${capturedPieceName}`;
        }
        
        // Handle en passant
        if (piece.type === 'pawn' && this.enPassantTarget && 
            toRow === this.enPassantTarget.row && toCol === this.enPassantTarget.col) {
            notation += ' (en passant)';
        }
        
        // Handle pawn promotion
        if (piece.type === 'pawn' && (toRow === 0 || toRow === 7)) {
            notation += ' and promotes to Queen';
        }
        
        // Handle castling
        if (piece.type === 'king' && Math.abs(toCol - fromCol) === 2) {
            if (toCol > fromCol) {
                notation = `${colorName} castles kingside`;
            } else {
                notation = `${colorName} castles queenside`;
            }
        }
        
        return notation;
    }
    
    // Check for special move conditions after a move is made
    addMoveConditions(notation, piece) {
        const opponentColor = piece.color === 'white' ? 'black' : 'white';
        
        // Check for checkmate
        if (this.isCheckmate(opponentColor)) {
            notation += ' - Checkmate!';
            return notation;
        }
        
        // Check for stalemate
        if (this.isStalemate(opponentColor)) {
            notation += ' - Stalemate!';
            return notation;
        }
        
        // Check for check
        if (this.isInCheck(opponentColor)) {
            notation += ' - Check!';
        }
        
        return notation;
    }
    
    updateMoveHistory() {
        const historyElement = document.getElementById('moveHistory');
        if (this.moveHistory.length === 0) {
            historyElement.innerHTML = '<p><em>Move history will appear here...</em></p>';
            return;
        }
        
        let historyHTML = '<div style="font-family: \'Source Sans Pro\', sans-serif; line-height: 1.8; font-size: 0.9rem;">';
        
        for (let i = 0; i < this.moveHistory.length; i++) {
            const move = this.moveHistory[i];
            const moveNumber = Math.floor(i / 2) + 1;
            
            // Show move number for white moves or single moves
            if (move.player === 'white' || i === this.moveHistory.length - 1) {
                historyHTML += `<div style="margin-bottom: 0.5rem; padding: 0.3rem; background: rgba(255,255,255,0.05); border-radius: 4px; border-left: 3px solid ${move.player === 'white' ? 'rgba(222,184,135,0.6)' : 'rgba(138,43,226,0.6)'};">`;
                historyHTML += `<span style="color: rgba(255,255,255,0.5); font-weight: bold; margin-right: 0.5rem;">${moveNumber}.</span>`;
                historyHTML += `<span style="color: ${move.player === 'white' ? 'rgba(255,255,255,0.9)' : 'rgba(138,43,226,1)'};">${move.notation}</span>`;
                historyHTML += `</div>`;
            }
        }
        
        historyHTML += '</div>';
        historyElement.innerHTML = historyHTML;
        
        // Auto-scroll to bottom
        historyElement.scrollTop = historyElement.scrollHeight;
    }
    
    createMoveParticles(row, col) {
        const square = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        if (!square) return;
        
        const rect = square.getBoundingClientRect();
        const boardRect = document.getElementById('chessBoard').getBoundingClientRect();
        
        // Position relative to the exact center of the square
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Create 6-8 sparkle particles (more than before)
        const numParticles = Math.random() * 3 + 6;
        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('div');
            particle.className = 'move-particle';
            
            // Larger size and more vibrant colors
            const size = Math.random() * 8 + 6;
            const colors = [
                'rgba(138, 43, 226, 1)', 
                'rgba(222, 184, 135, 1)', 
                'rgba(255, 255, 255, 1)',
                'rgba(46, 204, 113, 0.9)'
            ];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.background = `radial-gradient(circle, ${color}, rgba(255,255,255,0.3))`;
            particle.style.position = 'fixed';
            particle.style.left = (centerX + (Math.random() - 0.5) * 20) + 'px';
            particle.style.top = (centerY + (Math.random() - 0.5) * 20) + 'px';
            particle.style.boxShadow = `0 0 15px ${color}, 0 0 30px ${color}`;
            particle.style.zIndex = '100';
            
            document.body.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 1000);
        }
    }
    
    createCaptureParticles(row, col) {
        const square = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        if (!square) return;
        
        const rect = square.getBoundingClientRect();
        const boardRect = document.getElementById('chessBoard').getBoundingClientRect();
        
        // Position relative to the exact center of the square
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Create 12-16 dramatic burst particles (much more!)
        const numParticles = Math.random() * 5 + 12;
        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('div');
            particle.className = 'capture-particle';
            
            // Much larger size and more dramatic colors
            const size = Math.random() * 12 + 8;
            const colors = [
                'rgba(231, 76, 60, 1)', 
                'rgba(138, 43, 226, 1)', 
                'rgba(241, 196, 15, 1)',
                'rgba(255, 69, 0, 1)',
                'rgba(220, 20, 60, 1)'
            ];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.background = `radial-gradient(circle, ${color}, rgba(255,255,255,0.4))`;
            particle.style.position = 'fixed';
            particle.style.left = (centerX + (Math.random() - 0.5) * 30) + 'px';
            particle.style.top = (centerY + (Math.random() - 0.5) * 30) + 'px';
            particle.style.boxShadow = `0 0 20px ${color}, 0 0 40px ${color}, 0 0 60px ${color}`;
            particle.style.zIndex = '100';
            
            document.body.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 1500);
        }
    }
}

let game;

function newGame() {
    // Hide any existing overlays
    hideOverlay();
    
    game = new ChessGame();
    // Clear move history display
    document.getElementById('moveHistory').innerHTML = '<p><em>Move history will appear here...</em></p>';
    // Disable show last move button for new game
    document.getElementById('showLastMoveBtn').disabled = true;
}

function undoMove() {
    if (game.moveHistory.length >= 2) {
        // Undo last two moves (player + AI)
        for (let i = 0; i < 2; i++) {
            const lastMove = game.moveHistory.pop();
            if (lastMove) {
                game.board[lastMove.from.row][lastMove.from.col] = lastMove.piece;
                game.board[lastMove.to.row][lastMove.to.col] = lastMove.captured;
                game.currentPlayer = game.currentPlayer === 'white' ? 'black' : 'white';
            }
        }
        
        // Clear the last AI move since we undid it
        game.lastAIMove = null;
        document.getElementById('showLastMoveBtn').disabled = true;
        
        game.updateDisplay();
        game.updateMoveHistory();
    }
}

function showLastAIMove() {
    if (!game.lastAIMove) return;
    
    // Clear any existing highlights
    document.querySelectorAll('.square').forEach(sq => {
        sq.classList.remove('ai-from', 'ai-to', 'selected', 'valid-move');
    });
    
    // Highlight the last AI move
    const fromSquare = document.querySelector(`[data-row="${game.lastAIMove.from.row}"][data-col="${game.lastAIMove.from.col}"]`);
    const toSquare = document.querySelector(`[data-row="${game.lastAIMove.to.row}"][data-col="${game.lastAIMove.to.col}"]`);
    
    if (fromSquare) fromSquare.classList.add('ai-from');
    if (toSquare) toSquare.classList.add('ai-to');
    
    // Remove highlights after animation
    setTimeout(() => {
        if (fromSquare) fromSquare.classList.remove('ai-from');
        if (toSquare) toSquare.classList.remove('ai-to');
    }, 2000);
}

// Initialize game
newGame();

// Music control functions
let musicPlaying = false;
const chessMusic = document.getElementById('chessMusic');
const musicToggle = document.getElementById('musicToggle');

function toggleMusic() {
    if (musicPlaying) {
        chessMusic.pause();
        musicToggle.textContent = '🎵 Play Mystic Chess Music';
        musicToggle.classList.remove('playing');
        musicPlaying = false;
    } else {
        chessMusic.play().then(() => {
            musicToggle.textContent = '🎵 Pause Music';
            musicToggle.classList.add('playing');
            musicPlaying = true;
        }).catch(error => {
            console.log('Could not play audio:', error);
            musicToggle.textContent = '🎵 Music Unavailable';
        });
    }
}

function setVolume(value) {
    chessMusic.volume = value / 100;
}

// Set initial volume
if (chessMusic) {
    chessMusic.volume = 0.3; // 30% volume by default
}
