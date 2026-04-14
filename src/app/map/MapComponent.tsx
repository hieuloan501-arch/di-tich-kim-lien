"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Sửa lỗi Icon mặc định của Leaflet khi build Next.js
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  });
}

const sites = [
  { id: 1, nameVi: "Làng Sen (Quê Nội)", nameEn: "Sen Village", pos: [18.675, 105.567] as [number, number], img: "https://vnanet.vn/Data/Articles/2021/05/19/5571407/04163459.jpg", descVi: "Ngôi nhà tranh đơn sơ nơi Bác sống thời niên thiếu.", descEn: "The childhood home of President Ho Chi Minh.", audioVi: "Chào mừng bạn đến với Làng Sen quê nội.", audioEn: "Welcome to Sen Village, the paternal home of Uncle Ho." },
  { id: 2, nameVi: "Hoàng Trù (Quê Ngoại)", nameEn: "Hoang Tru Village", pos: [18.685, 105.575] as [number, number], img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Que_ngoai_Bac_Ho.jpg/1024px-Que_ngoai_Bac_Ho.jpg", descVi: "Nơi Bác Hồ cất tiếng khóc chào đời năm 1890.", descEn: "The birthplace of President Ho Chi Minh.", audioVi: "Bạn đang ở Hoàng Trù quê ngoại.", audioEn: "You are at Hoang Tru, the maternal birthplace of Uncle Ho." },
  { id: 3, nameVi: "Mộ Bà Hoàng Thị Loan", nameEn: "Madam Hoang Thi Loan's Tomb", pos: [18.650, 105.580] as [number, number], img: "https://disannghean.vn/wp-content/uploads/2021/05/mo-ba-hoang-thi-loan.jpg", descVi: "Nằm trên núi Động Tranh linh thiêng.", descEn: "Located on the sacred Dong Tranh mountain.", audioVi: "Đây là khu mộ bà Hoàng Thị Loan, thân mẫu của Bác Hồ.", audioEn: "This is the tomb of Madam Hoang Thi Loan, Uncle Ho's mother." }
];

const RoutingMachine = () => {
  const map = useMap();
  const routingControlRef = useRef<any>(null); // Sử dụng useRef để quản lý routing

  useEffect(() => {
    if (!map || typeof window === "undefined") return;

    try {
      const L_any = L as any;
      require('leaflet-routing-machine');

      // Khởi tạo và lưu vào ref
      routingControlRef.current = L_any.Routing.control({
        waypoints: [
          L.latLng(sites[1].pos), // Hoàng Trù
          L.latLng(sites[0].pos), // Làng Sen
          L.latLng(sites[2].pos)  // Mộ bà Loan
        ],
        lineOptions: {
          styles: [{ color: '#facc15', weight: 6, opacity: 0.9 }]
        },
        addWaypoints: false,
        draggableWaypoints: false,
        show: false, 
        createMarker: () => null
      }).addTo(map);
    } catch (e) {
      console.error("Lỗi khởi tạo lộ trình:", e);
    }

    // Dọn dẹp an toàn khi rời trang
    return () => {
      if (map && routingControlRef.current) {
        try { 
          map.removeControl(routingControlRef.current); 
          routingControlRef.current = null;
        } catch (e) { 
          console.log("Dọn dẹp bản đồ an toàn"); 
        }
      }
    };
  }, [map]);

  return null;
};

export default function MapComponent() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speak = (text: string, lang: 'vi' | 'en') => {
    if (typeof window !== "undefined") {
      window.speechSynthesis.cancel();
      const msg = new SpeechSynthesisUtterance(text);
      const voice = voices.find(v => v.lang.startsWith(lang));
      if (voice) msg.voice = voice;
      msg.lang = lang === 'vi' ? 'vi-VN' : 'en-US';
      msg.rate = 0.9;
      msg.onstart = () => setIsSpeaking(true);
      msg.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(msg);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-slate-950">
      <nav className="h-16 px-6 bg-slate-900 text-white flex justify-between items-center z-[1001] border-b border-white/10 shadow-xl">
        <Link href="/" className="font-bold text-yellow-500 hover:text-yellow-400">← QUAY VỀ</Link>
        <h2 className="font-black uppercase tracking-widest text-sm text-white">DI TÍCH KIM LIÊN</h2>
        <div className={`px-3 py-1 rounded-full border text-[10px] font-bold ${isSpeaking ? 'bg-red-500/20 border-red-500 animate-pulse text-red-500' : 'bg-green-500/20 border-green-500 text-green-400'}`}>
          {isSpeaking ? 'ĐANG PHÁT...' : 'SẴN SÀNG'}
        </div>
      </nav>

      <div className="flex-1 relative">
        <MapContainer center={[18.665, 105.575]} zoom={13} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
          <RoutingMachine />
          {sites.map((site) => (
            <Marker key={site.id} position={site.pos}>
              <Popup>
                <div className="w-[260px] p-1 font-sans text-slate-900">
                  <img src={site.img} alt={site.nameVi} className="w-full h-32 object-cover rounded-lg mb-2 shadow-sm" />
                  <h3 className="font-bold leading-tight uppercase text-sm mb-1">{site.nameVi}</h3>
                  <p className="text-[10px] text-slate-500 italic mb-2">{site.nameEn}</p>
                  <p className="text-[11px] text-slate-600 mb-3 border-l-2 border-yellow-500 pl-2 italic">"{site.descVi}"</p>
                  <div className="grid grid-cols-2 gap-2 mb-3 text-white">
                    <button onClick={() => speak(site.audioVi, 'vi')} className="bg-yellow-500 text-slate-900 font-bold py-1.5 rounded text-[9px]">TIẾNG VIỆT</button>
                    <button onClick={() => speak(site.audioEn, 'en')} className="bg-slate-800 font-bold py-1.5 rounded text-[9px]">ENGLISH</button>
                  </div>
                  <Link href="/ky-uc" className="flex items-center justify-center w-full bg-blue-50 text-blue-600 font-bold py-2 rounded-lg text-[10px] border border-blue-100 hover:bg-blue-600 hover:text-white transition-all shadow-sm">✍️ CHIA SẺ KÝ ỨC</Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        <div className="absolute bottom-6 right-6 z-[1000] bg-slate-900/90 backdrop-blur-md text-white p-4 rounded-2xl border border-white/10 shadow-2xl w-64">
           <h4 className="text-yellow-500 font-bold text-[10px] uppercase mb-3 tracking-tighter">Lộ trình tham quan thực tế</h4>
           <div className="space-y-3 text-[11px]">
              <div className="flex justify-between">
                <span>Hoàng Trù → Làng Sen:</span>
                <span className="font-bold text-yellow-500">~2.2 km</span>
              </div>
              <div className="flex justify-between">
                <span>Làng Sen → Mộ Bà Loan:</span>
                <span className="font-bold text-yellow-500">~4.8 km</span>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between font-black">
                <span>TỔNG CỘNG:</span>
                <span className="text-yellow-400 uppercase">Khoảng 7 km</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}