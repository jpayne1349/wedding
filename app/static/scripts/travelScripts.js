

var map;
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 30.225747, lng: -95.770798 },
        zoom: 8
    });

    var marker = new google.maps.Marker({
        position: { lat: 30.225747, lng: -95.770798 },
        map: map
    });

    marker.addListener("click", function () {
        map.setZoom(10);
        map.setCenter(marker.getPosition());
    });

    map.addListener("center_changed", () => {
    // 3 seconds after the center of the map has changed, pan back to the
    // marker.
    window.setTimeout(() => {
      map.panTo(marker.getPosition());
    }, 3000);
    });
}

initMap();

let maps_btn = document.getElementById('maps_btn');

maps_btn.onclick = function () {
    if /* if we're on iOS, open in Apple Maps */
        ((navigator.platform.indexOf("iPhone") != -1) ||
        (navigator.platform.indexOf("iPad") != -1) ||
        (navigator.platform.indexOf("iPod") != -1))
        window.open("maps://maps.google.com/maps?daddr=Magnolia Bells, 699 FM 1486, Magnolia, TX 77354&amp;ll=");
    else /* else use Google */
        window.open("https://maps.google.com/maps?daddr=Magnolia Bells, 699 FM 1486, Magnolia, TX 77354&amp;ll=");

}

let google_btn = document.getElementById('google_btn');

google_btn.onclick = function () {

    window.open("http://www.google.com/search?q=Magnolia+Bells+699+FM+1486");

}
/* 
    Magnolia Bells: 30.225747 -95.770798

    Hampton Inn in Tomball
*/