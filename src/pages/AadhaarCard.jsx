function AadhaarCard({ record }) {
  if (!record) {
    return <p>Record not found.</p>;
  }

  const styles = {
    card: {
      width: "340px",
      maxWidth: "100%",
      margin: "30px auto",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "12px",
      backgroundColor: "#fff",
      color: "#222",
      fontFamily: "Arial, sans-serif",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
    header: {
      textAlign: "center",
      borderBottom: "2px solid #f59e0b",
      paddingBottom: "12px",
    },
    detail: {
      margin: "12px 0",
      overflowWrap: "anywhere",
    },
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={{ margin: 0 }}>DEMO ID CARD</h3>
        <p style={{ marginBottom: 0 }}>Sample Application</p>
      </div>

      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <div
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            background: "#e5e7eb",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
          }}
        >
          👤
        </div>
      </div>

      <p style={styles.detail}>
        <strong>Name:</strong> {record.name}
      </p>

      <p style={styles.detail}>
        <strong>Demo Number:</strong> {record.maskedId || "XXXX-XXXX-XXXX"}
      </p>

      <p style={styles.detail}>
        <strong>Address:</strong> {record.address || "Not provided"}
      </p>

      <p style={{ textAlign: "center", fontSize: "12px", color: "#666" }}>
        SAMPLE ONLY — NOT AN OFFICIAL ID
      </p>
    </div>
  );
}

export default AadhaarCard;