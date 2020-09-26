from backend import app
from backend import db
from backend  import api
from backend.endpoints import add_api


db.create_all()
add_api(api)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
    #app.run(debug=True)
