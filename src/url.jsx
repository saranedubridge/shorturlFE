import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./Style/url.css"

function Url() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const GenerateShortUrl = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ longUrl }),
      });

      if (response.ok) {
        const data = await response.json();
        setShortUrl(`http://localhost:3001/${data.shortUrl}`); 
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to generate short URL');
      }
    } catch (error) {
      console.error('Error generating short URL:', error);
      setError('Error generating short URL');
    }
  };

  return (

     <div>
    <div className="d-flex justify-content-between mt-2">
    <h5 className=" mb-0 text-primary text-margin-left">Url-shortner</h5>
</div>
<div className="d-flex justify-content-end mt-0 ">
    <Link to="/dashboard" className="btn btn-success mb-3 ">Dashboard</Link>
    {/* <Link to="/url" className="btn btn-success mb-3 ">
        URL Shortener
    </Link> */}
    <Link to="/table" className="btn btn-success mb-3">
        Table
    </Link>
    <Link to="/login" className="btn btn-danger mb-3">
        Logout
    </Link>
</div>
    <div className="container mt-5 ">
      <div className="row">
        <div className="col-md-12 offset-md-0">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Create a Short URL</h2>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Enter a long URL"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
              />
              <button className="btn btn-primary" onClick={GenerateShortUrl}>
                Generate Short URL
              </button>
              {shortUrl && (
                <div className="mt-3">
                  <p className="card-text">Short URL:</p>
                  <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="card-link">
                    {shortUrl}
                  </a>
                </div>
              )}
              {error && (
                <div className="alert alert-danger mt-3" role="alert">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Url;
