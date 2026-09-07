import assets from './assets'
import data from './data'
import risk from './risk'
import emissions from './emissions'
import maintenance from './maintenance'
import reports from './reports'
import audit from './audit'
import settings from './settings'
const dashboard = {
    assets: Object.assign(assets, assets),
data: Object.assign(data, data),
risk: Object.assign(risk, risk),
emissions: Object.assign(emissions, emissions),
maintenance: Object.assign(maintenance, maintenance),
reports: Object.assign(reports, reports),
audit: Object.assign(audit, audit),
settings: Object.assign(settings, settings),
}

export default dashboard