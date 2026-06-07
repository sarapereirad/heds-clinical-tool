import { useState } from "react";

function InfoGenerales({ formData, updateField, onNext }) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.genre) {
      newErrors.genre = "Veuillez sélectionner le genre du patient.";
    }
    if (!formData.dateConsultation) {
      newErrors.dateConsultation =
        "Veuillez indiquer la date de la consultation.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  return (
    <div>
      <h2 style={styles.title}>Informations générales</h2>

      <div style={styles.fieldGroup}>
        <p style={styles.label}>
          Genre du patient <span style={styles.required}>*</span>
        </p>
        <div style={styles.optionsRow}>
          {["masculin", "feminin", "neutre"].map((g) => (
            <label key={g} style={styles.option}>
              <input
                type="radio"
                name="genre"
                value={g}
                checked={formData.genre === g}
                onChange={() => updateField("genre", g)}
                style={styles.radio}
              />
              <span>{g.charAt(0).toUpperCase() + g.slice(1)}</span>
            </label>
          ))}
        </div>
        {errors.genre && <p style={styles.errorMsg}>{errors.genre}</p>}
      </div>

      <div style={styles.fieldGroup}>
        <p style={styles.label}>
          Date de la consultation <span style={styles.required}>*</span>
        </p>
        <input
          type="date"
          value={formData.dateConsultation}
          onChange={(e) => updateField("dateConsultation", e.target.value)}
          style={styles.dateInput}
        />
        {errors.dateConsultation && (
          <p style={styles.errorMsg}>{errors.dateConsultation}</p>
        )}
      </div>

      <button style={styles.btnPrimary} onClick={handleNext}>
        Section suivante
      </button>
    </div>
  );
}

const styles = {
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
  required: {
    color: "red",
    marginLeft: "4px",
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
  errorMsg: {
    color: "red",
    fontSize: "12px",
    marginTop: "6px",
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
