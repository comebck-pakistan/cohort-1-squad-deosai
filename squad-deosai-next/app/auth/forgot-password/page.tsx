'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { AuthShell } from '@/components/auth/AuthShell'
import { Button } from '@/components/ui/Button'
import { Input, Label } from '@/components/ui/Field'

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
        <AuthShell>
            <div className="space-y-8">
                <div data-auth="header" className="text-center">
                    <h1 className="font-heading text-3xl font-bold tracking-tight text-ink">
                        Reset Password
                    </h1>
                    <p className="mt-2 text-sm text-ink-soft">
                        Enter your email and we'll send you a reset link.
                    </p>
                </div>

                <div data-auth="panel" className="rounded-[var(--radius-card)] border border-line bg-card-strong p-8 shadow-sm">
                    <form onSubmit={handleReset} className="space-y-5">
                        {error && (
                            <div className="rounded-xl border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">
                                {error}
                            </div>
                        )}
                        {message && (
                            <div className="rounded-xl border border-success/30 bg-success/5 px-4 py-3 text-sm text-success">
                                {message}
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
                            disabled={loading}
                            className="w-full"
                            size="lg"
                        >
                            {loading ? 'Sending...' : 'Send Reset Link'}
                        </Button>
                    </form>
                </div>

                <div data-auth="footer" className="text-center">
                    <p className="text-sm text-ink-soft">
                        <Link href="/auth/login" className="font-medium text-teal transition-colors hover:text-teal-bright">
                            Back to Login
                        </Link>
                    </p>
                </div>
            </div>
        </AuthShell>
    )
}