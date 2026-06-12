import { useNavigate } from "react-router-dom";
import { AiOutlineHome, AiOutlineArrowLeft } from "react-icons/ai";

import { useFormState } from "../hooks/useFormState";
import Sidebar from "../components/layout/Sidebar";

import InfoGenerales from "../sections/InfoGenerales";
import DouleursOsteo from "../sections/DouleursOsteo";
import DouleursGeneralisees from "../sections/DouleursGeneralisees";
import DouleursNeuropathiques from "../sections/DouleursNeuropathiques";
import ReseauMedical from "../sections/ReseauMedical";

function EvaluationPage({ importedData }) {
  const navigate = useNavigate();
  const {
    patientId,
    currentSectionIndex,
    sectionStatus,
    formData,
    updateField,
    goToNextSection,
    skipSection,
    goToSection,
  } = useFormState(importedData);

  const renderSection = () => {
    const props = {
      formData,
      updateField,
      onNext: goToNextSection,
      onSkip: skipSection,
    };
    switch (currentSectionIndex) {
      case 0:
        return <InfoGenerales {...props} />;
      case 1:
        return <DouleursOsteo {...props} />;
      case 2:
        return <DouleursGeneralisees {...props} />;
      case 3:
        return <DouleursNeuropathiques {...props} />;
      case 4:
        return (
          <ReseauMedical
            formData={formData}
            updateField={updateField}
            patientId={patientId}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <AiOutlineArrowLeft
          size={22}
          style={styles.headerIcon}
          onClick={() => navigate("/")}
        />
        <span style={styles.patientId}>ID : {patientId}</span>
        <AiOutlineHome
          size={22}
          style={styles.headerIcon}
          onClick={() => navigate("/")}
        />
      </div>

      <div style={styles.body}>
        <Sidebar
          currentSectionIndex={currentSectionIndex}
          sectionStatus={sectionStatus}
          onGoToSection={goToSection}
        />

        <div style={styles.content}>{renderSection()}</div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 32px",
    backgroundColor: "#fff",
    borderBottom: "1px solid #e0e0e0",
  },
  headerIcon: {
    cursor: "pointer",
    color: "#1a1a2e",
  },
  patientId: {
    fontSize: "13px",
    color: "#aaa",
    letterSpacing: "1px",
  },
  body: {
    display: "flex",
    flex: 1,
  },
  content: {
    flex: 1,
    padding: "32px 48px",
    backgroundColor: "#fff",
    overflowY: "auto",
  },
  sectionTitle: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#1a1a2e",
    marginBottom: "28px",
  },
};

export default EvaluationPage;
