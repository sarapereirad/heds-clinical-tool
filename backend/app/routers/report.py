from fastapi import APIRouter, HTTPException
from fastapi.responses import Response
from app.models.evaluation import EvaluationRequest
from app.services.report_generator import generate_report
import zipfile
import io
import json
from datetime import datetime

router = APIRouter()

MOIS = {
    1: 'janvier', 2: 'février', 3: 'mars', 4: 'avril',
    5: 'mai', 6: 'juin', 7: 'juillet', 8: 'août',
    9: 'septembre', 10: 'octobre', 11: 'novembre', 12: 'décembre'
}

def format_date_fichier(date_str: str) -> str:
    """Formate la date pour le nom de fichier : AAAA_MM_JJ"""
    try:
        date = datetime.strptime(date_str, '%Y-%m-%d')
        return date.strftime('%Y_%m_%d')
    except Exception:
        return datetime.now().strftime('%Y_%m_%d')

@router.post("/generate-report")
async def generate_report_endpoint(evaluation: EvaluationRequest):
    try:
        form_data = evaluation.formData
        patient_id = evaluation.patientId

        date_fichier = format_date_fichier(form_data.dateConsultation or '')
        nom_base = f"{date_fichier}_{patient_id}"

        specialistes_inclus = {
            nom: data for nom, data in form_data.specialistes.items()
            if data.checked and (data.nom or data.adresse or data.telephone)
        }

        zip_buffer = io.BytesIO()

        with zipfile.ZipFile(zip_buffer, 'w', zipfile.ZIP_DEFLATED) as zip_file:

            export_data = {
                "version": "1.0",
                "patientId": patient_id,
                "exportDate": datetime.now().isoformat(),
                "formData": form_data.model_dump(),
                "sectionStatus": evaluation.sectionStatus
            }
            zip_file.writestr(
                f'{nom_base}.json',
                json.dumps(export_data, ensure_ascii=False, indent=2)
            )

            if not specialistes_inclus:
                docx_bytes = generate_report(
                    patient_id=patient_id,
                    form_data=form_data,
                    destinataire='[Destinataire]'
                )
                zip_file.writestr(f'{nom_base}.docx', docx_bytes)
            else:
                for nom, data in specialistes_inclus.items():
                    lignes_destinataire = [data.nom or nom]
                    if data.adresse:
                        lignes_destinataire.append(data.adresse)
                    if data.telephone:
                        lignes_destinataire.append(data.telephone)
                    destinataire_str = '\n'.join(lignes_destinataire)

                    docx_bytes = generate_report(
                        patient_id=patient_id,
                        form_data=form_data,
                        destinataire=destinataire_str
                    )

                    nom_safe = nom.replace('/', '-').replace(' ', '_')[:40]
                    zip_file.writestr(
                        f'{nom_base}_{nom_safe}.docx',
                        docx_bytes
                    )

        zip_buffer.seek(0)

        return Response(
            content=zip_buffer.read(),
            media_type='application/zip',
            headers={
                'Content-Disposition': f'attachment; filename={nom_base}.zip'
            }
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))