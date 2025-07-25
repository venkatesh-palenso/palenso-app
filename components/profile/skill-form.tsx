// react
import { FC, useState } from "react";

// react hook form
import { useForm } from "react-hook-form";

// framer-motion
import { motion } from "framer-motion";

// lucide icons
import { Edit, Plus, Save, Star, Trash2, X } from "lucide-react";

// interfaces
import { ISkill, IStudentProfile } from "@/interfaces";

// services
import { profileService } from "@/services";

// components
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
  skill: ISkill | null;
}

const SkillForm: FC<{ data: IStudentProfile; mutate: () => void }> = ({
  data,
  mutate,
}) => {
  const { skills } = data;

  const [formState, setFormState] = useState<IFormState>({
    open: false,
    skill: null,
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ISkill>();

  const handleAddNew = () => {
    setFormState({ open: true, skill: null });
  };

  const handleEdit = (skill: ISkill) => {
    setFormState({ open: true, skill });
    reset({ ...skill });
  };

  const handleDelete = async (id: string) => {
    try {
      await profileService.deleteSkill(id);
      mutate();
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  const onSubmit = async (formData: ISkill) => {
    try {
      if (formState.skill?.id) {
        await profileService.updateSkill(formState.skill.id, formData);
      } else {
        await profileService.createSkill(formData);
      }
      mutate();
      reset();
      setFormState({ open: false, skill: null });
    } catch (error) {
      console.error("Error submitting skill:", error);
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

        <div className="space-y-4">
          {skills.map((skill, index) => (
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

          {skills.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Star className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No skills added yet.</p>
            </div>
          )}
        </div>

        <Dialog
          open={formState.open}
          onOpenChange={() => setFormState({ open: false, skill: null })}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="heading-handshake text-xl">
                {formState.skill ? "Edit Skill" : "Add Skill"}
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

              <div className="action-buttons-handshake">
                <Button
                  type="button"
                  onClick={() => setFormState({ open: false, skill: null })}
                  className="btn-secondary"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button type="submit" className="btn-handshake">
                  <Save className="w-4 h-4 mr-2" />
                  {formState.skill ? "Update Skill" : "Add Skill"}
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
