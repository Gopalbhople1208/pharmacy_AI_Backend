

import os
import time

from dotenv import load_dotenv
from google import genai

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

client = None

if GEMINI_API_KEY:
    client = genai.Client(api_key=GEMINI_API_KEY)


# Current Gemini models
MODELS = [
    "gemini-3.8-flash",
    "gemini-3.7-flash",
    "gemini-3.6-flash",
    "gemini-3.5-flash",
]


def ask_gemini(prompt: str) -> str:

    if not client:
        return "Gemini API key is not configured."

    last_error = None

    for model in MODELS:

        for attempt in range(2):

            try:

                response = client.models.generate_content(
                    model=model,
                    contents=prompt
                )

                if response.text:
                    return response.text

                return "Gemini returned an empty response."

            except Exception as error:

                last_error = error

                error_text = str(error)

                # Retry temporary 503 errors
                if "503" in error_text or "UNAVAILABLE" in error_text:

                    time.sleep(2)

                    continue

                # Try next model for other model-related errors
                break

    return f"Gemini API temporarily unavailable. Please try again. Details: {str(last_error)}"