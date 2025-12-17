import React from "react";
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {
  Shield, Code, Network, FileText, Heart, GraduationCap,
  Building2, Briefcase, Users, Factory, CheckCircle
} from "lucide-react";

export default function LandingPage() {
  const sectors = [
    { icon: <Heart className="w-6 h-6" />, title: "Health Tech", description: "Clinical decision support with privacy-first architecture and HIPAA compliance." },
    { icon: <GraduationCap className="w-6 h-6" />, title: "Education", description: "Adaptive learning systems with student data protection and equity safeguards." },
    { icon: <Building2 className="w-6 h-6" />, title: "Government", description: "Transparent public services built on accountability and citizen trust." },
    { icon: <Briefcase className="w-6 h-6" />, title: "Finance", description: "Regulated automation with explainability, audit trails, and appeals processes." },
    { icon: <Users className="w-6 h-6" />, title: "NGOs & Social Good", description: "Low-resource deployments focused on impact measurement and beneficiary needs." },
    { icon: <Factory className="w-6 h-6" />, title: "Manufacturing", description: "Safety-critical control systems with real-time constraints and certification." },
  ];

  const keyTopics = [
    {
      icon: <Shield className="w-8 h-8" />, title: "Responsible Design", subtitle: "Ethics in Practice",
      points: ["Human-in-the-loop paradigms", "Privacy-by-design principles", "Fairness operationalization", "Explainability trade-offs"],
    },
    {
      icon: <Code className="w-8 h-8" />, title: "Enterprise Architecture", subtitle: "Production-Ready",
      points: ["Zero-trust security patterns", "Model lifecycle management", "CI/CD for ML systems", "Observability & monitoring"],
    },
    {
      icon: <Network className="w-8 h-8" />, title: "Autonomous Agents", subtitle: "Safe by Design",
      points: ["Guardrails & constraints", "Multi-agent coordination", "Capability scoping", "Adversarial testing"],
    },
    {
      icon: <FileText className="w-8 h-8" />, title: "Governance & Compliance", subtitle: "Institutional Control",
      points: ["AI governance boards", "Regulatory landscape mapping", "Audit frameworks", "Risk committees"],
    },
  ];

  const bookParts = [
    { number: "I", title: "Foundations", chapters: "3 chapters", description: "Principles, models, and mental frameworks for institutional AI" },
    { number: "II", title: "Humane Design", chapters: "3 chapters", description: "Ethics into engineering with human-centered interaction patterns" },
    { number: "III", title: "Enterprise Engineering", chapters: "4 chapters", description: "Reliable, secure, and observable AI infrastructure at scale" },
    { number: "IV", title: "Sector Playbooks", chapters: "6 chapters", description: "Domain-specific architectures across healthcare, education, government, NGOs, finance, industry" },
    { number: "V", title: "Autonomous Systems", chapters: "4 chapters", description: "Safety patterns for agents & multi-agent coordination" },
    { number: "VI", title: "Governance", chapters: "3 chapters", description: "Organizational models, legal frameworks, certification processes" },
    { number: "VII", title: "Transformation", chapters: "3 chapters", description: "Change management, scaling roadmaps, capacity building" },
    { number: "VIII", title: "Case Studies", chapters: "4 chapters", description: "Real-world implementations, lessons, failures, recovery" },
  ];

  return (
    <Layout title="Home" description="AI for Humanity Textbook">
      {/* Main Wrapper: White in Light Mode, Deep Navy in Dark Mode */}
      <div className="bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white min-h-screen font-sans transition-colors duration-300">

        {/* Hero */}
        <header className="pt-24 pb-32 px-4 text-center border-b border-slate-200 dark:border-gray-800">
          <div className="container mx-auto max-w-5xl">
            <div className="inline-block bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 px-6 py-2 rounded-full mb-6">
              <span className="text-blue-600 dark:text-blue-400 text-sm font-semibold">Building Responsible AI for Institutions</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 tracking-tight text-slate-900 dark:text-white">
              AI for <span className="bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">Humanity</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
              A complete framework for deploying AI systems that prioritize wellbeing, equity, and human dignity.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {/* Primary Button */}
              <Link className="px-8 py-4 text-lg font-bold rounded-full bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 transition-all text-white no-underline shadow-lg hover:shadow-xl hover:-translate-y-1" to="/docs/00-preface">
                Start Reading
              </Link>

              {/* Secondary Button: SOLID WHITE BACKGROUND for visibility */}
              <Link
                className="px-8 py-4 text-lg font-bold rounded-full 
                           bg-gray-200 dark:bg-gray-800 
                           border-2 border-slate-300 dark:border-gray-600 
                           text-slate-800 dark:text-white 
                           hover:border-blue-500 dark:hover:border-blue-400
                           hover:text-blue-600 dark:hover:text-blue-400
                           transition-all no-underline hover:-translate-y-1 shadow-sm hover:shadow-md"
                to="https://github.com/HasnainSolangi">
                GitHub
              </Link>
            </div>
          </div>
        </header>

        {/* Key Topics */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-slate-900 dark:text-white">What You’ll Master</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {keyTopics.map((topic, i) => (
                <div key={i} className="bg-slate-50 dark:bg-gray-800/40 border border-slate-200 dark:border-gray-700 rounded-2xl p-8 hover:border-blue-500 hover:shadow-xl transition-all group cursor-default">
                  <div className="flex gap-6">
                    <div className="bg-blue-100 dark:bg-gradient-to-br dark:from-blue-500 dark:to-purple-600 w-16 h-16 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform group-hover:rotate-6">
                      <div className="text-blue-600 dark:text-white">{topic.icon}</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{topic.title}</h3>
                      <p className="text-blue-600 dark:text-blue-400 text-sm mb-4 font-medium">{topic.subtitle}</p>
                      <ul className="space-y-2">
                        {topic.points.map((p, j) => (
                          <li key={j} className="flex gap-2 text-slate-600 dark:text-gray-300 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 mt-0.5 shrink-0" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sector Playbooks */}
        <section className="py-20 px-4 bg-slate-100 dark:bg-gray-900/50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-slate-900 dark:text-white">Sector Playbooks</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sectors.map((sector, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 p-6 rounded-2xl hover:border-purple-500 hover:-translate-y-1 hover:shadow-xl transition-all">
                  <div className="bg-purple-100 dark:bg-gradient-to-br dark:from-purple-500 dark:to-pink-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-purple-600 dark:text-white">
                    {sector.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{sector.title}</h3>
                  <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">{sector.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Book Structure */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-slate-900 dark:text-white">Book Structure</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {bookParts.map((part, i) => (
                <div key={i} className="bg-slate-50 dark:bg-gray-900/80 border border-slate-200 dark:border-gray-800 p-6 rounded-2xl hover:border-blue-500 transition-all hover:bg-white dark:hover:bg-gray-900">
                  <div className="flex gap-4">
                    <div className="bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 w-12 h-12 rounded-lg font-bold flex items-center justify-center text-lg shrink-0">
                      {part.number}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{part.title}</h3>
                        <span className="text-xs bg-slate-200 dark:bg-gray-800 text-slate-600 dark:text-gray-400 px-2 py-1 rounded-full border border-slate-300 dark:border-gray-700">{part.chapters}</span>
                      </div>
                      <p className="text-slate-600 dark:text-gray-400 text-sm">{part.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}