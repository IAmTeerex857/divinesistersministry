import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Instagram, Youtube } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface Speaker {
  name: string;
  title: string;
  image: string;
}

function App(): JSX.Element {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "What is The Limitless Woman Virtual Summit?",
      answer: "The Limitless Woman Virtual Summit is a two-day online event hosted by Divine Sisters Ministry in celebration of Women's History Month. It is designed to empower women through authenticity, audacity, and action, featuring dynamic speakers who will inspire you to break barriers, embrace your truth, and boldly walk in your God-given purpose."
    },
    {
      question: "Who is this summit for?",
      answer: "This summit is designed for women seeking to deepen their faith, build meaningful connections, and step boldly into their purpose."
    },
    {
      question: "Will there be replays if I miss a session?",
      answer: "Yes, registered participants will have access to session recordings after the event."
    },
    {
      question: "How can I stay updated?",
      answer: "Follow us on social media and check your email for regular updates about the summit."
    },
    {
      question: "What can I expect from the summit?",
      answer: "Expect a transformative experience with: ✅ Inspirational talks from guest speakers ✅ Engaging discussions on faith, leadership, and personal growth ✅ Practical tools to help you take action in your life ✅ A supportive community of like-minded women"
    }
  ];

  const speakers: Speaker[] = [
    {
      name: "Tolulope Adejumo",
      title: "Digital Content Creator, Entrepreneur & Philanthropist",
      image: "./images/Tolulolpe Adejumo.jpg"
    },
    {
      name: "Damilola Oloruntoba",
      title: "Technology Consultant",
      image: "/images/Damilola Oloruntoba.jpg"
    },
    {
      name: "Tomilola Majekodunmi",
      title: "CEO- Bankly",
      image: "/images/Tomilola Majekodunmi.jpg"
    },
    {
      name: "Oyewunmi Fasoro",
      title: "Founder, DivineSistersMinistry",
      image: "/images/Oyewunmi Fasoro.jpg"
    },
    {
      name: "Chimamaka Ige",
      title: "Business Strategist/Author",
      image: "/images/Chimamaka Ige.jpg"
    },
    {
      name: "Adebisi Olaniyi",
      title: "Founder, iTeach Network",
      image: "/images/Adebisi Olaniyi.jpg"
    }
  ];

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="space-y-8">
            <p className="text-lg font-semibold text-gray-900">ABOUT US</p>
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900">DIVINE SISTERS MINISTRY</h1>
            <div className="grid lg:grid-cols-2 gap-12">
              <p className="text-xl text-gray-700">
                Divine Sisters Ministry is a non-denominational, faith-based community that encourages, equips, and empowers women to deepen their relationship with God, build meaningful friendships, and do exploits in every area of life through connection, mentorship, and support.
              </p>
              <div className="flex items-center">
                <p className="text-xl font-semibold text-gray-900">
                  Our motto is: "Know God, Be Strong & Do Exploits."
                </p>
              </div>
            </div>
            <div className="mt-8">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSclfLMwDKoFsA7Atb2z_Ydh1csjt0yu7I1tcUA3XB9_b80x5Q/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 text-base font-medium text-amber-500 bg-white border border-amber-500 rounded-md hover:bg-amber-50 transition duration-150 ease-in-out"
              >
                Join our Community
              </a>
            </div>
          </div>
        </section>

        {/* Summit Section */}
        <section className="bg-purple-900 text-white py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-semibold text-orange-400 mb-12">
              THE LIMITLESS WOMAN VIRTUAL SUMMIT
            </h2>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-6xl font-light">Authenticity</h3>
                  <h3 className="text-6xl font-light">Audacity</h3>
                  <h3 className="text-6xl italic">Action</h3>
                </div>
                <button className="bg-white text-purple-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
                  Register Now
                </button>
                <p className="text-xl">MARCH 20-21 | 2025</p>
              </div>
              <div className="space-y-6">
                <p className="text-xl">
                  In celebration of Women's History Month, Divine Sisters Ministry presents "The Limitless Woman Virtual Summit", a powerful two-day experience designed to ignite authenticity, audacity, and action in every woman.
                </p>
                <p className="text-xl">
                  Through inspiring stories, faith-filled conversations, and practical strategies, our dynamic speakers will empower you to break barriers, own your truth, and boldly step into God's calling for your life.
                </p>
                <p className="text-xl">
                  This isn't just a summit, it's a movement and we hope you are ready to embrace your limitless potential.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Speakers Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-900 mb-8">Meet our speakers</h2>
          <p className="text-xl text-gray-700 mb-16">
            Join our dynamic guest speakers as they share their journeys of faith, resilience, and success.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {speakers.map((speaker, index) => (
              <div key={index} className="space-y-4">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{speaker.name}</h3>
                  <p className="text-gray-600">{speaker.title}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Need help?</h2>
          <p className="text-xl text-gray-700 mb-12">
            Don't worry, we got you. Here are some answers for your questions.
          </p>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200">
                <button
                  className="w-full py-6 flex justify-between items-center text-left"
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                >
                  <span className="text-xl font-medium">{faq.question}</span>
                  {openFAQ === index ? (
                    <ChevronUp className="h-6 w-6 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-6 w-6 text-gray-500" />
                  )}
                </button>
                {openFAQ === index && (
                  <div className="pb-6">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-purple-900 text-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Email</h3>
                <a href="mailto:thedivinedivasad@gmail.com" className="text-lg hover:underline">
                  thedivinedivasad@gmail.com
                </a>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Inquiries</h3>
                <a href="https://wa.me/+2340994442606" className="text-lg hover:underline">
                  Whatsapp +2340994442606
                </a>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Venue</h3>
                <a href="https://meet.google.com" className="text-lg hover:underline">
                  GoogleMeet
                </a>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Social</h3>
                <div className="flex space-x-4">
                  <a href="https://instagram.com" className="hover:text-gray-300">
                    <Instagram size={24} />
                  </a>
                  <a href="https://youtube.com" className="hover:text-gray-300">
                    <Youtube size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;