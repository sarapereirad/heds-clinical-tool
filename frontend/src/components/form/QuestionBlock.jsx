function QuestionBlock({
  label,
  value,
  onChange,
  options = ["oui", "non", "non_evalue"],
  hint,
}) {
  const labels = {
    oui: "Oui",
    non: "Non",
    non_evalue: "Non évaluée",
  };

  return (
    <div style={styles.container}>
      <p style={styles.label}>{label}</p>
      {hint && <p style={styles.hint}>{hint}</p>}
      <div style={styles.optionsRow}>
        {options.map((opt) => (
          <label key={opt} style={styles.option}>
            <input
              type="radio"
              name={label}
              value={opt}
              checked={value === opt}
              onChange={() => onChange(opt)}
              style={styles.radio}
            />
            <span
              style={
                opt === "non_evalue" ? styles.nonEvalue : styles.optionLabel
              }
            >
              {labels[opt]}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    marginBottom: "24px",
  },
  label: {
    fontWeight: "600",
    fontSize: "14px",
    color: "#1a1a2e",
    marginBottom: "8px",
  },
  hint: {
    fontSize: "12px",
    color: "#888",
    fontStyle: "italic",
    marginBottom: "8px",
  },
  optionsRow: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  option: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
  radio: {
    cursor: "pointer",
    accentColor: "#1a1a2e",
  },
  optionLabel: {
    color: "#1a1a2e",
  },
  nonEvalue: {
    color: "#aaa",
    fontStyle: "italic",
  },
};

export default QuestionBlock;
