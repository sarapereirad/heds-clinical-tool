import { AiOutlineHome, AiOutlineLogout, AiOutlineLock } from "react-icons/ai";

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <div style={styles.left}>
        <AiOutlineHome size={22} style={styles.homeIcon} />
      </div>
      <div style={styles.right}>
        <span style={styles.doctorName}>Dr. Fernandez</span>
        <button style={styles.btnOutline}>
          <AiOutlineLock size={14} /> Changer le mot de passe
        </button>
        <button style={styles.btnOutline}>
          <AiOutlineLogout size={14} /> Déconnexion
        </button>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 32px",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e0e0e0",
  },
  left: {
    fontSize: "20px",
    cursor: "pointer",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  doctorName: {
    fontWeight: "600",
    color: "#1a1a2e",
  },
  btnOutline: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 14px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "white",
    cursor: "pointer",
    fontSize: "14px",
    color: "#1a1a2e",
  },
};

export default Navbar;
