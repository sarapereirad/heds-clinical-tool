import { useNavigate } from "react-router-dom";
import { BsCheckCircleFill } from "react-icons/bs";

function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Icône succès */}
        <BsCheckCircleFill size={60} color="#2ecc71" />

        <h1 style={styles.title}>Le rapport a bien été généré</h1>
        <p style={styles.subtitle}>
          Vos fichiers ont été téléchargés automatiquement
        </p>

        {/* Détail des fichiers */}
        <div style={styles.filesCard}>
          <p style={styles.filesTitle}>Deux fichiers ont été générés :</p>
          <p style={styles.fileItem}>
            1. <strong>Rapport Word</strong> contenant le résumé de la
            consultation, à transmettre aux professionnels de santé concernés.
          </p>
          <p style={styles.fileItem}>
            2. <strong>Fichier de données</strong> permettant de réimporter
            cette évaluation lors d'une prochaine consultation de suivi.
          </p>
        </div>

        <button style={styles.btnPrimary} onClick={() => navigate("/")}>
          Retour à l'accueil
        </button>
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
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    padding: "48px",
    maxWidth: "600px",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#1a1a2e",
  },
  subtitle: {
    fontSize: "14px",
    color: "#888",
  },
  filesCard: {
    backgroundColor: "white",
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    padding: "24px",
    textAlign: "left",
    width: "100%",
  },
  filesTitle: {
    fontWeight: "700",
    fontSize: "14px",
    color: "#1a1a2e",
    marginBottom: "12px",
  },
  fileItem: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "8px",
    lineHeight: "1.5",
  },
  btnPrimary: {
    padding: "14px 32px",
    backgroundColor: "#1a1a2e",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default SuccessPage;
