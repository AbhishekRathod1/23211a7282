# Campus Notification System

## Project Structure

### logging-middleware
Reusable logging middleware that sends logs to the evaluation server on every significant action.

### notification-app-fe
React frontend application featuring:
- All notifications view with filter by type (Placement, Result, Event)
- Priority Inbox showing top 10 notifications (Placement > Result > Event)
- Material UI for styling
- Logging middleware integrated throughout

## Setup Instructions

### Prerequisites
- Node.js
- npm

### Running the app
1. Install dependencies: `npm install`
2. Start the app: `npm start`
3. Open `http://localhost:3000`

## Tech Stack
- React
- Material UI
- Express (proxy server)