import React from 'react';
import { MOCK_PRODUCTS } from '../../data/mock';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Search, Plus, Filter, MoreHorizontal } from 'lucide-react';

export function Catalogue() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Product Catalogue</h1>
          <p className="text-gray-400 text-sm">Manage the products your AI uses to answer customer questions.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Import CSV</Button>
          <Button variant="gradient"><Plus className="mr-2 h-4 w-4" /> Add Product</Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-4 rounded-xl border border-gray-800 bg-gray-900/50">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input placeholder="Search products..." className="pl-9 h-9" />
        </div>
        <Button variant="ghost" size="sm" className="w-full sm:w-auto"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_PRODUCTS.map(product => (
          <div key={product.id} className="group rounded-xl border border-gray-800 bg-gray-900/50 overflow-hidden hover:border-gray-700 transition-all shadow-sm">
            <div className="aspect-[4/3] bg-gray-800 relative overflow-hidden">
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-2 right-2">
                <Badge variant={product.availability === 'In Stock' ? 'success' : 'warning'} className="backdrop-blur-md bg-opacity-80">
                  {product.availability}
                </Badge>
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-100">{product.name}</h3>
                  <p className="text-sm text-blue-400 font-medium">Rs. {product.price}</p>
                </div>
                <Button size="icon" variant="ghost" className="h-8 w-8 -mr-2"><MoreHorizontal className="h-4 w-4" /></Button>
              </div>
              <p className="text-xs text-gray-500 mb-4 line-clamp-2">{product.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {product.variants.map(v => (
                  <span key={v} className="px-2 py-1 rounded text-[10px] font-medium bg-gray-800 text-gray-300 border border-gray-700">
                    {v}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
