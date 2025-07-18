import React from "react";
import { motion } from "framer-motion";
import { 
  Building, 
  Globe, 
  MapPin, 
  Calendar, 
  Users, 
  FileText, 
  Upload,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { companyService } from "@/services";
import { CreateCompanyForm, Company } from "@/interfaces/company";

interface CompanyProfileFormProps {
  onSuccess: (data: Company) => void;
  onCancel?: () => void;
}

const CompanyProfileForm = ({ onSuccess, onCancel }: CompanyProfileFormProps) => {
  const [formData, setFormData] = React.useState<CreateCompanyForm>({
    name: "",
    description: "",
    industry: "",
    size: "",
    founded_year: new Date().getFullYear(),
    website: "",
    location: "",
    logo_url: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [logoFile, setLogoFile] = React.useState<File | null>(null);

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
    "Other"
  ];

  const companySizeOptions = [
    "1-10 employees",
    "11-50 employees", 
    "51-200 employees",
    "201-500 employees",
    "501-1000 employees",
    "1000+ employees"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      // In a real app, you'd upload this to a CDN and get the URL
      setFormData((prev) => ({ ...prev, logo_url: URL.createObjectURL(file) }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Company name is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Company description is required";
    } else if (formData.description.length < 50) {
      newErrors.description = "Description must be at least 50 characters";
    }
    if (!formData.industry) {
      newErrors.industry = "Industry is required";
    }
    if (!formData.size) {
      newErrors.size = "Company size is required";
    }
    if (!formData.founded_year) {
      newErrors.founded_year = "Founded year is required";
    } else if (formData.founded_year < 1800 || formData.founded_year > new Date().getFullYear()) {
      newErrors.founded_year = "Please enter a valid year";
    }
    if (!formData.website.trim()) {
      newErrors.website = "Website is required";
    } else if (!/^https?:\/\/.+/.test(formData.website)) {
      newErrors.website = "Please enter a valid website URL";
    }
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await companyService.createCompany(formData);
      onSuccess(response);
    } catch (error) {
      console.error("Error creating company:", error);
      setErrors({ submit: "Failed to create company profile. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = 
    formData.name &&
    formData.description &&
    formData.industry &&
    formData.size &&
    formData.founded_year &&
    formData.website &&
    formData.location &&
    !loading;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-4xl mx-auto"
    >
      <Card className="card-elevated">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <Building className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            Company Profile
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Tell us about your company to attract the best talent
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Building className="w-5 h-5 text-primary" />
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-foreground">
                    Company Name *
                  </Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter company name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`pl-10 ${
                        errors.name ? "border-destructive focus:border-destructive focus:ring-destructive" : ""
                      }`}
                      required
                    />
                  </div>
                  {errors.name && (
                    <p className="text-xs text-destructive">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" className="text-sm font-medium text-foreground">
                    Website *
                  </Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      placeholder="https://example.com"
                      value={formData.website}
                      onChange={handleChange}
                      className={`pl-10 ${
                        errors.website ? "border-destructive focus:border-destructive focus:ring-destructive" : ""
                      }`}
                      required
                    />
                  </div>
                  {errors.website && (
                    <p className="text-xs text-destructive">{errors.website}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                  Company Description *
                </Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe your company, mission, values, and what makes you unique..."
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className={`pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${
                      errors.description ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                    required
                  />
                </div>
                {errors.description && (
                  <p className="text-xs text-red-500">{errors.description}</p>
                )}
                <p className="text-xs text-gray-500">
                  {formData.description.length}/500 characters (minimum 50)
                </p>
              </div>
            </div>

            {/* Company Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                Company Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry" className="text-sm font-medium text-gray-700">
                    Industry *
                  </Label>
                  <Select value={formData.industry} onValueChange={(value) => handleSelectChange("industry", value)}>
                    <SelectTrigger className={`border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${
                      errors.industry ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                    }`}>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industryOptions.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.industry && (
                    <p className="text-xs text-red-500">{errors.industry}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="size" className="text-sm font-medium text-gray-700">
                    Company Size *
                  </Label>
                  <Select value={formData.size} onValueChange={(value) => handleSelectChange("size", value)}>
                    <SelectTrigger className={`border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${
                      errors.size ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                    }`}>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {companySizeOptions.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.size && (
                    <p className="text-xs text-red-500">{errors.size}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="founded_year" className="text-sm font-medium text-gray-700">
                    Founded Year *
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="founded_year"
                      name="founded_year"
                      type="number"
                      placeholder="2020"
                      value={formData.founded_year}
                      onChange={handleChange}
                      min="1800"
                      max={new Date().getFullYear()}
                      className={`pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${
                        errors.founded_year ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                      }`}
                      required
                    />
                  </div>
                  {errors.founded_year && (
                    <p className="text-xs text-red-500">{errors.founded_year}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                  Location *
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="City, State, Country"
                    value={formData.location}
                    onChange={handleChange}
                    className={`pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${
                      errors.location ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                    required
                  />
                </div>
                {errors.location && (
                  <p className="text-xs text-red-500">{errors.location}</p>
                )}
              </div>
            </div>

            {/* Logo Upload */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Upload className="w-5 h-5 text-blue-500" />
                Company Logo
              </h3>
              
              <div className="space-y-2">
                <Label htmlFor="logo" className="text-sm font-medium text-gray-700">
                  Upload Logo (Optional)
                </Label>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <input
                      id="logo"
                      name="logo"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="logo"
                      className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      Choose File
                    </label>
                  </div>
                  {logoFile && (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      {logoFile.name}
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  Recommended: Square image, 512x512px or larger, PNG or JPG
                </p>
              </div>
            </div>

            {/* Error Message */}
            {errors.submit && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{errors.submit}</p>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6">
              {onCancel && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  className="flex-1 sm:flex-none"
                  disabled={loading}
                >
                  Cancel
                </Button>
              )}
              <Button
                type="submit"
                disabled={!canSubmit}
                className="flex-1 sm:flex-none"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    Creating Profile...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    Create Company Profile
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