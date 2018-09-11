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

window.findNRooksSolution = function(n) {
  // Create board instance
  // For (i = 0; i < row.length; i++)
    // For (j = 0; j < row[i].length; j++)
    // toggle piece at i and j
    // Check for row and col conflicts
        // If conflict
          // toggle piece at row and col
  // Repeat steps 51 - 56
  var board = new Board({n: n});
  // for (var i = 0; i <  board.rows().length; i++) {
  //   for (var j = 0; j < board.rows()[i].length; j++) {
  //     board.togglePiece(i, j);
  //     console.log('before test: ' + JSON.stringify(board.rows()));
  //     if (board.hasAnyColConflicts() || board.hasAnyRowConflicts()) {
  //       board.togglePiece(i, j);
  //       console.log('After test: ' + JSON.stringify(board.rows()));
  //     }
  //   }
  // }
  // console.log('Solution: ' + JSON.stringify(board.rows()));
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  for (var i = 0; i < n; i++) {
    board.togglePiece(i, i);
  }
  var solution = board.rows();
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // How do we store the solution?
  // How do we count the solutions?
  // Create a new board instance
  // Toggle first piece
  // Iterate through the board
  // Toggle piece
  // Repeate 89 & 90 n times
  var board = new Board({n: n});
  var searchSol = function(n, count, total) {
    for (var i = 0; i < n; i++) {
      board.togglePiece(i, i);
      //console.log('Here is what it looks like: ' + JSON.stringify(board.rows()));
    }
    if (n === count) {
      total = count * total;
      //debugger;
      if (n === 0) {
        total = 1;
      }
      return total;
    } else {
      return searchSol(n, count+1, total*count);
    }
  };
  //console.log('Here are the solutions: ' + JSON.stringify(board.rows()));
  var solutionCount = searchSol(n, 1, 1);

  console.log('current board: ' + JSON.stringify(board.rows()));
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // var board = new Board({n: n});
  // for (var i = 0; i <  board.rows().length; i++) {
  //   for (var j = 0; j < board.rows()[i].length; j++) {
  //     board.togglePiece(i, j);
  //     console.log('before test: ' + JSON.stringify(board.rows()));
  //     if (board.hasAnyColConflicts() || board.hasAnyRowConflicts() || board.hasAnyMajorDiagonalConflicts() || board.hasAnyMinorDiagonalConflicts()) {
  //       board.togglePiece(i, j);
  //       console.log('After test: ' + JSON.stringify(board.rows()));
  //     }
  //   }
  // }
  // var solution = board.rows(); //fixme

  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  // return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
