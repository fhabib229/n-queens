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

var checkForRookConflicts = function(board, arr, firstRow, row, col) {
  var result;
  var firstRow = row;
  board.togglePiece(row, col);
  console.log(board.rows());
  for (var i = 0; i < arr.length; i++) {
    if (!board.hasAnyRowConflicts() && !board.hasAnyColConflicts()) {
      firstRow++;
      col++;
      board.togglePiece(firstRow, col);
      console.log(board.rows());
      console.log('First row: ' + firstRow + ', row: ' + row + ', col: ' + col);
      checkForRookConflicts(board, arr, firstRow, row, col);
      // result = checkForRookConflicts(board, firstRow, row, col);
      // if (result) {
      //   return result;
      // }
    }
  }
  // board.togglePiece(row+1, col);
  // for (var i = 0; i < row; i++) {
  //   board.togglePiece(firstrow,i);
  //   if (board.hasAnyColConflicts && board.hasAnyRowConflicts) {
  //     var result = checkForConflicts(board, firstrow+1, rows)
  //   }
  //   if ( result ) { return;}
  //   if (!board.hasAnyRowConflicts() && !board.hasAnyColConflicts()) {
  //     board.togglePiece(i, i);
  //   } else {

  //   }
};

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
  for (var i = 0; i <  board.rows().length; i++) {
    for (var j = 0; j < board.rows()[i].length; j++) {
      board.togglePiece(i, j);
      console.log('before test: ' + JSON.stringify(board.rows()));
      if (board.hasAnyColConflicts() || board.hasAnyRowConflicts()) {
        board.togglePiece(i, j);
        console.log('After test: ' + JSON.stringify(board.rows()));
      }
    }
  }
  var solution =  board.rows();
  console.log('Solution: ' + JSON.stringify(board.rows()));


  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  for (var i = 0; i <  board.rows().length; i++) {
    for (var j = 0; j < board.rows()[i].length; j++) {
      board.togglePiece(i, j);
      console.log('before test: ' + JSON.stringify(board.rows()));
      if (board.hasAnyColConflicts() || board.hasAnyRowConflicts() || board.hasAnyMajorDiagonalConflicts() || board.hasAnyMinorDiagonalConflicts()) {
        board.togglePiece(i, j);
        console.log('After test: ' + JSON.stringify(board.rows()));
      }
    }
  }
  var solution = board.rows(); //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
