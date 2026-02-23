'use client';

import { CircleCheck, CircleX, Plus, Search, Tags, Trash2 } from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import React, { useEffect, useState } from 'react';
import { Tag } from '@/lib/interfaces';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, TextInput } from 'flowbite-react';
import { Button } from '@/components/ui/button';
import { addTag, delTag, getAllTags } from '@/lib/api/tag';
import { toast } from 'react-toastify';

export default function TagsPage() {
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [results, setResults] = useState<Tag[]>([]);
  const [editingTag, setEditingTag] = useState<Tag | undefined>();
  const [editingTagName, setEditingTagName] = useState<string>('');
  useEffect(() => {
    fetchTagsFromApi();
  }, []);
  const fetchTagsFromApi =()=>{
  getAllTags().then(data =>{
    setAllTags(data as Tag[]);
    setResults(data as Tag[]);
  });
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const keyword = e.target.value.trim().toLowerCase();
        const results = allTags.filter(tag =>{
          return tag.name.toLowerCase().includes(keyword);
        })
        setResults(results);
  };
  const handleDelClick = (currentId?: number)=>{
    if(currentId){
      if (confirm("Are you sure to delete this tag?")){
        delTag(String(currentId)).then(data=>{
          if (data) {
            fetchTagsFromApi();
            toast.success('The tag has been deleted successfully');
          } else {
            toast.error('Error: cannot delete the tag, because still in use.');
          }
        })
      }
    }
  }
  const handleAddClick = () =>{
          const newTag = { id: 1000, name: editingTagName };
          setResults([...allTags, newTag]);
          setEditingTag(newTag);
  }
  const handleTagNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingTagName(e.target.value);
  };
  const handleSaveClick =() =>{
    const newTag: Tag = { ...editingTag, name: editingTagName };
      if (newTag){
          addTag(newTag).then(() => {
            fetchTagsFromApi();
            toast.success('The tag has been added.');
          });
      }
  }
  return (
    <>
      <AdminHeader title="Tags" icon={<Tags />} subtitle="Manage Tags" />
      <div className="flex justify-between m-8 pr-5">
        <TextInput
          type="text"
          icon={Search}
          placeholder="Search Tags..."
          className="w-[550px] bg-black"
          onChange={handleSearchChange}
        />
        <Button variant="cta" size="sm" onClick={handleAddClick}>
          <Plus className="mr-2 h-5 w-5" />
          Add Tag
        </Button>
      </div>
      <div className="m-8">
        <Table striped>
          <TableHead>
            <TableRow>
              <TableHeadCell>Id</TableHeadCell>
              <TableHeadCell>Tag Name</TableHeadCell>
              <TableHeadCell>Action</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map(tag => (
              <TableRow key={tag.id}>
                <TableCell>{tag.id}</TableCell>
                {editingTag === tag && (
                  <TableCell>
                    <div className="flex">
                      <TextInput
                        type="text"
                        value={editingTagName}
                        onChange={handleTagNameChange}
                      ></TextInput>
                      <button onClick={handleSaveClick}>
                        <CircleCheck />
                      </button>
                      <button onClick={() => setEditingTag(undefined)}>
                        <CircleX />
                      </button>
                    </div>
                  </TableCell>
                )}
                {editingTag !== tag && <TableCell>{tag.name}</TableCell>}
                <TableCell>
                  <button onClick={() => handleDelClick(tag.id)}>
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
