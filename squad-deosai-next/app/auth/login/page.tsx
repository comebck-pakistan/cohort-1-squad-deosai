// app/auth/login/page.tsx
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { Input, Label } from '@/components/ui/Field'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        const supabase = createClient()

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setError(error.message)
        } else {
            router.push('/dashboard')
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
                            Welcome back
                        </h1>
                        <p className="mt-2 text-sm text-ink-soft">
                            Sign in to manage your shop
                        </p>
                    </div>
                </div>

                {/* Card */}
                <div className="rounded-[var(--radius-card)] border border-line bg-card p-8 shadow-sm">
                    <form className="space-y-5" onSubmit={handleLogin}>
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
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="seller@example.com"
                            />
                        </div>

                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                        </div>
                        <div className="text-right">
                            <a href="/auth/forgot-password" className="text-sm text-blue-600 hover:underline">
                                Forgot password?
                            </a>
                        </div>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full"
                            size="lg"
                        >
                            {loading ? 'Signing in…' : 'Sign In'}
                        </Button>
                    </form>
                </div>

                {/* Footer link */}
                <p className="text-center text-sm text-ink-soft">
                    Don&apos;t have an account?{' '}
                    <Link
                        href="/auth/signup"
                        className="font-medium text-teal transition-colors hover:text-teal-bright"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}