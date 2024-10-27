import React from 'react';
// import data from '../occupations';

// ImageTable.js


const ImageTable = ({ data }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead> 
          <tr>
            <th>Occupation</th>
            <th>Image</th>
            <th>Industry</th>
            <th>Education</th>
            <th>Salary</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>
                <img
                  src={item.imageSrc}
                  alt={`Image of ${item.name}`}
                  className="img-thumbnail"
                  style={{ maxWidth: '100px' }}
                />
              </td>
              <td>{item.industry}</td>
              <td>{item.education}</td>
              <td>{item.salary}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};



export default ImageTable;

  

