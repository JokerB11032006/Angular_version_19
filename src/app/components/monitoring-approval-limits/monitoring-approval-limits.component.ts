import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav.component';
import { HeaderComponent } from '../header/header.component';

interface UploadFile {
  name: string;
  file: File;
  status?: string;
}

@Component({
  selector: 'app-monitoring-approval-limits',
  templateUrl: './monitoring-approval-limits.component.html',
  styleUrls: ['./monitoring-approval-limits.component.scss'],
  standalone: true,
  imports: [CommonModule, NavComponent, HeaderComponent]
})
export class MonitoringApprovalLimitsComponent implements OnInit {
  // File states
  turnoverFile: UploadFile | null = null;
  approvalLimitsFile: UploadFile | null = null;
  attachmentFiles: UploadFile[] = [];
  
  // Upload statuses
  turnoverUploadStatus: string = '';
  approvalLimitsUploadStatus: string = '';
  attachmentsUploadStatus: string = '';

  // Drag states
  isDraggingTurnover: boolean = false;
  isDraggingApprovalLimits: boolean = false;
  isDraggingAttachments: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  // Drag and Drop Handlers
  onDragOver(event: DragEvent, type: 'turnover' | 'approvalLimits' | 'attachments'): void {
    event.preventDefault();
    event.stopPropagation();
    
    switch(type) {
      case 'turnover':
        this.isDraggingTurnover = true;
        break;
      case 'approvalLimits':
        this.isDraggingApprovalLimits = true;
        break;
      case 'attachments':
        this.isDraggingAttachments = true;
        break;
    }
  }

  onDragLeave(event: DragEvent, type: 'turnover' | 'approvalLimits' | 'attachments'): void {
    event.preventDefault();
    event.stopPropagation();
    
    switch(type) {
      case 'turnover':
        this.isDraggingTurnover = false;
        break;
      case 'approvalLimits':
        this.isDraggingApprovalLimits = false;
        break;
      case 'attachments':
        this.isDraggingAttachments = false;
        break;
    }
  }

  onDrop(event: DragEvent, type: 'turnover' | 'approvalLimits' | 'attachments'): void {
    event.preventDefault();
    event.stopPropagation();
    
    // Reset drag states
    this.isDraggingTurnover = false;
    this.isDraggingApprovalLimits = false;
    this.isDraggingAttachments = false;

    const files = event.dataTransfer?.files;
    if (!files) return;

    switch(type) {
      case 'turnover':
        if (files.length > 0 && this.validateCsvFile(files[0])) {
          this.turnoverFile = { name: files[0].name, file: files[0] };
          this.turnoverUploadStatus = 'File selected successfully';
        }
        break;
      case 'approvalLimits':
        if (files.length > 0 && this.validateCsvFile(files[0])) {
          this.approvalLimitsFile = { name: files[0].name, file: files[0] };
          this.approvalLimitsUploadStatus = 'File selected successfully';
        }
        break;
      case 'attachments':
        Array.from(files).forEach(file => {
          if (this.validateAttachmentFile(file)) {
            this.attachmentFiles.push({ name: file.name, file: file });
          }
        });
        if (this.attachmentFiles.length > 0) {
          this.attachmentsUploadStatus = `${this.attachmentFiles.length} file(s) selected`;
        }
        break;
    }
  }

  // File Selection Handlers
  onTurnoverFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (this.validateCsvFile(file)) {
        this.turnoverFile = { name: file.name, file: file };
        this.turnoverUploadStatus = 'File selected successfully';
      }
    }
  }

  onApprovalLimitsFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (this.validateCsvFile(file)) {
        this.approvalLimitsFile = { name: file.name, file: file };
        this.approvalLimitsUploadStatus = 'File selected successfully';
      }
    }
  }

  onAttachmentsSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      Array.from(input.files).forEach(file => {
        if (this.validateAttachmentFile(file)) {
          this.attachmentFiles.push({ name: file.name, file: file });
        }
      });
      this.attachmentsUploadStatus = `${this.attachmentFiles.length} file(s) selected`;
    }
  }

  // File Removal Handlers
  removeTurnoverFile(): void {
    this.turnoverFile = null;
    this.turnoverUploadStatus = '';
  }

  removeApprovalLimitsFile(): void {
    this.approvalLimitsFile = null;
    this.approvalLimitsUploadStatus = '';
  }

  removeAttachmentFile(file: UploadFile): void {
    const index = this.attachmentFiles.indexOf(file);
    if (index > -1) {
      this.attachmentFiles.splice(index, 1);
      this.attachmentsUploadStatus = this.attachmentFiles.length > 0 
        ? `${this.attachmentFiles.length} file(s) remaining`
        : '';
    }
  }

  // File Validation
  private validateCsvFile(file: File): boolean {
    if (!file.name.toLowerCase().endsWith('.csv')) {
      this.turnoverUploadStatus = 'Error: Please select a CSV file';
      return false;
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      this.turnoverUploadStatus = 'Error: File size should be less than 5MB';
      return false;
    }
    return true;
  }

  private validateAttachmentFile(file: File): boolean {
    const allowedTypes = ['.pdf', '.doc', '.docx', '.xls', '.xlsx'];
    const extension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    if (!allowedTypes.includes(extension)) {
      this.attachmentsUploadStatus = 'Error: Invalid file type';
      return false;
    }
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      this.attachmentsUploadStatus = 'Error: File size should be less than 10MB';
      return false;
    }
    return true;
  }

  // Template Downloads
  downloadTurnoverTemplate(): void {
    const headers = ['Entity Name', 'Period', 'Currency', 'Turnover'];
    const rows = [
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', '']
    ];
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    this.downloadFile(csvContent, 'turnover_template.csv');
  }

  downloadApprovalLimitsTemplate(): void {
    const headers = ['Entity 1', 'Entity 2', 'Nature of Transactions', 'Currency', 'Exchange Rate', 'Approved Limits', 'Additional Approval', 'Date of Approval'];
    const firstRow = ['All RPTs drop down', 'All RPTs drop down', 'Refer side', '', '', '', '', ''];
    const rows = [
      firstRow,
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '']
    ];
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    this.downloadFile(csvContent, 'approval_limits_template.csv');
  }

  private downloadFile(content: string, fileName: string): void {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', fileName);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  // Save and Cancel handlers
  canSave(): boolean {
    return !!(this.turnoverFile || this.approvalLimitsFile || this.attachmentFiles.length > 0);
  }

  onSave(): void {
    if (this.turnoverFile) {
      this.turnoverUploadStatus = 'Uploading...';
      // Implement actual upload logic here
      setTimeout(() => {
        this.turnoverUploadStatus = 'Upload successful';
      }, 1000);
    }

    if (this.approvalLimitsFile) {
      this.approvalLimitsUploadStatus = 'Uploading...';
      // Implement actual upload logic here
      setTimeout(() => {
        this.approvalLimitsUploadStatus = 'Upload successful';
      }, 1000);
    }

    if (this.attachmentFiles.length > 0) {
      this.attachmentsUploadStatus = 'Uploading...';
      // Implement actual upload logic here
      setTimeout(() => {
        this.attachmentsUploadStatus = 'Upload successful';
      }, 1000);
    }
  }

  onCancel(): void {
    this.turnoverFile = null;
    this.approvalLimitsFile = null;
    this.attachmentFiles = [];
    this.turnoverUploadStatus = '';
    this.approvalLimitsUploadStatus = '';
    this.attachmentsUploadStatus = '';
  }
} 