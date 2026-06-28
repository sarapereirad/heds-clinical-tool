import { AiOutlineLogout, AiOutlineLock } from "react-icons/ai";
import keycloak from "../../services/authService";

function Navbar() {
  const handleLogout = () => {
    keycloak.logout({
      redirectUri: `${import.meta.env.VITE_FRONTEND_URL || "http://localhost:5173"}/login`,
    });
  };

  const handleChangePassword = () => {
    keycloak.accountManagement();
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.right}>
        <span style={styles.doctorName}>
          {keycloak.tokenParsed?.given_name} {keycloak.tokenParsed?.family_name}
        </span>
        <button style={styles.btnOutline} onClick={handleChangePassword}>
          <AiOutlineLock size={14} /> Changer le mot de passe
        </button>
        <button style={styles.btnOutline} onClick={handleLogout}>
          <AiOutlineLogout size={14} /> Déconnexion
        </button>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "12px 32px",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e0e0e0",
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
