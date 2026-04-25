import React, { useState, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { updateProfile } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { Popup } from '../components/ui/Popup'; // تأكدي من المسار الصحيح للـ Popup

interface Link {
  id: number;
  platform: string;
  url: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  viewLink: string;
  githubLink: string;
}

interface FormDataType {
  fullName: string;
  jobTitle: string;
  location: string;
  bioHeadline: string;
  detailedAbout: string;
  contactEmail: string;
  skills: string[];
  links: Link[];
  projects: Project[];
}

// ==========================================
// Shared Input Styles
// ==========================================
const inputBase = "w-full bg-[#FAFAFA] dark:bg-[#171717] border border-[#171717]/10 dark:border-[#F5F5F5]/10 rounded-lg px-4 py-3 focus:outline-none focus:border-[#7C3AED] dark:focus:border-[#8B5CF6] transition-all duration-300 placeholder-[#171717]/40 dark:placeholder-[#F5F5F5]/40 text-[#171717] dark:text-[#F5F5F5] text-sm";
const projectInputBase = "w-full bg-white dark:bg-[#262626] border border-[#171717]/10 dark:border-[#F5F5F5]/10 rounded-lg px-4 py-3 focus:outline-none focus:border-[#7C3AED] dark:focus:border-[#8B5CF6] transition-all duration-300 placeholder-[#171717]/40 dark:placeholder-[#F5F5F5]/40 text-[#171717] dark:text-[#F5F5F5] text-sm";

// ==========================================
// Component
// ==========================================
const EditProfile: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // حالة البوب أب
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Validate size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('Image must be less than 2MB');
      return;
    }
    // Validate type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPG, PNG)');
      return;
    }
    // Create local preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    // TODO (Backend): Upload via FormData
    // const formData = new FormData(); formData.append('avatar', file);
    // axios.post('/api/users/avatar', formData);
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const [formData, setFormData] = useState<FormDataType>({
    fullName: user?.fullName || '',
    jobTitle: user?.jobTitle || '',
    location: user?.location || '',
    bioHeadline: user?.bioHeadline || '',
    detailedAbout: user?.bio || '',
    contactEmail: user?.contactEmail || '',
    skills: Array.isArray(user?.skills) ? user.skills : [],
    links: user?.links || [{ id: 1, platform: '', url: '' }],
    projects: user?.projects || [{ id: 2, title: '', description: '', viewLink: '', githubLink: '' }]
  });

  const addLink = () => {
    setFormData({
      ...formData,
      links: [...formData.links, { id: Date.now(), platform: '', url: '' }]
    });
  };

  const removeLink = (id: number) => {
    setFormData({ ...formData, links: formData.links.filter((l: Link) => l.id !== id) });
  };

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [...formData.projects, { id: Date.now() + 1, title: '', description: '', viewLink: '', githubLink: '' }]
    });
  };

  const removeProject = (id: number) => {
    setFormData({ ...formData, projects: formData.projects.filter((p: Project) => p.id !== id) });
  };

  const handleLinkChange = (id: number, field: string, value: string) => {
    setFormData({
      ...formData,
      links: formData.links.map((l: Link) => l.id === id ? { ...l, [field]: value } : l)
    });
  };

  const handleProjectChange = (id: number, field: string, value: string) => {
    setFormData({
      ...formData,
      projects: formData.projects.map((p: Project) => p.id === id ? { ...p, [field]: value } : p)
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validate & Clean Dynamic Arrays
    const cleanSkills = Array.isArray(formData.skills) 
      ? formData.skills.filter((s: any) => typeof s === 'string' && s.trim() !== '')
      : [];
      
    const cleanProjects = formData.projects
      .filter((p: Project) => p.title.trim() !== '')
      .map(({ id, ...rest }: Project) => rest); // Remove local temporary ID

    const cleanLinks = formData.links
      .filter((l: Link) => l.platform.trim() !== '' && l.url.trim() !== '')
      .map(({ id, ...rest }: Link) => rest);

    // 2. Prepare FormData for file upload support
    const submitData = new FormData();
    submitData.append('fullName', formData.fullName);
    submitData.append('jobTitle', formData.jobTitle);
    submitData.append('location', formData.location);
    submitData.append('bioHeadline', formData.bioHeadline);
    submitData.append('detailedAbout', formData.detailedAbout);
    submitData.append('contactEmail', formData.contactEmail);
    
    // Arrays must be sent as JSON strings in FormData
    submitData.append('skills', JSON.stringify(cleanSkills));
    submitData.append('links', JSON.stringify(cleanLinks));
    submitData.append('projects', JSON.stringify(cleanProjects));

    // Append actual file if changed
    if (fileInputRef.current?.files?.[0]) {
      submitData.append('avatar', fileInputRef.current.files[0]);
    }

    // Pass FormData to Redux or API
    // dispatch(updateProfile(submitData as any)); // Example for thunk
    
    setShowSuccessPopup(true);
  };

  return (
    <main className="flex-1 overflow-y-auto relative custom-scrollbar bg-[#FAFAFA] dark:bg-[#171717] transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 py-12">
        
        {/* Header */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="w-14 h-14 bg-[#7C3AED]/10 dark:bg-[#8B5CF6]/20 rounded-2xl flex items-center justify-center text-[#7C3AED] dark:text-[#8B5CF6] mb-4 shadow-sm">
            <span className="material-icons-round text-2xl">edit_note</span>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-[#171717] dark:text-[#F5F5F5]">Edit Your Profile</h1>
          <p className="opacity-70 text-sm">Update your professional information and portfolio to stand out.</p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-[#262626] rounded-xl shadow-lg p-8 transition-colors duration-300 border border-gray-100 dark:border-white/5">
          <form onSubmit={handleSubmit} className="flex flex-col gap-10">
            
            {/* ═══════════ Section 1: Basic Information ═══════════ */}
            <div>
              <h3 className="text-xl font-bold mb-4 border-b border-[#171717]/10 dark:border-[#F5F5F5]/10 pb-2 text-[#171717] dark:text-[#F5F5F5] flex items-center gap-2">
                <span className="w-7 h-7 bg-[#7C3AED] dark:bg-[#8B5CF6] text-white rounded-lg text-xs font-bold flex items-center justify-center shadow-sm">1</span>
                Basic Information
              </h3>

              {/* Avatar Upload */}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/png, image/jpeg, image/webp"
                onChange={handleAvatarChange}
                className="hidden"
              />
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                <div className="relative group" onClick={triggerFileUpload}>
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] dark:from-[#8B5CF6] dark:to-[#7C3AED] flex items-center justify-center text-white text-3xl font-bold shadow-lg overflow-hidden transition-all duration-300">
                    {avatarPreview ? (
                      <img src={avatarPreview} className="w-full h-full object-cover" alt="avatar preview" />
                    ) : user?.avatar ? (
                      <img src={user.avatar} className="w-full h-full object-cover" alt="avatar" />
                    ) : (
                      <span>{formData.fullName?.[0]?.toUpperCase() || 'A'}</span>
                    )}
                  </div>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 cursor-pointer">
                    <span className="material-icons-round text-white text-2xl">camera_alt</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold mb-1 text-[#171717] dark:text-[#F5F5F5]">Profile Photo</h4>
                  <p className="text-sm opacity-70 mb-3">Square image recommended (JPG, PNG). Max 2MB.</p>
                  <button type="button" onClick={triggerFileUpload} className="bg-[#7C3AED]/10 text-[#7C3AED] hover:bg-[#7C3AED]/20 dark:bg-[#8B5CF6]/20 dark:text-[#8B5CF6] dark:hover:bg-[#8B5CF6]/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 flex items-center gap-2">
                    <span className="material-icons-round text-base">upload</span>
                    Change Photo
                  </button>
                </div>
              </div>

              {/* Name & Job Title */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold mb-2 text-[#171717] dark:text-[#F5F5F5]">Full Name</label>
                  <input type="text" placeholder="e.g. John Doe" value={formData.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)} className={inputBase} />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-[#171717] dark:text-[#F5F5F5]">Job Title</label>
                  <input type="text" placeholder="e.g. Senior Front-End Developer" value={formData.jobTitle} onChange={(e) => handleInputChange('jobTitle', e.target.value)} className={inputBase} />
                </div>
              </div>

              {/* Location */}
              <div className="mb-6">
                <label className="block text-sm font-bold mb-2 text-[#171717] dark:text-[#F5F5F5]">Location</label>
                <div className="relative">
                  <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">location_on</span>
                  <input type="text" placeholder="e.g. Cairo, Egypt" value={formData.location} onChange={(e) => handleInputChange('location', e.target.value)} className={`${inputBase} pl-10`} />
                </div>
              </div>

              {/* Bio Headline */}
              <div>
                <label className="block text-sm font-bold mb-2 text-[#171717] dark:text-[#F5F5F5]">Short Bio (Headline)</label>
                <textarea rows={2} placeholder="Write a catchphrase that appears under your name..." value={formData.bioHeadline} onChange={(e) => handleInputChange('bioHeadline', e.target.value)} className={`${inputBase} resize-none`} />
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5 ml-1">{formData.bioHeadline.length}/120 characters</p>
              </div>
            </div>

            {/* ═══════════ Section 2: Social Links & Contact ═══════════ */}
            <div>
              <div className="flex justify-between items-center mb-4 border-b border-[#171717]/10 dark:border-[#F5F5F5]/10 pb-2">
                <h3 className="text-xl font-bold text-[#171717] dark:text-[#F5F5F5] flex items-center gap-2">
                  <span className="w-7 h-7 bg-[#7C3AED] dark:bg-[#8B5CF6] text-white rounded-lg text-xs font-bold flex items-center justify-center shadow-sm">2</span>
                  Social Links & Contact
                </h3>
                <button type="button" onClick={addLink} className="bg-[#7C3AED]/10 dark:bg-[#8B5CF6]/15 text-[#7C3AED] dark:text-[#8B5CF6] hover:bg-[#7C3AED]/20 dark:hover:bg-[#8B5CF6]/25 px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-1.5 hover:scale-105 hover:shadow-sm active:scale-95">
                  <span className="material-icons-round text-lg">add_circle</span>
                  Add Link
                </button>
              </div>

              {/* Contact Email */}
              <div className="mb-6">
                <label className="block text-sm font-bold mb-2 text-[#171717] dark:text-[#F5F5F5]">Contact Email</label>
                <div className="relative">
                  <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">mail</span>
                  <input type="email" placeholder="your.email@example.com" value={formData.contactEmail} onChange={(e) => handleInputChange('contactEmail', e.target.value)} className={`${inputBase} pl-10`} />
                </div>
              </div>

              {/* Links List */}
              <div className="flex flex-col gap-4">
                {formData.links.map((link: Link) => (
                  <div key={link.id} className="flex flex-col sm:flex-row items-end gap-4 group">
                    <div className="w-full sm:w-1/3">
                      <label className="block text-xs font-bold uppercase mb-1.5 text-gray-500 dark:text-gray-400 tracking-wider">Platform</label>
                      <select
                        value={link.platform}
                        onChange={(e) => handleLinkChange(link.id, 'platform', e.target.value)}
                        className={`${inputBase} cursor-pointer appearance-none`}
                      >
                        <option value="">Select Platform</option>
                        <option value="GitHub">GitHub</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Portfolio">Portfolio / Website</option>
                        <option value="Twitter">Twitter / X</option>
                        <option value="Behance">Behance</option>
                      </select>
                    </div>
                    <div className="flex-grow w-full">
                      <label className="block text-xs font-bold uppercase mb-1.5 text-gray-500 dark:text-gray-400 tracking-wider">URL</label>
                      <input type="url" value={link.url} onChange={(e) => handleLinkChange(link.id, 'url', e.target.value)} className={inputBase} placeholder="https://..." />
                    </div>
                    <button type="button" onClick={() => removeLink(link.id)} className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors mb-0.5" title="Remove Link">
                      <span className="material-icons-round">delete_outline</span>
                    </button>
                  </div>
                ))}
                {formData.links.length === 0 && (
                  <div className="text-center py-6 text-gray-400 dark:text-gray-500 text-sm">
                    <span className="material-icons-round text-2xl mb-1 block opacity-40">link_off</span>
                    No links added yet. Click "Add Link" above.
                  </div>
                )}
              </div>
            </div>

            {/* ═══════════ Section 3: Professional Details ═══════════ */}
            <div>
              <h3 className="text-xl font-bold mb-4 border-b border-[#171717]/10 dark:border-[#F5F5F5]/10 pb-2 text-[#171717] dark:text-[#F5F5F5] flex items-center gap-2">
                <span className="w-7 h-7 bg-[#7C3AED] dark:bg-[#8B5CF6] text-white rounded-lg text-xs font-bold flex items-center justify-center shadow-sm">3</span>
                Professional Details
              </h3>

              {/* About */}
              <div className="mb-6">
                <label className="block text-sm font-bold mb-2 text-[#171717] dark:text-[#F5F5F5]">About Me (Detailed)</label>
                <textarea rows={5} placeholder="Tell potential clients about your background, experience, and what you excel at..." value={formData.detailedAbout} onChange={(e) => handleInputChange('detailedAbout', e.target.value)} className={`${inputBase} resize-none`} />
              </div>

              {/* Skills Chips */}
              <div>
                <label className="block text-sm font-bold mb-2 text-[#171717] dark:text-[#F5F5F5]">Technical Skills</label>
                <div className={`${inputBase} !p-2 flex flex-wrap gap-2 focus-within:border-[#7C3AED] dark:focus-within:border-[#8B5CF6]`}>
                  {formData.skills.map((skill: string, idx: number) => (
                    <span key={idx} className="bg-[#7C3AED]/10 text-[#7C3AED] dark:bg-[#8B5CF6]/20 dark:text-[#8B5CF6] px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1.5 transition-colors">
                      {skill}
                      <button type="button" onClick={() => setFormData({ ...formData, skills: formData.skills.filter((_: string, i: number) => i !== idx) })} className="hover:text-red-500 transition-colors">
                        <span className="material-icons-round text-sm">close</span>
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    placeholder={formData.skills.length === 0 ? "Type a skill and press Enter..." : "Add more..."}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && (e.target as HTMLInputElement).value.trim()) {
                        e.preventDefault();
                        const skill = (e.target as HTMLInputElement).value.trim();
                        if (!formData.skills.includes(skill)) {
                          setFormData({ ...formData, skills: [...formData.skills, skill] });
                        }
                        (e.target as HTMLInputElement).value = '';
                      }
                    }}
                    className="bg-transparent border-none outline-none flex-grow min-w-[200px] px-2 py-1 text-[#171717] dark:text-[#F5F5F5] placeholder-[#171717]/40 dark:placeholder-[#F5F5F5]/40 text-sm"
                  />
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5 ml-1">{formData.skills.length} skill{formData.skills.length !== 1 ? 's' : ''} added</p>
              </div>
            </div>

            {/* ═══════════ Section 4: Featured Projects ═══════════ */}
            <div>
              <div className="flex justify-between items-center mb-4 border-b border-[#171717]/10 dark:border-[#F5F5F5]/10 pb-2">
                <h3 className="text-xl font-bold text-[#171717] dark:text-[#F5F5F5] flex items-center gap-2">
                  <span className="w-7 h-7 bg-[#7C3AED] dark:bg-[#8B5CF6] text-white rounded-lg text-xs font-bold flex items-center justify-center shadow-sm">4</span>
                  Featured Projects
                </h3>
                <button type="button" onClick={addProject} className="bg-[#7C3AED]/10 dark:bg-[#8B5CF6]/15 text-[#7C3AED] dark:text-[#8B5CF6] hover:bg-[#7C3AED]/20 dark:hover:bg-[#8B5CF6]/25 px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-1.5 hover:scale-105 hover:shadow-sm active:scale-95">
                  <span className="material-icons-round text-lg">add_circle</span>
                  Add Project
                </button>
              </div>

              {formData.projects.map((project: Project) => (
                <div key={project.id} className="bg-[#FAFAFA] dark:bg-[#171717] border-l-4 border-[#7C3AED] dark:border-[#8B5CF6] rounded-r-xl rounded-l-sm p-6 relative group mb-6 shadow-sm border border-[#171717]/5 dark:border-[#F5F5F5]/5 hover:shadow-md transition-all duration-300">
                  <button type="button" onClick={() => removeProject(project.id)} className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors opacity-60 group-hover:opacity-100" title="Remove Project">
                    <span className="material-icons-round">delete_outline</span>
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                    {/* Title (full width) */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold mb-2 text-[#171717] dark:text-[#F5F5F5]">Project Title</label>
                      <input type="text" value={project.title} onChange={(e) => handleProjectChange(project.id, 'title', e.target.value)} className={projectInputBase} placeholder="e.g. My Awesome App" />
                    </div>

                    {/* Description (full width) */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold mb-2 text-[#171717] dark:text-[#F5F5F5]">Project Description</label>
                      <textarea rows={3} value={project.description} onChange={(e) => handleProjectChange(project.id, 'description', e.target.value)} className={`${projectInputBase} resize-none`} placeholder="Briefly describe the project and technologies used..." />
                    </div>

                    {/* Links Row */}
                    <div>
                      <label className="block text-sm font-bold mb-2 text-[#171717] dark:text-[#F5F5F5] flex items-center gap-1.5">
                        <span className="material-icons-round text-sm text-gray-400">visibility</span>
                        Live Demo (Optional)
                      </label>
                      <input type="url" value={project.viewLink} onChange={(e) => handleProjectChange(project.id, 'viewLink', e.target.value)} className={projectInputBase} placeholder="https://..." />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2 text-[#171717] dark:text-[#F5F5F5] flex items-center gap-1.5">
                        <span className="material-icons-round text-sm text-gray-400">code</span>
                        GitHub Repo (Optional)
                      </label>
                      <input type="url" value={project.githubLink} onChange={(e) => handleProjectChange(project.id, 'githubLink', e.target.value)} className={projectInputBase} placeholder="https://github.com/..." />
                    </div>
                  </div>
                </div>
              ))}

              {formData.projects.length === 0 && (
                <div className="text-center py-8 text-gray-400 dark:text-gray-500 text-sm border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
                  <span className="material-icons-round text-3xl mb-2 block opacity-30">folder_open</span>
                  No projects added yet. Click "Add Project" to showcase your work.
                </div>
              )}
            </div>

            {/* ═══════════ Actions ═══════════ */}
            <div className="mt-4 flex justify-end gap-4 border-t border-[#171717]/10 dark:border-[#F5F5F5]/10 pt-6">
              <button type="button" onClick={() => navigate('/profile')} className="px-8 py-3 rounded-lg font-bold border border-[#171717]/20 dark:border-[#F5F5F5]/20 hover:bg-[#171717]/5 dark:hover:bg-[#F5F5F5]/5 transition-all duration-300 text-[#171717] dark:text-[#F5F5F5]">
                Cancel
              </button>
              <button type="submit" className="bg-[#7C3AED] hover:bg-[#6D28D9] dark:bg-[#8B5CF6] dark:hover:bg-[#7C3AED] text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-95 flex items-center gap-2">
                <span className="material-icons-round text-lg">save</span>
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* AI Floating Button */}
      <div className="fixed bottom-6 right-6 flex flex-col items-end gap-4 z-50">
        {isAiOpen && (
          <div className="w-80 bg-white dark:bg-[#262626] rounded-2xl shadow-2xl border border-gray-100 dark:border-white/5 overflow-hidden flex flex-col transition-all duration-300">
            <div className="bg-[#7C3AED] dark:bg-[#8B5CF6] p-4 text-white dark:text-[#F5F5F5] flex justify-between items-center transition-colors">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="font-bold text-sm">Rabta AI</span>
              </div>
              <button onClick={() => setIsAiOpen(false)} className="hover:bg-white/20 p-1 rounded-lg transition-colors">
                <span className="material-icons-round text-lg">close</span>
              </button>
            </div>
            <div className="h-40 bg-[#FAFAFA] dark:bg-[#171717] p-4 text-sm text-gray-500 dark:text-[#F5F5F5]/50 italic overflow-y-auto custom-scrollbar">
              I can help you write a professional bio, suggest skills, or improve your profile content!
            </div>
            <div className="p-4 bg-white dark:bg-[#262626] border-t border-gray-100 dark:border-white/10">
              <input type="text" className="w-full text-sm p-2.5 rounded-xl bg-gray-50 dark:bg-[#171717] text-[#171717] dark:text-[#F5F5F5] border border-gray-200 dark:border-white/10 outline-none focus:border-[#7C3AED] dark:focus:border-[#8B5CF6] transition-all" placeholder="Ask AI for suggestions..." />
            </div>
          </div>
        )}
        <button onClick={() => setIsAiOpen(!isAiOpen)} className="w-12 h-12 bg-[#7C3AED] dark:bg-[#8B5CF6] rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform">
          <span className="material-icons-round text-2xl">bolt</span>
        </button>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <Popup onClose={() => navigate('/profile')}>
          <div className="text-center p-4">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-icons-round text-3xl">check</span>
            </div>
            <h2 className="text-2xl font-black mb-2 text-[#7C3AED] dark:text-[#8B5CF6]">Profile Updated!</h2>
            <p className="opacity-60 mb-6 text-sm">Your changes have been saved successfully. Your professional brand is looking great.</p>
            <button onClick={() => navigate('/profile')} className="w-full bg-[#7C3AED] dark:bg-[#8B5CF6] text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
              Back to Profile
            </button>
          </div>
        </Popup>
      )}
    </main>
  );
};

export default EditProfile;
