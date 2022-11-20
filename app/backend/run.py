from flask import Flask, render_template, redirect, request, url_for, json
import openai
from flask_cors import CORS
import spacy
nlp = spacy.load("en_core_web_sm")
import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")
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
    
    mainPrompt = f"Create a list of 8 questions you would ask a software engineer in a job interview at {job_company} for a position as a {job_title}. You can use the following keywords to help you: {keywords}."
    workWithUsPrompt = f"9. Why should we hire you for the {job_title} position at {job_company}?"
    whyCompanyPrompt = f"10. Why do you want to work at {job_company}?"
    
    response = openai.Completion.create(
      model="text-davinci-002",
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
    print(response_ls)
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

@app.route("/analysis", methods=["POST"])
def analysis():
    global job_profile
    job_title = job_profile['job_title']

    data = request.get_json()
    steps = data["steps"]
    values = data["values"]
    print(values)
    
    questions = []
    for i in range(0, len(steps), 2):
        questions.append(steps[i]["message"])
    
    prompts = []
    for x in questions:
        prompts.append(f"What would an ideal candidate for a position as a {job_title} say in response to the following question: {x}?")
    
    expected_responses = []
    for p in prompts:
        while True:
            response = openai.Completion.create(
                model="text-davinci-002",
                prompt=p,
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
            if response_ls:
                break
        expected_responses.append(response_ls)

    
    i = 0
    ln = len(expected_responses)
    percs = []
    for e in expected_responses:
        if i == ln - 1:
            break
        perc = (float(nlp(str(e)).similarity(nlp(str(values[i])))) * 100).__round__(2)

        percs.append(perc)

        i += 1
    sum =0
    for p in percs:
        sum += p
    avg = (sum / len(percs)) + 10.0
    print(f"average similarity: {avg}%")

    with open('analysis.txt', 'w') as f:
        f.write(f"{avg}%")

    return json.dumps({"success": True}), 200, {"ContentType": "application/json"}