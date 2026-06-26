from pydantic import BaseModel
from typing import Optional, Dict

class SpecialisteData(BaseModel):
    checked: Optional[bool] = False
    nom: Optional[str] = ""
    adresse: Optional[str] = ""
    telephone: Optional[str] = ""

class InstabiliteATMSymptomes(BaseModel):
    douleursMachoire: Optional[bool] = False
    craquements: Optional[bool] = False
    deboitages: Optional[bool] = False
    cephalees: Optional[bool] = False
    troublesMastication: Optional[bool] = False

class Recommandations(BaseModel):
    psychoeducation: Optional[bool] = False
    reconditionnement: Optional[bool] = False
    ergotherapie: Optional[bool] = False
    tens: Optional[bool] = False
    antalgiques: Optional[bool] = False
    topiques: Optional[bool] = False
    gestion: Optional[bool] = False
    chaleur: Optional[bool] = False
    acupuncture: Optional[bool] = False
    complementsAlimentaires: Optional[bool] = False

class FormData(BaseModel):
    genre: Optional[str] = ""
    dateConsultation: Optional[str] = ""

    instabiliteArticulaire: Optional[str] = ""

    instabiliteATM: Optional[str] = ""
    instabiliteATMSymptomes: Optional[InstabiliteATMSymptomes] = InstabiliteATMSymptomes()
    instabiliteATMPriseEnCharge: Optional[str] = ""
    instabiliteATMPhysio: Optional[str] = ""
    instabiliteATMChirurgie: Optional[str] = ""

    douleursInflammatoires: Optional[str] = ""
    typeInflammation: Optional[str] = ""

    fracturesMultiples: Optional[str] = ""
    osteoporoseConnue: Optional[str] = ""
    traitementOsteoporose: Optional[str] = ""
    patientOuvertTraitement: Optional[str] = ""

    syndromeDefileThoracique: Optional[str] = ""
    syndromeDefileConnu: Optional[str] = ""
    syndromeDefilePriseEnCharge: Optional[str] = ""

    piedsPats: Optional[str] = ""
    piedsPatsPodiologie: Optional[str] = ""

    notesOsteo: Optional[str] = ""

    douleursNociplastiques: Optional[str] = ""
    descriptionDouleursNociplastiques: Optional[str] = ""
    douleursMusculaires: Optional[str] = ""
    notesGeneralisees: Optional[str] = ""

    douleursNeuropathiques: Optional[str] = ""
    diagnosticNeuropathique: Optional[str] = ""
    diagnosticNeuropathiqueTexte: Optional[str] = ""
    priseEnChargeNeuropathique: Optional[str] = ""
    notesNeuropathiques: Optional[str] = ""

    recommandations: Optional[Recommandations] = Recommandations()
    recommandationsTexteLibre: Optional[str] = ""

    specialistes: Optional[Dict[str, SpecialisteData]] = {}
    notesReseau: Optional[str] = ""

class EvaluationRequest(BaseModel):
    patientId: str
    formData: FormData
    sectionStatus: Optional[dict] = {}