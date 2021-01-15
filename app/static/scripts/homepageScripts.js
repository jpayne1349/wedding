// need to make our carousel of photos here...


// basically a list of photos. styled and moved left and right with buttons


// these photos will be large.. so download waiting will have to be a thing..

// basically, we could store these photos in a js list/array
// and show hide them based on a timing function.
// also listening for small button presses, to change if needed.

var image_container = $('#image_container');

// we want to know a few things, so we can set the pictures to the right size..
var window_height = $(window).height();
var window_width = $(window).width();

var container_pos = image_container.offset();
console.log(container_pos.top, container_pos.left);

// use the bottom of the header, and the page size, to calculate container height.
var container_height = window_height - container_pos.top;

image_container.css({
    'width':'100vw',
    'height': container_height + 'px',
});

var shadow_container = document.createElement('div');

image_container.append(shadow_container);

$(shadow_container).css({
    'z-index':'3',
    'height':container_height + 'px',
    'width':'100%',
    'background-color':'rgba(0,0,0,0)',
    'box-shadow':'0 70px 40px -30px white inset',
    'position':'absolute'
});




// needs to be an array. . .
// can do some async type stuff. as the images load in, let it populate this thing.
// could have them sit under the view of the page and slide up?? 
// play/pause button slightly visible somewhere, maybe a back and forward button.. might look nice.
var image_one = new Image();

$(image_one).css({
    
    'width':'100vw',
    'height': container_height + 'px',
    'object-fit':'cover',
    'object-position':'50% 100%'

});

image_one.onload = function () {
  image_container.append(this);
  console.log( 'image loaded?');
};

image_one.error = function () {
  console.log('ERROR!');
};

image_one.src = '/static/engagement_one.jpg';
