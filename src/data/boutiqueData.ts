export type OutfitCategory = 'Sarees' | 'Kurtis' | 'Salwar Suits' | 'Unstitched Suits';
export type ImportOrigin = 'Kolkata' | 'Jaipur' | 'Surat';

export interface Product {
  id: string;
  name: string;
  category: OutfitCategory;
  importHub: ImportOrigin;
  craftOrigin: string;
  price: number;
  image: string;
  secondaryNote?: string;
  description: string;
  fabric: string;
  care: string;
  sizes: string[];
  inStock: boolean;
  featuredOrder: number;
}

export interface Review {
  id: string;
  author: string;
  city: string;
  outfitName: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  likes: number;
  dateLabel: string;
  productId: string;
  location: string;
}

export const BOUTIQUE_CONTACT = {
  phoneDisplay: '+91 79854 55942',
  phoneRaw: '7985455942',
  phoneHref: 'tel:+917985455942',
  whatsappDigits: '917985455942',
  address: 'B Blok, 128/2, Kidwai Nagar, Kanpur, Uttar Pradesh 208011',
  email: 'care@srishticollection.in',
  hours: 'Mon – Sat · 10:30 AM to 8:00 PM IST',
};

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${BOUTIQUE_CONTACT.whatsappDigits}?text=${encodeURIComponent(message)}`;
}

export const HERO_IMAGE = '/src/assets/images/hero_srishti_editorial_1794885441852.jpg';

export const PRODUCTS: Product[] = [
  // ================= SAREES (6) =================
  {
    id: 'sc-saree-kanjivaram-emerald',
    name: 'Maragatham Temple-Border Silk Saree',
    category: 'Sarees',
    importHub: 'Kolkata',
    craftOrigin: 'Sourced from Kolkata',
    price: 18400,
    image: '/src/assets/images/saree_kanjivaram_emerald_1794885443031.jpg',
    secondaryNote: 'Handloom Silk',
    description:
      'Sourced from heritage silk houses in Kolkata, woven in three-ply mulberry silk in deep emerald with an antique gold korvai temple border and rich pallu motifs.',
    fabric: '100% Pure Mulberry Silk with Tested Gold Zari',
    care: 'Dry clean only. Store wrapped in unbleached muslin.',
    sizes: ['Free Size (5.5m + 0.9m Blouse)', 'Custom Pre-Pleated'],
    inStock: true,
    featuredOrder: 1,
  },
  {
    id: 'sc-saree-jamdani-crimson-cream',
    name: 'Shantiniketan Crimson-Cream Jamdani Saree',
    category: 'Sarees',
    importHub: 'Kolkata',
    craftOrigin: 'Sourced from Kolkata',
    price: 13800,
    image: '/src/assets/images/saree_jamdani_crimson_cream_1794886590560.jpg',
    secondaryNote: 'Dhakai Jamdani',
    description:
      'Handwoven in Kolkata using the discontinuous supplementary weft technique, pairing an ivory base with sindoor crimson floral geometric motifs and gold borders.',
    fabric: '100-Count Handspun Cotton-Silk Jamdani',
    care: 'Dry clean only.',
    sizes: ['Free Size (5.5m + 0.9m Blouse)', 'Custom Pre-Pleated'],
    inStock: true,
    featuredOrder: 2,
  },
  {
    id: 'sc-saree-patola-sapphire',
    name: 'Rajwadi Sapphire Patola Silk Saree',
    category: 'Sarees',
    importHub: 'Surat',
    craftOrigin: 'Sourced from Surat',
    price: 19600,
    image: '/src/assets/images/saree_patola_sapphire_1794886589601.jpg',
    secondaryNote: 'Royal Jewel Edit',
    description:
      'Sourced from Surat’s master silk weavers in luminous sapphire blue featuring traditional navratna patola motifs and an ornate antique gold zari pallu.',
    fabric: 'Pure Mulberry Patan-Style Silk with Zari Pallu',
    care: 'Specialist dry clean only.',
    sizes: ['Free Size (5.5m + 0.9m Blouse)', 'Custom Pre-Pleated'],
    inStock: true,
    featuredOrder: 3,
  },
  {
    id: 'sc-saree-organza-ivory',
    name: 'Gulab Bagh Hand-Painted Organza Saree',
    category: 'Sarees',
    importHub: 'Kolkata',
    craftOrigin: 'Sourced from Kolkata',
    price: 11900,
    image: '/src/assets/images/saree_organza_ivory_1794885442534.jpg',
    secondaryNote: 'Artisanal Paint',
    description:
      'Featherlight ivory silk organza sourced from Kolkata artisans, adorned with hand-painted botanical motifs and framed by a subtle gold zari border.',
    fabric: 'Pure Silk Organza with Unstitched Raw Silk Blouse',
    care: 'Dry clean only. Steam press on low heat.',
    sizes: ['Free Size (5.5m + 0.9m Blouse)', 'Custom Pre-Pleated'],
    inStock: true,
    featuredOrder: 4,
  },
  {
    id: 'sc-saree-tissue-champagne',
    name: 'Swarna Zari Tissue Silk Saree',
    category: 'Sarees',
    importHub: 'Surat',
    craftOrigin: 'Sourced from Surat',
    price: 21500,
    image: '/src/assets/images/saree_tissue_champagne_1794885445088.jpg',
    secondaryNote: 'Heirloom Edit',
    description:
      'Luminous champagne-gold tissue silk saree crafted in Surat with delicate zari floral jaal brocade and hand-knotted pallu tassels.',
    fabric: 'Pure Katan Silk & Gold Zari Tissue',
    care: 'Dry clean only. Refold along alternate creases every 3 months.',
    sizes: ['Free Size (5.5m + 0.9m Blouse)', 'Custom Pre-Pleated'],
    inStock: true,
    featuredOrder: 5,
  },
  {
    id: 'sc-saree-banarasi-sindoor',
    name: 'Suhag Sindoor Zari Silk Saree',
    category: 'Sarees',
    importHub: 'Kolkata',
    craftOrigin: 'Sourced from Kolkata',
    price: 25000,
    image: '/src/assets/images/hero_srishti_editorial_1794885441852.jpg',
    secondaryNote: 'Signature Campaign',
    description:
      'Our flagship bridal crimson silk saree curated from Kolkata’s heritage textile houses, woven with intricate floral butis in antique gold zari.',
    fabric: '100% Pure Mulberry Katan Silk',
    care: 'Specialist dry clean only.',
    sizes: ['Free Size (5.5m + 0.9m Blouse)', 'Custom Pre-Pleated'],
    inStock: true,
    featuredOrder: 6,
  },

  // ================= KURTIS (6) =================
  {
    id: 'sc-kurti-chanderi-indigo',
    name: 'Neelambari Block-Print Silk Kurti Set',
    category: 'Kurtis',
    importHub: 'Jaipur',
    craftOrigin: 'Sourced from Jaipur',
    price: 4850,
    image: '/src/assets/images/kurti_chanderi_indigo_1794885443609.jpg',
    description:
      'Natural indigo hand-block printed Jaipur silk straight kurti finished with delicate gota patti neckline detailing and ivory cotton-silk trousers.',
    fabric: 'Handloom Silk-Cotton with Soft Mulmul Lining',
    care: 'Gentle hand wash in cold water separately.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    featuredOrder: 7,
  },
  {
    id: 'sc-kurti-bandhani-vermilion',
    name: 'Sindoori Bandhani Silk Straight Kurti',
    category: 'Kurtis',
    importHub: 'Jaipur',
    craftOrigin: 'Sourced from Jaipur',
    price: 4400,
    image: '/src/assets/images/kurti_bandhani_vermilion_1794886590037.jpg',
    secondaryNote: 'Hand-Tied Bandhej',
    description:
      'Crafted by Jaipur’s traditional tie-dye artisans, featuring fine vermilion-red rai bandhej dots, an antique zari placket, and cream straight trousers.',
    fabric: 'Pure Gajji Silk-Blend with Cotton Lining',
    care: 'Dry clean first wash, gentle cold wash thereafter.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    featuredOrder: 8,
  },
  {
    id: 'sc-kurti-kantha-sage',
    name: 'Vanya Sage Kantha Tussar Kurti',
    category: 'Kurtis',
    importHub: 'Kolkata',
    craftOrigin: 'Sourced from Kolkata',
    price: 5250,
    image: '/src/assets/images/kurti_kantha_sage_1794886589708.jpg',
    secondaryNote: 'Hand Kantha',
    description:
      'Crafted in Kolkata on breathable sage-olive tussar silk with delicate hand-stitched Kantha folk motifs across the yoke and cuffs, paired with linen pants.',
    fabric: 'Pure Tussar-Cotton Blend with Hand Kantha',
    care: 'Gentle hand wash in cold water.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    featuredOrder: 9,
  },
  {
    id: 'sc-kurti-gotapatti-coral',
    name: 'Aabha Coral Gota-Patti A-Line Kurti',
    category: 'Kurtis',
    importHub: 'Jaipur',
    craftOrigin: 'Sourced from Jaipur',
    price: 5100,
    image: '/src/assets/images/kurti_gotapatti_coral_1794886591133.jpg',
    description:
      'Crafted in Jaipur, this sunset-coral modal satin A-line kurti features shimmering silver gota patti floral work on the neckline and hem with ivory culottes.',
    fabric: 'Lustrous Modal Satin Silk',
    care: 'Dry clean or gentle cold wash.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    featuredOrder: 10,
  },
  {
    id: 'sc-kurti-zari-plum',
    name: 'Noor Plum Kasab Velvet-Touch Kurti',
    category: 'Kurtis',
    importHub: 'Surat',
    craftOrigin: 'Sourced from Surat',
    price: 6200,
    image: '/src/assets/images/kurti_zari_plum_1794886591677.jpg',
    secondaryNote: 'Winter Festive',
    description:
      'Sourced from Surat, crafted in rich plum-wine micro-silk velvet with intricate gold kasab embroidery on the sleeves and placket plus a matching stole.',
    fabric: 'Micro-Silk Velvet with Antique Zari Embroidery',
    care: 'Dry clean only.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    featuredOrder: 11,
  },
  {
    id: 'sc-kurti-chikankari-rose',
    name: 'Meher Rose Hand-Embroidered Kurti & Palazzo',
    category: 'Kurtis',
    importHub: 'Surat',
    craftOrigin: 'Sourced from Surat',
    price: 5600,
    image: '/src/assets/images/kurti_chikankari_rose_1794885443130.jpg',
    description:
      'Dusty-rose georgette kurti from Surat featuring dense floral thread embroidery, subtle pearl edge detailing, and matching wide-leg palazzo bottoms.',
    fabric: 'Pure Viscose Georgette with Matching Cotton Slip',
    care: 'Gentle cold hand wash or dry clean.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    featuredOrder: 12,
  },

  // ================= SALWAR SUITS (6) =================
  {
    id: 'sc-salwar-anarkali-maroon',
    name: 'Ruhani Zardozi Velvet-Yoke Anarkali Suit',
    category: 'Salwar Suits',
    importHub: 'Jaipur',
    craftOrigin: 'Sourced from Jaipur',
    price: 16200,
    image: '/src/assets/images/salwar_anarkali_maroon_1794885442866.jpg',
    secondaryNote: 'Limited Atelier Run',
    description:
      'Twenty-four-panel flared sindoor maroon raw silk Anarkali crafted at our Jaipur atelier, hand-embroidered with fine dabka and zardozi work and paired with a scalloped net dupatta.',
    fabric: 'Pure Silk & Tulle Dupatta with Hand Zardozi',
    care: 'Specialist dry clean only.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    featuredOrder: 13,
  },
  {
    id: 'sc-salwar-patiala-teal',
    name: 'Noorani Peacock-Teal Patiala Salwar Suit',
    category: 'Salwar Suits',
    importHub: 'Jaipur',
    craftOrigin: 'Sourced from Jaipur',
    price: 9400,
    image: '/src/assets/images/salwar_patiala_teal_1794885974246.jpg',
    secondaryNote: 'Festive Patiala Set',
    description:
      'Crafted in Jaipur with a finely embroidered peacock-teal silk kurta, deeply pleated traditional Patiala salwar, and a vibrant phulkari-inspired embroidered dupatta.',
    fabric: 'Pure Viscose Silk with Multi-Thread Embroidered Dupatta',
    care: 'Dry clean recommended.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    featuredOrder: 14,
  },
  {
    id: 'sc-salwar-palazzo-ivory',
    name: 'Chandni Jamdani Ivory Palazzo Salwar Suit',
    category: 'Salwar Suits',
    importHub: 'Kolkata',
    craftOrigin: 'Sourced from Kolkata',
    price: 11200,
    image: '/src/assets/images/salwar_palazzo_ivory_1794885974387.jpg',
    secondaryNote: 'Kolkata Jamdani Edit',
    description:
      'Handcrafted by master weavers in Kolkata, featuring an ivory straight-cut silk kurta with delicate gold embroidery, flowing palazzo salwar trousers, and a handwoven jamdani dupatta.',
    fabric: 'Pure Tussar-Blend Silk & Handwoven Jamdani Organza',
    care: 'Dry clean only.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    featuredOrder: 15,
  },
  {
    id: 'sc-salwar-zari-lavender',
    name: 'Aabshar Lavender Zari Straight Salwar Suit',
    category: 'Salwar Suits',
    importHub: 'Surat',
    craftOrigin: 'Sourced from Surat',
    price: 8900,
    image: '/src/assets/images/salwar_zari_lavender_1794885975214.jpg',
    description:
      'Curated directly from Surat’s finest embroidery houses, pairing a lilac-lavender silk kurta adorned with silver zari work, tailored cigarette salwar pants, and a scalloped organza dupatta.',
    fabric: 'Lustrous Chinon Silk with Silver Zari Resham Work',
    care: 'Dry clean recommended.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    featuredOrder: 16,
  },
  {
    id: 'sc-salwar-sharara-mustard',
    name: 'Haldi Kesari Mirror-Work Sharara Suit',
    category: 'Salwar Suits',
    importHub: 'Surat',
    craftOrigin: 'Sourced from Surat',
    price: 13600,
    image: '/src/assets/images/salwar_sharara_mustard_1794885444830.jpg',
    description:
      'Curated from Surat, this luminous ochre-mustard silk kurta and wide-flared sharara salwar set is embellished with mirror-work, resham florals, and a sheer organza dupatta.',
    fabric: 'Pure Gajji Silk & Organza Dupatta',
    care: 'Dry clean recommended.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    featuredOrder: 17,
  },
  {
    id: 'sc-salwar-angarkha-jade',
    name: 'Meenakari Jade Silk Angarkha Salwar Suit',
    category: 'Salwar Suits',
    importHub: 'Jaipur',
    craftOrigin: 'Sourced from Jaipur',
    price: 12400,
    image: '/src/assets/images/salwar_angarkha_jade_1794886592010.jpg',
    secondaryNote: 'Artisan Angarkha',
    description:
      'Crafted in Jaipur, tailored in mint-jade Chanderi silk with a wrap Angarkha silhouette, handcrafted gota tassel tie-ups, churidar salwar, and floral organza dupatta.',
    fabric: 'Pure Chanderi Silk & Floral Zari Organza',
    care: 'Dry clean only.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    featuredOrder: 18,
  },

  // ================= UNSTITCHED SUITS (6) =================
  {
    id: 'sc-unstitched-jamdani-peach',
    name: 'Gulnaar Peach Jamdani Unstitched Suit Set',
    category: 'Unstitched Suits',
    importHub: 'Kolkata',
    craftOrigin: 'Sourced from Kolkata',
    price: 5800,
    image: '/src/assets/images/unstitched_jamdani_peach_1794886592171.jpg',
    secondaryNote: '3-Piece Material',
    description:
      'Woven in Kolkata, this three-piece unstitched dress material set features a woven peach-blush Jamdani kurta length (2.5m), soft silk salwar fabric (2.5m), and embroidered organza dupatta (2.4m).',
    fabric: 'Handwoven Jamdani Cotton-Silk & Embroidered Organza',
    care: 'Dry clean recommended.',
    sizes: ['Unstitched Set (2.5m + 2.5m + 2.4m)'],
    inStock: true,
    featuredOrder: 19,
  },
  {
    id: 'sc-unstitched-chanderi-emerald',
    name: 'Panna Zari Scalloped Silk Unstitched Suit',
    category: 'Unstitched Suits',
    importHub: 'Surat',
    craftOrigin: 'Sourced from Surat',
    price: 6900,
    image: '/src/assets/images/unstitched_chanderi_emerald_1794886592457.jpg',
    secondaryNote: 'Scalloped Dupatta',
    description:
      'Sourced from Surat’s weaving studios, offering an emerald silk-zari woven kurta piece with rich damask borders, solid shantoon bottom fabric, and a scalloped zari dupatta.',
    fabric: 'Banarasi-Weave Silk Blend & Shantoon Bottom',
    care: 'Dry clean only.',
    sizes: ['Unstitched Set (2.5m + 2.5m + 2.4m)'],
    inStock: true,
    featuredOrder: 20,
  },
  {
    id: 'sc-unstitched-sanganeri-ivory',
    name: 'Sanganer Botanical Kota-Doria Unstitched Suit',
    category: 'Unstitched Suits',
    importHub: 'Jaipur',
    craftOrigin: 'Sourced from Jaipur',
    price: 4000,
    image: '/src/assets/images/unstitched_sanganeri_ivory_1794886592878.jpg',
    secondaryNote: 'Natural Dyes',
    description:
      'Hand-carved wooden block-printed ivory cotton-silk kurta fabric paired with indigo dabu-printed salwar cloth and a featherlight gold-bordered Kota Doria dupatta from Jaipur.',
    fabric: 'Pure Mulberry Cotton-Silk & Handloom Kota Doria',
    care: 'Gentle hand wash in cold water.',
    sizes: ['Unstitched Set (2.5m + 2.5m + 2.4m)'],
    inStock: true,
    featuredOrder: 21,
  },
  {
    id: 'sc-unstitched-zari-wine',
    name: 'Shahi Wine Raw-Silk Zari Unstitched Suit',
    category: 'Unstitched Suits',
    importHub: 'Surat',
    craftOrigin: 'Sourced from Surat',
    price: 7400,
    image: '/src/assets/images/unstitched_zari_wine_1794886593207.jpg',
    secondaryNote: 'Bridal Trousseau',
    description:
      'Sourced from Surat, crafted in deep wine-burgundy raw silk with ornate gold zari neckline embroidery ready for custom tailoring, matched with plain silk salwar fabric and embroidered net dupatta.',
    fabric: 'Heavy Raw Silk & Embroidered Tulle Dupatta',
    care: 'Dry clean only.',
    sizes: ['Unstitched Set (2.5m + 2.5m + 2.4m)'],
    inStock: true,
    featuredOrder: 22,
  },
  {
    id: 'sc-unstitched-bandhej-saffron',
    name: 'Kesariya Bandhej Silk Unstitched Suit',
    category: 'Unstitched Suits',
    importHub: 'Jaipur',
    craftOrigin: 'Sourced from Jaipur',
    price: 6400,
    image: '/src/assets/images/unstitched_bandhej_saffron_1794886594651.jpg',
    description:
      'Crafted in Jaipur, combining marigold-saffron hand-tied Bandhani silk kurta fabric finished with gota border, plain saffron salwar material, and a contrasting crimson bandhej dupatta.',
    fabric: 'Pure Gajji Silk Bandhani with Gota Border',
    care: 'Dry clean only.',
    sizes: ['Unstitched Set (2.5m + 2.5m + 2.4m)'],
    inStock: true,
    featuredOrder: 23,
  },
  {
    id: 'sc-unstitched-tussar-charcoal',
    name: 'Tussar Madhubani Hand-Painted Unstitched Suit',
    category: 'Unstitched Suits',
    importHub: 'Kolkata',
    craftOrigin: 'Sourced from Kolkata',
    price: 7800,
    image: '/src/assets/images/unstitched_tussar_charcoal_1794886595373.jpg',
    secondaryNote: 'Artisan Handloom',
    description:
      'Sourced from Kolkata, featuring a smoky charcoal handloom tussar kurta length with hand-painted floral border art, beige silk bottom cloth, and a woven gold-border tussar dupatta.',
    fabric: '100% Handloom Ghicha-Tussar Silk',
    care: 'Dry clean only.',
    sizes: ['Unstitched Set (2.5m + 2.5m + 2.4m)'],
    inStock: true,
    featuredOrder: 24,
  },
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Ananya Deshmukh',
    city: 'Pune',
    outfitName: 'Maragatham Temple-Border Silk Saree',
    rating: 5,
    date: 'October 2026',
    comment:
      'Wore the emerald Kolkata silk saree for my sister’s wedding reception. The zari weight and silk drape felt authentically heirloom-grade, and custom pre-pleating saved me hours on the morning of the ceremony.',
    verified: true,
  },
  {
    id: 'rev-2',
    author: 'Meera Krishnan',
    city: 'Bengaluru',
    outfitName: 'Neelambari Block-Print Silk Kurti Set',
    rating: 5,
    date: 'October 2026',
    comment:
      'Ordered size M of this Jaipur kurti set for Diwali office celebrations. The mulmul lining makes it effortless to wear all day in humid weather, and the indigo dye held zero bleed after the first wash.',
    verified: true,
  },
  {
    id: 'rev-3',
    author: 'Rhea Kapoor',
    city: 'Kanpur',
    outfitName: 'Ruhani Zardozi Velvet-Yoke Anarkali Suit',
    rating: 5,
    date: 'September 2026',
    comment:
      'Visited the Kidwai Nagar boutique and also ordered on WhatsApp. The twenty-four-panel Jaipur Anarkali flare moves gracefully and the zardozi bodice arrived immaculately finished.',
    verified: true,
  },
  {
    id: 'rev-4',
    author: 'Priyanka Chatterjee',
    city: 'Kolkata',
    outfitName: 'Sanganer Botanical Kota-Doria Unstitched Suit',
    rating: 5,
    date: 'September 2026',
    comment:
      'The 2.5-metre unstitched suit lengths are super generous even for tall sleeves, and the Kota Doria dupatta has crisp hand-blocked florals straight from Jaipur.',
    verified: true,
  },
];

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'ig-1',
    image: '/src/assets/images/hero_srishti_editorial_1794885441852.jpg',
    caption:
      'Golden hour in our flagship Suhag Sindoor Zari Silk Saree, curated from Kolkata’s heirloom silk weavers for bridal and festive trousseaus.',
    likes: 1428,
    dateLabel: '2 days ago',
    productId: 'sc-saree-banarasi-sindoor',
    location: 'Kolkata Heritage Weaves',
  },
  {
    id: 'ig-2',
    image: '/src/assets/images/salwar_patiala_teal_1794885974246.jpg',
    caption:
      'Fresh off our Jaipur atelier dispatch: the Noorani Peacock-Teal Patiala Salwar Suit paired with an intricately embroidered phulkari dupatta.',
    likes: 1104,
    dateLabel: '4 days ago',
    productId: 'sc-salwar-patiala-teal',
    location: 'Jaipur Atelier',
  },
  {
    id: 'ig-3',
    image: '/src/assets/images/unstitched_sanganeri_ivory_1794886592878.jpg',
    caption:
      'New Unstitched Suits collection is live! Tailor your exact fit with our Jaipur Sanganeri block-print cotton-silk & Kota Doria three-piece sets.',
    likes: 1256,
    dateLabel: '6 days ago',
    productId: 'sc-unstitched-sanganeri-ivory',
    location: 'Kidwai Nagar Flagship, Kanpur',
  },
  {
    id: 'ig-4',
    image: '/src/assets/images/salwar_palazzo_ivory_1794885974387.jpg',
    caption:
      'Quiet luxury in ivory and antique gold. Our Kolkata Jamdani Palazzo Salwar Suit brings effortless grace to daytime celebrations.',
    likes: 962,
    dateLabel: '2 weeks ago',
    productId: 'sc-salwar-palazzo-ivory',
    location: 'Kolkata Textile Collective',
  },
];

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
