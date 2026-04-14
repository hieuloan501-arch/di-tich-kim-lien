import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('./MapComponent'), { 
  ssr: false, // Tắt render phía server để tránh lỗi appendChild
  loading: () => <div className="h-screen bg-slate-950 flex items-center justify-center text-white">Đang tải bản đồ...</div>
});

export default function MapPage() {
  return <MapComponent />;
}