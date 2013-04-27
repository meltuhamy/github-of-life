// Get columns etc. from the dom
var columns = $('#calendar-graph>g>g');
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
  rect.row = i;
  rect.col = j;
  return rect;
};

/**
 * Returns the colour string of a rect
 * @param  {Number} i The row number
 * @param  {Number} j The col number
 * @return {String}
 */
var getRectColor = function(i,j){
  return $(getRect(i,j)).css('fill');
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
 * @param  {Number}  j The row number
 * @return {Boolean}   If the colour matches the dead color
 */
var isAlive = function(i,j){
  return getRectColor(i,j) != COLOURS.dead;
};

/**
 * Sets the colour of a rect to the dead colour
 * @param  {Number} i The row number
 * @param  {Number} j The col number
 */
var killRect = function(i,j){
  getSetRect(i,j,COLOURS.dead);
};

/**
 * Gets the the neighbours of a rect
 * @param  {Number} i The row number
 * @param  {Number} j The col number
 * @return {Array}    An array of rects that are the neigbours
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

var nextStep = function(){

};