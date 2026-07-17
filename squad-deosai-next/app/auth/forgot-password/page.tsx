// app/auth/forgot-password/page.tsx
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { Input, Label } from '@/components/ui/Field'

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const supabase = createClient()

    const handleReset = async (e: React.FormEvent) => {
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
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-paper px-5 py-16">
            {/* Decorative blurs — mirrors the landing-page hero aesthetic */}
            <div
                aria-hidden
                className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-marigold-soft blur-3xl opacity-60"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-teal-soft blur-3xl opacity-50"
            />

            <div className="relative z-10 w-full max-w-md space-y-8">
                {/* Logo */}
                <div className="flex flex-col items-center gap-4">
                    <Link href="/" aria-label="Back to home">
                        <Logo />
                    </Link>
                    <div className="text-center">
                        <h1 className="font-display text-3xl tracking-tight text-ink">
                            Reset your password
                        </h1>
                        <p className="mt-2 text-sm text-ink-soft">
                            Enter your email and we&apos;ll send you a reset link
                        </p>
                    </div>
                </div>

                {/* Card */}
                <div className="rounded-[var(--radius-card)] border border-line bg-card p-8 shadow-sm">
                    <form className="space-y-5" onSubmit={handleReset}>
                        {error && (
                            <div className="rounded-xl border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">
                                {error}
                            </div>
                        )}
                        {message && (
                            <div className="rounded-xl border border-teal/30 bg-teal-soft px-4 py-3 text-sm text-teal">
                                {message}
                            </div>
                        )}

                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="seller@example.com"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full"
                            size="lg"
                        >
                            {loading ? 'Sending…' : 'Send reset link'}
                        </Button>
                    </form>
                </div>

                {/* Footer link */}
                <p className="text-center text-sm text-ink-soft">
                    Remembered it?{' '}
                    <Link
                        href="/auth/login"
                        className="font-medium text-teal transition-colors hover:text-teal-bright"
                    >
                        Back to login
                    </Link>
                </p>
            </div>
        </div>
    )
}
