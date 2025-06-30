import React from 'react';
import './index.css';

interface Member {
  id: string;
  name: string;
}

interface Props {
  isConnected: boolean;
  members: Member[];
  chatRows: React.ReactNode[];
  onPublicMessage: () => void;
  onPrivateMessage: (to: string) => void;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const ChatClient = ({
  isConnected,
  members,
  chatRows,
  onPublicMessage,
  onPrivateMessage,
  onConnect,
  onDisconnect,
}: Props) => {
  return (
    <div className="app">
      <div className="sidebar">
        <h2>LiveConnect</h2>
        {members.map((m) => (
          <div
            key={m.id}
            className="member"
            onClick={() => onPrivateMessage(m.id)}
          >
            {m.name}
          </div>
        ))}
      </div>

      <div className="chat">
        <div className="chat-header">
          <h3>Chat Room</h3>
          <div>{isConnected ? '🟢 Online' : '🔴 Offline'}</div>
        </div>

        <div className="chat-display">
          {chatRows.map((row, idx) => (
            <span key={idx}>{row}</span>
          ))}
        </div>

        <div className="buttons">
          {!isConnected && (
            <button onClick={onConnect}>Connect</button>
          )}
          {isConnected && (
            <>
              <button onClick={onPublicMessage}>Send Public</button>
              <button className="disconnect" onClick={onDisconnect}>
                Disconnect
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
