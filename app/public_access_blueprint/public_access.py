
from flask import Blueprint, render_template, flash, redirect, url_for, request, g
from flask import current_app as app
from .forms import RsvpForm, GuestCount
from app.models import Guest
from app import db

public_access_bp = Blueprint('public_access_bp', __name__) 

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
        for num in range(count):
            #lowercase the names for easier duplicate checking
            first_name = form.guest.data[num].get('first_name').lower()
            last_name = form.guest.data[num].get('last_name').lower()
            response = form.guest.data[num].get('response')
            song_request = form.guest.data[num].get('song_request')
            #check for an exact name match in the database.
            # what to do if one is found? it could be after things have been added to the session?
            if not Guest.query.filter_by(last_name=last_name).filter_by(first_name=first_name).first():
                print('no match found')
                new_guest = Guest(first_name=first_name,last_name=last_name,response=response,song_request=song_request)
                db.session.add(new_guest)
            else:
                print('match found')
                match = first_name + ' ' + last_name
                matched_guest.append(match)
        db.session.commit()
        for duplicate in matched_guest:
            flash(f'An entry for the guest "{duplicate}" has already been saved!')
        # TODO: just put a simple check here to not say the info was submitted if it wasn't...
        flash("Your information was submitted! Thanks for testing the database. The information will be deleted when the website goes public.")
        return render_template('homepage.html', title='HomePage')
      
    return render_template('rsvp.html', method=method, count=count, form=form )


