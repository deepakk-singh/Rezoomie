# Rezoomie – Resume Builder

[Preview live](https://rezoomie.vercel.app/)

---

## Table of Contents

- [Overview](#overview)  
- [Features](#features)  
- [Demo](#demo)  
- [Tech Stack](#tech-stack)  
- [Setup & Installation](#setup--installation)  
- [Project Structure](#project-structure)  
- [Usage](#usage)  
- [Customization](#customization)  
- [Contributing](#contributing)  
- [License](#license)

---

## Overview

Rezoomie is a web-based resume builder that enables you to **create professional resumes quickly and easily**.  
Start at a clean landing page, fill in your details section-by-section, preview live across multiple themes (Classic, Modern, Minimal), and export your resume as a high-quality PDF.

---

## Features

- **Landing page** with highlights and call-to-action  
- **Separated, editable resume sections**: Personal Info, Summary, Skills, Projects, Experience, Certifications  
- **Drag-and-drop ordering** of resume sections  
- **Live preview** with theme switching (Classic / Modern / Minimal)  
- **Download as PDF** with proper formatting and margins  
- **Persistent storage** — all inputs auto-save to `localStorage`  
- **Responsive design** — works on mobile, tablet, and desktop  
- **Reset option** to clear all data and start fresh  

---

## Demo

Visit the live app here: [https://rezoomie.vercel.app/](https://rezoomie.vercel.app/)

---

## Tech Stack

| Purpose         | Technology           |
|-----------------|----------------------|
| Frontend        | React                |
| Routing         | React Router         |
| Drag & Drop     | @dnd-kit             |
| PDF Export      | html2canvas + jsPDF  |
| Styling         | CSS (modular files)  |
| Deployment      | Vercel               |

---

## Setup & Installation

1. **Clone the project**
   ```bash
   git clone <your-repo-url>
   cd rezoomie

2. **Install dependencies**
   ```bash
   npm install

3. **Run Locally**
   ```bash
   npm start

4. **Build for production**
   ```bash
   npm run build


## Usage

- Navigate to the landing page (/) — click Create My Resume.
- Fill in your personal information and professional summary.
- Edit or rearrange resume sections — add new ones or remove as needed.
- Toggle between Classic, Modern, and Minimal themes from the top-right selector.
- Click Download PDF to export your resume.
- Use Reset to clear all entries and start over.

## License

This project is licensed under the MIT License.
