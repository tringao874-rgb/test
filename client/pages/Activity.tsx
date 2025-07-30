import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function ActivityPage() {
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
              Activity Log
            </h1>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Activity Log Page
            </CardTitle>
            <CardDescription>
              Detailed activity log with filtering and search capabilities (Manager access required)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Activity className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Activity Monitoring
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                This page will show detailed activity logs with timestamps, filtering, and export features.
              </p>
              <p className="text-sm text-muted-foreground">
                Continue prompting to have this page fully implemented with activity tracking features.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
