import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { BotMessageSquare } from 'lucide-react';

export function Signup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate network delay
    setTimeout(() => {
      // In a real app, we'd sign them up and log them in
      // For mock, we'll just redirect to onboarding
      navigate('/onboarding');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030712] p-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-blue-600 to-violet-600 p-2 rounded-xl shadow-lg shadow-blue-900/20">
              <BotMessageSquare className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-white">NexusChat AI</span>
          </Link>
        </div>
        
        <Card className="border-gray-800 bg-gray-900/80 backdrop-blur">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-semibold tracking-tight text-white">Create an account</CardTitle>
            <CardDescription className="text-gray-400">
              Start automating your store's DMs today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300" htmlFor="name">Full Name</label>
                <Input id="name" placeholder="Ayesha Khan" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300" htmlFor="business">Business Name</label>
                <Input id="business" placeholder="Ayesha's Wardrobe" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300" htmlFor="email">Email</label>
                <Input id="email" type="email" placeholder="ayesha@example.com" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300" htmlFor="password">Password</label>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full" variant="gradient" isLoading={isLoading}>
                Create Account
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-400">
              Already have an account? <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium">Sign in</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
