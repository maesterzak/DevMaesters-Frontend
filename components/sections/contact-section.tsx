"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from 'react-toastify';


export function ContactSection() {
  let  contact = {
    email: "abubakarzakari1703@gmail.com",
    github: "https://github.com/maesterzak",
    twitter: "https://twitter.com/devmaesters",
    linkedin: "https://www.linkedin.com/in/maesterzak/",
    website: "https://devmaesters.com",
  }

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
          
          toast.success("Message sent successfully!");
        },
        (err) => {
        
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
    <section className="container py-24">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Contact Us</h2>
          <p className="text-muted-foreground">
            Have questions or want to get in touch? Fill out the form, and we'll get back to you as soon as possible.
          </p>
          <div className="flex space-x-4">
            <a href={contact.github} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </a>
            <a href={contact.twitter} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
            </a>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </a>
            <a href="mailto:abubakarzakari1703@gmail.com">
              <Button variant="outline" size="icon">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Button>
            </a>
          </div>
        </div>
        <form onSubmit={submitHandler} className="space-y-4">
          <Input placeholder="Your Name" />
          <Input type="email" placeholder="Your Email" />
          <Input placeholder="Subject" />
          <Textarea placeholder="Your Message" className="min-h-[150px]" />
          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>
      </div>
    </section>
  )
}

