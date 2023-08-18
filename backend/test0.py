# -*- coding: utf-8 -*-
"""
Created on Thu Aug 17 23:11:17 2023

@author: prath
"""

from flask import Flask, jsonify, request, render_template, redirect, url_for
import firebase_admin
from firebase_admin import credentials, firestore, initialize_app
import random
from datetime import date
#from NLPFunc import Funcer

app = Flask(__name__)

cred = credentials.Certificate("qproject-581a8-firebase-adminsdk-4ooj0-d87dad6292.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
todo_ref = db.collection('test1')

@app.route("/feedback", methods = ['POST'])
def FeedBack():
    if(request.method == 'POST'):
        key = request.form.get('userName')
        if(todo_ref.document(key).get().to_dict() == None):
            print(todo_ref.document(key).get().to_dict())
            todo_ref.document(key).set({'id':key, 'feedback': request.form.get('feedback'), 'date': str(date.today())})
        else:
            if(todo_ref.document(key).get().to_dict()['date'] == str(date.today())):
                print("Date Matched")
            else:
                print(todo_ref.document(key).get().to_dict()['date'])
                todo_ref.document(key).set({'id':key, 'feedback': request.form.get('feedback'), 'date': str(date.today())})
        
        #return jsonify({'result': Funcer()})
        return redirect("http://localhost:3000/thankyou")
    
    
    
    