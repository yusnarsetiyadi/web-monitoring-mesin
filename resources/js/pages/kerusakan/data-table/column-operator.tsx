import EditMesin from "@/components/form-edit-mesin"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetTrigger,
} from "@/components/ui/sheet"
import { router, useForm } from "@inertiajs/react"
import { ColumnDef } from "@tanstack/react-table"
import { Edit, Trash2 } from "lucide-react"

type Kerusakan = {
  id: string
  mesin_id: string
  user_id: string
  deskripsi: string
  status: string
  waktu_lapor: string
}
  

export const columnsOperator: ColumnDef<Kerusakan>[] = [
  {
    accessorKey: "index",
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "kode_kerusakan",
    header: "Kerusakan ID",
  },
  {
    accessorKey: "mesin.kode_mesin",
    header: "Kode Mesin",
  },
  {
    accessorKey: "user.name",
    header: "Nama Operator",
  },
  {
    accessorKey: "deskripsi",
    header: "Deskripsi",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
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
    accessorKey: "waktu_lapor",
    header: "Waktu Lapor",
  },

]


