import React, { ReactElement } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { Building, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CompanyProfileForm from "@/components/forms/company-profile";
import { Company } from "@/interfaces/company";
import { useRouter } from "next/router";
import RootLayout from "@/layouts/root";

const CompanyProfilePage = () => {
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [submittedCompany, setSubmittedCompany] = React.useState<Company | null>(null);

  const handleSuccess = (company: Company) => {
    setSubmittedCompany(company);
    setIsSubmitted(true);
  };

  const handleCancel = () => {
    router.push("/employer/dashboard");
  };

  const handleBackToDashboard = () => {
    router.push("/employer/dashboard");
  };

  const handleCreateAnother = () => {
    setIsSubmitted(false);
    setSubmittedCompany(null);
  };

  if (isSubmitted && submittedCompany) {
    return (
      <>
        <Head>
          <title>Company Profile Created - Palenso</title>
          <meta name="description" content="Your company profile has been successfully created" />
        </Head>

        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <Card className="card-elevated">
                <CardHeader className="text-center pb-8">
                  <div className="mx-auto w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6">
                    <Building className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-foreground mb-2">
                    Profile Created Successfully!
                  </CardTitle>
                  <CardDescription className="text-lg text-muted-foreground">
                    Your company profile has been created and is now live
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 dark:bg-green-950 dark:border-green-800">
                    <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">Company Details</h3>
                    <div className="space-y-2 text-sm text-green-700 dark:text-green-300">
                      <p><strong>Name:</strong> {submittedCompany.name}</p>
                      <p><strong>Industry:</strong> {submittedCompany.industry}</p>
                      <p><strong>Location:</strong> {submittedCompany.location}</p>
                      <p><strong>Size:</strong> {submittedCompany.size}</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 dark:bg-blue-950 dark:border-blue-800">
                    <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">What&apos;s Next?</h3>
                    <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                      <li>• Your company profile is now visible to potential candidates</li>
                      <li>• You can start posting job opportunities</li>
                      <li>• Candidates can now discover and apply to your company</li>
                      <li>• You can edit your profile anytime from the dashboard</li>
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-6">
                    <Button
                      onClick={handleBackToDashboard}
                      className="flex-1 sm:flex-none"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Dashboard
                    </Button>
                    <Button
                      onClick={handleCreateAnother}
                      variant="outline"
                      className="flex-1 sm:flex-none"
                    >
                      Create Another Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Create Company Profile - Palenso</title>
        <meta name="description" content="Create your company profile to attract the best talent" />
      </Head>

              <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Button
                onClick={handleCancel}
                variant="ghost"
                className="mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              
              <div className="text-center">
                <h1 className="text-4xl font-bold text-foreground mb-4">
                  Create Company Profile
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Tell us about your company to attract the best talent. A complete profile helps candidates understand your culture and values.
                </p>
              </div>
            </motion.div>

          <CompanyProfileForm onSuccess={handleSuccess} onCancel={handleCancel} />
        </div>
      </div>
    </>
  );
};

CompanyProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default CompanyProfilePage; 