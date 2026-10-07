import { useState, useRef } from 'react';
import { CloudUpload, Database, Shield, Zap, RefreshCw, FileText, ArrowRight, Eye, Trash2, FileSpreadsheet, Loader2 } from 'lucide-react';










export default function MyData() {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const features = [
  { icon: Database, title: 'Automatic processing', desc: 'AI cleans and structures your data' },
  { icon: Shield, title: 'Secure storage', desc: 'Your data is encrypted and safe' },
  { icon: Zap, title: 'Ready for AI', desc: 'Start asking questions instantly' },
  { icon: RefreshCw, title: 'Supports multiple files', desc: 'Upload and manage multiple datasets' }];


  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const validateFile = (file) => {
    setError(null);
    const validTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    const validExtensions = ['.csv', '.xls', '.xlsx'];

    const hasValidExtension = validExtensions.some((ext) => file.name.toLowerCase().endsWith(ext));
    if (!hasValidExtension && !validTypes.includes(file.type)) {
      setError('Unsupported file type. Please upload XLSX, XLS or CSV.');
      return false;
    }

    if (file.size > 100 * 1024 * 1024) {
      setError('File exceeds the 100 MB limit.');
      return false;
    }

    return true;
  };

  const processFile = (file) => {
    if (!validateFile(file)) return;

    const newFile = {
      id: Math.random().toString(36).substring(7),
      name: file.name,
      type: file.name.split('.').pop()?.toUpperCase() || 'CSV',
      records: 'Calculating...',
      uploadedOn: 'Just now',
      status: 'processing'
    };

    setFiles((prev) => [newFile, ...prev]);

    setTimeout(() => {
      setFiles((prev) => prev.map((f) => {
        if (f.id === newFile.id) {
          return {
            ...f,
            status: 'ready',
            records: Math.floor(Math.random() * 50000) + 1000
          };
        }
        return f;
      }));
    }, 3000);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleRemove = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="page-content">
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h1 className="page-title">My Data</h1>
          <p className="page-subtitle">Upload, manage and let Dreamz AI process your business data.</p>
        </div>
      </div>

      <div className="mydata-workspace">
        <div
          className={`upload-zone ${isDragging ? 'dragging' : ''} ${error ? 'has-error' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}>
          
          <div className="upload-icon-container">
            <CloudUpload size={48} className="upload-icon" />
          </div>
          <h2 className="upload-title">Upload your data</h2>
          <p className="upload-subtitle">Drag & drop Excel or CSV files here</p>
          <div className="upload-divider">
            <span className="upload-divider-text">or</span>
          </div>
          <button
            className="btn-primary"
            onClick={() => fileInputRef.current?.click()}>
            
            Browse Files
          </button>
          <p className="upload-formats">Supported formats: .XLSX, .XLS, .CSV (Max 100 MB)</p>
          {error && <div className="upload-error">{error}</div>}
          
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            onChange={handleFileSelect} />
          
        </div>

        <div className="features-row">
          {features.map((feature, idx) =>
          <div key={idx} className="feature-item">
              <div className="feature-icon-wrapper">
                <feature.icon size={20} className="feature-icon" />
              </div>
              <div className="feature-content">
                <div className="feature-title">{feature.title}</div>
                <div className="feature-desc">{feature.desc}</div>
              </div>
            </div>
          )}
        </div>

        <hr className="page-divider" />

        <div className="recent-uploads-section">
          <div className="section-header">
            <h3 className="section-title">Recent Uploads</h3>
            <span className="link-action">View All <ArrowRight size={14} style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '2px' }} /></span>
          </div>

          <div className="table-container">
            <table className="upload-table">
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>Type</th>
                  <th>Records</th>
                  <th>Uploaded On</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {files.length === 0 ?
                <tr>
                    <td colSpan={6}>
                      <div className="empty-state">
                        <div className="empty-icon-wrapper">
                          <FileSpreadsheet size={32} className="empty-icon" />
                        </div>
                        <h4 className="empty-title">No files uploaded yet</h4>
                        <p className="empty-desc">Upload your first file to get started</p>
                      </div>
                    </td>
                  </tr> :

                files.map((file) =>
                <tr key={file.id}>
                      <td className="file-name-cell">
                        <FileText size={16} className="file-name-icon" />
                        <span className="file-name-text" title={file.name}>{file.name}</span>
                      </td>
                      <td>{file.type}</td>
                      <td>
                        {file.status === 'processing' ?
                    <span style={{ color: 'var(--text-muted)' }}>Calculating...</span> :

                    file.records.toLocaleString()
                    }
                      </td>
                      <td>{file.uploadedOn}</td>
                      <td>
                        <div className={`status-badge ${file.status}`}>
                          {file.status === 'processing' && <Loader2 size={12} className="spinner" />}
                          {file.status === 'ready' && <div className="status-dot green"></div>}
                          {file.status.charAt(0).toUpperCase() + file.status.slice(1)}
                        </div>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div className="action-buttons">
                          <button className="action-btn" title="View">
                            <Eye size={16} />
                          </button>
                          <button className="action-btn error" title="Remove" onClick={() => handleRemove(file.id)}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>);

}