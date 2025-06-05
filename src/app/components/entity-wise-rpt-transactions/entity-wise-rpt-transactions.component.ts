import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav.component';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';

interface EntityWiseTransaction {
  entityName1: string;
  groupings: string;
  entity2: string;
  postingDate: string;
  documentCurrency: string;
  amountInLocalCurrency: number;
  reportingCurrency: string;
  exchangeRate: number;
  amountOfExchange: number;
  amountInReporting: number;
  natureOfTransaction: string;
}

@Component({
  selector: 'app-entity-wise-rpt-transactions',
  templateUrl: './entity-wise-rpt-transactions.component.html',
  styleUrls: ['./entity-wise-rpt-transactions.component.scss'],
  standalone: true,
  imports: [CommonModule, NavComponent, HeaderComponent, FormsModule]
})
export class EntityWiseRPTTransactionsComponent implements OnInit {
  searchQuery: string = '';
  
  transactions: EntityWiseTransaction[] = [
    {
      entityName1: 'Strides Pharma Science Limited',
      groupings: 'Purchase',
      entity2: 'Stelis Biopharma Limited',
      postingDate: '2024-01-15',
      documentCurrency: 'INR',
      amountInLocalCurrency: 150000.00,
      reportingCurrency: 'USD',
      exchangeRate: 82.50,
      amountOfExchange: 1818.18,
      amountInReporting: 1818.18,
      natureOfTransaction: 'Regular'
    },
    {
      entityName1: 'Strides Pharma International AG',
      groupings: 'Sales',
      entity2: 'Altima Innovations Inc',
      postingDate: '2024-01-20',
      documentCurrency: 'EUR',
      amountInLocalCurrency: 275000.00,
      reportingCurrency: 'USD',
      exchangeRate: 1.08,
      amountOfExchange: 254629.63,
      amountInReporting: 254629.63,
      natureOfTransaction: 'Regular'
    },
    {
      entityName1: 'Stelis Biopharma Limited',
      groupings: 'Service',
      entity2: 'SVADS Holdings SA',
      postingDate: '2024-01-25',
      documentCurrency: 'GBP',
      amountInLocalCurrency: 95000.00,
      reportingCurrency: 'USD',
      exchangeRate: 1.27,
      amountOfExchange: 74803.15,
      amountInReporting: 74803.15,
      natureOfTransaction: 'One-time'
    },
    {
      entityName1: 'UCL Brands Limited',
      groupings: 'Purchase',
      entity2: 'Strides Pharma Science Limited',
      postingDate: '2024-01-30',
      documentCurrency: 'USD',
      amountInLocalCurrency: 180000.00,
      reportingCurrency: 'USD',
      exchangeRate: 1.00,
      amountOfExchange: 180000.00,
      amountInReporting: 180000.00,
      natureOfTransaction: 'Regular'
    },
    {
      entityName1: 'Altima Innovations Inc',
      groupings: 'Service',
      entity2: 'Strides Pharma International AG',
      postingDate: '2024-02-01',
      documentCurrency: 'CHF',
      amountInLocalCurrency: 125000.00,
      reportingCurrency: 'USD',
      exchangeRate: 1.16,
      amountOfExchange: 107758.62,
      amountInReporting: 107758.62,
      natureOfTransaction: 'One-time'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  downloadCurrentView(): void {
    console.log('Downloading current view...');
    // Implement download logic here
  }

  searchTransactions(query: string): void {
    this.searchQuery = query;
    // Implement search logic here
    console.log('Searching for:', query);
  }
} 