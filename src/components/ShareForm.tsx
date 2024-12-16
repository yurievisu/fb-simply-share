import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ShareForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cookies: "",
    post_link: "",
    share_count: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://ryoboostingapi.onrender.com/start_share", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          share_count: parseInt(formData.share_count),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Success",
          description: "Share process started successfully!",
        });
      } else {
        throw new Error(data.error || "Failed to start share process");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Start Share Process</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Cookies</label>
            <Textarea
              placeholder="Enter your cookies"
              value={formData.cookies}
              onChange={(e) =>
                setFormData({ ...formData, cookies: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Post Link</label>
            <Input
              placeholder="Enter post link"
              value={formData.post_link}
              onChange={(e) =>
                setFormData({ ...formData, post_link: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Share Count</label>
            <Input
              type="number"
              placeholder="Enter share count"
              value={formData.share_count}
              onChange={(e) =>
                setFormData({ ...formData, share_count: e.target.value })
              }
              required
              min="1"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-facebook hover:bg-facebook-dark"
            disabled={loading}
          >
            {loading ? "Starting..." : "Start Share"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};