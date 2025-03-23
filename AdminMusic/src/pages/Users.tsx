
import React, { useState } from "react";
import { useData } from "@/context/DataContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FileUpload from "@/components/FileUpload";
import { User, Users, Edit, Trash, PlusCircle, MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const UsersPage = () => {
  const { users, addUser, updateUser, deleteUser } = useData();
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"admin" | "user">("user");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  
  const handleAddUser = () => {
    if (!name || !email) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    
    // Kiểm tra email hợp lệ
    if (!validateEmail(email)) {
      toast.error("Email không hợp lệ");
      return;
    }
    
    // Kiểm tra email đã tồn tại
    if (users.some(user => user.email === email)) {
      toast.error("Email đã được sử dụng");
      return;
    }
    
    addUser({
      name,
      email,
      role,
      avatar: avatar || undefined
    });
    
    resetForm();
    setIsAddDialogOpen(false);
  };
  
  const handleEditUser = () => {
    if (!selectedUser || !name || !email) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    
    // Kiểm tra email hợp lệ
    if (!validateEmail(email)) {
      toast.error("Email không hợp lệ");
      return;
    }
    
    // Kiểm tra email đã tồn tại (trừ email hiện tại)
    const currentUser = users.find(user => user.id === selectedUser);
    if (users.some(user => user.email === email && user.id !== selectedUser)) {
      toast.error("Email đã được sử dụng");
      return;
    }
    
    const updates: any = { name, email, role };
    
    if (avatar !== null) {
      updates.avatar = avatar || undefined;
    }
    
    updateUser(selectedUser, updates);
    
    resetForm();
    setIsEditDialogOpen(false);
  };
  
  const handleDeleteUser = () => {
    if (selectedUser) {
      deleteUser(selectedUser);
      setIsDeleteDialogOpen(false);
    }
  };
  
  const resetForm = () => {
    setName("");
    setEmail("");
    setRole("user");
    setAvatar(null);
    setSelectedUser(null);
  };
  
  const prepareUserEdit = (user: any) => {
    setSelectedUser(user.id);
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setAvatar(user.avatar || null);
    setIsEditDialogOpen(true);
  };
  
  const prepareUserDelete = (userId: string) => {
    setSelectedUser(userId);
    setIsDeleteDialogOpen(true);
  };
  
  const handleAvatarChange = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatar(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  const sortedUsers = [...users].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Người dùng</h1>
          <p className="text-muted-foreground">
            Quản lý tất cả người dùng của bạn
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="gap-1">
          <PlusCircle className="w-4 h-4" /> Thêm người dùng
        </Button>
      </div>
      
      {/* Users list */}
      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        {sortedUsers.length > 0 ? (
          <div className="divide-y">
            {sortedUsers.map((user) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center p-4 hover:bg-secondary/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden bg-primary/10 mr-4 flex items-center justify-center">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-5 h-5 text-primary" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium truncate">{user.name}</h3>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
                
                <div className="mr-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${
                    user.role === "admin" 
                      ? "bg-blue-100 text-blue-800" 
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    {user.role === "admin" ? "Quản trị viên" : "Người dùng"}
                  </span>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => prepareUserEdit(user)}>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Chỉnh sửa</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => prepareUserDelete(user.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      <span>Xóa</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Không có người dùng nào</h3>
            <p className="text-muted-foreground mb-4">
              Bạn chưa có người dùng nào. Hãy thêm người dùng đầu tiên!
            </p>
            <Button onClick={() => setIsAddDialogOpen(true)}>Thêm người dùng</Button>
          </div>
        )}
      </div>
      
      {/* Add user dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Thêm người dùng mới</DialogTitle>
            <DialogDescription>
              Thêm người dùng mới vào hệ thống
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Tên người dùng</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập tên người dùng"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="role">Vai trò</Label>
              <Select value={role} onValueChange={(value: any) => setRole(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn vai trò" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Người dùng</SelectItem>
                  <SelectItem value="admin">Quản trị viên</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label>Ảnh đại diện (không bắt buộc)</Label>
              <FileUpload
                accept="image/*"
                onChange={handleAvatarChange}
                label="Tải lên ảnh đại diện"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              resetForm();
              setIsAddDialogOpen(false);
            }}>
              Hủy
            </Button>
            <Button onClick={handleAddUser}>Thêm người dùng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit user dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa người dùng</DialogTitle>
            <DialogDescription>
              Chỉnh sửa thông tin người dùng
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Tên người dùng</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập tên người dùng"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="role">Vai trò</Label>
              <Select value={role} onValueChange={(value: any) => setRole(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn vai trò" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Người dùng</SelectItem>
                  <SelectItem value="admin">Quản trị viên</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label>Ảnh đại diện (không bắt buộc)</Label>
              <FileUpload
                accept="image/*"
                onChange={handleAvatarChange}
                label="Tải lên ảnh đại diện mới"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              resetForm();
              setIsEditDialogOpen(false);
            }}>
              Hủy
            </Button>
            <Button onClick={handleEditUser}>Lưu thay đổi</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete user dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa người dùng này không? Thao tác này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Hủy
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersPage;
