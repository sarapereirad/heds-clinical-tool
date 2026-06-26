import QuestionBlock from "../components/form/QuestionBlock";
import ConditionalBlock from "../components/form/ConditionalBlock";

function DouleursNeuropathiques({ formData, updateField, onNext, onSkip }) {
  return (
    <div>
      <button style={styles.btnSkip} onClick={onSkip}>
        ▷ Composante non évaluée lors de cette consultation
      </button>

      <h2 style={styles.title}>3. Douleurs neuropathiques</h2>

      <QuestionBlock
        label="Présence de symptômes évocateurs de douleurs neuropathiques (brûlures, décharges électriques, fourmillements, allodynie, hypoesthésie au chaud) ?"
        value={formData.douleursNeuropathiques}
        onChange={(val) => updateField("douleursNeuropathiques", val)}
      />

      <ConditionalBlock visible={formData.douleursNeuropathiques === "oui"}>
        <QuestionBlock
          label="Diagnostic spécifique posé ?"
          value={formData.diagnosticNeuropathique}
          onChange={(val) => updateField("diagnosticNeuropathique", val)}
        />

        <ConditionalBlock visible={formData.diagnosticNeuropathique === "oui"}>
          <p style={styles.subLabel}>Préciser le diagnostic</p>
          <input
            type="text"
            placeholder="Diagnostic..."
            value={formData.diagnosticNeuropathiqueTexte}
            onChange={(e) =>
              updateField("diagnosticNeuropathiqueTexte", e.target.value)
            }
            style={styles.textInput}
          />

          <QuestionBlock
            label="Prise en charge spécifique en cours ?"
            value={formData.priseEnChargeNeuropathique}
            onChange={(val) => updateField("priseEnChargeNeuropathique", val)}
          />
        </ConditionalBlock>
      </ConditionalBlock>

      <div style={styles.fieldGroup}>
        <p style={styles.subLabel}>Notes libres</p>
        <textarea
          placeholder="Observations complémentaires..."
          value={formData.notesNeuropathiques}
          onChange={(e) => updateField("notesNeuropathiques", e.target.value)}
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
    marginBottom: "16px",
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

export default DouleursNeuropathiques;
