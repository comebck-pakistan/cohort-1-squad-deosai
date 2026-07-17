// app/auth/signup/page.tsx
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { Input, Label } from '@/components/ui/Field'

export default function SignupPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [businessName, setBusinessName] = useState('')
    const [phone, setPhone] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        const supabase = createClient()

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    business_name: businessName,
                    phone: phone,
                },
            },
        })

        if (error) {
            setError(error.message)
        } else {
            // Insert into sellers table
            if (data.user) {
                const { error: insertError } = await supabase
                    .from('sellers')
                    .insert({
                        id: data.user.id,
                        email: email,
                        business_name: businessName,
                        phone: phone,
                    })
                if (insertError) {
                    console.error('Error creating seller:', insertError)
                }
            }
            router.push('/dashboard')
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
                            Create your account
                        </h1>
                        <p className="mt-2 text-sm text-ink-soft">
                            Start automating your store in minutes
                        </p>
                    </div>
                </div>

                {/* Card */}
                <div className="rounded-[var(--radius-card)] border border-line bg-card p-8 shadow-sm">
                    <form className="space-y-5" onSubmit={handleSignup}>
                        {error && (
                            <div className="rounded-xl border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">
                                {error}
                            </div>
                        )}

                        <div>
                            <Label htmlFor="businessName">Business Name</Label>
                            <Input
                                id="businessName"
                                type="text"
                                required
                                value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)}
                                placeholder="My Store"
                            />
                        </div>

                        <div>
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                type="tel"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="+92 300 1234567"
                            />
                        </div>

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

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full"
                            size="lg"
                        >
                            {loading ? 'Creating account…' : 'Start free'}
                        </Button>
                    </form>
                </div>

                {/* Footer link */}
                <p className="text-center text-sm text-ink-soft">
                    Already have an account?{' '}
                    <Link
                        href="/auth/login"
                        className="font-medium text-teal transition-colors hover:text-teal-bright"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    )
}