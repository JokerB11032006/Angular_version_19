import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav.component';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';

interface NotificationRow {
  sNo: number;
  entityName1: string;
  entityName2: string;
  turnoverOfEntity1: number;
  category: string;
  totalApproveOfLimit: number;
  limitUtilised: number;
  percentageOfLimitUtilised: number;
  action: string;
}

@Component({
  selector: 'app-monitoring-imp-notifications',
  templateUrl: './monitoring-imp-notifications.component.html',
  styleUrls: ['./monitoring-imp-notifications.component.scss'],
  standalone: true,
  imports: [CommonModule, NavComponent, HeaderComponent, FormsModule]
})
export class MonitoringImpNotificationsComponent implements OnInit {
  selectedFinancialYear: string = 'FY 2023-24';
  selectedPeriodQuarter: string = 'All Quarters';
  searchText: string = '';
  
  financialYears: string[] = ['FY 2023-24', 'FY 2022-23', 'FY 2021-22'];
  periodQuarters: string[] = ['All Quarters', 'Q1', 'Q2', 'Q3', 'Q4'];
  
  notificationRows: NotificationRow[] = [
    {
      sNo: 1,
      entityName1: 'Strides Pharma Science Limited',
      entityName2: 'Strides Pharma Global',
      turnoverOfEntity1: 25000000,
      category: 'Sale of materials',
      totalApproveOfLimit: 30000000,
      limitUtilised: 20000000,
      percentageOfLimitUtilised: 66.67,
      action: 'View Details'
    },
    {
      sNo: 2,
      entityName1: 'Strides Pharma Asia',
      entityName2: 'Strides Global Consumer Healthcare',
      turnoverOfEntity1: 15000000,
      category: 'Purchase of goods',
      totalApproveOfLimit: 20000000,
      limitUtilised: 18000000,
      percentageOfLimitUtilised: 90,
      action: 'View Details'
    },
    {
      sNo: 3,
      entityName1: 'Stelis Biopharma Limited',
      entityName2: 'Strides Pharma Inc',
      turnoverOfEntity1: 35000000,
      category: 'Service income',
      totalApproveOfLimit: 40000000,
      limitUtilised: 25000000,
      percentageOfLimitUtilised: 62.5,
      action: 'View Details'
    },
    {
      sNo: 4,
      entityName1: 'Strides Pharma UK Ltd',
      entityName2: 'Strides Arcolab International',
      turnoverOfEntity1: 18000000,
      category: 'Sale of services',
      totalApproveOfLimit: 25000000,
      limitUtilised: 15000000,
      percentageOfLimitUtilised: 60,
      action: 'View Details'
    },
    {
      sNo: 5,
      entityName1: 'Vivimed Life Sciences',
      entityName2: 'Strides Pharma Canada',
      turnoverOfEntity1: 22000000,
      category: 'Purchase of materials',
      totalApproveOfLimit: 28000000,
      limitUtilised: 24000000,
      percentageOfLimitUtilised: 85.71,
      action: 'View Details'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSearch(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value;
    this.searchText = searchValue;
    // Implement search functionality
  }

  onExport(): void {
    // Implement export functionality
  }

  onDownload(): void {
    // Implement download functionality
  }

  onCancel(): void {
    // Implement cancel functionality
  }

  onSaveAndUpdate(): void {
    // Implement save and update functionality
  }
} 