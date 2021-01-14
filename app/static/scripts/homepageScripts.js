// need to make our carousel of photos here...


// basically a list of photos. styled and moved left and right with buttons


// these photos will be large.. so download waiting will have to be a thing..

// basically, we could store these photos in a js list/array
// and show hide them based on a timing function.
// also listening for small button presses, to change if needed.

var image_container = $('.parallax');

// needs to be an array. . .
// can do some async type stuff. as the images load in, let it populate this thing.
var image = new Image();

image.onload = function () {
  //$('#page_content').append(this);
  console.log( 'image loaded?');
};

image.error = function () {
  console.log('ERROR!');
};

image.src = '/static/sampleimg.jpg';

// so this is working. to only show the image after it's loaded..

console.log(image_container[0])