import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TableData {
  'S.no': number;
  'NAME': string;
  'ENTITY TYPE': string;
  'NATURE OF BUSINESS': string;
  'PREVIOUS NAME': string;
  'CONTACT NUMBER': string;
  'E-MAIL ID': string;
  'ADDRESS': string;
  'PAN': string;
  'GST': string;
  'CIN': string;
  'ANY OTHER REGISTRATION NUMBER': string;
  'FUNCTIONAL CURRENCY': string;
  'COUNTRY': string;
  'RELATIONSHIP CREATION DATE': string;
  'RELATIONSHIP CESSATION DATE': string;
  'CATEGORY': string;
  'NATURE OF RELATIONSHIP - INDAS': string;
  'RELATED PARTY AS PER COMPANIES ACT': string;
  'RELATED PARTY AS PER LODR': string;
  'RELATED PARTY AS PER INDAS': string;
  'SHAREHOLDING %': string;
  'WHETHER CHANGE IN RELATIONSHIP': string;
  'IF YES, DATE OF CHANGE IN RELATIONSHIP': string;
  'NEW RELATIONSHIP': string;
  'ATTACHMENTS': string;
  'FINANCIAL INFORMATION VALIDATION TEST': string;
  'VALIDATION TEST': boolean;
  [key: string]: string | number | boolean;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class TableComponent implements OnInit {
  @Input() isUpdateMode: boolean = false; // To determine if we're in Update RPT mode
  isEditMode = false;

  
  // Filter options
  entities = [
    'All Entities',
    'Altima Innovations, Inc.',
    'Strides Pharma International AG',
    'Stelis Biopharma (Malaysia) Sdn. Bhd.',
    'SVADS Holdings SA',
    'UCL Brands Limited'
  ];

  financialYears = [
    'FY 2023-24',
    'FY 2022-23',
    'FY 2021-22'
  ];

  quarters = [
    'All Quarters',
    'Q1 (Apr-Jun)',
    'Q2 (Jul-Sep)',
    'Q3 (Oct-Dec)',
    'Q4 (Jan-Mar)'
  ];

  // Selected filter values
  selectedEntity = 'All Entities';
  selectedFinancialYear = 'FY 2023-24';
  selectedQuarter = 'All Quarters';
  searchQuery = '';

  // Edit mode state
  // isEditMode = false;
  editingCell: { rowIndex: number; column: string } | null = null;
  editValue: string = '';

  // Table data
  tableData: TableData[] = [
    {
      'S.no': 1,
      'NAME': 'Altima Innovations, Inc.',
      'ENTITY TYPE': 'Company',
      'NATURE OF BUSINESS': 'Pharmaceuticals',
      'PREVIOUS NAME': '-',
      'CONTACT NUMBER': '+1-555-0101',
      'E-MAIL ID': 'altima@domain.com',
      'ADDRESS': '101 Innovation Dr, CA, USA',
      'PAN': 'AAAAA0001A',
      'GST': 'NA',
      'CIN': 'U12345DL2020ABC1',
      'ANY OTHER REGISTRATION NUMBER': '-',
      'FUNCTIONAL CURRENCY': 'USD',
      'COUNTRY': 'USA',
      'RELATIONSHIP CREATION DATE': '2021-04-10',
      'RELATIONSHIP CESSATION DATE': '-',
      'CATEGORY': 'Guarantee Commission Income (001)',
      'NATURE OF RELATIONSHIP - INDAS': 'Subsidiary',
      'RELATED PARTY AS PER COMPANIES ACT': 'Yes',
      'RELATED PARTY AS PER LODR': 'Yes',
      'RELATED PARTY AS PER INDAS': 'Yes',
      'SHAREHOLDING %': '100%',
      'WHETHER CHANGE IN RELATIONSHIP': 'No',
      'IF YES, DATE OF CHANGE IN RELATIONSHIP': '-',
      'NEW RELATIONSHIP': '-',
      'ATTACHMENTS': 'Attached',
      'FINANCIAL INFORMATION VALIDATION TEST': 'Yes',
      'VALIDATION TEST': true
    },
    {
      'S.no': 2,
      'NAME': 'Strides Pharma International AG',
      'ENTITY TYPE': 'Company',
      'NATURE OF BUSINESS': 'Pharmaceuticals Export',
      'PREVIOUS NAME': 'Fairmed Healthcare AG',
      'CONTACT NUMBER': '+49-555-0102',
      'E-MAIL ID': 'stridesag@domain.de',
      'ADDRESS': 'Baselstrasse 99, Basel, CH',
      'PAN': 'AAAAA0002B',
      'GST': 'CHE123456789',
      'CIN': 'U12345DL2021AGC2',
      'ANY OTHER REGISTRATION NUMBER': '-',
      'FUNCTIONAL CURRENCY': 'CHF',
      'COUNTRY': 'Switzerland',
      'RELATIONSHIP CREATION DATE': '2020-12-15',
      'RELATIONSHIP CESSATION DATE': '-',
      'CATEGORY': 'Sales of Materials/Services (006)',
      'NATURE OF RELATIONSHIP - INDAS': 'Joint Venture',
      'RELATED PARTY AS PER COMPANIES ACT': 'Yes',
      'RELATED PARTY AS PER LODR': 'Yes',
      'RELATED PARTY AS PER INDAS': 'Yes',
      'SHAREHOLDING %': '40%',
      'WHETHER CHANGE IN RELATIONSHIP': 'No',
      'IF YES, DATE OF CHANGE IN RELATIONSHIP': '-',
      'NEW RELATIONSHIP': '-',
      'ATTACHMENTS': 'Attached',
      'FINANCIAL INFORMATION VALIDATION TEST': 'Yes',
      'VALIDATION TEST': true
    },
    {
      'S.no': 3,
      'NAME': 'Stelis Biopharma (Malaysia) Sdn. Bhd.',
      'ENTITY TYPE': 'Company',
      'NATURE OF BUSINESS': 'Biopharmaceuticals',
      'PREVIOUS NAME': '-',
      'CONTACT NUMBER': '+60-3-5550103',
      'E-MAIL ID': 'stelis.my@domain.my',
      'ADDRESS': 'Kuala Lumpur, Malaysia',
      'PAN': 'AAAAA0003C',
      'GST': 'MY123456789',
      'CIN': 'U12345DL2021STM3',
      'ANY OTHER REGISTRATION NUMBER': '-',
      'FUNCTIONAL CURRENCY': 'MYR',
      'COUNTRY': 'Malaysia',
      'RELATIONSHIP CREATION DATE': '2022-01-25',
      'RELATIONSHIP CESSATION DATE': '-',
      'CATEGORY': 'Reimbursement of Expenses (003)',
      'NATURE OF RELATIONSHIP - INDAS': 'Associate',
      'RELATED PARTY AS PER COMPANIES ACT': 'Yes',
      'RELATED PARTY AS PER LODR': 'Yes',
      'RELATED PARTY AS PER INDAS': 'Yes',
      'SHAREHOLDING %': '30%',
      'WHETHER CHANGE IN RELATIONSHIP': 'Yes',
      'IF YES, DATE OF CHANGE IN RELATIONSHIP': '2023-03-10',
      'NEW RELATIONSHIP': 'Strategic Partner',
      'ATTACHMENTS': 'Attached',
      'FINANCIAL INFORMATION VALIDATION TEST': 'Yes',
      'VALIDATION TEST': true
    },
    {
      'S.no': 4,
      'NAME': 'SVADS Holdings SA',
      'ENTITY TYPE': 'Company',
      'NATURE OF BUSINESS': 'Healthcare Investments',
      'PREVIOUS NAME': '-',
      'CONTACT NUMBER': '+41-555-0104',
      'E-MAIL ID': 'svads@domain.ch',
      'ADDRESS': 'Geneva, Switzerland',
      'PAN': 'AAAAA0004D',
      'GST': 'NA',
      'CIN': 'U12345DL2022SVD4',
      'ANY OTHER REGISTRATION NUMBER': '-',
      'FUNCTIONAL CURRENCY': 'CHF',
      'COUNTRY': 'Switzerland',
      'RELATIONSHIP CREATION DATE': '2019-07-12',
      'RELATIONSHIP CESSATION DATE': '-',
      'CATEGORY': 'Support Service Expenses (007)',
      'NATURE OF RELATIONSHIP - INDAS': 'Equity Investment',
      'RELATED PARTY AS PER COMPANIES ACT': 'No',
      'RELATED PARTY AS PER LODR': 'No',
      'RELATED PARTY AS PER INDAS': 'Yes',
      'SHAREHOLDING %': '20%',
      'WHETHER CHANGE IN RELATIONSHIP': 'No',
      'IF YES, DATE OF CHANGE IN RELATIONSHIP': '-',
      'NEW RELATIONSHIP': '-',
      'ATTACHMENTS': 'Attached',
      'FINANCIAL INFORMATION VALIDATION TEST': 'Yes',
      'VALIDATION TEST': true
    },
    {
      'S.no': 5,
      'NAME': 'UCL Brands Limited',
      'ENTITY TYPE': 'Company',
      'NATURE OF BUSINESS': 'Consumer Healthcare Products',
      'PREVIOUS NAME': '-',
      'CONTACT NUMBER': '+91-22-5550105',
      'E-MAIL ID': 'uclbrands@domain.in',
      'ADDRESS': 'Mumbai, Maharashtra, India',
      'PAN': 'AAAAA0005E',
      'GST': '27AAAAA0005E1Z1',
      'CIN': 'U12345MH2023UCL5',
      'ANY OTHER REGISTRATION NUMBER': '-',
      'FUNCTIONAL CURRENCY': 'INR',
      'COUNTRY': 'India',
      'RELATIONSHIP CREATION DATE': '2023-05-08',
      'RELATIONSHIP CESSATION DATE': '-',
      'CATEGORY': 'Lease Payments (009)',
      'NATURE OF RELATIONSHIP - INDAS': 'Lease Agreement',
      'RELATED PARTY AS PER COMPANIES ACT': 'Yes',
      'RELATED PARTY AS PER LODR': 'No',
      'RELATED PARTY AS PER INDAS': 'Yes',
      'SHAREHOLDING %': '10%',
      'WHETHER CHANGE IN RELATIONSHIP': 'No',
      'IF YES, DATE OF CHANGE IN RELATIONSHIP': '-',
      'NEW RELATIONSHIP': '-',
      'ATTACHMENTS': 'Attached',
      'FINANCIAL INFORMATION VALIDATION TEST': 'Yes',
      'VALIDATION TEST': false
    }
  ];

  constructor() { }

  ngOnInit(): void { }

  // Action handlers
  onExport(): void {
    console.log('Export clicked');
  }

  onDownload(): void {
    console.log('Download clicked');
  }

  // toggleEditMode(): void {
  //   this.isEditMode = !this.isEditMode;
  //   if (!this.isEditMode) {
  //     this.editingCell = null;
  //   }
  // }

  onDoubleClick(rowIndex: number, column: string, value: any): void {
    if (this.isEditMode && column !== 'S.no' && column !== 'VALIDATION TEST') {
      this.editingCell = { rowIndex, column };
      this.editValue = value;
    }
  }

  onKeyDown(event: KeyboardEvent, rowIndex: number, column: string): void {
    if (event.key === 'Enter') {
      this.saveEdit(rowIndex, column);
    } else if (event.key === 'Escape') {
      this.cancelEdit();
    }
  }

  saveEdit(rowIndex: number, column: string): void {
    if (this.editingCell && this.editingCell.rowIndex === rowIndex && this.editingCell.column === column) {
      const row = this.tableData[rowIndex];
      if (column in row) {
        (row as any)[column] = this.editValue;
      }
      this.editingCell = null;
    }
  }

  cancelEdit(): void {
    this.editingCell = null;
  }

  isEditing(rowIndex: number, column: string): boolean {
    return this.editingCell?.rowIndex === rowIndex && this.editingCell?.column === column;
  }

  // onSaveChanges(): void {
  //   // Implement save changes functionality
  //   console.log('Saving changes...');
  //   this.isEditMode = false;
  // }

  // onCancelEdit(): void {
  //   this.isEditMode = false;
  //   this.editingCell = null;
  // }

  toggleEditMode() {
    this.isEditMode = true;
  }

  onCancelEdit() {
    this.isEditMode = false;
    // Optionally reset editing states
  }

  onSaveChanges() {
    this.isEditMode = false;
    // Save logic here
  }
} 