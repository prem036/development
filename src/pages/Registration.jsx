
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialForm = {
  name: "",
  dob: "",
  gender: "",
  email: "",
  phone: "",
  demoId: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
};

const styles = {
  page: {
    minHeight: "100vh",
    boxSizing: "border-box",
    background: "linear-gradient(135deg, #eff6ff 0%, #f8fafc 55%, #eef2ff 100%)",
    padding: "42px 20px",
    fontFamily: "Inter, Arial, sans-serif",
  },
  card: {
    maxWidth: "1050px",
    margin: "0 auto",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 18px 50px rgba(30, 64, 175, 0.10)",
  },
  header: {
    background: "linear-gradient(120deg, #1e40af, #2563eb, #4f46e5)",
    padding: "30px 34px",
    color: "#ffffff",
  },
  eyebrow: {
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: "#dbeafe",
    margin: "0 0 10px",
  },
  title: {
    fontSize: "clamp(25px, 4vw, 34px)",
    fontWeight: "750",
    margin: "0 0 10px",
    color: "#ffffff",
  },
  subtitle: {
    fontSize: "14px",
    lineHeight: 1.7,
    color: "#dbeafe",
    margin: 0,
  },
  body: {
    padding: "30px 34px 34px",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#172554",
    margin: "0 0 6px",
  },
  sectionSubtitle: {
    color: "#64748b",
    fontSize: "13px",
    margin: "0 0 26px",
    lineHeight: 1.6,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))",
    gap: "22px 20px",
  },
  group: {
    display: "flex",
    flexDirection: "column",
    gap: "9px",
    minWidth: 0,
  },
  label: {
    color: "#334155",
    fontSize: "13px",
    fontWeight: "650",
  },
  input: {
    width: "100%",
    minHeight: "46px",
    boxSizing: "border-box",
    padding: "12px 14px",
    border: "1px solid #cbd5e1",
    borderRadius: "9px",
    fontSize: "14px",
    color: "#0f172a",
    background: "#ffffff",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  note: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    padding: "13px 15px",
    margin: "24px 0 0",
    background: "#fffbeb",
    border: "1px solid #fde68a",
    borderRadius: "9px",
    color: "#92400e",
    fontSize: "12px",
    lineHeight: 1.6,
  },
  error: {
    background: "#fef2f2",
    color: "#b91c1c",
    border: "1px solid #fecaca",
    borderRadius: "9px",
    padding: "13px 15px",
    margin: "18px 0 0",
    fontSize: "13px",
    lineHeight: 1.5,
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
    flexWrap: "wrap",
    gap: "16px",
    marginTop: "28px",
    paddingTop: "23px",
    borderTop: "1px solid #e2e8f0",
  },
  footerText: {
    fontSize: "12px",
    lineHeight: 1.6,
    color: "#64748b",
    margin: 0,
  },
  button: {
    minHeight: "46px",
    background: "linear-gradient(120deg, #1d4ed8, #4338ca)",
    color: "#ffffff",
    border: "none",
    padding: "13px 24px",
    borderRadius: "9px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "700",
    boxShadow: "0 5px 14px rgba(37, 99, 235, 0.23)",
  },
};

const fieldList = [
  { name: "name", label: "Full Name", type: "text", placeholder: "Enter full name" },
  { name: "dob", label: "Date of Birth", type: "date" },
  { name: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
  { name: "phone", label: "Phone Number", type: "tel", placeholder: "10-digit test number" },
  { name: "demoId", label: "12-digit Fictional Demo Number", type: "password", placeholder: "Enter fictional number"},
  { name: "address", label: "Address", type: "text", placeholder: "Enter street or area" },
  { name: "city", label: "City", type: "text", placeholder: "Enter city" },
  { name: "postalCode", label: "Postal Code", type: "text", placeholder: "6-digit postal code" },
];

export default function Registration() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!/^\d{12}$/.test(form.demoId)) {
      setError("Enter exactly 12 digits for the fictional demo number.");
      return;
    }

    if (!/^\d{10}$/.test(form.phone)) {
      setError("Enter a 10-digit test phone number.");
      return;
    }

    if (!/^\d{6}$/.test(form.postalCode)) {
      setError("Enter a 6-digit postal code.");
      return;
    }

    try {
      const saved = JSON.parse(
        localStorage.getItem("registrationRecords") || "[]"
      );

      if (!Array.isArray(saved)) {
        setError("Stored records are invalid. Please check browser storage.");
        return;
      }

      const duplicate = saved.some(
        (record) => record.demoLookup === form.demoId
      );

      if (duplicate) {
        setError("This demo number is already registered.");
        return;
      }

      const record = {
        id: crypto.randomUUID(),
        name: form.name.trim(),
        dob: form.dob,
        gender: form.gender,
        email: form.email.trim(),
        phone: form.phone,
        address: form.address.trim(),
        city: form.city.trim(),
        state: form.state,
        postalCode: form.postalCode,
        maskedId: `XXXX XXXX ${form.demoId.slice(-4)}`,
        demoLookup: form.demoId,
      };

      localStorage.setItem(
        "registrationRecords",
        JSON.stringify([...saved, record])
      );

      setForm(initialForm);
      navigate(`/card/${record.id}`);
    } catch {
      setError("Unable to save the record in browser storage.");
    }
  }

  function renderInput(field) {
    return (
      <div key={field.name} style={styles.group}>
        <label htmlFor={field.name} style={styles.label}>
          {field.label}
        </label>

        <input
          id={field.name}
          name={field.name}
          type={field.type}
          placeholder={field.placeholder || ""}
          value={form[field.name]}
          onChange={handleChange}
          style={styles.input}
          required
          maxLength={
            field.name === "demoId"
              ? 12
              : field.name === "phone"
                ? 10
                : field.name === "postalCode"
                  ? 6
                  : undefined
          }
          inputMode={
            ["demoId", "phone", "postalCode"].includes(field.name)
              ? "numeric"
              : undefined
          }
          autoComplete={field.name === "demoId" ? "off" : undefined}
          max={
            field.name === "dob"
              ? new Date().toISOString().slice(0, 10)
              : undefined
          }
          onFocus={(event) => {
            event.currentTarget.style.borderColor = "#3b82f6";
            event.currentTarget.style.boxShadow =
              "0 0 0 3px rgba(59, 130, 246, 0.12)";
          }}
          onBlur={(event) => {
            event.currentTarget.style.borderColor = "#cbd5e1";
            event.currentTarget.style.boxShadow = "none";
          }}
        />
      </div>
    );
  }

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <header style={styles.header}>
          <h1 style={styles.title}>Registration Form</h1>
        </header>

        <div style={styles.body}>
          <h2 style={styles.sectionTitle}>Personal Information</h2>
          <p style={styles.sectionSubtitle}>
            Complete all required fields before submitting your registration.
          </p>

          <form onSubmit={handleSubmit}>
            <div style={styles.grid}>
              {fieldList.slice(0, 5).map(renderInput)}
              {fieldList.slice(5).map(renderInput)}

              <div style={styles.group}>
                <label htmlFor="gender" style={styles.label}>Gender</label>
                <select id="gender" name="gender" value={form.gender} onChange={handleChange}
                  style={styles.input} required >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              <div style={styles.group}>
                <label htmlFor="state" style={styles.label}>State</label>
                <select id="state" name="state" value={form.state} onChange={handleChange} style={styles.input} required>
                  <option value="">Select state</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            {error && (
              <p role="alert" style={styles.error}> ⚠ {error} </p>
            )}
            <div style={styles.footer}>
              <button type="submit" style={styles.button}> Submit Registration →</button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
