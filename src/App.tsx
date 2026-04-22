import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Images,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const BASE = import.meta.env.BASE_URL;

interface GalleryImage {
  id: number;
  src: string;
  label: string;
}

interface LightboxState {
  open: boolean;
  images: GalleryImage[];
  index: number;
}

type TreatmentIconType =
  | "implant"
  | "rootCanal"
  | "extraction"
  | "wisdom"
  | "scaling"
  | "filling"
  | "crown"
  | "bridge"
  | "denture"
  | "whitening"
  | "veneer"
  | "braces"
  | "aligner"
  | "pediatric"
  | "emergency";

interface Service {
  name: string;
  icon: TreatmentIconType;
}

interface Branch {
  id: string;
  title: string;
  address: string;
  phone: string;
  tel: string;
  whatsapp: string;
  timingWeekday: string;
  timingSunday: string;
  mapSrc: string;
  gallery: GalleryImage[];
  sectionBg: string;
}

const NAV_LINKS = [
  { id: "our-services", label: "Our Services" },
  { id: "treatment-results", label: "Results" },
  { id: "nizampura-branch", label: "Nizampura Branch" },
  { id: "new-sama-branch", label: "New Sama Branch" },
];

const SERVICES: Service[] = [
  { name: "Dental Implants", icon: "implant" },
  { name: "Root Canal Treatment", icon: "rootCanal" },
  { name: "Tooth Extraction", icon: "extraction" },
  { name: "Wisdom Tooth Removal", icon: "wisdom" },
  { name: "Scaling", icon: "scaling" },
  { name: "Fillings", icon: "filling" },
  { name: "Crowns", icon: "crown" },
  { name: "Bridges", icon: "bridge" },
  { name: "Dentures", icon: "denture" },
  { name: "Teeth Whitening", icon: "whitening" },
  { name: "Veneers", icon: "veneer" },
  { name: "Braces", icon: "braces" },
  { name: "Aligners", icon: "aligner" },
  { name: "Pediatric Care", icon: "pediatric" },
  { name: "Emergency Care", icon: "emergency" },
];

const DOCTOR_TRUST_POINTS = [
  {
    title: "Experience & Expertise",
    text: "With years of clinical practice in Vadodara, our doctors are experts in complex extractions, aesthetic restorations, and preventive dental care.",
  },
  {
    title: "Mastery in Full Mouth Rehabilitation",
    text: "Comprehensive full mouth rehabilitation - restoring complete oral health, function, and aesthetics for patients requiring extensive dental reconstruction.",
  },
  {
    title: "Precision & Skill",
    text: "Utilizing modern diagnostic tools, they perform procedures with high precision, minimizing discomfort and ensuring faster recovery times.",
  },
  {
    title: "Compassionate Care",
    text: "Known for their gentle and polite demeanor, our doctors excel at calming anxious patients - making them the trusted choice for children and senior citizens alike.",
  },
  {
    title: "Patient Education",
    text: "Dr. Nehal and Dr. Shweta take the time to explain every procedure, ensuring you are well-informed and comfortable with your treatment plan.",
  },
];

const NIZAMPURA_GALLERY: GalleryImage[] = [
  {
    id: 1,
    src: `${BASE}assets/sneh-dental-clinic-nizampura-vadodara-01.jpg`,
    label: "Sneh Dental Clinic Nizampura branch reception area Vadodara",
  },
  {
    id: 2,
    src: `${BASE}assets/sneh-dental-clinic-nizampura-vadodara-02.jpg`,
    label: "Dental treatment room at Sneh Dental Clinic Nizampura Vadodara",
  },
  {
    id: 3,
    src: `${BASE}assets/sneh-dental-clinic-nizampura-vadodara-03.jpg`,
    label: "Modern dental equipment at Sneh Dental Clinic Nizampura Vadodara",
  },
  {
    id: 4,
    src: `${BASE}assets/sneh-dental-clinic-nizampura-vadodara-04.jpg`,
    label: "Sneh Dental Clinic Nizampura branch interior Vadodara",
  },
  {
    id: 5,
    src: `${BASE}assets/sneh-dental-clinic-nizampura-vadodara-05.jpg`,
    label: "Patient care area at Sneh Dental Clinic Nizampura Vadodara",
  },
  {
    id: 6,
    src: `${BASE}assets/sneh-dental-clinic-nizampura-vadodara-06.jpg`,
    label: "Dental operatory at Sneh Dental Clinic Nizampura Vadodara",
  },
  {
    id: 7,
    src: `${BASE}assets/sneh-dental-clinic-nizampura-vadodara-07.jpg`,
    label: "Sterilization unit at Sneh Dental Clinic Nizampura Vadodara",
  },
  {
    id: 8,
    src: `${BASE}assets/sneh-dental-clinic-nizampura-vadodara-08.jpg`,
    label: "Waiting area at Sneh Dental Clinic Nizampura Vadodara",
  },
];

const NEWSAMA_GALLERY: GalleryImage[] = [
  {
    id: 1,
    src: `${BASE}assets/sneh-dental-clinic-new-sama-vadodara-01.jpg`,
    label: "Sneh Dental Clinic New Sama branch reception Vadodara",
  },
  {
    id: 2,
    src: `${BASE}assets/sneh-dental-clinic-new-sama-vadodara-02.jpg`,
    label: "Dental treatment room at Sneh Dental Clinic New Sama Vadodara",
  },
  {
    id: 3,
    src: `${BASE}assets/sneh-dental-clinic-new-sama-vadodara-03.jpg`,
    label: "Modern dental chair at Sneh Dental Clinic New Sama Vadodara",
  },
  {
    id: 4,
    src: `${BASE}assets/sneh-dental-clinic-new-sama-vadodara-04.jpg`,
    label: "Sneh Dental Clinic New Sama branch interior Vadodara",
  },
  {
    id: 5,
    src: `${BASE}assets/sneh-dental-clinic-new-sama-vadodara-05.jpg`,
    label: "Waiting area at Sneh Dental Clinic New Sama Vadodara",
  },
];

const BEFORE_AFTER_RESULTS = [
  {
    id: 1,
    title: "Treatment Case 01",
    treatment: "Before & After Collage",
    src: `${BASE}assets/before-after-dental-treatment-sneh-dental-clinic-vadodara-01.jpg`,
  },
  {
    id: 2,
    title: "Treatment Case 02",
    treatment: "Before & After Collage",
    src: `${BASE}assets/before-after-dental-treatment-sneh-dental-clinic-vadodara-02.jpg`,
  },
  {
    id: 3,
    title: "Treatment Case 03",
    treatment: "Before & After Collage",
    src: `${BASE}assets/before-after-dental-treatment-sneh-dental-clinic-vadodara-03.jpg`,
  },
  {
    id: 4,
    title: "Treatment Case 04",
    treatment: "Before & After Collage",
    src: `${BASE}assets/before-after-dental-treatment-sneh-dental-clinic-vadodara-04.jpg`,
  },
  {
    id: 5,
    title: "Treatment Case 05",
    treatment: "Before & After Collage",
    src: `${BASE}assets/before-after-dental-treatment-sneh-dental-clinic-vadodara-05.jpg`,
  },
  {
    id: 6,
    title: "Treatment Case 06",
    treatment: "Before & After Collage",
    src: `${BASE}assets/before-after-dental-treatment-sneh-dental-clinic-vadodara-06.jpg`,
  },
];

const TREATMENT_RESULT_IMAGES: GalleryImage[] = BEFORE_AFTER_RESULTS.map((result) => ({
  id: result.id,
  src: result.src,
  label: `Before and after dental treatment result ${result.id} at Sneh Dental Clinic Vadodara`,
}));
const BRANCHES: Branch[] = [
  {
    id: "nizampura-branch",
    title: "Nizampura Branch",
    address: "FF-6, Cascade Complex, Nizampura Rd, Vadodara - 390024",
    phone: "9427899577",
    tel: "+919427899577",
    whatsapp: "919427899577",
    timingWeekday: "9:00 AM - 2:00 PM & 4:30 PM - 9:00 PM",
    timingSunday: "10:00 AM - 1:30 PM",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.26309582103!2d73.1737337750707!3d22.343692579655343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc929f8aa089d%3A0x7d60e6ffdb02c535!2sSneh%20Dental%20Clinic!5e0!3m2!1sen!2sin!4v1773952360528!5m2!1sen!2sin",
    gallery: NIZAMPURA_GALLERY,
    sectionBg: "#EEF6FB",
  },
  {
    id: "new-sama-branch",
    title: "New Sama Branch",
    address: "2, Sharman Complex, New Sama Rd, Vadodara - 390008",
    phone: "9409458877",
    tel: "+919409458877",
    whatsapp: "919409458877",
    timingWeekday: "9:00 AM - 1:30 PM & 5:00 PM - 8:30 PM",
    timingSunday: "10:00 AM - 1:30 PM",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.437905155482!2d73.19010007507043!3d22.337088279660165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fcf2f7447aa3d%3A0x91820f8bc9f49b04!2sSneh%20Dental%20Clinic!5e0!3m2!1sen!2sin!4v1773952202545!5m2!1sen!2sin",
    gallery: NEWSAMA_GALLERY,
    sectionBg: "#FFFFFF",
  },
];

const WhatsAppIcon = ({ size = 26 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="WhatsApp"
  >
    <title>WhatsApp</title>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

function ImageWithFallback({
  src,
  alt,
  className,
  fallbackLabel,
  loading = "lazy",
}: {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel: string;
  loading?: "eager" | "lazy";
}) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-[#F0F7FC] p-6 text-center ${className ?? ""}`}
      >
        <div>
          <Images className="mx-auto mb-3 text-[#0B5E8E] opacity-40" size={42} />
          <p className="text-sm font-semibold text-[#0B5E8E]">{fallbackLabel}</p>
          <p className="mt-1 text-xs text-[#6B7280]">Photo will appear after you add it.</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      draggable={false}
      loading={loading}
      onError={() => setFailed(true)}
    />
  );
}
function TreatmentIcon({ type, label }: { type: TreatmentIconType; label: string }) {
  const id = `treatment-${type}`;
  const bgId = `${id}-bg`;
  const glassId = `${id}-glass`;
  const enamelId = `${id}-enamel`;
  const shadowId = `${id}-shadow`;
  const shineId = `${id}-shine`;
  const gumId = `${id}-gum`;
  const metalId = `${id}-metal`;

  const toothShape =
    "M48 18c-5.6 0-8.6 2.6-12.1 2.6-2.1 0-4.2-1.1-6.8-1.1-7.2 0-13 6.4-13 17.1 0 14.7 7.5 33.1 14.1 33.1 5.3 0 4.2-15.6 7.5-15.6 3.2 0 2.3 15.6 7.5 15.6 6.5 0 14.1-18.4 14.1-33.1C59.3 24.4 54.3 18 48 18z";

  const Tooth = ({
    x = 0,
    y = 0,
    scale = 1,
    fill = `url(#${enamelId})`,
    stroke = "#0B5E8E",
  }: {
    x?: number;
    y?: number;
    scale?: number;
    fill?: string;
    stroke?: string;
  }) => (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d={toothShape} fill={fill} stroke={stroke} strokeWidth="3.1" strokeLinejoin="round" />
      <path
        d="M29 35c4.6 3.2 12.1 3.6 17.7.7"
        fill="none"
        stroke="#BFE3F5"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.95"
      />
    </g>
  );

  const MiniTooth = ({ x, y }: { x: number; y: number }) => (
    <path
      d={`M${x} ${y}c-4.6 0-8 3.7-8 9.4 0 7.2 3.4 15 6.2 15 2 0 1.5-6.3 2.4-6.3s.5 6.3 2.4 6.3c2.7 0 6.2-7.8 6.2-15C${x + 9.2} ${y + 3.7} ${x + 4.6} ${y} ${x} ${y}z`}
      fill={`url(#${enamelId})`}
      stroke="#0B5E8E"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  );

  const Spark = ({ x, y, size = 1 }: { x: number; y: number; size?: number }) => (
    <path
      d={`M${x} ${y - 7 * size}l${2.1 * size} ${4.9 * size} ${5.2 * size} ${2.1 * size}-${5.2 * size} ${2.1 * size}-${2.1 * size} ${4.9 * size}-${2.1 * size}-${4.9 * size}-${5.2 * size}-${2.1 * size} ${5.2 * size}-${2.1 * size}z`}
      fill="#F7C95C"
      stroke="#FFFFFF"
      strokeWidth="1"
      strokeLinejoin="round"
    />
  );

  const treatmentArt = (() => {
    switch (type) {
      case "implant":
        return (
          <>
            <Tooth y={-2} scale={0.94} />
            <g stroke="#1F628E" strokeLinecap="round" strokeLinejoin="round">
              <path d="M48 58v18" strokeWidth="4" />
              <path d="M38 62h20M40 68h16M42 74h12" strokeWidth="2.6" />
              <path d="M41 56h14" strokeWidth="3" />
            </g>
          </>
        );
      case "rootCanal":
        return (
          <>
            <Tooth />
            <path
              d="M47.5 28c-5 7.7 4.5 15.5-.3 29"
              fill="none"
              stroke="#E35D6A"
              strokeWidth="4.2"
              strokeLinecap="round"
            />
            <path
              d="M44 57c2-5 6-5 8 0"
              fill="none"
              stroke="#E35D6A"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M51 57c2-5 5-4 6 1"
              fill="none"
              stroke="#E35D6A"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="48" cy="28" r="4.2" fill="#FFFFFF" stroke="#E35D6A" strokeWidth="2.2" />
            <path d="M46.5 26.5l3 3M49.5 26.5l-3 3" stroke="#E35D6A" strokeWidth="1.5" strokeLinecap="round" />
          </>
        );
      case "extraction":
        return (
          <>
            <g transform="rotate(-8 48 48)">
              <Tooth y={3} scale={0.86} />
            </g>
            <g fill="none" stroke="#1F628E" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 22l21 22M73 22L52 44" strokeWidth="4" />
              <path d="M27 26l8-8M69 26l-8-8" strokeWidth="3" />
              <path d="M43 44l-5 7M53 44l5 7" strokeWidth="2.5" />
            </g>
          </>
        );
      case "wisdom":
        return (
          <>
            <MiniTooth x={35} y={32} />
            <g transform="translate(16 -2)">
              <Tooth y={3} scale={0.78} />
            </g>
            <Spark x={66} y={25} size={1.35} />
            <path d="M36 63c6 5 18 5 24 0" fill="none" stroke="#E35D6A" strokeWidth="3" strokeLinecap="round" />
          </>
        );
      case "scaling":
        return (
          <>
            <Tooth />
            <path d="M28 63c15-3 29-14 40-35" fill="none" stroke="#1F628E" strokeWidth="4.4" strokeLinecap="round" />
            <path d="M63 28l9-7" fill="none" stroke={`url(#${metalId})`} strokeWidth="6" strokeLinecap="round" />
            <circle cx="34" cy="39" r="2.4" fill="#F7C95C" />
            <circle cx="59" cy="54" r="2.1" fill="#F7C95C" />
            <Spark x={72} y={50} size={0.65} />
          </>
        );
      case "filling":
        return (
          <>
            <Tooth />
            <path d="M39 33h18c2.2 0 4 1.8 4 4v13H35V37c0-2.2 1.8-4 4-4z" fill="#7DC6E8" stroke="#1F628E" strokeWidth="2.4" />
            <path d="M48 35v14M41 42h14" fill="none" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" />
            <circle cx="42" cy="37" r="1.5" fill="#FFFFFF" opacity=".6" />
          </>
        );
      case "crown":
        return (
          <>
            <Tooth y={5} scale={0.88} />
            <path
              d="M29 26l7.5 8.2 10-12.2 10 12.2L65 26v19H29z"
              fill="#F7C95C"
              stroke="#1F628E"
              strokeWidth="2.8"
              strokeLinejoin="round"
            />
            <path d="M32 45h30" stroke="#1F628E" strokeWidth="2.3" strokeLinecap="round" />
            <circle cx="47" cy="31" r="3.5" fill="#E35D6A" stroke="#1F628E" strokeWidth="1.5" />
            <circle cx="47" cy="30" r="1.2" fill="#FFFFFF" opacity=".7" />
          </>
        );
      case "bridge":
        return (
          <>
            <g transform="translate(-18 7) scale(.86)">
              <Tooth />
            </g>
            <g transform="translate(2 3) scale(.94)">
              <Tooth />
            </g>
            <g transform="translate(23 7) scale(.86)">
              <Tooth />
            </g>
            <path d="M28 35c12 5 28 5 40 0" fill="none" stroke="#7DC6E8" strokeWidth="4" strokeLinecap="round" />
            <path d="M32 30h32" stroke="#1F628E" strokeWidth="2.5" strokeLinecap="round" />
          </>
        );
      case "denture":
        return (
          <>
            {/* Upper denture plate */}
            <path d="M24 38c4-12 40-12 48 0v6c-6 8-42 8-48 0z" fill={`url(#${gumId})`} stroke="#1F628E" strokeWidth="2.2" />
            {/* Upper teeth */}
            {[33, 40, 48, 56, 63].map((tx) => (
              <rect key={`u${tx}`} x={tx - 3} y="36" width="6" height="10" rx="2.5" fill={`url(#${enamelId})`} stroke="#1F628E" strokeWidth="1.4" />
            ))}
            {/* Lower denture plate */}
            <path d="M26 56c4 12 38 12 44 0v-5c-5-7-39-7-44 0z" fill={`url(#${gumId})`} stroke="#1F628E" strokeWidth="2.2" />
            {/* Lower teeth */}
            {[34, 41, 48, 55, 62].map((tx) => (
              <rect key={`l${tx}`} x={tx - 2.8} y="50" width="5.6" height="9" rx="2.2" fill={`url(#${enamelId})`} stroke="#1F628E" strokeWidth="1.4" />
            ))}
            {/* Shine on upper plate */}
            <path d="M32 35c10-3 22-3 32 0" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity=".4" />
          </>
        );
      case "whitening":
        return (
          <>
            <Tooth />
            <Spark x={65} y={25} size={1.5} />
            <Spark x={28} y={37} size={0.9} />
            <Spark x={68} y={56} size={0.85} />
            <Spark x={48} y={18} size={0.7} />
            <path d="M36 52c7.2 5 17.8 5 25 0" fill="none" stroke="#7DC6E8" strokeWidth="3.2" strokeLinecap="round" />
          </>
        );
      case "veneer":
        return (
          <>
            <g transform="translate(-7 0)">
              <Tooth scale={0.9} />
            </g>
            <path
              d="M45 25h19c3 0 5 2 5 5v31c0 3-2 5-5 5H45c-3 0-5-2-5-5V30c0-3 2-5 5-5z"
              fill="#EAF7FF"
              stroke="#1F628E"
              strokeWidth="2.8"
              opacity=".96"
            />
            <path d="M47 35h15M47 43h13M47 51h10" stroke="#7DC6E8" strokeWidth="2.6" strokeLinecap="round" />
          </>
        );
      case "braces":
        return (
          <>
            <path d="M24 49c8-14 40-14 48 0-5 15-43 15-48 0z" fill="#FFFFFF" stroke="#1F628E" strokeWidth="3" />
            <path d="M28 49h40" stroke="#C0C0C0" strokeWidth="3" strokeLinecap="round" />
            <path d="M29 49h38" stroke="#1F628E" strokeWidth="1.8" strokeLinecap="round" />
            {[34, 43, 52, 61].map((x) => (
              <g key={x}>
                <rect x={x - 3.5} y="44" width="7" height="9" rx="1.8" fill="#7DC6E8" stroke="#1F628E" strokeWidth="1.5" />
                <path d={`M${x - 2} 48.5h4`} stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" opacity=".6" />
              </g>
            ))}
            <path d="M33 57c8 4 22 4 30 0" fill="none" stroke="#E35D6A" strokeWidth="2.5" strokeLinecap="round" />
          </>
        );
      case "aligner":
        return (
          <>
            <path d="M25 48c8-12 38-12 46 0-5 16-41 16-46 0z" fill="#EAF7FF" stroke="#1F628E" strokeWidth="3" opacity=".95" />
            <path d="M31 48c7 6 27 6 34 0M35 56c6 3.5 20 3.5 26 0" fill="none" stroke="#7DC6E8" strokeWidth="2.8" strokeLinecap="round" />
            <path d="M27 43c10-5 32-5 42 0" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity=".55" />
          </>
        );
      case "pediatric":
        return (
          <>
            <Tooth y={3} scale={0.76} />
            <circle cx="32" cy="32" r="8.5" fill="#F7C95C" stroke="#1F628E" strokeWidth="2" />
            <circle cx="64" cy="32" r="8.5" fill="#7DC6E8" stroke="#1F628E" strokeWidth="2" />
            <path d="M36 60c6.5 7 17.5 7 24 0" fill="none" stroke="#E35D6A" strokeWidth="3" strokeLinecap="round" />
            <circle cx="43" cy="43" r="2" fill="#1F628E" />
            <circle cx="53" cy="43" r="2" fill="#1F628E" />
            <circle cx="42" cy="42" r="0.8" fill="#FFFFFF" />
            <circle cx="52" cy="42" r="0.8" fill="#FFFFFF" />
            <path d="M45 30l3-4 3 4" fill="none" stroke="#1F628E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </>
        );
      case "emergency":
        return (
          <>
            <Tooth y={5} scale={0.82} />
            <circle cx="66" cy="29" r="13" fill="#E35D6A" stroke="#FFFFFF" strokeWidth="3" />
            <path d="M66 21.5v15M58.5 29h15" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
            <path d="M30 66h36" stroke="#1F628E" strokeWidth="3" strokeLinecap="round" />
            <path d="M24 22l-5-5M76 22l5-5" stroke="#E35D6A" strokeWidth="3" strokeLinecap="round" />
          </>
        );
      default:
        return null;
    }
  })();

  return (
    <svg
      className="h-[88px] w-[88px] drop-shadow-md"
      viewBox="0 0 96 96"
      role="img"
      aria-label={`${label} icon`}
      focusable="false"
    >
      <defs>
        <radialGradient id={bgId} cx="38%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="30%" stopColor="#E8F5FD" />
          <stop offset="55%" stopColor="#B8DDEE" />
          <stop offset="80%" stopColor="#6AADCE" />
          <stop offset="100%" stopColor="#2E6D96" />
        </radialGradient>
        <linearGradient id={glassId} x1="18" y1="12" x2="74" y2="82" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity=".94" />
          <stop offset="46%" stopColor="#FFFFFF" stopOpacity=".4" />
          <stop offset="100%" stopColor="#1F628E" stopOpacity=".22" />
        </linearGradient>
        <linearGradient id={enamelId} x1="30" y1="20" x2="58" y2="72" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="55%" stopColor="#F7FCFF" />
          <stop offset="100%" stopColor="#D7ECF8" />
        </linearGradient>
        <linearGradient id={gumId} x1="22" y1="36" x2="72" y2="76" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F08B96" />
          <stop offset="100%" stopColor="#C83C55" />
        </linearGradient>
        <linearGradient id={metalId} x1="62" y1="20" x2="74" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#7AA6C5" />
        </linearGradient>
        <filter id={shadowId} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#0B5E8E" floodOpacity=".30" />
        </filter>
        <clipPath id={shineId}>
          <circle cx="48" cy="48" r="37" />
        </clipPath>
      </defs>
      <circle cx="48" cy="48" r="40" fill={`url(#${bgId})`} filter={`url(#${shadowId})`} />
      <circle cx="48" cy="48" r="38" fill="none" stroke="#FFFFFF" strokeWidth="2.5" opacity=".6" />
      <circle cx="48" cy="48" r="36" fill={`url(#${glassId})`} stroke="#FFFFFF" strokeWidth="1.5" />
      <g clipPath={`url(#${shineId})`} opacity=".4">
        <path d="M-3 56c25 11 50 8 100-17" fill="none" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round" />
        <path d="M10 70c20 7 45 5 73-8" fill="none" stroke="#245D8D" strokeWidth="5" strokeLinecap="round" opacity=".4" />
      </g>
      <circle cx="33" cy="26" r="14" fill="#FFFFFF" opacity=".45" />
      <g>{treatmentArt}</g>
    </svg>
  );
}

function Lightbox({
  state,
  onClose,
  onPrev,
  onNext,
}: {
  state: LightboxState;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    if (!state.open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrev();
      if (event.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, onNext, onPrev, state.open]);

  if (!state.open || state.images.length === 0) return null;

  const image = state.images[state.index];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={image.label}
    >
      <div className="relative mx-4 w-full max-w-4xl" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          className="absolute -top-12 right-0 text-white transition-opacity hover:opacity-75"
          onClick={onClose}
          aria-label="Close gallery"
        >
          <X size={32} />
        </button>
        <ImageWithFallback
          src={image.src}
          alt={image.label}
          fallbackLabel={image.label}
          className="max-h-[80vh] w-full rounded-2xl bg-black object-contain"
          loading="eager"
        />
        <button
          type="button"
          className="absolute left-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#0B5E8E] shadow-md transition-colors hover:bg-white"
          onClick={onPrev}
          aria-label="Previous image"
        >
          <ChevronLeft />
        </button>
        <button
          type="button"
          className="absolute right-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#0B5E8E] shadow-md transition-colors hover:bg-white"
          onClick={onNext}
          aria-label="Next image"
        >
          <ChevronRight />
        </button>
        <p className="mt-4 text-center text-sm font-medium text-white">
          {image.label} · {state.index + 1} / {state.images.length}
        </p>
      </div>
    </div>
  );
}

function GallerySlider({
  images,
  onOpen,
}: {
  images: GalleryImage[];
  onOpen: (index: number) => void;
}) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (images.length <= 1) return;

    timerRef.current = setInterval(() => {
      setCurrent((value) => (value + 1) % images.length);
    }, 3500);
  }, [images.length]);

  useEffect(() => {
    if (paused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, resetTimer]);

  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  if (images.length === 0) {
    return <GalleryComingSoon />;
  }

  const pauseBriefly = () => {
    setPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => setPaused(false), 6000);
  };

  const handleNav = (delta: number) => {
    setCurrent((value) => (value + delta + images.length) % images.length);
    pauseBriefly();
  };

  const handleDot = (index: number) => {
    setCurrent(index);
    pauseBriefly();
  };

  const image = images[current];

  return (
    <div className="overflow-hidden rounded-2xl border border-[#E3EDF6] shadow-card">
      <div
        className="relative h-72 select-none bg-[#F0F7FC] md:h-96"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <ImageWithFallback
          key={image.src}
          src={image.src}
          alt={image.label}
          fallbackLabel={image.label}
          className="size-full object-contain"
        />
        <button
          type="button"
          className="absolute inset-0 z-0 size-full cursor-zoom-in bg-transparent transition-colors hover:bg-black/5"
          onClick={() => onOpen(current)}
          aria-label={`View ${image.label} fullscreen`}
        />
        <button
          type="button"
          className="absolute left-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#0B5E8E] shadow-md transition-colors hover:bg-white"
          onClick={(event) => {
            event.stopPropagation();
            handleNav(-1);
          }}
          aria-label="Previous image"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          className="absolute right-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#0B5E8E] shadow-md transition-colors hover:bg-white"
          onClick={(event) => {
            event.stopPropagation();
            handleNav(1);
          }}
          aria-label="Next image"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="flex flex-col items-center gap-2 bg-white px-4 py-3">
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {images.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleDot(index)}
              aria-label={`Go to slide ${index + 1}`}
              className="rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B5E8E]/40"
              style={{
                width: index === current ? "20px" : "8px",
                height: "8px",
                backgroundColor: index === current ? "#0B5E8E" : "#C5D9E8",
              }}
            />
          ))}
        </div>
        <p className="text-xs text-[#9CA3AF]">
          {current + 1} / {images.length}
        </p>
      </div>
    </div>
  );
}

function GalleryComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-[#E3EDF6] bg-[#F0F7FC] px-6 py-16 text-center shadow-card">
      <div className="mb-4 text-[#0B5E8E] opacity-40">
        <Images size={48} />
      </div>
      <p className="mb-1 text-lg font-semibold text-[#0B5E8E]">Photos Coming Soon</p>
      <p className="max-w-xs text-sm text-[#6B7280]">
        We're updating our gallery with the latest photos of our clinic. Check back soon!
      </p>
    </div>
  );
}

function BeforeAfterSection({
  onGalleryOpen,
}: {
  onGalleryOpen: (images: GalleryImage[], index: number) => void;
}) {
  return (
    <section id="treatment-results" className="bg-[#F5FAFE] py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[#0B5E8E] md:text-4xl">
            Before & After Treatment Results
          </h2>
          <p className="mt-3 text-base text-[#6B7280]">
            Patient treatment collages and smile transformation outcomes
          </p>
        </div>
        <GallerySlider
          images={TREATMENT_RESULT_IMAGES}
          onOpen={(index) => onGalleryOpen(TREATMENT_RESULT_IMAGES, index)}
        />
      </div>
    </section>
  );
}
function BranchSection({
  branch,
  onGalleryOpen,
}: {
  branch: Branch;
  onGalleryOpen: (images: GalleryImage[], index: number) => void;
}) {
  return (
    <section id={branch.id} className="py-20" style={{ backgroundColor: branch.sectionBg }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-12 text-center text-3xl font-bold text-[#0B5E8E] md:text-4xl">
          {branch.title}
        </h2>
        <div className="mb-12 grid gap-8 md:grid-cols-2">
          <div className="space-y-5 rounded-2xl border border-[#E3EDF6] bg-white p-6 shadow-card">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 shrink-0 text-[#0B5E8E]" size={20} />
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                  Address
                </p>
                <p className="text-sm leading-relaxed text-[#111827]">{branch.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-[#0B5E8E]" size={20} />
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                  Contact
                </p>
                <a
                  href={`tel:${branch.tel}`}
                  className="text-sm font-semibold text-[#0B5E8E] hover:underline"
                >
                  {branch.phone}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-1 shrink-0 text-[#0B5E8E]" size={20} />
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                  Timings
                </p>
                <p className="text-sm text-[#111827]">
                  <span className="font-semibold">Mon-Sat:</span> {branch.timingWeekday}
                </p>
                <p className="text-sm text-[#111827]">
                  <span className="font-semibold">Sunday:</span> {branch.timingSunday}
                </p>
              </div>
            </div>
            <div className="pt-2">
              <a
                href={`https://wa.me/${branch.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                <WhatsAppIcon size={16} />
                Book via WhatsApp
              </a>
            </div>
          </div>
          <div className="min-h-[260px] overflow-hidden rounded-2xl border border-[#E3EDF6] shadow-card">
            <iframe
              src={branch.mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "260px", display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${branch.title} Map`}
            />
          </div>
        </div>

        <h3 className="mb-6 text-xl font-bold text-[#0B5E8E]">Branch Gallery</h3>
        <GallerySlider
          images={branch.gallery}
          onOpen={(index) => onGalleryOpen(branch.gallery, index)}
        />
      </div>
    </section>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const [lightbox, setLightbox] = useState<LightboxState>({
    open: false,
    images: [],
    index: 0,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openLightbox = useCallback((images: GalleryImage[], index: number) => {
    setLightbox({ open: true, images, index });
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox((state) => ({ ...state, open: false }));
  }, []);

  const prevImage = useCallback(() => {
    setLightbox((state) => ({
      ...state,
      index: (state.index - 1 + state.images.length) % state.images.length,
    }));
  }, []);

  const nextImage = useCallback(() => {
    setLightbox((state) => ({
      ...state,
      index: (state.index + 1) % state.images.length,
    }));
  }, []);

  const scrollTo = (sectionId: string) => {
    setMobileOpen(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <header
        className={`fixed inset-x-0 top-0 z-40 bg-white transition-shadow duration-200 ${
          scrolled ? "shadow-nav" : "border-b border-[#E3EDF6]"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <button
            type="button"
            onClick={() => scrollTo("top")}
            className="flex items-center gap-3"
            aria-label="Sneh Dental Clinic home"
          >
            <img
              src={`${BASE}assets/sneh-dental-clinic-logo.png`}
              alt="Sneh Dental Clinic"
              className="h-10 w-auto object-contain"
            />
            <div className="hidden sm:block">
              <p className="text-base font-bold leading-tight text-[#073D5F]">Sneh Dental Clinic</p>
              <p className="text-xs font-medium text-[#0B5E8E]">We Create Beautiful Smile</p>
            </div>
          </button>
          <nav className="hidden items-center gap-6 md:flex" aria-label="Primary navigation">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollTo(link.id)}
                className="text-base font-medium text-[#374151] transition-colors hover:text-[#0B5E8E]"
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setWhatsappOpen(true)}
              className="rounded-lg bg-[#0B5E8E] px-5 py-2.5 text-base font-semibold text-white transition-opacity hover:opacity-90"
            >
              Book Appointment
            </button>
          </nav>
          <button
            type="button"
            className="rounded-lg p-2 text-[#0B5E8E] md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {mobileOpen && (
          <div className="space-y-1 border-t border-[#E3EDF6] bg-white px-4 pb-4 pt-2 md:hidden">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollTo(link.id)}
                className="block w-full rounded-lg px-3 py-2.5 text-left text-base font-medium text-[#374151] transition-colors hover:bg-[#EEF6FB]"
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                setWhatsappOpen(true);
              }}
              className="mt-1 block w-full rounded-lg bg-[#0B5E8E] px-3 py-2.5 text-center text-base font-semibold text-white"
            >
              Book Appointment
            </button>
          </div>
        )}
      </header>

      <main id="top">
        <section className="flex min-h-[90vh] items-center bg-[#EEF6FB] pt-16">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_1fr] lg:gap-16">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-[#0B5E8E18] px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-[#0B5E8E]">
                  Trusted Dental Care · Vadodara
                </span>
                <span className="inline-flex items-center rounded-full bg-[#0B5E8E18] px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-[#0B5E8E]">
                  Since 2005
                </span>
              </div>
              <h1 className="text-4xl font-extrabold leading-tight text-[#073D5F] md:text-5xl lg:text-6xl">
                Sneh Dental Clinic
              </h1>
              <p className="text-2xl font-semibold text-[#0B5E8E] md:text-3xl">
                We Create Beautiful Smile
              </p>
              <p className="max-w-md text-base leading-relaxed text-[#4B5563] md:text-lg">
                Your trusted family dentist in Vadodara — experienced dental specialists providing
                compassionate, comprehensive care across two branches.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setWhatsappOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B5E8E] px-6 py-3 text-base font-semibold text-white shadow-card transition-opacity hover:opacity-90"
                >
                  <WhatsAppIcon size={18} />
                  Book Appointment
                </button>
                <button
                  type="button"
                  onClick={() => scrollTo("our-services")}
                  className="rounded-xl border-2 border-[#0B5E8E] px-6 py-3 text-base font-semibold text-[#0B5E8E] transition-colors hover:bg-[#0B5E8E] hover:text-white"
                >
                  Our Services
                </button>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="flex w-full max-w-sm flex-col items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B5E8E] via-[#0A6FA6] to-[#1E8DC4] px-8 py-10 shadow-nav">
                <img
                  src={`${BASE}assets/sneh-dental-clinic-logo.png`}
                  alt="Sneh Dental Clinic"
                  className="mx-auto mb-6 h-60 w-auto rounded-2xl bg-white/95 object-contain p-5 shadow-md"
                />
                <div className="space-y-2 text-center">
                  <p className="text-lg font-bold tracking-wide text-white">2 Branches</p>
                  <p className="text-sm text-white/70">Nizampura & New Sama, Vadodara</p>
                  <span className="mt-2 inline-block rounded-full bg-white/15 px-4 py-1 text-xs font-bold uppercase tracking-widest text-white/90">
                    Est. 2005 · 20+ Years of Care
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="bg-white py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h2 className="mb-6 text-3xl font-bold text-[#0B5E8E] md:text-4xl">
              About Sneh Dental Clinic
            </h2>
            <p className="mb-4 text-lg leading-relaxed text-[#374151]">
              Sneh Dental Clinic has been a trusted name in dental healthcare in Vadodara for{" "}
              <strong>more than 2 Decades</strong>. Founded since 2005, our two conveniently located
              branches — in Nizampura and New Sama — bring high-quality, affordable dental care
              closer to your home. Whether you need a routine dental check-up or
              full mouth rehabilitation, we are your go-to family dentist in Vadodara.
            </p>
            <p className="mb-4 text-lg leading-relaxed text-[#374151]">
              Our clinic is equipped with modern dental technology and a warm, patient-friendly
              environment. From teeth whitening and dental braces to dental implants, root canal
              treatment, crowns, bridges, and dentures — we offer comprehensive dental solutions for
              the entire family, including specialised pediatric dentistry for children.
            </p>
            <p className="text-lg leading-relaxed text-[#374151]">
              At Sneh Dental Clinic, we believe every patient deserves personalised attention and
              pain-free treatment. Our experienced dentists are committed to making your visit
              comfortable and your smile confident. Looking for the best dental clinic near you in
              Vadodara? Book an appointment today.
            </p>
          </div>
        </section>

        <section id="our-services" className="bg-[#F5FAFE] py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-[#0B5E8E] md:text-4xl">Our Services</h2>
              <p className="mt-3 text-base text-[#6B7280]">
                Comprehensive dental solutions under one roof
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {SERVICES.map(({ name, icon }) => (
                <div
                  key={name}
                  className="flex flex-col items-center gap-3 rounded-2xl border border-[#E3EDF6] bg-white p-5 text-center shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-nav"
                >
                  <TreatmentIcon type={icon} label={name} />
                  <p className="text-sm font-semibold text-[#111827]">{name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-[#0B5E8E] md:text-4xl">Meet Our Doctors</h2>
            </div>
            <div className="rounded-2xl border border-[#E3EDF6] bg-white p-8 shadow-card">
              <h3 className="mb-4 text-xl font-bold text-[#073D5F] md:text-2xl">
                Dr. Nehal Shah & Dr. Shweta Shah
              </h3>
              <div className="mb-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-[#EEF6FB] px-3 py-1 text-xs font-semibold text-[#0B5E8E]">
                  Dr. Nehal Shah - B.D.S., D.H.M.S.
                </span>
                <span className="rounded-full bg-[#EEF6FB] px-3 py-1 text-xs font-semibold text-[#0B5E8E]">
                  Dr. Shweta Shah - B.D.S.
                </span>
              </div>
              <p className="mb-6 text-base leading-relaxed text-[#374151]">
                The clinical excellence at Sneh Dental Clinic is led by Dr. Nehal Shah (B.D.S.,
                D.H.M.S.) and Dr. Shweta Shah (B.D.S.). Together, they bring a unique blend of deep
                clinical knowledge and a holistic approach to dental wellness - rooted in precision,
                compassion, and patient-centred care.
              </p>
              <p className="mb-4 text-base font-semibold text-[#0B5E8E]">
                Why Patients Trust Our Doctors:
              </p>
              <ul className="space-y-4">
                {DOCTOR_TRUST_POINTS.map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <span className="mt-[7px] size-2 shrink-0 rounded-full bg-[#0B5E8E]" />
                    <p className="text-sm leading-relaxed text-[#374151]">
                      <strong className="text-[#073D5F]">{item.title}:</strong> {item.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-8 text-center text-sm italic text-[#6B7280]">
              Both doctors available at both branches.
            </p>
          </div>
        </section>

        <BeforeAfterSection onGalleryOpen={openLightbox} />

        {BRANCHES.map((branch) => (
          <BranchSection key={branch.id} branch={branch} onGalleryOpen={openLightbox} />
        ))}
      </main>

      <footer className="bg-[#073D5F] py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 text-white md:grid-cols-3">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <img
                  src={`${BASE}assets/sneh-dental-clinic-logo.png`}
                  alt="Sneh Dental Clinic"
                  className="h-16 w-auto rounded-lg bg-white/95 object-contain p-1.5"
                />
                <div>
                  <p className="text-lg font-bold leading-tight text-white">Sneh Dental Clinic</p>
                  <p className="text-sm font-medium text-white/70">We Create Beautiful Smile</p>
                </div>
              </div>
              <p className="text-base leading-relaxed text-white/65">
                Advanced dental care with a gentle touch. Trusted by thousands of patients in
                Vadodara since 2005.
              </p>
            </div>
            <div>
              <p className="mb-3 text-lg font-semibold text-white">Nizampura Branch</p>
              <p className="mb-2 text-base text-white/65">
                FF-6, Cascade Complex, Nizampura Rd, Vadodara - 390024
              </p>
              <a
                href="tel:+919427899577"
                className="text-base text-white/65 transition-colors hover:text-white"
                aria-label="Call Nizampura Branch at 9427899577"
              >
                9427899577
              </a>
            </div>
            <div>
              <p className="mb-3 text-lg font-semibold text-white">New Sama Branch</p>
              <p className="mb-2 text-base text-white/65">
                2, Sharman Complex, New Sama Rd, Vadodara - 390008
              </p>
              <a
                href="tel:+919409458877"
                className="text-base text-white/65 transition-colors hover:text-white"
                aria-label="Call New Sama Branch at 9409458877"
              >
                9409458877
              </a>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/15 pt-6 text-base text-white/40 sm:flex-row">
            <p>© {new Date().getFullYear()} Sneh Dental Clinic. All rights reserved.</p>
            <p>Best Dental Clinic in Vadodara · Nizampura & New Sama Branches</p>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {whatsappOpen && (
          <div className="w-64 rounded-2xl border border-[#E3EDF6] bg-white p-4 shadow-nav">
            <p className="mb-3 text-sm font-semibold text-[#111827]">Book an Appointment at:</p>
            <div className="space-y-2">
              {BRANCHES.map((branch) => (
                <a
                  key={branch.id}
                  href={`https://wa.me/${branch.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  <WhatsAppIcon size={16} />
                  {branch.title}
                </a>
              ))}
            </div>
            <button
              type="button"
              className="mt-3 w-full py-1 text-center text-xs text-[#9CA3AF] transition-colors hover:text-[#0B5E8E]"
              onClick={() => setWhatsappOpen(false)}
            >
              Close
            </button>
          </div>
        )}
        <button
          type="button"
          className="flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-nav transition-transform hover:scale-110"
          onClick={() => setWhatsappOpen((open) => !open)}
          aria-label="Book appointment via WhatsApp"
        >
          <WhatsAppIcon size={26} />
        </button>
      </div>

      {whatsappOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 cursor-default"
          aria-label="Close appointment menu"
          onClick={() => setWhatsappOpen(false)}
        />
      )}

      <Lightbox state={lightbox} onClose={closeLightbox} onPrev={prevImage} onNext={nextImage} />
    </div>
  );
}



