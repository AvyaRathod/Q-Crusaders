from transformers import pipeline
import pandas as pd

def HistoryFunc():
    classifier = pipeline("text-classification", model="Souvikcmsa/BERT_sentiment_analysis")
    df = pd.read_csv('last_50_urls.csv', encoding='utf-8')
    df['Title_N'] = df['Title'].apply(lambda title: classifier(title)[0]['label'])  # Apply classifier to each title
    
    negative_rows = df[df['Title_N'] == 'negative']
    
    mode_value = df['Title_N'].mode()[0]
    print(f"Overall feeling is {mode_value}!!")
    
    if mode_value == 'neutral':
        print("\nBeing neutral is important as it fosters impartiality, encourages balanced understanding, and promotes informed decision-making by minimizing biases and preconceptions.\n")
    elif mode_value == 'positive':
        print("The importance of being positive lies in its ability to foster resilience, improve well-being, and cultivate constructive perspectives, which collectively contribute to personal growth, enhanced relationships, and the capacity to navigate challenges with optimism.")
    
    if len(negative_rows) > 0:
        print("Recent Negative Searches Found - ")
        for title in negative_rows['Title']:
            print(title)
    
    return mode_value
