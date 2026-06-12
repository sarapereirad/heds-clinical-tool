// ImportPage.jsx
// Page permettant d'importer une évaluation existante via un fichier JSON
// Drag & drop ou clic pour sélectionner le fichier

import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineArrowLeft,
  AiOutlineHome,
  AiOutlineUpload,
} from "react-icons/ai";
import { importFromJson } from "../utils/importJson";

function ImportPage({ onImport }) {
  const navigate = useNavigate();
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file.name.endsWith(".json")) {
      setError("Veuillez sélectionner un fichier JSON uniquement.");
      return;
    }
    try {
      const data = await importFromJson(file);
      onImport(data);
      navigate("/evaluation");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <AiOutlineArrowLeft
          size={22}
          style={styles.icon}
          onClick={() => navigate("/")}
        />
        <AiOutlineHome
          size={22}
          style={styles.icon}
          onClick={() => navigate("/")}
        />
      </div>

      <div style={styles.container}>
        <h2 style={styles.title}>Importer une évaluation existante</h2>
        <p style={styles.subtitle}>
          Format accepté : <code>.json</code>
        </p>

        {/* Zone drag & drop */}
        <div
          style={dragging ? styles.dropZoneActive : styles.dropZone}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleClick}
        >
          <AiOutlineUpload size={36} color="#aaa" />
          <p style={styles.dropText}>
            Glissez votre fichier ici ou cliquez pour parcourir
          </p>
          <p style={styles.dropSubtext}>Fichier JSON uniquement</p>
        </div>

        {/* Input caché */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          style={{ display: "none" }}
          onChange={handleFileInput}
        />

        {/* Message d'erreur */}
        {error && <p style={styles.errorMsg}>{error}</p>}
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
  icon: {
    cursor: "pointer",
    color: "#1a1a2e",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: "48px",
    gap: "16px",
  },
  title: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#1a1a2e",
  },
  subtitle: {
    fontSize: "14px",
    color: "#888",
  },
  dropZone: {
    width: "100%",
    maxWidth: "560px",
    border: "2px dashed #ccc",
    borderRadius: "12px",
    padding: "48px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer",
    backgroundColor: "#fff",
    transition: "border-color 0.2s",
  },
  dropZoneActive: {
    width: "100%",
    maxWidth: "560px",
    border: "2px dashed #1a1a2e",
    borderRadius: "12px",
    padding: "48px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer",
    backgroundColor: "#f0f4ff",
    transition: "border-color 0.2s",
  },
  dropText: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#555",
    textAlign: "center",
  },
  dropSubtext: {
    fontSize: "13px",
    color: "#aaa",
  },
  errorMsg: {
    color: "red",
    fontSize: "14px",
  },
};

export default ImportPage;
