import LoginForm from "../components/auth/LoginForm";
import AppHeader from "../components/common/AppHeader";
import Card from "../components/common/Card";

const Login = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <AppHeader />
      <div className="w-full max-w-md px-4">
        <Card title="Welcome Back">
          <LoginForm />
        </Card>
      </div>
    </div>
  );
};

export default Login;
