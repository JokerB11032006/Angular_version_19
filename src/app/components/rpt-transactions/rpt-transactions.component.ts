import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav.component';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';

interface BaseTransaction {
  entityName1: string;
  groupings: string;
}

interface BalanceSheetTransaction extends BaseTransaction {
  entity2: string;
  postingDate: string;
  documentCurrency: string;
  amountInLocalCurrency: number;
}

interface StatementTransaction extends BaseTransaction {
  entity2: string;
  documentCurrency: string;
  openingBalance: number;
  amountInDocumentCurrency: number;
}

interface IntercompanyTransaction extends BaseTransaction {
  amountInDocumentCurrency1: number;
  entityName2: string;
  amountInDocumentCurrency2: number;
  difference: number;
  validationTest: string;
}

type TransactionType = 'balance-sheet' | 'statement-of-operations' | 'intercompany-transactions';

@Component({
  selector: 'app-rpt-transactions',
  templateUrl: './rpt-transactions.component.html',
  styleUrls: ['./rpt-transactions.component.scss'],
  standalone: true,
  imports: [CommonModule, NavComponent, HeaderComponent, FormsModule]
})
export class RPTTransactionsComponent implements OnInit {
  searchQuery: string = '';
  activeTab: TransactionType = 'balance-sheet';
  
  balanceSheetTransactions: BalanceSheetTransaction[] = [
    {
      entityName1: 'Strides Pharma Science Limited',
      groupings: 'Purchase',
      entity2: 'Stelis Biopharma Limited',
      postingDate: '2024-01-15',
      documentCurrency: 'INR',
      amountInLocalCurrency: 150000.00
    },
    {
      entityName1: 'Strides Pharma International AG',
      groupings: 'Sales',
      entity2: 'Altima Innovations Inc',
      postingDate: '2024-01-20',
      documentCurrency: 'USD',
      amountInLocalCurrency: 275000.00
    },
    {
      entityName1: 'Stelis Biopharma Limited',
      groupings: 'Service',
      entity2: 'SVADS Holdings SA',
      postingDate: '2024-01-25',
      documentCurrency: 'EUR',
      amountInLocalCurrency: 95000.00
    },
    {
      entityName1: 'UCL Brands Limited',
      groupings: 'Purchase',
      entity2: 'Strides Pharma Science Limited',
      postingDate: '2024-01-30',
      documentCurrency: 'GBP',
      amountInLocalCurrency: 180000.00
    },
    {
      entityName1: 'Altima Innovations Inc',
      groupings: 'Service',
      entity2: 'Strides Pharma International AG',
      postingDate: '2024-02-01',
      documentCurrency: 'USD',
      amountInLocalCurrency: 125000.00
    }
  ];

  statementTransactions: StatementTransaction[] = [
    {
      entityName1: 'Strides Pharma Science Limited',
      groupings: 'Sales',
      entity2: 'Stelis Biopharma Limited',
      documentCurrency: 'INR',
      openingBalance: 100000.00,
      amountInDocumentCurrency: 250000.00
    },
    {
      entityName1: 'Altima Innovations Inc',
      groupings: 'Purchase',
      entity2: 'SVADS Holdings SA',
      documentCurrency: 'USD',
      openingBalance: 75000.00,
      amountInDocumentCurrency: 185000.00
    },
    {
      entityName1: 'Strides Pharma International AG',
      groupings: 'Service',
      entity2: 'UCL Brands Limited',
      documentCurrency: 'EUR',
      openingBalance: 150000.00,
      amountInDocumentCurrency: 320000.00
    },
    {
      entityName1: 'Stelis Biopharma Limited',
      groupings: 'Sales',
      entity2: 'Strides Pharma Science Limited',
      documentCurrency: 'INR',
      openingBalance: 200000.00,
      amountInDocumentCurrency: 450000.00
    },
    {
      entityName1: 'SVADS Holdings SA',
      groupings: 'Purchase',
      entity2: 'Altima Innovations Inc',
      documentCurrency: 'USD',
      openingBalance: 80000.00,
      amountInDocumentCurrency: 195000.00
    }
  ];

  intercompanyTransactions: IntercompanyTransaction[] = [
    {
      entityName1: 'Strides Pharma Science Limited',
      groupings: 'Purchase',
      amountInDocumentCurrency1: 150000.00,
      entityName2: 'Stelis Biopharma Limited',
      amountInDocumentCurrency2: 150000.00,
      difference: 0,
      validationTest: 'Passed'
    },
    {
      entityName1: 'Altima Innovations Inc',
      groupings: 'Sales',
      amountInDocumentCurrency1: 275000.00,
      entityName2: 'SVADS Holdings SA',
      amountInDocumentCurrency2: 274800.00,
      difference: 200,
      validationTest: 'Failed'
    },
    {
      entityName1: 'Strides Pharma International AG',
      groupings: 'Service',
      amountInDocumentCurrency1: 180000.00,
      entityName2: 'UCL Brands Limited',
      amountInDocumentCurrency2: 180000.00,
      difference: 0,
      validationTest: 'Passed'
    },
    {
      entityName1: 'Stelis Biopharma Limited',
      groupings: 'Purchase',
      amountInDocumentCurrency1: 225000.00,
      entityName2: 'Strides Pharma Science Limited',
      amountInDocumentCurrency2: 225000.00,
      difference: 0,
      validationTest: 'Passed'
    },
    {
      entityName1: 'SVADS Holdings SA',
      groupings: 'Sales',
      amountInDocumentCurrency1: 195000.00,
      entityName2: 'Altima Innovations Inc',
      amountInDocumentCurrency2: 194800.00,
      difference: 200,
      validationTest: 'Failed'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  setActiveTab(tab: TransactionType): void {
    this.activeTab = tab;
  }

  downloadCurrentView(): void {
    console.log('Downloading current view...');
    // Implement download logic here
  }

  searchTransactions(query: string): void {
    this.searchQuery = query;
    // Filter transactions based on search query and active tab
    console.log('Searching for:', query, 'in tab:', this.activeTab);
  }

  get currentTransactions(): any[] {
    switch (this.activeTab) {
      case 'balance-sheet':
        return this.balanceSheetTransactions;
      case 'statement-of-operations':
        return this.statementTransactions;
      case 'intercompany-transactions':
        return this.intercompanyTransactions;
      default:
        return [];
    }
  }
} 