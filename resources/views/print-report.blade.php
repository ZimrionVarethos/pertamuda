<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laporan {{ strtoupper($report->type) }} v{{ $version->version ?? 1 }} - NASIR</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Chivo+Mono:ital,wght@0,100..900;1,100..900&family=Onest:wght@100..900&display=swap" rel="stylesheet">
    <style>
        @page {
            size: A4;
            margin: 20mm;
        }
        body {
            font-family: 'Onest', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            color: #1a1a1a;
            background: #fff;
            margin: 0;
            padding: 24px;
            font-size: 11pt;
            line-height: 1.5;
        }
        .code-id {
            font-family: 'Onest', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .metric-val {
            font-family: 'Onest', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-variant-numeric: tabular-nums;
        }
        .header {
            border-bottom: 2px solid #FF5B04;
            padding-bottom: 12px;
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
        }
        .logo {
            font-size: 22pt;
            font-weight: 800;
            color: #FF5B04;
            letter-spacing: -0.5px;
        }
        .draft-badge {
            display: inline-block;
            background: #fff0eb;
            color: #c0390b;
            border: 1px solid #f88c64;
            font-size: 9pt;
            font-weight: 700;
            padding: 4px 10px;
            border-radius: 4px;
            text-transform: uppercase;
        }
        .meta-table {
            width: 100%;
            margin-bottom: 24px;
            border-collapse: collapse;
        }
        .meta-table td {
            padding: 6px 0;
            font-size: 10pt;
        }
        .meta-label {
            font-weight: 600;
            color: #555;
            width: 25%;
        }
        h2 {
            font-size: 13pt;
            color: #111;
            border-bottom: 1px solid #ddd;
            padding-bottom: 4px;
            margin-top: 24px;
            margin-bottom: 10px;
        }
        p {
            margin: 0 0 8px 0;
        }
        .data-table {
            width: 100%;
            border-collapse: collapse;
            margin: 14px 0;
            font-size: 9.5pt;
        }
        .data-table th, .data-table td {
            border: 1px solid #ddd;
            padding: 6px 8px;
            text-align: left;
        }
        .data-table th {
            background: #f5f5f5;
            font-weight: 600;
        }
        .footer {
            margin-top: 36px;
            border-top: 1px solid #eee;
            padding-top: 12px;
            font-size: 8.5pt;
            color: #777;
            text-align: center;
        }
        .no-print {
            margin-bottom: 20px;
            padding: 12px;
            background: #f3f4f6;
            border-radius: 6px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .btn-print {
            background: #FF5B04;
            color: #fff;
            border: none;
            padding: 8px 16px;
            font-weight: 600;
            border-radius: 4px;
            cursor: pointer;
        }
        @media print {
            .no-print {
                display: none !important;
            }
            body {
                padding: 0;
            }
        }
    </style>
</head>
<body>
    <div class="no-print">
        <span>Pratinjau Format Cetak Dokumen A4</span>
        <button class="btn-print" onclick="window.print()">Cetak / Simpan sebagai PDF</button>
    </div>

    <div class="header">
        <div>
            <div class="logo">NASIR</div>
            <div style="font-size: 9.5pt; color: #555;">Platform Analitik Operasional & Pelaporan Emisi Migas</div>
        </div>
        <div style="text-align: right;">
            <div class="draft-badge">Draf Prototipe. Belum Diverifikasi.</div>
            <div style="font-size: 9pt; color: #666; margin-top: 4px;">Versi {{ $version->version ?? 1 }} · {{ strtoupper($report->type) }}</div>
        </div>
    </div>

    <table class="meta-table">
        <tr>
            <td class="meta-label">Nama Fasilitas</td>
            <td>{{ $content['section_1_facility']['facility_name'] ?? $report->facility?->name }} ({{ $report->facility?->code }})</td>
            <td class="meta-label">Organisasi</td>
            <td>{{ $report->organization?->name }}</td>
        </tr>
        <tr>
            <td class="meta-label">Periode Observasi</td>
            <td>{{ $report->period_start->format('d M Y') }} s/d {{ $report->period_end->format('d M Y') }}</td>
            <td class="meta-label">Status Peninjauan</td>
            <td>{{ ucfirst($report->status) }}</td>
        </tr>
        <tr>
            <td class="meta-label">Asal Data</td>
            <td>Data Sintetis Berlabel (Tervalidasi)</td>
            <td class="meta-label">Penyusun Draf</td>
            <td>{{ $report->author?->name ?? 'Sistem Analitik NASIR' }}</td>
        </tr>
    </table>

    <h2>1. Identitas Fasilitas dan Cakupan Operasional</h2>
    <p>{{ $content['section_1_facility']['scope_summary'] ?? 'Pemantauan emisi metana dan triase integritas aset fasilitas migas.' }}</p>

    <h2>2. Periode Pemantauan dan Asal Sumber Data</h2>
    <p>{{ $content['section_2_period']['data_source_mode'] ?? 'Data primer hasil pengukuran interval instrumen berlabel sintetis.' }}</p>
    <p>Total observasi tercakup dalam draf: <strong>{{ $content['section_2_period']['total_observations'] ?? 0 }} titik data</strong>.</p>

    <h2>3. Metode Kuantifikasi, Satuan, dan Asumsi</h2>
    <p><strong>Metode:</strong> {{ $content['section_3_method']['quantification_method'] ?? 'Integrasi laju massa kg/h.' }}</p>
    <p><strong>Satuan:</strong> {{ $content['section_3_method']['units'] ?? 'kg CH4' }}</p>
    <p><strong>Asumsi:</strong> {{ $content['section_3_method']['assumptions'] ?? 'Laju alir konstan dalam interval observasi.' }}</p>
    <p><strong>Pernyataan Ketidakpastian:</strong> {{ $content['section_3_method']['uncertainty_statement'] ?? 'Ketidakpastian baku dievaluasi berkala.' }}</p>

    <h2>4. Hasil Kuantifikasi Emisi per Aset</h2>
    <p>{{ $content['section_4_results']['summary_text'] ?? '' }}</p>

    <table class="data-table">
        <thead>
            <tr>
                <th>Kode Aset</th>
                <th>Nama Aset</th>
                <th>Massa Metana</th>
                <th>Cakupan Waktu</th>
                <th>Tingkat Ketidakpastian</th>
            </tr>
        </thead>
        <tbody>
            @forelse($calculations as $calc)
            <tr>
                <td><strong class="code-id">{{ $calc['asset_code'] ?? '-' }}</strong></td>
                <td>{{ $calc['asset_name'] ?? '-' }}</td>
                <td class="metric-val">{{ $calc['methane_mass_kg'] !== null ? number_format($calc['methane_mass_kg'], 2) . ' kg CH4' : 'Data belum cukup' }}</td>
                <td class="metric-val">{{ isset($calc['coverage_ratio']) ? round($calc['coverage_ratio'] * 100) . '%' : '-' }}</td>
                <td>{{ $calc['uncertainty'] ?? 'Belum dievaluasi' }}</td>
            </tr>
            @empty
            <tr>
                <td colspan="5" style="text-align: center; color: #888;">Tidak ada data kuantifikasi aset.</td>
            </tr>
            @endforelse
        </tbody>
    </table>

    <h2>5. Catatan Penelaah Internal</h2>
    @if(!empty($version->reviewer_notes))
        <p><strong>Catatan ({{ $version->reviewer?->name ?? 'Penelaah' }}):</strong> {{ $version->reviewer_notes }}</p>
        <p style="font-size: 9pt; color: #666;">Ditelaah pada: {{ $version->reviewed_at?->format('d M Y H:i') }}</p>
    @else
        <p style="color: #666; font-style: italic;">Laporan masih dalam status draf dan belum memiliki catatan telaah formal.</p>
    @endif

    <div class="footer">
        Dokumen ini diterbitkan oleh platform NASIR sebagai draf persiapan pelaporan internal berbasis data sintetis.<br>
        Bukan sertifikasi resmi emisi atau jaminan kelulusan audit instansi pemerintah.
    </div>
</body>
</html>