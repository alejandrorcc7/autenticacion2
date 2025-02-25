import os
import sys
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy import create_engine, String, ForeignKey, Date, Column, Integer
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)
    
    pagSecreta = db.relationship("PagSecreta", backref="user", uselist=False)
    
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "pagSecreta": self.pagSecreta.serialize()
        }
    
    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password,  password)
    
    
class PagSecreta(db.Model):
    __tablename__ = 'paginaSecretas'
    id = db.Column(db.Integer, primary_key=True)
    users_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    mensaje =db.Column(db.String, default="Profe estoy aprendiendo a programar")
    
    def serialize(self):
        return{
            "mensaje" : self.mensaje
        }
    
    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()