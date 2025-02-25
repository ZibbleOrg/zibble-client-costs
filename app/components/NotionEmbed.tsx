"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

interface NotionEmbedProps {
  notionEmbedUrl: string
}

export default function NotionEmbed({ notionEmbedUrl }: NotionEmbedProps) {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    await fetch("/api/logout", { method: "POST" })
    router.refresh()
  }

  return (
    <div>
        <Button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="mb-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out flex items-center"
        >
            <LogOut className="w-4 h-4 mr-2" />
            {isLoggingOut ? "Logging out..." : "Logout"}
        </Button>
      <div className="aspect-video mb-6 rounded-lg overflow-hidden shadow-lg">
        <iframe src={notionEmbedUrl} width="100%" height="100%" frameBorder="0" allowFullScreen></iframe>
      </div>

    </div>
  )
}

