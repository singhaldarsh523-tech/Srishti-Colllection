import { useEffect, useState } from 'react';
import {
  APIProvider,
  AdvancedMarker,
  InfoWindow,
  Map as GoogleMap,
  Pin,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';
import { ExternalLink, MapPin, Navigation } from 'lucide-react';
import { BOUTIQUE_CONTACT } from '../data/boutiqueData';

interface BoutiqueLocation {
  id: string;
  title: string;
  role: string;
  address: string;
  position: { lat: number; lng: number };
  zoom: number;
  isFlagship?: boolean;
}

const BOUTIQUE_LOCATIONS: BoutiqueLocation[] = [
  {
    id: 'kanpur-flagship',
    title: 'Srishti Collection Flagship Boutique',
    role: 'Flagship Store · Kanpur',
    address: BOUTIQUE_CONTACT.address,
    position: { lat: 26.4339, lng: 80.3264 },
    zoom: 15,
    isFlagship: true,
  },
  {
    id: 'kolkata-hub',
    title: 'Kolkata Heritage Silk Hub',
    role: 'Sourcing Atelier · Kolkata',
    address: 'Handloom Jamdani, Tussar & Mulberry Silk Partner Looms, Kolkata, West Bengal',
    position: { lat: 22.5726, lng: 88.3639 },
    zoom: 11,
  },
  {
    id: 'jaipur-hub',
    title: 'Jaipur Craft & Block-Print Hub',
    role: 'Sourcing Atelier · Jaipur',
    address: 'Zardozi Anarkali, Bandhej & Sanganeri Block-Print Studios, Jaipur, Rajasthan',
    position: { lat: 26.9124, lng: 75.7873 },
    zoom: 11,
  },
  {
    id: 'surat-hub',
    title: 'Surat Zari & Embroidery Hub',
    role: 'Sourcing Atelier · Surat',
    address: 'Zari Tissue Silk, Patola & Bridal Embroidery Houses, Surat, Gujarat',
    position: { lat: 21.1702, lng: 72.8311 },
    zoom: 11,
  },
];

function LocationMarker({
  location,
  isSelected,
  onSelect,
  onCloseInfo,
}: {
  location: BoutiqueLocation;
  isSelected: boolean;
  onSelect: () => void;
  onCloseInfo: () => void;
}) {
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={location.position}
        title={location.title}
        onClick={onSelect}
      >
        <Pin
          background={location.isFlagship ? '#8C1D2D' : '#1C1917'}
          borderColor="#FAF9F6"
          glyphColor="#FAF9F6"
          scale={location.isFlagship ? 1.25 : 1.0}
        />
      </AdvancedMarker>

      {isSelected && marker && (
        <InfoWindow anchor={marker} maxWidth={260} onCloseClick={onCloseInfo}>
          <div className="p-1 text-[#1C1917] font-sans">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-[#8C1D2D]">
              {location.role}
            </p>
            <p className="text-sm font-semibold mt-0.5">{location.title}</p>
            <p className="text-xs text-[#57534E] mt-1 leading-relaxed">
              {location.address}
            </p>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

export function BoutiqueMapSection() {
  const [apiKey, setApiKey] = useState<string>(
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  );
  const [selectedId, setSelectedId] = useState<string>('kanpur-flagship');
  const [infoOpen, setInfoOpen] = useState<boolean>(true);
  const [cameraCenter, setCameraCenter] = useState<{ lat: number; lng: number }>({
    lat: 26.4339,
    lng: 80.3264,
  });
  const [cameraZoom, setCameraZoom] = useState<number>(15);

  useEffect(() => {
    if (!apiKey) {
      fetch('/api/maps-config')
        .then((res) => (res.ok ? res.json() : null))
        .then((data: { apiKey?: string } | null) => {
          if (data?.apiKey) {
            setApiKey(data.apiKey);
          }
        })
        .catch(() => {
          // Ignore network errors if backend config unavailable
        });
    }
  }, [apiKey]);

  const handleSelectLocation = (loc: BoutiqueLocation) => {
    setSelectedId(loc.id);
    setInfoOpen(true);
    setCameraCenter(loc.position);
    setCameraZoom(loc.zoom);
  };

  const flagshipMapsUrl =
    'https://www.google.com/maps/search/?api=1&query=B+Blok+128%2F2+Kidwai+Nagar+Kanpur+Uttar+Pradesh+208011';

  return (
    <section
      id="locations"
      className="py-16 sm:py-20 border-t border-[#E5E0D8] bg-white"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-[#8C1D2D]">
              Boutique & Sourcing Map
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#1C1917] mt-2 text-balance">
              Visit Our Kanpur Boutique & Craft Hubs
            </h2>
            <p className="text-sm text-[#57534E] mt-2 max-w-2xl">
              Visit Srishti Collection in Kidwai Nagar, Kanpur, or explore our three direct textile import hubs in Kolkata, Jaipur, and Surat.
            </p>
          </div>

          <a
            href={flagshipMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#1C1917] border border-[#E5E0D8] hover:border-[#1C1917] rounded-md transition-colors self-start md:self-auto whitespace-nowrap shrink-0"
          >
            <Navigation className="w-3.5 h-3.5 text-[#8C1D2D]" />
            <span>Directions to Kidwai Nagar</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Location Selector Cards */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {BOUTIQUE_LOCATIONS.map((loc) => {
              const active = selectedId === loc.id;
              return (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => handleSelectLocation(loc)}
                  className={`p-4 text-left rounded-lg border transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#FAF9F6] border-[#8C1D2D] shadow-xs'
                      : 'bg-white border-[#E5E0D8] hover:border-[#1C1917]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8C1D2D]">
                        {loc.role}
                      </p>
                      <h3 className="text-sm font-semibold text-[#1C1917] mt-0.5">
                        {loc.title}
                      </h3>
                    </div>
                    <MapPin
                      className={`w-4 h-4 shrink-0 mt-0.5 ${
                        active ? 'text-[#8C1D2D]' : 'text-[#57534E]'
                      }`}
                    />
                  </div>
                  <p className="text-xs text-[#57534E] mt-1.5 leading-relaxed">
                    {loc.address}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Interactive Google Map */}
          <div className="lg:col-span-8 rounded-xl overflow-hidden border border-[#E5E0D8] bg-[#F3F1EC] h-[380px] sm:h-[440px]">
            {apiKey ? (
              <APIProvider apiKey={apiKey} language="en" region="IN">
                <GoogleMap
                  mapId="DEMO_MAP_ID"
                  center={cameraCenter}
                  zoom={cameraZoom}
                  onCameraChanged={(ev) => {
                    setCameraCenter(ev.detail.center);
                    setCameraZoom(ev.detail.zoom);
                  }}
                  gestureHandling="cooperative"
                  internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                  style={{ width: '100%', height: '100%' }}
                >
                  {BOUTIQUE_LOCATIONS.map((loc) => (
                    <LocationMarker
                      key={loc.id}
                      location={loc}
                      isSelected={infoOpen && selectedId === loc.id}
                      onSelect={() => handleSelectLocation(loc)}
                      onCloseInfo={() => setInfoOpen(false)}
                    />
                  ))}
                </GoogleMap>
              </APIProvider>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                <MapPin className="w-8 h-8 text-[#8C1D2D] mb-3" />
                <p className="font-display text-2xl font-semibold text-[#1C1917]">
                  Srishti Collection — Kidwai Nagar, Kanpur
                </p>
                <p className="text-sm text-[#57534E] mt-2 max-w-md">
                  {BOUTIQUE_CONTACT.address}
                </p>
                <a
                  href={flagshipMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 px-5 py-2.5 bg-[#8C1D2D] text-white text-xs font-semibold rounded-md inline-flex items-center gap-2"
                >
                  <span>Open Location in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
