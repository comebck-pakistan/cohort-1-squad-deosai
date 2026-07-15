'use client'

import { useState } from 'react'
import Papa from 'papaparse'
import { createClient } from '@/lib/supabase/client'

interface Product {
    name: string
    price: number
    category: string
    availability_status: string
}

export default function CSVUploader() {
    const [file, setFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (selectedFile) {
            setFile(selectedFile)
            setMessage(null)
        }
    }

    const handleUpload = async () => {
        if (!file) {
            setMessage({ text: 'Please select a CSV file first', type: 'error' })
            return
        }

        setUploading(true)
        setMessage(null)
        const supabase = createClient()

        try {
            // Get current user
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                setMessage({ text: 'Please login first', type: 'error' })
                setUploading(false)
                return
            }

            // Parse CSV
            const results = await new Promise<Papa.ParseResult<any>>((resolve, reject) => {
                Papa.parse(file, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => resolve(results),
                    error: (error) => reject(error),
                })
            })

            if (results.data.length === 0) {
                setMessage({ text: 'No data found in CSV', type: 'error' })
                setUploading(false)
                return
            }

            // Map CSV columns to product fields
            const headers = Object.keys(results.data[0])
            const nameColumn = headers.find(h =>
                h.toLowerCase().includes('name') ||
                h.toLowerCase().includes('product') ||
                h.toLowerCase().includes('title')
            )
            const priceColumn = headers.find(h =>
                h.toLowerCase().includes('price') ||
                h.toLowerCase().includes('cost') ||
                h.toLowerCase().includes('amount')
            )
            const categoryColumn = headers.find(h =>
                h.toLowerCase().includes('category') ||
                h.toLowerCase().includes('type')
            )
            const availabilityColumn = headers.find(h =>
                h.toLowerCase().includes('available') ||
                h.toLowerCase().includes('stock') ||
                h.toLowerCase().includes('status')
            )

            if (!nameColumn) {
                setMessage({
                    text: 'Could not find product name column. Please use "name" or "product" as header.',
                    type: 'error'
                })
                setUploading(false)
                return
            }

            // Prepare products for insertion
            const products = results.data.map((row: any) => ({
                seller_id: user.id,
                name: row[nameColumn]?.trim() || 'Unnamed Product',
                price: priceColumn ? parseFloat(row[priceColumn]) || 0 : 0,
                category: categoryColumn ? row[categoryColumn]?.trim() || '' : '',
                availability_status: availabilityColumn
                    ? (row[availabilityColumn]?.toLowerCase().includes('in stock') ||
                        row[availabilityColumn]?.toLowerCase().includes('available'))
                        ? 'in_stock'
                        : 'out_of_stock'
                    : 'in_stock',
                description: '',
                image_url: '',
            }))

            // Insert products into database
            const { error } = await supabase
                .from('products')
                .insert(products)

            if (error) {
                setMessage({ text: `Error uploading products: ${error.message}`, type: 'error' })
            } else {
                setMessage({ text: `✅ Successfully uploaded ${products.length} products!`, type: 'success' })
                setFile(null)
                // Reset file input
                const fileInput = document.getElementById('csv-upload') as HTMLInputElement
                if (fileInput) fileInput.value = ''
            }
        } catch (error) {
            setMessage({
                text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
                type: 'error'
            })
        }

        setUploading(false)
    }

    return (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <div className="text-center">
                <div className="mt-2">
                    <input
                        id="csv-upload"
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
                    />
                </div>
                {file && (
                    <p className="mt-2 text-sm text-gray-600">
                        Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)
                    </p>
                )}
                <button
                    onClick={handleUpload}
                    disabled={!file || uploading}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {uploading ? 'Uploading...' : 'Upload Catalogue'}
                </button>
                {message && (
                    <p className={`mt-2 text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                        {message.text}
                    </p>
                )}
            </div>
        </div>
    )
}