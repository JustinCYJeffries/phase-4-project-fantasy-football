import React from 'react';

const PlayerCard = ({ selectedPlayer, handleClose }) => {
 

  const handleCloseClick = () => {
    handleClose();
  };





  return (
    <>
      
        <div className="player-popup">
          <div className="player-card">
            <img src={selectedPlayer.PhotoUrl}></img>
            <br/>Name: {selectedPlayer.FanDuelName}
            <br/>Team: {selectedPlayer.Team}
            <br/>Age: {selectedPlayer.Age}
            <br/>Birthday: {selectedPlayer.BirthDateString}
            <br/>Position: {selectedPlayer.Position}
            <br/>College: {selectedPlayer.College}
            <br/>Height: {selectedPlayer.Height}
            <br/>Weight: {selectedPlayer.Weight}
            <br/>Season: {selectedPlayer.ExperienceString}

          </div>
          <button className="close-button" onClick={handleCloseClick}>Close</button>
        </div>
     
    </>
  );
};

export default PlayerCard;