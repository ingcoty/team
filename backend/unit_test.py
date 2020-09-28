import unittest
import json
import requests


def make_orderer():
    order = {}

    def ordered(f):
        order[f.__name__] = len(order)
        return f

    def compare(a, b):
        return [1, -1][order[a] < order[b]]

    return ordered, compare


ordered, compare = make_orderer()
unittest.defaultTestLoader.sortTestMethodsUsing = compare


class BackendTestCase(unittest.TestCase):

    def setUp(self):
        self.numfac = 0
        self.url = 'http://localhost:5000'
        self.header = {'content-type': 'application/json', }
        self.client = {'data': {'id': '1678', 'name': 'cliente1', 'address': 'dir', 'email': 'test@gmail.com',
                                'phone': '3022232'}}
        self.provider = {'data': {'id': '1234', 'name': 'provider1', 'address': 'dir', 'email': 'test@gmail.com',
                                  'phone': '3022232'}}
        self.product = {'data': {'id': '1234', 'description': 'play station', 'price': '3000000'}}

        self.invoice = {"data": {
            "provider": "1234",
            "date": "25-9-2020",
            "value": 3000000,
            "productos": [
                {
                    "id": "1",
                    "quantity": "5",
                    "price": "3000000"
                }
            ]
        }
        }

    def get_token(self):
        credentials = {"user": "user", "password": "user"}
        resp = requests.post(self.url + "/login", data=credentials)
        access = json.loads(resp.text)
        self.header['Authorization'] = access['access_token']

    @ordered
    def test_login(self):
        credentials = {"user": "user", "password": "user"}
        resp = requests.post(self.url + "/login", data=credentials)
        self.assertEqual(resp.status_code, 200)

    # ----------Clientes--------#

    # crear un cliente
    @ordered
    def test_client_create(self):
        self.get_token()
        resp = requests.post(self.url + "/clientes", json=self.client, headers=self.header)
        self.assertEqual(resp.status_code, 201)

    # listar clientes
    @ordered
    def test_client_list(self):
        self.get_token()
        resp = requests.get(self.url + "/clienteslist", headers=self.header)
        self.assertEqual(resp.status_code, 200)

    # actualizar un cliente
    @ordered
    def test_client_update(self):
        self.get_token()
        resp = requests.put(self.url + "/clientes", json=self.client, headers=self.header)
        self.assertEqual(resp.status_code, 201)

    # obtener el cliente creado
    @ordered
    def test_client(self):
        self.get_token()
        resp = requests.get(self.url + "/clientes/1678", headers=self.header)
        self.assertEqual(resp.status_code, 200)

    # borrar un cliente
    @ordered
    def test_client_delete(self):
        self.get_token()
        resp = requests.delete(self.url + "/clientes/1678", headers=self.header)
        self.assertEqual(resp.status_code, 200)

    # ----------Proveedor--------#
    # crear un proveedor
    @ordered
    def test_provider_create(self):
        self.get_token()
        resp = requests.post(self.url + "/proveedores", json=self.provider, headers=self.header)
        self.assertEqual(resp.status_code, 201)

    # listar proveedor
    @ordered
    def test_provider_list(self):
        self.get_token()
        resp = requests.get(self.url + "/proveedoreslist", headers=self.header)
        self.assertEqual(resp.status_code, 200)

    # actualizar un proveedor
    @ordered
    def test_provider_update(self):
        self.get_token()
        resp = requests.put(self.url + "/proveedores", json=self.provider, headers=self.header)
        self.assertEqual(resp.status_code, 201)

    # obtener el proveedor creado
    @ordered
    def test_provider(self):
        self.get_token()
        resp = requests.get(self.url + "/proveedores/1234", headers=self.header)
        self.assertEqual(resp.status_code, 200)

    # ----------producto--------#
    # crear un producto
    @ordered
    def test_product_create(self):
        self.get_token()
        resp = requests.post(self.url + "/productos", json=self.product, headers=self.header)
        self.assertEqual(resp.status_code, 201)

    # listar producto
    @ordered
    def test_product_list(self):
        self.get_token()
        resp = requests.get(self.url + "/productoslist", headers=self.header)
        self.assertEqual(resp.status_code, 200)

    # actualizar un producto
    @ordered
    def test_product_update(self):
        self.get_token()
        resp = requests.put(self.url + "/productos", json=self.product, headers=self.header)
        self.assertEqual(resp.status_code, 201)

    # obtener el producto creado
    @ordered
    def test_product(self):
        self.get_token()
        resp = requests.get(self.url + "/productos/1234", headers=self.header)
        self.assertEqual(resp.status_code, 200)

    ############crear factura##################

    @ordered
    def test_invoice(self):
        self.get_token()
        resp = requests.post(self.url + "/factura", json=self.invoice, headers=self.header)
        self.assertEqual(resp.status_code, 201)

    #####borrar el producto y el proveedor######
    # borrar la factura creada
    @ordered
    def test_invoice_delete(self):
        self.get_token()
        resp = requests.delete(self.url + "/factura/1", headers=self.header)
        self.assertEqual(resp.status_code, 202)

    # borrar el proveedor creado
    @ordered
    def test_provider_delete(self):
        self.get_token()
        resp = requests.delete(self.url + "/proveedores/1234", headers=self.header)
        self.assertEqual(resp.status_code, 202)

    # borrar el producto creado
    @ordered
    def test_product_delete(self):
        self.get_token()
        resp = requests.delete(self.url + "/productos/1234", headers=self.header)
        self.assertEqual(resp.status_code, 202)


if __name__ == '__main__':
    unittest.main()
