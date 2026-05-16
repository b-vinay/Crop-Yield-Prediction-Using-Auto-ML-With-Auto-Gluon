import pandas as pd
import os

datasets = ['crop_production.csv', 'fertilizer_prediction.csv', 'rainfall_1901_2015.csv', 'rainfall_district.csv', 'weatherHistory.csv']

with open('output.txt', 'w') as f:
    for d in datasets:
        try:
            df = pd.read_csv(os.path.join("datasets", d), nrows=1)
            f.write(f"--- {d} ---\n")
            f.write(str(df.columns.tolist()) + "\n")
        except Exception as e:
            f.write(f"Error reading {d}: {e}\n")
