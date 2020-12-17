import React from 'react';

const ToyCard = ({ toy, donate, like}) => {

  
    const {name, image, likes, id } =toy
    return (
      <div id={id} className="card">
        <h2>{name}</h2>
        <img src={image} alt={name} className="toy-avatar" />
        <p>{likes} Likes </p>
        <button onClick={like}className="like-btn">Like {'<3'}</button>
        <button onClick={donate}className="del-btn">Donate to GoodWill</button>
      </div>
    );


}

export default ToyCard;
