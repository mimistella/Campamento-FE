import React from "react";
import { UserIcon, LockIcon} from "lucide-react";

const LoginForm = () => {
  return (
    <form className="space-y-4">
      <div className="flex items-center border border-gray-300 rounded-md">
        <UserIcon className="h-5 w-5 text-gray-400 ml-2" />
        <input
          type="text"
          placeholder="Username"
          className="flex-1 p-2 outline-none"
        />
      </div>
      <div className="flex items-center border border-gray-300 rounded-md">
        <LockIcon className="h-5 w-5 text-gray-400 ml-2" />
        <input
          type="password"
          placeholder="Password"
          className="flex-1 p-2 outline-none"
        />
      </div>
      <button className="w-full block bg-amber-600 hover:bg-amber-500 px-4 py-2 rounded-md font-medium transition-colors">
        Login
      </button>
        <div className="text-center text-gray-600">
            <span>Don't have an account? </span>
            <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a>
        </div>
    </form>
  );
};

export default LoginForm;
