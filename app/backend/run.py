from flask import Flask, render_template, redirect, url_for, json
import openai
from flask_cors import CORS
# import os
from pathlib import Path

openai.api_key = "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"
app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return "Hello World"

@app.route('/generate_response', methods=['GET'])
def generate_response():
    # openai request
    response = openai.Completion.create(
      model="text-curie-001",
      prompt="Create a list of 8 questions for my interview with a C++ software engineer and format it as a Python list:",
      temperature=0.9,
      max_tokens=150,
      top_p=1,
      frequency_penalty=0.0,
      presence_penalty=0.6,
      stop=[" Human:", " AI:"]
    )
    response_str = response['choices'][0]['text']
    # remove  1., 2., 3., 4., 5., 6., 7., 8. from response
    response_str = response_str.replace('1.', '').replace('2.', '').replace('3.', '').replace('4.', '').replace('5.', '').replace('6.', '').replace('7.', '').replace('8.', '')
    response_ls = response_str.splitlines()
    response_ls = [x.strip() for x in response_ls]
    print(f"response_ls: {response_ls}")
    # replace all single quotes with double quotes
    response_ls = [x.replace("'", '"') for x in response_ls]
    print(f"response_ls: {response_ls[3]}")
    for response in response_ls:
        print(f"response: {response}")
    # return render_template('index.html', response=response_ls)
    # delete any null or empty strings
    response_ls = [x for x in response_ls if x]
    return response_ls

@app.route('/job_data', methods=['GET'])
def get_job_data():
    SITE_ROOT = Path("./templates/data.json")
    data = json.load(open(SITE_ROOT))
    return data