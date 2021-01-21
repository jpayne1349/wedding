

var image_container = $('#image_container');

// we want to know a few things, so we can set the pictures to the right size..
var window_height = document.documentElement.clientHeight;


var container_pos = image_container.offset();
console.log(container_pos.top, container_pos.left);

// use the bottom of the header, and the page size, to calculate container height.
var container_height = window_height - container_pos.top;

image_container.css({
    'width':'100vw',
    'height': container_height + 'px',
});

// declaration of new elements
var shadow_container = document.createElement('div');
var image_one = new Image();

if( window_width > 768 ) {
    $(shadow_container).css({
        'z-index':'3',
        'height':container_height + 'px',
        'width':'100%',
        'background-color':'rgba(0,0,0,0)',
        'box-shadow':'0 70px 30px -30px white inset',
        'position':'absolute',
        'top':container_pos.top - 2 + 'px'
    });
    
    $(image_one).css({
    
    'width':'100vw',
    'height': container_height + 'px',
    'object-fit':'cover',
    'object-position':'50% 80%'

}); 
} else { // mobile view
    $(shadow_container).css({
        'z-index':'3',
        'height':container_height + 'px',
        'width':'100%',
        'background-color':'rgba(0,0,0,0)',
        'box-shadow':'0 100px 30px -30px white inset',
        'position':'absolute',
        'top':container_pos.top - 2 + 'px'
    });
    
    $(image_one).css({
    
    'width':'100vw',
    'height': container_height + 'px',
    'object-fit':'cover',
    'object-position':'50% 100%',
    'display': 'none'
}); 
}

image_container.append(shadow_container)

image_one.onload = function () {
    image_container.append(image_one);
    image_one.style.display = 'block';

    };

image_one.error = function () {
  console.log('ERROR!');
};

image_one.src = '/static/engagement_one.jpg';
