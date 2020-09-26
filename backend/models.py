from backend import db
from sqlalchemy.orm import relationship


class Client(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    phone = db.Column(db.Integer, unique=True, nullable=False)


class Products(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)


class Provider(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    phone = db.Column(db.Integer, unique=True, nullable=False)


class BillHeader(db.Model):
    __tablename__ = 'billheader'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    provider_id = db.Column(db.Integer, db.ForeignKey("provider.id"), nullable=False)
    provider = relationship("Provider")
    date = db.Column(db.String, nullable=False)
    value = db.Column(db.Integer, nullable=False)


class BillDetail(db.Model):
    __tablename__ = 'billdetail'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    bill_id = db.Column(db.Integer, db.ForeignKey('billheader.id'), nullable=False)
    bill = relationship("BillHeader")
    products_id = db.Column(db.ForeignKey('products.id'), nullable=False)
    products = relationship("Products")
    unitprice =  db.Column(db.Integer)
    quantity = db.Column(db.Integer)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, unique=True, nullable=False)
    rol = db.Column(db.String, unique=True, nullable=False) #1.admin - 2.user


class Inventory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    products = db.Column(db.ForeignKey('products.id'), nullable=False)
    stock = quantity = db.Column(db.Integer)
