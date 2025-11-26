  import { Button } from "@/components/ui/button"
  import { router, useForm } from "@inertiajs/react"
  import { ColumnDef } from "@tanstack/react-table"
  import { Cog } from "lucide-react"
  import {
    Sheet,
    SheetTrigger,
  } from "@/components/ui/sheet"
  import UpdatePerbaikan from "@/components/form-edit-perbaikan"
import dayjs from "@/utils/dayjs"

  type Perbaikan = {
    id: string
    kerusakan_id: string
    mesin_id: string
    nama_mesin: string
    teknisi_id: string
    tindakan: string
    sparepart: string
    waktu_mulai: string
    waktu_selesai?: string
    catatan?: string
  }
    

  export const columnsPerbaikan: ColumnDef<Perbaikan>[] = [
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
    {
      accessorKey: "actions",
      header: "Action",
      cell: ({ row }) => {
        const perbaikan = row.original
        

        return (
          
          <div className="flex gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" >
                  <Cog  />
                </Button>
              </SheetTrigger>
              <UpdatePerbaikan perbaikan={perbaikan} />
            </Sheet>
          </div>
        )
      }
    },
  ]