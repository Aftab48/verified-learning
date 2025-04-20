
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface CreatorApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatorApplicationForm = ({ isOpen, onClose }: CreatorApplicationFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    expertise: "",
    experience: "",
    description: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application Submitted",
      description: "We'll review your application and get back to you soon.",
    });
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Apply as Creator</DialogTitle>
          <DialogDescription>
            Fill out this form to become a verified creator on our platform.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="expertise">Area of Expertise</Label>
            <Input
              id="expertise"
              name="expertise"
              placeholder="e.g., Mathematics, Programming, Science"
              required
              value={formData.expertise}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="experience">Years of Experience</Label>
            <Input
              id="experience"
              name="experience"
              type="number"
              min="0"
              placeholder="Years of teaching/professional experience"
              required
              value={formData.experience}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Tell us about yourself</Label>
            <Input
              id="description"
              name="description"
              placeholder="Brief description of your background and what you'll teach"
              required
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Submit Application</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatorApplicationForm;
