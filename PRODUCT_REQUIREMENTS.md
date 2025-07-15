# Product Requirements Document: Weight Tracker & Photo Comparator

## 1. Introduction

*   **Product Name:** WeightTrack & PhotoCompare
*   **Objective:** To provide a simple, private, and effective way for users to track their weight over time, upload progress photos, and visually compare their physical changes using Baserow as a backend.

## 2. Target Audience

*   Individuals focused on fitness, weight loss, or body composition goals who want a straightforward tool to monitor their progress.

## 3. Core Features

*   **F1: Weight & Photo Entry:** Users can submit their current weight, the date, and a corresponding photo through a simple form.
*   **F2: Historical Data View:** All entries will be displayed in a reverse chronological list or table.
*   **F3: Weight Trend Visualization:** A line chart will display the user's weight over time, making it easy to see trends.
*   **F4: Photo Gallery & Comparison:**
    *   All uploaded photos will be viewable in a gallery.
    *   Users can select any two photos from the gallery to view them side-by-side in a comparison mode.
*   **F5: Real-time Updates:** The app will use Baserow webhooks to automatically refresh the data whenever a new entry is created, ensuring the view is always up-to-date.

## 4. Technical Stack & Architecture

*   **Frontend:** React, TypeScript, Tailwind CSS, shadcn/ui, Recharts (for charts).
*   **Backend & Database:** Baserow (leveraging its REST API and Webhooks).
*   **API Interaction:** All data fetching and submissions will be handled through the Baserow API. API keys and other credentials will be managed through environment variables.

## 5. Non-Functional Requirements

*   **Usability:** The application must be intuitive and responsive, providing a seamless experience on both desktop and mobile devices.
*   **Privacy:** All data is stored in the user's private Baserow database. The app itself is client-side and does not store any user data.
*   **Performance:** The app should load quickly, and data interactions (fetching, submitting) should feel responsive.