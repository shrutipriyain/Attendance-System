import base64
from flask import Flask, request, render_template, jsonify



app = Flask(__name__)

def create_image(encoded_data):
    decoded_data=base64.b64decode((encoded_data))
    #write the decoded data back to original format in  file
    img_file = open('image.png', 'wb')
    img_file.write(decoded_data)
    img_file.close()

@app.route('/')
def index():
    return render_template("webcam.html")


@app.route('/register', methods = ['GET', 'POST'])
def register_student():
    if request.method == 'POST':
        print("post req ")
        print(request.form['image'])
        response = jsonify(message="Registered successfully")
        response.headers.add("Access-Control-Allow-Origin", "*")
        create_image(request.form['image'])
        return response
        

app.run(port = 5500, debug = True)