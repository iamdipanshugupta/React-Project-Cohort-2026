# YouTube Videos Listing UI

A YouTube-style video listing interface built with React and Tailwind CSS using FreeAPI.

## Live Demo
https://react-project-cohort-2026-exrx.vercel.app/

## GitHub
https://github.com/iamdipanshugupta/React-Project-Cohort-2026/tree/main/youtubevideo-listing

## What it does
Fetches and displays YouTube videos in a grid layout with thumbnail, title, channel name, views, likes and publish date. Click any card to open the video on YouTube.

## Tech Stack
- React 18
- Tailwind CSS
- Vite
- FreeAPI

## Run Locally
```bash
npm install
npm run dev
```

## API
```
GET https://api.freeapi.app/api/v1/public/youtube/videos?page=1&limit=12
```