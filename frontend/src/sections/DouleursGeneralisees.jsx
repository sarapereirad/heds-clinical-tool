import { useState } from "react";
import QuestionBlock from "../components/form/QuestionBlock";
import ConditionalBlock from "../components/form/ConditionalBlock";

function DouleursGeneralisees({ formData, updateField, onNext, onSkip }) {
  const [showError, setShowError] = useState(false);

  const hasUnanswered = () => {
    return !formData.douleursNociplastiques || !formData.douleursMusculaires;
  };

  const handleNext = () => {
    if (hasUnanswered()) {
      setShowError(true);
      window.scrollTo(0, 0);
    } else {
      setShowError(false);
      onNext();
    }
  };

  return (
    <div>
      {showError && (
        <div style={styles.errorBanner}>
          Veuillez répondre à toutes les questions avant de continuer.
        </div>
      )}

      <button style={styles.btnSkip} onClick={onSkip}>
        ▷ Composante non évaluée lors de cette consultation
      </button>

      <h2 style={styles.title}>2. Douleurs généralisées</h2>

      <QuestionBlock
        label="Présence de douleurs primaires, nociplastiques ou de sensibilisation centrale ?"
        value={formData.douleursNociplastiques}
        onChange={(val) => updateField("douleursNociplastiques", val)}
      />
      <ConditionalBlock visible={formData.douleursNociplastiques === "oui"}>
        <p style={styles.subLabel}>Description</p>
        <input
          type="text"
          placeholder="ex : douleurs primaires..."
          value={formData.descriptionDouleursNociplastiques}
          onChange={(e) =>
            updateField("descriptionDouleursNociplastiques", e.target.value)
          }
          style={styles.textInput}
        />
      </ConditionalBlock>

      <QuestionBlock
        label="Présence de douleurs musculaires ou fatigabilité due à des efforts prolongés ou de maintien postural ?"
        value={formData.douleursMusculaires}
        onChange={(val) => updateField("douleursMusculaires", val)}
      />

      <div style={styles.fieldGroup}>
        <p style={styles.subLabel}>Notes libres</p>
        <textarea
          placeholder="Observations complémentaires..."
          value={formData.notesGeneralisees}
          onChange={(e) => updateField("notesGeneralisees", e.target.value)}
          style={styles.textarea}
        />
      </div>

      <button style={styles.btnPrimary} onClick={handleNext}>
        Section suivante
      </button>
    </div>
  );
}

const styles = {
  errorBanner: {
    backgroundColor: "#fff0f0",
    border: "1px solid red",
    color: "red",
    padding: "12px 16px",
    borderRadius: "8px",
    marginBottom: "16px",
    fontSize: "14px",
  },
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
  subLabel: {
    fontWeight: "600",
    fontSize: "14px",
    color: "#1a1a2e",
    marginBottom: "8px",
  },
  textInput: {
    width: "100%",
    padding: "8px 12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "14px",
    boxSizing: "border-box",
  },
  fieldGroup: {
    marginBottom: "24px",
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

export default DouleursGeneralisees;
