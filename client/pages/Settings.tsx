import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function SettingsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button asChild variant="outline" size="sm">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Group Settings
            </h1>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Settings Page
            </CardTitle>
            <CardDescription>
              Group configuration and administrative settings (Manager access required)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Settings className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Group Configuration
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                This page will contain group settings, database configuration, and administrative options.
              </p>
              <p className="text-sm text-muted-foreground">
                Continue prompting to have this page fully implemented with configuration options.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
