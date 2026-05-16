from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
from autogluon.tabular import TabularPredictor
import os
import random
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Crop Yield Prediction API with Auth")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Simulated Database for OTPs
OTP_DB = {}

model_path = os.path.join(os.path.dirname(__file__), 'ag_model')
try:
    predictor = TabularPredictor.load(model_path)
    print("AutoGluon model loaded successfully.")
except Exception as e:
    predictor = None
    print(f"Warning: Model could not be loaded. ({e})")

class PredictionRequest(BaseModel):
    crop_name: str
    crop_variety: str
    season: str
    month_period: str
    cultivation_practices: str
    fertilizers: float
    water_supply: str
    soil_type: str
    state: str
    soil_fertility: str
    rainfall: float

class AuthRequest(BaseModel):
    contact: str  # phone or email
    
class VerifyRequest(BaseModel):
    contact: str
    otp: str

@app.post("/auth/request-otp")
async def request_otp(req: AuthRequest):
    code = "1234" # Hardcoded for demo/testing purposes
    OTP_DB[req.contact] = code
    
    # SIMULATING SENDING SMS/EMAIL
    print(f"\n======================================")
    print(f"📲 MOCK SMS/EMAIL SENT TO: {req.contact}")
    print(f"🔑 Your Auth Code is: {code} (Using 1234 for demo)")
    print(f"======================================\n")
    
    return {"message": "OTP sent successfully. Standard testing code is 1234."}

@app.post("/auth/verify-otp")
async def verify_otp(req: VerifyRequest):
    if req.contact not in OTP_DB:
        raise HTTPException(status_code=400, detail="No OTP requested for this contact.")
    
    if OTP_DB[req.contact] == req.otp:
        # Clear OTP after successful use
        del OTP_DB[req.contact]
        return {"message": "Authentication successful", "token": "mock-jwt-token-73892"}
    else:
        raise HTTPException(status_code=400, detail="Invalid OTP code.")


@app.post("/predict")
async def predict_yield(request: PredictionRequest):
    if predictor is None:
        raise HTTPException(status_code=500, detail="Model is not trained or loaded.")
    
    input_data = pd.DataFrame([request.model_dump()])
    
    try:
        prediction = predictor.predict(input_data)
        yield_val = float(prediction.iloc[0])
        return {"yield_prediction": round(yield_val, 2), "status": "success"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
