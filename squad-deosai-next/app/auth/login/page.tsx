'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input, Label } from '@/components/ui/Field'
import { AuthShell } from '@/components/auth/AuthShell'

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
        <AuthShell>
            <div className="space-y-8">
                <div data-auth="header" className="text-center">
                    <h1 className="font-heading text-3xl font-bold tracking-tight text-ink">
                        Welcome back
                    </h1>
                    <p className="mt-2 text-sm text-ink-soft">
                        Sign in to manage your shop
                    </p>
                </div>

                {/* Card */}
                <div data-auth="panel" className="rounded-[var(--radius-card)] border border-line bg-card-strong p-8 shadow-sm">
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
                            <a href="/auth/forgot-password" className="text-sm text-teal hover:underline font-semibold">
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
                <div data-auth="footer" className="text-center">
                    <p className="text-sm text-ink-soft">
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
        </AuthShell>
    )
}