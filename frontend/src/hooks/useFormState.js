import { useState } from "react";
import { SECTIONS } from "../data/formStructure";

function generatePatientId() {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `PAT-${year}-${random}`;
}

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

export function useFormState() {
  const [patientId] = useState(generatePatientId);

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const [sectionStatus, setSectionStatus] = useState(
    Object.fromEntries(SECTIONS.map((s) => [s.id, "pending"])),
  );

  const [formData, setFormData] = useState({
    genre: "",
    dateConsultation: getTodayDate(),

    piedsPats: "",
    douleursInflammatoires: "",
    typeInflammation: "",
    instabiliteArticulaire: "",
    fracturesMultiples: "",
    osteoporoseConnue: "",
    traitementOsteoporose: "",
    patientOuvertTraitement: "",
    syndromeDefileThoracique: "",
    notesOsteo: "",

    douleursNociplastiques: "",
    descriptionDouleursNociplastiques: "",
    doueursMuscularires: "",
    notesGeneralisees: "",

    douleursNeuropathiques: "",
    notesNeuropathiques: "",

    specialistes: {},
    notesReseau: "",
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const goToNextSection = () => {
    const currentId = SECTIONS[currentSectionIndex].id;
    setSectionStatus((prev) => ({ ...prev, [currentId]: "completed" }));
    setCurrentSectionIndex((prev) => prev + 1);
  };

  const skipSection = () => {
    const currentId = SECTIONS[currentSectionIndex].id;
    setSectionStatus((prev) => ({ ...prev, [currentId]: "skipped" }));
    setCurrentSectionIndex((prev) => prev + 1);
  };

  const goToSection = (index) => {
    setCurrentSectionIndex(index);
  };

  return {
    patientId,
    currentSectionIndex,
    sectionStatus,
    formData,
    updateField,
    goToNextSection,
    skipSection,
    goToSection,
  };
}
