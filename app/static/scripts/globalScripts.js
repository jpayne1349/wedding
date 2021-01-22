// @ts-check


/*  DAYS TO GO SCRIPT   */

function daysBetween(date1, date2) {

    //Get 1 day in milliseconds
    var one_day = 1000 * 60 * 60 * 24;

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms;

    // Convert back to days and return
    return Math.round(difference_ms / one_day);

}

let todays_date = new Date();

let wedding_date = new Date();
wedding_date.setFullYear(2021,10,13);

let countdown_number = document.getElementById("countdown_number");
countdown_number.innerText = daysBetween(todays_date, wedding_date).toString();

/*  END OF DAYS TO GO   */



/*  NAVIGATION LINKS */

let links = document.querySelectorAll("a");

links.forEach(setActive);

function setActive (link) {
    if(link.href == document.URL) {
        link.classList.add("active_link");
    }
}


/*  END NAVIGATION LINKS */


// Changing names size for cell phone view

var window_width = $(window).width();

if(window_width < 768) {

    let text = $('#names').text();
    console.log(text)

}


// page resize calls for refresh

window.addEventListener('resize', function() { 
    // small delay for finish of resize
    // TODO: add in a whole page spinner here? would look professional
    //
    setTimeout(function() {
        location.reload();
        console.log('page refresh on resize');
    } , 500);
});


// javascript onload waiting for the flower images as well

var left_empty = $('#left_empty');
var right_empty = $('#right_empty');

var left_flowers = new Image();
left_flowers.id = 'left_flowers';
left_flowers.src = '/static/top_left_flower.png';

var right_flowers = new Image();
right_flowers.id = 'right_flowers';
right_flowers.src = '/static/top_right_flower.png';


left_flowers.onload = function() {
    left_empty.append(this);

};

right_flowers.onload = function() {
    left_empty.append(this);

};