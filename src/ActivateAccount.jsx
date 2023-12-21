// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css'
// import './Style/ActivateAccount.css'

// function ActivateAccount() {
//     const { activationToken } = useParams();
//     const navigate = useNavigate();
//     const [message, setMessage] = useState('');

//     useEffect(() => {
//         axios.post(`http://localhost:3001/api/users/activate/${activationToken}`)
//             .then(response => {
//                 setMessage(response.data.message);
//                 setTimeout(() => navigate('/login'), 3000); // Redirect to login after a short delay
//             })
//             .catch(error => {
//                 setMessage(error.response?.data?.error || 'Error activating account.');
//             });
//     }, [activationToken, navigate]);

//     return (
//         <div className="container mt-5 activate-container">
//             <div className="row">
//                 <div className="col-md-8 offset-md-2">
//                     <div className={`card text-center activation-card ${status === 'error' ? 'bg-danger text-white' : 'bg-success text-white'}`}>
//                         <div className="card-header">
//                             Account Activation
//                         </div>
//                         <div className="card-body">
//                             {status === 'loading' && <div className="spinner-border text-primary" role="status">
//                                 <span className="sr-only">Loading...</span>
//                             </div>}
//                             <h5 className="card-title">{status === 'loading' ? 'Activating your account...' : 'Activation Status'}</h5>
//                             <p className="card-text">{message}</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ActivateAccount;


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Style/ActivateAccount.css';

function ActivateAccount() {
    const { activationToken } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true); // Indicates if the activation process is in progress
    const [isError, setIsError] = useState(false); // Indicates if an error occurred during activation

    useEffect(() => {
        axios.post(`http://localhost:3001/api/users/activate/${activationToken}`)
            .then(response => {
                alert('Account activated sucessfully')
                setMessage(response.data.message);
                setIsLoading(false);
                setTimeout(() => navigate('/login'), 5000); // Redirect to login after a short delay
            })
            .catch(error => {
                setMessage(error.response?.data?.error || 'Error activating account.');
                setIsLoading(false);
                setIsError(true);
                setTimeout(() => navigate('/'), 10000);
            });
    }, [activationToken, navigate]);

    return (
        <div className="container mt-5 activate-container">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <div className={`card text-center activation-card ${isError ? 'bg-danger text-white' : 'bg-success text-white'}`}>
                        <div className="card-header">
                            Account Activation
                        </div>
                        <div className="card-body">
                            {isLoading && <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>}
                            <h5 className="card-title">{isLoading ? 'Activating your account...' : 'Activation Status'}</h5>
                            <p className="card-text">{message}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ActivateAccount;
