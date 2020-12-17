import React from 'react';

const ToyForm =({newToy, handleSubmit, handleInput}) => {

  
    const {name, image} = newToy
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={handleSubmit} >
          <h3>Create a toy!</h3>
          <input type="text" name="name" onChange={handleInput} value={name}placeholder="Enter a toy's name..." className="input-text"/>
          <br/>
          <input type="text" name="image" value ={image} onChange={handleInput}  placeholder="Enter a toy's image URL..." className="input-text"/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
 

}

export default ToyForm;
