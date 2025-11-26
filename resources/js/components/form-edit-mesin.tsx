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
import { useForm } from "@inertiajs/react"
import InputError from "./input-error"
import React, { useEffect } from "react"
import { Textarea } from "./ui/textarea"


export interface FormEditProps {
    id: string;
    kode_mesin: string;
    nama_mesin: string;
    lokasi: string;
    kategori: string;
    gambar_mesin?: string | null;
}

interface EditMesinProps {
    mesin?: FormEditProps; // Ubah dari array ke object tunggal dan buat optional
}

const EditMesin = ({mesin} : EditMesinProps) => {
    
    const { data, setData, post, processing, errors, reset } = useForm({
        kode_mesin: mesin?.kode_mesin ?? "",
        nama_mesin: mesin?.nama_mesin ?? "",
        lokasi: mesin?.lokasi ?? "",
        kategori: mesin?.kategori ?? "",
        gambar_mesin: null as File | null,
        _method: 'PUT',
    });

    useEffect(() => {
        if (mesin) {
            setData({
                kode_mesin: mesin.kode_mesin || '',
                nama_mesin: mesin.nama_mesin || '',
                lokasi: mesin.lokasi || '',
                kategori: mesin.kategori || '',
                gambar_mesin: null, // default null, user bisa upload baru
                _method: 'PUT'
            })
        }
    }, [mesin])


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // console.log("Submitting form with data:", data);
        post(`/mesin/${mesin?.id}`, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => reset(),
        });

    }
  return (
        <SheetContent>
            <SheetHeader>
                <SheetTitle className="mb-4">Edit Data Mesin</SheetTitle>
                <SheetDescription asChild className="scroll-smooth">
                <div className="overflow-y-auto max-h-[calc(100vh-120px)] pr-2">
                    <form className="space-y-8" onSubmit={handleSubmit}>
                        <div className="grid gap-2">
                            <Label htmlFor="kode_mesin">Kode Mesin</Label>
                            <Input
                                id="kode_mesin"
                                type="text"
                                autoFocus
                                autoComplete="kode_mesin"
                                value={data.kode_mesin}
                                onChange={(e) => setData('kode_mesin', e.target.value)}
                                placeholder="Kode Mesin ..."
                            />
                            <InputError message={errors.kode_mesin} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="nama_mesin">Nama Mesin</Label>
                            <Input
                                id="nama_mesin"
                                type="text"
                                autoFocus
                                autoComplete="nama_mesin"
                                value={data.nama_mesin}
                                onChange={(e) => setData('nama_mesin', e.target.value)}
                                placeholder="Nama Mesin ..."
                            />
                            <InputError message={errors.nama_mesin} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="kategori">Kategori</Label>
                            <Input
                                id="kategori"
                                autoFocus
                                autoComplete="kategori"
                                value={data.kategori}
                                onChange={(e) => setData('kategori', e.target.value)}
                                placeholder="Kategori Mesin ..."
                            />
                            <InputError message={errors.kategori} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="lokasi">Lokasi</Label>
                            <Textarea
                                id="lokasi"
                                autoFocus
                                autoComplete="lokasi"
                                value={data.lokasi}
                                onChange={(e) => setData('lokasi', e.target.value)}
                                placeholder="Lokasi Mesin ..."
                            />
                            <InputError message={errors.lokasi} />
                        </div>
                        {mesin?.gambar_mesin && (
                                    <div className="mt-2">
                                        <p className="text-xs text-gray-500 mb-1">Gambar saat ini:</p>
                                        <img
                                        src={`/storage/${mesin.gambar_mesin}`}
                                        alt={mesin.nama_mesin}
                                        className="w-32 h-32 object-cover rounded-lg border"
                                        />
                                    </div>
                                    )}
                        <div className="grid gap-2">
                                <Label htmlFor="gambar_mesin">Gambar Mesin</Label>
                                <Input
                                    id="gambar_mesin"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setData(
                                            "gambar_mesin",
                                            e.target.files
                                                ? e.target.files[0]
                                                : null
                                        )
                                    }
                                />
                                
                                <InputError message={errors.gambar_mesin} />
                            </div>

                            <Button type="submit">Submit</Button>
                    </form>
                </div>
                
                </SheetDescription>
            </SheetHeader>
        </SheetContent>
  )
}

export default EditMesin