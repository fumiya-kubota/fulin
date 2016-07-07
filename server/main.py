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
    _, input_path = mkstemp(dir=os.path.curdir, suffix='.txt')
    with open(input_path, 'w') as fp:
        data = request.get_data()
        data = str(data, encoding='utf-8')
        fp.write(data)

    _, output_path = mkstemp(dir=os.path.curdir, suffix='.json')
    with open(output_path, 'wb') as fp:
        subprocess.Popen(
            ['../node_modules/textlint/bin/textlint.js', input_path, '--format', 'json'],
            stdout=fp
        ).communicate()
    os.remove(input_path)
    output = json.load(open(output_path))
    os.remove(output_path)
    output = output[0]
    return json.dumps(output['messages'])


if __name__ == "__main__":
    app.run(host='0.0.0.0')
