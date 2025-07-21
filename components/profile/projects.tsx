import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Plus, Edit, Trash2, Calendar, ExternalLink, Code } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { profileService } from "@/services";
import { format } from "date-fns";

interface Project {
  id?: string;
  title: string;
  description: string;
  technologies_used: string;
  is_current: boolean;
  start_date: string;
  end_date?: string;
  project_url?: string;
  github_url?: string;
  image_url?: string;
}

interface ProjectFormProps {
  data?: Project[];
}

const ProjectForm: React.FC<ProjectFormProps> = ({ data = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<Project>();

  const handleAddNew = () => {
    setEditingProject(null);
    reset();
    setIsOpen(true);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    reset(project);
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await profileService.deleteProject(id);
    } catch (error) {
      console.log("error deleting project", error);
    }
  };

  const onSubmit = async (formData: Project) => {
    try {
      formData["start_date"] = format(formData.start_date, "yyyy-MM-dd");
      formData["end_date"] = formData.end_date
        ? format(formData.end_date, "yyyy-MM-dd")
        : undefined;
      console.log(formData);
      if (editingProject?.id) {
        await profileService.updateProject(editingProject.id, formData);
      } else {
        await profileService.createProject(formData);
      }
    } catch (error) {
      console.log("error submitting project", error);
    }
    // setIsOpen(false);
    // reset();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
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
              <h3 className="text-lg font-semibold">Projects</h3>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button
                    onClick={handleAddNew}
                    className="flex items-center gap-2 text-white"
                  >
                    <Plus className="h-4 w-4" />
                    Add Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingProject ? "Edit Project" : "Add Project"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      label="Project Title"
                      name="title"
                      type="text"
                      placeholder="e.g., E-commerce Platform"
                      required
                      register={register}
                      error={errors.title}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        label="Start Date"
                        name="start_date"
                        type="date"
                        required
                        setValue={setValue}
                        watch={watch}
                        error={errors.start_date}
                      />
                      <FormField
                        label="End Date"
                        name="end_date"
                        type="date"
                        setValue={setValue}
                        watch={watch}
                        error={errors.end_date}
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="current"
                        {...register("is_current")}
                        className="rounded border-gray-300"
                      />
                      <label htmlFor="current" className="text-sm">
                        I&apos;m currently working on this project
                      </label>
                    </div>

                    <FormField
                      label="Technologies"
                      name="technologies_used"
                      type="text"
                      placeholder="e.g., React, Node.js, MongoDB (comma-separated)"
                      register={register}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        label="GitHub URL"
                        name="github_url"
                        type="url"
                        placeholder="https://github.com/username/project"
                        register={register}
                        error={errors.github_url}
                      />
                      <FormField
                        label="Live URL"
                        name="project_url"
                        type="url"
                        placeholder="https://project-demo.com"
                        register={register}
                        error={errors.project_url}
                      />
                    </div>

                    <FormField
                      label="Description"
                      name="description"
                      type="textarea"
                      placeholder="Describe your project, its features, and your role..."
                      rows={4}
                      register={register}
                      error={errors.description}
                    />

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
                        {editingProject ? "Update" : "Save"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {data.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <Code className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-500 text-center">
                    No projects were added yet.
                  </p>
                  <p className="text-sm text-gray-400 text-center mt-2">
                    Click Add Project to get started.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {data.map((project, index) => (
                  <Card key={project.id || index} className="relative">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">
                            {project.title}
                          </CardTitle>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {formatDate(project.start_date)} -{" "}
                              {project.is_current
                                ? "Present"
                                : formatDate(project.end_date || "")}
                            </div>
                          </div>
                          {project.technologies_used &&
                            project.technologies_used.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-3">
                                {project.technologies_used
                                  .split(",")
                                  .map((tech, techIndex) => (
                                    <Badge key={techIndex} variant="secondary">
                                      {tech}
                                    </Badge>
                                  ))}
                              </div>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                          {project.github_url && (
                            <Button variant="ghost" size="sm" asChild>
                              <a
                                href={project.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="h-4 w-4" />
                                GitHub
                              </a>
                            </Button>
                          )}
                          {project.project_url && (
                            <Button variant="ghost" size="sm" asChild>
                              <a
                                href={project.project_url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="h-4 w-4" />
                                Live
                              </a>
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(project)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              project.id && handleDelete(project.id)
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    {project.description && (
                      <CardContent>
                        <Separator className="mb-4" />
                        <p className="text-gray-700 whitespace-pre-wrap">
                          {project.description}
                        </p>
                      </CardContent>
                    )}
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

export default ProjectForm;
