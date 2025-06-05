import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav.component';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-audit-committee-approval',
  templateUrl: './audit-committee-approval.component.html',
  styleUrls: ['./audit-committee-approval.component.scss'],
  standalone: true,
  imports: [CommonModule, NavComponent, HeaderComponent, FormsModule]
})
export class AuditCommitteeApprovalComponent implements OnInit {
  selectedFinancialYear: string = 'FY 2023-24';
  selectedQuarter: string = 'All Quarters';
  selectedEntities: { [key: number]: string } = {
    1: '',
    2: '',
    3: ''
  };

  // Financial year and quarter options
  financialYears = ['FY 2023-24', 'FY 2022-23', 'FY 2021-22'];
  quarters = ['All Quarters', 'Q1 (Apr-Jun)', 'Q2 (Jul-Sep)', 'Q3 (Oct-Dec)', 'Q4 (Jan-Mar)'];
  
  // Entity options
  entities = [
    'Altima Innovations, Inc.',
    'Strides Pharma International AG',
    'Stelis Biopharma (Malaysia) Sdn. Bhd.',
    'SVADS Holdings SA',
    'UCL Brands Limited'
  ];

  constructor() { }

  ngOnInit(): void { }

  onDownloadTemplate(index: number): void {
    if (this.selectedEntities[index]) {
      console.log(`Downloading audit committee template for ${this.selectedEntities[index]}...`);
      // Implement download logic here
    }
  }

  onEntitySelect(entity: string, index: number): void {
    this.selectedEntities[index] = entity;
  }

  isDownloadDisabled(index: number): boolean {
    return !this.selectedEntities[index];
  }
} 