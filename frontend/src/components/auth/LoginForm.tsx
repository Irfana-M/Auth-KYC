import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../schemas/authSchema';
import { loginUser } from '../../services/authService';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../common/Input';
import Button from '../common/Button';

type FormData = { email: string; password: string };

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const result = await loginUser(data.email, data.password);
      login(result.data.accessToken, result.data.user);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (err: any) {
      const message = err.response?.data?.message || 'Login failed';
      toast.error(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Email Address"
        type="email"
        {...register('email')}
        error={errors.email?.message}
      />
      <Input
        label="Password"
        type="password"
        {...register('password')}
        error={errors.password?.message}
      />

      <Button type="submit" isLoading={isSubmitting} fullWidth>
        Sign In
      </Button>
       <p className="text-center text-sm text-gray-600">
      New here?{" "}
      <Link to="/register" className="text-blue-600 hover:underline font-medium">
        Sign up
      </Link>
    </p>
    </form>
  );
};

export default LoginForm;