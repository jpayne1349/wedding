

var map;
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 29.7604, lng: -95.3698 },
        zoom: 7
    });

    var marker = new google.maps.Marker({
        position: { lat: 30.225747, lng: -95.770798 },
        map: map,
    });

    marker.addListener("click", function () {
        map.setZoom(10);
        map.setCenter(marker.getPosition());
    });

}

initMap();

let directions_btn = document.getElementById('directions_btn');

directions_btn.onclick = function () {
    if /* if we're on iOS, open in Apple Maps */
        ((navigator.platform.indexOf("iPhone") != -1) ||
        (navigator.platform.indexOf("iPad") != -1) ||
        (navigator.platform.indexOf("iPod") != -1))
        window.open("maps://maps.google.com/maps?daddr=Magnolia Bells, 699 FM 1486, Magnolia, TX 77354&amp;ll=");
    else /* else use Google */
        window.open("https://maps.google.com/maps?daddr=Magnolia Bells, 699 FM 1486, Magnolia, TX 77354&amp;ll=");

}


/* 
    Magnolia Bells: 30.225747 -95.770798

    Hampton Inn in Tomball
*/