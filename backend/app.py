from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource, reqparse
from flask_restful.reqparse import RequestParser
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt)
from marshmallow import Schema, fields



app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)
api = Api(app)
app.config['JWT_SECRET_KEY'] = 'jwt-secret-string'
jwt = JWTManager(app)


##--------------MODELS-----------------##

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
    client = db.Column(db.ForeignKey('client.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    value = db.Column(db.Integer, nullable=False)
    billtype = db.Column(db.Integer, nullable=False)


class BillDetail(db.Model):
    __tablename__ = 'billdetail'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    bill = db.Column(db.ForeignKey('billheader.id'), nullable=False)
    products = db.Column(db.ForeignKey('products.id'), nullable=False)
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


##-------------SCHEMAS--------------##

class ClientSchema(Schema):
    id = fields.Int()
    name = fields.Str()
    address = fields.Str()
    email = fields.Str()
    phone = fields.Int()


##------------ENDPOINTS-------------##

class Login(Resource):

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('user', help='This field cannot be blank', required=True)
        parser.add_argument('password', help='This field cannot be blank', required=True)
        data = parser.parse_args()
        existingUser = db.session.query(User).filter(User.user == data['user']).first()
        if(not existingUser):
            return {'auth':'false'}

        if(data['password'] == existingUser.password):
            access_token = create_access_token(identity=data['user'])
            refresh_token = create_refresh_token(identity=data['user'])
            return {
                'msg': 'login as {}'.format(existingUser.user),
                'access_token': 'Bearer ' + access_token,
                'refresh_token': refresh_token,
                'auth': 'true',
            }

##------------clientes-----------##
class Clients(Resource):
    #@jwt_required
    def get(self):
        result = Client.query.all()
        res_schema = ClientSchema(many=True).dump(result)
        return res_schema

    def post(self):
        data = request.get_json()['data']
        print(data['id'])
        newClient = Client()
        newClient.id = data['id']
        newClient.name = data['name']
        newClient.address = data['address']
        newClient.email = data['email']
        newClient.phone = data['phone']
        db.session.add(newClient)
        db.session.commit()
        return{"data": "saved"}, 201

    def put(self):
        data = request.get_json()['data']
        print(data['id'])
        UpClient = db.session.query(Client).filter(Client.id == data['id']).first()
        UpClient.id = data['id']
        UpClient.name = data['name']
        UpClient.address = data['address']
        UpClient.email = data['email']
        UpClient.phone = data['phone']
        db.session.add(UpClient)
        db.session.commit()
        return{"data": "saved"}, 201

    def delete(self, id):
        dataToDelete = Client.query.get(id)
        db.session.delete(dataToDelete)
        db.session.commit()
        return {"data": "deleted"}, 201


api.add_resource(Login, '/login')
api.add_resource(Clients, '/clientes', '/clientes/<id>')


if __name__ == '__main__':
    db.create_all()
    #app.run(host='0.0.0.0', port=12000, debug=True)
    app.run(debug=True)
