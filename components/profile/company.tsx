import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import {
  ArrowRight,
  Building,
  CheckCircle,
  Globe,
  MapPin,
  Upload,
  FileImage,
} from "lucide-react";
import { FormField } from "@/components/ui/form-field";
import { Company } from "@/interfaces/company";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { companyService, mediaService } from "@/services";
import { format } from "date-fns";

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

const CompanyProfileForm: React.FC<{ data: Company }> = ({ data: company }) => {
  const [mode] = useState<"edit" | "create">(company?.id ? "edit" : "create");
  const [media, setMedia] = useState<{
    companyLogo: File | null;
    companyBanner: File | null;
  }>({
    companyLogo: null,
    companyBanner: null,
  });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Company>({
    defaultValues: {
      name: company.name || "",
      website: company.website || "",
      email: company.email || "",
      phone: company.phone || "",
      description: company.description || "",
      industry: company.industry || "",
      company_size: company.company_size || "",
      founded_year: company.founded_year || "",
      country: company.country || "",
      state: company.state || "",
      city: company.city || "",
      address: company.address || "",
      logo_url: company.logo_url || "",
      banner_image_url: company.banner_image_url || "",
      linkedin: company.linkedin || "",
      twitter: company.twitter || "",
      facebook: company.facebook || "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (e.target.id === "companyLogo") {
        setMedia({ ...media, companyLogo: file });
      } else if (e.target.id === "companyBanner") {
        setMedia({ ...media, companyBanner: file });
      }
    }
  };

  const onSubmitForm = async (data: Company) => {
    try {
      const payload = { ...data };

      if (media.companyLogo) {
        try {
          const formData = new FormData();
          formData.append("file", media.companyLogo);
          formData.append("asset_type", "company_logo");
          const response = await mediaService.uploadFile(formData);
          payload["logo_url"] = response.display_url;
        } catch (error) {
          console.log("failed to upload company logo", error);
        }
      }
      if (media.companyBanner) {
        try {
          const formData = new FormData();
          formData.append("file", media.companyBanner);
          formData.append("asset_type", "company_banner");
          const response = await mediaService.uploadFile(formData);
          payload["banner_image_url"] = response.display_url;
        } catch (error) {
          console.log("failed to upload company banner", error);
        }
      }
      try {
        payload["founded_year"] = format(payload["founded_year"], "yyyy-MM-dd");
        if (mode === "create") {
          await companyService.createCompany(payload);
        }

        if (mode === "edit") {
          await companyService.updateCompany(company.id, payload);
        }
        reset();
      } catch (error) {
        console.log("failed to update company", error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
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
          <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Building className="w-5 h-5 text-primary" />
                Basic Information
              </h3>
              <hr className="border-gray-200" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  type="text"
                  label="Company Name"
                  name="name"
                  placeholder="Enter company name"
                  register={register}
                  error={errors.name}
                  required
                />
                <FormField
                  type="url"
                  label="Company Website"
                  name="website"
                  placeholder="https://website.com"
                  register={register}
                  error={errors.website}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  type="email"
                  label="Email Address"
                  name="email"
                  placeholder="your.email@example.com"
                  register={register}
                  error={errors.email}
                  required
                />

                <FormField
                  type="phone"
                  label="Phone Number"
                  name="phone"
                  placeholder="+1 (555) 123-4567"
                  setValue={setValue}
                  watch={watch}
                  error={errors.phone}
                  required
                />
              </div>
              <div className="space-y-4">
                <FormField
                  type="textarea"
                  label="Description"
                  name="description"
                  placeholder="Describe your company, mission, values, and what makes you unique..."
                  register={register}
                  error={errors.description}
                  rows={4}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  {watch("description")?.length || 0}/1000 characters
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  type="select"
                  label="Industry"
                  name="industry"
                  placeholder="Select Industry"
                  setValue={setValue}
                  watch={watch}
                  error={errors.industry}
                  options={industryOptions}
                  required
                />
                <FormField
                  type="select"
                  label="Company Size"
                  name="company_size"
                  placeholder="Select Size"
                  options={companySizeOptions}
                  setValue={setValue}
                  watch={watch}
                  error={errors.company_size}
                  required
                />
                <FormField
                  type="date"
                  label="Founded Year"
                  name="founded_year"
                  placeholder="Select Founded Year"
                  setValue={setValue}
                  watch={watch}
                  error={errors.founded_year}
                  required
                />
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Address Information
              </h3>

              <hr className="border-gray-200" />
              <div className="space-y-4">
                <FormField
                  type="text"
                  label="Street Address"
                  name="address"
                  placeholder="Street Address"
                  register={register}
                  error={errors.address}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  type="text"
                  label="City"
                  name="city"
                  placeholder="City"
                  register={register}
                  error={errors.city}
                  required
                />
                <FormField
                  type="text"
                  label="State/Province"
                  name="state"
                  placeholder="State"
                  register={register}
                  error={errors.state}
                  required
                />
                <FormField
                  type="text"
                  label="Country"
                  name="country"
                  placeholder="Country"
                  register={register}
                  error={errors.country}
                  required
                />
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                Social Links
              </h3>

              <hr className="border-gray-200" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  type="url"
                  label="LinkedIn URL"
                  name="linkedin"
                  placeholder="https://linkedin.com/in/..."
                  register={register}
                  error={errors.linkedin}
                />
                <FormField
                  type="url"
                  label="Facebook URL"
                  name="facebook"
                  placeholder="https://facebook.com/..."
                  register={register}
                  error={errors.facebook}
                />
                <FormField
                  type="url"
                  label="Twitter"
                  name="twitter"
                  placeholder="https://twitter.com/..."
                  register={register}
                  error={errors.twitter}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Upload className="w-5 h-5 text-blue-500" />
                Media Upload
              </h3>
              <hr className="border-gray-200" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Logo Upload */}
                <div className="space-y-2">
                  <Label
                    htmlFor="companyLogo"
                    className="text-sm font-medium text-gray-700"
                  >
                    Company Logo (Optional)
                  </Label>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <input
                        id="companyLogo"
                        name="companyLogo"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="companyLogo"
                        className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Upload className="w-4 h-4" />
                        Choose Logo
                      </label>
                    </div>
                    {media.companyLogo && (
                      <div className="flex items-center gap-2 text-sm text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        {media.companyLogo.name}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    Recommended: Square image, 512x512px or larger, PNG or JPG
                  </p>
                </div>

                {/* Banner Upload */}
                <div className="space-y-2">
                  <Label
                    htmlFor="companyBanner"
                    className="text-sm font-medium text-gray-700"
                  >
                    Banner Image (Optional)
                  </Label>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <input
                        id="companyBanner"
                        name="companyBanner"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="companyBanner"
                        className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <FileImage className="w-4 h-4" />
                        Choose Banner
                      </label>
                    </div>
                    {media.companyBanner && (
                      <div className="flex items-center gap-2 text-sm text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        {media.companyBanner.name}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    Recommended: 1200x400px or larger, PNG or JPG
                  </p>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6">
              <Button
                type="button"
                variant="outline"
                className="flex-1 sm:flex-none"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 sm:flex-none text-white"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    Saving Company...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    Save Company
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CompanyProfileForm;
