import PublicController from './PublicController'
import DashboardController from './DashboardController'
import AssetController from './AssetController'
import DataSourceController from './DataSourceController'
import RiskController from './RiskController'
import EmissionController from './EmissionController'
import MaintenanceTaskController from './MaintenanceTaskController'
import ReportController from './ReportController'
import AuditController from './AuditController'
import SettingsController from './SettingsController'
import Settings from './Settings'
const Controllers = {
    PublicController: Object.assign(PublicController, PublicController),
DashboardController: Object.assign(DashboardController, DashboardController),
AssetController: Object.assign(AssetController, AssetController),
DataSourceController: Object.assign(DataSourceController, DataSourceController),
RiskController: Object.assign(RiskController, RiskController),
EmissionController: Object.assign(EmissionController, EmissionController),
MaintenanceTaskController: Object.assign(MaintenanceTaskController, MaintenanceTaskController),
ReportController: Object.assign(ReportController, ReportController),
AuditController: Object.assign(AuditController, AuditController),
SettingsController: Object.assign(SettingsController, SettingsController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers