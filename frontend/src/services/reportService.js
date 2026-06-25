export async function generateReport(formData, patientId) {
  const response = await fetch("http://localhost:8000/generate-report", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      patientId: patientId,
      formData: formData,
    }),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la génération du rapport");
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `evaluation_${patientId}_${new Date().toISOString().split("T")[0]}.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
