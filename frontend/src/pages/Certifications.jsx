import React, { useState, useEffect } from "react";
import { Award, Calendar, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/clean.css";

export function Certifications() {
  const navigate = useNavigate();
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/portfolio.json')
      .then(res => res.json())
      .then(data => {
        setCertifications(data.certifications || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading certifications:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ padding: '100px 20px', textAlign: 'center' }}>Loading...</div>;

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f7', paddingTop: '80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <button 
          onClick={() => navigate('/')}
          style={{
            background: '#5856d6',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            marginBottom: '30px',
            fontWeight: '600'
          }}
        >
          ← Back to Home
        </button>
        
        <div style={{ background: 'white', borderRadius: '16px', padding: '40px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '30px' }}>
            <Award size={32} color="#5856d6" />
            <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1d1d1f' }}>Certifications</h1>
          </div>
          
          <div style={{ display: 'grid', gap: '20px' }}>
            {certifications.map((cert) => (
              <div 
                key={cert.id}
                style={{
                  background: '#f5f5f7',
                  borderRadius: '12px',
                  padding: '24px',
                  transition: 'all 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#e5e5e7';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f5f5f7';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1d1d1f', marginBottom: '8px' }}>
                      {cert.name}
                    </h3>
                    <p style={{ fontSize: '15px', color: '#5856d6', fontWeight: '500', marginBottom: '8px' }}>
                      {cert.organization}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#8e8e93', fontSize: '13px' }}>
                      <Calendar size={14} />
                      <span>{cert.date}</span>
                    </div>
                    {cert.credentialUrl && (
                      <a 
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          marginTop: '12px',
                          color: '#5856d6',
                          textDecoration: 'none',
                          fontSize: '13px',
                          fontWeight: '600'
                        }}
                      >
                        View Credential <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                  <div style={{ 
                    fontSize: '40px',
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'white',
                    borderRadius: '10px'
                  }}>
                    🏆
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Certifications;
