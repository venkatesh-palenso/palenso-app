import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Plus, Edit, Trash2, Calendar, MapPin, Building } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { profileService } from "@/services";
import { format } from "date-fns";

interface Experience {
  id?: string;
  position: string;
  company: string;
  location: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  description: string;
}

interface ExperienceFormProps {
  data: Experience[];
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
      const response = await profileService.deleteExperience(id);
      console.log(response);
    } catch (error) {
      console.log("error deleting experience", error);
    }
  };

  const onSubmit = async (formData: Experience) => {
    try {
      formData["start_date"] = format(formData.start_date, "yyyy-MM-dd");
      formData["end_date"] = formData.end_date
        ? format(formData.end_date, "yyyy-MM-dd")
        : undefined;
      if (editingExperience) {
        const response = await profileService.updateExperience(
          editingExperience.id!,
          formData,
        );
        console.log(response);
      } else {
        const response = await profileService.createExperience(formData);
        console.log(response);
      }
      setIsOpen(false);
      reset();
    } catch (error) {
      console.log("error submitting experience", error);
    }
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
              <h3 className="text-lg font-semibold">Experience</h3>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button
                    onClick={handleAddNew}
                    className="flex items-center gap-2 text-white"
                  >
                    <Plus className="h-4 w-4" />
                    Add Experience
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingExperience ? "Edit Experience" : "Add Experience"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        label="Job Position"
                        name="position"
                        type="text"
                        placeholder="e.g., Software Engineer"
                        required
                        register={register}
                        error={errors.position}
                      />
                      <FormField
                        label="Company"
                        name="company"
                        type="text"
                        placeholder="e.g., Google"
                        required
                        register={register}
                        error={errors.company}
                      />
                      <FormField
                        label="Location"
                        name="location"
                        type="text"
                        placeholder="e.g., San Francisco, CA"
                        register={register}
                        error={errors.location}
                      />
                      <FormField
                        label="Start Date"
                        name="start_date"
                        type="date"
                        required
                        setValue={setValue}
                        watch={watch}
                        error={errors.start_date}
                      />
                    </div>

                    <div className="flex items-center gap-4">
                      <FormField
                        label="End Date"
                        name="end_date"
                        type="date"
                        setValue={setValue}
                        watch={watch}
                        error={errors.end_date}
                      />
                      <div className="flex items-center gap-2 mt-6">
                        <input
                          type="checkbox"
                          id="current"
                          {...register("is_current")}
                          className="rounded border-gray-300"
                        />
                        <label htmlFor="current" className="text-sm">
                          I currently work here
                        </label>
                      </div>
                    </div>

                    <FormField
                      label="Description"
                      name="description"
                      type="textarea"
                      placeholder="Describe your role and achievements..."
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
                        {editingExperience ? "Update" : "Save"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {data.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <Building className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-500 text-center">
                    No experience items were added yet.
                  </p>
                  <p className="text-sm text-gray-400 text-center mt-2">
                    Click Add Experience to get started.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {data.map((experience, index) => (
                  <Card key={experience.id || index} className="relative">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">
                            {experience.position}
                          </CardTitle>
                          <p className="text-gray-600 font-medium">
                            {experience.company}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {experience.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {formatDate(experience.start_date)} -{" "}
                              {experience.is_current
                                ? "Present"
                                : formatDate(experience.end_date || "")}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(experience)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              experience.id && handleDelete(experience.id)
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    {experience.description && (
                      <CardContent>
                        <Separator className="mb-4" />
                        <p className="text-gray-700 whitespace-pre-wrap">
                          {experience.description}
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

export default ExperienceForm;
