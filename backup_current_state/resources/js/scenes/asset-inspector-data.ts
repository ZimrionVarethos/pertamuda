export interface SegmentInfo {
    id: string;
    name: string;
    type: string;
    corrosionRisk: string;
    wallThickness: string;
    leakRisk: string;
    description: string;
}

export const SEGMENTS: SegmentInfo[] = [
    {
        id: 'seg-inlet-flange',
        name: 'Inlet Flange F-101',
        type: 'Flange Joint 8"',
        corrosionRisk: 'Tinggi (Wall Loss 32%)',
        wallThickness: '7.1 mm (Nominal 10.3 mm)',
        leakRisk: 'Sinyal metana 80 ppm terdeteksi',
        description: 'Sambungan flens masuk separator dengan tegangan getaran dan potensi kebocoran paking.',
    },
    {
        id: 'seg-vessel-shell',
        name: 'Vessel Shell Zone A',
        type: 'Cylindrical Shell',
        corrosionRisk: 'Sedang (Wall Loss 18%)',
        wallThickness: '8.4 mm (Nominal 10.3 mm)',
        leakRisk: 'Tekanan stabil 8.6 bar',
        description: 'Badan bejana pemisah cairan dan gas 3 fasa.',
    },
    {
        id: 'seg-control-valve',
        name: 'Emergency Relief Valve EV-01',
        type: 'Actuated Valve',
        corrosionRisk: 'Kritis (Wall Loss 45%)',
        wallThickness: '5.6 mm (Nominal 10.3 mm)',
        leakRisk: 'Penurunan tekanan diferensial terdeteksi',
        description: 'Katup pengaman pelepasan tekanan darurat.',
    },
    {
        id: 'seg-outlet-pipe',
        name: 'Gas Outlet Nozzle N-02',
        type: 'Nozzle Schedule 80',
        corrosionRisk: 'Rendah (Wall Loss 8%)',
        wallThickness: '9.5 mm (Nominal 10.3 mm)',
        leakRisk: 'Normal',
        description: 'Pipa keluaran gas menuju manifold gas buang.',
    },
];
