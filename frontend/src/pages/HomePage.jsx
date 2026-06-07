import Navbar from "../components/layout/Navbar";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <img src="/zebra-logo.png" alt="Logo zèbre hEDS" style={styles.logo} />
        <h1 style={styles.title}>Syndrome d'Ehlers-Danlos hypermobile</h1>
        <div style={styles.buttonGroup}>
          <button
            style={styles.btnPrimary}
            onClick={() => navigate("/evaluation")}
          >
            Nouvelle évaluation
          </button>
          <button style={styles.btnSecondary}>Importer une évaluation</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "calc(100vh - 60px)",
    gap: "24px",
  },
  logo: {
    width: "100px",
    height: "100px",
    objectFit: "contain",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#1a1a2e",
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    width: "320px",
  },
  btnPrimary: {
    padding: "14px",
    backgroundColor: "#1a1a2e",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },
  btnSecondary: {
    padding: "14px",
    backgroundColor: "white",
    color: "#1a1a2e",
    border: "2px solid #1a1a2e",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default HomePage;
