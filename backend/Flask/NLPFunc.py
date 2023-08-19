# -*- coding: utf-8 -*-
"""
Created on Fri Aug 18 14:41:43 2023

@author: prath
"""

from transformers import pipeline
classifier = pipeline("text-classification", model = "Souvikcmsa/BERT_sentiment_analysis")
import pandas as pd
df = pd.read_csv('last_50_urls_with_bennwe.csv', encoding='latin1')
listi = []
df['Title_N'] = df['Title'].apply(classifier).apply(lambda x: x[0]['label'])
def Funcer():
    mode_value = df['Title_N'].mode()[0]
    return f"Overall feeling is {mode_value} !\nBeing neutral is important as it fosters impartiality, encourages balanced understanding, and promotes informed decision-making by minimizing biases and preconceptions."