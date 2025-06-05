import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav.component';
import { HeaderComponent } from '../header/header.component';
import { TableComponent } from '../table/table.component';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface AgreementSummary {
  'S.NO': number;
  'ENTITY 1': string;
  'CATEGORY': string;
  'ENTITY 2': string;
  'CATEGORY 2': string;
  'START DATE': string;
  'END DATE': string;
}

@Component({
  selector: 'app-rpt-master',
  templateUrl: './RPT_master.component.html',
  styleUrls: ['./RPT_master.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NavComponent,
    HeaderComponent,
    TableComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RPTMasterComponent implements OnInit {
  isUpdateMode: boolean = false;
  showForm: boolean = false;
  showAgreementSummary: boolean = false;
  currentStep = 1;
  totalSteps = 4;
  rptForm: FormGroup;
  searchQuery: string = '';
  selectedFinancialYear: string = 'FY 2023-24';
  selectedQuarter: string = 'All Quarters';
  currentView: string = 'default'; // 'default' | 'agreement-summary'

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

  // Dropdown options for form
  entityTypes = ['Company', 'Individual', 'Partnership', 'LLP', 'Trust'];
  categories = [
    'Guarantee Commission Income (001)',
    'Sales of Materials/Services (006)',
    'Reimbursement of Expenses (003)',
    'Support Service Expenses (007)',
    'Lease Payments (009)'
  ];
  countries = ['India', 'USA', 'UK', 'Switzerland', 'Malaysia'];
  currencies = ['INR', 'USD', 'EUR', 'CHF', 'MYR'];

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    // Listen to route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Check if we're on the agreement summary route
      const segments = this.router.url.split('/');
      const lastSegment = segments[segments.length - 1];
      this.currentView = lastSegment === 'agreement-summary' ? 'agreement-summary' : 'default';
      this.showAgreementSummary = this.currentView === 'agreement-summary';
    });

    this.rptForm = this.fb.group({
      // Basic Details
      nameOfEntity: ['', Validators.required],
      contactNumber: ['', Validators.required],
      nameOfRelatedParty: ['', Validators.required],
      natureOfBusiness: ['', Validators.required],
      address: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      hasPreviousName: [false],
      previousName: [''],
      entityType: ['', Validators.required],

      // Business Details
      country: ['', Validators.required],
      gst: [''],
      functionalCurrency: ['', Validators.required],
      cin: ['', Validators.required],
      otherRegistrationNumber: [''],

      // Relationship and Compliance
      relationshipCreationDate: ['', Validators.required],
      relationshipCessationDate: [''],
      category: ['', Validators.required],
      financialInformationCollected: [''],
      relatedPartyCompaniesAct: [false],
      relatedPartyLODR: [false],
      relatedPartyIndAS: [false],
      shareholdingPercentage: [''],
      hasRelationshipChanged: [false],
      newRelationship: [''],
      dateOfRelationshipChange: [''],

      // Documents
      incorporationDocuments: [null],
      otherDocuments: [null]
    });
  }

  ngOnInit(): void {
    // Check initial route
    const segments = this.router.url.split('/');
    const lastSegment = segments[segments.length - 1];
    this.currentView = lastSegment === 'agreement-summary' ? 'agreement-summary' : 'default';
    this.showAgreementSummary = this.currentView === 'agreement-summary';
  }

  toggleAgreementSummary(): void {
    this.showAgreementSummary = !this.showAgreementSummary;
    this.showForm = false;
  }

  setStep(step: number): void {
    this.currentStep = step;
  }

  nextStep(): void {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  submitForm(): void {
    if (this.rptForm.valid) {
      console.log(this.rptForm.value);
    }
  }

  onFileSelected(event: any, type: string): void {
    const file = event.target.files[0];
    if (file) {
      this.rptForm.patchValue({
        [type]: file
      });
    }
  }

  // Filter agreement summary data
  getFilteredData(): AgreementSummary[] {
    return this.agreementSummaryData.filter(item =>
      Object.values(item).some(value =>
        value.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    );
  }

  toggleForm(show: boolean) {
    this.showForm = show;
    if (show) {
      // Reset to first step when opening form
      this.currentStep = 1;
      // Reset form values
      this.rptForm.reset();
    }
  }

  getCurrentStepTitle(): string {
    switch (this.currentStep) {
      case 1:
        return 'Basic Details';
      case 2:
        return 'Business Details';
      case 3:
        return 'Relationship and Compliance';
      case 4:
        return 'Others';
      default:
        return '';
    }
  }
} 