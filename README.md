# Haystack
haystack.js is a JavaScript search library that accepts a value and returns it's position in an array (sorted in ascending order)

###Usage
To get started, include the ``js/haystack.js`` file in your project. Go ahead and assign a variable with the array containing values to be searched through. Have another variable hold the value you'll be searching for.

**The Search Array**
```
  var searchArray = [
    2, 6, 8, 10, 13, 15, 24, 25, 26, 27, 28, 29,
    30, 32, 33, 34, 35, 37, 41, 43, 44, 45, 49, 53, 55,
    58, 60, 61, 62, 64, 66, 69, 71, 77, 83, 84, 95, 103,
    213, 215, 217, 221, 225, 227, 229,231, 235, 512, 546, 555, 556
  ];

  var searchValue = 49;
```

**Initiate the Search**

You initiate the search by passing the ``searchArray`` and ``searchValue`` to the ``Haystack(searchValue, searchArray)`` function. This function returns an object ``result`` that has access to useful methods and properties of the library. By invoking the
``result.hayType()`` the result.needleLocation property will have either of the following:
* -1: indicating that the ``searchValue`` doesn't exist in the ``searchArray``.
* Array index position: the array index position of the ``searchValue`` in ``searchArray``.

index.html is used to demonstrate this by logging search results in the browser console:

```
  var searchValue = 49;
  var searchArray = [
    2, 6, 8, 10, 13, 15, 24, 25, 26, 27, 28, 29,
    30, 32, 33, 34, 35, 37, 41, 43, 44, 45, 49, 53, 55,
    58, 60, 61, 62, 64, 66, 69, 71, 77, 83, 84, 95, 103,
    213, 215, 217, 221, 225, 227, 229,231, 235, 512, 546, 555, 556
  ];

  var result = Haystack(searchValue, searchArray);
  result.hayType();

  if (result.needleLocation !== -1) {
    console.log("The array position of item " + searchValue + " is " + result.needleLocation);
  }
  else {
    console.log("Item " + searchValue + " does not exist in this array");
  }
  ```
