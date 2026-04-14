import React, { useState, useMemo } from 'react';
import AdminTable from './adminTable';

const nctData = [
  { id: 1, name: "Taeyong", sub_unit: "NCT 127", position: "Leader", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taeyong", profile: { birth_date: "1995-07-01", blood_type: "O", mbti: "ENTP" }, social_media: { instagram: "@taeoxo_nct", tiktok: "@taeyong_lee" }, stats: { dance: 99, rap: 99, visual: 100 } },
  { id: 2, name: "Mark", sub_unit: "NCT 127", position: "Main Rapper", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mark", profile: { birth_date: "1999-08-02", blood_type: "A", mbti: "INFJ" }, social_media: { instagram: "@onyourm__ark", tiktok: "@marklee" }, stats: { dance: 95, rap: 100, visual: 90 } },
  { id: 3, name: "Jaehyun", sub_unit: "NCT 127", position: "Main Vocal", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jaehyun", profile: { birth_date: "1997-02-14", blood_type: "A", mbti: "ESTP" }, social_media: { instagram: "@_jeongjaehyun", tiktok: "@jaehyun_nct" }, stats: { dance: 85, rap: 70, visual: 100 } },
  { id: 4, name: "Doyoung", sub_unit: "NCT 127", position: "Main Vocal", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Doyoung", profile: { birth_date: "1996-02-01", blood_type: "B", mbti: "ISFJ" }, social_media: { instagram: "@do0_nct", tiktok: "n/a" }, stats: { dance: 80, rap: 50, visual: 92 } },
  { id: 5, name: "Ten", sub_unit: "WayV", position: "Main Dancer", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ten", profile: { birth_date: "1996-02-27", blood_type: "A", mbti: "INFJ" }, social_media: { instagram: "@tenlee_1001", tiktok: "@tenlee" }, stats: { dance: 100, rap: 85, visual: 95 } },
  { id: 6, name: "Jaemin", sub_unit: "NCT Dream", position: "Lead Rapper", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jaemin", profile: { birth_date: "2000-08-13", blood_type: "AB", mbti: "ISFJ" }, social_media: { instagram: "@na.jaemin0813", tiktok: "n/a" }, stats: { dance: 88, rap: 85, visual: 98 } },
  { id: 7, name: "Haechan", sub_unit: "NCT 127", position: "Main Vocal", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Haechan", profile: { birth_date: "2000-06-06", blood_type: "AB", mbti: "ENFP" }, social_media: { instagram: "@haechanahceah", tiktok: "n/a" }, stats: { dance: 90, rap: 70, visual: 88 } },
  { id: 8, name: "Jeno", sub_unit: "NCT Dream", position: "Lead Dancer", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jeno", profile: { birth_date: "2000-04-23", blood_type: "A", mbti: "ISFP" }, social_media: { instagram: "@leejen_o_423", tiktok: "n/a" }, stats: { dance: 94, rap: 88, visual: 96 } },
  { id: 9, name: "Winwin", sub_unit: "WayV", position: "Lead Dancer", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Winwin", profile: { birth_date: "1997-10-28", blood_type: "B", mbti: "INFJ" }, social_media: { instagram: "@wwiinn_7", tiktok: "n/a" }, stats: { dance: 92, rap: 60, visual: 97 } },
  { id: 10, name: "Jisung", sub_unit: "NCT Dream", position: "Main Dancer", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jisung", profile: { birth_date: "2002-02-05", blood_type: "O", mbti: "INFP" }, social_media: { instagram: "@the_and_jisung", tiktok: "n/a" }, stats: { dance: 97, rap: 80, visual: 85 } },
  { id: 11, name: "Renjun", sub_unit: "NCT Dream", position: "Main Vocal", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Renjun", profile: { birth_date: "2000-03-23", blood_type: "O", mbti: "INTP" }, social_media: { instagram: "@yellow_3to3", tiktok: "n/a" }, stats: { dance: 85, rap: 60, visual: 90 } },
  { id: 12, name: "Kun", sub_unit: "WayV", position: "Leader", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kun", profile: { birth_date: "1996-01-01", blood_type: "B", mbti: "ESFJ" }, social_media: { instagram: "@kun11xd", tiktok: "n/a" }, stats: { dance: 80, rap: 65, visual: 88 } },
  { id: 13, name: "Yuta", sub_unit: "NCT 127", position: "Lead Dancer", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yuta", profile: { birth_date: "1995-10-26", blood_type: "A", mbti: "OSI" }, social_media: { instagram: "@yuu_taa_1026", tiktok: "n/a" }, stats: { dance: 93, rap: 75, visual: 94 } },
  { id: 14, name: "Hendery", sub_unit: "WayV", position: "Lead Rapper", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hendery", profile: { birth_date: "1999-09-28", blood_type: "O", mbti: "ENTP" }, social_media: { instagram: "@i_m_hendery", tiktok: "n/a" }, stats: { dance: 85, rap: 88, visual: 92 } },
  { id: 15, name: "Xiaojun", sub_unit: "WayV", position: "Main Vocal", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Xiaojun", profile: { birth_date: "1999-08-08", blood_type: "A", mbti: "ENFP" }, social_media: { instagram: "@djxiao_888", tiktok: "n/a" }, stats: { dance: 82, rap: 65, visual: 90 } },
  { id: 16, name: "Yangyang", sub_unit: "WayV", position: "Main Rapper", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yangyang", profile: { birth_date: "2000-10-10", blood_type: "O", mbti: "INTJ" }, social_media: { instagram: "@yangyang_x2", tiktok: "n/a" }, stats: { dance: 88, rap: 95, visual: 87 } },
  { id: 17, name: "Chenle", sub_unit: "NCT Dream", position: "Main Vocal", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chenle", profile: { birth_date: "2001-11-22", blood_type: "A", mbti: "ENFP" }, social_media: { instagram: "@kh1000le", tiktok: "n/a" }, stats: { dance: 80, rap: 60, visual: 85 } },
  { id: 18, name: "Jungwoo", sub_unit: "NCT 127", position: "Lead Vocal", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jungwoo", profile: { birth_date: "1998-02-19", blood_type: "AB", mbti: "INFJ" }, social_media: { instagram: "@sugaringcandy", tiktok: "n/a" }, stats: { dance: 88, rap: 50, visual: 96 } },
  { id: 19, name: "Johnny", sub_unit: "NCT 127", position: "Lead Rapper", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Johnny", profile: { birth_date: "1995-02-09", blood_type: "B", mbti: "ENTP" }, social_media: { instagram: "@johnnyjsuh", tiktok: "@johnnyjsuh" }, stats: { dance: 86, rap: 82, visual: 93 } },
  { id: 20, name: "Sungchan", sub_unit: "NCT Wish", position: "Rapper", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sungchan", profile: { birth_date: "2001-09-13", blood_type: "A", mbti: "ESTP" }, social_media: { instagram: "n/a", tiktok: "n/a" }, stats: { dance: 85, rap: 90, visual: 96 } },
];

export default function NctManager() {
  const [view, setView] = useState('guest');
  const [search, setSearch] = useState('');
  const [unitFilter, setUnitFilter] = useState('All');
  const [mbtiFilter, setMbtiFilter] = useState('All');

  const filteredData = useMemo(() => {
    return nctData.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const matchesUnit = unitFilter === 'All' || item.sub_unit === unitFilter;
      const matchesMbti = mbtiFilter === 'All' || item.profile.mbti.startsWith(mbtiFilter);
      return matchesSearch && matchesUnit && matchesMbti;
    });
  }, [search, unitFilter, mbtiFilter]);

  return (
    <div className="min-h-screen bg-[#fdf2f2] p-4 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        <NctHeader view={view} setView={setView} total={nctData.length} />
        
        <NctFilters 
          search={search} setSearch={setSearch} 
          unitFilter={unitFilter} setUnitFilter={setUnitFilter} 
          mbtiFilter={mbtiFilter} setMbtiFilter={setMbtiFilter} 
        />

        {view === 'guest' ? (
          <NctGuestView members={filteredData} />
        ) : (
          <AdminTable members={filteredData} />
        )}
      </div>
    </div>
  );
}

// SUB-FUNCTION 1: HEADER
function NctHeader({ view, setView, total }) {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-light text-[#a6808c] tracking-widest uppercase">
          NCT <span className="italic text-[#ccb7ae]">Universe</span>
        </h1>
        <p className="text-xs text-[#9a8c98] mt-1">Total {total} members found</p>
      </div>
      <div className="flex bg-white rounded-xl p-1 shadow-sm border border-[#f8ecec]">
        <button 
          onClick={() => setView('guest')}
          className={`px-6 py-2 rounded-lg transition ${view === 'guest' ? 'bg-[#a6808c] text-white shadow' : 'text-[#a6808c]'}`}
        >Guest View</button>
        <button 
          onClick={() => setView('admin')}
          className={`px-6 py-2 rounded-lg transition ${view === 'admin' ? 'bg-[#a6808c] text-white shadow' : 'text-[#a6808c]'}`}
        >Admin View</button>
      </div>
    </header>
  );
}

function NctFilters({ search, setSearch, unitFilter, setUnitFilter, mbtiFilter, setMbtiFilter }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
      <input 
        type="text" placeholder="Search name..." 
        className="p-4 rounded-2xl bg-white/50 border border-[#f8ecec] outline-none focus:ring-2 focus:ring-[#eecfbb]"
        value={search} onChange={(e) => setSearch(e.target.value)}
      />
      <select className="p-4 rounded-2xl bg-white/50 border border-[#f8ecec]" value={unitFilter} onChange={(e) => setUnitFilter(e.target.value)}>
        <option value="All">All Units</option>
        <option value="NCT 127">NCT 127</option>
        <option value="NCT Dream">NCT Dream</option>
        <option value="WayV">WayV</option>
      </select>
      <select className="p-4 rounded-2xl bg-white/50 border border-[#f8ecec]" value={mbtiFilter} onChange={(e) => setMbtiFilter(e.target.value)}>
        <option value="All">All MBTI</option>
        <option value="I">Introverts (I...)</option>
        <option value="E">Extroverts (E...)</option>
      </select>
    </div>
  );
}

function NctGuestView({ members }) {
  if (members.length === 0) return <p className="text-center py-20 text-[#ccb7ae]">No data found...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {members.map(member => (
        <div key={member.id} className="bg-white/80 backdrop-blur-sm p-6 rounded-[2.5rem] shadow-sm border border-white hover:-translate-y-2 transition duration-500 group">
          <img src={member.image} className="w-24 h-24 mx-auto rounded-full mb-4 bg-[#fbe4d8] border-4 border-white shadow-sm" />
          <h3 className="text-center font-bold text-[#8b7e74] text-lg">{member.name}</h3>
          <p className="text-center text-[#ccb7ae] text-xs uppercase tracking-tighter mb-4">{member.sub_unit}</p>
          <div className="pt-4 border-t border-[#fdf2f2] text-[10px] text-[#9a8c98] space-y-1">
            <div className="flex justify-between"><span>MBTI</span><span>{member.profile.mbti}</span></div>
            <div className="flex justify-between text-blue-400"><span>IG</span><span>{member.social_media.instagram}</span></div>
          </div>
        </div>
      ))}
    </div>
  );
}