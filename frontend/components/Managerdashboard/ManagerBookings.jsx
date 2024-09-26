import React, { useState, useEffect } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import "../../css/Admindashboardcss/AdminBookings.css"

Chart.register(...registerables);

const ManagerBookings = () => {
  const [dailyBookingsData, setDailyBookingsData] = useState([]);
  const [monthlyBookingsData, setMonthlyBookingsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch("http://localhost:3000/grabBranch", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include" 
        });

        if (response.ok) {
          const branch = await response.json();
          setLocation(branch); 
        } else {
          setError("Failed to fetch Branch"); 
        }
      } catch (err) {
        setError("An error occurred while fetching account details"); 
      }
    };

    fetchLocation();
  }, []);


  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const dailyBookingsRes = await fetch('http://localhost:3000/api/dashboard/daily-bookings-cat', {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include"
        });
        const monthlyBookingsRes = await fetch('http://localhost:3000/api/dashboard/monthly-bookings-cat', {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include"
        });

        if (!dailyBookingsRes.ok || !monthlyBookingsRes.ok) {
          throw new Error('Network response was not ok');
        }
        const dailyBookingsData = await dailyBookingsRes.json();
        const monthlyBookingsData = await monthlyBookingsRes.json();

        setDailyBookingsData(dailyBookingsData);
        setMonthlyBookingsData(monthlyBookingsData);

      } catch (err) {
        console.error("Error fetching dashboard data", err);
      } finally {
        setLoading(false);  
      }
    }
    fetchDashboardData();
  }, [])

  const dailyBookingsLabels = dailyBookingsData.map(item => item._id);
  const dailyBookingsCounts = dailyBookingsData.map(item => item.count);

  const monthlyBookingsLabels = monthlyBookingsData.map(item => `${item._id.year}-${item._id.month}`);
  const monthlyBookingsCounts = monthlyBookingsData.map(item => item.count);

  const dailyBookingsChartData = {
    labels: dailyBookingsLabels,
    datasets: [
      {
        label: 'Bookings Per Day',
        data: dailyBookingsCounts,
        backgroundColor: '#FF6384',
        borderColor: '#FF6384',
        fill: false,
      },
    ],
  };

  const monthlyBookingsChartData = {
    labels: monthlyBookingsLabels,
    datasets: [
      {
        label: 'Bookings Per Month',
        data: monthlyBookingsCounts,
        backgroundColor: '#FFCE56',
        borderColor: 'black',
        fill: false,
      },
    ],
  };

  return (
    <div style={{ textAlign: "center" }} >
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="chart-section-2">
          <div className="location-m">{location}</div>
          <div className="chart-container">
            <h2>Daily Bookings(Previous 7 days)</h2>
            {dailyBookingsData.length > 0 ? (
              <Line data={dailyBookingsChartData} />
            ) : (
              <p>No daily bookings data available</p>
            )}
          </div>

          <div className="chart-container">
            <h2>Monthly Bookings</h2>
            {monthlyBookingsData.length > 0 ? (
              <Bar data={monthlyBookingsChartData} />
            ) : (
              <p>No monthly bookings data available</p>
            )}
          </div>
        </div>
      )
      }
    </div>
  )
}

export default ManagerBookings