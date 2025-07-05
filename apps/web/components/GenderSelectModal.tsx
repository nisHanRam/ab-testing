// components/GenderSelectModal.tsx

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

interface GenderSelectModalProps {
  onConfirm: (gender: "male" | "female") => void;
}

const GenderSelectModal = ({ onConfirm }: GenderSelectModalProps) => {
  const [gender, setGender] = useState<"male" | "female" | "">("");

  const handleConfirm = () => {
    if (gender) {
      onConfirm(gender);
    }
  };

  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Your Gender</DialogTitle>
        </DialogHeader>

        <RadioGroup
          value={gender}
          onValueChange={(val) => setGender(val as "male" | "female")}
          className="space-y-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="male" id="male" />
            <Label htmlFor="male">Male</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="female" id="female" />
            <Label htmlFor="female">Female</Label>
          </div>
        </RadioGroup>

        <DialogFooter>
          <Button type="button" disabled={!gender} onClick={handleConfirm}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GenderSelectModal;
