import React, { useState } from 'react';
import { FiBell, FiUser } from 'react-icons/fi';
import Sidebar from '../components/Sidebar';
import OrderCard from '../components/OrderCard';
import ViewOrderModal from '../components/ViewOrderModal';
import { mockOrders, historyOrders } from '../data/mockdata';
import './Order.css';

const OrderPage = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [history, setHistory] = useState(historyOrders);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTable, setSelectedTable] = useState('all');
  const [showHistory, setShowHistory] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Filter orders berdasarkan status, category, dan table
  const getFilteredOrders = () => {
    const dataSource = showHistory ? history : orders;
    
    return dataSource.filter(order => {
      const statusMatch = selectedStatus === 'all' || order.orderStatus === selectedStatus;
      const categoryMatch = selectedCategory === 'all' || order.category === selectedCategory;
      const tableMatch = selectedTable === 'all' || order.table === selectedTable;
      
      return statusMatch && categoryMatch && tableMatch;
    });
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  const handleUpdateOrder = (updatedOrder) => {
    if (updatedOrder.status === 'history') {
      // Pindahkan ke history
      setOrders(orders.filter(order => order.id !== updatedOrder.id));
      setHistory([updatedOrder, ...history]);
    } else {
      // Update di active orders
      setOrders(orders.map(order => 
        order.id === updatedOrder.id ? updatedOrder : order
      ));
    }
  };

  const filteredOrders = getFilteredOrders();

  const getStatusCounts = () => {
    if (showHistory) return null;
    
    return {
      process: orders.filter(o => o.orderStatus === 'process').length,
      ready: orders.filter(o => o.orderStatus === 'ready').length,
      completed: orders.filter(o => o.orderStatus === 'completed').length,
      total: orders.length
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="order-page">
      {/* Sidebar */}
      <Sidebar
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedTable={selectedTable}
        onTableChange={setSelectedTable}
        showHistory={showHistory}
        onToggleHistory={() => {
          setShowHistory(!showHistory);
          setSelectedStatus('all');
        }}
      />

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="page-header">
          <div className="header-left">
            <h1 className="logo"> Savor Bakery</h1>
          </div>
          {/* <nav className="header-nav">
            <a href="#" className="nav-link">Dashboard</a>
            <a href="#" className="nav-link active">Orders</a>
            <a href="#" className="nav-link">Menu</a>
            <a href="#" className="nav-link">Staff</a>
            <a href="#" className="nav-link">Reports</a>
          </nav> */}
          {/* <div className="header-right">
            <button className="icon-button">
              <FiBell />
              <span className="notification-badge">3</span>
            </button>
            <div className="user-profile">
              <div className="user-avatar">
                <FiUser />
              </div>
            </div>
          </div> */}
        </header>

        {/* Content Area */}
        <div className="content-area">
          <div className="content-header">
            <div className="header-title-section">
              <h2 className="content-title">{showHistory ? 'Riwayat Pesanan' : 'Pesanan Aktif'}</h2>
              <p className="content-subtitle">
                {showHistory 
                  ? 'Lihat semua pesanan yang telah selesai'
                  : 'Kelola semua pesanan masuk dan lacak statusnya'
                }
              </p>
            </div>
          </div>

          {/* Status Summary */}
          {!showHistory && statusCounts && (
            <div className="status-summary">
              <div className="summary-card total">
                <div className="summary-icon"></div>
                <div className="summary-info">
                  <span className="summary-label">Total Pesanan</span>
                  <span className="summary-value">{statusCounts.total}</span>
                </div>
              </div>
              <div className="summary-card process">
                <div className="summary-icon"></div>
                <div className="summary-info">
                  <span className="summary-label">Diproses</span>
                  <span className="summary-value">{statusCounts.process}</span>
                </div>
              </div>
              <div className="summary-card ready">
                <div className="summary-icon"></div>
                <div className="summary-info">
                  <span className="summary-label">Siap Diantar</span>
                  <span className="summary-value">{statusCounts.ready}</span>
                </div>
              </div>
              <div className="summary-card completed">
                <div className="summary-icon"></div>
                <div className="summary-info">
                  <span className="summary-label">Selesai</span>
                  <span className="summary-value">{statusCounts.completed}</span>
                </div>
              </div>
            </div>
          )}

          {/* Orders Grid */}
          <div className="orders-container">
            {filteredOrders.length > 0 ? (
              <div className="orders-grid">
                {filteredOrders.map(order => (
                  <OrderCard 
                    key={order.id} 
                    order={order}
                    onViewOrder={handleViewOrder}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">📋</div>
                <h3>Tidak ada pesanan</h3>
                <p>
                  {showHistory 
                    ? 'Belum ada riwayat pesanan yang tersedia'
                    : 'Saat ini tidak ada pesanan dengan filter yang dipilih'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedOrder && (
        <ViewOrderModal
          order={selectedOrder}
          onClose={handleCloseModal}
          onUpdateOrder={handleUpdateOrder}
        />
      )}
    </div>
  );
};

export default OrderPage;