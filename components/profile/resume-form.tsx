// react
import { FC, useState } from "react";

// react hook form
import { useForm } from "react-hook-form";

// framer-motion
import { motion } from "framer-motion";

// lucide icons
import {
  CheckCircle,
  Download,
  Edit,
  FileText,
  Plus,
  Save,
  Trash2,
  Upload,
  X,
} from "lucide-react";

// interfaces
import { IResume, IStudentProfile } from "@/interfaces";

// services
import { mediaService, profileService } from "@/services";

// components
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface IFormState {
  open: boolean;
  resume: IResume | null;
  file: File | null;
}

const ResumeForm: FC<{ data: IStudentProfile; mutate: () => void }> = ({
  data,
  mutate,
}) => {
  const { resumes } = data;

  const [formState, setFormState] = useState<IFormState>({
    open: false,
    resume: null,
    file: null,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IResume>();

  const handleAddNew = () => {
    setFormState({ open: true, resume: null, file: null });
  };

  const handleEdit = (resume: IResume) => {
    setFormState({ open: true, resume, file: null });
    reset({ ...resume });
  };

  const handleDelete = async (id: string) => {
    try {
      await profileService.deleteResume(id);
      mutate();
    } catch (error) {
      console.error("Error deleting resume:", error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormState({ ...formState, file });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const onSubmit = async (resumeData: IResume) => {
    try {
      if (formState.file) {
        const formData = new FormData();
        formData.append("file", formState.file);
        formData.append("asset_type", "resume");
        const response = await mediaService.uploadFile(formData);
        resumeData["file_url"] = response.display_url;
      }
      if (formState.resume?.id) {
        await profileService.updateResume(formState.resume.id, resumeData);
      } else {
        await profileService.createResume(resumeData);
      }
      mutate();
      reset();
      setFormState({ open: false, resume: null, file: null });
    } catch (error) {
      console.error("Error submitting resume:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="form-section-handshake">
        <div className="flex items-center justify-between mb-6">
          <h3 className="heading-handshake text-xl">
            <FileText className="w-6 h-6 text-primary" />
            Resume & Documents
          </h3>
          <Button onClick={handleAddNew} className="btn-handshake btn-sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Resume
          </Button>
        </div>
        <div className="space-y-4">
          {resumes.map((resume, index) => (
            <motion.div
              key={resume.id || index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="dashboard-card-handshake p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-lg text-gray-900">
                        {resume.title}
                      </h4>
                      {resume.is_primary && (
                        <Badge className="badge-handshake">Primary</Badge>
                      )}
                    </div>

                    {resume.description && (
                      <p className="text-gray-600 mb-3">{resume.description}</p>
                    )}

                    {resume.file_url && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <FileText className="w-4 h-4" />
                        <span>Resume file uploaded</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 ml-4">
                    {resume.file_url && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="btn-secondary btn-sm"
                        onClick={() =>
                          window.open(resume.file_url as string, "_blank")
                        }
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      onClick={() => handleEdit(resume)}
                      variant="outline"
                      size="sm"
                      className="btn-secondary btn-sm"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => resume.id && handleDelete(resume.id)}
                      variant="outline"
                      size="sm"
                      className="btn-secondary btn-sm text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {resumes.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No resumes uploaded yet.</p>
            </div>
          )}
        </div>

        <Dialog
          open={formState.open}
          onOpenChange={() =>
            setFormState({ open: false, resume: null, file: null })
          }
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="heading-handshake text-xl">
                {formState.resume ? "Edit Resume" : "Add Resume"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                type="text"
                label="Resume Title"
                name="title"
                register={register}
                error={errors.title}
                required
                placeholder="e.g., Software Engineer Resume"
              />

              <FormField
                type="textarea"
                label="Description (Optional)"
                name="description"
                register={register}
                placeholder="Brief description of this resume..."
                rows={3}
              />

              <div className="space-y-2">
                <Label
                  htmlFor="file"
                  className="text-sm font-medium text-gray-700"
                >
                  Upload Resume File
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    id="file"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="file" className="cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600 mb-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PDF, DOC, or DOCX (max 10MB)
                    </p>
                    {formState.file && (
                      <div className="mt-3 p-2 bg-green-50 rounded border border-green-200">
                        <div className="flex items-center gap-2 text-sm text-green-700">
                          <CheckCircle className="w-4 h-4" />
                          {formState.file.name} (
                          {formatFileSize(formState.file.size)})
                        </div>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id="is_primary"
                  type="checkbox"
                  {...register("is_primary")}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <Label
                  htmlFor="is_primary"
                  className="text-sm font-medium text-gray-700"
                >
                  Set as primary resume
                </Label>
              </div>
              <div className="action-buttons-handshake">
                <Button
                  type="button"
                  onClick={() =>
                    setFormState({ open: false, resume: null, file: null })
                  }
                  className="btn-secondary"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button type="submit" className="btn-handshake">
                  <Save className="w-4 h-4 mr-2" />
                  {formState.resume ? "Update Resume" : "Add Resume"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </motion.div>
  );
};
export default ResumeForm;
