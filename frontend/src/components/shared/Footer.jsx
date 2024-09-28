import { GithubIcon, Linkedin, Twitter } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      
      <div className="container mx-auto text-center my-6 ">
        <div className="flex items-center justify-center">
        <p className="text-sm">
          © {new Date().getFullYear()} JobListingPortal. All Rights Reserved.
        </p>
        
        </div>
        <div className="flex items-center justify-end gap-x-5">
          <span className="text-xl font-bold">Job<span className="text-green-600">lia</span></span>
          <a
            href="https://www.linkedin.com/in/chaitanya-umbarkar-323470239/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={24} />
          </a>

          <a
            href="https://x.com/home"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter size={24} />
          </a>

          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon size={24} />
          </a>
        </div>
       
      </div>
    </footer>
  )
}

export default Footer
