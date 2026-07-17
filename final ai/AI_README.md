# ReturnShield AI - AI Integration Guide

## Overview

This document explains how to integrate the ReturnShield AI model with the backend.

The backend only needs to import **one function**:

```python
from predictor import predict_return
```

The backend does NOT need to know anything about preprocessing, feature engineering, encoding, scaling, or model loading.

---

# AI Workflow

Frontend
↓

Employee enters Order ID

↓

Backend fetches order from CSV

↓

Employee edits order details (if required)

↓

Backend sends edited order dictionary to AI

↓

AI returns prediction JSON

↓

Backend sends JSON to Frontend

---

# Function

```python
predict_return(order)
```

Input:

- Python Dictionary

Output:

- Python Dictionary (Prediction JSON)

---

# Required Input

The AI expects **15 input features**.

```python
{
    "Product_Category": "Electronics",
    "Product_Price": 75000,
    "Order_Quantity": 1,
    "User_Age": 25,
    "User_Gender": "Male",
    "User_Location": "Delhi",
    "Payment_Method": "Credit Card",
    "Shipping_Method": "Express",
    "Discount_Applied": 40,
    "Seller_Rating": 2.8,
    "Product_Rating": 2.5,
    "Previous_Returns": 6,
    "Customer_Type": "Returning",
    "Product_Review_Count": 12,
    "Order_Value": 75000
}
```

---

# Important Notes

Do NOT send:

```python
Order_ID
```

The backend should use Order_ID only to fetch data from the CSV.

After fetching, remove Order_ID before calling:

```python
result = predict_return(order)
```

---

# Expected Output

```python
{
    "Prediction": {

        "Status": "Returned",

        "Probability": "95.0%",

        "Risk Level": "High"

    },

    "Estimated Revenue Impact": {

        "Order Value": "₹75,000.00",

        "Revenue at Risk": "₹71,250.00",

        "Estimated Net Loss": "₹14,250.00"

    },

    "Recommendation": "High Return Risk - Immediate Review Required",

    "Key Risk Factors": [

        "Low product rating",

        "Customer has many previous returns",

        "Seller rating is below average",

        "Heavy discount may encourage impulse purchases",

        "High-value products are often returned after careful evaluation",

        "Limited customer reviews increase purchase uncertainty"

    ]
}
```

---

# Required AI Files

```
AI/

predictor.py

models/

    returnshield_model.pkl

    preprocessor.pkl

    label_encoder.pkl

    feature_names.pkl

    original_features.pkl
```

Do NOT modify or rename these files.

---

# Required Python Libraries

```
pandas

numpy

joblib

scikit-learn
```

Install using:

```bash
pip install pandas numpy joblib scikit-learn
```

---

# Integration Example

```python
from predictor import predict_return

order = {

    "Product_Category":"Electronics",

    "Product_Price":75000,

    "Order_Quantity":1,

    "User_Age":25,

    "User_Gender":"Male",

    "User_Location":"Delhi",

    "Payment_Method":"Credit Card",

    "Shipping_Method":"Express",

    "Discount_Applied":40,

    "Seller_Rating":2.8,

    "Product_Rating":2.5,

    "Previous_Returns":6,

    "Customer_Type":"Returning",

    "Product_Review_Count":12,

    "Order_Value":75000

}

result = predict_return(order)

print(result)
```

---

# Backend Integration Flow

```
Frontend

↓

Order ID

↓

Backend

↓

Search CSV

↓

Order Details

↓

Employee edits details

↓

predict_return(order)

↓

Prediction JSON

↓

Frontend displays result
```

---

# Responsibility Split

### AI Team

- Train model
- Save model
- Load model
- Preprocess data
- Generate prediction
- Generate recommendations
- Calculate financial impact
- Return JSON

### Backend Team

- Search Order ID
- Fetch order from CSV
- Send edited order to AI
- Receive prediction JSON
- Send response to frontend

### Frontend Team

- Order ID search page
- Display order details
- Allow editing
- Display AI prediction
- Display recommendations
- Display revenue impact

---

# Contact

If prediction errors occur due to invalid input format or missing fields, contact the AI team.