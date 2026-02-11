'use client';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { deleteUserById, fetchUserById, updateUserById } from '@/lib/api/user';
import { User } from '@/lib/interfaces';
import { Card, Label, Select, TextInput } from 'flowbite-react';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';

export default function Page() {
  const [user, setUser] = useState<User>({
    email: '',
    password: '',
    firstName: '',
    fullName: '',
    id: 0,
    lastName: '',
    role: '',
    username: '',
    favouredEquipments: [],
  });
  const params = useParams();
  useEffect(() => {
    if (params.id) {
      fetchUserById(params.id as string).then((data: User) => {
        setUser(data as User);
      });
    }
  }, [params.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };
  const onSave = () => {
    if (params.id) {
      user.fullName = undefined;
      updateUserById(user).then(data => {
        setUser(data as User);
        toast.success('The User has been saved.');
        router.push(`/admin/users`);
      });
    }
  };
  const router = useRouter();
  const onDelete = () => {
    if (params.id) {
      user.fullName = undefined;
      if (confirm('Are you sure to delete the user?')) {
        deleteUserById(params.id as string).then(() => {
          toast.success('The user has been deleted.');
          router.push(`/admin/users`);
        });
      }
    }
  };
  const onBack = () => {
    router.push(`/admin/users`);
  };

  return (
    <Card className="w-1/3 m-auto mt-16">
      <div className="flex max-w-md flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="Id">User Id</Label>
          </div>
          <TextInput id="userId" type="text" sizing="sm" value={params.id} readOnly />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="username">Username</Label>
          </div>
          <TextInput
            id="username"
            type="text"
            sizing="sm"
            value={user.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email">Email</Label>
          </div>
          <TextInput
            id="email"
            type="email"
            sizing="sm"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password">Password</Label>
          </div>
          <TextInput
            id="password"
            type="password"
            sizing="sm"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="firstname">Firstname</Label>
          </div>
          <TextInput
            id="firstName"
            type="text"
            sizing="sm"
            value={user.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="lastname">Lastname</Label>
          </div>
          <TextInput
            id="lastName"
            type="text"
            sizing="sm"
            value={user.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="role">Select Role</Label>
          </div>
          <Select id="role" required value={user.role} onChange={handleChange}>
            <option value="admin">Admin</option>
            <option value="customer">Customer</option>
          </Select>
        </div>
        <div className="flex justify-evenly">
          <Button onClick={onSave}>Save</Button>
          <Button onClick={onDelete} variant="cta" className="bg-red-600">
            Delete
          </Button>
          <Button onClick={onBack} variant="secondary">
            Back
          </Button>
        </div>
      </div>
    </Card>
  );
}
