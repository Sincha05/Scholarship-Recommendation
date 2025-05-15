import React, { useEffect, useState } from "react";
import axios from "axios";

const Scholarships = ({ user }) => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchScholarships = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get("http://localhost:5000/api/scholarships");
      
      if (!response.data?.success) {
        throw new Error(response.data?.error || "Invalid response format");
      }

      setScholarships(response.data.data);
    } catch (error) {
      console.error("Fetch error:", error);
      setError(
        error.response?.data?.error ||
        error.message ||
        "Failed to load scholarships"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScholarships();
  }, []);

  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "300px",
        fontSize: "18px",
        color: "#546e7a",
        fontWeight: "500"
      }}>
        Loading scholarships...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        maxWidth: "800px",
        margin: "40px auto",
        padding: "35px",
        borderRadius: "16px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.12)",
        backgroundColor: "#ffffff",
        textAlign: "center"
      }}>
        <p style={{ 
          color: "#e84118", 
          marginBottom: "20px",
          whiteSpace: "pre-line",
          backgroundColor: "#fff3f3",
          padding: "14px",
          borderRadius: "8px",
          fontSize: "16px",
          borderLeft: "5px solid #ff6b6b",
          fontWeight: "500",
          textAlign: "left"
        }}>
          {error}
        </p>
        <button 
          onClick={fetchScholarships}
          style={{
            padding: "12px 24px",
            borderRadius: "10px",
            border: "none",
            background: "linear-gradient(45deg, #5f27cd, #48dbfb)",
            color: "#ffffff",
            fontWeight: "600",
            fontSize: "16px",
            cursor: "pointer",
            transition: "transform 0.3s, box-shadow 0.3s",
            boxShadow: "0 4px 15px rgba(95, 39, 205, 0.4)",
            letterSpacing: "0.5px"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(95, 39, 205, 0.5)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 15px rgba(95, 39, 205, 0.4)";
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: "800px",
      margin: "40px auto",
      padding: "35px",
      borderRadius: "16px",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.12)",
      backgroundColor: "#ffffff",
      display: "flex",
      flexDirection: "column",
      gap: "24px",
      position: "relative",
      overflow: "hidden",
      border: "1px solid #f0f0f0"
    }}>
      <div style={{
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        height: "8px",
        background: "linear-gradient(90deg, #ff6b6b, #feca57, #48dbfb, #1dd1a1)",
        zIndex: "1"
      }}></div>
      
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h2 style={{
          color: "#2e3d49", 
          margin: "8px 0 0",
          fontWeight: "700",
          fontSize: "32px",
          letterSpacing: "-0.5px"
        }}>Available Scholarships</h2>
        
        <button 
          onClick={fetchScholarships}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "2px solid #5f27cd",
            background: "transparent",
            color: "#5f27cd",
            fontWeight: "600",
            fontSize: "14px",
            cursor: "pointer",
            transition: "all 0.3s ease"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "#5f27cd";
            e.currentTarget.style.color = "#ffffff";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#5f27cd";
          }}
        >
          Refresh
        </button>
      </div>

      {scholarships.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "40px 20px",
          color: "#546e7a",
          fontSize: "16px",
          fontWeight: "500",
          backgroundColor: "#f8fafc",
          borderRadius: "12px",
          margin: "10px 0"
        }}>
          No scholarships available at this time
        </div>
      ) : (
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: "20px" 
        }}>
          {scholarships.map(scholarship => (
            <div 
              key={scholarship.id}
              style={{
                borderRadius: "12px",
                border: "2px solid #e0e7ff",
                padding: "24px",
                backgroundColor: "#fafcff",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                position: "relative",
                overflow: "hidden"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 15px rgba(0, 0, 0, 0.08)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.05)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <h3 style={{
                margin: "0 0 12px",
                color: "#2e3d49",
                fontSize: "22px",
                fontWeight: "700"
              }}>
                {scholarship.title}
              </h3>
              
              <p style={{
                margin: "0 0 12px",
                fontSize: "16px",
                lineHeight: "1.6",
                color: "#546e7a"
              }}>
                {scholarship.description}
              </p>

              {scholarship.eligibility_criteria && (
                <div style={{
                  margin: "12px 0",
                  fontSize: "15px",
                  color: "#37474f",
                  backgroundColor: "#f1f5f9",
                  padding: "12px",
                  borderRadius: "8px",
                  lineHeight: "1.6"
                }}>
                  <strong>Eligibility:</strong> {scholarship.eligibility_criteria}
                </div>
              )}

              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                margin: "16px 0",
                flexWrap: "wrap"
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}>
                  <span style={{
                    fontWeight: "600",
                    color: "#546e7a",
                    fontSize: "14px"
                  }}>Amount:</span>
                  <span style={{
                    fontWeight: "700",
                    color: "#1dd1a1",
                    fontSize: "16px"
                  }}>₹{scholarship.amount}</span>
                </div>
                
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}>
                  <span style={{
                    fontWeight: "600",
                    color: "#546e7a",
                    fontSize: "14px"
                  }}>Deadline:</span>
                  <span style={{
                    fontWeight: "500",
                    color: "#ff6b6b",
                    fontSize: "16px"
                  }}>
                    {(() => {
    const date = new Date(scholarship.deadline);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  })()}
</span>
                </div>
              </div>

              {scholarship.Link && (
                <div style={{ marginTop: "10px" }}>
                  <a 
                    href={scholarship.Link.startsWith("http") ? scholarship.Link : `https://${scholarship.Link}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      color: "#1e88e5",
                      fontWeight: "600",
                      textDecoration: "none",
                      display: "inline-block",
                      marginTop: "4px"
                    }}
                  >
                    View Scholarship Details ↗
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Scholarships;
