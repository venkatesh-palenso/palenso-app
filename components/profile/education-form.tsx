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
  Edit,
  GraduationCap,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";

// interfaces
import { IEducation, IStudentProfile } from "@/interfaces";

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
  education: IEducation | null;
}

const EducationForm: FC<{ data: IStudentProfile; mutate: () => void }> = ({
  data,
  mutate,
}) => {
  const { educations } = data;

  const [formState, setFormState] = useState<IFormState>({
    open: false,
    education: null,
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<IEducation>();

  const handleAddNew = () => {
    setFormState({ open: true, education: null });
  };

  const handleEdit = (education: IEducation) => {
    setFormState({ open: true, education });
    reset({ ...education });
  };

  const handleDelete = async (id: string) => {
    try {
      await profileService.deleteEducation(id);
      mutate();
    } catch (error) {
      console.error("Error deleting education:", error);
    }
  };

  const onSubmit = async (formData: IEducation) => {
    try {
      formData.start_date = formatDate(formData.start_date);
      formData.end_date = formData.end_date
        ? formatDate(formData.end_date)
        : null;
      if (formState.education?.id) {
        await profileService.updateEducation(formState.education.id, formData);
      } else {
        await profileService.createEducation(formData);
      }
      mutate();
      reset();
      setFormState({ open: false, education: null });
    } catch (error) {
      console.error("Error submitting education:", error);
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
            <GraduationCap className="w-6 h-6 text-primary" />
            Education
          </h3>
          <Button variant="outline" onClick={handleAddNew}>
            <Plus className="w-4 h-4 mr-2" />
            Add Education
          </Button>
        </div>

        <div className="space-y-4">
          {educations.map((education, index) => (
            <motion.div
              key={education.id || index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="dashboard-card-handshake p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-lg text-gray-900">
                        {education.degree}
                      </h4>
                      {education.is_current && (
                        <Badge className="badge-handshake">Current</Badge>
                      )}
                    </div>
                    <p className="text-primary font-medium mb-1">
                      {education.institution}
                    </p>
                    <p className="text-gray-600 mb-2">
                      {education.field_of_study}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(education.start_date)} -{" "}
                        {education.is_current
                          ? "Present"
                          : education.end_date
                            ? formatDate(education.end_date)
                            : "Present"}
                      </div>
                    </div>

                    {education.grade && (
                      <p className="text-sm text-gray-600 mb-2">
                        Grade: {education.grade}
                      </p>
                    )}

                    {education.description && (
                      <p className="text-sm text-gray-600">
                        {education.description}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Button
                      onClick={() => handleEdit(education)}
                      variant="outline"
                      size="sm"
                      className="btn-secondary btn-sm"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => education.id && handleDelete(education.id)}
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

          {educations.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <GraduationCap className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No education history added yet.</p>
            </div>
          )}
        </div>

        <Dialog
          open={formState.open}
          onOpenChange={() => setFormState({ open: false, education: null })}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="heading-handshake text-xl">
                {formState.education ? "Edit Education" : "Add Education"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  type="text"
                  label="Degree"
                  name="degree"
                  register={register}
                  error={errors.degree}
                  required
                  placeholder="e.g., Bachelor of Science"
                />

                <FormField
                  type="text"
                  label="Institution"
                  name="institution"
                  register={register}
                  error={errors.institution}
                  required
                  placeholder="e.g., University of California"
                />
              </div>

              <FormField
                type="text"
                label="Field of Study"
                name="field_of_study"
                register={register}
                error={errors.field_of_study}
                required
                placeholder="e.g., Computer Science"
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
                  I am currently studying here
                </Label>
              </div>

              <FormField
                type="text"
                label="Grade (Optional)"
                name="grade"
                register={register}
                placeholder="e.g., 3.8 GPA, First Class"
              />

              <FormField
                type="textarea"
                label="Description (Optional)"
                name="description"
                register={register}
                placeholder="Describe your academic achievements, projects, or relevant coursework..."
                rows={3}
              />

              <div className="action-buttons-handshake">
                <Button
                  type="button"
                  onClick={() => setFormState({ open: false, education: null })}
                  className="btn-secondary"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button type="submit" className="btn-handshake">
                  <Save className="w-4 h-4 mr-2" />
                  {formState.education ? "Update Education" : "Add Education"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </motion.div>
  );
};
export default EducationForm;
