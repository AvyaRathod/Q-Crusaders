
from threading import Thread
from flask import Flask, jsonify, request, render_template, redirect, url_for
import firebase_admin
from firebase_admin import credentials, firestore, initialize_app
import random
from datetime import date
from pri import HistoryFunc
from summariz import Summarize
from create_a_gpt_chatbot import ChatbotSummary
from opencv.emotions import emotion_cv

app = Flask(__name__)

cred = credentials.Certificate("qproject-581a8-firebase-adminsdk-4ooj0-d87dad6292.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
todo_ref = db.collection('test1')

@app.route("/admin")
def Analyze():
    SendingFile = []
    Documents = todo_ref.stream()
    for doc in Documents:
        SendingFile.append(doc.to_dict())
    response = jsonify({'doc':SendingFile})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

def SaveFireStore(key, feedback):
    with app.test_request_context():
        emotion = emotion_cv()
        #emotion = ""
        CompanyImprovs = ChatbotSummary(feedback)
        #CompanyImprovs = "Feedback Disabled For now Comment it out for true feedback"
        # mode = HistoryFunc()
        mode = "neutral"
        summary = Summarize(feedback)
        #summary = ""
        todo_ref.document(key).set({'id':key, 'feedback': feedback, 
                                    'summary': summary, 
                                    'companyImps': CompanyImprovs,
                                    'emotion': emotion,
                                    'History': mode,
                                    'date': str(date.today())})
    
    

@app.route("/feedback", methods = ['POST'])
def FeedBack():
    if(request.method == 'POST'):
        key = request.form.get('id')
        print(key)  
        if(todo_ref.document(key).get().to_dict() == None):
            print(todo_ref.document(key).get().to_dict())
            Thread(target = SaveFireStore, args = (key, request.form.get('feedback'))).start()
        else:
            if(todo_ref.document(key).get().to_dict()['date'] == str(date.today())):
                print("Date Matched")
            else:
                print(todo_ref.document(key).get().to_dict()['date'])
                Thread(target = SaveFireStore, args = (key, request.form.get('feedback'))).start()
        
        #return jsonify({'result': Funcer()})
        return redirect("http://localhost:3000/thankyou")
    
    
    
    