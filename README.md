# Machine Learning Playground (MLP)

An interactive web-based playground for experimenting with machine learning algorithms using custom CSV datasets.

Upload a dataset, train ML models, compare results and visualize performance instantly in a modern interface.

---

# Demo Overview

Machine Learning Playground allows users to quickly test machine learning models without writing code.

Workflow:

Upload Dataset  
↓  
Preview Dataset  
↓  
Train Models  
↓  
Compare Algorithms  
↓  
Visualize Results  
↓  
Download Results

---

# Features

Dataset Upload  
Upload CSV datasets directly from your browser.

Dataset Preview  
Inspect the first rows of the dataset before running experiments.

Single Model Experiment  
Run individual ML algorithms on your dataset.

Model Comparison  
Run multiple models and compare their performance.

Advanced Metrics  
Accuracy  
Precision  
Recall  
F1 Score  

Confusion Matrix  
Visualize model predictions against actual values.

Model Ranking  
Automatically highlight the best performing model.

Accuracy Visualization  
Compare model performance in a visual ranking.

Download Results  
Export experiment results as CSV.

Modern UI  
Clean dark UI built with TailwindCSS.

---

# Supported Algorithms

The playground currently supports the following classification algorithms:

K-Nearest Neighbors (KNN)  
Random Forest  
Support Vector Machine (SVM)  
Decision Tree  
Logistic Regression  
Naive Bayes  

All algorithms are implemented using **scikit-learn**.

---

# Tech Stack

Frontend

Next.js  
React  
TailwindCSS  

Backend

FastAPI  
scikit-learn  
pandas  

---

# Project Architecture


Frontend (Next.js)

CSV Upload
Dataset Preview
Model Controls
Visualization UI

↓

Backend API (FastAPI)

CSV Processing
Data Preprocessing
Model Training
Metric Calculation

↓

Machine Learning Layer

scikit-learn Algorithms


---

# Project Structure


MLP
│
├── backend
│ ├── app
│ │ ├── main.py
│ │ └── routes
│ │ └── predict.py
│ └── venv
│
└── frontend
├── app
│ ├── page.tsx
│ └── playground
│ └── page.tsx
└── package.json


---

# API Endpoints


POST /preview-csv
POST /knn-csv
POST /random-forest-csv
POST /svm-csv
POST /decision-tree-csv
POST /logistic-regression-csv
POST /naive-bayes-csv
POST /compare-csv


---

# Running Locally

## Backend


cd backend

.\venv\Scripts\activate

python -m uvicorn app.main:app --reload


Backend will run at:


http://127.0.0.1:8000


API documentation:


http://127.0.0.1:8000/docs


---

## Frontend


cd frontend

npm install

npm run dev


Frontend will run at:


http://localhost:3000


---

# Why This Project?

Machine Learning Playground demonstrates:

Full-stack ML tool development  
API design with FastAPI  
Machine learning integration using scikit-learn  
Data preprocessing workflows  
Interactive data visualization UI  
Modern frontend architecture using Next.js

This project combines **machine learning workflows and modern web development** into a single interactive tool.

---

# Future Improvements

Hyperparameter tuning panel  
Regression algorithms  
Model persistence and export  
Dataset statistics dashboard  
Interactive charts

---

# Author

Ege Tanrıverdi
GitHub profile: [ege-tanriverdi](https://github.com/kullaniciadin)

Machine Learning Playground Project