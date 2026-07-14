import React from 'react';
import { Outlet } from 'react-router-dom';

export function OnboardingLayout() {
  return (
    <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <Outlet />
      </div>
    </div>
  );
}
