
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const styles = {
  page: {
    minHeight: "100vh",
    padding: "32px 20px",
    background: "#f1f5f9",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    maxWidth: "1050px",
    margin: "0 auto",
    background: "#fff",
    padding: "28px",
    borderRadius: "16px",
    boxShadow: "0 8px 28px rgba(15,23,42,0.08)",
    border: "1px solid #e2e8f0",
  },
  title: {
    color: "#123d70",
    marginTop: 0,
    marginBottom: "8px",
  },
  tabs: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    margin: "24px 0",
  },
  tab: (active) => ({
    padding: "12px 20px",
    borderRadius: "9px",
    border: active ? "1px solid #1d4ed8" : "1px solid #cbd5e1",
    background: active ? "#1d4ed8" : "#fff",
    color: active ? "#fff" : "#334155",
    fontWeight: "bold",
    cursor: "pointer",
  }),
  input: {
    flex: "1 1 240px",
    minWidth: 0,
    padding: "13px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    fontSize: "14px",
    boxSizing: "border-box",
  },
  button: {
    background: "#1d4ed8",
    color: "#fff",
    border: "none",
    padding: "13px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  error: {
    color: "#b91c1c",
    background: "#fef2f2",
    padding: "12px",
    borderRadius: "8px",
    marginTop: "14px",
  },
  tableWrap: {
    overflowX: "auto",
    marginTop: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  },
  cell: {
    padding: "13px",
    borderBottom: "1px solid #e2e8f0",
    whiteSpace: "nowrap",
  },
  link: {
    color: "#1d4ed8",
    fontWeight: "bold",
    textDecoration: "none",
  },
  vehicleCard: {
    marginTop: "24px",
    border: "1px solid #bfdbfe",
    borderRadius: "12px",
    overflow: "hidden",
  },
};

export default function Records() {
  const [records, setRecords] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [searchType, setSearchType] = useState("aadhaar");
  const [searchNumber, setSearchNumber] = useState("");
  const [error, setError] = useState("");
  const [vehicleResult, setVehicleResult] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const savedRecords = JSON.parse(
        localStorage.getItem("registrationRecords") || "[]"
      );
      const savedVehicles = JSON.parse(
        localStorage.getItem("vehicleRecords") || "[]"
      );

      setRecords(Array.isArray(savedRecords) ? savedRecords : []);
      setVehicles(Array.isArray(savedVehicles) ? savedVehicles : []);
    } catch {
      setRecords([]);
      setVehicles([]);
    }
  }, []);

  function changeSearchType(type) {
    setSearchType(type);
    setSearchNumber("");
    setError("");
    setVehicleResult(null);
  }

  function handleSearch(event) {
    event.preventDefault();
    setError("");
    setVehicleResult(null);

    const value = searchNumber.trim();

    if (searchType === "aadhaar") {
      if (!/^\d{12}$/.test(value)) {
        setError("Enter exactly 12 digits for the fictional demo number.");
        return;
      }

      const found = records.find(
        (record) => record.demoLookup === value
      );

      if (!found) {
        setError("Demo record not found. Please check the number.");
        return;
      }

      navigate(`/card/${found.id}`);
      return;
    }

    if (!value) {
      setError("Enter a vehicle demo number.");
      return;
    }

    const found = vehicles.find(
      (vehicle) =>
        vehicle.vehicleNo?.toUpperCase() === value.toUpperCase()
    );

    if (!found) {
      setError("Vehicle demo record not found. Please check the number.");
      return;
    }

    setVehicleResult(found);
  }

  function deleteRecord(id) {
    if (!window.confirm("Delete this fictional demo record?")) return;
    const updated = records.filter((record) => record.id !== id);

    try {
      localStorage.setItem( "registrationRecords", JSON.stringify(updated));
      setRecords(updated);
    } catch {
      setError("Unable to delete the demo record.");
    }
  }

  function deleteVehicle(id) {
    if (!window.confirm("Delete this vehicle demo record?")) return;
    const updated = vehicles.filter((vehicle) => vehicle.id !== id);

    try {
      localStorage.setItem("vehicleRecords", JSON.stringify(updated));
      setVehicles(updated);
      setVehicleResult(null);
      setError("");
    } catch {
      setError("Unable to delete the vehicle record.");
    }
  }

  const selectedPlaceholder =
    searchType === "aadhaar"
      ? "Enter 12-digit fictional demo number"
      : "Enter vehicle number (e.g. DEMO-1234)";

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <h1 style={styles.title}>Search Records</h1>

        <p style={{ color: "#64748b", lineHeight: 1.6 }}>
          Choose a record type, enter its demo number, and view the matching
          record.
        </p>

        <div style={styles.tabs}>
          <button
            type="button"
            style={styles.tab(searchType === "aadhaar")}
            onClick={() => changeSearchType("aadhaar")}
          >
            Aadhaar Demo
          </button>

          <button
            type="button"
            style={styles.tab(searchType === "vehicle")}
            onClick={() => changeSearchType("vehicle")}
          >
            Vehicle Demo
          </button>
        </div>

        <form
          onSubmit={handleSearch}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            margin: "20px 0",
          }}
        >
          <input
            type="password"
            value={searchNumber}
            onChange={(event) => {
              setSearchNumber(event.target.value);
              setError("");
              setVehicleResult(null);
            }}
            placeholder={selectedPlaceholder}
            inputMode={searchType === "aadhaar" ? "numeric" : "text"}
            maxLength={searchType === "aadhaar" ? 12 : 20}
            autoComplete="off"
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Search & View
          </button>
        </form>

        {error && (
          <p role="alert" style={styles.error}>
            {error}
          </p>
        )}

        {searchType === "aadhaar" && (
          <>
            <h2 style={{ color: "#123d70", marginTop: "30px" }}>
              Aadhaar Demo Records ({records.length})
            </h2>

            <div style={styles.tableWrap}>
              <table style={styles.table}>
                <thead>
                  <tr style={{ background: "#eff6ff" }}>
                    {["Name", "DOB", "Masked Number", "Actions"].map(
                      (heading) => (
                        <th key={heading} style={styles.cell}>
                          {heading}
                        </th>
                      )
                    )}
                  </tr>
                </thead>

                <tbody>
                  {records.map((record) => (
                    <tr key={record.id}>
                      <td style={styles.cell}>{record.name}</td>
                      <td style={styles.cell}>{record.dob}</td>
                      <td style={styles.cell}>{record.maskedId}</td>
                      <td style={styles.cell}>
                        <Link
                          to={`/card/${record.id}`}
                          style={styles.link}
                        >
                          View Card
                        </Link>

                        <button
                          type="button"
                          onClick={() => deleteRecord(record.id)}
                          style={{
                            marginLeft: "12px",
                            padding: "7px 10px",
                            border: "none",
                            borderRadius: "5px",
                            background: "#fee2e2",
                            color: "#991b1b",
                            cursor: "pointer",
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {records.length === 0 && (
              <p style={{ color: "#64748b" }}>
                No Aadhaar demo records available.
              </p>
            )}
          </>
        )}

        {searchType === "vehicle" && (
          <>
            <h2 style={{ color: "#123d70", marginTop: "30px" }}>
              Vehicle Demo Records ({vehicles.length})
            </h2>

            <div style={styles.tableWrap}>
              <table style={styles.table}>
                <thead>
                  <tr style={{ background: "#eff6ff" }}>
                    {["Vehicle Number", "Owner", "Type", "Model"].map(
                      (heading) => (
                        <th key={heading} style={styles.cell}>
                          {heading}
                        </th>
                      )
                    )}
                  </tr>
                </thead>

                <tbody>
                  {vehicles.map((vehicle) => (
                    <tr key={vehicle.id}>
                      <td style={styles.cell}>{vehicle.vehicleNo}</td>
                      <td style={styles.cell}>{vehicle.owner}</td>
                      <td style={styles.cell}>{vehicle.vehicleType}</td>
                      <td style={styles.cell}>{vehicle.model}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {vehicles.length === 0 && (
              <p style={{ color: "#64748b" }}>
                No vehicle demo records available. Add one from Vehicle
                Registration first.
              </p>
            )}

            {vehicleResult && (
              <div style={styles.vehicleCard}>
                <div
                  style={{
                    background: "linear-gradient(120deg, #1e40af, #2563eb)",
                    color: "#fff",
                    padding: "20px",
                  }}
                >
                  <p style={{ fontSize: "12px", margin: "0 0 8px" }}>
                    VEHICLE DEMO CARD
                  </p>
                  <h2 style={{ margin: 0 }}>
                    🚘 {vehicleResult.vehicleNo}
                  </h2>
                </div>

                <div style={{ padding: "22px" }}>
                  <p><strong>Owner:</strong> {vehicleResult.owner}</p>
                  <p><strong>Type:</strong> {vehicleResult.vehicleType}</p>
                  <p><strong>Model:</strong> {vehicleResult.model}</p>

                  <p style={{ color: "#64748b", fontSize: "12px" }}>
                    SAMPLE ONLY — NOT AN OFFICIAL VEHICLE RECORD
                  </p>

                  <button
                    type="button"
                    onClick={() => deleteVehicle(vehicleResult.id)}
                    style={{
                      ...styles.button,
                      background: "#dc2626",
                    }}
                  >
                    Delete Vehicle Demo
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        <p
          style={{
            marginTop: "28px",
            color: "#92400e",
            background: "#fffbeb",
            padding: "12px",
            borderRadius: "8px",
            fontSize: "12px",
            lineHeight: 1.6,
          }}
        >
          Demo application only. Use fictional test data. This application
          does not verify real Aadhaar or government vehicle registration
          records.
        </p>
      </section>
    </main>
  );
}
