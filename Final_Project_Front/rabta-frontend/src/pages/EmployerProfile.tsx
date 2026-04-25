import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// ==========================================
// Interfaces
// ==========================================
interface Project {
  _id: string;
  title: string;
  description: string;
  status: 'Hiring Now' | 'Planning Phase' | 'Closed';
  roles: string[];
}

interface EmployerData {
  _id: string;
  companyName: string;
  companyType: string;
  location: string;
  avatar: string;
  bio: string;
  about: string;
  website?: string;
  linkedin?: string;
  talentTags: string[];
  projects: Project[];
}

// ==========================================
// Component
// ==========================================
export const EmployerProfile: React.FC = () => {
  const navigate = useNavigate();
  const { employerId } = useParams();

  // TODO (Backend): جلب بيانات الشركة
  // useEffect(() => {
  //   axios.get(`/api/employers/${employerId}`).then(res => setEmployer(res.data));
  // }, [employerId]);

  const [employer] = useState<EmployerData | null>(null);


  if (!employer) {
    return (
      <main className="flex-1 overflow-y-auto relative custom-scrollbar bg-[#FAFAFA] dark:bg-[#171717]">
        <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-20 h-20 bg-[#7C3AED]/10 dark:bg-[#8B5CF6]/20 rounded-full flex items-center justify-center mb-4">
            <span className="material-icons-round text-4xl text-[#7C3AED] dark:text-[#8B5CF6]">business</span>
          </div>
          <p className="text-lg font-bold text-gray-400 dark:text-gray-500 mb-2">Company profile not found</p>
          <p className="text-sm text-gray-300 dark:text-gray-600 mb-6">This profile may be loading or unavailable.</p>
          <button onClick={() => navigate('/jobs')} className="text-[#7C3AED] dark:text-[#8B5CF6] font-medium hover:underline">
            ← Back to Jobs
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 overflow-y-auto relative custom-scrollbar bg-[#FAFAFA] dark:bg-[#171717]">
      <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-8">
        
        {/* Left Sidebar - Company Card */}
        <aside className="w-full lg:w-[35%] flex flex-col gap-6">
          <div className="bg-white dark:bg-[#262626] rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-8 flex flex-col items-center text-center">
            <img src={employer.avatar} alt={employer.companyName} className="w-32 h-32 rounded-xl mb-4 object-cover border-4 border-[#FAFAFA] dark:border-[#171717] shadow-sm" />
            <h1 className="text-2xl font-bold mb-1 text-[#171717] dark:text-[#F5F5F5]">{employer.companyName}</h1>
            <h2 className="text-lg text-[#7C3AED] dark:text-[#8B5CF6] font-medium mb-2">{employer.companyType}</h2>
            <p className="text-sm mb-4 opacity-80 flex items-center gap-1">
              <span className="material-icons-round text-sm">location_on</span>
              {employer.location}
            </p>
            <p className="text-sm mb-6 leading-relaxed text-[#171717] dark:text-[#F5F5F5]">{employer.bio}</p>

            <div className="flex gap-4 mb-6">
              {employer.website && (
                <a href={employer.website} target="_blank" rel="noreferrer" className="text-[#171717] hover:text-[#7C3AED] dark:text-[#F5F5F5] dark:hover:text-[#8B5CF6] transition-colors duration-300">
                  <span className="material-icons-round text-2xl">language</span>
                </a>
              )}
              {employer.linkedin && (
                <a href={employer.linkedin} target="_blank" rel="noreferrer" className="text-[#171717] hover:text-[#7C3AED] dark:text-[#F5F5F5] dark:hover:text-[#8B5CF6] transition-colors duration-300">
                  <span className="material-icons-round text-2xl">work</span>
                </a>
              )}
            </div>

            <button className="w-full bg-[#7C3AED] hover:bg-opacity-90 dark:bg-[#8B5CF6] dark:hover:bg-opacity-90 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 shadow-sm">
              Message Client
            </button>
          </div>

          {/* Talent Tags */}
          <div className="bg-white dark:bg-[#262626] rounded-xl shadow-md p-8 transition-colors duration-300">
            <h3 className="text-2xl font-bold mb-3 text-[#171717] dark:text-[#F5F5F5]">Talent We Look For</h3>
            <div className="w-12 h-1 bg-[#7C3AED] dark:bg-[#8B5CF6] rounded-full mb-6"></div>
            <div className="flex flex-wrap gap-3">
              {employer.talentTags.map((tag, i) => (
                <span key={i} className="bg-[#7C3AED]/10 text-[#7C3AED] dark:bg-[#8B5CF6]/20 dark:text-[#8B5CF6] rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Content */}
        <div className="w-full lg:w-[65%] flex flex-col gap-8">
          {/* About */}
          <section className="bg-white dark:bg-[#262626] rounded-xl shadow-md p-8 transition-colors duration-300">
            <h3 className="text-2xl font-bold mb-3 text-[#171717] dark:text-[#F5F5F5]">About Us</h3>
            <div className="w-12 h-1 bg-[#7C3AED] dark:bg-[#8B5CF6] rounded-full mb-6"></div>
            <p className="leading-relaxed text-[#171717] dark:text-[#F5F5F5]">{employer.about}</p>
          </section>

          {/* Active Projects */}
          <section>
            <h3 className="text-2xl font-bold mb-3 px-2 text-[#171717] dark:text-[#F5F5F5]">Active Projects & Openings</h3>
            <div className="w-12 h-1 bg-[#7C3AED] dark:bg-[#8B5CF6] rounded-full mb-6 mx-2"></div>
            
            <div className="grid grid-cols-1 gap-6">
              {employer.projects.length === 0 ? (
                <div className="bg-white dark:bg-[#262626] rounded-xl p-8 text-center">
                  <p className="text-gray-400 dark:text-gray-500">No active projects yet.</p>
                </div>
              ) : (
                employer.projects.map((project) => (
                  <article key={project._id} className="bg-white dark:bg-[#262626] border-l-4 border-[#7C3AED] dark:border-[#8B5CF6] rounded-r-xl rounded-l-sm shadow-lg hover:shadow-xl transition-all duration-300 p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-xl font-bold text-[#171717] dark:text-[#F5F5F5]">{project.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded-md font-bold uppercase tracking-wider ${
                        project.status === 'Hiring Now'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : project.status === 'Planning Phase'
                          ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                      }`}>{project.status}</span>
                    </div>
                    <p className="text-sm opacity-80 mb-4 leading-relaxed">{project.description}</p>
                    <div className="mb-4">
                      <span className="text-xs font-bold uppercase tracking-wider mb-2 block text-[#171717] dark:text-[#F5F5F5]">Roles Needed:</span>
                      <div className="flex flex-wrap gap-2">
                        {project.roles.map((role, i) => (
                          <span key={i} className="text-xs border border-[#171717]/20 dark:border-[#F5F5F5]/20 rounded px-2 py-1">{role}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button className="bg-[#7C3AED] hover:bg-opacity-90 dark:bg-[#8B5CF6] text-white px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-sm">
                        Apply for Role
                      </button>
                      <button
                        onClick={() => navigate(`/projects/${project._id}`)}
                        className="border border-[#7C3AED] dark:border-[#8B5CF6] text-[#7C3AED] dark:text-[#8B5CF6] hover:bg-[#7C3AED]/10 dark:hover:bg-[#8B5CF6]/10 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                      >
                        Project Details
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};
