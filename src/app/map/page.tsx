"use client"; // BẮT BUỘC PHẢI CÓ DÒNG NÀY Ở ĐẦU FILE
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => <div className="h-screen bg-slate-950 flex items-center justify-center text-white font-bold">Đang tải bản đồ di tích...</div>
});

export default function MapPage() {
  return <MapComponent />;
}