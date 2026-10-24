import { Link, useParams } from "react-router-dom";
import AadhaarCard from "./AadhaarCard";

export default function CardView() {
  const { id } = useParams();

  let records = [];

  try {
    records = JSON.parse(
      localStorage.getItem("registrationRecords") || "[]"
    );
  } catch {
    records = [];
  }

  const record = records.find((item) => item.id === id);

  const button = {
    display: "inline-block",
    padding: "12px 18px",
    borderRadius: "6px",
    border: "none",
    background: "#1d4ed8",
    color: "white",
    textDecoration: "none",
    cursor: "pointer",
    fontWeight: "bold",
  };

  if (!record) {
    return (
      <section style={{ textAlign: "center", padding: "40px" }}>
        <h2>Record Not Found</h2>
        <p>The record may have been deleted.</p>
        <Link to="/records" style={button}>
          Back to Search
        </Link>
      </section>
    );
  }

  return (
    <section>
      <div className="no-print" style={{ textAlign: "center" }}>
        <h1>Registration Card Details</h1>
        <p>Review the fictional demo record below.</p>
      </div>

      <AadhaarCard record={record} />

      <div
        className="no-print"
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "12px",
          marginTop: "20px",
        }}
      >
        <button onClick={() => window.print()} style={button}>
          Print Card
        </button>

        <Link to="/records" style={button}>
          Back to Search
        </Link>

        <Link to="/" style={button}>
          New Registration
        </Link>
      </div>

      <style>{`
        @media print {
          @page {
            margin: 10mm;
          }
          body {
            background: white !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}