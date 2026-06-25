import { useState } from "react";
import QuestionBlock from "../components/form/QuestionBlock";
import ConditionalBlock from "../components/form/ConditionalBlock";
import { ATM_SYMPTOMES } from "../data/formStructure";

function DouleursOsteo({
  formData,
  updateField,
  updateNestedField,
  onNext,
  onSkip,
}) {
  const [showError, setShowError] = useState(false);

  const hasUnanswered = () => {
    return (
      !formData.instabiliteArticulaire ||
      !formData.instabiliteATM ||
      !formData.douleursInflammatoires ||
      !formData.fracturesMultiples ||
      !formData.syndromeDefileThoracique ||
      !formData.piedsPats
    );
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

  const getGenre = () => formData.genre;

  const patientLabel = () => {
    if (getGenre() === "feminin") return "la patiente";
    if (getGenre() === "masculin") return "le patient";
    return "le-la patient·e";
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

      <h2 style={styles.title}>1. Douleurs ostéo-articulaires</h2>

      <QuestionBlock
        label="Présence d'une instabilité articulaire avec luxations ou subluxations ?"
        value={formData.instabiliteArticulaire}
        onChange={(val) => updateField("instabiliteArticulaire", val)}
      />

      <QuestionBlock
        label="Instabilité des articulations temporo-mandibulaires (ATM) ?"
        value={formData.instabiliteATM}
        onChange={(val) => updateField("instabiliteATM", val)}
      />
      <ConditionalBlock visible={formData.instabiliteATM === "oui"}>
        <p style={styles.subLabel}>Symptômes présents :</p>
        <div style={styles.checkboxGroup}>
          {ATM_SYMPTOMES.map((s) => (
            <label key={s.id} style={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={formData.instabiliteATMSymptomes[s.id] || false}
                onChange={(e) =>
                  updateNestedField(
                    "instabiliteATMSymptomes",
                    s.id,
                    e.target.checked,
                  )
                }
                style={styles.checkbox}
              />
              <span>{s.label}</span>
            </label>
          ))}
        </div>

        <QuestionBlock
          label="Prise en charge actuelle ?"
          value={formData.instabiliteATMPriseEnCharge}
          onChange={(val) => updateField("instabiliteATMPriseEnCharge", val)}
        />

        <ConditionalBlock
          visible={formData.instabiliteATMPriseEnCharge === "oui"}
        >
          <QuestionBlock
            label="Physiothérapie spécifique ATM ?"
            value={formData.instabiliteATMPhysio}
            onChange={(val) => updateField("instabiliteATMPhysio", val)}
          />
          <QuestionBlock
            label="Chirurgie maxillo-faciale ?"
            value={formData.instabiliteATMChirurgie}
            onChange={(val) => updateField("instabiliteATMChirurgie", val)}
          />
        </ConditionalBlock>
      </ConditionalBlock>

      <QuestionBlock
        label="Présence de douleurs avec une composante inflammatoire ou dégénérative ?"
        value={formData.douleursInflammatoires}
        onChange={(val) => updateField("douleursInflammatoires", val)}
      />
      <ConditionalBlock visible={formData.douleursInflammatoires === "oui"}>
        <p style={styles.subLabel}>De quel type ?</p>
        <input
          type="text"
          placeholder="Ex : arthrose connue..."
          value={formData.typeInflammation}
          onChange={(e) => updateField("typeInflammation", e.target.value)}
          style={styles.textInput}
        />
      </ConditionalBlock>

      <QuestionBlock
        label="Antécédents de fractures multiples et/ou de fractures de fragilité ?"
        value={formData.fracturesMultiples}
        onChange={(val) => updateField("fracturesMultiples", val)}
      />
      <ConditionalBlock visible={formData.fracturesMultiples === "oui"}>
        <QuestionBlock
          label="Ostéoporose connue ?"
          value={formData.osteoporoseConnue}
          onChange={(val) => updateField("osteoporoseConnue", val)}
        />
        <ConditionalBlock visible={formData.osteoporoseConnue === "oui"}>
          <QuestionBlock
            label="Traitement spécifique de l'ostéoporose en cours ?"
            value={formData.traitementOsteoporose}
            onChange={(val) => updateField("traitementOsteoporose", val)}
          />
          <ConditionalBlock visible={formData.traitementOsteoporose === "non"}>
            <QuestionBlock
              label={`${patientLabel()} est ouvert·e à l'idée d'un traitement ?`}
              value={formData.patientOuvertTraitement}
              onChange={(val) => updateField("patientOuvertTraitement", val)}
            />
          </ConditionalBlock>
        </ConditionalBlock>
      </ConditionalBlock>

      <QuestionBlock
        label="Suspicion d'un syndrome du défilé thoracique (SDT) ?"
        hint="Douleur cervico-brachiale / Paresthésies et/ou engourdissements MS / Faiblesse ou fatigabilité MS / Symptômes déclenchés ou aggravés par certaines positions du bras."
        value={formData.syndromeDefileThoracique}
        onChange={(val) => updateField("syndromeDefileThoracique", val)}
      />
      <ConditionalBlock visible={formData.syndromeDefileThoracique === "oui"}>
        <QuestionBlock
          label="Déjà connu ?"
          value={formData.syndromeDefileConnu}
          onChange={(val) => updateField("syndromeDefileConnu", val)}
        />
        <ConditionalBlock visible={formData.syndromeDefileConnu === "oui"}>
          <QuestionBlock
            label="Déjà pris en charge ?"
            value={formData.syndromeDefilePriseEnCharge}
            onChange={(val) => updateField("syndromeDefilePriseEnCharge", val)}
          />
        </ConditionalBlock>
      </ConditionalBlock>

      <QuestionBlock
        label="Présence de pieds plats ?"
        value={formData.piedsPats}
        onChange={(val) => updateField("piedsPats", val)}
      />
      <ConditionalBlock visible={formData.piedsPats === "oui"}>
        <QuestionBlock
          label="Prise en charge par un podologue ?"
          value={formData.piedsPatsPodiologie}
          onChange={(val) => updateField("piedsPatsPodiologie", val)}
        />
      </ConditionalBlock>

      <div style={styles.fieldGroup}>
        <p style={styles.subLabel}>Notes libres</p>
        <textarea
          placeholder="Observations complémentaires..."
          value={formData.notesOsteo}
          onChange={(e) => updateField("notesOsteo", e.target.value)}
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
  checkboxGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "16px",
  },
  checkboxRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    fontSize: "14px",
  },
  checkbox: {
    width: "16px",
    height: "16px",
    cursor: "pointer",
    accentColor: "#1a1a2e",
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
