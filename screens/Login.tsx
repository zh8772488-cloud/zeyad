import React from 'react';
import { Button, Input } from '../components/UI';
import { ArrowRight, BookOpen } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bgLight p-6 relative overflow-hidden">
      {/* Abstract Background Element */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-primary rounded-b-[3rem] z-0"></div>
      
      <div className="z-10 w-full max-w-md flex flex-col gap-8 animate-fade-in-up">
        <div className="text-center text-white space-y-2">
          <div className="mx-auto w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 mb-6">
            <BookOpen className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Muttabae</h1>
          <h2 className="text-xl font-arabic text-gray-300">مُتَتَبِّع</h2>
          <p className="text-gray-300 mt-4 text-sm font-light">
            Track tasks. Manage your team. <br/> Stay in control.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-2xl shadow-primary/20 space-y-6">
          <div className="space-y-4">
            <Input label="Email Address" placeholder="editor@publisher.com" type="email" />
            <Input label="Password" placeholder="••••••••" type="password" />
          </div>
          
          <div className="flex justify-end">
             <button className="text-sm text-secondary font-medium hover:underline">Forgot Password?</button>
          </div>

          <Button onClick={onLogin} className="w-full" size="lg">
            Sign In <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          
          <div className="text-center text-xs text-neutral mt-4">
            By signing in, you agree to our Terms of Service.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
