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

function nav_slide() {
    let button = document.getElementById("button");
    let nav_links = document.getElementById("nav_links");


    button.addEventListener("click", function () {
        
        button.classList.toggle("nav_active");
        button.classList.toggle("clicked");
        nav_links.classList.toggle("nav_active");

    });

}

nav_slide();


// Change styling per link.

let links = document.querySelectorAll("a");

links.forEach(setActive);

function setActive (link) {
    if(link.href == document.URL) {
        link.classList.add("active_link");
    }
}

/*  END NAVIGATION LINKS */

/*  RSVP FORM   */

/* we need to get the form fields and check if they are populated on submission

    it would be nice to use the built in validators and messages
    

/*  END RSVP FORM   */
