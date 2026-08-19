// app/auth/signup/page.tsx
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AuthShell } from '@/components/auth/AuthShell'
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
        
        console.log('--- STARTING SIGNUP ---')
        console.log('Attempting to create user:', email)

        try {
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

            console.log('RAW SUPABASE RESPONSE:', { data, error })

            if (error) {
                console.error('Supabase auth.signUp returned an error object:', error)
                console.error('Error status:', error.status)
                console.error('Error name:', error.name)
                setError(`Signup failed [${error.status}]: ${error.message}`)
            } else if (data.user?.identities && data.user.identities.length === 0) {
                console.error('Email already in use (identities is empty)')
                setError('Email already in use.')
            } else {
                console.log('Signup success! User data:', data.user)
                console.log('Session data:', data.session)

                if (data.session) {
                    console.log('Redirecting to onboarding...')
                    router.push('/onboarding')
                } else {
                    console.log('No session returned. Email confirmation required.')
                    setError('Signup successful! Please check your email to confirm your account.')
                }
            }
        } catch (err) {
            // This catches network failures or thrown exceptions (like 500s that crash the fetch)
            console.error('CRITICAL UNEXPECTED ERROR during signUp:', err)
            // @ts-ignore
            setError(`Unexpected Error: ${err?.message || JSON.stringify(err)}`)
        } finally {
            console.log('--- SIGNUP ATTEMPT FINISHED ---')
            setLoading(false)
        }
    }

    return (
        <AuthShell>
            <div className="space-y-8">
                <div data-auth="header" className="text-center">
                    <h1 className="font-heading text-3xl font-bold tracking-tight text-ink">
                        Create your account
                    </h1>
                    <p className="mt-2 text-sm text-ink-soft">
                        Start automating your store in minutes
                    </p>
                </div>

                {/* Card */}
                <div data-auth="panel" className="rounded-[var(--radius-card)] border border-line bg-card-strong p-8 shadow-sm">
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
                <div data-auth="footer" className="text-center">
                    <p className="text-sm text-ink-soft">
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
        </AuthShell>
    )
}