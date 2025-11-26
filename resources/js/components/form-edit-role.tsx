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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


export interface FormEditRoleProps {
    id: string;
    name: string;
    email: string;
    role: string;  
}

interface EditUsersProps {
    user?: FormEditRoleProps; // Ubah dari array ke object tunggal dan buat optional
}

const EditRole = ({user} : EditUsersProps ) => {
    
    const { data, setData, put, processing, errors, reset } = useForm({
        role: '',
    });

    useEffect(() => {
        if (user) {
            setData({
                role: user.role || ''
            })
        }
    }, [user]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Data:', data);
        if (user) {
            put(`/users/${user.id}/role`, {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                },
                onError: (errors) => {
                    console.log('Error:', errors);
                }

            });
        }
    }

    const handleRoleChange = (value: string) => {
        setData('role', value);
    }
  return (
    <SheetContent>
    <SheetHeader>
        <SheetTitle className="mb-4">Change User Role</SheetTitle>
        <SheetDescription asChild className="scroll-smooth">
            <div className="overflow-y-auto max-h-[calc(100vh-120px)] pr-2">
                <form className="space-y-8" onSubmit={handleSubmit}>
                    {/* {user && (
                        <div className="space-y-2">
                            <p><strong>Name:</strong> {user.name}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Current Role:</strong> {user.role}</p>
                        </div>
                    )} */}
                    
                    <div className="grid gap-2">
                        <Label htmlFor="role">Roles</Label>
                        <Select value={data.role} onValueChange={handleRoleChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Change Role ..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="teknisi">Teknisi</SelectItem>
                                    <SelectItem value="operator">Operator</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.role} />
                    </div>
                    
                    <Button type="submit" disabled={processing}>
                        {processing ? 'Processing...' : 'Submit'}
                    </Button>
                </form>
            </div>
        </SheetDescription>
    </SheetHeader>
</SheetContent>
  )
}

export default EditRole