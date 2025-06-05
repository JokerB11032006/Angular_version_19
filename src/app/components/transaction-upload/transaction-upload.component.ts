import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav.component';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';

interface UploadOption {
  id: string;
  name: string;
}

@Component({
  selector: 'app-transaction-upload',
  templateUrl: './transaction-upload.component.html',
  styleUrls: ['./transaction-upload.component.scss'],
  standalone: true,
  imports: [CommonModule, NavComponent, HeaderComponent, FormsModule]
})
export class TransactionUploadComponent implements OnInit {
  selectedUploadType: string = '';
  isDragging: boolean = false;
  selectedFile: File | null = null;
  currentFinancialYear: string = 'FY 2024-2025';
  currentQuarter: string = 'Q1';

  uploadOptions: UploadOption[] = [
    { id: 'document-list', name: 'Upload document list' },
    { id: 'entity-code', name: 'Entity Code List' },
    { id: 'name-check', name: 'Name check List' },
    { id: 'gl-code', name: 'GL Code List' },
    { id: 'document-type', name: 'Document type list' },
    { id: 'grouping', name: 'Grouping List' },
    { id: 'ic-rp', name: 'IC and RP List' },
    { id: 'gst', name: 'GST List' },
    { id: 'tds', name: 'TDS List' },
    { id: 'tcs', name: 'TCS List' },
    { id: 'tb-dump', name: 'TB dump' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFileSelection(files[0]);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFileSelection(input.files[0]);
    }
  }

  handleFileSelection(file: File): void {
    this.selectedFile = file;
    console.log('Selected file:', file.name);
  }

  onUploadTypeChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedUploadType = select.value;
  }

  uploadFile(): void {
    if (this.selectedFile && this.selectedUploadType) {
      console.log('Uploading file:', this.selectedFile.name);
      console.log('Upload type:', this.selectedUploadType);
      // Implement actual file upload logic here
    }
  }

  cancel(): void {
    this.selectedFile = null;
    this.selectedUploadType = '';
  }

  addMore(): void {
    console.log('Add more files');
    // Implement add more functionality
  }
} 