import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const StatusChecker = () => {
  const { toast } = useToast();
  const [postLink, setPostLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [processes, setProcesses] = useState<any[]>([]);

  const checkStatus = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://ryoboostingapi.onrender.com/check_status?post_link=${encodeURIComponent(
          postLink
        )}`
      );
      const data = await response.json();
      setProcesses(data.processes || []);
      
      if (data.processes.length === 0) {
        toast({
          title: "No processes found",
          description: "No active processes found for this post link.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to check status",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Check Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Enter post link"
              value={postLink}
              onChange={(e) => setPostLink(e.target.value)}
            />
            <Button
              onClick={checkStatus}
              disabled={loading}
              className="bg-facebook hover:bg-facebook-dark"
            >
              Check
            </Button>
          </div>

          {processes.map((process) => (
            <div key={process.process_id} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Process ID: {process.process_id}</span>
                <span>Status: {process.status}</span>
              </div>
              <Progress value={process.progress} className="w-full" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};