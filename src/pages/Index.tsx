import { useAuth } from "@/components/AuthProvider";
import { Navigate } from "react-router-dom";
import { ShareForm } from "@/components/ShareForm";
import { StatusChecker } from "@/components/StatusChecker";

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8 space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          FB Share Boost
        </h1>
        <div className="grid md:grid-cols-2 gap-8">
          <ShareForm />
          <StatusChecker />
        </div>
      </main>
    </div>
  );
};

export default Index;