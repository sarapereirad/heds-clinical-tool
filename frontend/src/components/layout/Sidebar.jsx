import { BsCheckCircleFill } from "react-icons/bs";
import { SECTIONS } from "../../data/formStructure";

function Sidebar({ currentSectionIndex, sectionStatus, onGoToSection }) {
  const getItemStyle = (index, sectionId) => {
    if (index === currentSectionIndex) return styles.itemActive;
    if (sectionStatus[sectionId] === "completed") return styles.itemCompleted;
    if (sectionStatus[sectionId] === "skipped") return styles.itemSkipped;
    return styles.itemPending;
  };

  return (
    <div style={styles.sidebar}>
      <p style={styles.title}>SECTIONS</p>
      {SECTIONS.map((section, index) => (
        <div
          key={section.id}
          style={getItemStyle(index, section.id)}
          onClick={() => onGoToSection(index)}
        >
          {sectionStatus[section.id] === "completed" && (
            <BsCheckCircleFill
              size={14}
              color="#2ecc71"
              style={{ flexShrink: 0 }}
            />
          )}
          {sectionStatus[section.id] === "skipped" && (
            <span style={styles.skippedDot}>—</span>
          )}
          {sectionStatus[section.id] === "pending" &&
            index === currentSectionIndex && (
              <span style={styles.activeDot}>●</span>
            )}
          {sectionStatus[section.id] === "pending" &&
            index !== currentSectionIndex && (
              <span style={styles.pendingDot}>○</span>
            )}

          <span style={{ fontSize: "13px" }}>{section.label}</span>

          {sectionStatus[section.id] === "skipped" && (
            <span style={styles.skippedLabel}>Non évaluée</span>
          )}
        </div>
      ))}
    </div>
  );
}

const styles = {
  sidebar: {
    width: "220px",
    minWidth: "220px",
    backgroundColor: "#f0f0f0",
    padding: "24px 12px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  title: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#aaa",
    letterSpacing: "1px",
    marginBottom: "12px",
    paddingLeft: "8px",
  },
  itemActive: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 12px",
    backgroundColor: "#1a1a2e",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },
  itemCompleted: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 12px",
    color: "#2ecc71",
    borderRadius: "8px",
    cursor: "pointer",
  },
  itemSkipped: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 12px",
    color: "#aaa",
    borderRadius: "8px",
    cursor: "pointer",
  },
  itemPending: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 12px",
    color: "#888",
    borderRadius: "8px",
    cursor: "pointer",
  },
  activeDot: {
    color: "white",
    fontSize: "10px",
    flexShrink: 0,
  },
  pendingDot: {
    color: "#aaa",
    fontSize: "10px",
    flexShrink: 0,
  },
  skippedDot: {
    color: "#aaa",
    fontSize: "14px",
    flexShrink: 0,
  },
  skippedLabel: {
    fontSize: "11px",
    color: "#aaa",
    fontStyle: "italic",
    marginLeft: "auto",
  },
};

export default Sidebar;
