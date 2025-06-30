import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChatClient } from './chat-client';

const URL = 'wss://6wlyb2jxxi.execute-api.ap-south-2.amazonaws.com/production/';

const App = () => {
  const socket = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [members, setMembers] = useState([]);
  const [chatRows, setChatRows] = useState<React.ReactNode[]>([]);

  const onSocketOpen = () => {
    setIsConnected(true);
    const name = prompt('Enter your name');
    socket.current?.send(JSON.stringify({ action: 'setName', name }));
  };

  const onSocketClose = () => {
    setMembers([]);
    setIsConnected(false);
    setChatRows([]);
  };

  const onSocketMessage = (dataStr: string) => {
    const data = JSON.parse(dataStr);
    if (data.members) {
      setMembers(data.members);
    } else if (data.publicMessage) {
      setChatRows(old => [...old, <span><b>{data.publicMessage}</b></span>]);
    } else if (data.privateMessage) {
      alert(data.privateMessage);
    } else if (data.systemMessage) {
      setChatRows(old => [...old, <span><i>{data.systemMessage}</i></span>]);
    }
  };

  const onConnect = () => {
    if (socket.current?.readyState !== WebSocket.OPEN) {
      socket.current = new WebSocket(URL);
      socket.current.addEventListener('open', onSocketOpen);
      socket.current.addEventListener('close', onSocketClose);
      socket.current.addEventListener('message', (event) => {
        onSocketMessage(event.data);
      });
    }
  };

  const onDisconnect = () => {
    if (isConnected) {
      socket.current?.close();
    }
  };

  const onSendPublicMessage = () => {
    const message = prompt('Enter public message');
    if (message) {
      socket.current?.send(JSON.stringify({ action: 'sendPublic', message }));
    }
  };

  const onSendPrivateMessage = (to: string) => {
    const message = prompt(`Enter private message for ${to}`);
    if (message) {
      socket.current?.send(JSON.stringify({ action: 'sendPrivate', message, to }));
    }
  };

  useEffect(() => {
    return () => {
      socket.current?.close();
    };
  }, []);

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
