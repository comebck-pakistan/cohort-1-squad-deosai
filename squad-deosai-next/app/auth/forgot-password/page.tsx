'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setMessage('')

        const supabase = createClient()
        e.preventDefault()
        setLoading(true)
        setError('')
        setMessage('')

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/update-password`,
        })

        if (error) {
            setError(error.message)
        } else {
            setMessage('Password reset link sent! Check your email.')
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full p-8 bg-white rounded-lg shadow">
                <h2 className="text-2xl font-bold text-center">Reset Password</h2>
                <p className="text-center text-gray-600 mt-2">
                    Enter your email and we'll send you a reset link.
                </p>
                <form onSubmit={handleReset} className="mt-6 space-y-4">
                    {error && (
                        <div className="bg-red-50 text-red-500 p-3 rounded text-sm">
                            {error}
                        </div>
                    )}
                    {message && (
                        <div className="bg-green-50 text-green-600 p-3 rounded text-sm">
                            {message}
                        </div>
                    )}
                    <input
                        type="email"
                        placeholder="seller@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>
                <p className="text-center text-sm mt-4">
                    <a href="/auth/login" className="text-blue-600 hover:underline">
                        Back to Login
                    </a>
                </p>
            </div>
        </div>
    )
}