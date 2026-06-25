from fastapi import APIRouter, HTTPException
from fastapi.responses import Response
from app.models.evaluation import EvaluationRequest
from app.services.report_generator import generate_report
import zipfile
import io
import json
from datetime import datetime

router = APIRouter()

@router.post("/generate-report")
async def generate_report_endpoint(evaluation: EvaluationRequest):
    try:
        form_data = evaluation.formData
        patient_id = evaluation.patientId

        specialistes_inclus = {
            nom: data for nom, data in form_data.specialistes.items()
            if data.checked and data.inclureRapport
        }

        zip_buffer = io.BytesIO()

        with zipfile.ZipFile(zip_buffer, 'w', zipfile.ZIP_DEFLATED) as zip_file:

            export_data = {
                "version": "1.0",
                "patientId": patient_id,
                "exportDate": datetime.now().isoformat(),
                "formData": form_data.model_dump()
            }
            zip_file.writestr(
                f'evaluation_{patient_id}.json',
                json.dumps(export_data, ensure_ascii=False, indent=2)
            )

            if not specialistes_inclus:
                docx_bytes = generate_report(
                    patient_id=patient_id,
                    form_data=form_data,
                    destinataire='[Destinataire]'
                )
                zip_file.writestr(
                    f'rapport_{patient_id}.docx',
                    docx_bytes
                )
            else:
                for nom, data in specialistes_inclus.items():
                    lignes_destinataire = [data.nom or nom]
                    if data.adresse:
                        lignes_destinataire.append(data.adresse)
                    if data.telephone:
                        tel = f"{data.indicatif or ''} {data.telephone}".strip()
                        lignes_destinataire.append(tel)
                    destinataire_str = '\n'.join(lignes_destinataire)

                    docx_bytes = generate_report(
                        patient_id=patient_id,
                        form_data=form_data,
                        destinataire=destinataire_str
                    )

                    nom_safe = nom.replace('/', '-').replace(' ', '_')[:40]
                    zip_file.writestr(
                        f'rapport_{patient_id}_{nom_safe}.docx',
                        docx_bytes
                    )

        zip_buffer.seek(0)

        return Response(
            content=zip_buffer.read(),
            media_type='application/zip',
            headers={
                'Content-Disposition': f'attachment; filename=evaluation_{patient_id}.zip'
            }
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))