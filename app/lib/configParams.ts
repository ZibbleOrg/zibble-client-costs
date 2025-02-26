import untypedConfig from "@/config.json";

const config = untypedConfig as { [key: string]: {
    notionEmbedUrl: string
}}

export default async function configParams() {
    const clients = Object.keys(config)

    return clients.map((post) => ({
        slug: post,
    }))
}
