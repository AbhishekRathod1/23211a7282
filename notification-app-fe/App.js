import { useState, useEffect } from 'react';
import Log from './logger';
import {
  Container, Typography, Button, Card, CardContent,
  Chip, Box, AppBar, Toolbar, Tabs, Tab
} from '@mui/material';

function getPriority(type) {
  if (type === 'Placement') return 3;
  if (type === 'Result') return 2;
  return 1;
}

function App() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('All');
  const [view, setView] = useState('all');

  useEffect(function() {
    Log("frontend", "info", "hook", "App mounted - fetching notifications");
    fetch("http://localhost:4000/notifications")
      .then(function(res) { return res.json(); })
      .then(function(data) {
        Log("frontend", "info", "hook", "Notifications fetched successfully");
        setNotifications(data.notifications);
      })
      .catch(function(error) {
        Log("frontend", "error", "hook", "Failed to fetch notifications");
        console.error(error);
      });
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

      <Container maxWidth="md" sx={{ mt: 3 }}>
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

        {displayed.map(function(n) {
          return (
            <Card key={n.ID} sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip label={n.Type} color={getColor(n.Type)} size="small" />
                  <Typography variant="caption" color="text.secondary">
                    {n.Timestamp}
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {n.Message}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Container>
    </Box>
  );
}

export default App;