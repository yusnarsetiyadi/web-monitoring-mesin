<?php

namespace App\Exports;

use Illuminate\Support\Collection;
use Symfony\Component\HttpFoundation\StreamedResponse;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

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
}