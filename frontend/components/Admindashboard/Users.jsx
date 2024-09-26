import React, { useState, useEffect } from 'react';
import '../../css/Admindashboardcss/Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [deletingUsers, setDeletingUsers] = useState(new Set());

  useEffect(() => {
    fetchUsers();
  }, []);

  
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/admindashboard/registeredusers', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data.users);
      setCount(data.registercount);
    } catch (error) {
      setError('Failed to fetch users');
      console.error(error);
    }
  };

  
  const handleDelete = async (id, forceDelete = false) => {
    try {
      const response = await fetch('http://localhost:3000/admindashboard/deleteusers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: id, forceDelete }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.alert) {
        
        setShowConfirm(true);
        setSelectedUserId(id);
      } else {
        
        setDeletingUsers((prev) => new Set(prev).add(id));

        
        setTimeout(() => {
          setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
          setCount((prevCount) => prevCount - 1);
          setDeletingUsers((prev) => {
            const newSet = new Set(prev);
            newSet.delete(id);
            return newSet;
          });
        }, 1000);
      }
    } catch (error) {
      setError('Failed to delete user');
      console.error(error);
    }
  };

 
  const confirmDelete = () => {
    if (selectedUserId) {
      handleDelete(selectedUserId, true); 
      setShowConfirm(false);
      setSelectedUserId(null);
    }
  };

  return (
    <div className="user-management">
      <h1>Registered Users</h1>
      <div className="countboard">
        <p>Total Registered Users</p>
        <span>{count}</span>
      </div>
      {error && <p className="error">{error}</p>}
      <table className="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="user-row">
              {deletingUsers.has(user._id) ? (
                <td colSpan="3" className="delete-message">
                  User deleted successfully!
                </td>
              ) : (
                <>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <button onClick={() => handleDelete(user._id)} className="delete-button">
                      <span className="material-icons">delete</span>
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {}
      {showConfirm && (
        <div className="modal-overlay" onClick={() => setShowConfirm(false)}>
          <div
            className="confirm-modal"
            onClick={(e) => e.stopPropagation()} 
          >
            <p>
              This user has existing bookings. Are you sure you want to delete this user along with
              their bookings and products?
            </p>
            <div className="modal-buttons">
              <button onClick={confirmDelete} className="confirm-button">
                Yes, Delete
              </button>
              <button onClick={() => setShowConfirm(false)} className="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
