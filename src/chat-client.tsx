import React from 'react';

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
  if (!props.isConnected) {
    return (
      <div className="app-container">
        <div className="sidebar">
          <h2>LiveConnect</h2>
        </div>
        <div className="chat-section">
          <div className="chat-display">
            <span><i>Disconnected</i></span>
          </div>
          <div className="button-row">
            <button onClick={props.onConnect}>Connect</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="sidebar">
        <h2>LiveConnect</h2>
        {props.members.map((m) => (
          <div key={m} className="member" onClick={() => props.onPrivateMessage(m)}>
            {m}
          </div>
        ))}
      </div>
      <div className="chat-section">
        <div className="chat-display">
          {props.chatRows}
        </div>
        <div className="button-row">
          <button onClick={props.onPublicMessage}>Send Public</button>
          <button className="disconnect-button" onClick={props.onDisconnect}>Disconnect</button>
        </div>
      </div>
    </div>
  );
};
