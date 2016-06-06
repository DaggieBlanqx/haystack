/**
* @author       Alex Wafula <xelawafs@gmail.com>
* @license      {@link https://github.com/xelawafs/haystack/blob/master/LICENSE|MIT License}
*
* @overview
*
* haystack.js is a JavaScript search library primarily accepting an array (with sorted values - ascending) and a search value
* then proceeds to return the index position of the value provided in the array.
**/

/**
* An Immediately Invoked Function Expression accepting the global object - window - to trigger the creation of an execution context
* for the entire library making all our declared variables safe when operating in the global context.
* @method   anonymous
* @param    {object}    global  the global window object
**/
(function(global){

  /**
  * We'll use this function to invoke an object init function so we don't have to use the new keyword when interacting with haystack
  * @method Haystack
  * @param {Number}   needle    the value being searched for
  * @param {Array}    hay       the data structure containing all values to be searched through
  **/
  var Haystack = function(needle, hay){
    return new Haystack.init(needle, hay);
  };

  //The __proto__ object of every object created by the Haystack.init function will be pointing to this object to access the methods created here
  Haystack.prototype = {
    //function determining which search algorithm will be used. Currently only one is available
    hayType: function(){
      //checking to see if this.hay is an array data structure
      if (Object.prototype.toString.call(this.hay) === "[object Array]") {
        console.log("This data structure is of type array");
        this.binarySearch(0, this.hay.length - 1);
      }
      else {
        throw("Haystack is currently only able to process sorted - ascending -array data types");
      }
    },

    /**
    * Implementation of the binary search algorithm
    * @method   binarySearch
    * @param    {Number}      start    the starting search position in the array
    * @param    {Number}      stop     the last search position in the array
    **/

    binarySearch: function(start, end) {
      var needleLocation = -2;

      if (end === -1) { //testing for an array with 0 values
        this.needleLocation = -1;
        return;
      }

      arraySearchLength = end - start;

      if (arraySearchLength === 1) { //testing for an array with only 2 values and confirms if either is the value being searched for or not
        if (this.needle === this.hay[start]) {
          this.needleLocation = start;
          return;
        } else if (this.needle === this.hay[end]) {
          this.needleLocation = end;
          return;
        }else {
          this.needleLocation = -1;
          return;
        }
      }

      //mid variable created to hold index position of the middle value in the array
      var mid = start + Math.trunc((arraySearchLength/2));

      if (this.needle === this.hay[mid]) { //checks to see if the value being searched for is located in position mid
        this.needleLocation = mid;
        return;
      }

      else if (this.needle > this.hay[mid]) { //assigns second half of the array as the new array and recalls this function. This is because the searchValue is greater than the value located in position mid
        this.binarySearch(mid + 1, end);
      }

      else {  //assigns first half of the array as the new array and recalls this function. This is because the searchValue is less than the value located in position mid
        this.binarySearch(start, mid);
      }

      //method chainning that will allow for another method in this object to be called immediately after, both affecting this parent object
      return this;
    }
  };

  /**
  * Used as an object constructor to create and initiate a new object when invoked with the keyword new
  * @method     Haystack.init
  * @param      {Number}         needle    item being searched for
  * @param      {Array}          hay       data structure containting all values to be searched through
  **/
  Haystack.init = function(needle, hay){
    var self = this;

    self.needle = needle;
    self.hay = hay || [];
    self.needleLocation = -2;
  }

  //this will have all __proto__ objects of objects created by the Haystack.init function point to the Haystack.prototype object.
  Haystack.init.prototype = Haystack.prototype;

  //Making the Haystack library available in the global context - window - through $moo or Haystack
  global.Haystack = $moo = Haystack;

}(window)); //Invoking the IIFE function located at the first line of code above and passing the window object to it.
