// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict

    // Linear time complexity (n)
    hasRowConflictAt: function(rowIndex) {
      var row = this.get(rowIndex);
      var length = row.length;
      var count = 0;
      for ( var i = 0; i < length; i++ ) {
        count += row[i];
      }
      return count > 1;
    },

    // test if any rows on this board contain conflicts

    //Exponential (n^2)
    hasAnyRowConflicts: function() {
      var size = this.get('n');
      for ( var i = 0; i < size; i++ ) {
        if ( this.hasRowConflictAt(i) ) {
          return true;
        }
      }
      return false;
    },


    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict

    //Linear time complexity (n)
    hasColConflictAt: function(colIndex) {
      var size = this.get('n');
      var count = 0;
      for ( var i = 0; i < size; i++ ) {
        var row = this.get(i);
        count += row[colIndex];
      }
      return count > 1;
    },

    // test if any columns on this board contain conflicts

    // Exponential time complexity (n^2)
    hasAnyColConflicts: function() {
      var size = this.get('n');
      for ( var i = 0; i < size; i++ ) {
        if ( this.hasColConflictAt(i) ) {
          return true;
        }
      }

      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict

    //Linear time complexity (n)
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndex) {
      var size = this.get('n');
      var count = 0;
      var rowIndex = 0;
      var colIndex = majorDiagonalColumnIndex;
      for ( ; rowIndex < size && colIndex < size; rowIndex++, colIndex++ ) {
        if (colIndex >= 0 ) {
          var row = this.get(rowIndex);
          count += row[colIndex];
        }
      }
      return count > 1;
    },

    // test if any major diagonals on this board contain conflicts

    //Exponential time complexity (n^2)
    hasAnyMajorDiagonalConflicts: function() {
      var size = this.get('n');
      for ( var i = 1 - size; i < size; i++ ) {
        if ( this.hasMajorDiagonalConflictAt(i) ) {
          return true;
        }
      }

      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict

    //Linear time complexity (n)
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndex) {
      var size = this.get('n');
      var count = 0;
      var rowIndex = 0;
      var colIdx = minorDiagonalColumnIndex;
      for ( ; rowIndex < size && colIdx >= 0; rowIndex++, colIdx-- ) {
        if ( colIdx < size ) {
          var row = this.get(rowIndex);
          count += row[colIdx];
        }
      }
      return count > 1;
    },

    // test if any minor diagonals on this board contain conflicts

    //Exponential time complexity (n^2)
    hasAnyMinorDiagonalConflicts: function() {
      var size = this.get('n');
      for ( var i = (size * 2) - 1; i >= 0; i-- ) {
        if ( this.hasMinorDiagonalConflictAt(i) ) {
          return true;
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
