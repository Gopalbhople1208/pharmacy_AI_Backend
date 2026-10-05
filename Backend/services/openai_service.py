import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

client = None

if OPENAI_API_KEY:
    client = OpenAI(api_key=OPENAI_API_KEY)


def ask_openai(prompt: str) -> str:

    if not client:
        return "OpenAI API key is not configured."

    try:
        response = client.responses.create(
            model="gpt-5.6-luna",
            input=prompt
        )

        return response.output_text

    except Exception as error:
        return f"OpenAI API error: {str(error)}"