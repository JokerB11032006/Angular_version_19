import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav.component';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';

interface AgreementSummary {
  'S.NO': number;
  'ENTITY 1': string;
  'CATEGORY': string;
  'ENTITY 2': string;
  'CATEGORY 2': string;
  'START DATE': string;
  'END DATE': string;
}

interface AgreementUpload {
  entity1: string;
  entity2: string;
  category: string;
  category2: string;
  startDate: string;
  endDate: string;
  period: string;
}

@Component({
  selector: 'app-agreement-summary',
  templateUrl: './agreement-summary.component.html',
  styleUrls: ['./agreement-summary.component.scss'],
  standalone: true,
  imports: [CommonModule, NavComponent, HeaderComponent, FormsModule]
})
export class AgreementSummaryComponent implements OnInit {
  searchQuery: string = '';
  selectedFinancialYear: string = 'FY 2023-24';
  selectedQuarter: string = 'All Quarters';
  showUploadForm: boolean = false;

  // Form data
  agreementForm: AgreementUpload = {
    entity1: '',
    entity2: '',
    category: '',
    category2: '',
    startDate: '',
    endDate: '',
    period: ''
  };

  // Financial year and quarter options
  financialYears = ['FY 2023-24', 'FY 2022-23', 'FY 2021-22'];
  quarters = ['All Quarters', 'Q1 (Apr-Jun)', 'Q2 (Jul-Sep)', 'Q3 (Oct-Dec)', 'Q4 (Jan-Mar)'];

  // Agreement Summary Data
  agreementSummaryData: AgreementSummary[] = [
    {
      'S.NO': 1,
      'ENTITY 1': 'Altima Innovations, Inc.',
      'CATEGORY': 'Sale of IP',
      'ENTITY 2': 'Pharmaceuticals',
      'CATEGORY 2': '-',
      'START DATE': '',
      'END DATE': ''
    },
    {
      'S.NO': 2,
      'ENTITY 1': 'Strides Pharma International AG',
      'CATEGORY': 'Interest Income',
      'ENTITY 2': 'Pharmaceuticals Export',
      'CATEGORY 2': '-',
      'START DATE': '',
      'END DATE': ''
    },
    {
      'S.NO': 3,
      'ENTITY 1': 'Stelis Biopharma (Malaysia) Sdn. Bhd.',
      'CATEGORY': 'Purchase of Asset',
      'ENTITY 2': 'Biopharmaceuticals',
      'CATEGORY 2': '-',
      'START DATE': '',
      'END DATE': ''
    },
    {
      'S.NO': 4,
      'ENTITY 1': 'SVADS Holdings SA',
      'CATEGORY': 'Interest Income',
      'ENTITY 2': 'Healthcare Investments',
      'CATEGORY 2': '-',
      'START DATE': '',
      'END DATE': ''
    },
    {
      'S.NO': 5,
      'ENTITY 1': 'UCL Brands Limited',
      'CATEGORY': 'Interest Income',
      'ENTITY 2': 'Consumer Healthcare Products',
      'CATEGORY 2': '-',
      'START DATE': '',
      'END DATE': ''
    }
  ];

  constructor() { }

  ngOnInit(): void { }

  // Filter agreement summary data
  getFilteredData(): AgreementSummary[] {
    return this.agreementSummaryData.filter(item =>
      Object.values(item).some(value =>
        value.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    );
  }

  onUploadAgreement(): void {
    this.showUploadForm = true;
  }

  onCancel(): void {
    this.showUploadForm = false;
    this.resetForm();
  }

  onSave(): void {
    console.log('Form data:', this.agreementForm);
    // Implement save logic here
    this.showUploadForm = false;
    this.resetForm();
  }

  onAddMore(): void {
    // Since this is now Cancel button
    this.showUploadForm = false;
    this.resetForm();
  }

  private resetForm(): void {
    this.agreementForm = {
      entity1: '',
      entity2: '',
      category: '',
      category2: '',
      startDate: '',
      endDate: '',
      period: ''
    };
  }
} 