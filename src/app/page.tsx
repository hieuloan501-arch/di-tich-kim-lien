"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Home() {
  // Trạng thái quản lý đóng/mở Modal Form
  const [showModal, setShowModal] = useState(false);
  const [fileName, setFileName] = useState("");

  // Dữ liệu menu chính - Được viết lại để hấp dẫn hơn
  const menuItems = [
    { 
      title: "Tiểu sử Bác Hồ", 
      desc: "Tìm hiểu về Gia đình, Sự nghiệp cách mạng và Văn thơ của Người.", 
      icon: "📜", 
      slug: "tieu-su" 
    },
    { 
      title: "Quê nội Làng Sen", 
      desc: "Khám phá những nếp nhà tranh, di tích lịch sử tại quê nội Bác.", 
      icon: "🏡", 
      slug: "que-noi" 
    },
    { 
      title: "Quê ngoại Hoàng Trù", 
      desc: "Nơi Bác cất tiếng khóc chào đời và sống những năm tháng đầu đời.", 
      icon: "🌸", 
      slug: "que-ngoai" 
    },
    { 
      title: "Ký ức Cộng đồng", 
      desc: "Kho tư liệu quý giá do nhân dân mọi miền gửi về bảo tàng.", 
      icon: "🏺", 
      slug: "cong-dong" 
    },
  ];

  return (
    <div className="min-h-screen relative font-sans text-stone-900">
      
      {/* 1. LỚP NỀN ẢNH (Dùng lớp phủ tối hơn để nổi bật chữ) */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-black/40 z-10" /> 
        <img 
          src="/lang-sen.jpg" 
          className="w-full h-full object-cover" 
          alt="Nền quê Bác"
        />
      </div>

      {/* 2. HEADER (GIỮ MÀU XANH CHUẨN) */}
      <nav className="flex justify-between items-center p-6 bg-white shadow-md border-b border-green-100 sticky top-0 z-40">
        <div className="text-2xl font-bold text-green-700 flex items-center gap-2">
          🏛️ Kim Liên Museum
        </div>
        
        <div className="hidden md:flex space-x-8 font-semibold text-stone-600">
          <Link href="/" className="text-green-700 border-b-2 border-green-700">Trang chủ</Link>
          <Link href="/gallery" className="hover:text-green-700 transition">Tư liệu số</Link>
          <Link href="/map" className="hover:text-green-700 transition">Bản đồ di tích</Link>
        </div>

        {/* Nút này sẽ mở Modal */}
        <button 
          onClick={() => setShowModal(true)}
          className="bg-green-700 text-white px-6 py-2 rounded-full font-bold hover:bg-orange-600 transition shadow-lg active:scale-95"
        >
          Đóng góp ngay
        </button>
      </nav>

      {/* 3. NỘI DUNG CHÍNH (Tiêu đề to giữa trang) */}
      <main className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="mb-20">
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
            Di sản số <span className="text-green-400 italic">Kim Liên</span>
          </h1>
          <p className="text-xl md:text-2xl text-stone-100 max-w-3xl mx-auto leading-relaxed drop-shadow-md font-medium">
            Hành trình số hóa cuộc đời Chủ tịch Hồ Chí Minh <br/> 
            và những ký ức trường tồn tại mảnh đất Nam Đàn.
          </p>
        </div>

        {/* 4. CÁC MỤC KHÁM PHÁ (Grid 4 cột) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {menuItems.map((item, index) => (
            <Link key={index} href={`/gallery?tab=${item.slug}`}>
              <div className="bg-white/90 backdrop-blur-md p-8 rounded-[40px] shadow-2xl border border-white hover:border-green-500 hover:-translate-y-2 transition-all duration-300 group h-full flex flex-col items-center">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="text-2xl font-bold text-green-900 mb-3">{item.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed mb-6">{item.desc}</p>
                <div className="mt-auto text-green-700 font-black text-sm uppercase tracking-tighter group-hover:tracking-widest transition-all">
                  Khám phá tư liệu →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* 5. MODAL FORM ĐÓNG GÓP (Mẫu đơn hiện ra khi bấm nút) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            {/* Header của Form */}
            <div className="p-6 bg-green-800 text-white flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold">Mẫu Đóng Góp Tư Liệu</h3>
                <p className="text-green-200 text-xs">Hãy cùng chúng tôi gìn giữ di sản dân tộc</p>
              </div>
              <button 
                onClick={() => setShowModal(false)} 
                className="text-2xl bg-white/10 hover:bg-white/20 w-12 h-12 rounded-full transition-all"
              >
                ✕
              </button>
            </div>
            
            <form className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase mb-2">Họ tên người gửi</label>
                  <input required type="text" className="w-full p-4 rounded-2xl bg-stone-100 border-none focus:ring-2 focus:ring-green-500 outline-none" placeholder="Nguyễn Văn A" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase mb-2">Số điện thoại</label>
                  <input type="tel" className="w-full p-4 rounded-2xl bg-stone-100 border-none focus:ring-2 focus:ring-green-500 outline-none" placeholder="09xxx..." />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase mb-2">Lời kể / Mô tả tư liệu</label>
                <textarea required rows={4} className="w-full p-4 rounded-2xl bg-stone-100 border-none focus:ring-2 focus:ring-green-500 outline-none" placeholder="Chia sẻ kỷ niệm hoặc thông tin về bức ảnh/hiện vật bạn gửi..."></textarea>
              </div>
 
              <div className="relative border-2 border-dashed border-stone-200 rounded-3xl p-10 text-center hover:bg-green-50 transition-colors group">
                <input 
                  type="file" 
                  id="modal-upload" 
                  className="hidden" 
                  onChange={(e) => setFileName(e.target.files?.[0].name || "")} 
                />
                <label htmlFor="modal-upload" className="cursor-pointer">
                  <span className="text-4xl block mb-2 group-hover:scale-110 transition-transform">📸</span>
                  <p className="text-stone-500 font-medium">
                    {fileName || "Nhấn để chọn ảnh hoặc video từ máy tính"}
                  </p>
                  <p className="text-xs text-stone-400 mt-2">Định dạng hỗ trợ: JPG, PNG, MP4</p>
                </label>
              </div>

              <button type="submit" className="w-full bg-green-700 text-white py-5 rounded-2xl font-black text-xl hover:bg-orange-600 shadow-xl transition-all transform active:scale-95 uppercase tracking-widest">
                Xác nhận gửi đóng góp
              </button>
            </form>
          </div>
        </div>
      )}

      <footer className="bg-stone-900 py-12 text-center text-stone-500">
        <div className="max-w-7xl mx-auto px-6">
          <p className="font-bold text-white mb-2">Bảo tàng số cộng đồng Kim Liên - Nam Đàn</p>
          <p className="text-sm">Hệ thống lưu giữ và chia sẻ tư liệu văn hóa phi vật thể về Chủ tịch Hồ Chí Minh</p>
          <div className="mt-6 border-t border-stone-800 pt-6 text-xs italic">
            © 2026 Trang web thuộc dự án số hóa di tích địa phương
          </div>
        </div>
      </footer>
    </div>
  );
}
