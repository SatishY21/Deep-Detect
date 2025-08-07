import os
from io import BytesIO
from functools import lru_cache

import numpy as np
import tensorflow as tf
from fastapi import FastAPI, File, UploadFile
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from PIL import Image

# Suppress TensorFlow warnings
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"

# Optimize TensorFlow memory usage
physical_devices = tf.config.list_physical_devices("GPU")
if physical_devices:
    tf.config.experimental.set_memory_growth(physical_devices[0], True)

# Initialize FastAPI app
app = FastAPI()

@lru_cache(maxsize=1)
def get_model():
    """Lazy load the deepfake detector model."""
    return load_model("deepfake_detector.h5")

def preprocess_image(file: bytes):
    """Convert uploaded image into a format suitable for the model."""
    img = Image.open(BytesIO(file))  # Open image from binary data
    img = img.resize((128, 128))  # Resize to match model input size
    img_array = image.img_to_array(img) / 255.0  # Normalize pixel values
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    return img_array


@app.get("/")
async def root():
    return {"message": "Welcome to the Deepfake Detector API!"}



@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    """API endpoint to predict if an image is deepfake or real."""
    try:
        # Read and preprocess the image
        contents = await file.read()
        img_array = preprocess_image(contents)

        # Load model lazily
        model = get_model()
        prediction = model.predict(img_array)

        # Interpret results
        result = "Fake" if prediction[0][0] < 0.5 else "Real"

        return {
            "filename": file.filename,
            "prediction": result,
            "confidence": float(prediction[0][0])  # Convert numpy float to Python float
        }
    except Exception as e:
        return {"error": str(e)}
