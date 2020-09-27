from marshmallow import Schema, fields


class ClientSchema(Schema):
    id = fields.Int()
    name = fields.Str()
    address = fields.Str()
    email = fields.Str()
    phone = fields.Int()


class ProviderSchema(Schema):
    id = fields.Int()
    name = fields.Str()
    address = fields.Str()
    email = fields.Str()
    phone = fields.Int()


class ProductsSchema(Schema):
    id = fields.Int()
    description = fields.Str()
    price = fields.Int()


class BillHeaderSchema(Schema):
    id = fields.Int()
    provider = fields.Nested(ProviderSchema)
    date = fields.Str()
    value = fields.Int()


class BillDetailSchema(Schema):
    id = fields.Int()
    bill = fields.Nested(BillHeaderSchema)
    products = fields.Nested(ProductsSchema)
    unitprice = fields.Int()
