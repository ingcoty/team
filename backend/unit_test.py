import unittest
import json
import requests


class BackendTestCase(unittest.TestCase):

    def setUp(self):
        self.url = 'http://localhost:5000'
        self.header = {'content-type': 'application/json'}

    def test_login(self):
        credentials = {"user": "user", "password": "user"}
        resp = requests.post(self.url + "/login", data=json.dumps(credentials), headers=self.header)
        self.assertEqual(str, type(resp.json['access_token']))
        self.assertEqual(resp.status_code, 200)




if __name__ == '__main__':
    unittest.main()
