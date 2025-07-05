import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, Mail, Lock, LucidePersonStanding } from "lucide-react";
import { signupSchema, SignupFormData } from "@/lib/auth-schemas";
import FormField from "@components/common/FormField";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import RadioField from "@components/common/RadioField";

interface SignupFormContentProps {
  onSubmit: (data: SignupFormData) => Promise<void>;
  isLoading: boolean;
}

const SignupFormContent = ({ onSubmit, isLoading }: SignupFormContentProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const handleSubmit = (data: SignupFormData) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
      <FormField
        id="username"
        label="Username"
        placeholder="Enter your username"
        icon={<User className="w-4 h-4" />}
        error={form.formState.errors.username?.message}
        register={form.register("username")}
      />

      <FormField
        id="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        icon={<Mail className="w-4 h-4" />}
        error={form.formState.errors.email?.message}
        register={form.register("email")}
      />

      <RadioField
        control={form.control}
        name="gender"
        label="Gender"
        icon={<LucidePersonStanding className="w-4 h-4" />}
        options={[
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
        ]}
        error={form.formState.errors.gender?.message}
      />

      <FormField
        id="password"
        label="Password"
        type="password"
        placeholder="Create a password"
        icon={<Lock className="w-4 h-4" />}
        error={form.formState.errors.password?.message}
        showPassword={showPassword}
        onTogglePassword={() => setShowPassword(!showPassword)}
        register={form.register("password")}
      />

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Creating Account...
          </div>
        ) : (
          "Create Account"
        )}
      </Button>
    </form>
  );
};

export default SignupFormContent;
