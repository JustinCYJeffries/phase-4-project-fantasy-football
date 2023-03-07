import React from 'react';

const MaxPlayersWarning = ({ maxPlayers, playersCount }) => {
  if (playersCount >= maxPlayers) {
    return (
      <div>
        <p>You have reached the maximum number of players ({maxPlayers}) for this team.</p>
      </div>
    );
  }

  return null;
};

export default MaxPlayersWarning;
