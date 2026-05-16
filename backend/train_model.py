import pandas as pd
import numpy as np
import os
from autogluon.tabular import TabularPredictor

# Set random seed for reproducibility
np.random.seed(42)

def generate_synthetic_data(num_samples=5000):
    """
    Generates a dataset that merges actual crop production data with synthetic features
    matching the 11 advanced input fields requested for the UI.
    """
    parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    crop_df_path = os.path.join(parent_dir, 'datasets', 'crop_production.csv')
    
    if os.path.exists(crop_df_path):
        print("Using crop_production.csv to base our synthetic data.")
        # Load real data and sample it
        base_df = pd.read_csv(crop_df_path).dropna().sample(n=num_samples, replace=True, random_state=42)
        
        # Calculate yield (Yield = Production / Area)
        yield_vals = base_df['Production'] / (base_df['Area'] + 0.001)
        # Cap outliers (95th percentile) to make training stable
        cap_val = yield_vals.quantile(0.95)
        base_df['yield_prediction'] = yield_vals.clip(upper=cap_val)
        
        # Initialize final dataframe
        df_synth = pd.DataFrame()
        df_synth['crop_name'] = base_df['Crop']
        df_synth['state'] = base_df['State_Name']
        df_synth['season'] = base_df['Season'].str.strip()
        df_synth['yield_prediction'] = base_df['yield_prediction']
    else:
        print("Dataset not found, creating fully synthetic base.")
        states = ['Andhra Pradesh', 'Maharashtra', 'Punjab', 'Gujarat', 'Karnataka','Telangana','Tamil Nadu','Kerala','Goa','J&K','Meghalaya','Tripura','Assam','Bihar','Jharkhand']
        crops = ['Rice', 'Wheat', 'Maize', 'Cotton', 'Sugarcane','Groundnut','Sunflower','Soybean','Chickpea','Urad','Jowar','Bajra','Barley','Rapeseed','Turmeric','Potato','Onion','Tomato','Brinjal','Cauliflower']
        seasons = ['Kharif', 'Rabi', 'Whole Year','Zaid']
        
        df_synth = pd.DataFrame()
        df_synth['state'] = np.random.choice(states, num_samples)
        df_synth['crop_name'] = np.random.choice(crops, num_samples)
        df_synth['season'] = np.random.choice(seasons, num_samples)
        df_synth['yield_prediction'] = np.random.uniform(1.0, 10.0, num_samples)

    print("Augmenting missing UI fields synthetically...")
    
    varieties = ['High Yielding', 'Local', 'Hybrid', 'Traditional']
    df_synth['crop_variety'] = np.random.choice(varieties, len(df_synth))
    
    periods = ['Jan-Mar', 'Apr-Jun', 'Jul-Sep', 'Oct-Dec']
    df_synth['month_period'] = np.random.choice(periods, len(df_synth))
    
    practices = ['Organic', 'Conventional', 'Integrated','Hydroponic','Aeroponic','Permaculture',"Staking & Plastic Mulching",
    'Broadcasting & Bio-humus',
    'Paired Row Trench Method',
    'Japanese Transplantation',
    'Organic Manuring & Weeding',
    'Wide Row Planting',
    'Zero Tillage & Mulching',
    'Weed Burial & Soil Loosening',
    'Raised Bed & Drip',
    'Direct Seeded Rice (DSR)',
    'System of Rice Intensification (SRI)',
    'Deep Ploughing & Pest Control',
    'Seed Bed Preparation & Leveling',
    'Leveling & Bio-humus',
    'Ridges and Furrows Method',
    'Weed Burial & Loosening',
    'Ring Pit Method',
    'Laser Land Leveling',
    'Adding Bio-humus',
    'Flat Bed & Weed Burial']
    df_synth['cultivation_practices'] = np.random.choice(practices, len(df_synth))
    
    df_synth['fertilizers'] = np.random.uniform(50, 300, len(df_synth)).round(2)
    
    water_levels = ['Rainfed', 'Irrigated - Well', 'Irrigated - Canal', 'Drip Irrigation','Sprinkler Irrigation']
    df_synth['water_supply'] = np.random.choice(water_levels, len(df_synth))
    
    soils = ['Clay', 'Sandy', 'Loamy', 'Black', 'Red', 'Alluvial','Laterite','Peaty','Saline','Acidic']
    df_synth['soil_type'] = np.random.choice(soils, len(df_synth))
    
    fertility = ['High', 'Medium', 'Low']
    df_synth['soil_fertility'] = np.random.choice(fertility, len(df_synth))
    
    df_synth['rainfall'] = np.random.uniform(300, 2000, len(df_synth)).round(1)
    
    # Add a bit of realistic correlation
    df_synth['yield_prediction'] += df_synth['fertilizers'] * 0.01 
    df_synth['yield_prediction'] += df_synth['rainfall'] * 0.001
    df_synth.loc[df_synth['cultivation_practices'] == 'Organic', 'yield_prediction'] *= 0.8
    df_synth.loc[df_synth['soil_fertility'] == 'High', 'yield_prediction'] *= 1.2
    
    df_synth['yield_prediction'] = df_synth['yield_prediction'].clip(lower=0.1)

    return df_synth

if __name__ == "__main__":
    train_data = generate_synthetic_data(num_samples=5000)
    label = 'yield_prediction'
    
    print(f"Dataset generated with {len(train_data)} samples.")
    print(f"Features: {list(train_data.columns)}")
    print("Training AutoGluon...")
    
    model_path = os.path.join(os.path.dirname(__file__), 'ag_model')
    
    predictor = TabularPredictor(label=label, path=model_path, problem_type='regression').fit(
        train_data, 
        presets='medium_quality', 
        time_limit=180 # Train for up to 3 mins
    )
    
    print(f"Model saved to {model_path}")
    print("Training Complete!")
