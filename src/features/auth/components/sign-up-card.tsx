import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { SignInFlow } from "../types";
import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { TriangleAlert } from "lucide-react";

interface SignUpCardProps {
    setState: (state: SignInFlow) => void; 
};

export const SignUpCard = ({setState} : SignUpCardProps) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [comfirmPassword, setComfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);

    const {signIn} = useAuthActions();

    const handlePasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(password !== comfirmPassword){
            setError("Password doesn't match!")
            return;
        }
        setPending(true);
        signIn("password" , {email, name, password, flow: "signUp"})
            .catch(() => {
            setError("Something went wrong!")
            })
            .finally(() => {
                setPending(false);
            })
    }

    const handleProviderSignIn = (value: "github" | "google") => {
        setPending(true);
        signIn(value)
            .finally(() => {
                setPending(false);
            })
    }

    return (
        <Card className="w-full h-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle>Sign up to continue</CardTitle>
                <CardDescription>
                    Use your email or another service to continue
                </CardDescription>
            </CardHeader>
            {!!error && (
                <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
                    <TriangleAlert className="size-4" />
                    <p>{error}</p>
                </div>
            )}
            <CardContent className="space-y-5 px-0 pb-0">
                <form className="space-y-2.5" onSubmit={handlePasswordSignUp}>
                    <Input 
                        disabled={pending}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        type="email"
                        required
                        className="focus:outline-none"
                    />
                    <Input 
                        disabled={pending}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        required
                        className="focus:outline-none"
                    />
                    <Input 
                        disabled={pending}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        type="password"
                        required
                        className="focus:outline-none"
                    />
                    <Input 
                        disabled={pending}
                        value={comfirmPassword}
                        onChange={(e) => setComfirmPassword(e.target.value)}
                        placeholder="Comfirm password"
                        type="password"
                        required
                        className="focus:outline-none"
                    />
                    <Button type="submit" className="w-full" size='lg' disabled={pending}>
                        Sign up
                    </Button>
                </form>
                <Separator/>
                <div className="flex flex-col gap-y-2.5">
                    <Button
                        onClick={() => handleProviderSignIn("google")} 
                        variant={'outline'}
                        disabled={pending}
                        size={'lg'}
                        className="w-full relative"
                    >
                        <FcGoogle className="absolute size-5 top-2.5 left-2.5" />
                        Continue with Google
                    </Button>
                    <Button 
                        onClick={() => handleProviderSignIn("github")}
                        variant={'outline'}
                        disabled={pending}
                        size={'lg'}
                        className="w-full relative"
                    >
                        <FaGithub className="absolute size-5 top-2.5 left-2.5" />
                        Continue with Github
                    </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                    Already have an account?  
                    <span onClick={() => {setState('signIn')}} className="text-sky-700 hover:underline cursor-pointer">  Login</span>
                </p>
            </CardContent>
        </Card>
    )
}