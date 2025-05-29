// app/pages/forgot-password/page.tsx
'use client';
import Link from 'next/link';
import { FiMail, FiArrowLeft, FiHelpCircle } from 'react-icons/fi';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Salesdone<span className="text-blue-600">AI</span>
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            Password Recovery Assistance
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm py-8 px-6 shadow-xl sm:rounded-2xl sm:px-10 border border-blue-100/50">
          <div className="text-center mb-6">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-50">
              <FiHelpCircle className="h-8 w-8 text-blue-500" />
            </div>
            <h2 className="mt-4 text-xl font-bold text-gray-800">
              Password Assistance Required
            </h2>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-blue-800 text-center">
                For security reasons and to maintain our multi-tenant architecture, 
                password resets require manual verification by our team.
              </p>
            </div>

            <div className="text-center text-gray-600">
              <p className="mb-4">
                Please contact the SalesDone AI Support Team directly for password assistance:
              </p>
              
              <div className="flex items-center justify-center space-x-2 mb-2">
                <FiMail className="h-5 w-5 text-blue-500" />
                <a 
                  href="mailto:support@salesdone.ai" 
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  support@salesdone.ai
                </a>
              </div>
              
              <p className="mt-6 text-sm text-gray-500">
                We'll verify your identity and help you regain access to your account.
              </p>
            </div>

            <div className="mt-8 text-center">
              <Link 
                href="/pages/login" 
                className="inline-flex items-center text-blue-600 hover:text-blue-500 font-medium"
              >
                <FiArrowLeft className="mr-2" />
                Return to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}