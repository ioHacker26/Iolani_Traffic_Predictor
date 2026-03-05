import pandas as pd
import numpy as np

from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_squared_error

df = pd.read_csv("hawaii_school_driveway_2026_01_21_7_00_7_10_67_cars.csv")

df.head()

df["wait_time_sec"] = df["leave_time_unix"] - df["enter_time_unix"]

df.head()

enter_dt = pd.to_datetime(df["enter_time_unix"], unit="s", utc=True)
enter_dt = enter_dt.dt.tz_convert("Pacific/Honolulu")

middy = enter_dt.dt.normalize()

middy_unix = middy.astype("int64") // 10**9

df["seconds_since_middy"] = df["enter_time_unix"] - middy_unix

df[["enter_time_unix", "seconds_since_middy"]].head()

X = df[["seconds_since_middy"]]
y = df["wait_time_sec"]


X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42
)


iluvBraden = GradientBoostingRegressor(
    n_estimators=200,
    learning_rate=0.05,
    max_depth=3,
    random_state=41
)

iluvBraden.fit(X_train, y_train)

preds = iluvBraden.predict(X_test)

mae = mean_absolute_error(y_test, preds)
rmse = np.sqrt(mean_squared_error(y_test, preds))

print("MAE (sec):", round(mae, 2))
print("RMSE (sec):", round(rmse, 2))


# 7:06 am
new_time = 7 * 3600 + 6 * 60

prediction = iluvBraden.predict([[new_time]])

print("Predicted wait time (seconds):", round(prediction[0], 2))
