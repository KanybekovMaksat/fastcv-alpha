import React from 'react';
import { UserProfile } from '../types';

interface ResumeTemplateProps {
  profile: UserProfile;
  templateId: string;
}

const ModernTemplate: React.FC<{ profile: UserProfile }> = ({ profile }) => (
  <div className="bg-white p-8 min-h-[11in] w-[8.5in] mx-auto shadow-lg font-sans text-sm">
    {/* Header */}
    <div className="border-b-2 border-blue-600 pb-6 mb-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{profile.fullName}</h1>
      <h2 className="text-xl text-blue-600 mb-4">{profile.position}</h2>
      <div className="flex flex-wrap gap-4 text-gray-600">
        {profile.email && <span>📧 {profile.email}</span>}
        {profile.phone && <span>📱 {profile.phone}</span>}
        {profile.location && <span>📍 {profile.location}</span>}
      </div>
    </div>

    {/* Summary */}
    {profile.summary && (
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 border-l-4 border-blue-600 pl-3">
          О себе
        </h3>
        <p className="text-gray-700 leading-relaxed">{profile.summary}</p>
      </div>
    )}

    {/* Experience */}
    {profile.experience && profile.experience.length > 0 && (
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 border-l-4 border-blue-600 pl-3">
          Опыт работы
        </h3>
        {profile.experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold text-gray-900">{exp.position}</h4>
                <p className="text-blue-600">{exp.company} • {exp.location}</p>
              </div>
              <div className="text-gray-500 text-right">
                <p>{exp.startDate} - {exp.current ? 'настоящее время' : exp.endDate}</p>
              </div>
            </div>
            {exp.description && exp.description.length > 0 && (
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {exp.description.map((desc, idx) => (
                  <li key={idx}>{desc}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    )}

    {/* Education */}
    {profile.education && profile.education.length > 0 && (
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 border-l-4 border-blue-600 pl-3">
          Образование
        </h3>
        {profile.education.map((edu, index) => (
          <div key={index} className="mb-3">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-gray-900">{edu.degree} - {edu.field}</h4>
                <p className="text-blue-600">{edu.institution}</p>
              </div>
              <div className="text-gray-500">
                <p>{edu.startYear} - {edu.endYear}</p>
                {edu.gpa && <p>Средний балл: {edu.gpa}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    )}

    {/* Skills */}
    {profile.skills && profile.skills.length > 0 && (
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 border-l-4 border-blue-600 pl-3">
          Навыки
        </h3>
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
            >
              {skill.name} ({skill.level})
            </span>
          ))}
        </div>
      </div>
    )}

    {/* Links */}
    <div className="flex flex-wrap gap-4 text-blue-600">
      {profile.linkedin && <span>LinkedIn: {profile.linkedin}</span>}
      {profile.github && <span>GitHub: {profile.github}</span>}
      {profile.website && <span>Website: {profile.website}</span>}
    </div>
  </div>
);

const ClassicTemplate: React.FC<{ profile: UserProfile }> = ({ profile }) => (
  <div className="bg-white p-8 min-h-[11in] w-[8.5in] mx-auto shadow-lg font-serif text-sm">
    {/* Header */}
    <div className="text-center border-b border-gray-300 pb-6 mb-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{profile.fullName}</h1>
      <h2 className="text-lg text-gray-700 mb-4">{profile.position}</h2>
      <div className="flex justify-center space-x-6 text-gray-600">
        {profile.email && <span>{profile.email}</span>}
        {profile.phone && <span>{profile.phone}</span>}
        {profile.location && <span>{profile.location}</span>}
      </div>
    </div>

    {/* Summary */}
    {profile.summary && (
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
          Профессиональное резюме
        </h3>
        <p className="text-gray-700 leading-relaxed text-justify">{profile.summary}</p>
      </div>
    )}

    {/* Experience */}
    {profile.experience && profile.experience.length > 0 && (
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
          Профессиональный опыт
        </h3>
        {profile.experience.map((exp, index) => (
          <div key={index} className="mb-4 pb-3 border-b border-gray-200 last:border-b-0">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-bold text-gray-900">{exp.position}</h4>
                <p className="italic text-gray-700">{exp.company}, {exp.location}</p>
              </div>
              <div className="text-gray-600">
                <p>{exp.startDate} - {exp.current ? 'настоящее время' : exp.endDate}</p>
              </div>
            </div>
            {exp.description && exp.description.length > 0 && (
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                {exp.description.map((desc, idx) => (
                  <li key={idx}>{desc}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    )}

    {/* Education */}
    {profile.education && profile.education.length > 0 && (
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
          Образование
        </h3>
        {profile.education.map((edu, index) => (
          <div key={index} className="mb-3">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-gray-900">{edu.degree}</h4>
                <p className="italic text-gray-700">{edu.field}</p>
                <p className="text-gray-700">{edu.institution}</p>
              </div>
              <div className="text-gray-600 text-right">
                <p>{edu.startYear} - {edu.endYear}</p>
                {edu.gpa && <p>Средний балл: {edu.gpa}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    )}

    {/* Skills */}
    {profile.skills && profile.skills.length > 0 && (
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
          Ключевые навыки
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {profile.skills.map((skill, index) => (
            <div key={index} className="flex justify-between">
              <span className="text-gray-700">{skill.name}</span>
              <span className="text-gray-600">{skill.level}</span>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

const CreativeTemplate: React.FC<{ profile: UserProfile }> = ({ profile }) => (
  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 min-h-[11in] w-[8.5in] mx-auto shadow-lg font-sans text-sm">
    {/* Header */}
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-lg mb-6">
      <h1 className="text-3xl font-bold mb-2">{profile.fullName}</h1>
      <h2 className="text-xl opacity-90 mb-4">{profile.position}</h2>
      <div className="flex flex-wrap gap-4 opacity-90">
        {profile.email && <span>📧 {profile.email}</span>}
        {profile.phone && <span>📱 {profile.phone}</span>}
        {profile.location && <span>📍 {profile.location}</span>}
      </div>
    </div>

    {/* Summary */}
    {profile.summary && (
      <div className="mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-bold text-purple-700 mb-3 flex items-center">
            <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
            О себе
          </h3>
          <p className="text-gray-700 leading-relaxed">{profile.summary}</p>
        </div>
      </div>
    )}

    {/* Experience */}
    {profile.experience && profile.experience.length > 0 && (
      <div className="mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-bold text-purple-700 mb-3 flex items-center">
            <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
            Опыт работы
          </h3>
          {profile.experience.map((exp, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-gray-900">{exp.position}</h4>
                  <p className="text-purple-600 font-medium">{exp.company} • {exp.location}</p>
                </div>
                <div className="text-gray-500 bg-purple-100 px-2 py-1 rounded text-xs">
                  {exp.startDate} - {exp.current ? 'сейчас' : exp.endDate}
                </div>
              </div>
              {exp.description && exp.description.length > 0 && (
                <div className="space-y-1">
                  {exp.description.map((desc, idx) => (
                    <div key={idx} className="flex items-start">
                      <span className="w-1 h-1 bg-pink-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      <span className="text-gray-700">{desc}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Skills */}
    {profile.skills && profile.skills.length > 0 && (
      <div className="mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-bold text-purple-700 mb-3 flex items-center">
            <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
            Навыки
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full text-xs font-medium border border-purple-200"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    )}

    {/* Education */}
    {profile.education && profile.education.length > 0 && (
      <div className="mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-bold text-purple-700 mb-3 flex items-center">
            <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
            Образование
          </h3>
          {profile.education.map((edu, index) => (
            <div key={index} className="mb-3 last:mb-0">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-gray-900">{edu.degree}</h4>
                  <p className="text-purple-600">{edu.field}</p>
                  <p className="text-gray-700">{edu.institution}</p>
                </div>
                <div className="text-gray-500 bg-purple-100 px-2 py-1 rounded text-xs">
                  {edu.startYear} - {edu.endYear}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

const ExecutiveTemplate: React.FC<{ profile: UserProfile }> = ({ profile }) => (
  <div className="bg-white p-8 min-h-[11in] w-[8.5in] mx-auto shadow-lg font-sans text-sm">
    {/* Header */}
    <div className="bg-gray-900 text-white p-6 -m-8 mb-6">
      <div className="max-w-full mx-auto">
        <h1 className="text-3xl font-light mb-2 tracking-wide">{profile.fullName}</h1>
        <h2 className="text-xl text-gray-300 mb-4 font-light">{profile.position}</h2>
        <div className="flex flex-wrap gap-6 text-gray-300">
          {profile.email && <span>{profile.email}</span>}
          {profile.phone && <span>{profile.phone}</span>}
          {profile.location && <span>{profile.location}</span>}
        </div>
      </div>
    </div>

    {/* Summary */}
    {profile.summary && (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-widest text-center">
          Executive Summary
        </h3>
        <div className="w-12 h-0.5 bg-gray-400 mx-auto mb-4"></div>
        <p className="text-gray-700 leading-relaxed text-center italic">{profile.summary}</p>
      </div>
    )}

    {/* Experience */}
    {profile.experience && profile.experience.length > 0 && (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-widest text-center">
          Professional Experience
        </h3>
        <div className="w-12 h-0.5 bg-gray-400 mx-auto mb-6"></div>
        {profile.experience.map((exp, index) => (
          <div key={index} className="mb-6 last:mb-0">
            <div className="border-l-2 border-gray-300 pl-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-gray-900 text-base">{exp.position}</h4>
                  <p className="text-gray-700 font-medium">{exp.company}</p>
                  <p className="text-gray-600">{exp.location}</p>
                </div>
                <div className="text-gray-600 text-right">
                  <p className="font-medium">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                </div>
              </div>
              {exp.description && exp.description.length > 0 && (
                <ul className="list-none text-gray-700 space-y-1 mt-3">
                  {exp.description.map((desc, idx) => (
                    <li key={idx} className="before:content-['▪'] before:text-gray-400 before:font-bold before:mr-2">
                      {desc}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    )}

    {/* Education & Skills Row */}
    <div className="grid grid-cols-2 gap-8">
      {/* Education */}
      {profile.education && profile.education.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-widest">
            Education
          </h3>
          <div className="w-8 h-0.5 bg-gray-400 mb-4"></div>
          {profile.education.map((edu, index) => (
            <div key={index} className="mb-3 last:mb-0">
              <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
              <p className="text-gray-700">{edu.field}</p>
              <p className="text-gray-600">{edu.institution}</p>
              <p className="text-gray-500 text-xs">{edu.startYear} - {edu.endYear}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {profile.skills && profile.skills.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-widest">
            Core Competencies
          </h3>
          <div className="w-8 h-0.5 bg-gray-400 mb-4"></div>
          <div className="space-y-2">
            {profile.skills.map((skill, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-700">{skill.name}</span>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((dot) => (
                    <div
                      key={dot}
                      className={`w-2 h-2 rounded-full ${
                        (skill.level === 'Эксперт' && dot <= 5) ||
                        (skill.level === 'Продвинутый' && dot <= 4) ||
                        (skill.level === 'Средний' && dot <= 3) ||
                        (skill.level === 'Начинающий' && dot <= 2)
                          ? 'bg-gray-800'
                          : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

export const ResumeTemplate: React.FC<ResumeTemplateProps> = ({ profile, templateId }) => {
  switch (templateId) {
    case 'modern':
      return <ModernTemplate profile={profile} />;
    case 'classic':
      return <ClassicTemplate profile={profile} />;
    case 'creative':
      return <CreativeTemplate profile={profile} />;
    case 'executive':
      return <ExecutiveTemplate profile={profile} />;
    default:
      return <ModernTemplate profile={profile} />;
  }
};