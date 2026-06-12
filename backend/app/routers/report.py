# report.py
# Route FastAPI pour la génération du rapport Word
# Reçoit les données du formulaire et retourne le fichier .docx

from fastapi import APIRouter, HTTPException
from fastapi.responses import Response
from app.models.evaluation import EvaluationRequest
from app.services.report_generator import generate_report

router = APIRouter()

@router.post("/generate-report")
async def generate_report_endpoint(evaluation: EvaluationRequest):
    try:
        docx_bytes = generate_report(
            patient_id=evaluation.patientId,
            form_data=evaluation.formData
        )
        
        filename = f"rapport_{evaluation.patientId}.docx"
        
        return Response(
            content=docx_bytes,
            media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            headers={
                "Content-Disposition": f"attachment; filename={filename}"
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))