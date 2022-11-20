# codejam12-project

## How to Set up
1. Clone the project and make sure you have created a virtual environment.
2. pip install -r requirements.txt
3. cd into the app directory and run npm install
4. cd into the backend directory and run flask run
5. cd back into app and run npm start
6. Open localhost:3000 and enjoy our app
7. Note: To use OPENAI you do need an API key, thus the chatbot will not work unless you have it.

## Inspiration
What inspired us to do this is the ever-increasing needs of IT companies needing to manage a large bank of candidates and ensure that they are qualified and the right person for the job. JobSmart attempts to solve the bottleneck of extra delay being added for interviewing potential candidates by introducing a one-of-a-kind platform for the employees to interview for the job opening they would like to apply for.

## What it does
Allows companies to post their job openings and applicants to apply to these jobs. When applicants apply to a job, our engine reads the job description and generates high quality interview questions accordingly. The applicants responses are then sent back to our engine in which an analysis is performed. This analysis can then be sent to the employer to allow them to make a decision.

## How we built it
The frontend client was built using React.js. It fetches all the data it needs from our backend which is built using Flask. All the previously mentioned analyses, as well as API calls are done from our backend.

## Challenges we ran into
Since were all backend guys for the most part, we didn't have much experience with React. Hence, working with all the different types of components as well as styling the application were very tedious for us.

## Accomplishments that we're proud of
Were proud of our chatbot in the frontend. In a very small amount of time, we are happy to say that we were able to implement a fully working chatbot that communicates with our backend engine.

## What we learned
We learned how to use a major JavaScript library in a very short amount of time. We also learned how to use OpenAI to retrieve all the information we needed.