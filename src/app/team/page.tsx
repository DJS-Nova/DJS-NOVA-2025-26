"use client";

import { useState } from "react";
import { ChevronDown, Linkedin, Github, Mail, Instagram } from "lucide-react";

// Types
interface SocialLinks {
  linkedin?: string;
  github?: string;
  instagram?: string;
  email?: string;
}

interface Member {
  name: string;
  role: string;
  image?: string;
  social?: SocialLinks;
}

interface TeamData {
  tenure: string;
  board: {
    cp: Member;
    vcpAdmin: Member;
    vcpTech: Member;
    secretary: Member;
    treasurer: Member;
    projectHead: Member;
  };
  departments: {
    research: Member[];
    tech: {
      ai: Member;
      webdev: Member;
    };
    outreach: Member[];
    creativesEditorial: Member[];
    management: Member[];
    astrophotography: Member[];
  };
}

// Sample data structure - replace with your actual data
const teamsData: TeamData[] = [
  {
    tenure: "2025",
    board: {
      cp: {
        name: "Jainam Dedhia",
        role: "Chairperson",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chairperson",
        social: { linkedin: "#",github: "#",instagram: "#",email: "#" },
      },
      vcpAdmin: {
        name: "Bhargavi Naik",
        role: "Vice Chairperson (Admin)",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=VCPAdmin",
        social: { linkedin: "#" },
      },
      vcpTech: {
        name: "Akshat Singh",
        role: "Vice Chairperson (Technical)",
        image: "/team/akshatsingh.webp",
        social: { linkedin: "#" },
      },
      secretary: {
        name: "Shrawani Jagtap",
        role: "Secretary",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Secretary",
        social: { linkedin: "#" },
      },
      treasurer: {
        name: "Devansh Khandar",
        role: "Treasurer",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Treasurer",
        social: { linkedin: "#" },
      },
      projectHead: {
        name: "Om Kulkarni",
        role: "Project Head",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=ProjectHead",
        social: { linkedin: "#" },
      },
    },

    departments: {
      research: [
        {
          name: "Shiva Sukumar",
          role: "Research Executive",
          image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Research1",
          social: { linkedin: "#" },
        },
        {
          name: "Mishri Parekh",
          role: "Research Executive",
          image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Research2",
          social: { linkedin: "#" },
        },
      ],

      tech: {
        ai: {
          name: "Mihir Mashruwala",
          role: "Tech-AI Executive",
          image: "https://api.dicebear.com/7.x/avataaars/svg?seed=TechAI",
          social: { linkedin: "#" },
        },
        webdev: {
          name: "Ketan Gaikwad",
          role: "Tech-WebDev Executive",
          image: "https://api.dicebear.com/7.x/avataaars/svg?seed=WebDev",
          social: { linkedin: "#" },
        },
      },

      outreach: [
        {
          name: "Megh Dave",
          role: "Outreach Executive",
          image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Outreach1",
          social: { linkedin: "#" },
        },
        {
          name: "Durvi Bangera",
          role: "Outreach Executive",
          image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Outreach2",
          social: { linkedin: "#" },
        },
      ],

      creativesEditorial: [
        {
          name: "Ritika Doshi",
          role: "Creatives & Editorial Executive",
          image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Creative1",
          social: { linkedin: "#" },
        },
        {
          name: "Heer Shah",
          role: "Creatives & Editorial Executive",
          image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Creative2",
          social: { linkedin: "#" },
        },
      ],

      management: [
        {
          name: "Pratham Shah",
          role: "Management Executive",
          image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Management1",
          social: { linkedin: "#" },
        },
        {
          name: "Dev Rupani",
          role: "Management Executive",
          image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Management2",
          social: { linkedin: "#" },
        },
      ],
      astrophotography: [
        {
          name: "Rugved Mane",
          role: "Astrophotography Head",
          image: "https://api.dicebear.com/7.x/avataaars/svg?seed=astrophotography1",
          social: { linkedin: "#" },
        }
      ],
    },
  },
  // {
  //   tenure: "2024",
  //   board: {
  //     cp: {
  //       name: "Jainam Dedhia",
  //       role: "Chairperson",
  //       image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chairperson",
  //       social: { linkedin: "#" },
  //     },
  //     vcpAdmin: {
  //       name: "Bhargavi Naik",
  //       role: "Vice Chairperson (Admin)",
  //       image: "https://api.dicebear.com/7.x/avataaars/svg?seed=VCPAdmin",
  //       social: { linkedin: "#" },
  //     },
  //     vcpTech: {
  //       name: "Akshat Singh",
  //       role: "Vice Chairperson (Technical)",
  //       image: "https://api.dicebear.com/7.x/avataaars/svg?seed=VCPTech",
  //       social: { linkedin: "#" },
  //     },
  //     secretary: {
  //       name: "Shrawani Jagtap",
  //       role: "Secretary",
  //       image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Secretary",
  //       social: { linkedin: "#" },
  //     },
  //     treasurer: {
  //       name: "Devansh Khandar",
  //       role: "Treasurer",
  //       image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Treasurer",
  //       social: { linkedin: "#" },
  //     },
  //     projectHead: {
  //       name: "Om Kulkarni",
  //       role: "Project Head",
  //       image: "https://api.dicebear.com/7.x/avataaars/svg?seed=ProjectHead",
  //       social: { linkedin: "#" },
  //     },
  //   },

  //   departments: {
  //     research: [
  //       {
  //         name: "Shiva Sukumar",
  //         role: "Research Executive",
  //         image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Research1",
  //         social: { linkedin: "#" },
  //       },
  //       {
  //         name: "Mishri Parekh",
  //         role: "Research Executive",
  //         image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Research2",
  //         social: { linkedin: "#" },
  //       },
  //     ],

  //     tech: {
  //       ai: {
  //         name: "Mihir Mashruwala",
  //         role: "Tech-AI Executive",
  //         image: "https://api.dicebear.com/7.x/avataaars/svg?seed=TechAI",
  //         social: { linkedin: "#" },
  //       },
  //       webdev: {
  //         name: "Ketan Gaikwad",
  //         role: "Tech-WebDev Executive",
  //         image: "https://api.dicebear.com/7.x/avataaars/svg?seed=WebDev",
  //         social: { linkedin: "#" },
  //       },
  //     },

  //     outreach: [
  //       {
  //         name: "Megh Dave",
  //         role: "Outreach Executive",
  //         image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Outreach1",
  //         social: { linkedin: "#" },
  //       },
  //       {
  //         name: "Durvi Bangera",
  //         role: "Outreach Executive",
  //         image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Outreach2",
  //         social: { linkedin: "#" },
  //       },
  //     ],

  //     creativesEditorial: [
  //       {
  //         name: "Ritika Doshi",
  //         role: "Creatives & Editorial Executive",
  //         image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Creative1",
  //         social: { linkedin: "#" },
  //       },
  //       {
  //         name: "Heer Shah",
  //         role: "Creatives & Editorial Executive",
  //         image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Creative2",
  //         social: { linkedin: "#" },
  //       },
  //     ],

  //     management: [
  //       {
  //         name: "Pratham Shah",
  //         role: "Management Executive",
  //         image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Management1",
  //         social: { linkedin: "#" },
  //       },
  //       {
  //         name: "Dev Rupani",
  //         role: "Management Executive",
  //         image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Management2",
  //         social: { linkedin: "#" },
  //       },
  //     ],
  //   },
  // },
];

const MemberCard = ({ member }: { member: Member }) => {
  return (
    <div className="group relative">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 transition-all duration-300 hover:scale-105 h-84 w-64">
        {/* Full Body Image */}
        <div className="relative  bg-gradient-to-b from-slate-800 to-slate-900 overflow-hidden">
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              className="
    w-full h-full object-cover 
    grayscale group-hover:grayscale-0 transition-all duration-300
    max-sm:grayscale-0
  "
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-6xl font-bold">
              {member.name.charAt(0)}
            </div>
          )}
          {/* Gradient overlay at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
        </div>

        {/* Name and Role - Always visible at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
          <div className="flex items-start gap-2 mb-2">
            <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-white uppercase tracking-wide leading-tight">
                {member.name}
              </h3>
              <p className="text-xs text-orange-400 font-medium mt-1">
                {member.role}
              </p>
            </div>
          </div>

          {/* Social Links - Show on hover */}
          {member.social && (
            // <div className="flex gap-2 mt-3 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
            //   {member.social.linkedin && (
            //     <a
            //       href={member.social.linkedin}
            //       target="_blank"
            //       rel="noopener noreferrer"
            //       className="flex items-center justify-center w-6 h-6 rounded-md bg-[#0a66c2] hover:brightness-110 transition-all"
            //     >
            //       <Linkedin size={16} fill="white" color="transprent"/>
            //     </a>
            //   )}
            //   {member.social.github && (
            //     <a
            //       href={member.social.github}
            //       target="_blank"
            //       rel="noopener noreferrer"
            //       className="flex items-center justify-center w-6 h-6 rounded-full bg-[#171515] hover:brightness-110 transition-all"
            //     >
            //       <Github size={16} color="white" />
            //     </a>
            //   )}
            //   {member.social.email && (
            //     <a
            //       href={`mailto:${member.social.email}`}
            //       className="flex items-center justify-center w-6 h-6 rounded-full bg-[#34A853] hover:brightness-110 transition-all"
            //     >
            //       <Mail size={16} color="white" />
            //     </a>
            //   )}
            //   {member.social.instagram && (
            //     <a
            //       href={member.social.instagram}
            //       target="_blank"
            //       rel="noopener noreferrer"
            //       className="flex items-center justify-center w-6 h-6 rounded-md bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] hover:brightness-110 transition-all"
            //     >
            //       <Instagram size={16} color="white" />
            //     </a>
            //   )}
            // </div>

            <div className="flex gap-2 mt-3 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
              {member.social.linkedin && (
                <a
                  href={member.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-6 h-6 rounded-full  hover:brightness-110 transition-all"
                >
                  <Linkedin size={16} fill="white" color="transprent"/>
                </a>
              )}
              {member.social.github && (
                <a
                  href={member.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-6 h-6 rounded-full  hover:brightness-110 transition-all"
                >
                  <Github size={16} color="white" />
                </a>
              )}
              {member.social.email && (
                <a
                  href={`mailto:${member.social.email}`}
                  className="flex items-center justify-center w-6 h-6 rounded-full  hover:brightness-110 transition-all"
                >
                  <Mail size={16} color="white" />
                </a>
              )}
              {member.social.instagram && (
                <a
                  href={member.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-6 h-6 rounded-full hover:brightness-110 transition-all"
                >
                  <Instagram size={16} color="white" />
                </a>
              )}
            </div>
          )}
        </div>

        {/* Glowing effect on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>
    </div>
  );
};

export default function TeamShowcase() {
  const [expandedTenure, setExpandedTenure] = useState<number>(0);

  const toggleTenure = (index: number) => {
    setExpandedTenure(expandedTenure === index ? -1 : index);
  };

  return (
    <div className="min-h-screen  md:py-16 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          {/* <h1 className=" text-xl md:text-5xl font-bold text-white mb-4 mt-4 tracking-[0.15em]">
            DJS Nova Space Committee
          </h1> */}
          <p className="text-gray-400 tracking-widest uppercase text-xl md:text-2xl">
            Meet Our Stellar Team
          </p>
        </div>

        {/* Team Sections */}
        <div className="space-y-6">
          {teamsData.map((team, index) => (
            <div key={index} className=" rounded-xl overflow-hidden ">
              {/* Tenure Header */}
              {teamsData.length > 1 && (
                <button
                  onClick={() => toggleTenure(index)}
                  className="w-full flex items-center justify-between p-6 bg-slate-900/30 hover:bg-slate-800/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {/* <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    {team.tenure.slice(2, 4)}
                  </div> */}
                    <h2 className="text-2xl font-bold text-white">
                      Team {team.tenure}
                    </h2>
                  </div>
                  <ChevronDown
                    className={`text-slate-400 transition-transform duration-300 ${
                      expandedTenure === index ? "rotate-180" : ""
                    }`}
                    size={24}
                  />
                </button>
              )}
              {/* Team Content */}
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  expandedTenure === index
                    ? "max-h-auto opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-8 space-y-12">
                  {/* ===== BOARD ===== */}
                  <div>
                    <h3 className="text-xl font-semibold mb-8 text-center tracking-wider">
                      Board Members
                    </h3>

                    {/* Desktop Layout */}
                    <div className="hidden md:block">
                      {/* CP at top center */}
                      <div className="flex justify-center mb-8">
                        <div className="w-64">
                          <MemberCard member={team.board.cp} />
                        </div>
                      </div>

                      {/* VCPs */}
                      <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto mb-8">
                        <MemberCard member={team.board.vcpAdmin} />
                        <MemberCard member={team.board.vcpTech} />
                      </div>

                      {/* Secretary, Treasurer, Project Head */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <MemberCard member={team.board.secretary} />
                        <MemberCard member={team.board.treasurer} />
                        <MemberCard member={team.board.projectHead} />
                      </div>
                    </div>

                    {/* Mobile Layout */}
                    <div className="md:hidden space-y-4">
                      <MemberCard member={team.board.cp} />
                      <MemberCard member={team.board.vcpAdmin} />
                      <MemberCard member={team.board.vcpTech} />
                      <MemberCard member={team.board.secretary} />
                      <MemberCard member={team.board.treasurer} />
                      <MemberCard member={team.board.projectHead} />
                    </div>
                  </div>

                  {/* ===== DEPARTMENTS ===== */}
                  <div className="space-y-12">
  {/* ===== DEPARTMENTS ===== */}
  <h3 className="text-xl font-semibold tracking-wider text-center mb-8">
    Department Heads
  </h3>

  {/* Research */}
  <div className="flex flex-col items-center">
    <h4 className="text-lg font-medium text-slate-300 mb-4 text-center w-full flex justify-center">
      Research
    </h4>
    <div className="flex justify-center items-center w-full gap-6 md:gap-27 md:flex-row flex-col max-w-2xl">
      {team.departments.research.map((member, i) => (
        <MemberCard key={i} member={member} />
      ))}
    </div>
  </div>

  {/* Technical */}
  <div className="flex flex-col items-center">
    <h4 className="text-lg font-medium text-slate-300 mb-4 text-center w-full flex justify-center">
      Technical
    </h4>
    <div className="flex justify-center items-center w-full gap-6 md:gap-27 md:flex-row flex-col max-w-2xl">
      <MemberCard member={team.departments.tech.ai} />
      <MemberCard member={team.departments.tech.webdev} />
    </div>
  </div>

  {/* Outreach */}
  <div className="flex flex-col items-center">
    <h4 className="text-lg font-medium text-slate-300 mb-4 text-center w-full flex justify-center">
      Outreach
    </h4>
    <div className="flex justify-center items-center w-full gap-6 md:gap-27 md:flex-row flex-col max-w-2xl">
      {team.departments.outreach.map((member, i) => (
        <MemberCard key={i} member={member} />
      ))}
    </div>
  </div>

  {/* Creative & Editorial */}
  <div className="flex flex-col items-center">
    <h4 className="text-lg font-medium text-slate-300 mb-4 text-center w-full flex justify-center">
      Creative & Editorial
    </h4>
    <div className="flex justify-center items-center w-full gap-6 md:gap-27 md:flex-row flex-col max-w-2xl">
      {team.departments.creativesEditorial.map((member, i) => (
        <MemberCard key={i} member={member} />
      ))}
    </div>
  </div>

  {/* Management */}
  <div className="flex flex-col items-center">
    <h4 className="text-lg font-medium text-slate-300 mb-4 text-center w-full flex justify-center">
      Management
    </h4>
    <div className="flex justify-center items-center w-full gap-6 md:gap-27 md:flex-row flex-col max-w-2xl">
      {team.departments.management.map((member, i) => (
        <MemberCard key={i} member={member} />
      ))}
    </div>
  </div>
   <div className="flex flex-col items-center">
    <h4 className="text-lg font-medium text-slate-300 mb-4 text-center w-full flex justify-center">
      Astrophotography Head 
    </h4>
    <div className="flex justify-center items-center w-full gap-6 md:gap-27 md:flex-row flex-col max-w-2xl">
      {team.departments.astrophotography.map((member, i) => (
        <MemberCard key={i} member={member} />
      ))}
    </div>
  </div>
</div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
