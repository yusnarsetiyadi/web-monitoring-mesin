import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem, pagePropsAssignKerusakan, PagePropsKerusakanList, PagePropsMachine } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react'
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Management Kerusakan',
        href: '/kerusakan',
    },
];

export default function index() {

    const { teknisi, kerusakan } = usePage<pagePropsAssignKerusakan>().props;

    const {data, setData, processing} = useForm({
        teknisi_id: '',
        status: 'Dalam Perbaikan'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        router.patch(
            route('perbaikan.assign', kerusakan.id),
            data,
            {
                onSuccess: () => {
                    console.log('Assignment successful')
                },
                onError: (errors) => {
                    console.log('Assigment failed: ', errors)
                }
            }
        )

    }
 
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
    <Head title="Create a New Employees" />
    <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <form className='space-y-4' onSubmit={handleSubmit}>
            <div className='gap-1.5'>
             <Label htmlFor='teknisi_id'>Teknisi</Label>
             <Select
                onValueChange={(value) => setData('teknisi_id', value)}
                value={data.teknisi_id}>
                <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select Teknisi ..." />
                </SelectTrigger>
                <SelectContent>
                <SelectGroup>
                        {teknisi.map((item) => (
                        <SelectItem key={item.id} value={String(item.id)}>
                            {item.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
                </SelectContent>
                </Select>
            </div>
            <Button  type='submit' disabled={processing} className='mt-4'>                        
                {processing ? 'Assigning...' : 'Assign Perbaikan'}
            </Button>
            </form>
    </div>
</AppLayout>
  )
}
