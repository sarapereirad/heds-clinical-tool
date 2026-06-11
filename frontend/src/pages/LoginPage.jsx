import keycloak from "../services/authService";

function LoginPage() {
  const handleLogin = () => {
    keycloak.login({
      redirectUri: "http://localhost:5173/",
    });
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <img src="/zebra-logo.png" alt="Logo hEDS" style={styles.logo} />
        <h1 style={styles.title}>hEDS outil d'évaluation clinique</h1>

        <button style={styles.btnPrimary} onClick={handleLogin}>
          Se connecter
        </button>

        <p style={styles.mention}>
          Accès réservé aux professionnels de santé autorisés
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "48px",
    width: "420px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  },
  logo: {
    width: "80px",
    height: "80px",
    objectFit: "contain",
  },
  title: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#1a1a2e",
    textAlign: "center",
  },
  btnPrimary: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#1a1a2e",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },
  mention: {
    fontSize: "12px",
    color: "#aaa",
    textAlign: "center",
  },
  btnForgot: {
    background: "none",
    border: "none",
    color: "#1a1a2e",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default LoginPage;
