import { NavLink } from "react-router-dom";

export default function Navbar() {
  const styles = {
    nav: {
      position: "sticky",
      top: 0,
      zIndex: 1000,
      background: "linear-gradient(135deg, #123d70, #1d4ed8)",
      color: "white",
      padding: "18px 5%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "15px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
      margin:'0px'
    },

    brand: {
      fontSize: "21px",
      fontWeight: "bold",
      letterSpacing: "0.3px",
    },

    links: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      flexWrap: "wrap",
    },

    link: ({ isActive }) => ({
      color: "white",
      textDecoration: "none",
      fontWeight: "600",
      fontSize: "14px",
      padding: "10px 16px",
      borderRadius: "8px",
      background: isActive ? "rgba(255,255,255,0.22)" : "transparent",
      border: isActive
        ? "1px solid rgba(255,255,255,0.35)"
        : "1px solid transparent",
      transition: "background 0.2s ease",
    }),
  };

  return (
    <header style={styles.nav}>
      <div style={styles.brand}> Registration Demo</div>

      <nav style={styles.links}>
        <NavLink to="/" end style={styles.link}>
          Register
        </NavLink>

        <NavLink to="/vehicles" style={styles.link}>
          Vehicle Registration
        </NavLink>

          <NavLink to="/records" style={styles.link}>
          Search Records
        </NavLink>
      </nav>
    </header>
  );
}
