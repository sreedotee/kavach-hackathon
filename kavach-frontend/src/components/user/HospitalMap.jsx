import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Asset imports (corrected path)
import greenIconUrl from '@assets/marker-icon-green.png';
import redIconUrl from '@assets/marker-icon-red.png';
import shadowIconUrl from '@assets/marker-shadow.png';

// Function to create custom icons using imported URLs
const createCustomIcon = (iconUrl) => new L.Icon({
    iconUrl: iconUrl,
    shadowUrl: shadowIconUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

// Green icon for in-network hospitals
const greenIcon = createCustomIcon(greenIconUrl);

// Red icon for out-of-network hospitals
const redIcon = createCustomIcon(redIconUrl);

// Blue icon for the center point (MJCET)
const blueDotIcon = new L.DivIcon({
    className: 'custom-blue-dot',
    html: '<div style="background-color: blue; width: 10px; height: 10px; border-radius: 50%;"></div>',
    iconSize: [10, 10],
    iconAnchor: [5, 5],
});

function HospitalMap() {
    const mjcetCoordinates = [17.428273, 78.442908];
    const searchRadiusKm = 5;
    const searchRadiusMeters = searchRadiusKm * 1000;

    // Sample hospital data
    const hospitals = [
        { position: [17.4000, 78.4500], name: 'City Hospital (In-Network)', isInNetwork: true },
        { position: [17.4100, 78.4450], name: 'Global Health (In-Network)', isInNetwork: true },
        { position: [17.4050, 78.4550], name: 'Apollo Clinic (Out-of-Network)', isInNetwork: false },
        { position: [17.4150, 78.4400], name: 'Care Hospitals (In-Network)', isInNetwork: true },
        { position: [17.4080, 78.4520], name: 'Sunshine Medical Center (Out-of-Network)', isInNetwork: false },
    ];

    return (
        <MapContainer 
            center={mjcetCoordinates} 
            zoom={13} 
            style={{ height: '400px', width: '100%', borderRadius: '12px', overflow: 'hidden' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* MJCET - Blue Dot */}
            <Marker position={mjcetCoordinates} icon={blueDotIcon}>
                <Popup>Muffakham JAH College of Engineering and Technology</Popup>
            </Marker>

            {/* Search Radius Circle */}
            <Circle 
                center={mjcetCoordinates} 
                radius={searchRadiusMeters} 
                color="blue" 
                fillColor="lightblue" 
                fillOpacity={0.2} 
                weight={2} 
            />

            {/* Hospital Markers */}
            {hospitals.map((hospital, index) => (
                <Marker
                    key={index}
                    position={hospital.position}
                    icon={hospital.isInNetwork ? greenIcon : redIcon}
                >
                    <Popup>{hospital.name}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}

export default HospitalMap;
