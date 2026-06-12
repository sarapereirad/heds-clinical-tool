// ReseauMedical.jsx
// Section 4 - Réseau médical du patient
// Génère le rapport Word et le JSON au clic sur "Générer le rapport"

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SPECIALISTS } from "../data/formStructure";
import { generateReport } from "../services/reportService";
import { exportToJson } from "../utils/exportJson";

function ReseauMedical({ formData, updateField, patientId }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateSpecialist = (name, field, value) => {
    updateField("specialistes", {
      ...formData.specialistes,
      [name]: {
        ...formData.specialistes[name],
        [field]: value,
      },
    });
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    try {
      // Génère et télécharge le rapport Word
      await generateReport(formData, patientId);
      // Génère et télécharge le JSON
      exportToJson(formData, patientId);
      // Redirige vers la page succès
      navigate("/success");
    } catch {
      setError(
        "Une erreur est survenue lors de la génération du rapport. Veuillez réessayer.",
      );
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Bouton sauter la section */}
      <button style={styles.btnSkip} onClick={() => {}}>
        ▷ Composante non évaluée lors de cette consultation
      </button>

      <h2 style={styles.title}>4. Réseau médical</h2>
      <p style={styles.instruction}>
        Cochez les spécialistes impliqués dans le suivi
      </p>

      {SPECIALISTS.map((specialist) => {
        const data = formData.specialistes[specialist] || {};
        const isChecked = data.checked || false;

        return (
          <div key={specialist} style={styles.specialistCard}>
            <label style={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) =>
                  updateSpecialist(specialist, "checked", e.target.checked)
                }
                style={styles.checkbox}
              />
              <span style={styles.specialistName}>{specialist}</span>
            </label>

            {isChecked && (
              <div style={styles.specialistDetails}>
                <p style={styles.subLabel}>Nom</p>
                <input
                  type="text"
                  placeholder="Nom du spécialiste..."
                  value={data.nom || ""}
                  onChange={(e) =>
                    updateSpecialist(specialist, "nom", e.target.value)
                  }
                  style={styles.textInput}
                />

                <p style={styles.subLabel}>Adresse</p>
                <input
                  type="text"
                  placeholder="Adresse du cabinet..."
                  value={data.adresse || ""}
                  onChange={(e) =>
                    updateSpecialist(specialist, "adresse", e.target.value)
                  }
                  style={styles.textInput}
                />

                <p style={styles.subLabel}>Contact</p>
                <input
                  type="text"
                  placeholder="Téléphone, email..."
                  value={data.contact || ""}
                  onChange={(e) =>
                    updateSpecialist(specialist, "contact", e.target.value)
                  }
                  style={styles.textInput}
                />

                <label style={styles.checkboxRow}>
                  <input
                    type="checkbox"
                    checked={data.inclureRapport || false}
                    onChange={(e) =>
                      updateSpecialist(
                        specialist,
                        "inclureRapport",
                        e.target.checked,
                      )
                    }
                    style={styles.checkbox}
                  />
                  <span style={styles.inclureLabel}>
                    Inclure dans le rapport
                  </span>
                </label>
              </div>
            )}
          </div>
        );
      })}

      <div style={styles.fieldGroup}>
        <p style={styles.subLabel}>Notes libres</p>
        <textarea
          placeholder="Observations complémentaires..."
          value={formData.notesReseau}
          onChange={(e) => updateField("notesReseau", e.target.value)}
          style={styles.textarea}
        />
      </div>

      {error && <p style={styles.errorMsg}>{error}</p>}

      <button
        style={loading ? styles.btnGenerateDisabled : styles.btnGenerate}
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? "Génération en cours..." : "Générer le rapport"}
      </button>
    </div>
  );
}

const styles = {
  btnSkip: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#f0f0f0",
    color: "#888",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
    cursor: "pointer",
    marginBottom: "24px",
    textAlign: "center",
  },
  title: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#1a1a2e",
    marginBottom: "8px",
  },
  instruction: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "20px",
  },
  specialistCard: {
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    padding: "12px 16px",
    marginBottom: "10px",
    backgroundColor: "#fff",
  },
  checkboxRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
  },
  checkbox: {
    width: "16px",
    height: "16px",
    cursor: "pointer",
    accentColor: "#1a1a2e",
  },
  specialistName: {
    fontWeight: "600",
    fontSize: "14px",
    color: "#1a1a2e",
  },
  specialistDetails: {
    marginTop: "12px",
    paddingTop: "12px",
    borderTop: "1px solid #eee",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  subLabel: {
    fontWeight: "600",
    fontSize: "13px",
    color: "#1a1a2e",
    marginBottom: "4px",
  },
  textInput: {
    width: "100%",
    padding: "8px 12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "14px",
    boxSizing: "border-box",
  },
  inclureLabel: {
    fontSize: "13px",
    color: "#555",
  },
  fieldGroup: {
    marginBottom: "24px",
    marginTop: "16px",
  },
  textarea: {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "14px",
    minHeight: "80px",
    resize: "vertical",
    boxSizing: "border-box",
  },
  errorMsg: {
    color: "red",
    fontSize: "14px",
    marginBottom: "12px",
  },
  btnGenerate: {
    width: "100%",
    padding: "16px",
    backgroundColor: "#1a1a2e",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "8px",
  },
  btnGenerateDisabled: {
    width: "100%",
    padding: "16px",
    backgroundColor: "#888",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "not-allowed",
    marginTop: "8px",
  },
};

export default ReseauMedical;
