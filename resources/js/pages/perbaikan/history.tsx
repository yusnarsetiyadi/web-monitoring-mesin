import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem, pagePropsPerbaikan } from '@/types';
import { Head, router, usePage } from '@inertiajs/react'
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { DataTablePerbaikan } from './data-table/data-table';
import { columnsPerbaikan } from './data-table/column-perbaikan';
import { columnsHistory } from './data-table/column-history';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Management Mesin',
        href: '/mesin',
    },
];

export default function index() {
    
    const { history, flash, filters } = usePage<pagePropsPerbaikan>().props;

    const [search, setSearch] = useState(filters?.search || '');

    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        const handler = setTimeout(() => {
            if (search.length >= 3 || search.length === 0) {
                const url = new URL(window.location.href); 
                url.searchParams.set('search', search);

                router.get(
                    url.pathname + url.search,
                    {},
                    {
                        preserveState: true,
                        replace: true,
                    }
                );
            }
        },300);

        return () => {
            clearTimeout(handler);
        };
    }, [search]);

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success, {duration: 3000});
        }

        if (flash.errorMessage) {
            toast.error(flash.errorMessage, {duration:3000});
        }
    }, [flash]);


  return (
    <AppLayout breadcrumbs={breadcrumbs}>
    <Head title="Management Mesin" />
    <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border p-4">
        <div className='flex items-center justify-between mb-4 '>
            <h1 className='font-semibold text-lg'>History Perbaikan</h1>
                <Input
                    type="text"
                    placeholder="Cari Permintaan"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-sm"
                />
            </div>
            <DataTablePerbaikan data={history}  columns={columnsHistory}/>
        </div>
    </AppLayout>
  )
}
