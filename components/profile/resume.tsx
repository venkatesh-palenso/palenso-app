import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Plus, Edit, Trash2, FileText, Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { mediaService, profileService } from "@/services";

interface Resume {
  id?: string;
  title: string;
  description?: string;
  file_url?: string;
  is_primary: boolean;
}

interface ResumeFormProps {
  data?: Resume[];
}

const ResumeForm: React.FC<ResumeFormProps> = ({ data = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingResume, setEditingResume] = useState<Resume | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Resume>();

  const handleAddNew = () => {
    setEditingResume(null);
    setSelectedFile(null);
    reset();
    setIsOpen(true);
  };

  const handleEdit = (resume: Resume) => {
    setEditingResume(resume);
    setSelectedFile(null);
    reset(resume);
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await profileService.deleteResume(id);
    } catch (error) {
      console.log("error deleting resume", error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const onSubmit = async (resumeData: Resume) => {
    try {
      try {
        if (selectedFile) {
          const formData = new FormData();
          formData.append("file", selectedFile);
          formData.append("asset_type", "resume");
          const response = await mediaService.uploadFile(formData);
          resumeData["file_url"] = response.display_url;
        }
      } catch (error) {
        console.log("error uploading file", error);
      }
      if (editingResume?.id) {
        await profileService.updateResume(editingResume.id, resumeData);
      } else {
        await profileService.createResume(resumeData);
      }
      setIsOpen(false);
      reset();
      setSelectedFile(null);
    } catch (error) {
      console.log("error submitting resume", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-4xl mx-auto"
    >
      <Card className="card-elevated">
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Resume</h3>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button
                    onClick={handleAddNew}
                    className="flex items-center gap-2 text-white"
                  >
                    <Plus className="h-4 w-4" />
                    Add Resume
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingResume ? "Edit Resume" : "Add Resume"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      label="Resume Title"
                      name="title"
                      type="text"
                      placeholder="e.g., Software Engineer Resume, Updated 2024"
                      required
                      register={register}
                      error={errors.title}
                    />

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Resume File</label>
                      <div className="relative">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          id="resume-file"
                        />
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 mb-2">
                            {selectedFile
                              ? selectedFile.name
                              : "Click to upload or drag and drop"}
                          </p>
                          <p className="text-xs text-gray-500 mb-4">
                            PDF, DOC, DOCX up to 10MB
                          </p>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="pointer-events-none"
                          >
                            Choose File
                          </Button>
                        </div>
                      </div>
                      {selectedFile && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FileText className="h-4 w-4" />
                          <span>{selectedFile.name}</span>
                          <span>({formatFileSize(selectedFile.size)})</span>
                        </div>
                      )}
                    </div>

                    <FormField
                      label="Description"
                      name="description"
                      type="textarea"
                      placeholder="Brief description of this resume version..."
                      rows={3}
                      register={register}
                      error={errors.description}
                    />

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="isPublic"
                        {...register("is_primary")}
                        className="rounded border-gray-300"
                      />
                      <label htmlFor="isPublic" className="text-sm">
                        Make this resume public (visible to employers)
                      </label>
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="text-white cursor-pointer"
                      >
                        {editingResume ? "Update" : "Save"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {data.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-500 text-center">
                    No resume files were added yet.
                  </p>
                  <p className="text-sm text-gray-400 text-center mt-2">
                    Click Add Resume to upload your resume.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {data.map((resume, index) => (
                  <Card key={resume.id || index} className="relative">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <CardTitle className="text-lg">
                              {resume.title}
                            </CardTitle>
                            {resume.is_primary && (
                              <Badge variant="secondary">Primary</Badge>
                            )}
                          </div>
                          {resume.description && (
                            <p className="text-gray-600 text-sm mb-2">
                              {resume.description}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {resume.file_url && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="cursor-pointer"
                              onClick={() => {
                                window.open(resume.file_url, "_blank");
                              }}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="cursor-pointer"
                            onClick={() => handleEdit(resume)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="cursor-pointer"
                            onClick={() => resume.id && handleDelete(resume.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ResumeForm;
