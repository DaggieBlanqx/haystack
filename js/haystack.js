/**
* @author       Alex Wafula <xelawafs@gmail.com>
* @license      {@link https://github.com/xelawafs/haystack/blob/master/LICENSE|MIT License}
*
* @overview
*
* haystack.js is a JavaScript search library primarily accepting an array (with sorted values - ascending) and a search value
* then proceeds to return the index position of the value provided in the array.
**/


var binarySearch = {
  arrayPosition: -2,

  /**
  *This function returns an index position for the searchValue in the searchArray provided.
  *The return value defaults to -1 if the searchValue provided doesn't exist in the array.
  *
  * @param  {integer] searchValue   the array value being searched for
  * @param  {Array}  searchArray    the array containin all values to be searched through
  * @return {integer}   index of the searchValue provided. Return value will be -1 if searchValue doesn't exist in array
  **/
  searchMaster: function(searchValue, searchArray){
    this.searchInner(searchValue, searchArray, 0, searchArray.length - 1);
    return this.arrayPosition;
  },

  /**
  * @param  {integer] searchValue   the array value being searched for
  * @param  {Array}  searchArray    the array containing all values to be searched through
  * @param {integer} start   the index position from where search commences
  * @param  {integer} end the index position form where search ends
  **/
  searchInner: function (searchValue, searchArray, start, end) {
    if (start === end) { //testing for an array with 0 values
      this.arrayPosition = -1;
    }

    arraySearchLength = end - start;

    if (arraySearchLength === 1) { //testing for an array with only 1 value and confirms if it's the value being searched for or not
      if (searchValue === searchArray[start]) {
        this.arrayPosition = start;
      } else {
        arrayPosition = -1;
      }
    }

    //mid variable created to hold index position of the middle value in the array
    var mid = start + Math.trunc((arraySearchLength/2));

    if (searchValue === searchArray[mid]) { //checks to see if the value being searched for is located in position mid
      this.arrayPosition = mid;
    } else if (searchValue > searchArray[mid]) { //assigns second half of the array as the new array and recalls this function. This is because the searchValue is greater than the value located in position mid
      this.searchInner(searchValue, searchArray, mid + 1, end);
    } else if (this.arrayPosition === -1) { //checks to see if the previous recursion of this function ruled out searchValue as part of the array
      this.arrayPosition = -1;
    } else {  //assigns first half of the array as the new array and recalls this function. This is because the searchValue is less than the value located in position mid
      this.searchInner(searchValue, searchArray, start, mid);
    }
  }
}
