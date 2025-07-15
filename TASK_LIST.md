# Task List: WeightTrack & PhotoCompare

This list breaks down the development of the app into manageable phases and tasks.

### Phase 1: Project Setup & Baserow Integration
- [x] Create `PRODUCT_REQUIREMENTS.md`.
- [x] Create `TASK_LIST.md`.
- [x] Configure environment variables for Baserow API Token, Database ID, and Table ID.
- [x] Create a TypeScript service/module (`src/services/baserow.ts`) to handle all API interactions with Baserow (e.g., fetching, creating, and uploading files).
- [x] Define TypeScript types for the data structure (e.g., `WeightEntry`).

### Phase 2: UI - Data Entry
- [x] Create a new page for adding entries (`src/pages/AddEntry.tsx`).
- [x] Build a form component (`src/components/EntryForm.tsx`) with fields for `date`, `weight`, and a `file input` for the photo.
- [x] Implement the logic to submit the form data and upload the photo to the Baserow table via the API service.
- [x] Add navigation to link from the main page to the "Add Entry" page.

### Phase 3: UI - Data Display & Visualization
- [x] Create the main dashboard page (`src/pages/Dashboard.tsx`) and route to it from `/`.
- [ ] On the dashboard, fetch and display all weight entries from Baserow in a list or table.
- [ ] Implement a line chart component (`src/components/WeightChart.tsx`) using `recharts` to visualize weight trends.
- [ ] Create a photo gallery component (`src/components/PhotoGallery.tsx`) to display all uploaded photos.

### Phase 4: UI - Photo Comparison
- [ ] Implement a selection mechanism in the `PhotoGallery` to allow the user to pick two photos.
- [ ] Create a `ComparisonView` component (e.g., a modal) that displays the two selected photos side-by-side with their corresponding dates and weights.

### Phase 5: Real-time Updates with Webhooks
- [ ] (Requires Baserow setup) Configure a webhook in Baserow to trigger on row creation.
- [ ] Implement logic in the app to listen for or be triggered by the webhook to refetch data, ensuring the UI is always current. (This might involve using React Query's refetching capabilities).

### Phase 6: Polish & Refinement
- [ ] Add loading states (e.g., skeletons) while data is being fetched.
- [ ] Use toasts to provide feedback for actions (e.g., "Entry saved successfully!").
- [ ] Ensure the entire application is responsive and works well on mobile devices.
- [ ] Add comprehensive error handling for API requests.