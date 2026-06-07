function InfoGenerales({ formData, updateField, onNext, onSkip }) {
  return (
    <div>
      <button style={styles.btnSkip} onClick={onSkip}>
        ▷ Composante non évaluée lors de cette consultation
      </button>

      <h2 style={styles.title}>Informations générales</h2>

      <div style={styles.fieldGroup}>
        <p style={styles.label}>Genre du patient</p>
        <div style={styles.optionsRow}>
          <label style={styles.option}>
            <input
              type="radio"
              name="genre"
              value="masculin"
              checked={formData.genre === "masculin"}
              onChange={() => updateField("genre", "masculin")}
              style={styles.radio}
            />
            <span>Masculin</span>
          </label>
          <label style={styles.option}>
            <input
              type="radio"
              name="genre"
              value="feminin"
              checked={formData.genre === "feminin"}
              onChange={() => updateField("genre", "feminin")}
              style={styles.radio}
            />
            <span>Féminin</span>
          </label>
          <label style={styles.option}>
            <input
              type="radio"
              name="genre"
              value="neutre"
              checked={formData.genre === "neutre"}
              onChange={() => updateField("genre", "neutre")}
              style={styles.radio}
            />
            <span>Neutre</span>
          </label>
        </div>
      </div>

      <div style={styles.fieldGroup}>
        <p style={styles.label}>Date de la consultation</p>
        <input
          type="date"
          value={formData.dateConsultation}
          onChange={(e) => updateField("dateConsultation", e.target.value)}
          style={styles.dateInput}
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
    marginBottom: "24px",
  },
  fieldGroup: {
    marginBottom: "28px",
  },
  label: {
    fontWeight: "600",
    fontSize: "14px",
    color: "#1a1a2e",
    marginBottom: "10px",
  },
  optionsRow: {
    display: "flex",
    gap: "24px",
    alignItems: "center",
  },
  option: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    fontSize: "14px",
  },
  radio: {
    cursor: "pointer",
    accentColor: "#1a1a2e",
  },
  dateInput: {
    padding: "8px 12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "14px",
    color: "#1a1a2e",
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
    marginTop: "16px",
  },
};

export default InfoGenerales;
