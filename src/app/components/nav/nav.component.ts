import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule } from '@angular/forms';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 

interface MenuItem {
  name: string;
  href: string;
  active?: boolean;
  important?: boolean;
}

interface MenuCategory {
  title: string;
  icon: string;
  items: MenuItem[];
  isExpanded?: boolean;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class NavComponent implements OnInit {
  sidebarMenuData: MenuCategory[] = [
    {
      title: "RPT Master", 
      icon: "fa-folder",
      isExpanded: true,
      items: [
        { name: "RPT List", href: "RPT_master", active: true },
        { name: "Agreement Summary", href: "agreement-summary" },
        { name: "Upload", href: "upload" }
      ]
    },
    {
      title: "Audit Committee Approval",
      icon: "fa-gavel",
      isExpanded: false,
      items: [
        { name: "Audit Committee Approval", href: "audit-committee-approval" }
      ]
    },
    {
      title: "RPT Transactions",
      icon: "fa-exchange-alt",
      isExpanded: false,
      items: [
        { name: "RPT Transactions", href: "rpt-transactions" },
        { name: "Entity Wise RPT Transactions", href: "entity-wise-rpt-transactions" },
        { name: "Upload", href: "transactions-upload" }
      ]
    },
    {
      title: "Monitoring",
      icon: "fa-chart-line",
      isExpanded: false,
      items: [
        { name: "Approved limits", href: "monitoring-approved-limits" },
        { name: "Update approval limits", href: "monitoring-approval-limits" },
        { name: "Important notifications!!!", href: "monitoring-imp-notifications" }
      ]
    },
    {
      title: "Reporting",
      icon: "fa-file-alt",
      isExpanded: false,
      items: [
        { name: "Ind AS Financials", href: "#ind-as-financials" },
        { name: "SEBI Half yearly reporting", href: "#sebi-reporting" },
        { name: "Approvals", href: "#reporting-approvals" }
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void { }

  toggleSubMenu(category: MenuCategory): void {
    category.isExpanded = !category.isExpanded;
  }

  setActiveLink(category: MenuCategory, item: MenuItem): void {
    // Reset all active states
    this.sidebarMenuData.forEach(cat => {
      cat.items.forEach(menuItem => {
        menuItem.active = false;
      });
    });
    
    // Set the clicked item as active
    item.active = true;
  }
} 