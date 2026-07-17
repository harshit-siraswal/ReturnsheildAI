import pandas as pd
import joblib

# =====================================
# Load Saved Objects
# =====================================

preprocessor = joblib.load("../models/preprocessor.pkl")

label_encoder = joblib.load("../models/label_encoder.pkl")

feature_names = joblib.load("../models/feature_names.pkl")

model = joblib.load("../models/returnshield_model.pkl")


# =====================================
# Risk Level Function
# =====================================

def get_risk_level(probability):

    if probability < 0.30:
        return "Low"

    elif probability < 0.70:
        return "Medium"

    else:
        return "High"


# =====================================
# Reason Generator
# =====================================

def generate_reasons(order):

    reasons = []

    if order["Product_Rating"] < 3.5:
        reasons.append("Low product rating")

    if order["Previous_Returns"] >= 5:
        reasons.append("Customer has many previous returns")

    if order["Seller_Rating"] < 3.8:
        reasons.append("Seller rating is below average")

    if order["Discount_Applied"] >= 30:
        reasons.append("Heavy discount may encourage impulse purchases")

    if order["Order_Value"] >= 50000:
        reasons.append("High-value products are often returned after careful evaluation")

    if order["Product_Review_Count"] < 20:
        reasons.append("Limited customer reviews increase purchase uncertainty")

    if len(reasons) == 0:
        reasons.append("No significant return risk factors detected.")

    return reasons

def get_recommendation(prediction, probability, order):

    if prediction == "Returned":

        if probability >= 80:
            return "Return Risk High - Flag for Review"

        return "Manual Verification Recommended"

    else:

        if (
            order["Seller_Rating"] < 3.5 or
            order["Discount_Applied"] >= 50 or
            order["Previous_Returns"] >= 5
        ):
            return "Manual Verification Recommended"

        return "No Action Required"

def calculate_revenue_impact(order, probability):

    order_value = order["Order_Value"]

    revenue_at_risk = order_value * probability

    estimated_net_loss = revenue_at_risk * 0.20

    return {
        "Order Value": f"₹{order_value:,.2f}",
        "Revenue at Risk": f"₹{revenue_at_risk:,.2f}",
        "Estimated Net Loss": f"₹{estimated_net_loss:,.2f}"
    }

# =====================================
# Main Prediction Function
# =====================================

def predict_return(order):

    # Convert dictionary to DataFrame
    order_df = pd.DataFrame([order])

    # Apply preprocessing
    order_processed = preprocessor.transform(order_df)

    # Convert back to DataFrame
    order_processed = pd.DataFrame(
        order_processed,
        columns=feature_names
    )

    # Prediction
    prediction = model.predict(order_processed)[0]

    # Probability
    probability = model.predict_proba(order_processed)[0][1]

    # Convert label
    prediction_label = label_encoder.inverse_transform([prediction])[0]

    # Risk Level
    risk_level = get_risk_level(probability)

    # Recommendation
    recommendation = get_recommendation(
        prediction_label,
        probability,
        order
    )

    revenue_impact = calculate_revenue_impact(
    order,
    probability
    )

    # Reasons
    if prediction_label == "Returned":
        reasons = generate_reasons(order)
    else:
        reasons = ["No significant return risk factors detected."]

    return {

        "Prediction": {

            "Status": prediction_label,

            "Probability": f"{round(probability * 100, 2)}%",

            "Risk Level": risk_level

        },

        "Estimated Revenue Impact": revenue_impact,
        "Key Risk Factors": reasons,
        "Recommendation": recommendation

    }