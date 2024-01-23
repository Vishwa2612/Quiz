import React from 'react';

const TrashIcon = ({ onClick }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 100 100" onClick={onClick}>
      <path d="M81 23.5H61V17c0-1.1-.9-2-2-2H41c-1.1 0-2 .9-2 2v6.5H19c-1.1 0-2 .9-2 2s.9 2 2 2h6.6V83c0 1.1.9 2 2 2h44.8c1.1 0 2-.9 2-2V27.5H81c1.1 0 2-.9 2-2s-.9-2-2-2zM43 19h14v4H43v-4zm27.4 62H29.6V27.5h40.8V81zM61 38.3v32c0 1.1-.9 2-2 2s-2-.9-2-2v-32c0-1.1.9-2 2-2s2 .8 2 2zm-18 0v32c0 1.1-.9 2-2 2s-2-.9-2-2v-32c0-1.1.9-2 2-2s2 .8 2 2z" fill="#EDE275" />
      <path fill="#EDE275" d="M1364-930V754H-420V-930h1784m8-8H-428V762h1800V-938z" />
    </svg>
  );
};

export default TrashIcon;
