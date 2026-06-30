'use client';

import { Bone, CircleCheck, CircleX, Plus, Search, Trash2 } from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import React, { useEffect, useState } from 'react';
import { Muscle } from '@/lib/interfaces';
import { createMuscle, deleteMuscle, getAllMusclesInPage } from '@/lib/api/muscle';
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
import { toast } from 'react-toastify';
import { Pagination } from 'flowbite-react';

export default function MusclesPage() {
  const [muscles, setMuscles] = useState<Muscle[]>([]);
  const [editingMuscle, setEditingMuscle] = useState<Muscle>();
  const [editingMuscleName, setEditingMuscleName] = useState<string>('');
  const [results, setResults] = useState<Muscle[]>([]);
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const PAGE_SIZE = 10;

  useEffect(() => {
    fetchAllMuscles(currentPage, keyword);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchAllMuscles(1, keyword);
    }, 500);
    return () => clearTimeout(timer);
  }, [keyword]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    fetchAllMuscles(page, keyword);
  };

  const fetchAllMuscles = (page: number, searchKeyword: string) => {
    getAllMusclesInPage(PAGE_SIZE, page - 1, searchKeyword).then(data => {
      setMuscles(data.content);
      setResults(data.content);
      setTotalPages(data.totalPages);
    });
  };

  const handleAddMuscle = () => {
    const newMuscle = { id: 0, name: editingMuscleName };
    setEditingMuscle(newMuscle);
    setResults([...muscles, newMuscle]);
  };

  const handleMuscleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingMuscleName(e.target.value);
  };

  const handleDel = (id: number) => {
    if (confirm('Are you sure to delete the muscle?')) {
      deleteMuscle(String(id)).then(data => {
        if (data) {
          fetchAllMuscles(currentPage, keyword);
          toast.success('The muscle has been deleted successfully');
        } else {
          toast.error('Cannot delete the muscle.');
        }
      });
    }
  };

  const handleSave = () => {
    const newMuscle: Muscle = { ...editingMuscle, name: editingMuscleName };
    createMuscle(newMuscle).then(() => {
      fetchAllMuscles(currentPage, keyword);
      toast.success('The muscle has been added.');
      setEditingMuscleName('');
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);
    setCurrentPage(1);
  };

  return (
    <>
      <AdminHeader title="Muscles" icon={<Bone />} subtitle="Manage Muscles" />
      <div className="flex justify-between m-8 pr-5">
        <TextInput
          type="text"
          icon={Search}
          placeholder="Search Muscles..."
          className="w-[550px] bg-black"
          onChange={handleSearchChange}
        />
        <Button variant="cta" size="sm" onClick={handleAddMuscle}>
          <Plus className="mr-2 h-5 w-5" />
          Add Muscle
        </Button>
      </div>
      <div>
        <Table striped>
          <TableHead>
            <TableRow>
              <TableHeadCell>Id</TableHeadCell>
              <TableHeadCell>Muscle Name</TableHeadCell>
              <TableHeadCell>Action</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map(m => (
              <TableRow key={m.id}>
                <TableCell>{m.id}</TableCell>
                <TableCell>
                  {editingMuscle?.id === m.id ? (
                    <div className="flex">
                      <TextInput
                        type="text"
                        value={editingMuscleName}
                        onChange={handleMuscleNameChange}
                      />
                      <button onClick={handleSave}>
                        <CircleCheck />
                      </button>
                      <button
                        onClick={() => {
                          setEditingMuscle(undefined);
                          setResults(results.filter(m => m.id !== 0));
                        }}
                      >
                        <CircleX />
                      </button>
                    </div>
                  ) : (
                    m.name
                  )}
                </TableCell>
                <TableCell>
                  <button onClick={() => handleDel(m.id!)}>
                    <Trash2 />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex overflow-x-auto sm:justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            showIcons
          />
        </div>
      </div>
    </>
  );
}
