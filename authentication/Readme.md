# Authentication App

A vanilla JavaScript authentication app using FreeAPI auth endpoints.

## Live Demo
https://react-project-cohort-2026-f4ll.vercel.app/

## GitHub
https://github.com/iamdipanshugupta/React-Project-Cohort-2026/tree/main/authentication

## Features
- Register new account
- Login with username & password
- View current user profile
- Logout
- Success & error messages
- Loading states
- Auto login check on page load

## Tech Stack
- Vanilla JavaScript
- Tailwind CSS (CDN)
- FreeAPI Auth Endpoints

## How to Run
Just open `index.html` in browser — no npm needed!

## API Endpoints Used
| Action | Method | Endpoint |
|---|---|---|
| Register | POST | `/api/v1/users/register` |
| Login | POST | `/api/v1/users/login` |
| Logout | POST | `/api/v1/users/logout` |
| Current User | GET | `/api/v1/users/current-user` |