import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaShoppingBag, FaCog, FaSignOutAlt, FaEdit, FaSave, FaTimes, FaChartLine, FaUsers, FaBox, FaBell, FaShieldAlt } from 'react-icons/fa';
import './ProfileAdmin.scss';

const ProfileAdmin = () => {
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
  
  // Mock data for admin dashboard
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 1250,
    totalOrders: 3420,
    totalProducts: 156,
    totalRevenue: 125000,
    recentActivity: [
      { id: 1, type: 'order', message: 'New order #12345 received', time: '5 minutes ago' },
      { id: 2, type: 'user', message: 'New user registration', time: '15 minutes ago' },
      { id: 3, type: 'product', message: 'Product "Nike Air Max" updated', time: '1 hour ago' },
      { id: 4, type: 'order', message: 'Order #12340 delivered', time: '2 hours ago' },
      { id: 5, type: 'user', message: 'User "john_doe" updated profile', time: '3 hours ago' }
    ]
  });
  
  useEffect(() => {
    if (!isAuthenticated || !account?.is_staff) {
      navigate('/login');
    }
  }, [isAuthenticated, account, navigate]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSaveProfile = () => {
    // Here you would typically dispatch an action to update the admin profile
    console.log('Admin profile updated:', formData);
    setIsEditing(false);
    // Show success message
  };
  
  const handleLogout = () => {
    // Dispatch logout action
    navigate('/');
  };
  
  if (!isAuthenticated || !account?.is_staff) {
    return null;
  }
  
  return (
    <div className="profile-admin-container">
      <div className="profile-admin-sidebar">
        <div className="profile-admin-avatar">
          <div className="avatar-circle admin">
            {account?.username?.charAt(0).toUpperCase() || 'A'}
          </div>
          <h3>{account?.username || 'Admin'}</h3>
          <span className="admin-badge">Administrator</span>
        </div>
        
        <div className="profile-admin-menu">
          <button 
            className={`menu-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <FaUser /> Profile
          </button>
          <button 
            className={`menu-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <FaChartLine /> Dashboard
          </button>
          <button 
            className={`menu-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <FaUsers /> User Management
          </button>
          <button 
            className={`menu-item ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <FaBox /> Product Management
          </button>
          <button 
            className={`menu-item ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <FaBell /> Notifications
          </button>
          <button 
            className={`menu-item ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <FaShieldAlt /> Security
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
      
      <div className="profile-admin-content">
        {activeTab === 'profile' && (
          <div className="profile-admin-section">
            <div className="section-header">
              <h2>Administrator Profile</h2>
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
            
            <div className="profile-admin-form">
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
              
              <div className="form-group">
                <label>Admin Role</label>
                <p className="admin-role">Super Administrator</p>
              </div>
              
              <div className="form-group">
                <label>Last Login</label>
                <p>{new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'dashboard' && (
          <div className="profile-admin-section">
            <h2>Admin Dashboard</h2>
            
            <div className="dashboard-stats">
              <div className="stat-card">
                <div className="stat-icon users">
                  <FaUsers />
                </div>
                <div className="stat-info">
                  <h3>Total Users</h3>
                  <p className="stat-value">{dashboardStats.totalUsers}</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon orders">
                  <FaShoppingBag />
                </div>
                <div className="stat-info">
                  <h3>Total Orders</h3>
                  <p className="stat-value">{dashboardStats.totalOrders}</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon products">
                  <FaBox />
                </div>
                <div className="stat-info">
                  <h3>Total Products</h3>
                  <p className="stat-value">{dashboardStats.totalProducts}</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon revenue">
                  <FaChartLine />
                </div>
                <div className="stat-info">
                  <h3>Total Revenue</h3>
                  <p className="stat-value">${dashboardStats.totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            <div className="recent-activity">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                {dashboardStats.recentActivity.map(activity => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-icon">
                      {activity.type === 'order' && <FaShoppingBag />}
                      {activity.type === 'user' && <FaUsers />}
                      {activity.type === 'product' && <FaBox />}
                    </div>
                    <div className="activity-content">
                      <p>{activity.message}</p>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'users' && (
          <div className="profile-admin-section">
            <h2>User Management</h2>
            <p>This section would contain user management features such as:</p>
            <ul className="feature-list">
              <li>View all users</li>
              <li>Edit user details</li>
              <li>Change user roles</li>
              <li>Block/unblock users</li>
              <li>View user activity</li>
            </ul>
            <button className="action-button" onClick={() => navigate('/admin/manage-users')}>
              Go to User Management
            </button>
          </div>
        )}
        
        {activeTab === 'products' && (
          <div className="profile-admin-section">
            <h2>Product Management</h2>
            <p>This section would contain product management features such as:</p>
            <ul className="feature-list">
              <li>View all products</li>
              <li>Add new products</li>
              <li>Edit product details</li>
              <li>Manage inventory</li>
              <li>Set product categories</li>
            </ul>
            <button className="action-button" onClick={() => navigate('/admin/manage-products')}>
              Go to Product Management
            </button>
          </div>
        )}
        
        {activeTab === 'notifications' && (
          <div className="profile-admin-section">
            <h2>Notification Settings</h2>
            <div className="notification-settings">
              <div className="setting-item">
                <h3>Email Notifications</h3>
                <div className="toggle-switch">
                  <input type="checkbox" id="email-notifications" defaultChecked />
                  <label htmlFor="email-notifications"></label>
                </div>
                <p>Receive email notifications for important events</p>
              </div>
              
              <div className="setting-item">
                <h3>Order Notifications</h3>
                <div className="toggle-switch">
                  <input type="checkbox" id="order-notifications" defaultChecked />
                  <label htmlFor="order-notifications"></label>
                </div>
                <p>Get notified when new orders are placed</p>
              </div>
              
              <div className="setting-item">
                <h3>User Notifications</h3>
                <div className="toggle-switch">
                  <input type="checkbox" id="user-notifications" defaultChecked />
                  <label htmlFor="user-notifications"></label>
                </div>
                <p>Get notified when new users register</p>
              </div>
              
              <div className="setting-item">
                <h3>System Notifications</h3>
                <div className="toggle-switch">
                  <input type="checkbox" id="system-notifications" defaultChecked />
                  <label htmlFor="system-notifications"></label>
                </div>
                <p>Receive notifications about system updates and maintenance</p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'security' && (
          <div className="profile-admin-section">
            <h2>Security Settings</h2>
            <div className="security-settings">
              <div className="setting-item">
                <h3>Change Password</h3>
                <p>Update your password to keep your account secure</p>
                <button className="action-button">Change Password</button>
              </div>
              
              <div className="setting-item">
                <h3>Two-Factor Authentication</h3>
                <p>Add an extra layer of security to your account</p>
                <button className="action-button">Enable 2FA</button>
              </div>
              
              <div className="setting-item">
                <h3>Login History</h3>
                <p>View your recent login activity</p>
                <button className="action-button">View History</button>
              </div>
              
              <div className="setting-item danger-zone">
                <h3>Delete Account</h3>
                <p>Permanently delete your admin account</p>
                <button className="delete-button">Delete Account</button>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="profile-admin-section">
            <h2>Admin Settings</h2>
            <div className="admin-settings">
              <div className="setting-item">
                <h3>Site Settings</h3>
                <p>Configure general site settings</p>
                <button className="action-button">Configure</button>
              </div>
              
              <div className="setting-item">
                <h3>Email Templates</h3>
                <p>Manage email templates for notifications</p>
                <button className="action-button">Manage Templates</button>
              </div>
              
              <div className="setting-item">
                <h3>Payment Settings</h3>
                <p>Configure payment gateway settings</p>
                <button className="action-button">Configure</button>
              </div>
              
              <div className="setting-item">
                <h3>Backup & Restore</h3>
                <p>Manage database backups</p>
                <button className="action-button">Manage Backups</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileAdmin; 