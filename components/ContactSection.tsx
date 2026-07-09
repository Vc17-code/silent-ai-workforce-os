import { MapPin, Phone, Mail, Clock } from "lucide-react";
import ContactForm from "./ContactForm";
import { contactInfo } from "@/lib/config";
import { getPhoneLink, getWhatsAppLink } from "@/lib/utils";

export default function ContactSection() {
  return (
    <section className="section-padding bg-background" id="contact">
      <div className="container-custom">
        <div className="mb-10 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
            Get in Touch
          </span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
            Contact Us
          </h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-bold text-slate-900">Disha Properties</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-medium">{contactInfo.address}</p>
                    <p className="text-sm text-slate-500">{contactInfo.city}</p>
                  </div>
                </li>
                <li>
                  <a
                    href={getPhoneLink(contactInfo.phone)}
                    className="flex items-center gap-3 font-medium text-primary hover:underline"
                  >
                    <Phone className="h-5 w-5" />
                    +91 9414435920
                  </a>
                </li>
                <li>
                  <a
                    href={getWhatsAppLink(contactInfo.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 font-medium text-secondary hover:underline"
                  >
                    💬 WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center gap-3 text-slate-700 hover:text-primary"
                  >
                    <Mail className="h-5 w-5" />
                    {contactInfo.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-medium">Business Hours</p>
                    <p className="text-sm text-slate-500">{contactInfo.businessHours}</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="overflow-hidden rounded-2xl shadow-sm">
              <iframe
                src={contactInfo.mapEmbedUrl}
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Disha Properties location on Google Maps"
              />
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
            <h3 className="mb-6 text-xl font-bold text-slate-900">Send an Inquiry</h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
