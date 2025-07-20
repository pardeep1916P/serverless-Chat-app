import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChatClient } from './chat-client';

const WEBSOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL;

const App = () => {
  const socket = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [members, setMembers] = useState<string[]>([]);
  const [chatRows, setChatRows] = useState<React.ReactNode[]>([]);

  const onSocketOpen = useCallback(() => {
    setIsConnected(true);
    const name = prompt('Enter your name');
    socket.current?.send(JSON.stringify({ action: 'setName', name }));
  }, []);

  const onSocketClose = useCallback(() => {
    setMembers([]);
    setIsConnected(false);
    setChatRows([]);
  }, []);

  const onSocketMessage = useCallback((dataStr: string) => {
    try {
      const data = JSON.parse(dataStr);

      if (data.members) {
        // ✅ Members are now [{ name, id }]
        const names = data.members.map((member: any) => member.name);
        setMembers(names);
      } else if (data.publicMessage) {
        setChatRows(old => [...old, <span><b>{data.publicMessage}</b></span>]);
      } else if (data.privateMessage) {
        alert(data.privateMessage);
      } else if (data.systemMessage) {
        setChatRows(old => [...old, <span><i>{data.systemMessage}</i></span>]);
      }
    } catch (e) {
      console.error('Error parsing message:', e);
    }
  }, []);

  const onConnect = useCallback(() => {
    if (socket.current?.readyState !== WebSocket.OPEN) {
      socket.current = new WebSocket(URL);
      socket.current.addEventListener('open', onSocketOpen);
      socket.current.addEventListener('close', onSocketClose);
      socket.current.addEventListener('message', (event) => {
        onSocketMessage(event.data);
      });
    }
  }, []);

  useEffect(() => {
    return () => {
      socket.current?.close();
    };
  }, []);

  const onSendPrivateMessage = useCallback((to: string) => {
    const message = prompt(`Enter private message for ${to}`);
    if (message) {
      socket.current?.send(JSON.stringify({
        action: 'sendPrivate',
        message,
        to,
      }));
    }
  }, []);

  const onSendPublicMessage = useCallback(() => {
    const message = prompt('Enter public message');
    if (message) {
      socket.current?.send(JSON.stringify({
        action: 'sendPublic',
        message,
      }));
    }
  }, []);

  const onDisconnect = useCallback(() => {
    if (isConnected) {
      socket.current?.close();
    }
  }, [isConnected]);

  return (
    <ChatClient
      isConnected={isConnected}
      members={members}
      chatRows={chatRows}
      onPublicMessage={onSendPublicMessage}
      onPrivateMessage={onSendPrivateMessage}
      onConnect={onConnect}
      onDisconnect={onDisconnect}
    />
  );
};

export default App;
