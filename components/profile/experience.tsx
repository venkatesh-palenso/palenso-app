import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Plus,
  Edit,
  Trash2,
  Calendar,
  MapPin,
  Building,
  Save,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FormField } from "@/components/ui/form-field";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { profileService } from "@/services";
import { format } from "date-fns";

interface Experience {
  id?: string;
  title: string;
  company: string;
  location?: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  description?: string;
}

interface ExperienceFormProps {
  data?: Experience[];
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ data = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<Experience>();

  const handleAddNew = () => {
    setEditingExperience(null);
    reset();
    setIsOpen(true);
  };

  const handleEdit = (experience: Experience) => {
    setEditingExperience(experience);
    reset(experience);
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await profileService.deleteExperience(id);
    } catch (error) {
      console.log("error deleting experience", error);
    }
  };

  const onSubmit = async (formData: Experience) => {
    try {
      const submitData = {
        ...formData,
        position: formData.title, // Map title to position for API
        start_date: format(formData.start_date, "yyyy-MM-dd"),
        end_date: formData.end_date
          ? format(formData.end_date, "yyyy-MM-dd")
          : undefined,
      };

      if (editingExperience && editingExperience.id) {
        await profileService.updateExperience(editingExperience.id, submitData);
      } else {
        await profileService.createExperience(submitData);
      }
      setIsOpen(false);
      reset();
    } catch (error) {
      console.log("error submitting experience", error);
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM yyyy");
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
            <Building className="w-6 h-6 text-primary" />
            Work Experience
          </h3>
          <Button onClick={handleAddNew} className="btn-handshake btn-sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Experience
          </Button>
        </div>

        {/* Experience List */}
        <div className="space-y-4">
          {data.map((experience, index) => (
            <motion.div
              key={experience.id || index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="dashboard-card-handshake p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-lg text-gray-900">
                        {experience.title}
                      </h4>
                      {experience.is_current && (
                        <Badge className="badge-handshake">Current</Badge>
                      )}
                    </div>
                    <p className="text-primary font-medium mb-1">
                      {experience.company}
                    </p>
                    {experience.location && (
                      <p className="text-gray-600 mb-2 flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {experience.location}
                      </p>
                    )}

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(experience.start_date)} -{" "}
                        {experience.is_current
                          ? "Present"
                          : experience.end_date
                            ? formatDate(experience.end_date)
                            : "Present"}
                      </div>
                    </div>

                    {experience.description && (
                      <p className="text-sm text-gray-600">
                        {experience.description}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Button
                      onClick={() => handleEdit(experience)}
                      variant="outline"
                      size="sm"
                      className="btn-secondary btn-sm"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() =>
                        experience.id && handleDelete(experience.id)
                      }
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

          {data.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Building className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No work experience added yet.</p>
              <Button onClick={handleAddNew} className="btn-handshake mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Experience
              </Button>
            </div>
          )}
        </div>

        {/* Add/Edit Dialog */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="heading-handshake text-xl">
                {editingExperience ? "Edit Experience" : "Add Experience"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  type="text"
                  label="Job Title"
                  name="title"
                  register={register}
                  error={errors.title}
                  required
                  placeholder="e.g., Software Engineer"
                />

                <FormField
                  type="text"
                  label="Company"
                  name="company"
                  register={register}
                  error={errors.company}
                  required
                  placeholder="e.g., Google"
                />
              </div>

              <FormField
                type="text"
                label="Location (Optional)"
                name="location"
                register={register}
                placeholder="e.g., San Francisco, CA"
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
                  I am currently working here
                </Label>
              </div>

              <FormField
                type="textarea"
                label="Description (Optional)"
                name="description"
                register={register}
                placeholder="Describe your responsibilities, achievements, and key contributions..."
                rows={4}
              />

              <div className="action-buttons-handshake">
                <Button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="btn-secondary"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button type="submit" className="btn-handshake">
                  <Save className="w-4 h-4 mr-2" />
                  {editingExperience ? "Update Experience" : "Add Experience"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </motion.div>
  );
};

export default ExperienceForm;
