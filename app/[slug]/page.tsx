import { cookies } from "next/headers"
import NotionEmbed from "../components/NotionEmbed"
import untypedConfig from "@/config.json"
import { verifyJWT } from "../lib/jwt"
import {redirect} from "next/navigation";

const config = untypedConfig as { [key: string]: {
    notionEmbedUrl: string
}}

export async function generateStaticParams() {
    const clients = Object.keys(config)

    return clients.map((post) => ({
        slug: post,
    }))
}

export default async function ClientPage({ params }: { params: Promise<{ slug: string }> }) {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth_token")?.value
  const payload = token ? await verifyJWT(token) : null
  const isAuthenticated = payload?.authenticated === true
  const client = payload?.client
  const slug = (await params).slug

  if (!isAuthenticated || !client || client !== slug) {
      return redirect(`${slug}/login`)
  }

  return (
      <main className="flex-grow container mx-auto py-12 px-2">
          <NotionEmbed notionEmbedUrl={config[client].notionEmbedUrl}/>
      </main>
  )
}

