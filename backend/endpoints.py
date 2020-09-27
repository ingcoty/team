from flask import request
from flask_jwt_extended import (create_access_token, create_refresh_token,
                                get_jwt_identity, get_raw_jwt,
                                jwt_refresh_token_required, jwt_required)
from flask_restful import Api, Resource, reqparse

from backend.models import (BillDetail, BillHeader, Client, Inventory, Products,
                    Provider, User)
from backend.schemas import (BillDetailSchema, BillHeaderSchema, ClientSchema,
                     ProductsSchema, ProviderSchema)
from backend import db


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
        else:
            return {'auth': 'false'}, 200


class Clients(Resource):
    """obtener un cliente por id"""

    @jwt_required
    def get(self, id):
        result = Client.query.filter_by(id=id).first()
        if(result):
            res_schema = ClientSchema().dump(result)
            return res_schema
        else:
            return{"message":"Cliente no existe"},404

    @jwt_required
    def post(self):
        """crear un nuevo cliente"""
        data = request.get_json()['data']
        exist = Client().query.filter_by(id=data['id']).first()
        if exist != None:
            return{"message":"cliente existe"}, 404

        newClient = Client()
        newClient.id = data['id']
        newClient.name = data['name']
        newClient.address = data['address']
        newClient.email = data['email']
        newClient.phone = data['phone']
        db.session.add(newClient)
        db.session.commit()
        datareturn = Client().query.filter_by(id=data['id']).first()
        return{"data": ClientSchema().dump(datareturn)}, 201

    @jwt_required
    def put(self):
        """actualizar un cliente"""
        data = request.get_json()['data']
        UpClient = db.session.query(Client).filter(Client.id == data['id']).first()
        if UpClient == None:
            return{ "message": "cliente no existe"}, 404
        UpClient.id = data['id']
        UpClient.name = data['name']
        UpClient.address = data['address']
        UpClient.email = data['email']
        UpClient.phone = data['phone']
        db.session.add(UpClient)
        db.session.commit()
        UpClient = db.session.query(Client).filter(Client.id == data['id']).first()
        return {"data": ClientSchema().dump(UpClient)}, 201

    @jwt_required
    def delete(self, id):
        """borrar un cliente"""
        dataToDelete = Client.query.get(id)
        if dataToDelete == None:
            return {"message": "cliente no existe"}, 404
        db.session.delete(dataToDelete)
        db.session.commit()
        return {"data": id}, 202


class ClientsList(Resource):
    @jwt_required
    def get(self):
        result = Client.query.all()
        res_schema = ClientSchema(many=True).dump(result)
        return res_schema


class Providers(Resource):
    """obtener un Provider por id"""

    @jwt_required
    def get(self, id):
        result = Provider.query.filter_by(id=id).first()
        if(result):
            res_schema = ProviderSchema().dump(result)
            return res_schema
        else:
            return{"message":"Provider no existe"},404

    @jwt_required
    def post(self):
        """crear un nuevo Provider"""
        data = request.get_json()['data']
        exist = Provider().query.filter_by(id=data['id']).first()
        if exist != None:
            return{"message":"Provider existe"}, 404

        newProvider = Provider()
        newProvider.id = data['id']
        newProvider.name = data['name']
        newProvider.address = data['address']
        newProvider.email = data['email']
        newProvider.phone = data['phone']
        db.session.add(newProvider)
        db.session.commit()
        datareturn = Provider().query.filter_by(id=data['id']).first()
        return{"data": ProviderSchema().dump(datareturn)}, 201


    @jwt_required
    def put(self):
        """actualizar un Provider"""
        data = request.get_json()['data']
        UpProvider = db.session.query(Provider).filter(Provider.id == data['id']).first()
        if UpProvider == None:
            return{ "message": "Provider no existe"}, 404
        UpProvider.id = data['id']
        UpProvider.name = data['name']
        UpProvider.address = data['address']
        UpProvider.email = data['email']
        UpProvider.phone = data['phone']
        db.session.add(UpProvider)
        db.session.commit()
        UpProvider = db.session.query(Provider).filter(Provider.id == data['id']).first()
        return {"data": ProviderSchema().dump(UpProvider)}, 201


    @jwt_required
    def delete(self, id):
        """borrar un Provider"""
        dataToDelete = Provider.query.get(id)
        if dataToDelete == None:
            return {"message": "Provider no existe"}, 404
        db.session.delete(dataToDelete)
        db.session.commit()
        return {"data": id}, 202


class ProvidersList(Resource):
    @jwt_required
    def get(self):
        result = Provider.query.all()
        res_schema = ProviderSchema(many=True).dump(result)
        return res_schema


class Productos(Resource):
    """obtener un Products por id"""

    @jwt_required
    def get(self, id):
        result = Products.query.filter_by(id=id).first()
        if(result):
            res_schema = ProductsSchema().dump(result)
            return res_schema
        else:
            return{"message":"Producto no existe"},404

    @jwt_required
    def post(self):
        """crear un nuevo Products"""
        data = request.get_json()['data']
        exist = Products().query.filter_by(id=data['id']).first()
        if exist != None:
            return{"message":"Producto existe"}, 404

        newProducts = Products()
        newProducts.id = data['id']
        newProducts.description = data['description']
        newProducts.price = data['price']
        db.session.add(newProducts)
        db.session.commit()
        datareturn = Products().query.filter_by(id=data['id']).first()
        return{"data": ProductsSchema().dump(datareturn)}, 201

    @jwt_required
    def put(self):
        """actualizar un Products"""
        data = request.get_json()['data']
        UpProducts = db.session.query(Products).filter(Products.id == data['id']).first()
        if UpProducts == None:
            return{ "message": "Producto no existe"}, 404
        UpProducts.id = data['id']
        UpProducts.description = data['description']
        UpProducts.price = data['price']
        db.session.add(UpProducts)
        db.session.commit()
        UpProducts = db.session.query(Products).filter(Products.id == data['id']).first()
        return {"data": ProductsSchema().dump(UpProducts)}, 201

    @jwt_required
    def delete(self, id):
        """borrar un Products"""
        dataToDelete = Products.query.get(id)
        if dataToDelete == None:
            return {"message": "Products no existe"}, 404
        db.session.delete(dataToDelete)
        db.session.commit()
        return {"data": id}, 202


class ProductosList(Resource):
    @jwt_required
    def get(self):
        result = Products.query.all()
        res_schema = ProductsSchema(many=True).dump(result)
        return res_schema


class Factura(Resource):
    """obtener una factura id"""

    @jwt_required
    def get(self, id):
        result = BillHeader.query.filter_by(id=id).first()
        if(result):
            res_schema = BillHeaderSchema().dump(result)
            return res_schema
        else:
            return{"message":"Producto no existe"},404

    @jwt_required
    def post(self):
        """crear una nueva factura"""
        data = request.get_json()['data']
        factura = BillHeader()
        factura.provider_id = data['provider']
        factura.provider = Provider.query.filter_by(id=data['provider']).first()
        factura.date = data['date']
        factura.value = data['value']
        db.session.add(factura)
        db.session.commit()

        factura = db.session.query(BillHeader).order_by(BillHeader.id.desc()).first()
        for producto in data['productos']:
            detalle = BillDetail()
            detalle.bill_id = factura
            detalle.bill = factura
            detalle.products_id = producto['id']
            product = Products.query.filter_by(id=producto['id']).first()
            detalle.products = product
            detalle.quantity = producto['quantity']
            detalle.unitprice = producto['price']
            db.session.add(detalle)


        db.session.commit()
        return {"data": BillHeaderSchema().dump(factura)}, 201


    @jwt_required
    def delete(self, id):
        """borrar una factura"""
        dataToDelete = BillHeader.query.get(id)
        if dataToDelete == None:
            return {"message": "Factura no existe"}, 404
        db.session.delete(dataToDelete)
        db.session.commit()
        return {"data": id}, 202


class FacturaList(Resource):
    @jwt_required
    def get(self):
        result = BillHeader.query.all()
        res_schema = BillHeaderSchema(many=True).dump(result)
        return res_schema


class Detalle(Resource):
    """obtener una factura id"""

    @jwt_required
    def get(self, id):
        result = BillDetail.query.filter_by(bill_id=id).all()
        if(result):
            res_schema = BillDetailSchema(many=True).dump(result)
            return res_schema
        else:
            return{"message":"Producto no existe"},404

    @jwt_required
    def post(self):
        """crear una nueva factura"""
        data = request.get_json()['data']
        factura = BillHeader()
        factura.provider_id = data['provider']
        factura.provider = Provider.query.filter_by(id=data['provider']).first()
        factura.date = data['date']
        factura.value = data['value']
        db.session.add(factura)
        db.session.commit()

        factura = db.session.query(BillHeader).order_by(BillHeader.id.desc()).first()
        for producto in data['productos']:
            detalle = BillDetail()
            detalle.bill_id = factura
            detalle.bill = factura
            detalle.products_id = producto['id']
            product = Products.query.filter_by(id=producto['id']).first()
            detalle.products = product
            detalle.quantity = producto['quantity']
            db.session.add(detalle)

        db.session.commit()
        return {"data": BillHeaderSchema().dump(factura)}, 201


    @jwt_required
    def delete(self, id):
        """borrar una factura"""
        dataToDelete = BillHeader.query.get(id)
        if dataToDelete == None:
            return {"message": "Factura no existe"}, 404
        db.session.delete(dataToDelete)
        db.session.commit()
        return {"data": id}, 202


class FacturaList(Resource):
    @jwt_required
    def get(self):
        result = BillHeader.query.all()
        res_schema = BillHeaderSchema(many=True).dump(result)
        return res_schema


class Usuario(Resource):
    @jwt_required
    def post(self):
        data = request.get_json()['data']
        newuser = User()
        newuser.user = data['user']
        newuser.password = data['password']
        newuser.rol = '1'
        db.session.add(newuser)
        db.session.commit()
        return {"data": data}, 201


def add_api(api):
    api.add_resource(Login, '/login')
    api.add_resource(Usuario, '/usuario')
    api.add_resource(Clients, '/clientes', '/clientes/<id>')
    api.add_resource(ClientsList, '/clienteslist')
    api.add_resource(Providers, '/proveedores', '/proveedores/<id>')
    api.add_resource(ProvidersList, '/proveedoreslist')
    api.add_resource(Productos, '/productos', '/productos/<id>')
    api.add_resource(ProductosList, '/productoslist')
    api.add_resource(Factura, '/factura', '/factura/<id>')
    api.add_resource(FacturaList, '/facturalist')
    api.add_resource(Detalle, '/detalle', '/detalle/<id>')
