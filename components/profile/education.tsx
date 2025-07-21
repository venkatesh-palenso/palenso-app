import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Plus,
  Edit,
  Trash2,
  Calendar,
  MapPin,
  GraduationCap,
} from "lucide-react";
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

interface Education {
  id?: string;
  degree: string;
  institution: string;
  field_of_study: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  grade?: string;
  description?: string;
}

interface EducationFormProps {
  data?: Education[];
}

const EducationForm: React.FC<EducationFormProps> = ({ data = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState<Education | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<Education>();

  const handleAddNew = () => {
    setEditingEducation(null);
    reset();
    setIsOpen(true);
  };

  const handleEdit = (education: Education) => {
    setEditingEducation(education);
    reset(education);
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await profileService.deleteEducation(id);
    } catch (error) {
      console.log("error deleting education", error);
    }
  };

  const onSubmit = async (formData: Education) => {
    try {
      formData["start_date"] = format(formData.start_date, "yyyy-MM-dd");
      formData["end_date"] = formData.end_date
        ? format(formData.end_date, "yyyy-MM-dd")
        : undefined;

      if (editingEducation) {
        const response = await profileService.updateEducation(
          editingEducation.id!,
          formData,
        );
        console.log(response);
      } else {
        const response = await profileService.createEducation(formData);
        console.log(response);
      }
      setIsOpen(false);
      reset();
    } catch (error) {
      console.log("error submitting education", error);
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
              <h3 className="text-lg font-semibold">Education</h3>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button
                    onClick={handleAddNew}
                    className="flex items-center gap-2 text-white"
                  >
                    <Plus className="h-4 w-4" />
                    Add Education
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingEducation ? "Edit Education" : "Add Education"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        label="Degree"
                        name="degree"
                        type="text"
                        placeholder="e.g., Bachelor of Science in Computer Science"
                        required
                        register={register}
                        error={errors.degree}
                      />
                      <FormField
                        label="Institution"
                        name="institution"
                        type="text"
                        placeholder="e.g., Stanford University"
                        required
                        register={register}
                        error={errors.institution}
                      />
                      <FormField
                        label="Field of Study"
                        name="field_of_study"
                        type="text"
                        placeholder="e.g., Stanford, CA"
                        register={register}
                        error={errors.field_of_study}
                      />
                      <FormField
                        label="Grade"
                        name="grade"
                        type="text"
                        placeholder="e.g., 3.8/4.0"
                        register={register}
                        error={errors.grade}
                      />
                    </div>

                    <div className="flex items-center gap-4">
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
                      <div className="flex items-center gap-2 mt-6">
                        <input
                          type="checkbox"
                          id="current"
                          {...register("is_current")}
                          className="rounded border-gray-300"
                        />
                        <label htmlFor="current" className="text-sm">
                          Im currently studying here
                        </label>
                      </div>
                    </div>

                    <FormField
                      label="Description"
                      name="description"
                      type="textarea"
                      placeholder="Describe your academic achievements, relevant coursework, or projects..."
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
                        {editingEducation ? "Update" : "Save"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {data.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <GraduationCap className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-500 text-center">
                    No education items were added yet.
                  </p>
                  <p className="text-sm text-gray-400 text-center mt-2">
                    Click Add Education to get started.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {data.map((education, index) => (
                  <Card key={education.id || index} className="relative">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">
                            {education.degree}
                          </CardTitle>
                          <p className="text-gray-600 font-medium">
                            {education.institution}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {education.field_of_study}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {formatDate(education.start_date)} -{" "}
                              {education.is_current
                                ? "Present"
                                : formatDate(education.end_date || "")}
                            </div>
                            {education.grade && (
                              <div className="flex items-center gap-1">
                                <Badge variant="secondary">
                                  {education.grade}
                                </Badge>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(education)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              education.id && handleDelete(education.id)
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    {education.description && (
                      <CardContent>
                        <Separator className="mb-4" />
                        <p className="text-gray-700 whitespace-pre-wrap">
                          {education.description}
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

export default EducationForm;
