"use client";
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import React, { Suspense } from 'react';

const museumData = {
  "tieu-su": {
    title: "TIỂU SỬ CHỦ TỊCH HỒ CHÍ MINH",
    banner: "https://images.unsplash.com/photo-1596402184320-417d7178b2cd?q=80&w=1600",
    sections: [
      {
        subtitle: "Tiểu sử chung",
        desc: "Hồ Chí Minh (1890–1969) là người sáng lập Đảng Cộng sản Việt Nam, kiến trúc sư trưởng của nền độc lập dân tộc. Người được UNESCO công nhận là Anh hùng giải phóng dân tộc và Nhà văn hóa kiệt xuất của Việt Nam.",
        images: [
          "https://images.unsplash.com/photo-1599423300746-b62533397364?w=500",
          "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=500",
          "https://images.unsplash.com/photo-1506466010722-395aa2bef877?w=500",
          "https://images.unsplash.com/photo-1555412654-72a95a495858?w=500"
        ]
      },
      {
        subtitle: "Gia đình Bác Hồ",
        desc: "Người sinh ra trong một gia đình nhà nho nghèo. Thân phụ là cụ Nguyễn Sinh Sắc, thân mẫu là cụ Hoàng Thị Loan. Truyền thống yêu nước của gia đình và quê hương xứ Nghệ là cái nôi hình thành nhân cách cao đẹp của Người.",
        images: [
          "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=500",
          "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=500",
          "https://images.unsplash.com/photo-1518173946687-a4c8a9b746f4?w=500",
          "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=500"
        ]
      },
      {
        subtitle: "Sự nghiệp Cách mạng",
        desc: "Từ người thanh niên yêu nước ra đi tìm đường cứu nước năm 1911, trải qua 30 năm bôn ba hải ngoại, Người đã mang về ánh sáng cách mạng, lãnh đạo nhân dân giành độc lập năm 1945 và kháng chiến thắng lợi.",
        images: [
          "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500",
          "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=500",
          "https://images.unsplash.com/photo-1473491573958-ee419ab00913?w=500",
          "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=500"
        ]
      },
      {
        subtitle: "Sự nghiệp Văn chương & Báo chí",
        desc: "Người coi văn chương là vũ khí sắc bén phục vụ cách mạng. Với các tác phẩm tiêu biểu như 'Nhật ký trong tù', 'Bản án chế độ thực dân Pháp', Người đã đặt nền móng cho nền báo chí cách mạng hiện đại.",
        images: [
          "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500",
          "https://images.unsplash.com/photo-1474932430478-3a7fb9065da0?w=500",
          "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=500",
          "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=500"
        ]
      }
    ]
  },
  "que-noi": {
    title: "QUÊ NỘI LÀNG SEN",
    banner: "https://images.unsplash.com/photo-1504198266287-1659872e6590?q=80&w=1600",
    sections: [
      {
        subtitle: "Di tích Làng Sen",
        desc: "Làng Sen (Kim Liên) - mảnh đất thấm đẫm tình quê, nơi Bác đã sống những năm tháng niên thiếu (1901–1906). Ngôi nhà tranh 5 gian khiêm tốn là nơi chứng kiến sự trưởng thành của một vĩ nhân.",
        images: [
          "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500",
          "https://images.unsplash.com/photo-1528183429188-9bd610d4035c?w=500",
          "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=500",
          "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500"
        ]
      },
      {
        subtitle: "Hiện vật quý giá",
        desc: "Những vật dụng đơn sơ như chiếc võng gai, bộ phản gỗ, chõng tre... vẫn được lưu giữ nguyên vẹn, gợi nhớ về cuộc sống giản dị của gia đình cụ Phó bảng Nguyễn Sinh Sắc.",
        images: [
          "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=500",
          "https://images.unsplash.com/photo-1444492417251-9c84a5fa18e0?w=500",
          "https://images.unsplash.com/photo-1563296244-638069d273f5?w=500",
          "https://images.unsplash.com/photo-1596120236172-231999844ade?w=500"
        ]
      }
    ]
  },
  "que-ngoai": {
    title: "QUÊ NGOẠI HOÀNG TRÙ",
    banner: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1600",
    sections: [
      {
        subtitle: "Nơi Bác cất tiếng khóc chào đời",
        desc: "Làng Hoàng Trù (quê ngoại) là nơi Chủ tịch Hồ Chí Minh sinh ra. Dưới mái nhà tranh ấm áp của ông bà ngoại, Người đã được nuôi dưỡng bằng tình yêu thương và lời ru của mẹ.",
        images: [
          "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500",
          "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500",
          "https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?w=500",
          "https://images.unsplash.com/photo-1501183007986-d0d080b147f9?w=500"
        ]
      }
    ]
  },
  "cong-dong": {
    title: "KÝ ỨC CỘNG ĐỒNG",
    banner: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1600",
    sections: [
      {
        subtitle: "Đóng góp từ Nhân dân",
        desc: "Nơi lưu giữ những hình ảnh quý giá về Bác Hồ trong lòng nhân dân và bạn bè quốc tế. Những bức ảnh, bức thư và tư liệu này do chính cộng đồng chia sẻ và gìn giữ.",
        images: [
          "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500",
          "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500",
          "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500",
          "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=500"
        ]
      }
    ]
  }
};

function GalleryContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || 'tieu-su';
  const data = museumData[tab as keyof typeof museumData] || museumData["tieu-su"];

  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      {/* BANNER: SỬ DỤNG MÀU VÀNG ĐỒNG CỰC MẠNH */}
      <div className="h-[50vh] w-full relative">
        <img src={data.banner} className="w-full h-full object-cover" alt="Banner" />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center">
          <Link href="/" className="mb-6 bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-full font-bold transition shadow-xl border border-green-500">
            ← QUAY VỀ TRANG CHỦ
          </Link>
          <div className="px-10 py-6 border-y-2 border-yellow-500/30 bg-black/20 backdrop-blur-sm">
            <h1 className="text-yellow-400 text-4xl md:text-7xl font-black drop-shadow-[0_4px_4px_rgba(0,0,0,1)] uppercase tracking-widest">
              {data.title}
            </h1>
          </div>
        </div>
      </div>

      {/* CHI TIẾT CÁC MỤC */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {data.sections.map((section, index) => (
          <div key={index} className="mb-20">
            <h2 className="text-3xl font-bold text-green-900 mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-orange-500 rounded-full"></span>
              {section.subtitle}
            </h2>
            <p className="text-stone-600 text-lg mb-8 leading-relaxed italic">{section.desc}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {section.images.map((img, idx) => (
                <div key={idx} className="h-60 rounded-2xl overflow-hidden shadow-lg hover:ring-4 ring-green-700 transition-all cursor-pointer">
                  <img src={img} className="w-full h-full object-cover" alt="Tư liệu" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GalleryPage() {
  return (
    <Suspense fallback={<div>Đang tải bảo tàng số...</div>}>
      <GalleryContent />
    </Suspense>
  );
}