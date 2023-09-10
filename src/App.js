import React, { useState } from 'react';
import './App.css';
import {BsSend } from 'react-icons/bs';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');

  const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  const handleSearch = async () => {
    if (!searchTerm) {
      setError('Enter a food name to search');
      return;
    }

    try {
      const response = await fetch(API_URL + searchTerm);
      const data = await response.json();

      if (data.meals) {
        setSearchResults(data.meals);
        setError('');
      } else {
        setSearchResults([]);
        setError('No food found');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred');
    }
  };

  const renderResults = () => {
    if (searchResults.length === 0) {
      return (
        <div className="alert alert-danger">
          {error || 'No food found'}
        </div>
      );
    }
    const shareRecipe = (meal) => {
      if (navigator.share) {
        navigator.share({
          title: meal.strMeal,
          url: meal.strYoutube,
        })
          .then(() => console.log('Shared successfully'))
          .catch((error) => console.error('Error sharing:', error));
      }
    };
    return (
      <div>
        <h4>Search Results</h4>
      <div className='card-container'>
      {searchResults.map((meal) => (
        <div key={meal.idMeal} className= 'card card-hover' style={{width:'300px'}} >
          <p>{meal.strMeal && <img className='card-img-top'  src={meal.strMealThumb} alt={meal.strMeal} width="298.67" height="224" />}</p>
          <div className='card-body'>
            <div className='card-title'>{meal.strMeal}</div>
            <br></br>
            <button 
            type='button' 
            className='btn btn-info' 
            style={{backgroundColor:'#87CEEB',
            border:'none',
            height:'30px',
            borderRadius: '5px',
            cursor: 'pointer'}}
            onClick={() => {
              window.open(meal.strYoutube, '_blank', 'noopener noreferrer');
            }}
          >
            Watch Video
          </button>
          <div className='share-button' onClick={() => shareRecipe(meal)}>
                  <BsSend size={20} />
                </div>
            
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

  return (
    <div className="App">
      <h1>Meal Finder</h1>
      <div className="search-container">
        <input
          type="text"
          className="form-control"
          placeholder="Enter a food name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        &nbsp;
        <button type=" button" onClick={handleSearch} className="btn btn-info" 
        style={{backgroundColor:'#0083A3', color:'#fff',padding: '5px 10px',border:' none', cursor:'pointer',height:'35px', borderRadius: '5px'}} >
          Search</button>
      </div>
      {renderResults()}
    </div>
  );
}

export default App;

