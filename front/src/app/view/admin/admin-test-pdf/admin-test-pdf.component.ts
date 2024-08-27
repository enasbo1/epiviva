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
    
  }

  // Méthode pour générer le PDF
  generatePDF(): void {
    const doc = new jsPDF();  // Créer une instance de jsPDF
    
    const currentDate = new Date().toLocaleDateString();

    doc.text('Livraison du :', 10, 10);  // Ajouter du texte au PDF à la position (10,10)
    doc.text(currentDate, 45, 10);  // Ajouter la date actuelle en dessous

    doc.save('test_pdf.pdf');  // Sauvegarder le fichier PDF sous le nom "test_pdf.pdf"
  }

}
