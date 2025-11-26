<?php

namespace App\Exports;

use Illuminate\Support\Collection;
use Symfony\Component\HttpFoundation\StreamedResponse;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class ExportDatakerusakan
{
    protected $data;
    protected $year;
    protected $month;

    public function __construct(Collection $data, int $month, int $year)
    {
        $this->data = $data;
        $this->month = $month;
        $this->year = $year;
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

        $sheet->setCellValue('A1', 'Laporan Data Kerusakan Bulan ' . $monthName . ' Tahun ' . $this->year);
        $sheet->mergeCells('A1:G1');
        $sheet->getStyle('A1')->getFont()->setBold(true)->setSize(14);
        $sheet->getStyle('A1')->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);

        // Set lebar kolom
        $sheet->getColumnDimension('A')->setWidth(5);
        $sheet->getColumnDimension('B')->setWidth(20);
        $sheet->getColumnDimension('C')->setWidth(20);
        $sheet->getColumnDimension('D')->setWidth(25);
        $sheet->getColumnDimension('E')->setWidth(25);
        $sheet->getColumnDimension('F')->setWidth(20);
        $sheet->getColumnDimension('G')->setWidth(20);

        // Menulis header kolom
        $headerRow = 3;
        $headers = [
            'A' => 'No',
            'B' => 'Mesin',
            'C' => 'Deskripsi Kerusakan',
            'D' => 'Tanggal Lapor',
            'E' => 'Status',
            'F' => 'Pelapor',
            'G' => 'Kode Kerusakan',
        ];

        foreach ($headers as $column => $header) {
            $sheet->setCellValue($column . $headerRow, $header);
        }

        $sheet->getStyle('A' . $headerRow . ':G' . $headerRow)->getFont()->setBold(true);
        $sheet->getStyle('A' . $headerRow . ':G' . $headerRow)->getFill()
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

            // Merge cells untuk pesan
            $sheet->mergeCells('D'. $row. ':G' . $row);
            $sheet->getStyle('D' . $row)->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
            $sheet->getStyle('D' . $row)->getFont()->setItalic(true);

            $row++;
        } else {
            $index = 1;

            foreach ($this->data as $item) {
                $sheet->setCellValue('A' . $row, $index++);
                $sheet->setCellValue('B' . $row, $item->mesin->nama_mesin ?? '-');
                $sheet->setCellValue('C' . $row, $item->deskripsi ?? '-');
                $sheet->setCellValue('D' . $row, $item->waktu_lapor ? date('d-m-Y H:i:s', strtotime($item->waktu_lapor)) : '-');
                $sheet->setCellValue('E' . $row, $item->status->value ?? '-');
                $sheet->setCellValue('F' . $row, $item->user->name ?? '-');
                $sheet->setCellValue('G' . $row, $item->kode_kerusakan ?? '-');
                $row++;
            }
        }

        // Tambahkan border untuk semua data
        $lastRow = $row - 1;
        $sheet->getStyle('A3:G' . $lastRow)->getBorders()->getAllBorders()
            ->setBorderStyle(\PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN);

        // Return StreamedResponse
        return new StreamedResponse(function() use ($spreadsheet) {
            $writer = new Xlsx($spreadsheet);
            $writer->save('php://output'); 
        }, 200, [
            'Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet ',
            'Content-Disposition' => 'attachment; filename="laporan_kerusakan_' . $this->month . '_' . $this->year . '.xlsx"',
            'Cache-Control' => 'max-age=0',
        ]);
    }
}