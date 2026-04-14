"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

const sites = [
  { id: 1, nameVi: "Làng Sen (Quê Nội)", pos: [18.675, 105.567] as [number, number], img: "https://vnanet.vn/Data/Articles/2021/05/19/5571407/04163459.jpg", descVi: "Ngôi nhà tranh đơn sơ nơi Bác sống thời niên thiếu." },
  { id: 2, nameVi: "Hoàng Trù (Quê Ngoại)", pos: [18.685, 105.575] as [number, number], img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Que_ngoai_Bac_Ho.jpg/1024px-Que_ngoai_Bac_Ho.jpg", descVi: "Nơi Bác Hồ cất tiếng khóc chào đời năm 1890." },
  { id: 3, nameVi: "Mộ Bà Hoàng Thị Loan", pos: [18.650, 105.580] as [number, number], img: "https://disannghean.vn/wp-content/uploads/2021/05/mo-ba-hoang-thi-loan.jpg", descVi: "Nằm trên núi Động Tranh linh thiêng." }
];

const RoutingMachine = () => {
  const map = useMap();
  const routingRef = useRef<any>(null);

  useEffect(() => {
    if (!map) return;
    
    const initRouting = async () => {
      try {
        const L_any = L as any;
        if (typeof window !== "undefined") {
          require('leaflet-routing-machine');
          routingRef.current = L_any.Routing.control({
            waypoints: [L.latLng(sites[1].pos), L.latLng(sites[0].pos), L.latLng(sites[2].pos)],
            lineOptions: { styles: [{ color: '#facc15', weight: 6 }] },
            addWaypoints: false,
            draggableWaypoints: false,
            show: false,
            createMarker: () => null
          }).addTo(map);
        }
      } catch (e) { console.log("Routing error"); }
    };

    initRouting();

    return () => {
      if (map && routingRef.current) {
        try { map.removeControl(routingRef.current); } catch (e) { }
      }
    };
  }, [map]);

  return null;
};

export default function MapComponent() {
  return (
    <div className="h-screen w-full flex flex-col bg-slate-950">
      <nav className="h-16 px-6 bg-slate-900 text-white flex justify-between items-center z-[1001]">
        <Link href="/" className="font-bold text-yellow-500">← QUAY VỀ</Link>
        <h2 className="font-black text-sm">DI TÍCH KIM LIÊN</h2>
        <div className="text-[10px] text-green-400 border border-green-500 px-2 py-1 rounded-full">SẴN SÀNG</div>
      </nav>
      <div className="flex-1">
        <MapContainer center={[18.665, 105.575]} zoom={13} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <RoutingMachine />
          {sites.map((site) => (
            <Marker key={site.id} position={site.pos}>
              <Popup>
                <div className="w-48">
                  <img src={site.img} className="rounded mb-2" />
                  <p className="font-bold text-sm">{site.nameVi}</p>
                  <p className="text-xs italic">"{site.descVi}"</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}