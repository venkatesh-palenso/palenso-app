// react
import { FC, useState } from "react";

// react hook form
import { useForm } from "react-hook-form";

// date fns
import { format } from "date-fns";

// framer-motion
import { motion } from "framer-motion";

// lucide icons
import {
  Calendar,
  Code,
  Edit,
  ExternalLink,
  Globe,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";

// interfaces
import { IProject, IStudentProfile } from "@/interfaces";

// services
import { profileService } from "@/services";

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
  project: IProject | null;
}

const ProjectForm: FC<{ data: IStudentProfile; mutate: () => void }> = ({
  data,
  mutate,
}) => {
  const { projects } = data;

  const [formState, setFormState] = useState<IFormState>({
    open: false,
    project: null,
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<IProject>();

  const handleAddNew = () => {
    setFormState({ open: true, project: null });
  };

  const handleEdit = (project: IProject) => {
    setFormState({ open: true, project });
    reset({ ...project });
  };

  const handleDelete = async (id: string) => {
    try {
      await profileService.deleteProject(id);
      mutate();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const onSubmit = async (formData: IProject) => {
    try {
      formData.start_date = formatDate(formData.start_date);
      formData.end_date = formData.end_date
        ? formatDate(formData.end_date)
        : null;
      if (formState.project?.id) {
        await profileService.updateProject(formState.project.id, formData);
      } else {
        await profileService.createProject(formData);
      }
      mutate();
      reset();
      setFormState({ open: false, project: null });
    } catch (error) {
      console.error("Error submitting project:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return dateString ? format(new Date(dateString), "yyyy-MM-dd") : "";
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
            <Code className="w-6 h-6 text-primary" />
            Projects
          </h3>
          <Button onClick={handleAddNew} className="btn-handshake btn-sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </div>
        <div className="space-y-4">
          {projects.map((project, index) => (
            <motion.div
              key={project.id || index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="dashboard-card-handshake p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-lg text-gray-900">
                        {project.title}
                      </h4>
                      {project.is_current && (
                        <Badge className="badge-handshake">Active</Badge>
                      )}
                    </div>

                    <p className="text-gray-600 mb-3">{project.description}</p>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(project.start_date)} -{" "}
                        {project.is_current
                          ? "Present"
                          : project.end_date
                            ? formatDate(project.end_date)
                            : "Present"}
                      </div>
                    </div>

                    {project.technologies_used &&
                      project.technologies_used.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.technologies_used
                            .split(",")
                            .map((tech, techIndex) => (
                              <Badge
                                key={techIndex}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tech}
                              </Badge>
                            ))}
                        </div>
                      )}

                    {project.project_url && (
                      <a
                        href={project.project_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
                      >
                        <Globe className="w-4 h-4" />
                        View Project
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Button
                      onClick={() => handleEdit(project)}
                      variant="outline"
                      size="sm"
                      className="btn-secondary btn-sm"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => project.id && handleDelete(project.id)}
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
          {projects.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Code className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No projects added yet.</p>
            </div>
          )}
        </div>

        <Dialog
          open={formState.open}
          onOpenChange={() => setFormState({ open: false, project: null })}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="heading-handshake text-xl">
                {formState.project ? "Edit Project" : "Add Project"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                type="text"
                label="Project Title"
                name="title"
                register={register}
                error={errors.title}
                required
                placeholder="e.g., E-commerce Platform"
              />

              <FormField
                type="textarea"
                label="Description"
                name="description"
                register={register}
                error={errors.description}
                required
                placeholder="Describe your project, its features, and your role..."
                rows={4}
              />

              <FormField
                type="url"
                label="Project URL (Optional)"
                name="url"
                register={register}
                placeholder="https://your-project.com"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  type="date"
                  label="Start Date"
                  name="start_date"
                  setValue={setValue}
                  watch={watch}
                  error={errors.start_date}
                  required
                />

                <FormField
                  type="date"
                  label="End Date"
                  name="end_date"
                  setValue={setValue}
                  watch={watch}
                  disabled={watch("is_current")}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id="is_current"
                  type="checkbox"
                  {...register("is_current")}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <Label
                  htmlFor="is_current"
                  className="text-sm font-medium text-gray-700"
                >
                  I am currently working on this project
                </Label>
              </div>

              <FormField
                type="text"
                label="Technologies Used (Optional)"
                name="technologies_used"
                register={register}
                placeholder="e.g., React, Node.js, MongoDB (comma separated)"
              />
              <p className="text-xs text-gray-500 -mt-4">
                Separate multiple technologies with commas
              </p>

              <div className="action-buttons-handshake">
                <Button
                  type="button"
                  onClick={() => setFormState({ open: false, project: null })}
                  className="btn-secondary"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button type="submit" className="btn-handshake">
                  <Save className="w-4 h-4 mr-2" />
                  {formState.project ? "Update Project" : "Add Project"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </motion.div>
  );
};
export default ProjectForm;
