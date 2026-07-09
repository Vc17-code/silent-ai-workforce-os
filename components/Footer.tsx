import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { contactInfo } from "@/lib/config";
import { getPhoneLink, getWhatsAppLink } from "@/lib/utils";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      <div className="container-custom section-padding">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-lg font-bold">
                DP
              </span>
              <div>
                <p className="text-lg font-bold">Disha Properties</p>
                <p className="text-sm text-blue-200">{contactInfo.tagline}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-blue-100">
              Trusted real estate experts in Ajmer with 16+ years of experience in residential, commercial, and investment properties.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-blue-100">
              <li><Link href="/properties" className="hover:text-white">Properties</Link></li>
              <li><Link href="/services" className="hover:text-white">Services</Link></li>
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/gallery" className="hover:text-white">Gallery</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Services</h3>
            <ul className="space-y-2 text-sm text-blue-100">
              <li>Property Buying</li>
              <li>Property Selling</li>
              <li>Rental Assistance</li>
              <li>Investment Advice</li>
              <li>Home Loan Support</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact</h3>
            <ul className="space-y-3 text-sm text-blue-100">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                {contactInfo.address}, {contactInfo.city}
              </li>
              <li>
                <a href={getPhoneLink(contactInfo.phone)} className="flex items-center gap-2 hover:text-white">
                  <Phone className="h-4 w-4" />
                  +91 9414435920
                </a>
              </li>
              <li>
                <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-2 hover:text-white">
                  <Mail className="h-4 w-4" />
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {contactInfo.businessHours}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/20 pt-8 text-sm text-blue-200 md:flex-row">
          <p>© {year} Disha Properties. All rights reserved.</p>
          <div className="flex gap-4">
            <a
              href={getWhatsAppLink(contactInfo.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              WhatsApp
            </a>
            <a
              href={contactInfo.mapEmbedUrl.replace("/embed", "")}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              Google Maps
            </a>
            <Link href="/owner/login" className="hover:text-white">
              Owner Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
