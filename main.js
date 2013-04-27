;var githubOfLife = function(){
  // Get columns etc. from the dom
  var columns = $('#calendar-graph').find('g>g');
  var numCols = columns.length -2; //Ignore first and last columns
  var numRows = 7; // 7 days of week
  var COLOURS = {
    dead: '#eeeeee',
    fourth: '#d6e685',
    third: '#8cc665',
    second: '#44a340',
    first: '#1e6823'
  };


  /**
   * The compass directions relative to a cell.
   * @type {Array}
   */
  var dirs = [[-1,-1],[0,-1],[+1,-1],[-1,0],[+1,0],[-1,+1],[0,+1],[+1,+1]];
  //             NW      N      NE      W      E       SW      S      SE

  /**
   * Gets a column of rects (dom objects)
   * @param  {Number} i         A column number
   * @return {HTMLRectElement}
   */
  var getColumn = function(i){
    return columns[i+1];
  };

  /**
   * Gets a rectangle using the coordinates
   * @param  {Number} i The row number
   * @param  {Number} j The col number
   * @return {HTMLRectElement}
   */
  var getRect = function(i, j){
    var rect = $(getColumn(i)).children('rect')[j];
    if(rect != undefined){
      rect.row = i;
      rect.col = j;
    }
    return rect;
  };

  /**
   * Returns the colour string of a rect
   * @param  {Number|HTMLRectElement} [i] The row number. If j is undefined, this is treated as an actual rect.
   * @param  {Number} j   The col number
   * @return {String}
   */
  var getRectColor = function(i,j){
    return j!= undefined ? $(getRect(i,j)).css('fill') : $(i).css('fill');
  };

  /**
   * Sets the colour of a rectangle
   * @param {HTMLRectElement} rect   The rectangle
   * @param {String} colour The colour we want to set it to
   */
  var setRect = function(rect, colour){
    $(rect).css('fill',colour);
  };

  /**
   * Sets the colour of the rectangle specified by coords
   * @param  {Number} i      The row number
   * @param  {Number} j      The col number
   * @param  {String} colour The colour we want to set the rect to
   */
  var getSetRect = function(i,j,colour){
    setRect(getRect(i,j), colour);
  };

  /**
   * Checks if the rect is alive (using it's colour)
   * @param  {Number}  i The col number
   * @param  {Number}  [j] The row number
   * @return {Boolean}   If the colour matches the dead color
   */
  var isAlive = function(i,j){
    return getRectColor(i,j) != COLOURS.dead;
  };

  /**
   * Sets the colour of a rect to the dead colour
   * @param  {Number|HTMLRectElement} i The row number / rect
   * @param  {Number} [j] The col number
   */
  var killRect = function(i,j){
    if(j!= undefined){
      getSetRect(i,j,COLOURS.dead);
    } else {
      setRect(i, COLOURS.dead);
    }
  };

  /**
   * Gets the the neighbours of a rect
   * @param  {Number} i The row number
   * @param  {Number} j The col number
   * @return {Array}    An array of rects that are the neighbours
   */
  var getNeighbours = function(i,j){
    var dir;
    var neighbours = [];
    for(dir in dirs){
      var rect = getRect(i+dirs[dir][0],j+dirs[dir][1]);
      if(rect!=undefined){
        neighbours.push(rect);
      }
    }
    return neighbours;
  };

  var getAliveNeighbours = function(i,j, neighbours){
    var aliveNeighbours = [];
    neighbours = neighbours || getNeighbours(i,j);
    $.each(neighbours, function(index, neighbour){
      if(isAlive(neighbour)){
        aliveNeighbours.push(neighbour);
      }
    });
    return aliveNeighbours;
  };

  var nextStep = function(){
    /*
     For a space that is 'populated':
       Each cell with one or no neighbors dies, as if by loneliness.
       Each cell with four or more neighbors dies, as if by overpopulation.
       Each cell with two or three neighbors survives.
     For a space that is 'empty' or 'unpopulated'
       Each cell with three neighbors becomes populated.
     */
    for(var i = 0; i<numCols; i++){
      for(var j = 0; j<numCols; j++){
        var rect = getRect(i,j);
        var neighbours = getNeighbours(i,j);
        var aliveNeighbours = getAliveNeighbours(i, j, neighbours);
        var numAliveNeighbours = aliveNeighbours.length;
        if(isAlive(rect) && (numAliveNeighbours <= 1 || numAliveNeighbours >= 4)){
          killRect(rect);
        } else if(!isAlive(rect) && (numAliveNeighbours == 3)) {
          // TODO Creation by colour
          setRect(rect, COLOURS.first);
        }
      }
    }
  };

  var intervalId;
  var stop = function(){
    clearInterval(intervalId);
  };

  var start = function(freq){
    stop();
    intervalId = setInterval(nextStep, freq || 1000);
  };

  return {
    nextStep: nextStep,
    start: start,
    stop: stop
  };

}();