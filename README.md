DeepDetect - AI-Powered Deepfake Detection

DeepDetect is a web-based platform that detects deepfake images using an AI model. 
Users can upload images, purchase API access, and track their API usage on a dashboard.

Tech Stack:
- Frontend: React.js
- Backend: Node.js (Express)
- AI Model API: FastAPI (Python)
- Database: MongoDB
- Payments: Razorpay

Features:
✅ Deepfake detection using AI  
✅ Drag-and-drop image upload  
✅ API access for developers (via purchase)  
✅ Dashboard with API key usage stats  
✅ Secure authentication & user management  

Installation & Setup:

1. Clone the repository:
   git clone https://github.com/naik-shashank/DeepDetect.git
   cd DeepDetect

2. Install dependencies:

   Frontend (React.js):
   cd frontend
   npm install
   npm start

   Backend (Node.js + Express):
   cd backend
   npm install
   npm start

   Model API (FastAPI/Python):
   cd Model_Api
   pip install -r requirements.txt
   python -m uvicorn main:app --reload

3. Visit http://localhost:3000 in your browser to access DeepDetect.

For any issues, feel free to raise an issue on GitHub.

