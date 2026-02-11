'use client';

import { Bone, CircleCheck, CircleX, Plus, Search, SquarePen, Trash2 } from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import React, { useEffect, useState } from 'react';
import { Muscle } from '@/lib/interfaces';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
} from 'flowbite-react';
import { Button } from '@/components/ui/button';
import { getAllMuscles } from '@/lib/api/muscle';

export default function MusclePage() {
  const [allMuscles, setAllMuscles] = useState<Muscle[]>([]);
  const [results, setResults] = useState<Muscle[]>([]);
  const [editingMuscle, setEditingMuscle] = useState<Muscle | undefined>();
  const [editingMuscleName, setEditingMuscleName] = useState<string>('');
  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value.trim().toLowerCase();
    const arr = allMuscles.filter(muscle => {
      return muscle.name.toLowerCase().includes(keyword);
    });
    setResults(arr);
  };

  useEffect(() => {
    fetchMuscleFromApi();
  }, []);

  const fetchMuscleFromApi = () => {
    getAllMuscles().then(data => {
      setAllMuscles(data as Muscle[]);
      setResults(data as Muscle[]);
    });
  };
  const inputName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingMuscleName(e.target.value);
  };

  return (
    <>
      <AdminHeader title="Muscle" icon={<Bone />} subtitle="Manage Muscle" />
      <div className="flex m-8 justify-between pr-5">
        <TextInput
          onChange={handleKeywordChange}
          icon={Search}
          type="text"
          placeholder="Search Muscles..."
          className="w-[550px] bg-black"
        />
        <Button variant="cta" size="sm">
          <Plus className="mr-2 h-5 w-5" />
          Add Training
        </Button>
      </div>
      <div className="m-8">
        <Table striped>
          <TableHead>
            <TableHeadCell>Id</TableHeadCell>
            <TableHeadCell>Muscle Training Name</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {results.map(muscle => (
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800" key={muscle.id}>
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {muscle.id}
                </TableCell>
                {editingMuscle === muscle && (
                  <TableCell>
                    <div className="flex ml-5 gap-10">
                      <TextInput
                        type="text"
                        value={editingMuscleName}
                        onChange={inputName}
                        className="w-48"
                        sizing="sm"
                      ></TextInput>
                      <button>
                        <CircleCheck />
                      </button>
                      <button onClick={() => setEditingMuscle(undefined)}>
                        <CircleX />
                      </button>
                    </div>
                  </TableCell>
                )}
                {editingMuscle !== muscle && <TableCell>{muscle.name}</TableCell>}
                <TableCell className="flex">
                  <button
                    onClick={() => {
                      setEditingMuscle(muscle);
                      setEditingMuscleName(muscle.name);
                    }}
                    className="font-medium text-primary-600 hover:underline dark:text-gray-400 mr-3"
                  >
                    <SquarePen onClick={() => setEditingMuscle(muscle)} />
                  </button>
                  <button>
                    <Trash2 />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
