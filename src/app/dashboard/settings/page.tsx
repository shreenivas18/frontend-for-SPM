import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-gray-950 text-white p-4 sm:p-8">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Profile & Settings</h1>
        <Tabs defaultValue="content-dna" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-900">
            <TabsTrigger value="content-dna">Content DNA</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>
          <TabsContent value="content-dna">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-100">Content DNA</CardTitle>
                <CardDescription className="text-gray-400">
                  Modify your original onboarding answers. This helps us generate content that is perfectly tailored to you.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-400">
                <div className="space-y-2">
                  <Label htmlFor="product-service">What is your product/service?</Label>
                  <Input id="product-service" defaultValue="AI-powered medical billing software" className="bg-gray-800 border-gray-700 text-gray-200"/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ideal-customers">Who are your ideal customers?</Label>
                  <Input id="ideal-customers" defaultValue="Independent medical practices with 1-5 doctors" className="bg-gray-800 border-gray-700 text-gray-200"/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="problem-solved">What problem do you solve?</Label>
                  <Input id="problem-solved" defaultValue="Reducing claim rejections and payment delays" className="bg-gray-800 border-gray-700 text-gray-200"/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unique-style">What's your unique style?</Label>
                  <Input id="unique-style" defaultValue="Professional with occasional humor" className="bg-gray-800 border-gray-700 text-gray-200"/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="post-platforms">Where do you want to post?</Label>
                  <Input id="post-platforms" defaultValue="LinkedIn and Blog" className="bg-gray-800 border-gray-700 text-gray-200"/>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto bg-blue-600 hover:bg-blue-700">Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="account">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-100">Account Settings</CardTitle>
                <CardDescription className="text-gray-400">
                  Update your name, email, password, and other signup details.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-400">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="Alex" className="bg-gray-800 border-gray-700 text-gray-200"/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="alex@example.com" className="bg-gray-800 border-gray-700 text-gray-200"/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <Input id="password" type="password" className="bg-gray-800 border-gray-700 text-gray-200"/>
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" className="bg-gray-800 border-gray-700 text-gray-200"/>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto bg-blue-600 hover:bg-blue-700">Update Account</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
