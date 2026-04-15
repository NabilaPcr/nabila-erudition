import React from 'react';

export default function AdminTable({ members }) {
  return (
    <div className="bg-white rounded-2rem shadow-sm border border-[#f8ecec] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-[#fbe4d8]/50 text-[#a6808c]">
            <tr>
              <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest">ID</th>
              <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest">Member</th>
              <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest">Unit</th>
              <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest">Social Media</th>
              <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest">Power</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#fdf2f2]">
            {members.map(member => (
              <tr key={member.id} className="hover:bg-[#fdf2f2]/30 transition">
                <td className="px-6 py-4 text-xs text-[#ccb7ae]">#{member.id}</td>
                <td className="px-6 py-4 flex items-center gap-3">
                  <img src={member.image} className="w-8 h-8 rounded-full bg-gray-100" />
                  <span className="font-semibold text-[#8b7e74]">{member.name}</span>
                </td>
                <td className="px-6 py-4 text-sm text-[#9a8c98]">{member.sub_unit}</td>
                <td className="px-6 py-4 text-sm text-blue-400">{member.social_media.instagram}</td>
                <td className="px-6 py-4">
                  <div className="w-20 bg-gray-100 h-1.5 rounded-full">
                    <div className="bg-[#eecfbb] h-full rounded-full" style={{width: `${member.stats.dance}%`}}></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}