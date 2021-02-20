



var fontsReadyPromise = document.fonts.ready;


fontsReadyPromise.then(
    function(value) { 
        addImage();
        
    }
);

//  call this when the 'web font' has loaded..
// GOTCHA. now we could brake this up  alitte? unsure.
function addImage() {

    let image_container = $('#registry_div');


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
    shadow_container.className = 'shadow_container';
    var image_one = new Image();

    image_one.id = 'registry_image';

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
        'width':'120vw',
        'height': container_height + 'px',
        'object-fit':'cover',
        'object-position':'50% 70%',

    }); 
    } else { // mobile view
        $(shadow_container).css({
            'z-index':'2',
            'height':container_height + 'px',
            'width':'100%',
            'background-color':'rgba(0,0,0,0)',
            'box-shadow':'0 150px 30px -30px white inset',
            'position':'absolute',
            'top':container_pos.top - 2 + 'px'
        });
        
        $(image_one).css({
        'z-index':'1',
        'width':'100vw',
        'height': container_height + 'px',
        'object-fit':'cover',
        'object-position':'40% 100%',
        
    }); 
    }



    image_one.onload = function() {
        image_container.append(shadow_container)
        image_container.append(image_one);
        
        setTimeout(function() {
            let image = $('#registry_div');
            image.css('opacity', '1');
            $('.loader_elips').css('opacity','0');
        }, 200);

        };

    image_one.error = function () {
    console.log('ERROR!');
    };

    if(window_width > 768) {
        image_one.src = '/static/engagement_three.jpg';
    } else {
        image_one.src = '/static/engagement_six.jpg';
    }

}


// after adding image, call the create link function.

function createLink() {
    let registry_div = $('#registry_div');
    
    var window_width = document.documentElement.clientWidth;
    
    let link_div = document.createElement('div');
    link_div.className = 'link_div';

    link_div.addEventListener('click', function() {
        window.open('https://www.amazon.com/wedding/madeline-stickler-james-payne--november-2021/registry/1CJNADL8TO2HX');
    } );

    let link_text = document.createElement('div');
    link_text.className = 'link_text';
    link_text.innerText = 'Our Registry';
    
    let arrow_div = document.createElement('div');
    arrow_div.className = 'arrow_div';

    if( window_width > 768 ) {

                link_text.addEventListener('mouseover', function() {
            $(arrow_div).css({transform:'rotate(-45deg) translate(10px, 10px)'});
        });
        link_text.addEventListener('mouseout', function() {
            $(arrow_div).css({transform:'rotate(-45deg) translate(0px, 0px)'});
        });
       
        $(link_div).css({
            'width':'30vw',
            // 'height':'10vh',
            // 'background-color':'gray',
            'position':'absolute',
            'top':'70vh',
            'left':'10vw',
            'z-index':'10',
            'cursor':'pointer'
        });

        
        $(link_text).css({
            'display':'inline-block',
            'font-size':'4vw',
            'color':'white',
            'font-family':'Quicksand',
            'margin-right':'2vw'
        });
    
        $(arrow_div).css({
            'display':'inline-block',
            'border':'solid white',
            'border-width':'0 0.4vw 0.4vw 0',
            'padding':'0.75vw',
            'transform':'rotate(-45deg)',
            'transition':'transform 1s'
            
        });
    } else { // MOBILE VIEW

        let registry_div_pos = $('#registry_div').offset();

        $(link_div).css({
            'width':'60vw',
            
            'border-radius':'10px',
            'padding-bottom': '5px',
            'position':'absolute',
            'top': (registry_div_pos.top + 30) + 'px',
            'left':'22vw',
            'z-index':'10',
            'cursor':'pointer',
            
        });

        
        $(link_text).css({
            'display':'inline-block',
            'font-size':'8vw',
            'color':'black',
            'font-family':'Quicksand',
            'margin-right':'2vw',
            'margin-left':'2vw'
        });
    
        $(arrow_div).css({
            'display':'inline-block',
            'border':'solid black',
            'border-width':'0 0.6vw 0.6vw 0',
            'padding':'1.5vw',
            'transform':'rotate(-45deg)'
            
        });

    }

    // $(arrow_div).append(top_bar, bottom_bar);
    $(link_div).append(link_text, arrow_div);
    $(registry_div).append(link_div);


}


createLink();