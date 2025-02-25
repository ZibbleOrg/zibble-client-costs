import PasswordProtection from "@/app/components/PasswordProtection";
import { Card, CardContent } from "@/components/ui/card";

export default async function LoginPage({ params }: { params: Promise<{ slug: string }> }) {

    const slug = (await params).slug

    return <Card className={"bg-white p-10 w-fit mx-auto"}>
        <CardContent>
            <PasswordProtection client={slug}/>
        </CardContent>
    </Card>
}