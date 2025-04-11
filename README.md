# Coach Frontend

A modern web application for fitness coaching and client management.

![TypeScript](https://img.shields.io/badge/TypeScript-99.5%25-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Overview

Coach Frontend is a comprehensive web application designed for fitness professionals to manage their clients, create workout plans, and develop meal plans. This platform streamlines the coaching process by providing an intuitive interface for both coaches and clients.

## Features

- **Profile Management**: Create and edit profile, search Trainers' profiles to connect
- **Client Management**: Add and manage clients with detailed profiles and tracking
- **Workout Planning**: Create customized workout routines with exercise listings
- **Meal Planning**: Implement meal plans with user type selection
- **Private Chat**: Communicate directly with clients through the integrated chat system
- **Zoom API integration**: Zoom api integration for instant meeting in private chat, and scheduled zoom meeting for session management

## Tech Stack

- TypeScript
- Next.js
- Tailwind CSS
- Features-based architecture

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/X-spec7/coach-frontend.git
   cd coach-frontend
   ```
2. Install packages
   ```
   yarn
   ```
3. Set the env variables
   ```
   mv .env.template .env
   set the variables in the .env
   ```
4. Run the app
   ```
   yarn run dev -p 3000 -H 0.0.0.0
   ```