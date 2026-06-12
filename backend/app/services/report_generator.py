# report_generator.py
# Génère le rapport Word (.docx) à partir des données du formulaire
# Utilise python-docx pour créer un document structuré

from docx import Document
from docx.shared import Pt, RGBColor, Cm
from docx.enum.text import WD_ALIGN_PARAGRAPH
from datetime import datetime

def format_reponse(valeur: str) -> str:
    """Convertit les valeurs techniques en texte lisible"""
    mapping = {
        'oui': 'Oui',
        'non': 'Non',
        'non_evalue': "N'a pas été évalué lors de cette consultation",
        'masculin': 'Masculin',
        'feminin': 'Féminin',
        'neutre': 'Neutre',
        '': 'Non renseigné',
    }
    return mapping.get(valeur, valeur)

def add_title(doc, text):
    """Ajoute un titre de section"""
    para = doc.add_paragraph()
    run = para.add_run(text)
    run.bold = True
    run.font.size = Pt(13)
    run.font.color.rgb = RGBColor(0x1a, 0x1a, 0x2e)
    para.space_before = Pt(12)
    para.space_after = Pt(6)
    return para

def add_question(doc, question, reponse, detail=None):
    """Ajoute une question avec sa réponse"""
    para = doc.add_paragraph()
    
    # Question en gras
    run_q = para.add_run(f"{question} : ")
    run_q.bold = True
    run_q.font.size = Pt(11)
    
    # Réponse normale
    run_r = para.add_run(format_reponse(reponse))
    run_r.font.size = Pt(11)
    
    # Détail si présent
    if detail:
        run_d = para.add_run(f" ({detail})")
        run_d.font.size = Pt(11)
        run_d.italic = True

    para.space_after = Pt(4)
    return para

def add_notes(doc, notes):
    """Ajoute les notes libres si présentes"""
    if notes and notes.strip():
        para = doc.add_paragraph()
        run = para.add_run("Notes libres : ")
        run.bold = True
        run.font.size = Pt(11)
        run2 = para.add_run(notes)
        run2.font.size = Pt(11)
        run2.italic = True

def generate_report(patient_id: str, form_data) -> bytes:
    """Génère le rapport Word complet et retourne les bytes du fichier"""
    
    doc = Document()

    # Marges
    for section in doc.sections:
        section.top_margin = Cm(2.5)
        section.bottom_margin = Cm(2.5)
        section.left_margin = Cm(2.5)
        section.right_margin = Cm(2.5)

    # ── EN-TÊTE ──
    header = doc.add_paragraph()
    header.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = header.add_run("Rapport de consultation clinique")
    run.bold = True
    run.font.size = Pt(16)
    run.font.color.rgb = RGBColor(0x1a, 0x1a, 0x2e)

    doc.add_paragraph()

    # Destinataire et infos
    doc.add_paragraph(f"Destinataire : ")
    doc.add_paragraph(f"ID patient : {patient_id}")
    doc.add_paragraph(f"Date de consultation : {form_data.dateConsultation}")
    doc.add_paragraph(f"Genre : {format_reponse(form_data.genre)}")
    doc.add_paragraph(f"Document généré le : {datetime.now().strftime('%d/%m/%Y à %H:%M')}")

    doc.add_paragraph()
    doc.add_paragraph("─" * 60)
    doc.add_paragraph()

    # ── SECTION 1 - Douleurs ostéo-articulaires ──
    add_title(doc, "1. Douleurs ostéo-articulaires")

    add_question(doc, "Présence de pieds plats", form_data.piedsPats)
    add_question(
        doc,
        "Présence de douleurs avec une composante inflammatoire",
        form_data.douleursInflammatoires,
        form_data.typeInflammation if form_data.douleursInflammatoires == 'oui' else None
    )
    add_question(doc, "Instabilité articulaire avec luxations ou subluxations", form_data.instabiliteArticulaire)
    add_question(doc, "Antécédents de fractures multiples ou de fragilité", form_data.fracturesMultiples)

    if form_data.fracturesMultiples == 'oui':
        add_question(doc, "  Ostéoporose connue", form_data.osteoporoseConnue)
        add_question(doc, "  Traitement spécifique en cours", form_data.traitementOsteoporose)
        add_question(doc, "  Patient ouvert à un traitement", form_data.patientOuvertTraitement)

    add_question(doc, "Suspicion d'un syndrome du défilé thoracique", form_data.syndromeDefileThoracique)
    add_notes(doc, form_data.notesOsteo)

    doc.add_paragraph()

    # ── SECTION 2 - Douleurs généralisées ──
    add_title(doc, "2. Douleurs généralisées")

    add_question(
        doc,
        "Présence de douleurs primaires, nociplastiques ou de sensibilisation centrale",
        form_data.douleursNociplastiques,
        form_data.descriptionDouleursNociplastiques if form_data.douleursNociplastiques == 'oui' else None
    )
    add_question(doc, "Présence de douleurs musculaires ou fatigabilité excessive", form_data.douleursMusculaires)
    add_notes(doc, form_data.notesGeneralisees)

    doc.add_paragraph()

    # ── SECTION 3 - Douleurs neuropathiques ──
    add_title(doc, "3. Douleurs neuropathiques")

    add_question(doc, "Présence de symptômes évocateurs de douleurs neuropathiques", form_data.douleursNeuropathiques)
    add_notes(doc, form_data.notesNeuropathiques)

    doc.add_paragraph()

    # ── SECTION 4 - Réseau médical ──
    add_title(doc, "4. Réseau médical")

    specialistes_inclus = {
        nom: data for nom, data in form_data.specialistes.items()
        if data.checked and data.inclureRapport
    }

    if specialistes_inclus:
        for nom, data in specialistes_inclus.items():
            para = doc.add_paragraph()
            run = para.add_run(f"• {nom}")
            run.bold = True
            run.font.size = Pt(11)

            if data.nom:
                doc.add_paragraph(f"  Nom : {data.nom}").runs[0].font.size = Pt(11)
            if data.adresse:
                doc.add_paragraph(f"  Adresse : {data.adresse}").runs[0].font.size = Pt(11)
            if data.contact:
                doc.add_paragraph(f"  Contact : {data.contact}").runs[0].font.size = Pt(11)
    else:
        doc.add_paragraph("Aucun spécialiste inclus dans le rapport.").runs[0].font.size = Pt(11)

    add_notes(doc, form_data.notesReseau)

    # ── PIED DE PAGE ──
    doc.add_paragraph()
    doc.add_paragraph("─" * 60)
    footer = doc.add_paragraph()
    footer.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = footer.add_run("Document généré automatiquement par l'outil hEDS d'évaluation clinique — CEMIC / CHUV")
    run.font.size = Pt(9)
    run.font.color.rgb = RGBColor(0x88, 0x88, 0x88)
    run.italic = True

    # Convertir en bytes
    import io
    buffer = io.BytesIO()
    doc.save(buffer)
    buffer.seek(0)
    return buffer.read()