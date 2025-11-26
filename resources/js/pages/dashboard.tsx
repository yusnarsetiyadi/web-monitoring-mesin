import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { pagePropsDashboard, SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import DashboardUser from './dashboard/dashboard-admin';
import DashboardOperator from './dashboard/dashboard-operator';
import DashboardTeknisi from './dashboard/dashboard-teknisi';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { jumlahMesin, jumlahUser, totalPerbaikan, totalKerusakanBulanIni, listTeknisi, kerusakanTerbaru }  = usePage<pagePropsDashboard>().props
    
    // Ambil data auth dari props yang di shared
    const { auth } = usePage<SharedData>().props;
    const userRole = auth.user.role;

    
    const renderByRole = () => {
        switch (userRole) {
            case 'admin':
                return <DashboardUser 
                jumlahMesin={jumlahMesin} 
                jumlahUser={jumlahUser} 
                totalPerbaikan={totalPerbaikan} 
                totalKerusakanBulanIni={totalKerusakanBulanIni} listTeknisi={listTeknisi} 
                kerusakanTerbaru={kerusakanTerbaru}/>
            case 'operator':
                return <DashboardOperator 
                jumlahMesin={jumlahMesin} 
                jumlahUser={jumlahUser} 
                totalPerbaikan={totalPerbaikan} 
                totalKerusakanBulanIni={totalKerusakanBulanIni} listTeknisi={listTeknisi} 
                kerusakanTerbaru={kerusakanTerbaru}
                />
            case 'teknisi':
                return <DashboardTeknisi 
                jumlahMesin={jumlahMesin} 
                jumlahUser={jumlahUser} 
                totalPerbaikan={totalPerbaikan} 
                totalKerusakanBulanIni={totalKerusakanBulanIni} listTeknisi={listTeknisi} 
                kerusakanTerbaru={kerusakanTerbaru}/>
            default:
                return (
                    <div className='text-center py-12'>
                        <h3 className='text-lg font-medium text-gray-900 mb-2'>
                            Role tidak diketahui
                        </h3>
                        <p className='text-gray-600'>
                            Silahkan hubungi administrator untuk mendapatkan akses yang sesuai.
                        </p>
                    </div>
                )
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            {renderByRole()}
        </AppLayout>
    );
}
