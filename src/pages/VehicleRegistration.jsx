import { useState } from "react";

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "12px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  fontSize: "14px",
};

const buttonStyle = {
  padding: "12px 18px",
  background: "#1d4ed8",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default function VehicleRegistration() {
  const [vehicleNo, setVehicleNo] = useState("");
  const [owner, setOwner] = useState("");
  const [vehicleType, setVehicleType] = useState("Car");
  const [model, setModel] = useState("");
  const [searchNo, setSearchNo] = useState("");
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");

  function getVehicles() {
    try {
      const data = JSON.parse(localStorage.getItem("vehicleRecords") || "[]");
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  }

  function addVehicle(event) {
    event.preventDefault();
    setMessage("");
    setResult(null);

    const number = vehicleNo.trim().toUpperCase();

    if (!number || !owner.trim() || !model.trim()) {
      setMessage("Please fill in all fields.");
      return;
    }

    const vehicles = getVehicles();

    if (vehicles.some((v) => v.vehicleNo === number)) {
      setMessage("This demo vehicle number already exists.");
      return;
    }

    const vehicle = {
      id: crypto.randomUUID(),
      vehicleNo: number,
      owner: owner.trim(),
      vehicleType,
      model: model.trim(),
    };

    try {
      localStorage.setItem(
        "vehicleRecords",
        JSON.stringify([...vehicles, vehicle]),
      );

      setVehicleNo("");
      setOwner("");
      setModel("");
      setMessage("Vehicle demo record added successfully!");
      setSearchNo(number);
      setResult(vehicle);
    } catch {
      setMessage("Unable to save the vehicle record.");
    }
  }

  function searchVehicle(event) {
    event.preventDefault();

    const number = searchNo.trim().toUpperCase();

    if (!number) {
      setResult(null);
      setMessage("Enter a vehicle number to search.");
      return;
    }

    const vehicle = getVehicles().find((v) => v.vehicleNo === number);

    setResult(vehicle || null);
    setMessage(vehicle ? "" : "No matching demo vehicle record found.");
  }

  function deleteVehicle(id) {
    const updated = getVehicles().filter((v) => v.id !== id);

    try {
      localStorage.setItem("vehicleRecords", JSON.stringify(updated));
      setResult(null);
      setMessage("Demo vehicle record deleted.");
    } catch {
      setMessage("Unable to delete the record.");
    }
  }

  const cardStyle = {
    background: "#fff",
    padding: "26px",
    borderRadius: "16px",
    boxShadow: "0 8px 28px rgba(15,23,42,0.08)",
    border: "1px solid #e2e8f0",
    marginBottom: "24px",
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "30px 20px",
        background: "#f1f5f9",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h1 style={{ color: "#123d70" }}> Vehicle Registration </h1>
        <p style={{ color: "#64748b" }}>
          Add and search fictional vehicle demo records.
        </p>
        <section style={cardStyle}>
          <h2 style={{ color: "#1e3a8a", marginTop: 0 }}> Add Vehicle </h2>
          <form onSubmit={addVehicle}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "18px",
              }}
            >
              <label>
                Vehicle Number
                <input
                  style={{ ...inputStyle, marginTop: "8px" }}
                  placeholder="DEMO-1234"
                  value={vehicleNo}
                  onChange={(e) => setVehicleNo(e.target.value)}
                  maxLength={20}
                  required
                />
              </label>

              <label>
                {" "}
                Owner Name
                <input
                  style={{ ...inputStyle, marginTop: "8px" }}
                  placeholder="Enter demo owner name"
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                  required
                />
              </label>

              <label>
                Vehicle Type
                <select
                  style={{ ...inputStyle, marginTop: "8px" }}
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                >
                  <option>Car</option>
                  <option>Bike</option>
                  <option>Truck</option>
                  <option>Van</option>
                  <option>Other</option>
                </select>
              </label>

              <label>
                Vehicle Model
                <input
                  style={{ ...inputStyle, marginTop: "8px" }}
                  placeholder="Demo Sedan"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  required
                />
              </label>
            </div>

            <button type="submit" style={{ ...buttonStyle, marginTop: "22px" }}>
              {" "}
              + Add Vehicle{" "}
            </button>
          </form>
        </section>

        <section style={cardStyle}>
          {message && (
            <p
              role="status"
              style={{
                color: result ? "#15803d" : "#b45309",
                marginTop: "16px",
              }}
            >
              {message}
            </p>
          )}

          {result && (
            <div
              style={{
                marginTop: "24px",
                border: "1px solid #bfdbfe",
                borderRadius: "14px",
                overflow: "hidden",
                background: "#fff",
              }}
            >
              <div
                style={{
                  background: "linear-gradient(120deg, #1e40af, #2563eb)",
                  padding: "20px",
                  color: "#fff",
                }}
              >
                <div style={{ fontSize: "12px", opacity: 0.85 }}>
                  {" "}
                  VEHICLE DEMO CARD{" "}
                </div>
                <h2 style={{ marginBottom: 0 }}> {result.vehicleNo}</h2>
              </div>

              <div style={{ padding: "22px" }}>
                <p>
                  <strong>Owner:</strong> {result.owner}
                </p>
                <p>
                  <strong>Vehicle Type:</strong> {result.vehicleType}
                </p>
                <p>
                  <strong>Model:</strong> {result.model}
                </p>

                <p
                  style={{
                    color: "#64748b",
                    fontSize: "12px",
                    marginTop: "22px",
                  }}
                >
                  SAMPLE ONLY — NOT AN OFFICIAL VEHICLE RECORD
                </p>

                <button
                  type="button"
                  onClick={() => deleteVehicle(result.id)}
                  style={{
                    ...buttonStyle,
                    background: "#dc2626",
                    marginTop: "8px",
                  }}
                >
                  Delete Demo Record
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
