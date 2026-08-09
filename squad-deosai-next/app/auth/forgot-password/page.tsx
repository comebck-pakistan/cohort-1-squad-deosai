'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { AuthShell } from '@/components/auth/AuthShell'
import { Button } from '@/components/ui/Button'
import { Input, Label } from '@/components/ui/Field'

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        const supabase = createClient()

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/update-password`,
        })

        if (error) {
            // Note: If Supabase "Prevent email enumeration" is ON, 
            // it will not return an error for non-existent emails, which satisfies the requirement to not leak email existence.
            setError(error.message)
        } else {
            setIsSuccess(true)
        }
        setLoading(false)
    }

    return (
        <AuthShell>
            <div className="space-y-8">
                <div data-auth="header" className="text-center">
                    <h1 className="font-heading text-3xl font-bold tracking-tight text-ink">
                        Reset Password
                    </h1>
                    <p className="mt-2 text-sm text-ink-soft">
                        {isSuccess 
                            ? "Check your email for the reset link."
                            : "Enter your email and we'll send you a reset link."}
                    </p>
                </div>

                <div data-auth="panel" className="rounded-[var(--radius-card)] border border-line bg-card-strong p-8 shadow-sm">
                    {isSuccess ? (
                        <div className="flex flex-col items-center text-center space-y-6">
                            <div className="rounded-xl border border-success/30 bg-success/5 px-4 py-4 text-success">
                                <p className="text-base font-medium">
                                    ✅ Email sent to <span className="font-bold">{email}</span>! 
                                </p>
                                <p className="text-sm mt-1">
                                    Please check your inbox.
                                </p>
                            </div>
                            
                            <Button asChild className="w-full" size="lg">
                                <Link href="/auth/login">
                                    Back to Login
                                </Link>
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleReset} className="space-y-5">
                            {error && (
                                <div className="rounded-xl border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">
                                    {error}
                                </div>
                            )}
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="seller@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                disabled={loading || !email}
                                className="w-full"
                                size="lg"
                            >
                                {loading ? 'Sending...' : 'Send Reset Link'}
                            </Button>
                        </form>
                    )}
                </div>

                {!isSuccess && (
                    <div data-auth="footer" className="text-center">
                        <p className="text-sm text-ink-soft">
                            <Link href="/auth/login" className="font-medium text-teal transition-colors hover:text-teal-bright">
                                Back to Login
                            </Link>
                        </p>
                    </div>
                )}
            </div>
        </AuthShell>
    )
}