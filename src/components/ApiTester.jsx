// src/components/ApiTester.jsx
import React, { useState } from 'react';
import { apiRequest, ENDPOINTS, getHeaders } from '../services/api';
import './ApiTester.css';

const ApiTester = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState(ENDPOINTS.STANDINGS);
  const [params, setParams] = useState({ league: '39', season: '2023' });
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showHeaders, setShowHeaders] = useState(false);

  const handleEndpointChange = (e) => {
    setSelectedEndpoint(e.target.value);
    // Reset params when endpoint changes
    setParams({});
  };

  const handleParamChange = (key, value) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  const handleApiCall = async () => {
    setLoading(true);
    setResponse(null);
    
    try {
      const result = await apiRequest(selectedEndpoint, params);
      setResponse(result);
    } catch (error) {
      setResponse({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const formatJson = (obj) => {
    return JSON.stringify(obj, null, 2);
  };

  return (
    <div className="api-tester">
      <h2>API Football Tester</h2>
      <p>Test your API configuration with different endpoints and parameters</p>
      
      <div className="config-section">
        <h3>Current Headers</h3>
        <button 
          className="toggle-headers-btn"
          onClick={() => setShowHeaders(!showHeaders)}
        >
          {showHeaders ? 'Hide Headers' : 'Show Headers'}
        </button>
        
        {showHeaders && (
          <div className="headers-info">
            <pre>{formatJson(getHeaders())}</pre>
            <p className="note">
              Note: Your API key is loaded from environment variables. 
              Make sure VITE_RAPID_API_KEY is set in your .env file.
            </p>
          </div>
        )}
      </div>
      
      <div className="endpoint-section">
        <h3>Select Endpoint</h3>
        <select 
          value={selectedEndpoint} 
          onChange={handleEndpointChange}
          className="endpoint-select"
        >
          {Object.entries(ENDPOINTS).map(([key, value]) => (
            <option key={key} value={value}>
              {key}: {value}
            </option>
          ))}
        </select>
      </div>
      
      <div className="params-section">
        <h3>Parameters</h3>
        <div className="param-inputs">
          <div className="param-row">
            <label>league:</label>
            <input 
              type="text" 
              value={params.league || ''} 
              onChange={(e) => handleParamChange('league', e.target.value)}
              placeholder="e.g., 39 for Premier League"
            />
          </div>
          <div className="param-row">
            <label>season:</label>
            <input 
              type="text" 
              value={params.season || ''} 
              onChange={(e) => handleParamChange('season', e.target.value)}
              placeholder="e.g., 2023"
            />
          </div>
          <div className="param-row">
            <label>team:</label>
            <input 
              type="text" 
              value={params.team || ''} 
              onChange={(e) => handleParamChange('team', e.target.value)}
              placeholder="Team ID"
            />
          </div>
        </div>
      </div>
      
      <button 
        onClick={handleApiCall} 
        disabled={loading}
        className="api-call-btn"
      >
        {loading ? 'Making API Call...' : 'Make API Call'}
      </button>
      
      {response && (
        <div className="response-section">
          <h3>Response</h3>
          {response.error ? (
            <div className="error-response">
              <h4>Error:</h4>
              <pre>{response.error}</pre>
            </div>
          ) : (
            <div className="success-response">
              <h4>Data Received:</h4>
              <pre>{formatJson(response.data)}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ApiTester;