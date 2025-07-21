import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Plus, Edit, Trash2, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { profileService } from "@/services";

interface Skill {
  id?: string;
  name: string;
  proficiency_level: "beginner" | "intermediate" | "advanced" | "expert";
}

interface SkillFormProps {
  data?: Skill[];
}

const SkillForm: React.FC<SkillFormProps> = ({ data = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<Skill>();

  const proficiencyLevels = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
    { value: "expert", label: "Expert" },
  ];

  const handleAddNew = () => {
    setEditingSkill(null);
    reset();
    setIsOpen(true);
  };

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
    reset(skill);
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await profileService.deleteSkill(id);
    } catch (error) {
      console.log("error deleting skill", error);
    }
  };

  const onSubmit = async (formData: Skill) => {
    try {
      if (editingSkill?.id) {
        await profileService.updateSkill(editingSkill.id, formData);
      } else {
        await profileService.createSkill(formData);
      }
      setIsOpen(false);
      reset();
    } catch (error) {
      console.log("error submitting skill", error);
    }
  };

  const getProficiencyLevelNumber = (level: string): number => {
    switch (level) {
      case "beginner":
        return 1;
      case "intermediate":
        return 2;
      case "advanced":
        return 3;
      case "expert":
        return 4;
      default:
        return 0;
    }
  };

  const getProficiencyColor = (level: number) => {
    switch (level) {
      case 1:
        return "text-red-500";
      case 2:
        return "text-orange-500";
      case 3:
        return "text-yellow-500";
      case 4:
        return "text-green-500";
      default:
        return "text-gray-500";
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
              <h3 className="text-lg font-semibold">Skills</h3>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button
                    onClick={handleAddNew}
                    className="flex items-center gap-2 text-white"
                  >
                    <Plus className="h-4 w-4" />
                    Add Skill
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingSkill ? "Edit Skill" : "Add Skill"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        label="Skill Name"
                        name="name"
                        type="text"
                        placeholder="e.g., React, Python, AWS"
                        required
                        register={register}
                        error={errors.name}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        label="Proficiency Level"
                        name="proficiency_level"
                        type="select"
                        placeholder="Select proficiency"
                        required
                        setValue={setValue}
                        watch={watch}
                        options={proficiencyLevels.map((p) => ({
                          value: p.value,
                          label: p.label,
                        }))}
                        error={errors.proficiency_level}
                      />
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
                        {editingSkill ? "Update" : "Save"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {data.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <Zap className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-500 text-center">
                    No skills were added yet.
                  </p>
                  <p className="text-sm text-gray-400 text-center mt-2">
                    Click Add Skill to get started.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                <Card>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {data.map((skill, index) => (
                        <div key={skill.id || index} className="relative group">
                          <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900">
                                  {skill.name}
                                </h4>
                                <div className="flex items-center gap-2 mt-1">
                                  <div className="flex items-center gap-1">
                                    {[...Array(4)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-3 w-3 ${
                                          i <
                                          getProficiencyLevelNumber(
                                            skill.proficiency_level,
                                          )
                                            ? getProficiencyColor(
                                                getProficiencyLevelNumber(
                                                  skill.proficiency_level,
                                                ),
                                              )
                                            : "text-gray-300"
                                        }`}
                                        fill={
                                          i <
                                          getProficiencyLevelNumber(
                                            skill.proficiency_level,
                                          )
                                            ? "currentColor"
                                            : "none"
                                        }
                                      />
                                    ))}
                                  </div>
                                  <span className="text-xs text-gray-500 capitalize">
                                    {skill.proficiency_level}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEdit(skill)}
                                >
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    skill.id && handleDelete(skill.id)
                                  }
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SkillForm;
