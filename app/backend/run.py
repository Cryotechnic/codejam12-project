from flask import Flask, render_template, redirect, request, url_for, json
import openai
from flask_cors import CORS
# import os
from pathlib import Path

openai.api_key = "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"
app = Flask(__name__)
CORS(app)


def local_job_data():
    SITE_ROOT = Path("./templates/data.json")
    data = json.load(open(SITE_ROOT))
    return data

data = local_job_data()

@app.route('/')
def index():
    return "Hello World"


@app.route('/selected_job', methods=['POST'])
def selected_job():
    id = request.get_json()['id']
    
    json_file = json.load(open(Path("./templates/data.json")))
    jobs = json_file['jobs']

    for job in jobs:
        if job['job_id'] == id:
            global job_profile
            job_profile = job
            break
    
    print(job_profile)
    print("\n\n")

    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

@app.route('/generate_response', methods=['GET'])
def generate_response():
    global job_profile
    job_id = job_profile['job_id']
    job_title = job_profile['job_title']
    job_company = job_profile['job_company']
    job_description = job_profile['job_description']
    job_skills = job_profile['job_skills']
    
    
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
    # response_str = response_str.replace('1.', '').replace('2.', '').replace('3.', '').replace('4.', '').replace('5.', '').replace('6.', '').replace('7.', '').replace('8.', '')
    response_ls = response_str.splitlines()
    response_ls = [x.strip() for x in response_ls]
    print(f"\n\nresponse_ls: {response_ls}")
    # replace all single quotes with double quotes
    response_ls = [x.replace("'", '"') for x in response_ls]
    # print(f"response_ls: {response_ls[3]}")
    
    # return render_template('index.html', response=response_ls)
    # delete any null or empty strings
    response_ls = [x for x in response_ls if x]
    print('\n\n')
    for response in response_ls:
        print(f"response: {response}")
    return response_ls

@app.route('/job_data', methods=['GET'])
def get_job_data():
    return data