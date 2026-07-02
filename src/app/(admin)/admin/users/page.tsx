'use client';

import { Users, Eye, Mail, Search, Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
} from 'flowbite-react';
import { Button } from '@/components/ui/button';
import { User } from '@/lib/interfaces';
import { getAllUsersInPage } from '@/lib/api/user';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function UsersPage() {
  const [results, setResults] = useState<User[]>([]);
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const PAGE_SIZE = 10;

  const router = useRouter();

  const handleAddUser = () => {
    router.push(`/admin/users/create`);
  };

  useEffect(() => {
    fetchUserFromApi(currentPage, keyword);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUserFromApi(1, keyword);
    }, 500);
    return () => clearTimeout(timer);
  }, [keyword]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    fetchUserFromApi(page, keyword);
  };

  const fetchUserFromApi = (page: number, searchKeyword: string) => {
    getAllUsersInPage(PAGE_SIZE, page - 1, searchKeyword).then(data => {
      setResults(data.content);
      setTotalPages(data.totalPages);
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);
    setCurrentPage(1);
  };

  return (
    <>
      <AdminHeader title="User" icon={<Users />} subtitle="Manage gym app users" />
      <div className="flex m-8 justify-between pr-5">
        <TextInput
          onChange={handleSearchChange}
          icon={Search}
          type="text"
          placeholder="Search users..."
          className="w-[550px] bg-black"
        />
        <Button variant="cta" size="sm" onClick={handleAddUser}>
          <Plus className="mr-2 h-5 w-5" />
          Add User
        </Button>
      </div>
      <div className="m-8">
        <Table striped>
          <TableHead>
            <TableHeadCell>Id</TableHeadCell>
            <TableHeadCell>Username</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Full Name</TableHeadCell>
            <TableHeadCell>Role</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {results.map((detail, user) => (
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800" key={user}>
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {detail.id}
                </TableCell>
                <TableCell>{detail.username}</TableCell>
                <TableCell className="flex">
                  <Mail className="mr-2.5" />
                  {detail.email}
                </TableCell>
                <TableCell>{detail.fullName}</TableCell>
                <TableCell>{detail.role}</TableCell>
                <TableCell className="flex">
                  <Link
                    href={`/admin/users/${detail.id}`}
                    className="font-medium text-primary-600 hover:underline dark:text-gray-400 mr-3"
                  >
                    <Eye />
                  </Link>
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
