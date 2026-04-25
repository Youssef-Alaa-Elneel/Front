import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ==========================================
// Interfaces
// ==========================================
interface SocialLink {
  platform: string;
  url: string;
}

interface ProjectEntry {
  title: string;
  status: 'hiring' | 'planning' | 'closed';
  description: string;
  roles: string;
}

// ==========================================
// Component
// ==========================================
export const EmployerSetupProfile: React.FC = () => {
  const navigate = useNavigate();

  // Form state — جاهزة للربط بالباك-إند
  const [companyName, setCompanyName] = useState('');
  const [companyType, setCompanyType] = useState('');
  const [location, setLocation] = useState('');
  const [headline, setHeadline] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [aboutCompany, setAboutCompany] = useState('');
  const [talentInput, setTalentInput] = useState('');
  const [talentTags, setTalentTags] = useState<string[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([{ platform: 'website', url: '' }]);
  const [projects, setProjects] = useState<ProjectEntry[]>([{ title: '', status: 'hiring', description: '', roles: '' }]);

  const inputClass = "w-full bg-[#FAFAFA] dark:bg-[#171717] border border-[#171717]/10 dark:border-[#F5F5F5]/10 rounded-lg px-4 py-3 focus:outline-none focus:border-[#7C3AED] dark:focus:border-[#8B5CF6] transition-all duration-300 placeholder-[#171717]/40 dark:placeholder-[#F5F5F5]/40 text-[#171717] dark:text-[#F5F5F5]";

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && talentInput.trim()) {
      e.preventDefault();
      if (!talentTags.includes(talentInput.trim())) {
        setTalentTags([...talentTags, talentInput.trim()]);
      }
      setTalentInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTalentTags(talentTags.filter(t => t !== tag));
  };

  const handleAddLink = () => {
    setSocialLinks([...socialLinks, { platform: 'website', url: '' }]);
  };

  const handleRemoveLink = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  };

  const handleAddProject = () => {
    setProjects([...projects, { title: '', status: 'hiring', description: '', roles: '' }]);
  };

  const handleRemoveProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    // 1. Validate & Clean Arrays
    const cleanTags = talentTags.filter(t => typeof t === 'string' && t.trim() !== '');
    const cleanLinks = socialLinks.filter(l => l.url.trim() !== '');
    const cleanProjects = projects.filter(p => p.title.trim() !== '');

    // 2. Prepare FormData
    const submitData = new FormData();
    submitData.append('companyName', companyName);
    submitData.append('companyType', companyType);
    submitData.append('location', location);
    submitData.append('headline', headline);
    submitData.append('contactEmail', contactEmail);
    submitData.append('aboutCompany', aboutCompany);

    // Arrays must be sent as JSON strings in FormData
    submitData.append('talentTags', JSON.stringify(cleanTags));
    submitData.append('socialLinks', JSON.stringify(cleanLinks));
    submitData.append('projects', JSON.stringify(cleanProjects));

    if (fileInputRef.current?.files?.[0]) {
      submitData.append('logo', fileInputRef.current.files[0]);
    }

    // TODO (Backend): Uncomment below when ready
    // try {
    //   await axiosInstance.post('/v1/employers/setup', submitData);
    //   navigate('/employer-profile');
    // } catch (error) {
    //   console.error("Failed to setup profile", error);
    // }
  };

  return (
    <main className="flex-1 overflow-y-auto relative custom-scrollbar bg-[#FAFAFA] dark:bg-[#171717]">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 text-[#171717] dark:text-[#F5F5F5]">Setup Company Profile</h1>
          <p className="opacity-80">Fill in your company details to attract the best talent on Rabta.</p>
        </div>

        <div className="bg-white dark:bg-[#262626] rounded-xl shadow-lg p-8 transition-colors duration-300">
          <form className="flex flex-col gap-10" onSubmit={(e) => e.preventDefault()}>
            
            {/* Section 1: Company Details */}
            <div>
              <h3 className="text-xl font-bold mb-4 border-b border-[#171717]/10 dark:border-[#F5F5F5]/10 pb-2 text-[#171717] dark:text-[#F5F5F5]">1. Company Details</h3>

                <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                  <div className="w-32 h-32 rounded-xl bg-[#FAFAFA] dark:bg-[#171717] border-2 border-dashed border-[#7C3AED] dark:border-[#8B5CF6] flex items-center justify-center text-[#7C3AED] dark:text-[#8B5CF6] transition-colors hover:bg-[#7C3AED]/5 cursor-pointer">
                    <span className="material-icons-round text-3xl">add_a_photo</span>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-[#171717] dark:text-[#F5F5F5]">Company Logo</h4>
                    <p className="text-sm opacity-70 mb-3">Square image recommended (JPG, PNG). Max 2MB.</p>
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" />
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-[#7C3AED]/10 text-[#7C3AED] hover:bg-[#7C3AED]/20 dark:bg-[#8B5CF6]/20 dark:text-[#8B5CF6] dark:hover:bg-[#8B5CF6]/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300">
                      Upload Logo
                    </button>
                  </div>
                </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold mb-2 text-[#171717] dark:text-[#F5F5F5]">Company Name</label>
                  <input type="text" placeholder="e.g. Tech Visionaries LLC" className={inputClass} value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-[#171717] dark:text-[#F5F5F5]">Company Type / Industry</label>
                  <input type="text" placeholder="e.g. Startup & Product Studio" className={inputClass} value={companyType} onChange={(e) => setCompanyType(e.target.value)} />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold mb-2 text-[#171717] dark:text-[#F5F5F5]">Location / Headquarters</label>
                <input type="text" placeholder="e.g. Cairo, Egypt (or Remote)" className={inputClass} value={location} onChange={(e) => setLocation(e.target.value)} />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 text-[#171717] dark:text-[#F5F5F5]">Short Intro (Headline)</label>
                <textarea rows={2} placeholder="Write a short catchphrase that summarizes your company..." className={`${inputClass} resize-none`} value={headline} onChange={(e) => setHeadline(e.target.value)} />
              </div>
            </div>

            {/* Section 2: Communication & Links */}
            <div>
              <div className="flex justify-between items-center mb-4 border-b border-[#171717]/10 dark:border-[#F5F5F5]/10 pb-2">
                <h3 className="text-xl font-bold text-[#171717] dark:text-[#F5F5F5]">2. Communication & Links</h3>
                <button type="button" onClick={handleAddLink} className="text-sm font-bold text-[#7C3AED] dark:text-[#8B5CF6] hover:underline flex items-center gap-1">
                  + Add Link
                </button>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold mb-2 text-[#171717] dark:text-[#F5F5F5]">Contact Email</label>
                <input type="email" placeholder="jobs@company.com" className={inputClass} value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
              </div>

              <div className="flex flex-col gap-4">
                {socialLinks.map((link, index) => (
                  <div key={index} className="flex flex-col sm:flex-row items-end gap-4">
                    <div className="w-full sm:w-1/3">
                      <label className="block text-sm font-bold mb-2 text-[#171717] dark:text-[#F5F5F5]">Platform</label>
                      <select
                        className={`${inputClass} cursor-pointer appearance-none`}
                        value={link.platform}
                        onChange={(e) => { const updated = [...socialLinks]; updated[index].platform = e.target.value; setSocialLinks(updated); }}
                      >
                        <option value="website">Website</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="twitter">Twitter / X</option>
                        <option value="github">GitHub</option>
                      </select>
                    </div>
                    <div className="flex-grow w-full">
                      <label className="block text-sm font-bold mb-2 text-[#171717] dark:text-[#F5F5F5]">URL</label>
                      <input type="url" placeholder="https://..." className={inputClass} value={link.url} onChange={(e) => { const updated = [...socialLinks]; updated[index].url = e.target.value; setSocialLinks(updated); }} />
                    </div>
                    <button type="button" onClick={() => handleRemoveLink(index)} className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors mb-0.5">
                      <span className="material-icons-round">delete_outline</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: About & Talent */}
            <div>
              <h3 className="text-xl font-bold mb-4 border-b border-[#171717]/10 dark:border-[#F5F5F5]/10 pb-2 text-[#171717] dark:text-[#F5F5F5]">3. About & Talent Requirements</h3>

              <div className="mb-6">
                <label className="block text-sm font-bold mb-2 text-[#171717] dark:text-[#F5F5F5]">About the Company (Detailed)</label>
                <textarea rows={4} placeholder="Describe your company's mission, culture, and projects..." className={`${inputClass} resize-none`} value={aboutCompany} onChange={(e) => setAboutCompany(e.target.value)} />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 text-[#171717] dark:text-[#F5F5F5]">Talent We Look For</label>
                <div className="w-full bg-[#FAFAFA] dark:bg-[#171717] border border-[#171717]/10 dark:border-[#F5F5F5]/10 rounded-lg p-2 flex flex-wrap gap-2 focus-within:border-[#7C3AED] dark:focus-within:border-[#8B5CF6] transition-all duration-300">
                  {talentTags.map((tag) => (
                    <span key={tag} className="bg-[#7C3AED]/10 text-[#7C3AED] dark:bg-[#8B5CF6]/20 dark:text-[#8B5CF6] rounded-full px-3 py-1 text-sm font-semibold flex items-center gap-1">
                      {tag}
                      <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:text-red-500 transition-colors">
                        <span className="material-icons-round text-sm">close</span>
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    placeholder="Type a skill and press Enter..."
                    className="bg-transparent border-none focus:outline-none flex-grow min-w-[250px] px-2 py-1 text-[#171717] dark:text-[#F5F5F5] placeholder-[#171717]/40 dark:placeholder-[#F5F5F5]/40"
                    value={talentInput}
                    onChange={(e) => setTalentInput(e.target.value)}
                    onKeyDown={handleAddTag}
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Initial Project */}
            <div>
              <div className="flex justify-between items-center mb-4 border-b border-[#171717]/10 dark:border-[#F5F5F5]/10 pb-2">
                <h3 className="text-xl font-bold text-[#171717] dark:text-[#F5F5F5]">4. Initial Project Opening</h3>
                <button type="button" onClick={handleAddProject} className="text-sm font-bold text-[#7C3AED] dark:text-[#8B5CF6] hover:underline flex items-center gap-1">
                  + Add Another Project
                </button>
              </div>

              {projects.map((project, index) => (
                <div key={index} className="bg-[#FAFAFA] dark:bg-[#171717] border-l-4 border-[#7C3AED] dark:border-[#8B5CF6] rounded-r-xl rounded-l-sm p-6 relative group mb-6 shadow-sm">
                  <button type="button" onClick={() => handleRemoveProject(index)} className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors">
                    <span className="material-icons-round">delete_outline</span>
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                    <div className="flex-grow">
                      <label className="block text-sm font-bold mb-2 text-[#171717] dark:text-[#F5F5F5]">Project Title</label>
                      <input type="text" placeholder="e.g. E-Commerce App MVP" className="w-full bg-white dark:bg-[#262626] border border-[#171717]/10 dark:border-[#F5F5F5]/10 rounded-lg px-4 py-3 focus:outline-none focus:border-[#7C3AED] dark:focus:border-[#8B5CF6] transition-all text-[#171717] dark:text-[#F5F5F5] placeholder-[#171717]/40 dark:placeholder-[#F5F5F5]/40" value={project.title} onChange={(e) => { const u = [...projects]; u[index].title = e.target.value; setProjects(u); }} />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2 text-[#171717] dark:text-[#F5F5F5]">Status</label>
                      <select className="w-full bg-white dark:bg-[#262626] border border-[#171717]/10 dark:border-[#F5F5F5]/10 rounded-lg px-4 py-3 focus:outline-none focus:border-[#7C3AED] dark:focus:border-[#8B5CF6] transition-all cursor-pointer appearance-none text-[#171717] dark:text-[#F5F5F5]" value={project.status} onChange={(e) => { const u = [...projects]; u[index].status = e.target.value as ProjectEntry['status']; setProjects(u); }}>
                        <option value="hiring">Hiring Now</option>
                        <option value="planning">Planning Phase</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold mb-2 text-[#171717] dark:text-[#F5F5F5]">Project Description</label>
                      <textarea rows={3} placeholder="Describe the project goals..." className="w-full bg-white dark:bg-[#262626] border border-[#171717]/10 dark:border-[#F5F5F5]/10 rounded-lg px-4 py-3 focus:outline-none focus:border-[#7C3AED] dark:focus:border-[#8B5CF6] transition-all resize-none text-[#171717] dark:text-[#F5F5F5] placeholder-[#171717]/40 dark:placeholder-[#F5F5F5]/40" value={project.description} onChange={(e) => { const u = [...projects]; u[index].description = e.target.value; setProjects(u); }} />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold mb-2 text-[#171717] dark:text-[#F5F5F5]">Roles Needed</label>
                      <input type="text" placeholder="e.g. Frontend Dev, UI Designer (comma-separated)" className="w-full bg-white dark:bg-[#262626] border border-[#171717]/10 dark:border-[#F5F5F5]/10 rounded-lg px-4 py-3 focus:outline-none focus:border-[#7C3AED] dark:focus:border-[#8B5CF6] transition-all text-[#171717] dark:text-[#F5F5F5] placeholder-[#171717]/40 dark:placeholder-[#F5F5F5]/40" value={project.roles} onChange={(e) => { const u = [...projects]; u[index].roles = e.target.value; setProjects(u); }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Submit */}
            <div className="mt-4 flex justify-end gap-4 border-t border-[#171717]/10 dark:border-[#F5F5F5]/10 pt-6">
              <button type="button" onClick={() => navigate(-1)} className="px-8 py-3 rounded-lg font-bold border border-[#171717]/20 dark:border-[#F5F5F5]/20 hover:bg-[#171717]/5 dark:hover:bg-[#F5F5F5]/5 transition-all duration-300 text-[#171717] dark:text-[#F5F5F5]">
                Cancel
              </button>
              <button type="button" onClick={handleSubmit} className="bg-[#7C3AED] hover:bg-opacity-90 dark:bg-[#8B5CF6] text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 shadow-md">
                Create Company Profile
              </button>
            </div>

          </form>
        </div>
      </div>
    </main>
  );
};
