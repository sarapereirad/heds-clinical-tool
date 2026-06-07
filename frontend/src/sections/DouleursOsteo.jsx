import QuestionBlock from "../components/form/QuestionBlock";
import ConditionalBlock from "../components/form/ConditionalBlock";

function DouleursOsteo({ formData, updateField, onNext, onSkip }) {
  return (
    <div>
      <button style={styles.btnSkip} onClick={onSkip}>
        ▷ Composante non évaluée lors de cette consultation
      </button>

      <h2 style={styles.title}>1. Douleurs ostéo-articulaires</h2>

      <QuestionBlock
        label="Présence de pieds plats ?"
        value={formData.piedsPats}
        onChange={(val) => updateField("piedsPats", val)}
      />

      <QuestionBlock
        label="Présence de douleurs avec une composante inflammatoire ?"
        value={formData.douleursInflammatoires}
        onChange={(val) => updateField("douleursInflammatoires", val)}
      />
      <ConditionalBlock visible={formData.douleursInflammatoires === "oui"}>
        <p style={styles.subLabel}>De quel type ?</p>
        <input
          type="text"
          placeholder="Préciser..."
          value={formData.typeInflammation}
          onChange={(e) => updateField("typeInflammation", e.target.value)}
          style={styles.textInput}
        />
      </ConditionalBlock>

      <QuestionBlock
        label="Présence d'une instabilité articulaire avec luxations ou subluxations ?"
        value={formData.instabiliteArticulaire}
        onChange={(val) => updateField("instabiliteArticulaire", val)}
      />

      <QuestionBlock
        label="Antécédents de fractures multiples ou de fractures de fragilité ?"
        value={formData.fracturesMultiples}
        onChange={(val) => updateField("fracturesMultiples", val)}
      />
      <ConditionalBlock visible={formData.fracturesMultiples === "oui"}>
        <QuestionBlock
          label="Ostéoporose connue ?"
          value={formData.osteoporoseConnue}
          onChange={(val) => updateField("osteoporoseConnue", val)}
        />
        <QuestionBlock
          label="Traitement spécifique en cours ?"
          value={formData.traitementOsteoporose}
          onChange={(val) => updateField("traitementOsteoporose", val)}
        />
        <QuestionBlock
          label="Patient ouvert à un traitement ?"
          value={formData.patientOuvertTraitement}
          onChange={(val) => updateField("patientOuvertTraitement", val)}
        />
      </ConditionalBlock>

      <QuestionBlock
        label="Suspicion d'un syndrome du défilé thoracique ?"
        hint="Symptômes évocateurs : Douleur cervico-brachiale/Paresthésies et/ou engourdissements MS/ Faiblesse ou fatigabilité MS/ Symptômes déclenchés ou aggravés par certaines positions du bras."
        value={formData.syndromeDefileThoracique}
        onChange={(val) => updateField("syndromeDefileThoracique", val)}
      />

      <div style={styles.fieldGroup}>
        <p style={styles.subLabel}>Notes libres</p>
        <textarea
          placeholder="Observations complémentaires..."
          value={formData.notesOsteo}
          onChange={(e) => updateField("notesOsteo", e.target.value)}
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

export default DouleursOsteo;
