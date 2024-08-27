import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';  // Importation de la bibliothèque jsPDF

@Component({
  selector: 'epv-admin-test-pdf',
  templateUrl: './admin-test-pdf.component.html',
  styleUrls: ['./admin-test-pdf.component.scss']
})
export class AdminTestPdfComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Toute logique d'initialisation peut aller ici si nécessaire
  }

  // Méthode pour générer le PDF
  generatePDF(): void {
    const doc = new jsPDF();  // Créer une instance de jsPDF
    
    const currentDate = new Date().toLocaleDateString();  // Obtenir la date actuelle au format local

    doc.text('Date du jour :', 10, 10);  // Ajouter du texte au PDF à la position (10,10)
    doc.text(currentDate, 10, 20);  // Ajouter la date actuelle en dessous

    doc.save('test_pdf.pdf');  // Sauvegarder le fichier PDF sous le nom "test_pdf.pdf"
  }

}
