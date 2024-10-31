import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {Tabs, Tab} from "@nextui-org/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Brain, FileText, Image, Search, Share2, Users, Moon, Sun } from 'lucide-react'
import Link from 'next/link'
import SignInForm from '@/components/global/SignInForm';

export default function LandingPage() {
  const [email, setEmail] = useState('')
  const [darkMode, setDarkMode] = useState(false)
  const [isOpenSignIn, setIsOpenSign] = useState<boolean>(false)

  const handleToggleSignIn = () => setIsOpenSign(!isOpenSignIn)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b border-gray-200 dark:border-gray-700">
        <Link className="flex items-center justify-center" href="#">
          <Brain className="h-6 w-6" />
          <span className="ml-2 text-2xl font-bold">Viet</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#community">
            Community
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#pricing">
            Pricing
          </Link>
        </nav>
        <Button
          variant="ghost"
          size="icon"
          className="ml-4"
          onClick={toggleDarkMode}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Your AI Assistant for Knowledge Management and Research
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Organize, analyze, and collaborate on your knowledge with the power of AI.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                  <Button onClick={handleToggleSignIn}>Get Started</Button>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Start your free trial. No credit card required.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className=" w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Product Showcase</h2>
            <div className="max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="overflow-hidden">
                <img src="/placeholder.svg?height=300&width=400" alt="Viet Dashboard" className="w-full h-48 object-cover" />
                <CardHeader>
                  <CardTitle>Intuitive Dashboard</CardTitle>
                  <CardDescription>Manage your projects and knowledge base with ease</CardDescription>
                </CardHeader>
              </Card>
              <Card className="overflow-hidden">
                <img src="/placeholder.svg?height=300&width=400" alt="AI-Powered Insights" className="w-full h-48 object-cover" />
                <CardHeader>
                  <CardTitle>AI-Powered Insights</CardTitle>
                  <CardDescription>Get intelligent summaries and recommendations</CardDescription>
                </CardHeader>
              </Card>
              <Card className="overflow-hidden">
                <img src="/placeholder.svg?height=300&width=400" alt="Collaborative Workspace" className="w-full h-48 object-cover" />
                <CardHeader>
                  <CardTitle>Collaborative Workspace</CardTitle>
                  <CardDescription>Work together seamlessly with your team</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 flex flex-col items-center justify-center" >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Key Features</h2>
            <Tabs aria-label="Options" className="w-full max-w-7xl mx-auto">
              <Tab key="knowledge" title="Knowledge Management">
                <Card className=''>
                    <CardHeader>
                      <CardTitle>Knowledge Management</CardTitle>
                      <CardDescription>Organize and structure your information effectively.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4" />
                        <span>Create projects with documents, images, tables, and notes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4" />
                        <span>Organize documents with tags and metadata</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Image className="h-4 w-4" />
                        <span>Extract and organize images and tables</span>
                      </div>
                    </CardContent>
                  </Card>
              </Tab>
              <Tab key="llm" title="LLM Interaction">
                <Card>
                    <CardHeader>
                      <CardTitle>LLM Interaction</CardTitle>
                      <CardDescription>Leverage AI for deeper insights and analysis.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Brain className="h-4 w-4" />
                        <span>Conduct project-based conversations with LLMs</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4" />
                        <span>Generate summaries, mind maps, and comparisons</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Search className="h-4 w-4" />
                        <span>Get object definitions via search engine and LLM integration</span>
                      </div>
                    </CardContent>
                  </Card>
              </Tab>
              <Tab key="search" title="Search">
                  <Card>
                    <CardHeader>
                      <CardTitle>Advanced Search</CardTitle>
                      <CardDescription>Find information quickly and efficiently.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Search className="h-4 w-4" />
                        <span>Keyword-based and semantic search capabilities</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4" />
                        <span>Search within projects, documents, or entire knowledge base</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Image className="h-4 w-4" />
                        <span>Locate documents, images, tables, or specific information chunks</span>
                      </div>
                    </CardContent>
                  </Card>
              </Tab>
              <Tab key="community" title="Community">
              <Card>
                  <CardHeader>
                    <CardTitle>Community Features</CardTitle>
                    <CardDescription>Collaborate and share knowledge effortlessly.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Share2 className="h-4 w-4" />
                      <span>Share conversations, projects, and documents via URL</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>Collaborate on projects with team members</span>
                    </div>
                  </CardContent>
                </Card>
              </Tab>
             
            </Tabs>
          </div>
        </section>
        <section id="community" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Join Our Community</h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <Card>
                <CardHeader>
                  <Users className="h-8 w-8 mb-2" />
                  <CardTitle>Collaborative Projects</CardTitle>
                  <CardDescription>Work together with your team on shared projects.</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Share2 className="h-8 w-8 mb-2" />
                  <CardTitle>Easy Sharing</CardTitle>
                  <CardDescription>Share your work with others using simple links.</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <BookOpen className="h-8 w-8 mb-2" />
                  <CardTitle>Knowledge Exchange</CardTitle>
                  <CardDescription>Learn from others and contribute your expertise.</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Brain className="h-8 w-8 mb-2" />
                  <CardTitle>AI-Powered Insights</CardTitle>
                  <CardDescription>Leverage collective intelligence with AI assistance.</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Pricing Plans</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Basic</CardTitle>
                  <CardDescription>For individual researchers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold mb-2">$9.99</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">per month</div>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center">
                      <svg
                        className=" w-4 h-4 mr-2 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      5 Projects
                    </li>
                    <li className="flex items-center">
                      <svg
                        className=" w-4 h-4 mr-2 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Unlimited Documents
                    </li>
                    <li className="flex items-center">
                      <svg
                        className=" w-4 h-4 mr-2 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Basic LLM Features
                    </li>
                  </ul>
                  
                  <Button className="w-full">Get Started</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <CardDescription>For professional researchers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold mb-2">$24.99</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">per month</div>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center">
                      <svg
                        className=" w-4 h-4 mr-2 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Unlimited Projects
                    </li>
                    <li className="flex items-center">
                      <svg
                        className=" w-4 h-4 mr-2 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Advanced LLM Features
                    </li>
                    <li className="flex items-center">
                      <svg
                        className=" w-4 h-4 mr-2 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Team Collaboration
                    </li>
                  </ul>
                  <Button className="w-full">Get Started</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <CardDescription>For large organizations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold mb-2">Custom</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">Contact us for pricing</div>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center">
                      <svg
                        className=" w-4 h-4 mr-2 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Custom Integration
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Dedicated Support
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Advanced Security
                    </li>
                  </ul>
                  <Button className="w-full">Contact Sales</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Viet. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
      <SignInForm isOpen={isOpenSignIn} closeForm={handleToggleSignIn}/>
    </div>
  )
}