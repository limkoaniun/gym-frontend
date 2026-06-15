'use client';

import { Dumbbell, Plus, Search, SquarePen, Trash2 } from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
} from 'flowbite-react';
import { Equipment } from '@/lib/interfaces';
import { delEquipment, getAllEquipments } from '@/lib/api/equipment';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function EquipmentPage() {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [results, setResults] = useState<Equipment[]>([]);
  const [keyword, setKeyword] = useState('');

  const applySearch = (data: Equipment[], searchText: string) => {
    const keyword = searchText.trim().toLowerCase();

    if (!keyword) {
      setResults(data);
      return;
    }

    setResults(data.filter(equipment => equipment.name.toLowerCase().includes(keyword)));
  };

  const fetchEquipments = () => {
    getAllEquipments().then(data => {
      setEquipments(data);
      applySearch(data, keyword);
    });
  };

  useEffect(fetchEquipments, []);

  const handleDelClick = (currentId?: number) => {
    if (currentId) {
      if (confirm('Are you sure to delete this equipment?')) {
        delEquipment(String(currentId)).then(data => {
          if (data) {
            fetchEquipments();

            toast.success('The equipment has been deleted successfully');
          } else {
            toast.error('Cannot delete the Equipment.');
          }
        });
      }
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);
    applySearch(equipments, value);
  };

  return (
    <>
      <AdminHeader title="Equipments" icon={<Dumbbell />} subtitle="Manage Equipment" />
      <div className="flex justify-between  m-8 pr-5">
        <div>
          <TextInput
            type="text"
            icon={Search}
            placeholder="Search Equipment..."
            className="w-[550px] bg-black"
            onChange={handleSearchChange}
          />
        </div>
        <div>
          <Button variant="cta" size="sm">
            <Link href="equipments/create" className="flex">
              <Plus className="mr-2 h-5 w-5" /> Create
            </Link>
          </Button>
        </div>
      </div>
      <div className="m-8">
        <Table striped>
          <TableHead>
            <TableRow>
              <TableHeadCell>Id</TableHeadCell>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Description</TableHeadCell>
              <TableHeadCell>Image</TableHeadCell>
              <TableHeadCell>Action</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map(equipment => (
              <TableRow key={equipment.id}>
                <TableCell>{equipment.id}</TableCell>
                <TableCell>{equipment.name}</TableCell>
                <TableCell>{equipment.description}</TableCell>
                <TableCell>
                  <Image
                    src={`${API}/medias/${equipment.medias[0]?.id}`}
                    alt={equipment.name}
                    width={80}
                    height={80}
                    className="h-15 w-15"
                  />
                </TableCell>
                <TableCell className="flex mt-6">
                  <Trash2
                    className="me-3 cursor-pointer"
                    onClick={() => handleDelClick(equipment.id)}
                  />
                  <Link href={`/admin/equipments/${equipment.id}`}>
                    <SquarePen className="cursor-pointer" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
