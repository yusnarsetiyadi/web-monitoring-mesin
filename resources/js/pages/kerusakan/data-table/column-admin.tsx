

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { useForm } from "@inertiajs/react"
import { ColumnDef } from "@tanstack/react-table"
import { Edit, RailSymbol, Trash2 } from "lucide-react"

type Kerusakan = {
  id: string
  mesin_id: string
  user_id: string
  deskripsi: string
  status: string
  waktu_lapor: string
}
  

export const columnsAdmin: ColumnDef<Kerusakan>[] = [
  {
    accessorKey: "index",
    header: "No",
    cell: ({ row }) => row.index + 1,
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
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const kerusakan = row.original
      const { delete: destroy, get: edit } = useForm();

      const handleDelete = () => {
        if (confirm(`Apakah Anda yakin ingin menghapus Report Kerusakan ini ?`)) {
          destroy(route('kerusakan.destroy', kerusakan.id));
        }
      }

      const handleAssign = () => {
        edit(route('kerusakan.assign', kerusakan.id)); 
      }

      return (
        <div className="flex gap-2">
          <Button variant="outline" className="hover:bg-red-300 hover:text-red-600"  onClick={handleDelete}>
              <Trash2/> 
          </Button>
          <Button variant="outline"  onClick={handleAssign}>
            <RailSymbol  />
          </Button>
        </div>
      )
  },
  }
]


