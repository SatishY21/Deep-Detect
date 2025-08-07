import { Link } from "react-router-dom";
import { Twitter, GitlabIcon as GitHub, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left: Logo & Description */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">DeepDetect</span>
              <span className="ml-1 text-sm bg-blue-600 text-white dark:bg-blue-400 dark:text-gray-900 px-1 rounded">
                AI
              </span>
            </Link>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4 max-w-md">
              Cutting-edge deepfake detection powered by artificial intelligence. Stay ahead in identifying AI-generated content.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} DeepDetect AI. All rights reserved.
            </p>
          </div>

          {/* Center: Disclaimer */}
          <div className="text-center md:px-6">
            <h3 className="text-2xl font-semibold mb-2">Disclaimer</h3>
            <p className="text-xl text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              DeepDetect AI strives for accuracy, but mistakes can happen. Always verify critical information 
              from trusted sources before making decisions.
            </p>
          </div>

          {/* Right: Privacy Policy & Social Media */}
          <div className="md:text-right flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Legal</h3>
              <Link
                to="/privacy-policy"
                className="text-xl text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Privacy Policy
              </Link>
            </div>

            <div className="mt-6">
              <h3 className="text-2xl font-semibold mb-2">Connect With Us</h3>
              <div className="flex md:justify-end space-x-4">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter size={30} className="text-gray-600 dark:text-gray-400" />
                </a>
                <a
                  href="https://github.com/naik-shashank"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                  aria-label="GitHub"
                >
                  <GitHub size={25} className="text-gray-600 dark:text-gray-400" />
                </a>
                <a
                  href="https://www.linkedin.com/in/shashanknaik45/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={25} className="text-gray-600 dark:text-gray-400" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
