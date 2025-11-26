<?php

namespace App\Exports;

use Illuminate\Support\Collection;
use Symfony\Component\HttpFoundation\StreamedResponse;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Dompdf\Dompdf;
use Dompdf\Options;

class ExportDataPerbaikan
{
    protected $data;
    protected $year;
    protected $month;

    public function __construct(Collection $data, int $month, int $year)
    {
        $this->data = $data;
        $this->year = $year;
        $this->month = $month;
    }

    public function generate(): StreamedResponse
    {
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        // Judul Laporan
        $monthNames = [
            1 => 'Januari', 2 => 'Februari', 3 => 'Maret', 4 => 'April',
            5 => 'Mei', 6 => 'Juni', 7 => 'Juli', 8 => 'Agustus',
            9 => 'September', 10 => 'Oktober', 11 => 'November', 12 => 'Desember'
        ];

        $monthName = $monthNames[$this->month] ?? $this->month;

        $sheet->setCellValue('A1', 'Laporan Data Perbaikan Bulan ' . $monthName . ' Tahun ' . $this->year);
        $sheet->mergeCells('A1:H1');
        $sheet->getStyle('A1')->getFont()->setBold(true)->setSize(14);
        $sheet->getStyle('A1')->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);

        // Set lebar kolom
        $sheet->getColumnDimension('A')->setWidth(5);
        $sheet->getColumnDimension('B')->setWidth(20);
        $sheet->getColumnDimension('C')->setWidth(20);
        $sheet->getColumnDimension('D')->setWidth(25);
        $sheet->getColumnDimension('E')->setWidth(40);
        $sheet->getColumnDimension('F')->setWidth(30);
        $sheet->getColumnDimension('G')->setWidth(20);
        $sheet->getColumnDimension('H')->setWidth(30);

        // Menulis header kolom
        $headerRow = 3;
        $headers = [
            'A' => 'No',
            'B' => 'Kode Kerusakan',
            'C' => 'Teknisi',
            'D' => 'Tindakan',
            'E' => 'Sparepart',
            'F' => 'Waktu Mulai',
            'G' => 'Waktu Selesai',
            'H' => 'Status',
        ];

        foreach ($headers as $column => $header) {
            $sheet->setCellValue($column . $headerRow, $header);
        }

        $sheet->getStyle('A' . $headerRow . ':H' . $headerRow)->getFont()->setBold(true);
        $sheet->getStyle('A' . $headerRow . ':H' . $headerRow)->getFill()
            ->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
            ->getStartColor()->setARGB('FFCCCCCC');

        // Menulis data kerusakan
        $row = $headerRow + 1;
        if ($this->data->isEmpty()) {
            // Jika tidak ada data, tampilkan pesan
            $sheet->setCellValue('A' . $row, '-');
            $sheet->setCellValue('B' . $row, '-');
            $sheet->setCellValue('C' . $row, '-');
            $sheet->setCellValue('D' . $row, 'Tidak ada data kerusakan');
            $sheet->setCellValue('E' . $row, '-');
            $sheet->setCellValue('F' . $row, '-');
            $sheet->setCellValue('G' . $row, '-');
            $sheet->setCellValue('H' . $row, '-');

            // Merge cells untuk pesan
            $sheet->mergeCells('D'. $row. ':G' . $row);
            $sheet->getStyle('D' . $row)->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
            $sheet->getStyle('D' . $row)->getFont()->setItalic(true);

            $row++;
        } else {
            $index = 1;
            foreach ($this->data as $item) {
                $sheet->setCellValue('A' . $row, $index++);
                $sheet->setCellValue('B' . $row, $item->kerusakan->kode_kerusakan ?? '-');
                $sheet->setCellValue('C' . $row, $item->teknisi->name ?? '-');
                $sheet->setCellValue('D' . $row, $item->tindakan ?? '-');
                $sheet->setCellValue('E' . $row, $item->sparepart ?? '-');
                $sheet->setCellValue('F' . $row, $item->waktu_mulai ? date('d-m-Y H:i:s', strtotime($item->waktu_mulai)) : '-');
                $sheet->setCellValue('G' . $row, $item->waktu_selesai ? date('d-m-Y H:i:s', strtotime($item->waktu_selesai)) : '-');
                $sheet->setCellValue('H' . $row, $item->kerusakan->status->value ?? '-');
                $row++;
            }
        }

        // Tambahkan border untuk semua data
        $lastRow = $row - 1;
        $sheet->getStyle('A3:H' . $lastRow)->getBorders()->getAllBorders()
            ->setBorderStyle(\PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN);

        // Return StreamedResponse
        return new StreamedResponse(function() use ($spreadsheet) {
            $writer = new Xlsx($spreadsheet);
            $writer->save('php://output'); 
        }, 200, [
            'Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition' => 'attachment; filename="laporan_perbaikan_' . $this->month . '_' . $this->year . '.xlsx"',
            'Cache-Control' => 'max-age=0',
        ]);
    }

    public function generatePdf(): StreamedResponse
    {
        $monthNames = [
            1 => 'Januari', 2 => 'Februari', 3 => 'Maret', 4 => 'April',
            5 => 'Mei', 6 => 'Juni', 7 => 'Juli', 8 => 'Agustus',
            9 => 'September', 10 => 'Oktober', 11 => 'November', 12 => 'Desember'
        ];

        $monthName = $monthNames[$this->month] ?? $this->month;

        // --- HTML TEMPLATE ---
        $html = '
        <style>
            body { font-family: sans-serif; font-size: 12px; }
            h2 { text-align: center; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; }
            table, th, td { border: 1px solid #000; }
            th {
                background: #e0e0e0;
                font-weight: bold;
                text-align: center;
                padding: 6px;
            }
            td { padding: 6px; }
            .center { text-align: center; }
            .italic { font-style: italic; }
        </style>

        <h2>Laporan Data Perbaikan Bulan ' . $monthName . ' Tahun ' . $this->year . '</h2>

        <table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Kode Kerusakan</th>
                    <th>Teknisi</th>
                    <th>Tindakan</th>
                    <th>Sparepart</th>
                    <th>Waktu Mulai</th>
                    <th>Waktu Selesai</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>';

        // Jika data kosong
        if ($this->data->isEmpty()) {
            $html .= '
                <tr>
                    <td class="center">-</td>
                    <td class="center">-</td>
                    <td class="center">-</td>
                    <td class="italic center" colspan="3">Tidak ada data kerusakan</td>
                    <td class="center">-</td>
                    <td class="center">-</td>
                </tr>';
        } else {
            $i = 1;
            foreach ($this->data as $item) {
                $html .= '
                    <tr>
                        <td class="center">' . $i++ . '</td>
                        <td>' . ($item->kerusakan->kode_kerusakan ?? '-') . '</td>
                        <td>' . ($item->teknisi->name ?? '-') . '</td>
                        <td>' . ($item->tindakan ?? '-') . '</td>
                        <td>' . ($item->sparepart ?? '-') . '</td>
                        <td>' . ($item->waktu_mulai ? date('d-m-Y H:i:s', strtotime($item->waktu_mulai)) : '-') . '</td>
                        <td>' . ($item->waktu_selesai ? date('d-m-Y H:i:s', strtotime($item->waktu_selesai)) : '-') . '</td>
                        <td>' . ($item->kerusakan->status->value ?? '-') . '</td>
                    </tr>';
            }
        }

        $html .= '
            </tbody>
        </table>';

        // --- DOMPDF SETUP ---
        $options = new Options();
        $options->set('isRemoteEnabled', true);
        $options->set('defaultFont', 'DejaVu Sans');

        $dompdf = new Dompdf($options);
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'landscape');
        $dompdf->render();

        // STREAM RESPONSE
        return response()->streamDownload(function () use ($dompdf) {
            echo $dompdf->output();
        }, 'laporan_perbaikan_' . $this->month . '_' . $this->year . '.pdf', [
            'Content-Type' => 'application/pdf',
        ]);
    }
}