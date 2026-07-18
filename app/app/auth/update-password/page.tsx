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

    useEffect(() => {
        const checkSession = async () => {
            const supabase = createClient()
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
                router.push('/auth/login')
            }
        }
        checkSession()
    }, [router])

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setMessage('')
        const supabase = createClient()

        const { error } = await supabase.auth.updateUser({
            password: password,
        })

        if (error) {
            setError(error.message)
        } else {
            setMessage('✅ Password updated successfully!')
            setTimeout(() => router.push('/auth/login'), 2000)
        }
        setLoading(false)
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-paper px-5 py-16">
            <div
                aria-hidden
                className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-teal-soft blur-3xl opacity-50"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-marigold-soft blur-3xl opacity-60"
            />

            <div className="relative z-10 w-full max-w-md space-y-8">
                <div className="flex flex-col items-center gap-4">
                    <Link href="/" aria-label="Back to home">
                        <Logo />
                    </Link>
                    <div className="text-center">
                        <h1 className="font-display text-3xl tracking-tight text-ink">
                            Update Password
                        </h1>
                        <p className="mt-2 text-sm text-ink-soft">
                            Enter your new password below.
                        </p>
                    </div>
                </div>

                <div className="rounded-[var(--radius-card)] border border-line bg-card p-8 shadow-sm">
                    <form onSubmit={handleUpdate} className="space-y-5">
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
                            <Label htmlFor="password">New Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full"
                            size="lg"
                        >
                            {loading ? 'Updating...' : 'Update Password'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}