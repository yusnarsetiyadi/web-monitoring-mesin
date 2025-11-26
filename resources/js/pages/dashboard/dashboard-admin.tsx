import { CardDashboard } from '@/components/card-dashboard';
import DashboardCardList from '@/components/cardlist-dashboard';
import DashboardAreaChart from '@/components/dashboard-areachart';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { DashboardByRole } from '@/types';
import { CloudLightning, Cog, Hammer, Users2 } from 'lucide-react';

export default function DashboardUser({jumlahMesin, jumlahUser, totalPerbaikan, totalKerusakanBulanIni, listTeknisi, kerusakanTerbaru}: DashboardByRole) {
    return (
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
            <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <CardDashboard
                        cardTitle={jumlahMesin.toString()}
                        cardDescription="Jumlah Mesin"
                        cardAction={Cog} 
                        footerTitle="🔍 Cek Mesin"
                        footerDescription="Selalu update kondisi mesin"
                    />
                </div>
                <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <CardDashboard
                        cardTitle={jumlahUser.toString()}
                        cardDescription="Jumlah User"
                        cardAction={Users2} 
                        footerTitle="👥 Manajemen User"
                        footerDescription="Atur hak akses dan role"
                    />
                </div>
                <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                <CardDashboard
                        cardTitle={totalPerbaikan.toString()}
                        cardDescription="Total Perbaikan "
                        cardAction={Hammer} 
                        footerTitle="🛠 Perbaikan Tuntas"
                        footerDescription="Semua catatan terdokumentasi"
                    />
                </div>
                <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                <CardDashboard
                        cardTitle={totalKerusakanBulanIni.toString()}
                        cardDescription="Total Kerusakan Bulan Ini"
                        cardAction={CloudLightning} 
                        footerTitle="⚡ Respon Cepat"
                        footerDescription="Kerusakan langsung ditangani"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
            <div className="relative bg-primary-foreground p-4 rounded-lg">
                <DashboardCardList  title="Teknisi yang tersedia"
                    type="teknisi"
                    items={listTeknisi}/>
                {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
            </div>
            <div className="relative bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
                <DashboardAreaChart />
                {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
            </div>
            <div className="relative bg-primary-foreground p-4 rounded-lg">
                <DashboardCardList  title="Kerusakan Terbaru"
                    type="kerusakan"
                    items={kerusakanTerbaru}/>
                {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
            </div>
        </div>             
    </div>
    );
}
