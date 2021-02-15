// @ts-check


// the global version of this only works when the URL is guest_count, the page prior to /rsvp
let rsvp_link = document.getElementById("rsvp_link");
rsvp_link.classList.add("active_link");

let pagebody = document.querySelector('body');
pagebody.style.overflow="scroll";


/* this thing is parsing the url and will get argument values out of it*/
function get(name) {
    if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
        return decodeURIComponent(name[1]);
}

let count = get('count');


// this is building the unique page based on the number of people input previously
for(var i = 0; i < parseInt(count); i++) {
    let yes_radio_name = "guest-" + i.toString() + "-response-0";
    let song_block_name = "song_request" + i.toString();
    let no_radio_name = "guest-" + i.toString() + "-response-1";
    
    let yes_radio = document.getElementById(yes_radio_name);
    let no_radio = document.getElementById(no_radio_name);
    let song_block = document.getElementById(song_block_name);

    var onload_yes = yes_radio.getAttribute('checked');
    if(onload_yes != null) {
        song_block.classList.add('show');
    }

    yes_radio.addEventListener('click', function () {
       song_block.classList.add('show'); 
    });
    no_radio.addEventListener('click', function() {
        song_block.classList.remove('show');
    });

}