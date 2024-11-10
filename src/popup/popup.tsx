import React from 'react';
import ReactDOM from 'react-dom/client';
import './popup.css';

const App: React.FC<{}> = () => {
  const handleInjectClick = () => {
    chrome.runtime.sendMessage({ action: 'injectScript' }, (response) => {
      console.log(response.status);
    });
  };

  return (
    <div>
      <h1>Popup</h1>
      <button onClick={handleInjectClick}>Inject Content Script</button>
    </div>
  );
};

const rootElement = document.createElement('div');
document.body.appendChild(rootElement);
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
