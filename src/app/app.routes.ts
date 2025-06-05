import { Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HeaderComponent } from './components/header/header.component';
import { TableComponent } from './components/table/table.component';
import { RPTMasterComponent } from './components/RPT_master/RPT_master.component';
import { AgreementSummaryComponent } from './components/agreement-summary/agreement-summary.component';
import { UploadComponent } from './components/upload/upload.component';
import { AuditCommitteeApprovalComponent } from './components/audit-committee-approval/audit-committee-approval.component';
import { RPTTransactionsComponent } from './components/rpt-transactions/rpt-transactions.component';
import { EntityWiseRPTTransactionsComponent } from './components/entity-wise-rpt-transactions/entity-wise-rpt-transactions.component';
import { TransactionUploadComponent } from './components/transaction-upload/transaction-upload.component';
import { MonitoringApprovedLimitsComponent } from './components/monitoring-approved-limits/monitoring-approved-limits.component';
import { MonitoringApprovalLimitsComponent } from './components/monitoring-approval-limits/monitoring-approval-limits.component';
import { MonitoringImpNotificationsComponent } from './components/monitoring-imp-notifications/monitoring-imp-notifications.component';

export const routes: Routes = [
    {
        path: '',
        component: NavComponent

    },
    {
        path: 'header',
        component: HeaderComponent
    },
    {
        path: 'table',
        component: TableComponent
    },
    {
        path: 'RPT_master',
        component: RPTMasterComponent
    },
    {
        path: 'agreement-summary',
        component: AgreementSummaryComponent
    },
    {
        path: 'upload',
        component: UploadComponent
    },
    {
        path: 'audit-committee-approval',
        component: AuditCommitteeApprovalComponent
    },
    {
        path: 'rpt-transactions',
        component: RPTTransactionsComponent
    },
    {
        path: 'entity-wise-rpt-transactions',
        component: EntityWiseRPTTransactionsComponent
    },
    {
        path: 'transactions-upload',
        component: TransactionUploadComponent
    },
    {
        path: 'monitoring-approved-limits',
        component: MonitoringApprovedLimitsComponent
    },
    {
        path: 'monitoring-approval-limits',
        component: MonitoringApprovalLimitsComponent
    },
    {
        path: 'monitoring-imp-notifications',
        component: MonitoringImpNotificationsComponent
    }
];
