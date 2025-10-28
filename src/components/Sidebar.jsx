import React, { useState } from 'react';
import { FiClock, FiCheckCircle, FiTruck, FiList, FiMenu, FiX } from 'react-icons/fi';
import { BiCoffee, BiDrink, BiFoodMenu } from 'react-icons/bi';
import './Sidebar.css';

const Sidebar = ({ 
  selectedStatus, 
  onStatusChange, 
  selectedCategory, 
  onCategoryChange,
  selectedTable,
  onTableChange,
  showHistory,
  onToggleHistory 
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setShowOverlay(!isOpen);
  };
  
  const statusOptions = [
    { value: 'all', label: 'Semua Pesanan', icon: <FiList /> },
    { value: 'diproses', label: 'Diproses', icon: <FiClock />, color: '#FF9800' },
    { value: 'siap-diantar', label: 'Siap Diantar', icon: <FiTruck />, color: '#2196F3' },
    { value: 'selesai', label: 'Selesai', icon: <FiCheckCircle />, color: '#4CAF50' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'Semua Kategori', icon: <BiFoodMenu /> },
    { value: 'pastry', label: 'Pastry', icon: <BiCoffee /> },
    { value: 'makanan-berat', label: 'Makanan Berat', icon: <BiFoodMenu /> },
    { value: 'minuman', label: 'Minuman', icon: <BiDrink /> }
  ];

  const tableOptions = [
    { value: 'all', label: 'Semua Meja' },
    { value: 'Table 1', label: 'Table 1' },
    { value: 'Table 2', label: 'Table 2' },
    { value: 'Table 3', label: 'Table 3' },
    { value: 'Table 4', label: 'Table 4' },
    { value: 'Table 5', label: 'Table 5' },
    { value: 'Table 6', label: 'Table 6' }
  ];

  return (
    <>
      <div className={`sidebar-overlay ${showOverlay ? 'show' : ''}`} onClick={toggleSidebar}></div>
      <div className="sidebar-wrapper">
        <button 
          className={`sidebar-toggle ${isOpen ? 'sidebar-open' : ''}`}
          onClick={toggleSidebar}
          aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        
        <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h1 className="text-xl font-bold">Savor Bakery</h1>
        </div>

        <div className="sidebar-content">
          {/* History Toggle */}
          <div className="filter-section">
            <button 
              className={`history-toggle ${showHistory ? 'active' : ''}`}
              onClick={onToggleHistory}
            >
              <FiClock className="filter-icon" />
              <span className="toggle-label">
                {showHistory ? 'Lihat Pesanan Aktif' : 'Lihat Riwayat'}
              </span>
            </button>
          </div>

          {/* Status Filter */}
          <div className="filter-section">
            <h4 className="filter-title">Status Pesanan</h4>
            <div className="filter-options">
              {statusOptions.map(option => (
                <button
                  key={option.value}
                  className={`filter-option ${selectedStatus === option.value ? 'active' : ''}`}
                  onClick={() => onStatusChange(option.value)}
                  data-status={option.value}
                >
                  <span className="filter-icon">{option.icon}</span>
                  <span className="filter-label">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="filter-section">
            <h4 className="filter-title">Kategori</h4>
            <div className="filter-options horizontal-options">
              {categoryOptions.map(option => (
                <button
                  key={option.value}
                  className={`filter-chip ${selectedCategory === option.value ? 'active' : ''}`}
                  onClick={() => onCategoryChange(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Table Filter */}
          <div className="filter-section">
            <h4 className="filter-title">Meja</h4>
            <div className="filter-options horizontal-options">
              <button
                className={`filter-chip ${selectedTable === 'all' ? 'active' : ''}`}
                onClick={() => onTableChange('all')}
              >
                Semua Meja
              </button>
              {[1, 2, 3, 4, 5, 6].map(table => (
                <button
                  key={table}
                  className={`filter-chip ${selectedTable === `Table ${table}` ? 'active' : ''}`}
                  onClick={() => onTableChange(`Table ${table}`)}
                >
                  Table {table}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
    </>
  );
};

export default Sidebar;