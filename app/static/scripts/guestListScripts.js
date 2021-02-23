

let pagebody = document.querySelector('body');
pagebody.style.overflow="scroll";

let colors_array = ['#dcfbd9', '#fae2d1', '#cae9f9', '#ebe1fc', '#fac9d5', '#faf9cf']



// going to populate the guest_info_container with a form to submit to the server
// via Fetch.

createPasswordForm();

function createPasswordForm() {

    let container = document.querySelector('#guest_list_container');

    let password_div = document.createElement('div');
    password_div.id = 'password_div';

    let password_input = document.createElement('input');
    password_input.id = 'password_input';
    password_input.type = 'password';
    password_input.autofocus = 'true';

    password_input.addEventListener('keypress', function(e){
        if(e.code == 'Enter') {
            // check contents of input
            // verify password
            validatePassword(password_input);

        }

    });


    password_div.appendChild(password_input);
    container.appendChild(password_div);

}

function validatePassword(input_element) {

    let password = input_element.value;

    if(password === 'bootylicious') {
        //call the fetch function 
        input_element.value = '';
        fetchGuestList();
    }
    else {
        //clear the input..
        input_element.value = '';
    }

}

function fetchGuestList(){
    // delete the password div
    let pass_div = document.querySelector('#password_div');
    pass_div.remove();

    let req = {'password':'approved'};

    //fetch call to the server
    fetch('/rsvp/guest_list/approved/', {
        method: 'POST',
        body: JSON.stringify(req),
        headers: {
          'Content-Type': 'application/json'
        },
    })
    .then(response => {
        response.json().then( data => {
            displayGuestList(data);
        });
    });
    

}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function displayGuestList(parties) {
    let container = document.querySelector('#guest_list_container');

    let parties_list = Object.values(parties);
    console.log(parties_list);
    let previous_color = '';

    for( let party = 0; party < parties_list.length; party++) {

        let guests_list = parties_list[party];
        let party_size = guests_list.length;

        let party_div = document.createElement('div');
        party_div.className = 'party_div';
        party_div.style.backgroundColor = random_color();
        while(party_div.style.backgroundColor == previous_color) {
            party_div.style.backgroundColor = random_color();
        }
        previous_color = party_div.style.backgroundColor;

        for ( let guest = 0; guest < guests_list.length; guest++) {
            let guest_dict = guests_list[guest];
            let first_name = guest_dict.first_name;
            let last_name = guest_dict.last_name;
            let response = guest_dict.response;
            let song_request = guest_dict.song_request;
            let date_created = guest_dict.date_created;
            let moment_object = moment(date_created);
            let timestamp = moment_object.format('LLL');

            let guest_div = document.createElement('div');
            guest_div.className = 'guest_div';
            guest_div.id = first_name + '_' + last_name;
    
            let name_div = document.createElement('div');
            name_div.className = 'name_div';
            name_div.innerText = capitalizeFirstLetter(first_name) + ' ' + capitalizeFirstLetter(last_name);
            guest_div.appendChild(name_div);
            
            let response_div = document.createElement('div');
            response_div.className = 'response_div';
            response_div.innerText = 'Attending: ' + response;
            guest_div.appendChild(response_div);
            
            if( song_request != '') {
                let song_div = document.createElement('div');
                song_div.className = 'song_div';
                song_div.innerText = 'Song Request: ' + song_request;
                guest_div.appendChild(song_div);
            }

            if(guest == (guests_list.length - 1)) {
                let timestamp_div = document.createElement('div');
                timestamp_div.className = 'timestamp_div';
                timestamp_div.innerText = timestamp;
                guest_div.appendChild(timestamp_div);
            }
            
            let delete_div = document.createElement('div');
            delete_div.className = 'delete_div';
            delete_div.innerText = 'X';
            delete_div.addEventListener('click', function() {deleteGuestEntry(guest_div)});

            guest_div.appendChild(delete_div);

            party_div.appendChild(guest_div);
        }
        container.appendChild(party_div);
    }
}

function deleteGuestEntry(guest_elem) {

    let name_id = guest_elem.id;
    let name_array = name_id.split('_');
    let first_name = name_array[0];
    let last_name = name_array[1];

    if( confirm('Guest response for ' + capitalizeFirstLetter(first_name) + ' ' + capitalizeFirstLetter(last_name) + ' will be permanently deleted.')) {



        fetch('/rsvp/guest_list/delete/', {
            method: 'POST',
            body: JSON.stringify(name_array),
            headers: {
            'Content-Type': 'application/json'
        },
        })
        .then(response => {
            response.json().then( data => {
                if(data.length == 1) {
                    guest_elem.remove();
                } else{
                    let parent_party = guest_elem.parentNode;
                    guest_elem.remove();
                    parent_party.remove();

                }
            });
        });


    }




}

function random_color() {

    return colors_array[Math.floor(Math.random()*colors_array.length)];

}