# Notification System Design

## Stage 1

### Approach for Priority Inbox

The Priority Inbox displays the top 10 most important notifications based on the following priority order:

1. **Placement** (highest priority) - weight 3
2. **Result** (medium priority) - weight 2
3. **Event** (lowest priority) - weight 1

Notifications are sorted by priority weight in descending order and the top 10 are displayed.

### Implementation

- Fetched notifications from the Affordmed API via an Express proxy server to handle CORS
- Sorted notifications using a `getPriority()` function that assigns weights based on type
- Sliced the top 10 results after sorting

### How new notifications are handled efficiently

- The app fetches fresh notifications on every mount via `useEffect`
- Sorting is done on the client side — no database needed
- The priority system ensures the most important notifications always appear first regardless of timestamp

## Stage 2

### Architecture

- **Frontend**: React with Material UI
- **Proxy Server**: Express (handles CORS and token management)
- **Logging**: Custom Log middleware that sends logs to Affordmed evaluation server

### Components

- `App.js` - Main component, manages state and routing between views
- `logger.js` - Reusable logging middleware

### Features

- All Notifications view with filter by type (Placement, Result, Event)
- Priority Inbox showing top 10 notifications
- Logging integrated at every key action
- Responsive design using Material UI