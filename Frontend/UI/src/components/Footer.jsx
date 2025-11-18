import {
  Facebook,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";
import logo from "../assets/main_logo.png";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap gap-10">
          {/* Logo + Description */}
          <div className="w-full sm:w-2/3 lg:w-3/12">
            <img
              src={logo}
              alt="logo"
              className="h-24 w-auto object-contain mb-5"
            />

            <p className="text-sm opacity-80 mb-6 leading-relaxed">
              We look forward to welcoming you to our haven of tranquility and
              elegance. Contact us for reservations, and let us take care of the
              rest.
            </p>

            <p className="flex items-center text-base font-medium">
              <span className="mr-3 text-amber-500">📞</span>
              +91 8102811056
            </p>
          </div>

          {/* Resources */}
          <FooterColumn
            title="Resources"
            links={[
              "SaaS Development",
              "Our Products",
              "User Flow",
              "User Strategy",
            ]}
          />

          {/* Company */}
          <FooterColumn
            title="Company"
            links={[
              "About TailGrids",
              "Contact & Support",
              "Success History",
              "Settings & Privacy",
            ]}
          />

          {/* Quick Links */}
          <FooterColumn
            title="Quick Links"
            links={[
              "Premium Support",
              "Our Services",
              "Know Our Team",
              "Download App",
            ]}
          />

          {/* Social Icons */}
          <div className="w-full sm:w-1/2 lg:w-3/12">
            <h4 className="text-lg font-semibold text-amber-500 mb-6">
              Follow Us
            </h4>

            <div className="flex items-center gap-3">
              {[
                { icon: <FacebookIcon />, label: "Facebook" },

                { icon: <TwitterIcon />, label: "Twitter" },
                { icon: <YoutubeIcon />, label: "YouTube" },
                { icon: <LinkedinIcon />, label: "LinkedIn" },
              ].map((soc, i) => (
                <button
                  key={i}
                  className="w-10 h-10 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center text-xl hover:bg-amber-500 hover:border-amber-500 transition"
                  title={soc.label}
                >
                  {soc.icon}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-400 mt-10 border-t border-gray-700 pt-6 text-sm">
        © {new Date().getFullYear()} Byte Hotel. All Rights Reserved.
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div className="w-full sm:w-1/2 lg:w-2/12">
      <h4 className="text-lg font-semibold text-amber-500 mb-6">{title}</h4>
      <ul className="space-y-3">
        {links.map((link, idx) => (
          <li key={idx}>
            <a
              href="#"
              className="text-sm opacity-80 hover:text-amber-400 transition"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
