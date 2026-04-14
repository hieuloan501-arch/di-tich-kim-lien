"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Memory {
  id: number;
  name: string;
  location: string;
  content: string;
  date: string;
}

export default function KyUcCongDong() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('Làng Sen');
  const [content, setContent] = useState('');

  // 1. Tải dữ liệu từ localStorage khi mở trang
  useEffect(() => {
    const saved = localStorage.getItem('community_memories');
    if (saved) {
      setMemories(JSON.parse(saved));
    }
  }, []);

  // 2. Hàm gửi đóng góp
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !content) return alert("Vui lòng nhập đầy đủ thông tin!");

    const newMemory: Memory = {
      id: Date.now(),
      name,
      location,
      content,
      date: new Date().toLocaleDateString('vi-VN')
    };

    const updatedMemories = [newMemory, ...memories];
    setMemories(updatedMemories);
    
    // Lưu vào localStorage để F5 không mất
    localStorage.setItem('community_memories', JSON.stringify(updatedMemories));

    // Reset form
    setName('');
    setContent('');
    alert("Cảm ơn bạn đã đóng góp ký ức!");
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header */}
      <nav className="bg-slate-900 text-white p-4 shadow-lg sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/map" className="text-yellow-500 font-bold">← Quay lại Bản đồ</Link>
          <h1 className="font-black uppercase tracking-widest text-sm">Ký ức Cộng đồng</h1>
          <div className="w-20"></div> 
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* PHẦN 1: FORM GỬI ĐÓNG GÓP */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200 sticky top-24">
            <h2 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2 text-center">Gửi Ký ức</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tên của bạn</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
                  placeholder="Nguyễn Văn A..."
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Địa điểm nhắc đến</label>
                <select 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-3 bg-slate-50 border rounded-xl outline-none"
                >
                  <option>Làng Sen</option>
                  <option>Hoàng Trù</option>
                  <option>Mộ Bà Hoàng Thị Loan</option>
                  <option>Khác</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Câu chuyện/Cảm xúc</label>
                <textarea 
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
                  placeholder="Chia sẻ kỷ niệm của bạn về nơi này..."
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-black py-3 rounded-xl shadow-lg shadow-yellow-500/30 transition-all active:scale-95"
              >
                GỬI KÝ ỨC
              </button>
            </form>
          </div>
        </div>

        {/* PHẦN 2: DANH SÁCH KÝ ỨC */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
            <span className="bg-yellow-500 w-2 h-8 rounded-full"></span>
            Dòng thời gian Ký ức
          </h2>

          {memories.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
              <p className="text-slate-400 font-medium">Chưa có ký ức nào. Hãy là người đầu tiên chia sẻ!</p>
            </div>
          ) : (
            memories.map((m) => (
              <div key={m.id} className="bg-white p-6 rounded-3xl shadow-md border-l-8 border-yellow-500 hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-black text-slate-800 text-lg uppercase">{m.name}</h3>
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded-full uppercase">
                      📍 {m.location}
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-slate-400">{m.date}</span>
                </div>
                <p className="text-slate-600 leading-relaxed italic">"{m.content}"</p>
                <div className="mt-4 pt-4 border-t border-slate-50 flex gap-4">
                   <button className="text-xs font-bold text-blue-500 hover:underline">❤️ Yêu thích</button>
                   <button className="text-xs font-bold text-slate-400 hover:underline">💬 Phản hồi</button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
// Trong phần Form của file page.tsx (trang ký ức)
<div>
  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Ảnh kỷ niệm (không bắt buộc)</label>
  <input 
    type="file" 
    accept="image/*"
    className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
  />
</div>