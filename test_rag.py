import requests
import time

def test_chat():
    url = "http://127.0.0.1:8000/api/v1/chat"
    payload = {"question": "What is Physical AI?"}
    
    print(f"Testing endpoint: {url}")
    try:
        response = requests.post(url, json=payload, timeout=30)
        if response.status_code == 200:
            print("✅ Success!")
            print("Response:", response.json())
        else:
            print(f"❌ Failed with {response.status_code}")
            print("Error:", response.text)
    except Exception as e:
        print(f"❌ Connection Error: {e}")

if __name__ == "__main__":
    test_chat()
