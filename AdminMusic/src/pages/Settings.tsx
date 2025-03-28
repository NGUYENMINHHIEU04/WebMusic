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
  
  const [siteName, setSiteName] = useState("Music Management");
  const [siteEmail, setSiteEmail] = useState("admin@example.com");
  
  const handleSaveGeneralSettings = () => {
    toast.success("General settings saved successfully");
  };
  
  const handleSaveAppearanceSettings = () => {
    toast.success("Appearance settings saved successfully");
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage application settings and preferences
        </p>
      </div>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="audio">Audio</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Manage general application settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Website Name</Label>
                  <Input
                    id="site-name"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="site-email">Contact Email</Label>
                  <Input
                    id="site-email"
                    type="email"
                    value={siteEmail}
                    onChange={(e) => setSiteEmail(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vietnamese">Vietnamese</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="notifications">Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Show notifications for new updates
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
                <Button onClick={handleSaveGeneralSettings}>Save Changes</Button>
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
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>
                  Customize the appearance and display of the application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div 
                    className="border rounded-lg p-4 flex items-center justify-center flex-col cursor-pointer hover:border-primary transition-colors"
                    onClick={() => toast.info("Feature under development")}
                  >
                    <div className="w-full h-24 bg-white rounded mb-2"></div>
                    <span className="text-sm">Light</span>
                  </div>
                  
                  <div 
                    className="border rounded-lg p-4 flex items-center justify-center flex-col cursor-pointer hover:border-primary transition-colors"
                    onClick={() => toast.info("Feature under development")}
                  >
                    <div className="w-full h-24 bg-slate-900 rounded mb-2"></div>
                    <span className="text-sm">Dark</span>
                  </div>
                  
                  <div 
                    className="border rounded-lg p-4 flex items-center justify-center flex-col cursor-pointer hover:border-primary transition-colors"
                    onClick={() => toast.info("Feature under development")}
                  >
                    <div className="w-full h-24 bg-gradient-to-b from-white to-slate-900 rounded mb-2"></div>
                    <span className="text-sm">System</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveAppearanceSettings}>Save Changes</Button>
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
                <CardTitle>Audio Settings</CardTitle>
                <CardDescription>
                  Customize playback settings and audio quality
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="autoplay">Autoplay</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically play the next song
                    </p>
                  </div>
                  <Switch
                    id="autoplay"
                    checked={autoPlay}
                    onCheckedChange={setAutoPlay}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="quality">Audio Quality</Label>
                  <Select value={quality} onValueChange={setQuality}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select quality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (64kbps)</SelectItem>
                      <SelectItem value="medium">Medium (128kbps)</SelectItem>
                      <SelectItem value="high">High (256kbps)</SelectItem>
                      <SelectItem value="veryhigh">Very High (320kbps)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => toast.success("Audio settings saved successfully")}>
                  Save Changes
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
                <CardTitle>About</CardTitle>
                <CardDescription>
                  Information about the music management application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Version</h3>
                  <p className="text-sm text-muted-foreground">v1.0.0</p>
                </div>
                
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Copyright</h3>
                  <p className="text-sm text-muted-foreground">LMH Music</p>
                </div>
                
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Technologies Used</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>React / TypeScript / JavaScript</li>
                    <li>Tailwind CSS</li>
                    <li>Vite</li>
                    <li>ShadcnUI</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" onClick={() => toast.info("Feature under development")}>
                  Check for Updates
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
