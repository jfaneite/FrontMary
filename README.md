# 📄 FRONTMARY

A frontend application that connects to a backend service via WebSockets to render summarised document data in _real-time_.

---

## 🚀 Getting Started

### Prerequisites

•⁠ ⁠*Node.js* ≥ 18  
•⁠ ⁠*npm* or _yarn_

### Installation

⁠ bash
npm install

# or

yarn install
 ⁠

### Usage

⁠ bash
npm run dev
 ⁠

Then open [http://localhost:3000/dashboard](http://localhost:3000/dashboard) in your browser.

To run tests:

⁠ bash
npm test
 ⁠

---

## 🛠️ Solution Design

This frontend was designed with a minimalistic UI that:

•⁠ ⁠Renders the _global summary_ on the left panel (summary across all documents)
•⁠ ⁠Shows _highlights per document_ on the right, with filtering (e.g. by relevance, source) and sorting (e.g. by date)
•⁠ ⁠Uses _skeleton loaders_ while data is loading to improve UX

### Key Technologies

•⁠ ⁠*React + Next.js + TypeScript*: Provides modular structure, routing, and typing
•⁠ ⁠*Container-UI architecture*: Separates data-fetching (containers) from rendering (UI)
•⁠ ⁠*WebSockets for real-time streaming*: Efficient UI updates when backend emits new data
•⁠ ⁠*Jest* for unit testing

---

### Folder Structure

```text
src/
├─ app/
│  └─ dashboard/     # Main dashboard route
├─ containers/       # Components responsible for data-fetching logic
├─ ui/               # Presentational UI components
└─ services/         # WebSocket & API logic
```

---

## 🔄 Workflow

 1.⁠ ⁠A WebSocket connection is established when the dashboard loads  
 2.⁠ ⁠Components set up a ⁠ useEffect ⁠ listener to receive messages  
 3.⁠ ⁠Components show _skeleton loaders_ while waiting for summaries  
 4.⁠ ⁠Once data arrives, components render the actual content  
 5.⁠ ⁠The WebSocket connection is closed when the user navigates away

---

## ✅ Pros & ❌ Cons

### Pros

 1.⁠ ⁠Shows data per document as soon as it’s available  
 2.⁠ ⁠Modular with good separation of concerns  
 3.⁠ ⁠Reusable and composable React components  
 4.⁠ ⁠Rapid UI development with Material UI

### Cons

 1.⁠ ⁠Skeleton loaders may stay on screen for too long (poor UX for large docs)  
 2.⁠ ⁠Material UI might not fit custom design systems  
 3.⁠ ⁠Current UI is blocking due the synchronous nature, even when data is being streamed, user is waiting for the data to arrive.
 4.⁠ ⁠Users currently can’t choose which files to process 5.

---

## 🔮 Future Improvements

 1.⁠ ⁠Add _authentication and security_ mechanisms  
 2.⁠ ⁠Improve _error handling_ and display feedback in the UI  
 3.⁠ ⁠Build interactive UI to let users _choose files_ and set summary preferences (e.g. short vs detailed)  
 4.⁠ ⁠Consider _custom design system_ if working with client-provided designs  
 5.⁠ ⁠Ensure _accessibility (a11y)_ compliance across all pages  
 6.⁠ ⁠Integrate _analytics_ to track usage and performance  
 7.⁠ ⁠Expand _unit and functional tests_ using Jest + React Testing Library  
 8.⁠ ⁠Adopt best practices: _Git flow, **SOLID, **conventional commits, and thorough \*\*documentation_  
 9.⁠ ⁠Use _service workers_ to fetch data in the background or send data to process in an Asynchronous way.
10.⁠ ⁠Package the summary module as a _micro-frontend or embeddable component_ (e.g. via iframe)  
11.⁠ ⁠Add client side caching to avoid requesting data that doesn't change too often.

---
