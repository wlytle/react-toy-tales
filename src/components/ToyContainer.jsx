import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = ({toys, donate, like}) => {
  return(
    <div id="toy-collection">
      {toys.map(toy => <ToyCard donate={donate} key={toy.id} toy={toy} like={like}/>)}
    </div>
  );
}

export default ToyContainer;
