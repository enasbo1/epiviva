import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf'; // Importation de la bibliothèque jsPDF
import * as XLSX from 'xlsx';  // Importation de la bibliothèque xlsx

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

  // Méthode pour générer un PDF (existe déjà)
  generatePDF(): void {
    const doc = new jsPDF();
    
    const currentDate = new Date().toLocaleDateString();

    doc.text('Date du jour :', 10, 10);
    doc.text(currentDate, 10, 20);

    doc.save('test_pdf.pdf');
  }

  // Méthode pour générer un fichier Excel
  generateExcel(): void {
    // Exemple de données de planning
    const planningData = [
      { Date: '2024-08-24', Tâche: 'Préparation de la commande', Responsable: 'Jean Dupont' },
      { Date: '2024-08-25', Tâche: 'Livraison', Responsable: 'Marie Durant' },
      { Date: '2024-08-26', Tâche: 'Suivi client', Responsable: 'Paul Martin' }
    ];

    // Convertir les données JSON en feuille de calcul
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(planningData);

    // Créer un nouveau classeur
    const workbook: XLSX.WorkBook = { Sheets: { 'Planning': worksheet }, SheetNames: ['Planning'] };

    // Générer un fichier Excel
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Sauvegarder le fichier
    this.saveAsExcelFile(excelBuffer, 'planning');
  }

  // Méthode utilitaire pour sauvegarder le fichier Excel
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(data);
    link.download = `${fileName}_export_${new Date().getTime()}.xlsx`;
    link.click();
  }
}

// Constante pour le type de fichier Excel
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
