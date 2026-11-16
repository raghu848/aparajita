import { CoutureLook, CraftDetail, Hotspot, SalonLocation } from '../types';

export const HERO_IMAGE = "/images/couture_crimson_bridal.jpg";

export const COLLECTION_LOOKS: CoutureLook[] = [
  {
    id: "look-01",
    number: "01",
    title: "THE ROSEWATER NOCTURNE",
    subtitle: "Hand-finished couture in beaten silver-gilt marodi",
    silhouette: "Flared Kalidar Lehenga & Sculpted Choli",
    fabric: "Crushed Mulberry Silk Tissue & Hand-reeled Organza",
    craftsmanship: "Marodi embroidery with micro-dabka, kasab wire, and seed pearls",
    hours: 3200,
    image: "/images/couture_ivory_pearl.jpg",
    quote: "A dialogue between the ephemeral delicacy of rosewater and the permanence of beaten gold.",
    details: [
      "Twelve-panel kalidar cut for fluid runway movement",
      "Antique beaten zari borders hand-set by master craftsmen",
      "Sheer organza veil bordered in heritage scalloped gotta patti"
    ]
  },
  {
    id: "look-02",
    number: "02",
    title: "THE IVORY SEED HEIRLOOM",
    subtitle: "Antique zardozi & natural Basra pearl embroidery",
    silhouette: "Draped Asymmetric Saree with Architectural Pallu",
    fabric: "Vintage Chanderi Silk Tissue & Metallic Weave",
    craftsmanship: "Needleworked zardozi, beaten sequins, and micro-pearl jaal",
    hours: 4100,
    image: "/images/couture_bridal_motion.jpg",
    quote: "An homage to the courtly drapes of 18th-century Awadh, refined for contemporary silhouettes.",
    details: [
      "Over 12,000 hand-sewn Basra-grade river pearls",
      "Pleated metallic zari pallu that cascades like liquid silver",
      "Corseted interior bodice for modern ease and sculptural posture"
    ]
  },
  {
    id: "look-03",
    number: "03",
    title: "THE SAFFRON REGALIA",
    subtitle: "Handwoven Banarasi katan silk lehenga with heritage flora",
    silhouette: "Traditional Bridal Lehenga with Dual Sheer Dupattas",
    fabric: "Pure Banarasi Katan Silk & Tissue Organza",
    craftsmanship: "Kadhwa handloom weaving with real silver zari and meenakari highlights",
    hours: 4800,
    image: "/images/couture_banarasi_gold.jpg",
    quote: "Heirloom craftsmanship woven on handlooms that have stood in Varanasi for three generations.",
    details: [
      "Intertwined floral shikargah motifs woven with pure silver wire",
      "Weighted velvet borders inlaid with ruby-red micro-piping",
      "Weightless dual dupattas designed to float with every stride"
    ]
  },
  {
    id: "look-04",
    number: "04",
    title: "THE EMERALD DYNASTY",
    subtitle: "Midnight emerald velvet with 16th-century Mughal jaal",
    silhouette: "Sculptural Floor-length Angrakha & Silk Sharara",
    fabric: "Hand-dyed Silk Velvet & Chanderi Brocade",
    craftsmanship: "Dense aari work, beaten bullion wire, and uncut crystal embellishments",
    hours: 3600,
    image: "/images/couture_emerald_velvet.jpg",
    quote: "Rich, enveloping textures that command presence while remaining whisper-light to wear.",
    details: [
      "Velvet woven exclusively in Kashmir on heritage wooden looms",
      "Sleeves articulated with micro-zardozi vines and antique tassels",
      "Sculpted neckline designed to frame high heirloom polki collars"
    ]
  }
];

export const SIGNATURE_HOTSPOTS: Hotspot[] = [
  {
    id: "hotspot-1",
    x: 48,
    y: 28,
    title: "DECOLLETAGE EMBROIDERY",
    description: "Intricate micro-zardozi neckline hand-stitched using 98.5% pure silver-gilt wire and antique dabka.",
    technique: "Antique Dabka & Beaten Marodi"
  },
  {
    id: "hotspot-2",
    x: 68,
    y: 45,
    title: "DRAPED VEIL IN TISSUE ORGANZA",
    description: "Air-spun tissue organza woven with whisper-thin metallic weft, finished with hand-scalloped pearl edging.",
    technique: "Scalloped Pearl Purl & Cut-dana"
  },
  {
    id: "hotspot-3",
    x: 38,
    y: 72,
    title: "TWELVE-KALIDAR HEMLINE",
    description: "Twelve individually patterned panels hand-beaded with Mughal shikargah motifs, creating a 360-degree liquid fall.",
    technique: "360° Handloom Brocade Inlay"
  }
];

export const HORIZONTAL_LOOKS: CoutureLook[] = [
  {
    id: "h-01",
    number: "01",
    title: "NOCTURNE LEHENGA",
    subtitle: "Midnight Silk Tissue",
    silhouette: "Grand Bridal Ensemble",
    fabric: "Pure Mulberry Silk",
    craftsmanship: "Marodi & Zardozi",
    hours: 3400,
    image: "/images/couture_crimson_bridal.jpg",
    aspectRatio: "aspect-[3/4]"
  },
  {
    id: "h-02",
    number: "02",
    title: "THE BASRA COLLAR",
    subtitle: "High Jewellery & Zardozi",
    silhouette: "Heirloom Portrait Study",
    fabric: "Hand-pleated Chiffon",
    craftsmanship: "Micro-pearl & Jadau",
    hours: 1900,
    image: "/images/couture_jewellery_polki.jpg",
    aspectRatio: "aspect-[4/5]"
  },
  {
    id: "h-03",
    number: "03",
    title: "THE RUNWAY DRAPE",
    subtitle: "Fluid Movement in Motion",
    silhouette: "Sculpted Indo-Western Gown",
    fabric: "Crushed Metallic Lame",
    craftsmanship: "Pleated Liquid Silk",
    hours: 2100,
    image: "/images/couture_runway_lehenga.jpg",
    aspectRatio: "aspect-[9/16]"
  },
  {
    id: "h-04",
    number: "04",
    title: "THE VARANASI KATAN",
    subtitle: "Heritage Saree Drape",
    silhouette: "Royal Six-Yard Drape",
    fabric: "Handloom Banarasi",
    craftsmanship: "Kadhwa Gold Weave",
    hours: 2800,
    image: "/images/couture_saree_royal.jpg",
    aspectRatio: "aspect-[3/4]"
  },
  {
    id: "h-05",
    number: "05",
    title: "THE ATELIER SILK GRAIN",
    subtitle: "Extreme Textile Focus",
    silhouette: "Craft Macro Composition",
    fabric: "Raw Tussar Silk",
    craftsmanship: "Hand-dyed Mineral Indigo",
    hours: 1600,
    image: "/images/couture_zardozi_macro.jpg",
    aspectRatio: "aspect-[1/1]"
  },
  {
    id: "h-06",
    number: "06",
    title: "THE ROYAL VEIL",
    subtitle: "Whisper-light Gossamer Organza",
    silhouette: "Bridal Veil & Nath Portrait",
    fabric: "Featherweight Tissue",
    craftsmanship: "Mukesh & Sequin Work",
    hours: 2400,
    image: "/images/couture_scallop_dupatta.jpg",
    aspectRatio: "aspect-[3/4]"
  }
];

export const CRAFT_DETAILS: CraftDetail[] = [
  {
    id: "craft-1",
    title: "Zardozi Needlework",
    category: "EMBROIDERY",
    description: "Using curved ari needles, master karigars sew twisted bullion wires (salma), coiled wires (sitara), and beaten silver into silk velvet with mathematical precision.",
    image: "/images/couture_zardozi_macro.jpg",
    karigarTime: "750 Hours per garment",
    provenance: "Old Lucknow Atelier, Uttar Pradesh"
  },
  {
    id: "craft-2",
    title: "Kadhwa Handloom Weave",
    category: "TEXTILE",
    description: "Each motif is individually engraved on punch cards and woven by hand into the warp without any loose threads on the reverse, yielding heirloom softness.",
    image: "/images/couture_handloom_loom.jpg",
    karigarTime: "120 Days on wooden pit-looms",
    provenance: "Ghats of Varanasi, Uttar Pradesh"
  },
  {
    id: "craft-3",
    title: "Basra Pearl Seed Setting",
    category: "EMBELLISHMENT",
    description: "Graded natural freshwater and seed pearls hand-crimped along silk borders using fine silken filaments to create undulating scalloped edges.",
    image: "/images/couture_jewellery_polki.jpg",
    karigarTime: "480 Hours of hand-setting",
    provenance: "Kolkata Master Jewelry Artisans"
  },
  {
    id: "craft-4",
    title: "Architectural Drape & Cut",
    category: "SILHOUETTE",
    description: "Constructed with hidden internal corsetry and mathematical bias-cut godets, ensuring 25-meter flared hems feel virtually weightless on the wearer.",
    image: "/images/couture_corset_angrakha.jpg",
    karigarTime: "85 Hours of pattern engineering",
    provenance: "Atelier Aparajita, Ludhiana"
  }
];

export const ATELIER_CONTACT = {
  name: "Atelier Aparajita",
  company: "JSSG Enterprises",
  phone: "+91 78892 76601",
  rawPhone: "7889276601",
  whatsapp: "+91 78892 76601",
  whatsappLink: "https://wa.me/917889276601",
  email: "jssgenterprises15@gmail.com",
  emailLink: "mailto:jssgenterprises15@gmail.com",
  address: "Building 95A, New Guru Nanak Nagar, Near BCM Kindergarten School, Sector 32A, Chandigarh Road, Ludhiana, Punjab 141015",
  shortAddress: "Building 95A, New Guru Nanak Nagar, Sector 32A, Chandigarh Road, Ludhiana",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Building+95A%2C+New+Guru+Nanak+nagar+near+Bcm+kinder+Garten+school+sector+32A+chd+road+Ludhiana+Punjab+141015"
};

export const SALON_LOCATIONS: SalonLocation[] = [
  {
    city: "Ludhiana",
    country: "India",
    address: "Building 95A, New Guru Nanak Nagar, Near BCM Kindergarten School, Sector 32A, Chandigarh Road, Ludhiana, Punjab 141015",
    appointmentOnly: true,
    phone: "+91 78892 76601",
    email: "jssgenterprises15@gmail.com",
    whatsapp: "+91 78892 76601",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Building+95A%2C+New+Guru+Nanak+nagar+near+Bcm+kinder+Garten+school+sector+32A+chd+road+Ludhiana+Punjab+141015",
    isFlagship: true
  }
];
