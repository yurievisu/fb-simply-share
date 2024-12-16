import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { Navigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LogIn, UserPlus, Mail, Lock } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Login = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md animate-pulse">
          <CardContent className="h-64" />
        </Card>
      </div>
    );
  }

  if (user) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-opacity-50">
        <CardHeader className="space-y-3">
          <div className="flex items-center justify-center space-x-2">
            <LogIn className="h-6 w-6 text-facebook" />
            <CardTitle className="text-2xl font-semibold text-center">Welcome Back</CardTitle>
          </div>
          <CardDescription className="text-center text-muted-foreground">
            Sign in to your account or create a new one to get started
          </CardDescription>
          <div className="flex justify-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-1" />
              <span>Email Sign In</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center">
              <Lock className="h-4 w-4 mr-1" />
              <span>Secure Auth</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center">
              <UserPlus className="h-4 w-4 mr-1" />
              <span>Easy Sign Up</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: "#1877F2",
                    brandAccent: "#166FE5",
                    brandButtonText: "white",
                    defaultButtonBackground: "white",
                    defaultButtonBackgroundHover: "#F5F5F5",
                    inputBackground: "white",
                    inputBorder: "#E5E7EB",
                    inputBorderHover: "#D1D5DB",
                    inputBorderFocus: "#1877F2",
                  },
                  space: {
                    inputPadding: "12px",
                    buttonPadding: "12px",
                  },
                  borderWidths: {
                    buttonBorderWidth: "1px",
                    inputBorderWidth: "1px",
                  },
                  radii: {
                    borderRadiusButton: "8px",
                    buttonBorderRadius: "8px",
                    inputBorderRadius: "8px",
                  },
                  fonts: {
                    bodyFontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
                    buttonFontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
                  },
                },
              },
              className: {
                container: "space-y-4",
                label: "text-sm font-medium text-gray-700",
                button: "w-full font-medium shadow-sm",
                anchor: "text-facebook hover:text-facebook-dark font-medium",
              },
            }}
            providers={[]}
            redirectTo={window.location.origin}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;