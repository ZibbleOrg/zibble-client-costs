import { Building2 } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex items-center">
        <div className="flex items-center">
          <Building2 className="w-8 h-8 mr-2 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-800">Zibble</h1>
        </div>
      </div>
    </header>
  )
}

