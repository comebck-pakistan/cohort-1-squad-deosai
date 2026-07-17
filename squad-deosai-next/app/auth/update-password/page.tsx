// app/auth/update-password/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { Input, Label } from '@/components/ui/Field'

export default function UpdatePasswordPage() {
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
                router.push('/auth/login')
            }
        }
        checkSession()
    }, [])

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setMessage('')

        const { error } = await supabase.auth.updateUser({
            password: password,
        })

        if (error) {
            setError(error.message)
        } else {
            setMessage('Password updated successfully! Redirecting…')
            setTimeout(() => router.push('/auth/login'), 2000)
        }
        setLoading(false)
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-paper px-5 py-16">
            {/* Decorative blurs — mirrors the landing-page hero aesthetic */}
            <div
                aria-hidden
                className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-teal-soft blur-3xl opacity-50"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-marigold-soft blur-3xl opacity-60"
            />

            <div className="relative z-10 w-full max-w-md space-y-8">
                {/* Logo */}
                <div className="flex flex-col items-center gap-4">
                    <Link href="/" aria-label="Back to home">
                        <Logo />
                    </Link>
                    <div className="text-center">
                        <h1 className="font-display text-3xl tracking-tight text-ink">
                            Set a new password
                        </h1>
                        <p className="mt-2 text-sm text-ink-soft">
                            Enter your new password below
                        </p>
                    </div>
                </div>

                {/* Card */}
                <div className="rounded-[var(--radius-card)] border border-line bg-card p-8 shadow-sm">
                    <form className="space-y-5" onSubmit={handleUpdate}>
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
                            <Label htmlFor="password">New password</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full"
                            size="lg"
                        >
                            {loading ? 'Updating…' : 'Update password'}
                        </Button>
                    </form>
                </div>

                {/* Footer link */}
                <p className="text-center text-sm text-ink-soft">
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
