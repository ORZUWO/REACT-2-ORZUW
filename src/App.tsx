import React, { useState } from "react";
import "./App.css";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";


const App = () => {
  const [users, setUsers] = useState([
  { id: 1, name: "Ali", age: 20, status: true, img: "https://i.pravatar.cc/100?img=1" },
  { id: 2, name: "John", age: 25, status: false, img: "https://i.pravatar.cc/100?img=2" },
  { id: 3, name: "Sara", age: 22, status: true, img: "https://i.pravatar.cc/100?img=3" },
  { id: 4, name: "Michael", age: 30, status: false, img: "https://i.pravatar.cc/100?img=4" },
  { id: 5, name: "Amina", age: 19, status: true, img: "https://i.pravatar.cc/100?img=5" },
  { id: 6, name: "David", age: 27, status: false, img: "https://i.pravatar.cc/100?img=6" },
  { id: 7, name: "Laylo", age: 23, status: true, img: "https://i.pravatar.cc/100?img=7" },
  { id: 8, name: "Zafar", age: 28, status: false, img: "https://i.pravatar.cc/100?img=8" },
]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [open, setOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState("");
  const [editIdx, setEditIdx] = useState(null);

  const edit = (user) => {
    setEditName(user.name);
    setEditAge(String(user.age));
    setEditIdx(user.id);
    setOpen(true);
  };

  const editForm = (e) => {
    e.preventDefault();

    setUsers(
      users.map((u) =>
        u.id === editIdx
          ? {
              ...u,
              name: editName,
              age: Number(editAge),
            }
          : u
      )
    );

    setOpen(false);
    setEditName("");
    setEditAge("");
    setEditIdx(null);
  };

  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const changeStatus = (id) => {
    setUsers(
      users.map((u) =>
        u.id === id ? { ...u, status: !u.status } : u
      )
    );
  };

  const filtered = users
    .filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((u) => {
      if (statusFilter === "all") return true;
      return String(u.status) === statusFilter;
    });

  return (
    <div className="p-5 w-[70%] m-auto mt-2">
      <Card className="mb-5">
        <CardContent className="flex gap-4 p-4">
          <Input
            placeholder="Search name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="true">Active</SelectItem>
              <SelectItem value="false">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Table>
        <TableCaption>Users</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>IMG</TableHead>
            <TableHead>NAME</TableHead>
            <TableHead>STATUS</TableHead>
            <TableHead>AGE</TableHead>
            <TableHead>ACTION</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filtered.map((u) => (
            <TableRow key={u.id}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={u.img} />
                </Avatar>
              </TableCell>

              <TableCell>{u.name}</TableCell>

              <TableCell>
                <Badge variant={u.status ? "default" : "destructive"}>
                  {u.status ? "ACTIVE" : "INACTIVE"}
                </Badge>
              </TableCell>

              <TableCell>{u.age}</TableCell>

              <TableCell>
                <div className="flex gap-2 items-center">
                  <Button variant="destructive" onClick={() => deleteUser(u.id)}>
                    Delete
                  </Button>

                  <Button onClick={() => edit(u)}>Edit</Button>

                  <Checkbox
                    checked={u.status}
                    onCheckedChange={() => changeStatus(u.id)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <form onSubmit={editForm}>
            <DialogHeader>
              <DialogTitle>Edit user</DialogTitle>
            </DialogHeader>

            <div className="grid gap-3">
              <div>
                <Label>Name</Label>
                <Input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </div>

              <div>
                <Label>Age</Label>
                <Input
                  type="number"
                  value={editAge}
                  onChange={(e) => setEditAge(e.target.value)}
                />
              </div>
            </div>

            <DialogFooter className="mt-4">
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default App;