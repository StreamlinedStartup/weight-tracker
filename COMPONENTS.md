# Component Documentation

This document provides an overview of the React components used in this application. It is intended as a reference for developers and LLMs to understand the structure and responsibilities of the UI.

## Application Components

These are the core, custom-built components that form the application's features. They are located in `src/components/`.

### `src/components/EntryForm.tsx`
*   **Responsibility:** Provides a user interface for creating a new weight entry.
*   **Details:** This component contains a form with fields for date, weight, dose, notes, and photo uploads. It uses `react-hook-form` for state management and `zod` for validation. Upon submission, it calls the `baserow.ts` service to create a new entry and upload files.

### `src/components/HistoryTable.tsx`
*   **Responsibility:** Displays all historical weight entries in a tabular format.
*   **Details:** Renders a `shadcn/ui` table with columns for date, weight, week, dose, and notes. It sorts the data in reverse chronological order.

### `src/components/WeightChart.tsx`
*   **Responsibility:** Visualizes the user's weight trend over time.
*   **Details:** Uses `recharts` to render a line chart showing weight on the Y-axis and date on the X-axis.

### `src/components/DoseWeightChart.tsx`
*   **Responsibility:** Visualizes the correlation between medication dosage and weight.
*   **Details:** Uses `recharts` to render a composed chart. It displays weight as a line and dose as a bar, allowing for easy comparison between the two metrics over time.

### `src/components/PhotoGallery.tsx`
*   **Responsibility:** Displays all uploaded photos and allows for selection.
*   **Details:** Renders a grid of all progress photos. It includes functionality to select multiple photos. When photos are selected, it displays a floating action bar with options to compare them or clear the selection.

### `src/components/PhotoComparison.tsx`
*   **Responsibility:** Provides a side-by-side view of selected photos.
*   **Details:** This is a dialog (modal) component that takes an array of selected photos. It displays them in a grid, showing the image, date, and weight for each. It includes a toggle for viewing images at full size or fitting them to the screen.

### `src/components/StatsSummary.tsx`
*   **Responsibility:** Displays high-level summary statistics.
*   **Details:** Shows key metrics in a series of "Stat Cards". It uses the `calculateStats` function from `src/utils/analytics.ts` to compute values like total weight change, average weekly change, and highest/lowest recorded weights.

### `src/components/DoseEfficacy.tsx`
*   **Responsibility:** Analyzes and displays the effectiveness of each dosage period.
*   **Details:** This component uses the `analyzeDoseEffectiveness` function from `src/utils/analytics.ts`. It groups entries by dose and calculates the weight change, duration, and average weekly change for each period, displaying the results in summary cards.

### `src/components/made-with-dyad.tsx`
*   **Responsibility:** Displays a "Made with Dyad" link.
*   **Details:** A simple, static component for attribution.

---

## UI Library Components (`shadcn/ui`)

The components located in `src/components/ui/` are from the **shadcn/ui** library.

*   **Responsibility:** These are general-purpose, unstyled components that provide the building blocks for the application's UI (e.g., `Button`, `Card`, `Input`, `Dialog`).
*   **Usage:** They are imported and used throughout the application components to build the user interface. They should not be modified directly; instead, their appearance is controlled via Tailwind CSS utility classes.