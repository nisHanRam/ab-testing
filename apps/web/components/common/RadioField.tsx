// components/common/RadioField.tsx

import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Option {
  value: string;
  label: string;
}

interface RadioFieldProps {
  control: any;
  name: string;
  label: string;
  icon?: React.ReactNode;
  options: Option[];
  error?: string;
}

const RadioField = ({
  control,
  name,
  label,
  icon,
  options,
  error,
}: RadioFieldProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            {icon}
            {label}
          </Label>
          <RadioGroup
            onValueChange={field.onChange}
            value={field.value}
            className="flex items-center gap-6"
          >
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.value}
                  id={`${name}-${option.value}`}
                />
                <Label htmlFor={`${name}-${option.value}`}>
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      )}
    />
  );
};

export default RadioField;
