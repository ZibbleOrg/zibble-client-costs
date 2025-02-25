"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {useRouter} from "next/navigation"
import { Lock } from "lucide-react"

export default function PasswordProtection({
    client
}: {
  client: string
}) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/validate-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, client }),
      })

      const data = await response.json()

      if (data.valid) {
        router.push(`/${client}`)
      } else {
        setError("Invalid password. Please try again.")
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <Lock className="w-16 h-16 mx-auto text-indigo-600" />
        <h3 className="mt-4 text-2xl font-semibold text-gray-800">Protected Content</h3>
        <p className="mt-2 text-gray-600">Please enter the password to access the costing</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
        <Button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
          disabled={isLoading}
        >
          {isLoading ? "Verifying..." : "Submit"}
        </Button>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </form>
    </div>
  )
}

