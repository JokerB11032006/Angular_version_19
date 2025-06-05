import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav.component';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';

interface ApprovedLimit {
  sNo: number;
  entityName1: string;
  entityName2: string;
  category: string;
  currency: string;
  exchangeRate: number;
  amountOfLimit: number;
  additionalRemarks: string;
  validationTest: string;
}

@Component({
  selector: 'app-monitoring-approved-limits',
  templateUrl: './monitoring-approved-limits.component.html',
  styleUrls: ['./monitoring-approved-limits.component.scss'],
  standalone: true,
  imports: [CommonModule, NavComponent, HeaderComponent, FormsModule]
})
export class MonitoringApprovedLimitsComponent implements OnInit {
  selectedFinancialYear: string = 'FY 2023-24';
  selectedQuarter: string = 'All Quarters';
  searchQuery: string = '';
  
  approvedLimits: ApprovedLimit[] = [
    {
      sNo: 1,
      entityName1: 'Strides Pharma Science Limited',
      entityName2: 'Strides Pharma Global Pte Limited',
      category: 'Sales',
      currency: 'USD',
      exchangeRate: 82.50,
      amountOfLimit: 500000,
      additionalRemarks: 'Regular export transaction',
      validationTest: 'Passed'
    },
    {
      sNo: 2,
      entityName1: 'Strides Pharma Global Pte Limited',
      entityName2: 'Strides Pharma Inc',
      category: 'Purchase',
      currency: 'EUR',
      exchangeRate: 91.75,
      amountOfLimit: 750000,
      additionalRemarks: 'Quarterly bulk order',
      validationTest: 'Passed'
    },
    {
      sNo: 3,
      entityName1: 'Strides Pharma Science Limited',
      entityName2: 'Strides Pharma Canada Inc',
      category: 'Service',
      currency: 'CAD',
      exchangeRate: 62.25,
      amountOfLimit: 250000,
      additionalRemarks: 'Technical service fees',
      validationTest: 'Under Review'
    },
    {
      sNo: 4,
      entityName1: 'Strides Pharma Inc',
      entityName2: 'Strides Pharma UK Ltd',
      category: 'Royalty',
      currency: 'GBP',
      exchangeRate: 105.30,
      amountOfLimit: 180000,
      additionalRemarks: 'Annual royalty payment',
      validationTest: 'Passed'
    },
    {
      sNo: 5,
      entityName1: 'Strides Pharma UK Ltd',
      entityName2: 'Strides Pharma Science Limited',
      category: 'Management Fee',
      currency: 'INR',
      exchangeRate: 1.00,
      amountOfLimit: 1500000,
      additionalRemarks: 'Management services for Q1',
      validationTest: 'Pending'
    }
  ];

  financialYears: string[] = ['FY 2023-24', 'FY 2024-25', 'FY 2025-26'];
  quarters: string[] = ['All Quarters', 'Q1', 'Q2', 'Q3', 'Q4'];

  constructor() { }

  ngOnInit(): void {
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
  }

  onExport(): void {
    console.log('Exporting data...');
    // Implement export functionality
  }

  onDownload(): void {
    console.log('Downloading data...');
    // Implement download functionality
  }

  onCancel(): void {
    // Reset form or navigate back
    console.log('Cancelling...');
  }

  onSaveAndUpdate(): void {
    console.log('Saving and updating...');
    // Implement save functionality
  }
} 