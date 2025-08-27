import { MapPin } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">FenceTrack</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Keeping your loved ones safe with advanced GPS tracking technology
              and real-time monitoring solutions.
            </p>
            <div className="flex space-x-4">
              {[
                {
                  icon: <FaLinkedin size={25} />,
                  link: "https://www.linkedin.com/in/tusharsusar",
                },
                {
                  icon: <FaGithub size={25} />,
                  link: "https://github.com/TusharSusar",
                },
                {
                    icon:<FaInstagram size={25} />,
                    link:'https://www.instagram.com/'
                },
              ].map((social, index) => (
                <button
                  key={index}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300 text-lg cursor-pointer"
                >
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300 text-lg cursor-pointer"
                  >
                    {social.icon}
                  </a>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Product</h3>
            <ul className="space-y-3">
              {[
                "Features",
                "Pricing",
                "Device Specs",
                "Mobile Home",
                "API Documentation",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Support</h3>
            <ul className="space-y-3">
              {[
                "Help Center",
                "Contact Us",
                "Device Setup",
                "Troubleshooting",
                "User Guide",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Company</h3>
            <ul className="space-y-3">
              {[
                "About Us",
                "Careers",
                "Press",
                "Privacy Policy",
                "Terms of Service",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © 2025 FenceTrack. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <span className="text-gray-400">🔒 Secure & Private</span>
              <span className="text-gray-400">⚡ 99.9% Uptime</span>
              <span className="text-gray-400">🏆 Award Winning</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
