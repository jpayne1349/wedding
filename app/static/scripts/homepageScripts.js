


var fontsReadyPromise = document.fonts.ready;


fontsReadyPromise.then(
    function(value) { 
        addImage();
        
    }
);

//  call this when the 'web font' has loaded..
// GOTCHA. now we could brake this up  alitte? unsure.
function addImage() {

    let image_container = $('#image_container');


    // we want to know a few things, so we can set the pictures to the right size..
    var window_height = document.documentElement.clientHeight;

    var window_width = document.documentElement.clientWidth;

    // our problem is calling this .offset function before the actual font is loaded in..
    var container_pos = image_container.offset();
    // console.log(container_pos.top, container_pos.left);

    // use the bottom of the header, and the page size, to calculate container height.
    var container_height = window_height - container_pos.top;

    image_container.css({
        'width':'100vw',
        'height': container_height + 'px',
    });

    // declaration of new elements
    var shadow_container = document.createElement('div');
    var image_one = new Image();

    image_one.id = 'homepage_image';

    if( window_width > 768 ) {
        $(shadow_container).css({
            'z-index':'2',
            'height':container_height + 'px',
            'width':'100%',
            'background-color':'rgba(0,0,0,0)',
            'box-shadow':'0 70px 30px -30px white inset',
            'position':'absolute',
            'top':container_pos.top - 2 + 'px'
        });
        
        $(image_one).css({
        'z-index':'1',
        'width':'100vw',
        'height': container_height + 'px',
        'object-fit':'cover',
        'object-position':'50% 80%',

    }); 
    } else { // mobile view
        $(shadow_container).css({
            'z-index':'2',
            'height':container_height + 'px',
            'width':'100%',
            'background-color':'rgba(0,0,0,0)',
            'box-shadow':'0 100px 30px -30px white inset',
            'position':'absolute',
            'top':container_pos.top - 2 + 'px'
        });
        
        $(image_one).css({
        'z-index':'1',
        'width':'100vw',
        'height': container_height + 'px',
        'object-fit':'cover',
        'object-position':'60% 100%',
        
    }); 
    }



    image_one.onload = function() {
        image_container.append(shadow_container)
        image_container.append(image_one);
        
        setTimeout(function() {
            let image = $('#homepage_image');
            image.css('opacity', '1');
            $('.loader_elips').css('opacity','0');
        }, 200);

        };

    image_one.error = function () {
    console.log('ERROR!');
    };

    if(window_width > 768) {
        image_one.src = '/static/engagement_one.jpg';
    } else {
        image_one.src = '/static/engagement_four.jpg';
    }

    

}

