// app/dashboard/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'

export default function Dashboard() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                router.push('/auth/login')
            } else {
                setUser(user)
            }
            setLoading(false)
        }
        getUser()
    }, [router, supabase])

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto p-8">
                <div className="bg-white rounded-lg shadow p-6">
                    <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
                    <p className="text-gray-600 mb-6">
                        Welcome, {user?.user_metadata?.business_name || user?.email}!
                    </p>
                    <div className="border-t pt-6">
                        <h2 className="text-xl font-semibold mb-4">Your Store</h2>
                        <p className="text-gray-500">Upload your catalogue and manage your store here.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}