/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

// Exponential time complexity (n^2)
window.findNRooksSolution = function(n) {
  var board = new Board({n: n});
  var solution = board.rows();
  var searchForRooks = function(row) {
    if (row === n) {
      return board.rows();
    }

    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if (!board.hasAnyRooksConflicts()) {
        var result = searchForRooks(row + 1);
        if (result) {
          return board.rows();
        }
      }
      board.togglePiece(row, i);
    }
  };
  searchForRooks(0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other

// Exponential time complexity (n^2)
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});
  var searchSol = function(row) {
    if (n === row) {
      solutionCount++;
      return;
    } else {
      for (var i = 0; i < n; i++) {
        board.togglePiece(row, i);
        if (!board.hasAnyRooksConflicts()) {
          searchSol(row + 1);
        }
        board.togglePiece(row, i);
      }
    }
  };
  searchSol(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other

// Exponential time complexity (n^2)
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  var solution = board.rows();
  var searchForQueens = function(row) {
    if (row === n) {
      return board.rows();
    }

    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if (!board.hasAnyQueensConflicts()) {
        var result = searchForQueens(row + 1);
        if (result) {
          return board.rows();
        }
      }
      board.togglePiece(row, i);
    }
  };
  searchForQueens(0);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other

// Exponential time complexity (n^2)
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});
  var searchSol = function(row) {
    if (n === row) {
      solutionCount++;
      return;
    } else {
      for (var i = 0; i < n; i++) {
        board.togglePiece(row, i);
        if (!board.hasAnyQueensConflicts()) {
          searchSol(row + 1);
        }
        board.togglePiece(row, i);
      }
    }
  };
  searchSol(0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
