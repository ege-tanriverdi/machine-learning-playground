from fastapi import APIRouter, UploadFile, File, HTTPException
import pandas as pd
from io import StringIO

from sklearn.model_selection import train_test_split
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix,
)

from sklearn.neighbors import KNeighborsClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import GaussianNB


router = APIRouter()


# -----------------------------------------------------------
# CSV READER
# -----------------------------------------------------------

def read_csv(file: UploadFile):

    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="File must be CSV")

    content = file.file.read()

    try:
        df = pd.read_csv(StringIO(content.decode("utf-8")))
    except:
        raise HTTPException(status_code=400, detail="Invalid CSV format")

    if df.shape[1] < 2:
        raise HTTPException(status_code=400, detail="Dataset must contain features and target")

    return df


# -----------------------------------------------------------
# DATA PREPROCESS
# -----------------------------------------------------------

def preprocess(df):

    X = df.iloc[:, :-1]
    y = df.iloc[:, -1]

    # categorical encoding
    X = pd.get_dummies(X)

    return train_test_split(X, y, test_size=0.2, random_state=42)


# -----------------------------------------------------------
# METRICS
# -----------------------------------------------------------

def evaluate_model(model, X_test, y_test):

    predictions = model.predict(X_test)

    accuracy = accuracy_score(y_test, predictions)
    precision = precision_score(y_test, predictions, average="weighted", zero_division=0)
    recall = recall_score(y_test, predictions, average="weighted", zero_division=0)
    f1 = f1_score(y_test, predictions, average="weighted", zero_division=0)

    cm = confusion_matrix(y_test, predictions)

    return accuracy, precision, recall, f1, cm


# -----------------------------------------------------------
# DATASET PREVIEW
# -----------------------------------------------------------

@router.post("/preview-csv")
def preview_dataset(file: UploadFile = File(...)):

    df = read_csv(file)

    return {
        "rows": int(df.shape[0]),
        "columns": df.columns.tolist(),
        "preview": df.head(10).values.tolist()
    }


# -----------------------------------------------------------
# SINGLE MODEL TRAINING
# -----------------------------------------------------------

def run_model(df, model):
    X_train, X_test, y_train, y_test = preprocess(df)

    model.fit(X_train, y_train)

    accuracy, precision, recall, f1, cm = evaluate_model(model, X_test, y_test)

    labels = sorted([str(label) for label in pd.Series(df.iloc[:, -1]).unique().tolist()])

    return {
        "rows": int(df.shape[0]),
        "columns": int(df.shape[1]),
        "class_count": int(df.iloc[:, -1].nunique()),
        "accuracy": round(accuracy, 4),
        "precision": round(precision, 4),
        "recall": round(recall, 4),
        "f1": round(f1, 4),
        "labels": labels,
        "confusion_matrix": cm.tolist(),
    }


# -----------------------------------------------------------
# ALGORITHM ENDPOINTS
# -----------------------------------------------------------

@router.post("/knn-csv")
def knn_csv(file: UploadFile = File(...)):
    df = read_csv(file)
    return run_model(df, KNeighborsClassifier())


@router.post("/random-forest-csv")
def random_forest_csv(file: UploadFile = File(...)):
    df = read_csv(file)
    return run_model(df, RandomForestClassifier())


@router.post("/svm-csv")
def svm_csv(file: UploadFile = File(...)):
    df = read_csv(file)
    return run_model(df, SVC())


@router.post("/decision-tree-csv")
def decision_tree_csv(file: UploadFile = File(...)):
    df = read_csv(file)
    return run_model(df, DecisionTreeClassifier())


@router.post("/logistic-regression-csv")
def logistic_regression_csv(file: UploadFile = File(...)):
    df = read_csv(file)
    return run_model(df, LogisticRegression(max_iter=1000))


@router.post("/naive-bayes-csv")
def naive_bayes_csv(file: UploadFile = File(...)):
    df = read_csv(file)
    return run_model(df, GaussianNB())


# -----------------------------------------------------------
# COMPARE ALL MODELS
# -----------------------------------------------------------

@router.post("/compare-csv")
def compare_models(file: UploadFile = File(...)):

    df = read_csv(file)

    X_train, X_test, y_train, y_test = preprocess(df)

    models = {
        "KNN": KNeighborsClassifier(),
        "Random Forest": RandomForestClassifier(),
        "SVM": SVC(),
        "Decision Tree": DecisionTreeClassifier(),
        "Logistic Regression": LogisticRegression(max_iter=1000),
        "Naive Bayes": GaussianNB(),
    }

    results = []

    for name, model in models.items():

        model.fit(X_train, y_train)

        accuracy, precision, recall, f1, _ = evaluate_model(model, X_test, y_test)

        results.append({
            "algorithm": name,
            "accuracy": round(accuracy, 4),
            "precision": round(precision, 4),
            "recall": round(recall, 4),
            "f1": round(f1, 4)
        })

    # sort best model first
    results = sorted(results, key=lambda x: x["accuracy"], reverse=True)

    return {
        "rows": int(df.shape[0]),
        "columns": int(df.shape[1]),
        "class_count": int(df.iloc[:, -1].nunique()),
        "results": results
    }