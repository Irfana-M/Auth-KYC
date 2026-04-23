import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../../schemas/authSchema';
import { registerUser } from '../../services/authService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Input from '../common/Input';
import Button from '../common/Button';

type FormData = { email: string; password: string };

const RegisterForm = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await registerUser(data.email, data.password);
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Registration failed';
      toast.error(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        {...register('email')}
        error={errors.email?.message}
      />

      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        {...register('password')}
        error={errors.password?.message}
      />

      <Button 
        type="submit" 
        isLoading={isSubmitting} 
        fullWidth
      >
        Create Account
      </Button>
    </form>
  );
};

export default RegisterForm;