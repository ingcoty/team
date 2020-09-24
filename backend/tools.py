from flask_restful.reqparse import RequestParser


def parse(*args):
    """Build the request parser."""
    parser = RequestParser()
    for arg in args:
        parser.add_argument(arg)
    return parser
