# GLP-1 Journey

A simple, private, and effective web application for tracking weight, dosage, and progress photos. Built with React and TypeScript, it uses Baserow as a private, self-hosted backend, giving you full control over your data.

## Core Features

*   **Simple Data Entry:** Easily log your weight, date, medication dose, and notes.
*   **Photo Uploads:** Attach multiple progress photos to each entry.
*   **Trend Visualization:** View your weight progress over time with an interactive line chart.
*   **Dose vs. Weight Analysis:** A composed chart helps visualize the correlation between your dosage and weight changes.
*   **Efficacy Analysis:** Automatically calculates and displays statistics for each dosage period, showing you what's most effective.
*   **Photo Gallery:** Browse all your uploaded photos in a clean, modern gallery with newest photos first.
*   **Side-by-Side Comparison:** Select any 2 to 4 photos to compare them in a detailed, side-by-side view, sorted chronologically.
*   **100% Private:** Your data is stored in your own Baserow database, not on our servers.
*   **Responsive Design:** Works seamlessly on both desktop and mobile devices.

<img width="1423" height="772" alt="GLP-1 Dashboard" src="https://github.com/user-attachments/assets/9a8d2f04-d15f-4cbd-a97f-75b8469ea67a" />

<img width="1422" height="996" alt="CleanShot 2025-07-21 at 15 54 21 2" src="https://github.com/user-attachments/assets/9bb22b84-c4c0-4b2d-ad8d-8daf84ef10bb" />

<img width="1441" height="1008" alt="CleanShot 2025-07-21 at 15 55 20" src="https://github.com/user-attachments/assets/6ef89ef1-4045-4444-9450-c70cfff01eed" />


## Tech Stack

*   **Frontend:** React, TypeScript, Vite
*   **Styling:** Tailwind CSS, shadcn/ui
*   **State Management:** TanStack Query (React Query) for server state
*   **Forms:** React Hook Form with Zod for validation
*   **Charts:** Recharts
*   **Routing:** React Router
*   **Backend/Database:** Baserow (self-hosted or cloud)

## Setup and Installation

This application requires a Baserow database to store your data.

### 1. Baserow Backend Setup

1.  **Create a Baserow Account:** If you don't have one, sign up at [Baserow.io](https://baserow.io) or deploy your own instance.
2.  **Create a Table:** Create a new database, and inside it, create a table.
3.  **Define Fields:** Add the following fields to your table. **The names must match exactly.**
    *   `Date` (Type: Date, Format: US - `MM/DD/YYYY`)
    *   `Week` (Type: Number, Format: Integer)
    *   `Dose(mg)` (Type: Number, Format: Decimal 1.0)
    *   `Weight` (Type: Number, Format: Decimal 1.0)
    *   `Notes` (Type: Long Text)
    *   `Photos` (Type: File, check "Allow multiple files")
4.  **Get Table ID:** The Table ID is part of the URL when you are viewing your table (e.g., `.../table/TABLE_ID/`).
5.  **Get API Token:** Go to your Baserow settings -> API Tokens and create a new token with Read/Write access to your database.

### 2. Local Development Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/StreamlinedStartup/weight-tracker.git
    cd weight-tracker
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create Environment File:**
    Create a file named `.env` in the root of the project and add your Baserow credentials:
    ```env
    # Your Baserow API token
    VITE_BASEROW_API_TOKEN="YOUR_API_TOKEN"

    # The ID of your Baserow table
    VITE_BASEROW_TABLE_ID="YOUR_TABLE_ID"

    # (Optional) If using a self-hosted Baserow instance, provide the base URL
    # VITE_BASEROW_BASE_URL="https://your-baserow.example.com"
    ```
    
    **Important Security Notes:**
    *   The `.env` file is listed in `.gitignore`, so your personal credentials will **never** be committed to the repository. Anyone who clones this project must create their own `.env` file.
    *   This application is a client-side-only project. As such, the `VITE_BASEROW_API_TOKEN` is included in the built JavaScript files and is accessible to anyone using the deployed application. For personal use where the URL is not shared, this is generally acceptable. For public-facing applications, you should implement a backend proxy to protect your write-access API token.

4.  **Run the app:**
    ```bash
    npm run dev
    ```
    The application should now be running on `http://localhost:8080`.

## Project Structure
```
/
  public/
  src/
    components/      # Reusable React components
      ui/          # Unmodified shadcn/ui components
      *.tsx        # Custom application components
    hooks/           # Custom React hooks
    lib/             # Utility functions (e.g., cn for Tailwind)
    pages/           # Page components for different routes
    services/        # API interaction logic (e.g., baserow.ts)
    types/           # TypeScript type definitions
    App.tsx          # Main app component with routing
    main.tsx         # Application entry point
```

---
Made with [Dyad](https://www.dyad.sh/).
