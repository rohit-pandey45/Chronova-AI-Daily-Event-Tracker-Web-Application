# AI Daily Event Tracker

A full-stack web app to log your daily events, keep streaks going, and get quick AI-generated feedback on how you're doing.

## What it does

- Sign up / log in securely
- Add, edit, and delete daily events
- Track streaks over time
- See a simple progress dashboard
- Get short AI insights based on your activity

## Built with

- **Frontend:** React (Vite), Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **AI:** Gemini API
- **Auth:** JWT

## Project layout

```
AI_Daily_Event_Tracker/
├── Backend/
└── Frontend/
```

## Getting started

1. Clone the repo and open the folder
2. Install dependencies in both folders:
   ```bash
   cd Backend && npm install
   cd ../Frontend && npm install
   ```
3. Create a `.env` file in `Backend/`:
   ```
   PORT=8000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret
   CLIENT_URL=http://localhost:5173
   GEMINI_API_KEY=your_api_key
   ```
4. Create a `.env` file in `Frontend/`:
   ```
   VITE_API_URL=http://localhost:8000/api
   ```
5. Run both servers (separate terminals):
   ```bash
   cd Backend && npm run dev
   cd Frontend && npm run dev
   ```

## API overview

| Method | Route              | Description       |
|--------|--------------------|--------------------|
| POST   | /api/auth/register | Create an account  |
| POST   | /api/auth/login    | Log in             |
| GET    | /api/events         | List your events   |
| POST   | /api/events         | Add an event       |
| PUT    | /api/events/:id     | Update an event    |
| DELETE | /api/events/:id     | Delete an event    |
| POST   | /api/ai             | Get AI feedback     |

## Roadmap

Ideas for what's coming next — fill in as you build:

- [ ] 
- [ ] 
- [ ] 

## License

Personal project, currently unlicensed.