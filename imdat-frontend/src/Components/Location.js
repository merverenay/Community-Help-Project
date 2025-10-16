import React from 'react';

function Locations ({ locations }) {
  console.log("gelioo", locations);

  return (
    <div>
      <h2>Locations</h2>
      <h1>geliooo</h1>
      <ul>
        <h1>geliooo</h1>
        {locations && locations.length > 0 ? (
          locations.map((location, index) => (
            <li key={index}>{location.name}</li> // Örnek olarak location içinde bir name alanı varsa
          ))
        ) : (
          <li>No locations found</li>
        )}
      </ul>
    </div>
  );
}

export default Locations;
