# Rabta (الرابطة) - Project Context & Handoff

## 1. Project Context

We are building **Rabta**, a specialized social media and networking app for the ITI community.

- **Tech Stack:** React, TypeScript, Tailwind CSS (Frontend) | Node.js, Express, MongoDB (Backend).
- **Team Workstyle:** Weekly rotation between Frontend and Backend roles (2 Front / 2 Back).
- **Current Focus:** Month 1 MVP (Web version).

## 2. Frontend Architecture (Type-Based)

Following the instructor's guidelines, the React frontend uses a **Type-Based Folder Architecture**. The `src/` directory is structured as follows:

- `api/`
- `assets/`
- `components/` (sub-folders: `layout/`, `ui/`, `chat/`)
- `contexts/`
- `hooks/`
- `pages/`
- `store/`
- `types/` (All global TypeScript interfaces go here to ensure team consistency)
- `utils/`

## 3. Strict Development Rules (CRITICAL)

When asking the AI for code generation or modifications, enforce these strict rules to avoid breaking the existing HTML/Tailwind designs:

- **Pop-up Feature:** The pop-up feature must be preserved and re-implemented carefully in React without breaking the rest of the code.
- **Group Details Sidebar:** Do not overwrite or damage the layout of the group details sidebar. Keep the logic intact.
- **Dark/Light Mode Toggle:** The toggle button for Dark/Light mode MUST be placed inside the **Settings** section. Do not add it to the main layout or headers.

## 4. One-Month MVP Schedule

We are operating on a 7-day schedule per week. Days 6 and 7 are reserved for E2E testing, polishing, and preparing for the weekly role handover.

- **Week 1:** Foundation, Environments, & Authentication (JWT, Google Auth).
- **Week 2:** User Profiles, Layouts, & Navigation (Multer/Cloudinary, Search Users).
- **Week 3:** Real-Time Chat & Groups (Socket.io).
- **Week 4:** Job Board, Settings, & MVP Deployment.

## 5. Current Progress Status

- [x] Vite + React + TypeScript project initialized (`npm create vite@latest`).
- [x] Base dependencies installed.
- [x] Type-based folder structure created.
- [x] Cleaned up default Vite boilerplate.
- [ ] **Next Step:** Manually install and configure Tailwind CSS from the official website.
