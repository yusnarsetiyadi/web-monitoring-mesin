import EditRole from "@/components/form-edit-role"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ColumnDef } from "@tanstack/react-table"
import { Edit } from "lucide-react"

type Users = {
  id: string
  name: string
  email: string
  role: string
}
  

export const columns: ColumnDef<Users>[] = [
  {
    accessorKey: "index",
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original

      return (
        <div className="flex gap-2">
          <Sheet>
              <SheetTrigger asChild>
                  <Button variant="outline" >
                      <Edit  />
                  </Button>
              </SheetTrigger>
            <EditRole user={user}/>
          </Sheet>
        </div>
      )
      
    }
  },

]


