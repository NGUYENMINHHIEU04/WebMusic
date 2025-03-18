
import React, { useState, useRef } from "react";
import { Upload, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onChange: (file: File) => void;
  accept?: string;
  maxSize?: number;
  label?: string;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onChange,
  accept = "audio/mpeg",
  maxSize = 10 * 1024 * 1024, // 10MB
  label = "Tải lên tập tin",
  className,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const validateFile = (file: File): boolean => {
    if (accept && !file.type.match(accept.replace("*", ""))) {
      setError(`Chỉ chấp nhận tập tin ${accept}`);
      return false;
    }
    
    if (maxSize && file.size > maxSize) {
      setError(`Tập tin phải nhỏ hơn ${maxSize / (1024 * 1024)}MB`);
      return false;
    }
    
    setError(null);
    return true;
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    if (validateFile(selectedFile)) {
      setFile(selectedFile);
      
      // Simulate upload
      setIsUploading(true);
      setTimeout(() => {
        setIsUploading(false);
        setIsSuccess(true);
        onChange(selectedFile);
        
        // Reset success state after some time
        setTimeout(() => {
          setIsSuccess(false);
        }, 2000);
      }, 1000);
    }
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files?.[0];
    if (!droppedFile) return;
    
    if (validateFile(droppedFile)) {
      setFile(droppedFile);
      
      // Simulate upload
      setIsUploading(true);
      setTimeout(() => {
        setIsUploading(false);
        setIsSuccess(true);
        onChange(droppedFile);
        
        // Reset success state after some time
        setTimeout(() => {
          setIsSuccess(false);
        }, 2000);
      }, 1000);
    }
  };
  
  const handleClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleClear = () => {
    setFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  
  return (
    <div className={className}>
      <div
        className={cn(
          "relative border-2 border-dashed rounded-lg p-6 transition-all",
          "hover:bg-secondary/50 cursor-pointer",
          isDragging ? "border-primary bg-secondary" : "border-border",
          error ? "border-destructive" : "",
          isSuccess ? "border-green-500" : "",
          className
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          accept={accept}
          onChange={handleFileChange}
        />

        <div className="flex flex-col items-center justify-center space-y-2">
          {isUploading ? (
            <div className="w-10 h-10 border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
          ) : isSuccess ? (
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
              <Check className="w-6 h-6 text-white" />
            </div>
          ) : (
            <Upload className="w-8 h-8 text-muted-foreground" />
          )}
          
          <div className="text-sm font-medium">{label}</div>
          
          <p className="text-xs text-muted-foreground">
            Kéo và thả hoặc click để tải lên
          </p>
          
          {file && (
            <div className="mt-2 text-xs flex items-center">
              <span className="truncate max-w-[200px]">{file.name}</span>
              <button
                type="button"
                className="ml-2 text-muted-foreground hover:text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
      
      {error && (
        <p className="mt-2 text-xs text-destructive">{error}</p>
      )}
    </div>
  );
};

export default FileUpload;
