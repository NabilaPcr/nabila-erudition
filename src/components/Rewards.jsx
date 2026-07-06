import React, { useState } from 'react';
import { Gift, Star, Trophy, Clock, CheckCircle, TrendingUp } from 'lucide-react';

export default function Rewards() {
  const [userPoints] = useState(2500);
  const [userTier] = useState('Silver');
  const [showClaimModal, setShowClaimModal] = useState(null);
  const [claimedRewards, setClaimedRewards] = useState([]);

  const tiers = [
    { name: 'Bronze', minPoints: 0, multiplier: 1, color: 'bg-amber-600', icon: '🥉' },
    { name: 'Silver', minPoints: 1000, multiplier: 2, color: 'bg-gray-400', icon: '🥈' },
    { name: 'Gold', minPoints: 5000, multiplier: 3, color: 'bg-yellow-500', icon: '🥇' },
    { name: 'Platinum', minPoints: 10000, multiplier: 5, color: 'bg-purple-500', icon: '💎' },
  ];

  const currentTier = tiers.find(t => t.name === userTier) || tiers[0];
  const nextTier = tiers.find(t => t.minPoints > userPoints) || null;
  const progressToNext = nextTier 
    ? ((userPoints - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100 
    : 100;

  const rewards = [
    { id: 1, name: 'Diskon 10%', points: 500, type: 'discount', value: 10, icon: '🎫' },
    { id: 2, name: 'Gratis Ongkir', points: 750, type: 'shipping', value: 0, icon: '🚚' },
    { id: 3, name: 'Vitamin C Gratis', points: 1000, type: 'product', value: 45000, icon: '💊' },
    { id: 4, name: 'Diskon 20%', points: 2000, type: 'discount', value: 20, icon: '🎫' },
    { id: 5, name: 'Konsultasi Dokter Gratis', points: 3000, type: 'service', value: 100000, icon: '👨‍⚕️' },
    { id: 6, name: 'Diskon 30%', points: 5000, type: 'discount', value: 30, icon: '🎫' },
  ];

  const pointsHistory = [
    { id: 1, type: 'earn', points: 100, description: 'Pembelian obat', date: '2026-07-01' },
    { id: 2, type: 'earn', points: 200, description: 'Pembelian suplemen', date: '2026-06-28' },
    { id: 3, type: 'redeem', points: -500, description: 'Klaim Diskon 10%', date: '2026-06-25' },
    { id: 4, type: 'earn', points: 150, description: 'Pembelian alat kesehatan', date: '2026-06-20' },
    { id: 5, type: 'bonus', points: 500, description: 'Bonus pendaftaran', date: '2026-06-15' },
  ];

  const handleClaimReward = (reward) => {
    if (userPoints >= reward.points && !claimedRewards.includes(reward.id)) {
      setClaimedRewards([...claimedRewards, reward.id]);
      setShowClaimModal(null);
      alert(`Selamat! Anda berhasil klaim ${reward.name}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Program Loyalty</h1>
          <p className="text-gray-500">Kumpulkan poin dan klaim reward menarik!</p>
        </div>

        {/* Points & Tier Card */}
        <div className="bg-gradient-to-r from-apotek-hijau to-emerald-600 rounded-2xl p-8 text-white mb-8 shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-green-100 text-sm mb-1">Poin Anda</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-extrabold">{userPoints.toLocaleString()}</span>
                <span className="text-green-100">poin</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className={`w-20 h-20 ${currentTier.color} rounded-full flex items-center justify-center text-4xl mb-2 shadow-lg`}>
                  {currentTier.icon}
                </div>
                <p className="font-bold text-lg">{currentTier.name} Member</p>
                <p className="text-green-100 text-sm">{currentTier.multiplier}x poin transaksi</p>
              </div>
            </div>

            <div className="text-center md:text-right">
              <p className="text-green-100 text-sm mb-1">Tier Berikutnya</p>
              <p className="font-bold text-xl">
                {nextTier ? `${nextTier.name} (${nextTier.minPoints.toLocaleString()} poin)` : 'Tier Tertinggi!'}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          {nextTier && (
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-green-100">Progress ke {nextTier.name}</span>
                <span className="font-bold">{progressToNext.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div 
                  className="bg-white rounded-full h-3 transition-all duration-500"
                  style={{ width: `${progressToNext}%` }}
                />
              </div>
              <p className="text-green-100 text-sm mt-2">
                Butuh {(nextTier.minPoints - userPoints).toLocaleString()} poin lagi
              </p>
            </div>
          )}
        </div>

        {/* Available Rewards */}
        <div className="mb-8">
          <h2 className="text-2xl font-extrabold text-gray-800 mb-4 flex items-center gap-2">
            <Gift className="text-apotek-hijau" />
            Reward Tersedia
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rewards.map((reward) => {
              const canClaim = userPoints >= reward.points && !claimedRewards.includes(reward.id);
              const isClaimed = claimedRewards.includes(reward.id);
              
              return (
                <div
                  key={reward.id}
                  className={`bg-white rounded-xl p-6 border-2 transition-all ${
                    isClaimed 
                      ? 'border-green-500 bg-green-50' 
                      : canClaim 
                        ? 'border-apotek-hijau hover:shadow-md cursor-pointer' 
                        : 'border-gray-200 opacity-60'
                  }`}
                  onClick={() => canClaim && setShowClaimModal(reward)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">{reward.icon}</span>
                    {isClaimed ? (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <CheckCircle size={12} /> Diklaim
                      </span>
                    ) : (
                      <span className="bg-apotek-hijau text-white text-xs px-2 py-1 rounded-full">
                        {reward.points} poin
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">{reward.name}</h3>
                  <p className="text-gray-500 text-sm">
                    {!canClaim && !isClaimed && `Butuh ${reward.points - userPoints} poin lagi`}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Points History */}
        <div className="mb-8">
          <h2 className="text-2xl font-extrabold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="text-apotek-hijau" />
            Riwayat Poin
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {pointsHistory.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    item.type === 'earn' ? 'bg-green-100' : 
                    item.type === 'bonus' ? 'bg-yellow-100' : 'bg-red-100'
                  }`}>
                    {item.type === 'earn' ? (
                      <TrendingUp size={20} className="text-green-600" />
                    ) : item.type === 'bonus' ? (
                      <Star size={20} className="text-yellow-600" />
                    ) : (
                      <Gift size={20} className="text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{item.description}</p>
                    <p className="text-gray-400 text-sm flex items-center gap-1">
                      <Clock size={12} /> {item.date}
                    </p>
                  </div>
                </div>
                <span className={`font-bold ${
                  item.points > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {item.points > 0 ? '+' : ''}{item.points}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tier Benefits */}
        <div>
          <h2 className="text-2xl font-extrabold text-gray-800 mb-4 flex items-center gap-2">
            <Trophy className="text-apotek-hijau" />
            Benefit Tier
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`bg-white rounded-xl p-6 border-2 text-center ${
                  tier.name === userTier 
                    ? 'border-apotek-hijau shadow-md' 
                    : 'border-gray-200'
                }`}
              >
                <div className="text-4xl mb-2">{tier.icon}</div>
                <h3 className={`font-bold text-lg mb-2 ${tier.name === userTier ? 'text-apotek-hijau' : 'text-gray-800'}`}>
                  {tier.name}
                </h3>
                <p className="text-gray-500 text-sm mb-3">{tier.minPoints.toLocaleString()} poin</p>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                  tier.name === userTier ? 'bg-apotek-hijau text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  {tier.multiplier}x Poin
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Claim Modal */}
      {showClaimModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{showClaimModal.icon}</div>
              <h3 className="text-2xl font-extrabold text-gray-800 mb-2">Klaim Reward?</h3>
              <p className="text-gray-500">
                Anda akan menukar {showClaimModal.points} poin untuk <strong>{showClaimModal.name}</strong>
              </p>
              <p className="text-apotek-hijau font-bold mt-2">
                Sisa poin: {(userPoints - showClaimModal.points).toLocaleString()}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowClaimModal(null)}
                className="flex-1 py-3 border-2 border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => handleClaimReward(showClaimModal)}
                className="flex-1 py-3 bg-apotek-hijau text-white rounded-xl font-bold hover:bg-apotek-hijau-dark transition-colors"
              >
                Ya, Klaim!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
