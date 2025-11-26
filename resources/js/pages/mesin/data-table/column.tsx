import EditMesin from "@/components/form-edit-mesin"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetTrigger,
} from "@/components/ui/sheet"
import { router, useForm } from "@inertiajs/react"
import { ColumnDef } from "@tanstack/react-table"
import { Edit, Trash2 } from "lucide-react"

type Mesin = {
  id: string
  kode_mesin: string
  nama_mesin: string
  lokasi: string
  kategori: string
  gambar_mesin?: string | null
}
  

export const columns: ColumnDef<Mesin>[] = [
  {
    accessorKey: "index",
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "kode_mesin",
    header: "Kode Mesin",
  },
  {
    accessorKey: "nama_mesin",
    header: "Nama Mesin",
  },
  {
    accessorKey: "gambar_mesin",
    header: "Gambar Mesin", 
    cell: ({ row }) => {
      const mesin = row.original
      return mesin.gambar_mesin ? (
        <img
          src={`/storage/${mesin.gambar_mesin}`}
          alt={mesin.nama_mesin}
          className="w-16 h-16 object-cover rounded-md border"
        />
      ) : (
        <span className="text-gray-400 italic">No Image</span>
      )
    }
  },
  {
    accessorKey: "lokasi",
    header: "Lokasi",
  },
  {
    accessorKey: "kategori",
    header: "Kategori",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const mesin = row.original
      const { delete: destroy } = useForm();

      const handleDelete = () => {
        if (confirm(`Apakah Anda yakin ingin menghapus Mesin "${mesin.nama_mesin}" dengan kode ${mesin.kode_mesin}?`)) {
          destroy(route('mesin.destroy', mesin.id));
        }
      }

      return (
        <div className="flex gap-2">
          <Button variant="outline" className="hover:bg-red-300 hover:text-red-600"  onClick={handleDelete}>
              <Trash2/> 
          </Button>
          <Sheet>
              <SheetTrigger asChild>
                  <Button variant="outline" >
                      <Edit  />
                  </Button>
              </SheetTrigger>
            <EditMesin mesin={mesin}/>
          </Sheet>
        </div>
      )
      
    }
  },

]


