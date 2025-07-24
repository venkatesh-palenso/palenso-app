// react
import { FC, useState } from "react";

// date fns
import { format } from "date-fns";

// framer motion
import { motion } from "framer-motion";

// react hook form
import { useForm } from "react-hook-form";

// lucide icons
import {
  Building,
  CheckCircle,
  FileImage,
  Save,
  Upload,
  X,
} from "lucide-react";

// interfaces
import { ICompany, IEmployerProfile } from "@/interfaces";

// services
import { companyService, mediaService } from "@/services";

// components
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FormField } from "@/components/ui/form-field";
import { Badge } from "@/components/ui/badge";

interface IFormState {
  mode: "edit" | "create";
  logo: File | null;
  banner: File | null;
}

const industryOptions = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Manufacturing",
  "Retail",
  "Consulting",
  "Marketing",
  "Real Estate",
  "Transportation",
  "Food & Beverage",
  "Entertainment",
  "Other",
].map((industry) => ({
  label: industry,
  value: industry.toLowerCase().split(" ").join("_"),
}));

const companySizeOptions = [
  { label: "1-10 employees", value: "1-10" },
  { label: "11-50 employees", value: "11-50" },
  { label: "51-200 employees", value: "51-200" },
  { label: "201-500 employees", value: "201-500" },
  { label: "501-1000 employees", value: "501-1000" },
  { label: "1000+ employees", value: "1000+" },
];

const CompanyProfile: FC<{ data: IEmployerProfile; mutate: () => void }> = ({
  data,
  mutate,
}) => {
  const { company } = data;

  const [formState, setFormState] = useState<IFormState>({
    mode: company?.id ? "edit" : "create",
    logo: null,
    banner: null,
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ICompany>({
    defaultValues: company ? { ...company } : {},
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (e.target.id === "logo") {
        setFormState({ ...formState, logo: file });
      } else if (e.target.id === "banner") {
        setFormState({ ...formState, banner: file });
      }
    }
  };

  const onSubmitForm = async (payload: ICompany) => {
    try {
      // Handle logo upload
      if (formState.logo) {
        const logoFormData = new FormData();
        logoFormData.append("file", formState.logo);
        logoFormData.append("asset_type", "company_logo");
        const logoResponse = await mediaService.uploadFile(logoFormData);
        payload.logo_url = logoResponse.display_url;
      }

      // Handle banner upload
      if (formState.banner) {
        const bannerFormData = new FormData();
        bannerFormData.append("file", formState.banner);
        bannerFormData.append("asset_type", "company_banner");
        const bannerResponse = await mediaService.uploadFile(bannerFormData);
        payload.banner_image_url = bannerResponse.display_url;
      }

      payload.founded_year = payload.founded_year
        ? format(new Date(payload.founded_year), "yyyy-MM-dd")
        : "";
      let response;
      if (formState.mode === "edit" && company.id) {
        response = await companyService.updateCompany(company.id, payload);
      } else {
        response = await companyService.createCompany(payload);
      }

      reset({ ...response });

      mutate();
      setFormState({ logo: null, banner: null, mode: "edit" });
    } catch (error) {
      console.error("Error submitting company profile:", error);
    }
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
            Company Profile
          </h3>
          {company?.is_verified && (
            <Badge className="badge-handshake">
              <CheckCircle className="w-3 h-3 mr-1" />
              Verified Company
            </Badge>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-8">
          {/* Basic Information */}
          <div className="dashboard-card-handshake p-6">
            <h4 className="heading-handshake text-lg mb-4">
              Basic Information
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Company Name"
                name="name"
                type="text"
                placeholder="Enter company name"
                register={register}
                required
                error={errors.name}
              />

              <FormField
                label="Industry"
                name="industry"
                type="select"
                placeholder="Select industry"
                options={industryOptions}
                setValue={setValue}
                watch={watch}
                required
                error={errors.industry}
              />

              <FormField
                label="Company Size"
                name="company_size"
                type="select"
                placeholder="Select company size"
                options={companySizeOptions}
                setValue={setValue}
                watch={watch}
                required
                error={errors.company_size}
              />

              <FormField
                label="Founded Year"
                name="founded_year"
                type="text"
                placeholder="e.g., 2020"
                register={register}
                error={errors.founded_year}
              />
            </div>

            <div className="mt-6">
              <FormField
                label="Company Description"
                name="description"
                type="textarea"
                placeholder="Describe your company, mission, values, and what makes you unique..."
                register={register}
                rows={4}
                required
                error={errors.description}
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="dashboard-card-handshake p-6">
            <h4 className="heading-handshake text-lg mb-4">
              Contact Information
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Website"
                name="website"
                type="url"
                placeholder="https://www.company.com"
                register={register}
                error={errors.website}
              />

              <FormField
                label="Email"
                name="email"
                type="email"
                placeholder="contact@company.com"
                register={register}
                error={errors.email}
              />

              <FormField
                label="Phone"
                name="phone"
                type="phone"
                placeholder="+1 (555) 123-4567"
                setValue={setValue}
                watch={watch}
                error={errors.phone}
              />
            </div>
          </div>

          {/* Location */}
          <div className="dashboard-card-handshake p-6">
            <h4 className="heading-handshake text-lg mb-4">Location</h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                label="Country"
                name="country"
                type="text"
                placeholder="United States"
                register={register}
                required
                error={errors.country}
              />

              <FormField
                label="State/Province"
                name="state"
                type="text"
                placeholder="California"
                register={register}
                required
                error={errors.state}
              />

              <FormField
                label="City"
                name="city"
                type="text"
                placeholder="San Francisco"
                register={register}
                required
                error={errors.city}
              />
            </div>

            <div className="mt-6">
              <FormField
                label="Address"
                name="address"
                type="textarea"
                placeholder="Enter full address"
                register={register}
                rows={2}
                error={errors.address}
              />
            </div>
          </div>

          {/* Social Media */}
          <div className="dashboard-card-handshake p-6">
            <h4 className="heading-handshake text-lg mb-4">Social Media</h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                label="LinkedIn"
                name="linkedin"
                type="url"
                placeholder="https://linkedin.com/company/..."
                register={register}
                error={errors.linkedin}
              />

              <FormField
                label="Twitter"
                name="twitter"
                type="url"
                placeholder="https://twitter.com/..."
                register={register}
                error={errors.twitter}
              />

              <FormField
                label="Facebook"
                name="facebook"
                type="url"
                placeholder="https://facebook.com/..."
                register={register}
                error={errors.facebook}
              />
            </div>
          </div>

          {/* Media Upload */}
          <div className="dashboard-card-handshake p-6">
            <h4 className="heading-handshake text-lg mb-4">Company Media</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Logo Upload */}
              <div className="space-y-2">
                <Label
                  htmlFor="logo"
                  className="text-sm font-medium text-gray-700"
                >
                  Company Logo
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    id="logo"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="logo" className="cursor-pointer">
                    <FileImage className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600 mb-1">
                      Click to upload company logo
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                  </label>
                </div>
              </div>

              {/* Banner Upload */}
              <div className="space-y-2">
                <Label
                  htmlFor="banner"
                  className="text-sm font-medium text-gray-700"
                >
                  Company Banner
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    id="banner"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="banner" className="cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600 mb-1">
                      Click to upload banner image
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons-handshake">
            <Button
              type="button"
              onClick={() => reset()}
              className="btn-secondary"
            >
              <X className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button
              type="submit"
              className="btn-handshake"
              disabled={isSubmitting}
            >
              <Save className="w-4 h-4 mr-2" />
              {isSubmitting
                ? "Saving..."
                : formState.mode === "edit"
                  ? "Update Company"
                  : "Create Company"}
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};
export default CompanyProfile;
