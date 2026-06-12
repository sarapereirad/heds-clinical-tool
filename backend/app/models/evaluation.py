# evaluation.py
# Modèle Pydantic définissant la structure des données du formulaire
# FastAPI valide automatiquement les données reçues selon ce modèle

from pydantic import BaseModel
from typing import Optional, Dict

class SpecialisteData(BaseModel):
    checked: Optional[bool] = False
    nom: Optional[str] = ""
    adresse: Optional[str] = ""
    contact: Optional[str] = ""
    inclureRapport: Optional[bool] = False

class FormData(BaseModel):
    # Informations générales
    genre: Optional[str] = ""
    dateConsultation: Optional[str] = ""

    # Section 1 - Douleurs ostéo-articulaires
    piedsPats: Optional[str] = ""
    douleursInflammatoires: Optional[str] = ""
    typeInflammation: Optional[str] = ""
    instabiliteArticulaire: Optional[str] = ""
    fracturesMultiples: Optional[str] = ""
    osteoporoseConnue: Optional[str] = ""
    traitementOsteoporose: Optional[str] = ""
    patientOuvertTraitement: Optional[str] = ""
    syndromeDefileThoracique: Optional[str] = ""
    notesOsteo: Optional[str] = ""

    # Section 2 - Douleurs généralisées
    douleursNociplastiques: Optional[str] = ""
    descriptionDouleursNociplastiques: Optional[str] = ""
    douleursMusculaires: Optional[str] = ""
    notesGeneralisees: Optional[str] = ""

    # Section 3 - Douleurs neuropathiques
    douleursNeuropathiques: Optional[str] = ""
    notesNeuropathiques: Optional[str] = ""

    # Section 4 - Réseau médical
    specialistes: Optional[Dict[str, SpecialisteData]] = {}
    notesReseau: Optional[str] = ""

class EvaluationRequest(BaseModel):
    patientId: str
    formData: FormData