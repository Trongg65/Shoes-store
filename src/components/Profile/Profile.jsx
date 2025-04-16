import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaShoppingBag, FaCog, FaSignOutAlt, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import './Profile.scss';

const Profile = () => {
  const { account, isAuthenticated } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: account?.username || '',
    email: account?.email || '',
    fullName: account?.full_name || '',
    phone: account?.phone || '',
    address: account?.address || ''
  });
  
  // Mock data for orders
  const [orders, setOrders] = useState([
    {
      id: 'ORD001',
      date: '2023-04-15',
      status: 'Delivered',
      total: 299.99,
      items: [
        { id: 1, name: 'Nike Air Max', quantity: 1, price: 299.99 }
      ]
    },
    {
      id: 'ORD002',
      date: '2023-03-20',
      status: 'Processing',
      total: 159.98,
      items: [
        { id: 2, name: 'Adidas Ultraboost', quantity: 1, price: 159.98 }
      ]
    }
  ]);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSaveProfile = () => {
    // Here you would typically dispatch an action to update the user profile
    // For now, we'll just simulate a successful update
    console.log('Profile updated:', formData);
    setIsEditing(false);
    // Show success message
  };
  
  const handleLogout = () => {
    // Dispatch logout action
    navigate('/');
  };
  
  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <div className="profile-avatar">
          <div className="avatar-circle">
            {account?.username?.charAt(0).toUpperCase() || 'U'}
          </div>
          <h3>{account?.username || 'User'}</h3>
        </div>
        
        <div className="profile-menu">
          <button 
            className={`menu-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <FaUser /> Profile
          </button>
          <button 
            className={`menu-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <FaShoppingBag /> Orders
          </button>
          <button 
            className={`menu-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <FaCog /> Settings
          </button>
          <button className="menu-item logout" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
      
      <div className="profile-content">
        {activeTab === 'profile' && (
          <div className="profile-section">
            <div className="section-header">
              <h2>Personal Information</h2>
              {!isEditing ? (
                <button className="edit-button" onClick={() => setIsEditing(true)}>
                  <FaEdit /> Edit Profile
                </button>
              ) : (
                <div className="edit-actions">
                  <button className="save-button" onClick={handleSaveProfile}>
                    <FaSave /> Save
                  </button>
                  <button className="cancel-button" onClick={() => setIsEditing(false)}>
                    <FaTimes /> Cancel
                  </button>
                </div>
              )}
            </div>
            
            <div className="profile-form">
              <div className="form-group">
                <label>Username</label>
                {isEditing ? (
                  <input 
                    type="text" 
                    name="username" 
                    value={formData.username} 
                    onChange={handleInputChange}
                    disabled
                  />
                ) : (
                  <p>{formData.username}</p>
                )}
              </div>
              
              <div className="form-group">
                <label>Email</label>
                {isEditing ? (
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{formData.email}</p>
                )}
              </div>
              
              <div className="form-group">
                <label>Full Name</label>
                {isEditing ? (
                  <input 
                    type="text" 
                    name="fullName" 
                    value={formData.fullName} 
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{formData.fullName || 'Not provided'}</p>
                )}
              </div>
              
              <div className="form-group">
                <label>Phone</label>
                {isEditing ? (
                  <input 
                    type="text" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{formData.phone || 'Not provided'}</p>
                )}
              </div>
              
              <div className="form-group">
                <label>Address</label>
                {isEditing ? (
                  <textarea 
                    name="address" 
                    value={formData.address} 
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{formData.address || 'Not provided'}</p>
                )}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'orders' && (
          <div className="profile-section">
            <h2>Order History</h2>
            
            {orders.length === 0 ? (
              <div className="empty-state">
                <p>You haven't placed any orders yet.</p>
                <button className="shop-button" onClick={() => navigate('/')}>
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="orders-list">
                {orders.map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <div className="order-info">
                        <h3>Order #{order.id}</h3>
                        <p className="order-date">{new Date(order.date).toLocaleDateString()}</p>
                      </div>
                      <div className="order-status">
                        <span className={`status-badge ${order.status.toLowerCase()}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="order-items">
                      {order.items.map(item => (
                        <div key={item.id} className="order-item">
                          <div className="item-details">
                            <h4>{item.name}</h4>
                            <p>Quantity: {item.quantity}</p>
                          </div>
                          <div className="item-price">
                            ${item.price.toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="order-footer">
                      <div className="order-total">
                        <span>Total:</span>
                        <span className="total-amount">${order.total.toFixed(2)}</span>
                      </div>
                      <button className="view-details-button">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="profile-section">
            <h2>Account Settings</h2>
            
            <div className="settings-list">
              <div className="setting-item">
                <h3>Change Password</h3>
                <p>Update your password to keep your account secure</p>
                <button className="action-button">Change Password</button>
              </div>
              
              <div className="setting-item">
                <h3>Email Preferences</h3>
                <p>Manage your email notification settings</p>
                <button className="action-button">Manage Preferences</button>
              </div>
              
              <div className="setting-item">
                <h3>Two-Factor Authentication</h3>
                <p>Add an extra layer of security to your account</p>
                <button className="action-button">Enable 2FA</button>
              </div>
              
              <div className="setting-item danger-zone">
                <h3>Delete Account</h3>
                <p>Permanently delete your account and all associated data</p>
                <button className="delete-button">Delete Account</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile; 