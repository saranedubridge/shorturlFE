import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "bootstrap/dist/css/bootstrap.min.css";
import "./Style/Dashboard.css";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const [dailyCount, setDailyCount] = useState(0);
    const [monthlyData, setMonthlyData] = useState({
        labels: [],
        datasets: [
            {
                label: "URLs Created",
                data: [],
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            },
        ],
    });

    useEffect(() => {
        fetch("http://localhost:3001/api/stats")
            .then((response) => response.json())
            .then((data) => {
                setDailyCount(data.dailyCount || 0);
                if (data.monthlyCounts && Array.isArray(data.monthlyCounts)) {
                    setMonthlyData({
                        labels: data.monthlyCounts.map((item) => `Day ${item._id}`),
                        datasets: [
                            {
                                label: "URLs Created",
                                data: data.monthlyCounts.map((item) => item.count),
                                backgroundColor: "rgba(54, 162, 235, 0.2)",
                                borderColor: "rgba(54, 162, 235, 1)",
                                borderWidth: 1,
                            },
                        ],
                    });
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    return (
        <div>
            <div className="d-flex justify-content-between mt-2">
                <h5 className=" mb-0 text-primary text-margin-left">Dashboard</h5>
            </div>
            <div className="d-flex justify-content-end mt-0 ">
                {/* <Link to="/dashboard" className="btn btn-success mb-3 ">Dashboard</Link> */}
                <Link to="/url" className="btn btn-success mb-3 ">
                    URL Shortener
                </Link>
                <Link to="/table" className="btn btn-success mb-3">
                    Table
                </Link>
                <Link to="/login" className="btn btn-danger mb-3">
                    Logout
                </Link>
            </div>

            <div
                className="container-fluid mt-2 mx-auto"
                style={{ maxWidth: "1500px" }}
            >
                <h2 className="dashboard-title text-center">URL Analytics Dashboard</h2>

                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="dashboard-card text-center mb-3">
                            <div className="card-body">
                                <h5 className="card-title">URLs Created Today</h5>
                                <p className="card-content fs-3">{dailyCount}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="dashboard-card">
                            <div className="card-body">
                                <h5 className="card-title">Monthly URL Creation</h5>
                                {/* Bar chart for monthly data */}
                                <div className="chart-container">
                                    <Bar data={monthlyData} options={{ responsive: true }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
