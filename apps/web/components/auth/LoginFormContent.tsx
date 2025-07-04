import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Lock } from "lucide-react";
import { loginSchema, LoginFormData } from "@/lib/auth-schemas";
import FormField from "@components/common/FormField";

interface LoginFormContentProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
  isLoading: boolean;
}

const LoginFormContent = ({ onSubmit, isLoading }: LoginFormContentProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleSubmit = (data: LoginFormData) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
      <FormField
        id="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        icon={<Mail className="w-4 h-4" />}
        error={form.formState.errors.email?.message}
        register={form.register("email")}
      />

      <FormField
        id="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
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
            Signing In...
          </div>
        ) : (
          "Sign In"
        )}
      </Button>
    </form>
  );
};

export default LoginFormContent;
