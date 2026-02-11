'use client';
import {useParams, useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {createUser, fetchUserById} from "@/lib/api/user";
import {User} from "@/lib/interfaces";
import {Card, Label, Select, TextInput} from "flowbite-react";
import {Button} from "@/components/ui/button";
import {toast} from "react-toastify";

export default function Page() {
    const [user, setUser] = useState<User>({
        email: "",
        password: "",
        firstName: "",
        fullName: "",
        lastName: "",
        role: "customer",
        username: "",
        favouredEquipments: [],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>) => {
        setUser({...user, [e.target.id]: e.target.value})
    };
    const onSave = () => {
        console.log('========》 onSave');
        user.fullName = undefined;
        createUser(user).then(data => {
            setUser(data as User);
            toast.success('The User has been added.');
        });

        router.push(`/admin/users`);
    };
    const router = useRouter();
    const onBack = () => {
        router.push(`/admin/users`);
    }

    return (
        <Card className="w-1/3 m-auto mt-16">
            <div className="flex max-w-md flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="username">Username</Label>
                    </div>
                    <TextInput id="username" type="text" sizing="sm" onChange={handleChange}/>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email">Email</Label>
                    </div>
                    <TextInput id="email" type="email" sizing="sm" onChange={handleChange}/>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password">Password</Label>
                    </div>
                    <TextInput id="password" type="password" sizing="sm" onChange={handleChange}/>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="firstname">Firstname</Label>
                    </div>
                    <TextInput id="firstName" type="text" sizing="sm" onChange={handleChange}/>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="lastname">Lastname</Label>
                    </div>
                    <TextInput id="lastName" type="text" sizing="sm" onChange={handleChange}/>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="role">Select Role</Label>
                    </div>
                    <Select id="role" required onChange={handleChange}>
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                    </Select>
                </div>
                <div className="flex justify-evenly">
                    <Button onClick={onSave}>Save</Button>
                    <Button onClick={onBack} variant="secondary">Back</Button>
                </div>
            </div>
        </Card>
    );
}