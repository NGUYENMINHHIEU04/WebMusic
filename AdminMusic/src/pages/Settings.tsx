
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Settings = () => {
  const [language, setLanguage] = useState("vietnamese");
  const [autoPlay, setAutoPlay] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [quality, setQuality] = useState("high");
  
  const [siteName, setSiteName] = useState("Quản lý Âm nhạc");
  const [siteEmail, setSiteEmail] = useState("admin@example.com");
  
  const handleSaveGeneralSettings = () => {
    toast.success("Đã lưu cài đặt chung thành công");
  };
  
  const handleSaveAppearanceSettings = () => {
    toast.success("Đã lưu cài đặt giao diện thành công");
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Cài đặt</h1>
        <p className="text-muted-foreground">
          Quản lý cài đặt và tùy chọn của ứng dụng
        </p>
      </div>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general">Chung</TabsTrigger>
          <TabsTrigger value="appearance">Giao diện</TabsTrigger>
          <TabsTrigger value="audio">Âm thanh</TabsTrigger>
          <TabsTrigger value="about">Giới thiệu</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <Card>
              <CardHeader>
                <CardTitle>Cài đặt chung</CardTitle>
                <CardDescription>
                  Quản lý các cài đặt chung của ứng dụng
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Tên trang web</Label>
                  <Input
                    id="site-name"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="site-email">Email liên hệ</Label>
                  <Input
                    id="site-email"
                    type="email"
                    value={siteEmail}
                    onChange={(e) => setSiteEmail(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language">Ngôn ngữ</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn ngôn ngữ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vietnamese">Tiếng Việt</SelectItem>
                      <SelectItem value="english">Tiếng Anh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="notifications">Thông báo</Label>
                    <p className="text-sm text-muted-foreground">
                      Hiện thông báo khi có cập nhật mới
                    </p>
                  </div>
                  <Switch
                    id="notifications"
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveGeneralSettings}>Lưu thay đổi</Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="appearance">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <Card>
              <CardHeader>
                <CardTitle>Cài đặt giao diện</CardTitle>
                <CardDescription>
                  Tùy chỉnh giao diện và hiển thị của ứng dụng
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div 
                    className="border rounded-lg p-4 flex items-center justify-center flex-col cursor-pointer hover:border-primary transition-colors"
                    onClick={() => toast.info("Chức năng đang được phát triển")}
                  >
                    <div className="w-full h-24 bg-white rounded mb-2"></div>
                    <span className="text-sm">Sáng</span>
                  </div>
                  
                  <div 
                    className="border rounded-lg p-4 flex items-center justify-center flex-col cursor-pointer hover:border-primary transition-colors"
                    onClick={() => toast.info("Chức năng đang được phát triển")}
                  >
                    <div className="w-full h-24 bg-slate-900 rounded mb-2"></div>
                    <span className="text-sm">Tối</span>
                  </div>
                  
                  <div 
                    className="border rounded-lg p-4 flex items-center justify-center flex-col cursor-pointer hover:border-primary transition-colors"
                    onClick={() => toast.info("Chức năng đang được phát triển")}
                  >
                    <div className="w-full h-24 bg-gradient-to-b from-white to-slate-900 rounded mb-2"></div>
                    <span className="text-sm">Hệ thống</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveAppearanceSettings}>Lưu thay đổi</Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="audio">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <Card>
              <CardHeader>
                <CardTitle>Cài đặt âm thanh</CardTitle>
                <CardDescription>
                  Tùy chỉnh cài đặt phát lại và chất lượng âm thanh
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="autoplay">Tự động phát</Label>
                    <p className="text-sm text-muted-foreground">
                      Tự động phát bài hát tiếp theo
                    </p>
                  </div>
                  <Switch
                    id="autoplay"
                    checked={autoPlay}
                    onCheckedChange={setAutoPlay}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="quality">Chất lượng âm thanh</Label>
                  <Select value={quality} onValueChange={setQuality}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn chất lượng" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Thấp (64kbps)</SelectItem>
                      <SelectItem value="medium">Trung bình (128kbps)</SelectItem>
                      <SelectItem value="high">Cao (256kbps)</SelectItem>
                      <SelectItem value="veryhigh">Rất cao (320kbps)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => toast.success("Đã lưu cài đặt âm thanh thành công")}>
                  Lưu thay đổi
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="about">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <Card>
              <CardHeader>
                <CardTitle>Giới thiệu</CardTitle>
                <CardDescription>
                  Thông tin về ứng dụng quản lý âm nhạc
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Phiên bản</h3>
                  <p className="text-sm text-muted-foreground">v1.0.0</p>
                </div>
                
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Giấy phép</h3>
                  <p className="text-sm text-muted-foreground">MIT License</p>
                </div>
                
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Công nghệ sử dụng</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>React / TypeScript</li>
                    <li>Tailwind CSS</li>
                    <li>Vite</li>
                    <li>ShadcnUI</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" onClick={() => toast.info("Chức năng đang được phát triển")}>
                  Kiểm tra cập nhật
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
