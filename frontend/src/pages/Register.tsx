import RegisterForm from "../components/auth/RegisterForm";
import AppHeader from "../components/common/AppHeader";
import Card from "../components/common/Card";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <AppHeader />
      <div className="w-full max-w-md px-4">
        <Card title="Create New Account">
          <RegisterForm />
          <p className="text-center mt-6 text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign in here
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Register;
