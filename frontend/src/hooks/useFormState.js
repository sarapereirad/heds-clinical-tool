import { useState } from "react";
import { SECTIONS } from "../data/formStructure";

function generatePatientId() {
  const year = new Date().getFullYear();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `PAT-${year}-${random}`;
}

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

export function useFormState(importedData = null) {
  const [patientId] = useState(generatePatientId);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [sectionStatus, setSectionStatus] = useState(
    importedData?.sectionStatus &&
      Object.keys(importedData.sectionStatus).length > 0
      ? importedData.sectionStatus
      : Object.fromEntries(SECTIONS.map((s) => [s.id, "pending"])),
  );

  const [formData, setFormData] = useState(
    importedData?.formData || {
      genre: "",
      dateConsultation: getTodayDate(),

      piedsPats: "",
      piedsPatsPodiologie: "",

      instabiliteArticulaire: "",

      instabiliteATM: "",
      instabiliteATMSymptomes: {
        douleursMachoire: false,
        craquements: false,
        deboitages: false,
        cephalees: false,
        troublesMastication: false,
      },
      instabiliteATMPriseEnCharge: "",
      instabiliteATMPhysio: "",
      instabiliteATMChirurgie: "",

      douleursInflammatoires: "",
      typeInflammation: "",

      fracturesMultiples: "",
      osteoporoseConnue: "",
      traitementOsteoporose: "",
      patientOuvertTraitement: "",

      syndromeDefileThoracique: "",
      syndromeDefileConnu: "",
      syndromeDefilePriseEnCharge: "",

      notesOsteo: "",

      douleursNociplastiques: "",
      descriptionDouleursNociplastiques: "",
      douleursMusculaires: "",
      notesGeneralisees: "",

      douleursNeuropathiques: "",
      diagnosticNeuropathique: "",
      diagnosticNeuropathiqueTexte: "",
      priseEnChargeNeuropathique: "",
      notesNeuropathiques: "",

      recommandations: {
        psychoeducation: false,
        reconditionnement: false,
        ergotherapie: false,
        tens: false,
        antalgiques: false,
        topiques: false,
        gestion: false,
        chaleur: false,
        acupuncture: false,
        complementsAlimentaires: false,
      },
      recommandationsTexteLibre: "",

      specialistes: {},
      notesReseau: "",
    },
  );

  const updateField = (field, value) => {
    const currentId = SECTIONS[currentSectionIndex].id;
    if (sectionStatus[currentId] === "skipped") {
      setSectionStatus((prev) => ({ ...prev, [currentId]: "pending" }));
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateNestedField = (field, subfield, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: { ...prev[field], [subfield]: value },
    }));
  };

  const goToNextSection = () => {
    const currentId = SECTIONS[currentSectionIndex].id;
    setSectionStatus((prev) => ({ ...prev, [currentId]: "completed" }));
    if (currentSectionIndex < SECTIONS.length - 1) {
      setCurrentSectionIndex((prev) => prev + 1);
    }
  };

  const skipSection = () => {
    const currentId = SECTIONS[currentSectionIndex].id;
    const newStatus = { ...sectionStatus, [currentId]: "skipped" };
    setSectionStatus(newStatus);

    const resetFields = {
      osteo: {
        instabiliteArticulaire: "",
        instabiliteATM: "",
        instabiliteATMSymptomes: {
          douleursMachoire: false,
          craquements: false,
          deboitages: false,
          cephalees: false,
          troublesMastication: false,
        },
        instabiliteATMPriseEnCharge: "",
        instabiliteATMPhysio: "",
        instabiliteATMChirurgie: "",
        douleursInflammatoires: "",
        typeInflammation: "",
        fracturesMultiples: "",
        osteoporoseConnue: "",
        traitementOsteoporose: "",
        patientOuvertTraitement: "",
        syndromeDefileThoracique: "",
        syndromeDefileConnu: "",
        syndromeDefilePriseEnCharge: "",
        piedsPats: "",
        piedsPatsPodiologie: "",
        notesOsteo: "",
      },
      generalisees: {
        douleursNociplastiques: "",
        descriptionDouleursNociplastiques: "",
        douleursMusculaires: "",
        notesGeneralisees: "",
      },
      neuropathiques: {
        douleursNeuropathiques: "",
        diagnosticNeuropathique: "",
        diagnosticNeuropathiqueTexte: "",
        priseEnChargeNeuropathique: "",
        notesNeuropathiques: "",
      },
      recommandations: {
        recommandations: {
          psychoeducation: false,
          reconditionnement: false,
          ergotherapie: false,
          tens: false,
          antalgiques: false,
          topiques: false,
          gestion: false,
          chaleur: false,
          acupuncture: false,
          complementsAlimentaires: false,
        },
        recommandationsTexteLibre: "",
      },
      reseau: {
        specialistes: {},
        notesReseau: "",
      },
    };

    if (resetFields[currentId]) {
      setFormData((prev) => ({ ...prev, ...resetFields[currentId] }));
    }

    const allSkipped = SECTIONS.slice(1).every(
      (s) => newStatus[s.id] === "skipped",
    );

    if (allSkipped) return "redirect";

    if (currentSectionIndex < SECTIONS.length - 1) {
      setCurrentSectionIndex((prev) => prev + 1);
    }
    return null;
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
    updateNestedField,
    goToNextSection,
    skipSection,
    goToSection,
  };
}
