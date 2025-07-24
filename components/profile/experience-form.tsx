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
  Briefcase,
  Building,
  Calendar,
  Edit,
  MapPin,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";

// interfaces
import { IStudentProfile, IWorkExperience } from "@/interfaces";

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
  experience: IWorkExperience | null;
}

const ExperienceForm: FC<{ data: IStudentProfile; mutate: () => void }> = ({
  data,
  mutate,
}) => {
  const { experiences } = data;

  const [formState, setFormState] = useState<IFormState>({
    open: false,
    experience: null,
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<IWorkExperience>();

  const handleAddNew = () => {
    setFormState({ open: true, experience: null });
  };

  const handleEdit = (experience: IWorkExperience) => {
    setFormState({ open: true, experience });
    reset({ ...experience });
  };

  const handleDelete = async (id: string) => {
    try {
      await profileService.deleteExperience(id);
      mutate();
    } catch (error) {
      console.error("Error deleting experience:", error);
    }
  };

  const onSubmit = async (formData: IWorkExperience) => {
    try {
      formData.start_date = formatDate(formData.start_date);
      formData.end_date = formData.end_date
        ? formatDate(formData.end_date)
        : null;
      if (formState.experience?.id) {
        await profileService.updateExperience(
          formState.experience.id,
          formData,
        );
      } else {
        await profileService.createExperience(formData);
      }
      mutate();
      reset();
      setFormState({ open: false, experience: null });
    } catch (error) {
      console.error("Error submitting experience:", error);
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
            <Briefcase className="w-6 h-6 text-primary" />
            Work Experience
          </h3>
          <Button variant="outline" onClick={handleAddNew}>
            <Plus className="w-4 h-4 mr-2" />
            Add New Experience
          </Button>
        </div>
        <div className="space-y-4">
          {experiences.map((experience, index) => (
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
                        {experience.position}
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
          {experiences.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Building className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No work experience added yet.</p>
            </div>
          )}
        </div>

        <Dialog
          open={formState.open}
          onOpenChange={() => setFormState({ open: false, experience: null })}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="heading-handshake text-xl">
                {formState.experience ? "Edit Experience" : "Add Experience"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  type="text"
                  label="Job Postion"
                  name="position"
                  register={register}
                  error={errors.position}
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
                  onClick={() =>
                    setFormState({ open: false, experience: null })
                  }
                  className="btn-secondary"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button type="submit" className="btn-handshake">
                  <Save className="w-4 h-4 mr-2" />
                  {formState.experience
                    ? "Update Experience"
                    : "Add Experience"}
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
