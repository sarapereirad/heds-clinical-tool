import { RECOMMANDATIONS_LIST } from "../data/formStructure";

function Recommandations({
  formData,
  updateField,
  updateNestedField,
  onNext,
  onSkip,
}) {
  return (
    <div>
      <button style={styles.btnSkip} onClick={onSkip}>
        ▷ Composante non évaluée lors de cette consultation
      </button>

      <h2 style={styles.title}>4. Recommandations thérapeutiques</h2>

      <p style={styles.instruction}>
        Cochez les recommandations thérapeutiques à inclure dans le rapport :
      </p>

      <div style={styles.recommandationsList}>
        {RECOMMANDATIONS_LIST.map((rec) => (
          <label key={rec.id} style={styles.checkboxRow}>
            <input
              type="checkbox"
              checked={formData.recommandations[rec.id] || false}
              onChange={(e) =>
                updateNestedField("recommandations", rec.id, e.target.checked)
              }
              style={styles.checkbox}
            />
            <span style={styles.checkboxLabel}>{rec.label}</span>
          </label>
        ))}
      </div>

      <div style={styles.fieldGroup}>
        <p style={styles.subLabel}>Propositions thérapeutiques spécifiques</p>
        <p style={styles.hint}>Ce texte sera affiché dans le rapport.</p>
        <textarea
          placeholder="Préciser les propositions thérapeutiques spécifiques..."
          value={formData.recommandationsTexteLibre}
          onChange={(e) =>
            updateField("recommandationsTexteLibre", e.target.value)
          }
          style={styles.textarea}
        />
      </div>

      <button style={styles.btnPrimary} onClick={onNext}>
        Section suivante
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
  recommandationsList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "32px",
  },
  checkboxRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer",
    padding: "12px 16px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    backgroundColor: "#fff",
  },
  checkbox: {
    width: "18px",
    height: "18px",
    cursor: "pointer",
    accentColor: "#1a1a2e",
    flexShrink: 0,
  },
  checkboxLabel: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1a1a2e",
  },
  fieldGroup: {
    marginBottom: "24px",
  },
  subLabel: {
    fontWeight: "600",
    fontSize: "14px",
    color: "#1a1a2e",
    marginBottom: "4px",
  },
  hint: {
    fontSize: "12px",
    color: "#888",
    fontStyle: "italic",
    marginBottom: "8px",
  },
  textarea: {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "14px",
    minHeight: "100px",
    resize: "vertical",
    boxSizing: "border-box",
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
    marginTop: "8px",
  },
};

export default Recommandations;
