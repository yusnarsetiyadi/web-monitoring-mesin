import { Button } from "@/components/ui/button"
import { router, useForm } from "@inertiajs/react"
import { ColumnDef } from "@tanstack/react-table"
import {  Cog } from "lucide-react"
import {
  Sheet,
  SheetTrigger,
} from "@/components/ui/sheet"
import UpdatePerbaikan from "@/components/form-edit-perbaikan"
import dayjs from "@/utils/dayjs"
import { Badge } from "@/components/ui/badge"

type Perbaikan = {
  id: string
  kerusakan_id: string
  teknisi_id: string
  mesin_id: string
  nama_mesin: string
  tindakan: string
  sparepart: string
  waktu_mulai: string
  waktu_selesai?: string
  catatan?: string
  kerusakan: {
    kode_kerusakan: string
    status: string
  }
}
  

export const columnsHistory: ColumnDef<Perbaikan>[] = [
  {
    accessorKey: "index",
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "kerusakan.kode_kerusakan",
    header: "Kerusakan ID",
  }, 
  {
    accessorKey: "kerusakan.mesin.nama_mesin",
    header: "Nama Mesin",
  }, 
  {
    accessorKey: "teknisi.name",
    header: "Nama Teknisi",
  },
  {
    accessorKey: "tindakan",
    header: "Deskripsi",
  },
  {
    accessorKey: "sparepart",
    header: "sparepart",
  },
  {
    accessorKey: "kerusakan.status",
    header: "Status",
    cell: ({ row }) => {
        const status = row.original.kerusakan.status;
        let variant: "default" | "secondary" | "destructive" | "outline" | "ditolak" | "dilaporkan" | "dalamperbaikan" | "selesai" = "secondary";

        if (status === 'Dilaporkan') {
          variant = "dilaporkan"; 
        } else if (status === 'Dalam Perbaikan') {
          variant = "dalamperbaikan";
        } else if (status === 'Selesai') {  
          variant = "selesai";
        } else if (status === 'DiTolak') {  
          variant = "ditolak";
        }

        return (
          <Badge variant={variant}>{status.toString()}</Badge>
        );
    },
  },
  {
    accessorKey: "waktu_mulai",
    header: "Waktu Mulai",
    cell: ({ row }) => {
      const date = row.original.waktu_mulai;
      if (!date) return "-";
      const timestamp = Number(date);
      const parsedDate = isNaN(timestamp) ? dayjs(date) : dayjs.unix(timestamp);
      return parsedDate.format("YYYY-MM-DD HH:mm:ss");
    },
  },
  {
    accessorKey: "waktu_selesai",
    header: "Waktu Selesai",
    cell: ({ row }) => {
      const date = row.original.waktu_selesai;
      if (!date) return "-";
      const timestamp = Number(date);
      const parsedDate = isNaN(timestamp) ? dayjs(date) : dayjs.unix(timestamp);
      return parsedDate.format("YYYY-MM-DD HH:mm:ss");
    },
  },
]