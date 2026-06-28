export async function generateReport(formData, patientId, sectionStatus) {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const response = await fetch(`${apiUrl}/generate-report`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      patientId: patientId,
      formData: formData,
      sectionStatus: sectionStatus,
    }),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la génération du rapport");
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "_");
  link.download = `${date}_${patientId}.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
