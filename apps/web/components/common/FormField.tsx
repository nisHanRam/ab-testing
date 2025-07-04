import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff } from "lucide-react";

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  icon: React.ReactNode;
  error?: string;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  register?: any;
}

const FormField = ({
  id,
  label,
  type = "text",
  placeholder,
  icon,
  error,
  showPassword,
  onTogglePassword,
  register,
}: FormFieldProps) => {
  const isPasswordField =
    type === "password" || (type === "text" && onTogglePassword);

  return (
    <div className="space-y-2">
      <Label
        htmlFor={id}
        className="text-sm font-medium text-gray-700 flex items-center gap-2"
      >
        {icon}
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type={isPasswordField && showPassword ? "text" : type}
          placeholder={placeholder}
          className="h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors"
          {...register}
        />
        {isPasswordField && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
      {error && (
        <Alert variant="destructive" className="py-2">
          <AlertDescription className="text-sm">{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default FormField;
