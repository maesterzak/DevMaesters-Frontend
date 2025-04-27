"use client"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Twitter, Linkedin, Mail, Globe, Building2, GraduationCap, Calendar } from "lucide-react"
import Image from "next/image"
import emailjs from "@emailjs/browser";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';


// This would typically come from a database or API
const portfolioData = {
  name: "Abubakar Agigasokoa Zakari",
  title: "Full Stack Developer",
  avatar: "/placeholder.svg?height=200&width=200",
  about:
    "I'm a passionate full stack developer with 3 years of experience in building web applications. I love working with React, Django, and GraphQL to create scalable and performant solutions.",
  skills: ["React", "Django", "GraphQL", "TypeScript","Javascript", "Next.js", "MongoDB","PostgreSQL", "AWS","Electron"],
  education: [
    {
      degree: "Bachelor of Engineering in Mechanical Engineering",
      school: "Federal University of Technology, Minna",
      location: "Minna, Niger",
      period: "2015 - 2021",
      description:
        "Specialized in Mechanical Engineering with a focus on automobile's design and manufacturing.",
    },
    {
      degree: "Fullstack Development — ALX-T",
      school: "Udacity ALX-T Scholarship",
      location: "Remote",
      period: "2022",
      description: "Expertise in SQL & data modeling, API development & documentation, identity access management, and server deployment with containerization.",
    },
  ],
  employment: [
    {
      title: "Finacle Application Support & Customization ",
      company: "WEMA Bank PLC.",
      location: "Lagos, Nigeria",
      period: "2023 - Present",
      description:
        "Providing support to the Finacle application and customizing it to meet the needs of the bank.",
      achievements: [
        "Implemented bulk account migration menu from one sol to another",
        "Provided support to Finacle FI services ",
        "Provided support for Finacle Connect 24 services",
        "Provided support for Finacle Core services",
      ],
    },
    {
      title: "Full Stack Developer",
      company: "DevMaesters",
      location: "Remote",
      period: "2019 - present",
      description: "Developed and maintained multiple client projects using React, Next js, Django, and PostgreSQL.",
      achievements: [
        "Developing fully responsive and highly efficient websites for clients using Html,CSS, JavaScript, Next JS, React JS and Django.",
      ],
    },
    {
      title: "Cloud Engineering Intern",
      company: "CECURE INTELLIGENCE LIMITED",
      location: "Remote",
      period: "2021",
      description: "Using AWS console and cli to deploy and manage various AWS resources for web and mobile applications.",
      achievements: ["Developed new user dashboard", "Implemented responsive design", "Fixed 30+ critical bugs"],
    },
  ],
  projects: [
    {
      title: "Cloth2Life",
      description: "Instantly generate high-quality lifestyle photos for your site, marketplace, social media & ad campaign without ever needing a professional photoshoot",
      image: "/placeholder.svg?height=300&width=400",
      link: "https://cloth2life.ai/",
    },
    {
      title: "Eazy Editor Mobile App",
      description: "This is a mobile image editing application developed entirely from scratch using ReactNative. The application boasts a wide array of image processing features, including background removal, background blur, background color change, instant image background",
      image: "/placeholder.svg?height=300&width=400",
      link: "#",
    },
    {
      title: "Eazy Editor Desktop App",
      description: "This is a desktop image editing application developed entirely from scratch using React. The application boasts a wide array of image processing features, including background removal, background blur, background color change, instant image background",
      image: "/placeholder.svg?height=300&width=400",
      link: "#",
    },
    {
      title: "Company Website",
      description: "Instantly generate high-quality lifestyle photos for your site, marketplace, social media & ad campaign without ever needing a professional photoshoot",
      image: "/placeholder.svg?height=300&width=400",
      link: "https://softworkie.vercel.app/",
    },
    {
      title: "3plezee",
      description: "A platform for buying and selling products online",
      image: "/placeholder.svg?height=300&width=400",
      link: "https://3plezee.vercel.app/",
    },
    {
      title: "BTC Website Template",
      description: "Template for a website that sells Bitcoin and other cryptocurrencies",
      image: "/placeholder.svg?height=300&width=400",
      link: "https://example.com/project2",
    },
    {
      title: "ARBPUP Clone",
      description: "Clone of ARBPUP, a platform for web3 enthusiasts to earn",
      image: "/placeholder.svg?height=300&width=400",
      link: "https://crypt-wheat.vercel.app/",
    },
    {
      title: "Juno Blog",
      description: "Basic blog app built with Next JS, Tailwind CSS",
      image: "/placeholder.svg?height=300&width=400",
      link: "https://sammy-blog01.vercel.app/",
    },
  ],
  contact: {
    email: "abubakarzakari1703@gmail.com",
    github: "https://github.com/maesterzak",
    twitter: "https://twitter.com/devmaesters",
    linkedin: "https://www.linkedin.com/in/maesterzak/",
    website: "https://devmaesters.com",
  },
}

function TimelineItem({
  title,
  subtitle,
  period,
  location,
  description,
  achievements,
  icon: Icon,
}: {
  title: string
  subtitle: string
  period: string
  location: string
  description: string
  achievements?: string[]
  icon: typeof Building2 | typeof GraduationCap
}) {
  return (
    <div className="relative pl-8 pb-8 border-l border-border last:pb-0">
      <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
        <Icon className="w-3 h-3 text-primary-foreground" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{period}</span>
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="font-medium text-primary">{subtitle}</p>
        <p className="text-sm text-muted-foreground">{location}</p>
        <p className="text-sm">{description}</p>
        {achievements && achievements.length > 0 && (
          <ul className="list-disc list-inside text-sm space-y-1">
            {achievements.map((achievement, index) => (
              <li key={index} className="text-muted-foreground">
                {achievement}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default function PortfolioPage() {
  const SendMessage = (params: Record<string, string>) => {
    const templateParams = {
      to_name: "Abubakar Zakari",
      notes: "Message from Portfolio",
      from_name: params.name,
      message: params.message,
      email: params.email,
      name: params.name,
    };

    emailjs
      .send(
        "service_dpjmqsh",
        "template_ps49c1n",
        templateParams,
        "jeBPuKHuxwkms83n1"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          toast.success("Message sent successfully!");
        },
        (err) => {
          console.log("FAILED...", err);
          toast.error("Failed to send message. Please try again.");
        }
      );
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const form_values = Object.fromEntries(formData) as Record<string, string>;
    SendMessage(form_values);
    e.currentTarget.reset();
  };

  return (
    <main className="min-h-screen bg-background">
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />
      <div className="container py-24">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h1 className="text-4xl font-bold mb-4">{portfolioData.name}</h1>
              <h2 className="text-2xl text-muted-foreground mb-8">{portfolioData.title}</h2>
              <div className="flex items-center space-x-4 mb-8">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={portfolioData.avatar} alt={portfolioData.name} />
                  <AvatarFallback>{portfolioData.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-lg">{portfolioData.about}</p>
                </div>
              </div>
              <div className="flex space-x-4">
                <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon">
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </a>
                <a href={portfolioData.contact.twitter} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon">
                    <Twitter className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                  </Button>
                </a>
                <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon">
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                </a>
                <a href={`mailto:${portfolioData.contact.email}`}>
                  <Button variant="outline" size="icon">
                    <Mail className="h-5 w-5" />
                    <span className="sr-only">Email</span>
                  </Button>
                </a>
                <a href={portfolioData.contact.website} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon">
                    <Globe className="h-5 w-5" />
                    <span className="sr-only">Website</span>
                  </Button>
                </a>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">Employment History</h2>
              <div className="space-y-0">
                {portfolioData.employment.map((job, index) => (
                  <TimelineItem
                    key={index}
                    icon={Building2}
                    title={job.title}
                    subtitle={job.company}
                    period={job.period}
                    location={job.location}
                    description={job.description}
                    achievements={job.achievements}
                  />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">Education</h2>
              <div className="space-y-0">
                {portfolioData.education.map((edu, index) => (
                  <TimelineItem
                    key={index}
                    icon={GraduationCap}
                    title={edu.degree}
                    subtitle={edu.school}
                    period={edu.period}
                    location={edu.location}
                    description={edu.description}
                  />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {portfolioData.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Projects</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {portfolioData.projects.map((project) => (
                  <Card key={project.title}>
                    <CardHeader>
                      <CardTitle>{project.title}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={400}
                        height={300}
                        className="w-full rounded-lg object-cover"
                      />
                      <Button asChild className="mt-4">
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          View Project
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Contact Me for Work</CardTitle>
                <CardDescription>Interested in working together? Send me a message!</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={submitHandler} className="space-y-4">
                  <Input name="name" placeholder="Your Name" />
                  <Input name="email" type="email" placeholder="Your Email" />
                  <Input name="subject" placeholder="Subject" />
                  <Textarea name="message" placeholder="Your Message" className="min-h-[150px]" />
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}

