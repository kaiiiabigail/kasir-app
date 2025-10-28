import React from 'react';
import { FiClock, FiCheckCircle, FiTruck } from 'react-icons/fi';
import '../Styles/OrderCard.css';

const OrderCard = ({ order, onViewOrder }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'process':
        return { 
          label: 'Diproses', 
          color: '#FF9800', 
          bgColor: '#FFF3E0',
          icon: <FiClock />
        };
      case 'ready':
        return { 
          label: 'Siap Diantar', 
          color: '#2196F3', 
          bgColor: '#E3F2FD',
          icon: <FiTruck />
        };
      case 'completed':
        return { 
          label: 'Selesai', 
          color: '#4CAF50', 
          bgColor: '#E8F5E9',
          icon: <FiCheckCircle />
        };
      default:
        return { 
          label: 'Unknown', 
          color: '#9E9E9E', 
          bgColor: '#F5F5F5',
          icon: null
        };
    }
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'pastry':
        return 'Pastry';
      case 'makanan-berat':
        return 'Makanan Berat';
      case 'minuman':
        return 'Minuman';
      default:
        return category;
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const statusConfig = getStatusConfig(order.orderStatus);

  return (
    <div className="order-card">
      <div className="order-card-header">
        <div className="order-info">
          <h3 className="order-table">{order.table}</h3>
          <span className="order-id">#{order.id}</span>
        </div>
        <div 
          className="order-status-badge" 
          style={{ 
            backgroundColor: statusConfig.bgColor, 
            color: statusConfig.color,
            border: `1px solid ${statusConfig.color}30`
          }}
        >
          {statusConfig.icon}
          <span>{statusConfig.label}</span>
        </div>
      </div>

      <div className="order-card-body">
        <div className="order-meta">
          <span className="order-category">{getCategoryLabel(order.category)}</span>
          <span className="order-time">{formatDate(order.createdAt)}</span>
        </div>

        <div className="order-items-preview">
          {order.items.slice(0, 2).map((item, index) => (
            <div key={index} className="order-item-preview">
              <span>{item.quantity}x {item.name}</span>
            </div>
          ))}
          {order.items.length > 2 && (
            <span className="order-items-more">+{order.items.length - 2} item lainnya</span>
          )}
        </div>
      </div>

      <div className="order-card-footer">
        <div className="order-total">
          <span className="order-total-label">Total:</span>
          <span className="order-total-price">
            Rp {order.totalPrice.toLocaleString('id-ID')}
          </span>
        </div>
        <button 
          className="view-order-btn"
          onClick={() => onViewOrder(order)}
        >
          Lihat Pesanan
        </button>
      </div>
    </div>
  );
};

export default OrderCard;