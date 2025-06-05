import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav.component';
import { HeaderComponent } from '../header/header.component';

interface UploadedFile {
  name: string;
  size: string;
}

interface UploadSection {
  files: UploadedFile[];
  isDragging: boolean;
}

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  standalone: true,
  imports: [CommonModule, NavComponent, HeaderComponent]
})
export class UploadComponent implements OnInit {
  
  uploadSections: { [key: string]: UploadSection } = {
    bulk: { files: [], isDragging: false },
    attachment: { files: [], isDragging: false },
    agreements: { files: [], isDragging: false }
  };

  constructor() { }

  ngOnInit(): void { }

  onFileDropped(event: DragEvent, section: string): void {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFiles(files, section);
    }
    this.uploadSections[section].isDragging = false;
  }

  onDragOver(event: DragEvent, section: string): void {
    event.preventDefault();
    event.stopPropagation();
    this.uploadSections[section].isDragging = true;
  }

  onDragLeave(event: DragEvent, section: string): void {
    event.preventDefault();
    event.stopPropagation();
    this.uploadSections[section].isDragging = false;
  }

  onFileSelected(event: Event, section: string): void {
    const element = event.target as HTMLInputElement;
    const files = element.files;
    if (files) {
      this.handleFiles(files, section);
    }
  }

  private handleFiles(files: FileList, section: string): void {
    // Filter for CSV and XLSX files
    const validFiles = Array.from(files).filter(file => 
      file.name.endsWith('.csv') || 
      file.name.endsWith('.xlsx')
    );

    if (validFiles.length > 0) {
      const newFiles = validFiles.map(file => ({
        name: file.name,
        size: this.formatFileSize(file.size)
      }));
      
      this.uploadSections[section].files = [...this.uploadSections[section].files, ...newFiles];
      console.log(`Files uploaded to ${section}:`, this.uploadSections[section].files);
    }
  }

  removeFile(section: string, index: number): void {
    this.uploadSections[section].files.splice(index, 1);
  }

  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  onCancel(): void {
    // Reset all sections
    Object.keys(this.uploadSections).forEach(key => {
      this.uploadSections[key].files = [];
      this.uploadSections[key].isDragging = false;
    });
  }

  onSave(): void {
    console.log('All uploaded files:', this.uploadSections);
    // Implement save logic here
  }
} 