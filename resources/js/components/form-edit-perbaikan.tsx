" use client"
    import {
        SheetContent,
        SheetDescription,
        SheetHeader,
        SheetTitle,
    } from "@/components/ui/sheet"
    import { Input } from "@/components/ui/input"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { router, useForm } from "@inertiajs/react"
import InputError from "./input-error"
import React, { useEffect } from "react"
import { Textarea } from "./ui/textarea"


export interface FormEditProps {
    id: string
    kerusakan_id: string
    teknisi_id: string
    tindakan: string
    sparepart: string
    waktu_mulai: string
    waktu_selesai?: string
    catatan?: string   
}

interface EditPerbaikanProps {
    perbaikan?: FormEditProps; // Ubah dari array ke object tunggal dan buat optional
}

const UpdatePerbaikan = ({perbaikan} : EditPerbaikanProps) => {
    
    const { data, setData, put, processing, errors, reset } = useForm({
        id: perbaikan?.id || "",
        tindakan: perbaikan?.tindakan || "",
        sparepart: perbaikan?.sparepart || "",
        catatan: perbaikan?.catatan || "",
    });

    useEffect(() => {
        if (perbaikan) {
            setData({
                id: perbaikan.id,
                tindakan: perbaikan.tindakan || '',
                sparepart: perbaikan.sparepart || '',
                catatan: perbaikan.catatan || ''
            })
        }
    }, [perbaikan])


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // console.log('Data:', data);

        router.patch(
            route('perbaikan.update', perbaikan?.id),
            data,
            {
                onSuccess: () => {
                    console.log('Update successful')
                },
                onError: (errors) => {
                    console.log('Update failed: ', errors)
                }
            }
        )

    }
  return (
        <SheetContent>
            <SheetHeader>
                <SheetTitle className="mb-4">Form Penyelesaikan Perbaikan</SheetTitle>
                <SheetDescription asChild className="scroll-smooth">
                <div className="overflow-y-auto max-h-[calc(100vh-120px)] pr-2">
                    <form className="space-y-8" onSubmit={handleSubmit}>
                        <div className="grid gap-2">
                            {/* Tindakan */}
                            <Label htmlFor="tindakan">Tindakan</Label>
                            <Input
                                id="nama_mesin"
                                type="text"
                                required
                                autoFocus
                                autoComplete="tindakan"
                                value={data.tindakan}
                                onChange={(e) => setData('tindakan', e.target.value)}
                                placeholder="Tindakan yang dilakukan ..."
                            />
                            <InputError message={errors.tindakan} />
                        </div>
                        {/* Sparepart */}
                        <div className="grid gap-2">
                            <Label htmlFor="sparepart">Sparepart</Label>
                            <Input
                                id="sparepart"
                                required
                                autoFocus
                                autoComplete="sparepart"
                                value={data.sparepart}
                                onChange={(e) => setData('sparepart', e.target.value)}
                                placeholder="Sparepart yang di perlukan ..."
                            />
                            <InputError message={errors.sparepart} />
                        </div>
                        {/* Catatn */}
                        <div className="grid gap-2">
                            <Label htmlFor="catatan">Catatan</Label>
                            <Textarea
                                id="catatan"
                                autoComplete="catatan"
                                value={data.catatan}
                                onChange={(e) => setData("catatan", e.target.value)}
                                placeholder="Catatan tambahan ..."
                            />
                            <InputError message={errors.catatan} />
                        </div>
                            <Button type="submit">
                                {processing ? "Menyimpan..." : "Selesaikan Perbaikan"}
                            </Button>
                    </form>
                </div>
                
                </SheetDescription>
            </SheetHeader>
        </SheetContent>
  )
}

export default UpdatePerbaikan