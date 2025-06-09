'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import Link from 'next/link'

export default function Register() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    companyName: 'ACME Corp',
    email: 'admin@acmecorp.com',
    password: 'password123',
    confirmPassword: 'password123'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      toast.error('Error', {
        description: 'Passwords do not match',
      })
      return
    }
    
    if (formData.companyName && formData.email && formData.password) {
      toast.success('Registration Successful', {
        description: 'Welcome to ERP System!',
      })
      router.push('/dashboard')
    } else {
      toast.error('Error', {
        description: 'Please fill in all fields',
      })
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Register Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">
              <span className="text-black">ERP</span>
            </div>
            <p className="text-sm text-gray-500">Powered by WORKDO</p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Register</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                    className="w-full"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="w-full"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3"
                >
                  Register
                </Button>

                <div className="text-center">
                  <span className="text-gray-600">Already have an account? </span>
                  <Link href="/login" className="text-primary hover:underline">
                    Login
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="text-center text-sm text-gray-500">
            Copyright ERP 2025
          </div>
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-green-400 to-green-600 items-center justify-center text-white p-8">
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold">"Start Your Business Journey"</h2>
            <p className="text-xl">Join thousands of companies managing their operations with ERP System.</p>
          </div>
          
          {/* Placeholder for illustration */}
          <div className="w-96 h-96 bg-white/10 rounded-lg flex items-center justify-center">
            <div className="text-6xl">🚀</div>
          </div>
        </div>
      </div>
    </div>
  )
}