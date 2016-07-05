from flask import Flask
from flask import request
import subprocess
from tempfile import mkstemp
import os
import json


app = Flask(__name__)


@app.route('/', methods=['GET'])
def root():
    return 'Hello'


@app.route('/', methods=['POST'])
def lint():
    _, file_path = mkstemp(dir=os.path.curdir, suffix='.txt')
    with open(file_path, 'w') as fp:
        data = request.get_data()
        data = str(data, encoding='utf-8')
        fp.write(data)
    output, _ = subprocess.Popen(
        ['../node_modules/textlint/bin/textlint.js', file_path, '--format', 'json'],
        stdout=subprocess.PIPE
    ).communicate()
    os.remove(file_path)

    output = json.loads(str(output, encoding='utf-8'))
    output = output[0]
    return json.dumps(output['messages'])


if __name__ == "__main__":
    app.run(host='0.0.0.0')
