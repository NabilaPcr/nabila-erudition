import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Loading from "../components/Loading";
import { userAPI } from "../services/userAPI";
import Button from "../components/Button";
import Badge from "../components/Badge";
import InputField from "../components/InputField";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/Table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/Dialog";
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
} from "../components/AlertDialog";

export default function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [alert, setAlert] = useState(null);
  
  // Cek autentikasi dan role
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    
    try {
      const user = JSON.parse(userData);
      if (user.role !== 'admin') {
        navigate('/guest');
        return;
      }
    } catch (error) {
      localStorage.removeItem('user');
      navigate('/login');
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    name: "",        // ← ganti fullname → name
    email: "",
    password: "",
    role: "user"
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await userAPI.fetchUsers();
      console.log('✅ Users fetched:', data);
      
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        setUsers([]);
        setError('Data user tidak valid');
      }
    } catch (error) {
      console.error("❌ Error fetching users:", error);
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
      case "user":
        return <Badge variant="secondary">User</Badge>;
      default:
        return <Badge variant="outline">{role || 'Unknown'}</Badge>;
    }
  };

  // Filter users berdasarkan search
  const filteredUsers = Array.isArray(users) ? users.filter((user) => {
    return searchTerm === "" || 
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
  }) : [];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTambahUser = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      setAlert({ type: "error", message: "Semua field harus diisi!" });
      setTimeout(() => setAlert(null), 3000);
      return;
    }

    try {
      const emailExists = await userAPI.checkEmailExists(formData.email);
      if (emailExists) {
        setAlert({ type: "error", message: "Email sudah terdaftar!" });
        setTimeout(() => setAlert(null), 3000);
        return;
      }

      const newUser = {
        fullname: formData.name,  // ← API akan map ke 'name'
        email: formData.email,
        password: formData.password,
        role: formData.role
      };

      const created = await userAPI.createUser(newUser);
      setUsers([...users, created]);
      setDialogOpen(false);
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "user"
      });
      setAlert({ 
        type: "success", 
        message: `User ${created.name} berhasil ditambahkan!` 
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
      name: user.name || "",
      email: user.email || "",
      password: "",
      role: user.role || "user"
    });
    setEditDialogOpen(true);
  };

  const handleUpdateUser = async () => {
    if (!formData.name || !formData.email) {
      setAlert({ type: "error", message: "Nama dan email harus diisi!" });
      setTimeout(() => setAlert(null), 3000);
      return;
    }

    try {
      if (formData.email !== selectedUser.email) {
        const emailExists = await userAPI.checkEmailExists(formData.email);
        if (emailExists) {
          setAlert({ type: "error", message: "Email sudah digunakan user lain!" });
          setTimeout(() => setAlert(null), 3000);
          return;
        }
      }

      const updateData = {
        fullname: formData.name,
        email: formData.email,
        role: formData.role
      };

      if (formData.password) {
        updateData.password = formData.password;
      }

      const updated = await userAPI.updateUser(selectedUser.id, updateData);
      setUsers(users.map(u => u.id === updated.id ? updated : u));
      setEditDialogOpen(false);
      setAlert({ 
        type: "success", 
        message: `User ${updated.name} berhasil diupdate!` 
      });
      setTimeout(() => setAlert(null), 3000);
    } catch (error) {
      console.error("Error updating user:", error);
      setAlert({ type: "error", message: "Gagal mengupdate user!" });
      setTimeout(() => setAlert(null), 3000);
    }
  };

  const handleHapusUser = async (id, name) => {
    try {
      await userAPI.deleteUser(id);
      setUsers(users.filter(user => user.id !== id));
      setAlert({ 
        type: "warning", 
        message: `User ${name} telah dihapus!` 
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
          <Button variant="outline" onClick={fetchUsers} className="mt-2">
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
            <InputField
              type="text"
              placeholder="Cari user berdasarkan nama atau email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button type="danger">+ Tambah User</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah User Baru</DialogTitle>
                <DialogDescription>
                  Isi data user dengan lengkap. Klik simpan ketika sudah selesai.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <InputField
                  label="Nama Lengkap"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nama Lengkap"
                />
                <InputField
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="email@domain.com"
                />
                <InputField
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Minimal 6 karakter"
                />
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-apotek-merah focus:ring-2 focus:ring-apotek-merah/20 outline-none transition-all text-sm"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button type="outline" onClick={() => setDialogOpen(false)}>Batal</Button>
                <Button type="danger" onClick={handleTambahUser}>Simpan</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan="5" className="text-center text-gray-500 py-8">
                    {searchTerm ? "User tidak ditemukan" : "Belum ada data user"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user, index) => (
                  <TableRow key={user.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-bold text-gray-800">{user.name || '-'}</TableCell>
                    <TableCell className="text-gray-500">{user.email || '-'}</TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
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
                                User <span className="font-bold">{user.name}</span> akan dihapus permanen.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleHapusUser(user.id, user.name)}>
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

      {/* Dialog Edit User */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Edit data user. Biarkan password kosong jika tidak ingin mengubah.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <InputField
              label="Nama Lengkap"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <InputField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <InputField
              label="Password (kosongkan jika tidak diubah)"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Kosongkan jika tidak diubah"
            />
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-apotek-merah focus:ring-2 focus:ring-apotek-merah/20 outline-none transition-all text-sm"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button type="outline" onClick={() => setEditDialogOpen(false)}>Batal</Button>
            <Button type="danger" onClick={handleUpdateUser}>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}