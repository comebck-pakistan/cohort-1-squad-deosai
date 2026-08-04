'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AuthShell } from '@/components/auth/AuthShell'
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
        <AuthShell>
            <div className="space-y-8">
                <div data-auth="header" className="text-center">
                    <h1 className="font-heading text-3xl font-bold tracking-tight text-ink">
                        Update Password
                    </h1>
                    <p className="mt-2 text-sm text-ink-soft">
                        Enter your new password below.
                    </p>
                </div>

                <div data-auth="panel" className="rounded-[var(--radius-card)] border border-line bg-card-strong p-8 shadow-sm">
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
        </AuthShell>
    )
}