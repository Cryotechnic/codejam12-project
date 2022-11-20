from flask import Flask, render_template, redirect, request, url_for, json
import openai
from flask_cors import CORS
import spacy
nlp = spacy.load("en_core_web_sm")
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
    job_title = job_profile['job_title']
    job_company = job_profile['job_company']

    keywords = job_profile['keywords']
    # make keywords into a comma separated string
    keywords = ", ".join(keywords)
    
    mainPrompt = f"Using the keywords {keywords} create a list of 8 questions that would be asked to a software engineer during a job interview and format it as a Python list:"
    workWithUsPrompt = f"9. Why should we hire you for the {job_title} position at {job_company}?"
    whyCompanyPrompt = f"10. Why do you want to work at {job_company}?"
    
    response = openai.Completion.create(
      model="text-curie-001",
      prompt=mainPrompt,
      temperature=0.9,
      max_tokens=150,
      top_p=1,
      frequency_penalty=0.0,
      presence_penalty=0.6,
      stop=[" Human:", " AI:"]
    )
    response_str = response['choices'][0]['text']
    response_ls = response_str.splitlines()
    response_ls = [x.strip() for x in response_ls]
    response_ls = [x.replace("'", '"') for x in response_ls]
    response_ls = [x for x in response_ls if x]
    print('\n\n')
    response_ls.append(workWithUsPrompt)
    response_ls.append(whyCompanyPrompt)
    for response in response_ls:
        print(f"response: {response}")
    return response_ls

@app.route('/job_data', methods=['GET'])
def get_job_data():
    return data