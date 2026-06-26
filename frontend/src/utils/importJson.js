export function importFromJson(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);

        if (!parsed.formData || !parsed.patientId) {
          reject(new Error("Fichier JSON invalide ou incompatible."));
          return;
        }

        resolve({
          formData: parsed.formData,
          patientId: parsed.patientId,
          exportDate: parsed.exportDate,
          sectionStatus: parsed.sectionStatus || {},
        });
      } catch {
        reject(new Error("Impossible de lire le fichier JSON."));
      }
    };

    reader.onerror = () => {
      reject(new Error("Erreur lors de la lecture du fichier."));
    };

    reader.readAsText(file);
  });
}
