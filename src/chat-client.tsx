import React from 'react';
import { Button } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';

interface Props {
  isConnected: boolean;
  members: string[];
  chatRows: React.ReactNode[];
  onPublicMessage: () => void;
  onPrivateMessage: (to: string) => void;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const ChatClient = (props: Props) => {
  return (
    <div
      style={{
        position: 'fixed',
        width: '100%',
        height: '100%',
        backgroundColor: '#f4ede3',
        display: 'flex',
      }}
    >
      <CssBaseline />
      <Container maxWidth="lg" style={{ height: '90%' }}>
        <Grid container style={{ height: '100%' }}>
          {/* Sidebar */}
          <Grid
            item
            xs={3} // Wider Sidebar
            style={{
              backgroundColor: '#4B0082', // 🎨 Changed sidebar color to Indigo
              color: 'white',
              paddingTop: 10,
            }}
          >
            <h2 style={{ paddingLeft: 10 }}>LiveConnect</h2>
            <List component="nav">
              {props.members.map((item) => (
                <ListItem
                  key={item}
                  onClick={() => props.onPrivateMessage(item)}
                  button
                >
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Chat Area */}
          <Grid
            item
            xs={9}
            style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}
          >
            <Paper style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  padding: '20px 30px',
                }}
              >
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                  {props.chatRows.map((item, i) => (
                    <li key={i} style={{ marginBottom: 8 }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ padding: 10 }}>
                {props.isConnected && (
                  <>
                    <Button
                      style={{ marginRight: 7 }}
                      variant="outlined"
                      size="small"
                      onClick={props.onPublicMessage}
                    >
                      Send Public
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={props.onDisconnect}
                    >
                      Disconnect
                    </Button>
                  </>
                )}
                {!props.isConnected && (
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={props.onConnect}
                  >
                    Connect
                  </Button>
                )}
              </div>
              <div
                style={{
                  position: 'absolute',
                  right: 10,
                  top: 10,
                  width: 12,
                  height: 12,
                  backgroundColor: props.isConnected ? '#00da00' : '#e2e2e2',
                  borderRadius: '50%',
                }}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
