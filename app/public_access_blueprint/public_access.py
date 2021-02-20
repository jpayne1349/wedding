
from flask import Blueprint, render_template, flash, redirect, url_for, request, g
from flask import current_app as app
from .forms import RsvpForm, GuestCount
from app.models import Guest, Party
from app import db
import json

public_access_bp = Blueprint('public_access_bp', __name__) 

@public_access_bp.route('/registry/')
def registry_page():
    
    return render_template('registry.html')

@public_access_bp.route('/travel/')
def travel_page():
    #api_key = app.config.get('MAPS_API_KEY')
    return render_template('travel.html')

@public_access_bp.route('/')
@public_access_bp.route('/home/')
def homepage():
    #flash("Site under development! Comments and suggestions welcome.")
    return render_template('homepage.html')

@public_access_bp.route('/guest_count/', methods=['GET', 'POST'])
def guest_count_page():
    form = GuestCount()
    if form.validate_on_submit():
        count = form.guest_number.data
        return redirect(url_for('public_access_bp.rsvp_page', count=count))
    return render_template('guest_count.html', form=form)

@public_access_bp.route('/rsvp/', methods=['GET', 'POST'])
def rsvp_page():
    method = request.method
    count = request.args.get('count', 0)
    count = int(count)
    if count is 0:
        return redirect(url_for('public_access_bp.guest_count_page'))

    form = RsvpForm()
    if method == 'GET':
        for guests in range(count):    
            form.guest.append_entry()

    # here is where we will have to check against the database for duplicates
    if form.validate_on_submit():
        matched_guest = []
        # new party created outside of loop
        new_party = Party()
        print(new_party)
        db.session.add(new_party)
        db.session.commit()
        for num in range(count):
            #lowercase the names for easier duplicate checking
            first_name = form.guest.data[num].get('first_name').lower()
            last_name = form.guest.data[num].get('last_name').lower()
            response = form.guest.data[num].get('response')
            song_request = form.guest.data[num].get('song_request')
            timestamp = form.guest.data[num].get('timestamp')
            party_number = new_party.id
            #check for an exact name match in the database.
            # what to do if one is found? it could be after things have been added to the session?
            if not Guest.query.filter_by(last_name=last_name).filter_by(first_name=first_name).first():
                new_guest = Guest(first_name=first_name,last_name=last_name,response=response,song_request=song_request, party_number=party_number, date_created=timestamp)
                db.session.add(new_guest)
            else:
                # query for the guest, and update their status
                updated_guest = Guest.query.filter_by(last_name=last_name).filter_by(first_name=first_name).first()
                
                # check for empty party and delete?
                p_num = updated_guest.party_number
                old_party = Party.query.filter_by(id=p_num).first()
                
                updated_guest.response = response
                updated_guest.song_request = song_request
                updated_guest.date_created = timestamp
                updated_guest.party_number = party_number

                db.session.add(updated_guest)

                # this has to happen after the party number change above
                if(len(old_party.guests) == 0):
                    db.session.delete(old_party)

                printed_name = first_name.capitalize() + ' ' + last_name.capitalize()
                matched_guest.append(printed_name)

        db.session.commit()
        for duplicate in matched_guest:
            flash(f'An entry for the guest "{duplicate}" has been updated.')

        flash("We have your response. Thank you!")
        return render_template('homepage.html', title='HomePage')
      
    return render_template('rsvp.html', method=method, count=count, form=form )


@public_access_bp.route('/rsvp/guest_list/')
def guest_list():
    # render some html to call another request
    #

    return render_template('guest_list.html')

@public_access_bp.route('/rsvp/guest_list/approved/', methods=['POST'])
def guest_list_approved():
    if request.method != 'POST':
        return render_template('guest_list.html')

    client_data = request.get_json()
    if(client_data['password'] != 'approved'):
        return render_template('guest_list.html')

    response_package = []
    # package the guest info
    parties = Party.query.all()
    for party in parties:
        # access to party number here.
        party_package = []
        for guest in party.guests:
            # convert date to cst real quick
            guest_dict = {
                'first_name':guest.first_name,
                'last_name':guest.last_name,
                'response':guest.response,
                'song_request':guest.song_request,
                'date_created':guest.date_created,
                'party_number':guest.party_number
            }
            party_package.append(guest_dict)

        response_package.append(party_package)

    response = json.dumps(response_package)

    return response