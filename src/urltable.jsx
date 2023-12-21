import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import './Style/table.css'

const URLTable = () => {
    const [urls, setUrls] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchURLs = async () => {
            const response = await fetch(`http://localhost:3001/api/table?page=${currentPage}&search=${searchTerm}`);
            const data = await response.json();
            setUrls(data.urls);
            setTotalPages(data.totalPages);
        };

        fetchURLs();
    }, [currentPage, searchTerm]);

    return (

        <div>
        <div className="d-flex justify-content-between mt-2">
        <h5 className=" mb-0 text-primary text-margin-left">URL-TABLE</h5>
    </div>
    <div className="d-flex justify-content-end mt-0 ">
        <Link to="/dashboard" className="btn btn-success mb-3 ">Dashboard</Link>
        <Link to="/url" className="btn btn-success mb-3 ">
            URL Shortener
        </Link>
        {/* <Link to="/table" className="btn btn-success mb-3">
            Table
        </Link> */}
        <Link to="/login" className="btn btn-danger mb-3">
            Logout
        </Link>
    </div>

        
        <div className="container">
            <input 
                type="text" 
                className="form-control my-2" 
                placeholder="Search original URLs..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div  className="table-responsive">
            <table className="table table-striped ">
                <thead>
                    <tr>
                        <th>Short URL</th>
                        <th>Original URL</th>
                        <th>Date Created</th>
                        <th></th>
                        

                    </tr>
                </thead>
                <tbody>
                    {urls.map((url, index) => (
                        <tr key={index}>
                            <td>{`http://localhost:3001/${url.shortUrl}`}</td>
                            <td>{url.longUrl}</td>
                            <td>{new Date(url.createdAt).toLocaleDateString()}</td>
                            <td>
                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            <nav>
                <ul className="pagination">
                    {[...Array(totalPages).keys()].map(number => (
                        <li key={number} className={`page-item ${number + 1 === currentPage ? 'active' : ''}`}>
                            <a onClick={() => setCurrentPage(number + 1)} className="page-link">
                                {number + 1}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
        </div>
    );
};

export default URLTable;
