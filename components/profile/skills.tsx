import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Plus, Edit, Trash2, Star, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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

interface Skill {
  id?: string;
  name: string;
  proficiency_level: "beginner" | "intermediate" | "advanced" | "expert";
  category?: string;
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
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm<Skill>();

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
      if (editingSkill && editingSkill.id) {
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

  const getProficiencyColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-gray-100 text-gray-700";
      case "intermediate":
        return "bg-blue-100 text-blue-700";
      case "advanced":
        return "bg-purple-100 text-purple-700";
      case "expert":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getProficiencyStars = (level: string) => {
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
        return 1;
    }
  };

  const renderStars = (count: number) => {
    return Array.from({ length: 4 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < count ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
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
            <Star className="w-6 h-6 text-primary" />
            Skills
          </h3>
          <Button onClick={handleAddNew} className="btn-handshake btn-sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Skill
          </Button>
        </div>

        {/* Skills List */}
        <div className="space-y-4">
          {data.map((skill, index) => (
            <motion.div
              key={skill.id || index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="dashboard-card-handshake p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-lg text-gray-900">
                        {skill.name}
                      </h4>
                      <Badge
                        className={`${getProficiencyColor(skill.proficiency_level)}`}
                      >
                        {skill.proficiency_level.charAt(0).toUpperCase() +
                          skill.proficiency_level.slice(1)}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      {renderStars(
                        getProficiencyStars(skill.proficiency_level),
                      )}
                    </div>

                    {skill.category && (
                      <p className="text-sm text-gray-600">
                        Category: {skill.category}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Button
                      onClick={() => handleEdit(skill)}
                      variant="outline"
                      size="sm"
                      className="btn-secondary btn-sm"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => skill.id && handleDelete(skill.id)}
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
              <Star className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No skills added yet.</p>
              <Button onClick={handleAddNew} className="btn-handshake mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Skill
              </Button>
            </div>
          )}
        </div>

        {/* Add/Edit Dialog */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="heading-handshake text-xl">
                {editingSkill ? "Edit Skill" : "Add Skill"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                type="text"
                label="Skill Name"
                name="name"
                register={register}
                error={errors.name}
                required
                placeholder="e.g., JavaScript, Project Management"
              />

              <FormField
                type="select"
                label="Proficiency Level"
                name="proficiency_level"
                setValue={setValue}
                watch={watch}
                error={errors.proficiency_level}
                required
                placeholder="Select Level"
                options={[
                  { value: "beginner", label: "Beginner" },
                  { value: "intermediate", label: "Intermediate" },
                  { value: "advanced", label: "Advanced" },
                  { value: "expert", label: "Expert" },
                ]}
              />

              <FormField
                type="text"
                label="Category (Optional)"
                name="category"
                register={register}
                placeholder="e.g., Programming, Design, Management"
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
                  {editingSkill ? "Update Skill" : "Add Skill"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </motion.div>
  );
};

export default SkillForm;
