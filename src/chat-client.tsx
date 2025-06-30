import React from 'react';
import './index.css';

export const ChatClient = ({
  isConnected,
  members,
  chatRows,
  onPublicMessage,
  onPrivateMessage,
  onConnect,
  onDisconnect,
}: any) => {

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>LiveConnect</h2>
        {members.map((name: string) => (
          <div
            key={name}
            className="member"
            onClick={() => onPrivateMessage(name)}
          >
            {name}
          </div>
        ))}
      </div>

      {/* Chat Section */}
      <div className="chat-section">
        <div className="header">
          <h3>Chat Room</h3>
          <div className={`status-dot ${isConnected ? 'online' : 'offline'}`} />
        </div>

        <div className="chat-display">
          {chatRows.map((row: any, idx: number) => (
            <div key={idx}>{row}</div>
          ))}
        </div>

        <div className="button-row">
          <button onClick={onPublicMessage} disabled={!isConnected}>
            Send Public
          </button>
          {!isConnected ? (
            <button onClick={onConnect}>Connect</button>
          ) : (
            <button className="disconnect-button" onClick={onDisconnect}>
              Disconnect
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
