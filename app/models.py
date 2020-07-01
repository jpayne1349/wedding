from . import db

# making the database structure for the guests RSVPing
class Guest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(32), index=True)
    last_name = db.Column(db.String(32), index=True)
    response = db.Column(db.String(32), index=True)
    song_request = db.Column(db.Text)

    def __repr__(self):
        return f'Guest: {self.first_name} {self.last_name}'
        
