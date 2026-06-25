import { useState, useEffect } from 'react';
import Log from './logger';
import {
  Container, Typography, Button, Card, CardContent,
  Chip, Box, AppBar, Toolbar, Tabs, Tab, Alert, Stack, CircularProgress
} from '@mui/material';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

const demoNotifications = [
  {
    ID: 1,
    Type: 'Placement',
    Timestamp: '2026-06-25 09:00',
    Message: 'Infosys placement registration closes today at 5 PM.'
  },
  {
    ID: 2,
    Type: 'Result',
    Timestamp: '2026-06-24 16:30',
    Message: 'Semester examination results are available in the student portal.'
  },
  {
    ID: 3,
    Type: 'Event',
    Timestamp: '2026-06-23 11:15',
    Message: 'AI workshop starts in Seminar Hall A tomorrow morning.'
  },
  {
    ID: 4,
    Type: 'Placement',
    Timestamp: '2026-06-22 13:00',
    Message: 'Mock interview slots for final-year students are now open.'
  },
  {
    ID: 5,
    Type: 'Event',
    Timestamp: '2026-06-21 10:00',
    Message: 'Hackathon team registration begins this week.'
  }
];

function getPriority(type) {
  if (type === 'Placement') return 3;
  if (type === 'Result') return 2;
  return 1;
}

function App() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('All');
  const [view, setView] = useState('all');
  const [loading, setLoading] = useState(true);

  function loadNotifications() {
    setLoading(true);
    Log("frontend", "info", "hook", "App mounted - fetching notifications");
    fetch(API_BASE_URL + "/notifications")
      .then(function(res) {
        if (!res.ok) {
          throw new Error("Request failed with status " + res.status);
        }
        return res.json();
      })
      .then(function(data) {
        const fetched = Array.isArray(data) ? data : data.notifications;
        if (!Array.isArray(fetched)) {
          throw new Error("Invalid notification response");
        }
        Log("frontend", "info", "hook", "Notifications fetched successfully");
        setNotifications(fetched);
      })
      .catch(function(error) {
        Log("frontend", "error", "hook", "Failed to fetch notifications");
        setNotifications(demoNotifications);
      })
      .finally(function() {
        setLoading(false);
      });
  }

  useEffect(function() {
    loadNotifications();
  }, []);

  function getFiltered() {
    if (filter === 'All') return notifications;
    return notifications.filter(function(n) { return n.Type === filter; });
  }

  function getPriorityTop10() {
    return [...notifications]
      .sort(function(a, b) { return getPriority(b.Type) - getPriority(a.Type); })
      .slice(0, 10);
  }

  function getColor(type) {
    if (type === 'Placement') return 'success';
    if (type === 'Result') return 'primary';
    return 'warning';
  }

  const displayed = view === 'priority' ? getPriorityTop10() : getFiltered();

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Campus Notifications</Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 3, pb: 4 }}>
        <Tabs value={view} onChange={function(e, v) { setView(v); }} sx={{ mb: 2 }}>
          <Tab label="All Notifications" value="all" />
          <Tab label="Priority Inbox (Top 10)" value="priority" />
        </Tabs>

        {view === 'all' && (
          <Box sx={{ mb: 2 }}>
            {['All', 'Placement', 'Result', 'Event'].map(function(type) {
              return (
                <Button
                  key={type}
                  variant={filter === type ? 'contained' : 'outlined'}
                  onClick={function() {
                    setFilter(type);
                    Log("frontend", "info", "component", "Filter changed to " + type);
                  }}
                  sx={{ mr: 1 }}
                >
                  {type}
                </Button>
              );
            })}
          </Box>
        )}

        {loading ? (
          <Stack sx={{ py: 6, alignItems: 'center' }}>
            <CircularProgress />
          </Stack>
        ) : (
          displayed.map(function(n) {
            return (
              <Card key={n.ID} sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, alignItems: 'center' }}>
                    <Chip label={n.Type} color={getColor(n.Type)} size="small" />
                    <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'right' }}>
                      {n.Timestamp}
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {n.Message}
                  </Typography>
                </CardContent>
              </Card>
            );
          })
        )}

        {!loading && displayed.length === 0 && (
          <Alert severity="warning">No notifications found for this filter.</Alert>
        )}
      </Container>
    </Box>
  );
}

export default App;
