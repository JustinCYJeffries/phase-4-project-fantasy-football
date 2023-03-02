import React from "react";
import PlayerCard from "./PlayerCard";

const TeamRoster = ({ team, onRemovePlayer }) => {
  const players = team.players.map((player) => (
    <PlayerCard key={player.id} player={player} onRemovePlayer={onRemovePlayer} />
  ));

  return (
    <div>
      <h3>Team Roster</h3>
      {players.length === 0 ? (
        <p>No players added to the team yet.</p>
      ) : (
        <div className="row">{players}</div>
      )}
    </div>
  );
};

export default TeamRoster;
