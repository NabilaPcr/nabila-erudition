import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Loading from "../components/Loading";
import { userAPI } from "../services/userAPI";

// Import Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function User() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [alert, setAlert] = useState(null);
  
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "staff",
    status: "active"
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Starting to fetch users...');
      const data = await userAPI.fetchUsers();
      console.log('Data received:', data);
      
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        console.error('Data is not an array:', data);
        setUsers([]);
        setError('Data user tidak valid');
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setError(error.message || 'Gagal memuat data user');
      setAlert({ 
        type: "error", 
        message: "Gagal memuat data user. Silahkan coba lagi." 
      });
    } finally {
      setLoading(false);
    }
  };

  const getRoleBadge = (role) => {
    switch(role) {
      case "admin":
        return <Badge variant="default" className="bg-red-500">Admin</Badge>;
      case "staff":
        return <Badge variant="secondary">Staff</Badge>;
      default:
        return <Badge variant="outline">{role || 'Unknown'}</Badge>;
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case "active":
        return <Badge variant="default" className="bg-green-500">Active</Badge>;
      case "inactive":
        return <Badge variant="destructive">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status || 'Unknown'}</Badge>;
    }
  };

  const filteredUsers = Array.isArray(users) ? users.filter((user) => {
    return searchTerm === "" || 
      user.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
  }) : [];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTambahUser = async () => {
    if (!formData.fullname || !formData.email || !formData.password) {
      setAlert({ type: "error", message: "Semua field harus diisi!" });
      setTimeout(() => setAlert(null), 3000);
      return;
    }

    try {
      const newUser = {
        fullname: formData.fullname,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        status: formData.status,
        created_at: new Date().toISOString()
      };

      const created = await userAPI.createUser(newUser);
      setUsers([...users, created]);
      setDialogOpen(false);
      setFormData({
        fullname: "",
        email: "",
        password: "",
        role: "staff",
        status: "active"
      });
      setAlert({ 
        type: "success", 
        message: `User ${created.fullname} berhasil ditambahkan!` 
      });
      setTimeout(() => setAlert(null), 3000);
    } catch (error) {
      console.error("Error creating user:", error);
      setAlert({ type: "error", message: "Gagal menambahkan user!" });
      setTimeout(() => setAlert(null), 3000);
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setFormData({
      fullname: user.fullname || "",
      email: user.email || "",
      password: "",
      role: user.role || "staff",
      status: user.status || "active"
    });
    setEditDialogOpen(true);
  };

  const handleUpdateUser = async () => {
    if (!formData.fullname || !formData.email) {
      setAlert({ type: "error", message: "Nama dan email harus diisi!" });
      setTimeout(() => setAlert(null), 3000);
      return;
    }

    try {
      const updateData = {
        fullname: formData.fullname,
        email: formData.email,
        role: formData.role,
        status: formData.status
      };

      if (formData.password) {
        updateData.password = formData.password;
      }

      const updated = await userAPI.updateUser(selectedUser.id, updateData);
      setUsers(users.map(u => u.id === updated.id ? updated : u));
      setEditDialogOpen(false);
      setAlert({ 
        type: "success", 
        message: `User ${updated.fullname} berhasil diupdate!` 
      });
      setTimeout(() => setAlert(null), 3000);
    } catch (error) {
      console.error("Error updating user:", error);
      setAlert({ type: "error", message: "Gagal mengupdate user!" });
      setTimeout(() => setAlert(null), 3000);
    }
  };

  const handleHapusUser = async (id, fullname) => {
    try {
      await userAPI.deleteUser(id);
      setUsers(users.filter(user => user.id !== id));
      setAlert({ 
        type: "warning", 
        message: `User ${fullname} telah dihapus!` 
      });
      setTimeout(() => setAlert(null), 3000);
    } catch (error) {
      console.error("Error deleting user:", error);
      setAlert({ type: "error", message: "Gagal menghapus user!" });
      setTimeout(() => setAlert(null), 3000);
    }
  };

  if (loading) {
    return <Loading text="Memuat data user..." />;
  }

  return (
    <div className="animate-fade-in">
      <PageHeader title="Manajemen User" subtitle="Manajemen > Data User" />

      {error && (
        <div className="mb-4 p-4 rounded-lg bg-red-100 text-red-800">
          <p className="font-bold">Error:</p>
          <p>{error}</p>
          <Button 
            variant="outline" 
            onClick={fetchUsers}
            className="mt-2"
          >
            Coba Lagi
          </Button>
        </div>
      )}

      {alert && (
        <div className={`mb-4 p-4 rounded-lg ${
          alert.type === "success" ? "bg-green-100 text-green-800" :
          alert.type === "error" ? "bg-red-100 text-red-800" :
          "bg-yellow-100 text-yellow-800"
        }`}>
          {alert.message}
        </div>
      )}

      <div className="bg-white rounded-[35px] p-8 shadow-sm border border-gray-50 mt-6">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Input
              type="text"
              placeholder="Cari user berdasarkan nama atau email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/622/622669.png"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30"
              alt="search"
            />
          </div>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="default" className="bg-red-500 hover:bg-red-600">
                + Tambah User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Tambah User Baru</DialogTitle>
                <DialogDescription>
                  Isi data user dengan lengkap. Klik simpan ketika sudah selesai.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="fullname" className="text-right">Nama Lengkap</Label>
                  <Input
                    id="fullname"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleInputChange}
                    className="col-span-3"
                    placeholder="John Doe"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="col-span-3"
                    placeholder="john@apotek.com"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="col-span-3"
                    placeholder="Minimal 6 karakter"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">Role</Label>
                  <Select 
                    value={formData.role}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Pilih role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">Status</Label>
                  <Select 
                    value={formData.status}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Batal</Button>
                <Button variant="default" onClick={handleTambahUser} className="bg-red-500">Simpan</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Debug Info */}
        <div className="mb-4 p-2 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">
            Total Users: {users.length} | Filtered: {filteredUsers.length}
          </p>
          <button 
            onClick={fetchUsers}
            className="text-xs text-blue-500 hover:underline"
          >
            Refresh Data
          </button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Nama Lengkap</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tanggal Daftar</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan="7" className="text-center text-gray-500 py-8">
                    {searchTerm ? "User tidak ditemukan" : "Belum ada data user"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user, index) => (
                  <TableRow key={user.id || index}>
                    <TableCell className="text-gray-500">{index + 1}</TableCell>
                    <TableCell className="font-bold text-gray-800">{user.fullname || '-'}</TableCell>
                    <TableCell className="text-gray-500">{user.email || '-'}</TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell className="text-gray-500 text-sm">
                      {user.created_at ? new Date(user.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      }) : '-'}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEditUser(user)}
                          className="text-blue-500 hover:text-blue-700 text-sm"
                        >
                          Edit
                        </button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button className="text-red-500 hover:text-red-700 text-sm ml-2">
                              Hapus
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Yakin hapus user ini?</AlertDialogTitle>
                              <AlertDialogDescription>
                                User <span className="font-bold">{user.fullname}</span> akan dihapus secara permanen.
                                Tindakan ini tidak bisa dibatalkan.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleHapusUser(user.id, user.fullname)}>
                                Ya, Hapus
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          Menampilkan {filteredUsers.length} dari {users.length} data user
        </div>
      </div>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Edit data user. Biarkan password kosong jika tidak ingin mengubah.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-fullname" className="text-right">Nama Lengkap</Label>
              <Input
                id="edit-fullname"
                name="fullname"
                value={formData.fullname}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-email" className="text-right">Email</Label>
              <Input
                id="edit-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-password" className="text-right">Password</Label>
              <Input
                id="edit-password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="Kosongkan jika tidak diubah"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-role" className="text-right">Role</Label>
              <Select 
                value={formData.role}
                onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-status" className="text-right">Status</Label>
              <Select 
                value={formData.status}
                onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Batal</Button>
            <Button variant="default" onClick={handleUpdateUser} className="bg-red-500">Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}