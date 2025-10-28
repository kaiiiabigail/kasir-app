import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import Stepper, { Step } from './Stepper';
import '../Styles/ViewOrderModal.css';

const ViewOrderModal = ({ order, onClose, onUpdateOrder }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [orderStatus, setOrderStatus] = useState(order.orderStatus);

  if (!order) return null;

  const getStepIndex = (status) => {
    switch (status) {
      case 'process':
        return 0;
      case 'ready':
        return 1;
      case 'completed':
        return 2;
      default:
        return 0;
    }
  };

  const getStatusFromStep = (step) => {
    switch (step) {
      case 0:
        return 'process';
      case 1:
        return 'ready';
      case 2:
        return 'completed';
      default:
        return 'process';
    }
  };

  const handleStepChange = (step) => {
    const newStatus = getStatusFromStep(step);
    setOrderStatus(newStatus);
  };

  const handleFinalStepCompleted = () => {
    const updatedOrder = {
      ...order,
      orderStatus: 'completed',
      status: 'history',
      completedAt: new Date()
    };
    onUpdateOrder(updatedOrder);
    onClose();
  };

  const handleSaveChanges = () => {
    const updatedOrder = {
      ...order,
      orderStatus: orderStatus,
      status: orderStatus === 'completed' ? 'history' : 'active',
      completedAt: orderStatus === 'completed' ? new Date() : undefined
    };
    onUpdateOrder(updatedOrder);
    setIsEditing(false);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>Detail Pesanan</h2>
            <p className="modal-subtitle">Order #{order.id} - {order.table}</p>
          </div>
          <button className="close-button" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="modal-body">
          {/* Order Information */}
          <div className="order-detail-section">
            <h3>Informasi Pesanan</h3>
            <div className="order-detail-grid">
              <div className="detail-item">
                <span className="detail-label">Meja:</span>
                <span className="detail-value">{order.table}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Kategori:</span>
                <span className="detail-value">{getCategoryLabel(order.category)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Waktu Pesan:</span>
                <span className="detail-value">{formatDate(order.createdAt)}</span>
              </div>
              {order.completedAt && (
                <div className="detail-item">
                  <span className="detail-label">Waktu Selesai:</span>
                  <span className="detail-value">{formatDate(order.completedAt)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Order Items */}
          <div className="order-detail-section">
            <h3>Item Pesanan</h3>
            <div className="order-items-list">
              {order.items.map((item, index) => (
                <div key={index} className="order-item-detail">
                  <div className="item-info">
                    <span className="item-name">{item.name}</span>
                    <span className="item-quantity">x{item.quantity}</span>
                  </div>
                  <span className="item-price">
                    Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                  </span>
                </div>
              ))}
            </div>
            <div className="order-total-section">
              <span className="total-label">Total Pembayaran:</span>
              <span className="total-amount">
                Rp {order.totalPrice.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          {/* Edit Status Section */}
          {!isEditing && order.status !== 'history' && (
            <div className="order-detail-section">
              <button 
                className="edit-status-btn"
                onClick={() => setIsEditing(true)}
              >
                Update Status Pesanan
              </button>
            </div>
          )}

          {/* Stepper for Status Update */}
          {isEditing && (
            <div className="order-detail-section stepper-section">
              <h3>Update Status Pesanan</h3>
              <Stepper
                initialStep={getStepIndex(order.orderStatus)}
                onStepChange={handleStepChange}
                onFinalStepCompleted={handleFinalStepCompleted}
                backButtonText="Kembali"
                nextButtonText="Lanjut"
              >
                <Step>
                  <h2>🔄 Pesanan Diproses</h2>
                  <p>Pesanan sedang disiapkan di dapur.</p>
                  <div className="step-info">
                    <p>✅ Pesanan telah diterima</p>
                    <p>✅ Sedang dalam proses pembuatan</p>
                  </div>
                </Step>
                <Step>
                  <h2>🚚 Siap Diantar</h2>
                  <p>Pesanan telah selesai dibuat dan siap untuk diantarkan ke meja.</p>
                  <div className="step-info">
                    <p>✅ Pesanan sudah selesai dibuat</p>
                    <p>✅ Menunggu pengantaran ke meja</p>
                  </div>
                </Step>
                <Step>
                  <h2>✅ Pesanan Selesai</h2>
                  <p>Pesanan telah diantarkan dan diselesaikan.</p>
                  <div className="step-info">
                    <p>✅ Pesanan telah diterima pelanggan</p>
                    <p>✅ Transaksi selesai</p>
                  </div>
                </Step>
              </Stepper>
              <div className="stepper-actions">
                <button 
                  className="cancel-edit-btn"
                  onClick={() => setIsEditing(false)}
                >
                  Batal
                </button>
                <button 
                  className="save-changes-btn"
                  onClick={handleSaveChanges}
                >
                  Simpan Perubahan
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewOrderModal;