
from flask import Blueprint, render_template, flash, redirect, url_for, request, g
from flask import current_app as app
from .forms import RsvpForm, GuestCount
from app.models import Guest
from app import db

public_access_bp = Blueprint('public_access_bp', __name__) 

@public_access_bp.route('/travel/')
def travel_page():

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

    if form.validate_on_submit():
        for num in range(count):
            first_name = form.guest.data[num].get('first_name')
            last_name = form.guest.data[num].get('last_name')
            response = form.guest.data[num].get('response')
            song_request = form.guest.data[num].get('song_request')
            new_guest = Guest(first_name=first_name,last_name=last_name,response=response,song_request=song_request)
            db.session.add(new_guest)
        db.session.commit()
        flash("Your information was submitted! Thanks for testing the database. The information will be deleted when the website goes public.")
        return render_template('homepage.html', title='HomePage')
      
    return render_template('rsvp.html', method=method, count=count, form=form )



"""
Possible Future Routes:

Contact Us / Feedback



"""

