# Rabta (الرابطة) - Master Project Documentation & Architecture

## 1. Project Overview

**Rabta** is a specialized social media, communication, and professional networking application built exclusively for the ITI community.

**Vision:** To become the leading platform connecting ITI students, graduates, trainers, and employers.
**Mission:** Empower ITI students and graduates to connect, learn, collaborate, and showcase their skills in a smart, integrated environment.

## 2. Target Audience

- **Primary:** Current ITI students and ITI graduates.
- **Secondary:** Tech trainers/instructors, companies/startups hiring ITI graduates, and recruiters.

## 3. Core Features & Functionalities

### A. User & Social Features

- **Profile Management:** Portfolios showcasing skills, specialization, and study track.
- **Feed & Posts System:** A main timeline for sharing educational content, projects, and tech news with likes and comments.
- **Settings & Privacy:** Deep user controls for notifications, direct message permissions, and account security.

### B. Communication & Networking

- **Messaging:** Real-time one-to-one chats and file sharing.
- **Specialized Communities (Groups):** Project-based or learning-based groups tailored to specific tech stacks (with Admin/Member roles).
- **Video & Audio Meetings:** In-app VoIP calls, meeting lobbies, screen sharing support, and comprehensive call history logs.

### C. Employer & Career Features

- **Job & Freelance Board:** Post job opportunities and freelance gigs.
- **Candidate Sourcing:** Search and filter candidates by specific ITI tracks and technical skills.

### D. Rabta AI (RAG & Smart Features)

- **In-App Chat Assistant:** A personal AI guide to answer questions, suggest groups, and recommend networking connections.
- **Smart Filtering:** Matches job requirements to user skills and experience.
- **Content Moderation:** AI-assisted monitoring for admin reports and post moderation.

---

## 4. Tech Stack & Infrastructure

- **Frontend (Web):** React with TypeScript, styled using Tailwind CSS.
- **Frontend (Mobile):** React Native (Scheduled for Month 2).
- **Backend Framework:** Node.js + Express.
- **Language:** TypeScript.
- **Database:** MongoDB (via Mongoose).
- **Real-time Communication:** Socket.io (Chats) & WebRTC (Video/Audio Calls).

---

## 5. Backend Architecture: Type-Based MVC

To align with our instructor's guidelines, we are utilizing a classic **Type-Based Architecture**. Files are grouped by their technical role to ensure standard MVC separation of concerns.

### Folder Structure Blueprint

```text
src/
├── config/           # Environment variables, database connections (e.g., db.ts)
├── middlewares/      # Global middlewares (e.g., auth.middleware.ts, error.middleware.ts)
├── models/           # Mongoose schemas and TS interfaces (e.g., User.ts, Post.ts, Call.ts)
├── services/         # Core business logic and database interactions
├── controllers/      # Extracting req/res and calling services
├── routes/           # Express routers (e.g., userRoutes.ts, chatRoutes.ts)
├── utils/            # Helper functions (e.g., catchAsync, AppError)
├── app.ts            # Express app configuration and route mounting
└── server.ts         # Server initialization (app.listen)
```
