
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, RadioField, SubmitField, SelectField, FormField, FieldList
from wtforms.validators import InputRequired


'''
FieldList(FormField("someform")) 
We should be able to tell WTForms that we will make multiple
"guest forms" and that it should index them inside of
a wrapping form with a FieldList of FormFields called """


'''

class GuestCount(FlaskForm):
    guest_number = SelectField('How many guests would you like to RSVP for?', choices=[('1','1'),('2','2'),('3','3'),('4','4'),('5','5'),('6','6'),('7','7'),('8','8')])
    submit = SubmitField('Next')

class GuestForm(FlaskForm):
    first_name = StringField('First Name', validators=[InputRequired("First Name Needed")])
    last_name = StringField('Last Name', validators=[InputRequired("Last Name Needed")])
    response = RadioField(choices=[('yes','I will be attending.'),('no','I am unable to attend.')], validators=[InputRequired("Response Required")])
    song_request = TextAreaField('Song Request')
    timestamp = StringField()

class RsvpForm(FlaskForm):
    guest = FieldList(FormField(GuestForm))

    #database queries necessary to check for repeat RSVP's
    # this needs some thought
    #def validate_first_name(self, first_name):
