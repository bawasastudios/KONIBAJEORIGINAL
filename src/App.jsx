import React, { useState, useMemo, useEffect } from "react";
import {
  Search, User, Heart, ShoppingBag, Menu, X, ChevronDown,
  Plus, Minus, Instagram, Facebook, Check, Truck, RotateCcw,
  ShieldCheck, ArrowUpRight
} from "lucide-react";

/* ------------------------------------------------------------------
   KONIBAJE ORIGINALS — design tokens
   Palette:
     --ink       #171310  (near-black warm charcoal — body text / nav)
     --bone      #EDE7DB  (warm off-white — page ground)
     --indigo    #202A52  (adire indigo — primary accent, CTAs, links)
     --indigo-2  #384483  (lighter indigo — hovers)
     --clay      #A8461F  (red-earth / dye clay — sparing use: sale, tags)
     --line      #D8D0BE  (hairline rule on bone)
   Type:
     display  — 'Anton'            (tall condensed grotesk, headlines)
     body     — 'Space Grotesk'    (neutral geometric sans, body/UI)
     mono     — 'IBM Plex Mono'    (tag/label/price utility face)
   Signature: garment-tag motifs — dashed tear-lines, mono uppercase
   tags, and a hand-drawn-style adire resist-dye zigzag rule used as a
   section divider.
------------------------------------------------------------------- */

const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
`;

const TOKENS = `
  :root{
    --ink:#171310; --bone:#EDE7DB; --bone-2:#E4DCC9; --indigo:#202A52;
    --indigo-2:#384483; --clay:#A8461F; --line:#D8D0BE; --white:#FAF8F2;
  }
  .kj-root{ background:var(--bone); color:var(--ink); font-family:'Space Grotesk',sans-serif; }
  .kj-display{ font-family:'Anton',sans-serif; letter-spacing:0.01em; text-transform:uppercase; }
  .kj-mono{ font-family:'IBM Plex Mono',monospace; letter-spacing:0.06em; }
  .kj-tear{
    background-image: repeating-linear-gradient(90deg, var(--line) 0 10px, transparent 10px 18px);
    height:1px; width:100%;
  }
  .kj-zigzag{
    height:10px; width:100%;
    background: linear-gradient(135deg, var(--indigo) 25%, transparent 25%) -5px 0,
                linear-gradient(225deg, var(--indigo) 25%, transparent 25%) -5px 0,
                linear-gradient(315deg, var(--indigo) 25%, transparent 25%) 0 0,
                linear-gradient(45deg, var(--indigo) 25%, transparent 25%) 0 0;
    background-size: 10px 10px;
    opacity:0.9;
  }
  .kj-photo{ filter: sepia(0.18) saturate(0.85) contrast(1.03); transition: filter .5s ease, transform .7s cubic-bezier(.2,.7,.2,1); }
  .kj-photo-wrap:hover .kj-photo{ filter: sepia(0) saturate(1.05) contrast(1.02); transform: scale(1.045); }
  .kj-fade-up{ animation: kjFadeUp .7s cubic-bezier(.2,.7,.2,1) both; }
  @keyframes kjFadeUp{ from{ opacity:0; transform: translateY(18px);} to{opacity:1; transform:none;} }
  .kj-underline{ position:relative; }
  .kj-underline::after{ content:""; position:absolute; left:0; right:0; bottom:-3px; height:1px; background:var(--ink); transform: scaleX(0); transform-origin:left; transition: transform .35s ease; }
  .kj-underline:hover::after{ transform: scaleX(1); }
  .kj-btn-ink{ background:var(--ink); color:var(--bone); }
  .kj-btn-ink:hover{ background:var(--indigo); }
  .kj-scrollbar-none::-webkit-scrollbar{ display:none; }
  .kj-scrollbar-none{ -ms-overflow-style:none; scrollbar-width:none; }
  @media (prefers-reduced-motion: reduce){
    .kj-fade-up{ animation:none; }
    .kj-photo{ transition:none; }
  }
`;

/* ------------------------------- DATA ------------------------------- */

const CATEGORIES = [
  { id: "tshirts", name: "T-Shirts", img: "https://picsum.photos/seed/kj-cat-tee/600/750" },
  { id: "hoodies", name: "Hoodies", img: "https://picsum.photos/seed/kj-cat-hood/600/750" },
  { id: "jerseys", name: "Jerseys", img: "https://picsum.photos/seed/kj-cat-jersey/600/750" },
  { id: "pants", name: "Pants", img: "https://picsum.photos/seed/kj-cat-pants/600/750" },
  { id: "jackets", name: "Jackets", img: "https://picsum.photos/seed/kj-cat-jacket/600/750" },
  { id: "accessories", name: "Accessories", img: "https://picsum.photos/seed/kj-cat-acc/600/750" },
];

const COLORS = [
  { id: "indigo", name: "Indigo", hex: "#202A52" },
  { id: "clay", name: "Clay", hex: "#A8461F" },
  { id: "bone", name: "Bone", hex: "#E4DCC9" },
  { id: "ink", name: "Ink Black", hex: "#171310" },
  { id: "olive", name: "Olive", hex: "#5C5A34" },
];

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

function makeProduct(id, name, category, price, seed, colorIds, tag) {
  const localImages = {
    B1: "/products/B1.jpeg",
    B5: "/products/B5.png",
    HXHH: "/products/HXHH.jpeg",
    SE: "/products/SE.jpeg",
    SSDD: "/products/SSDD.jpeg",
    "freepik_edit_": "/products/freepik_edit_.jpeg",
  };

  const localImage = localImages[seed];

  return {
    id,
    name,
    category,
    price,
    tag: tag || null,
    colors: colorIds,
    sizes: SIZES,
    images: localImage
      ? [localImage, localImage, localImage]
      : [
          `https://picsum.photos/seed/${seed}-a/900/1150`,
          `https://picsum.photos/seed/${seed}-b/900/1150`,
          `https://picsum.photos/seed/${seed}-c/900/1150`,
        ],
  };
}
    ],
    description:
      "Cut from heavyweight cotton and finished with reinforced stitching, this piece is built for daily wear and designed to move with you. Part of the current Konibaje Originals collection.",
    details: [
      "100% heavyweight cotton",
      "Garment-dyed for depth of colour",
      "Reinforced seams, ribbed trims",
      "Designed in-house, made to last",
    ],
  };
}

const PRODUCTS = [
  makeProduct(1, "Adire Wave Tee", "tshirts", 28000, "kj-p1", ["indigo","bone","ink"], "NEW"),
  makeProduct(2, "Origin Heavyweight Hoodie", "hoodies", 52000, "kj-p2", ["ink","olive","clay"], "NEW"),
  makeProduct(3, "Konibaje Crest Jersey", "jerseys", 41000, "kj-p3", ["indigo","clay"], null),
  makeProduct(4, "Motherland Cargo Pants", "pants", 47000, "kj-p4", ["ink","olive"], null),
  makeProduct(5, "Harmattan Bomber Jacket", "jackets", 78000, "kj-p5", ["ink","indigo"], "NEW"),
  makeProduct(6, "Resist-Dye Beanie", "accessories", 12000, "kj-p6", ["indigo","clay","bone"], null),
  makeProduct(7, "Lagos Nights Tee", "tshirts", 28000, "kj-p7", ["ink","clay"], null),
  makeProduct(8, "Built Different Hoodie", "hoodies", 54000, "kj-p8", ["bone","ink"], null),
  makeProduct(9, "Ancestral Track Jacket", "jackets", 69000, "kj-p9", ["olive","ink"], null),
  makeProduct(10, "Second Skin Joggers", "pants", 39000, "kj-p10", ["ink","indigo"], null),
  makeProduct(11, "Tribe Graphic Tee", "tshirts", 29000, "kj-p11", ["bone","clay"], "NEW"),
  makeProduct(12, "Woven Crossbody Bag", "accessories", 34000, "kj-p12", ["ink","olive"], null),
  makeProduct(13, "Konibaje Originals Mago Spoot Tee", "tshirts", 35000, "B1.jpeg", ["indigo"], "NEW"),
makeProduct(14, "Konibaje Originals Classic Tee", "tshirts", 50000, "B5.jpeg", ["bone"], "NEW"),
makeProduct(15, "Konibaje Originals Double Six Pink Tee", "tshirts", 50000, "HXHH.jpeg", ["pink"], "NEW"),
makeProduct(16, "Konibaje Originals Double Six White Tee", "tshirts", 35000, "SE.jpeg", ["bone"], "NEW"),
makeProduct(17, "Konibaje Originals Mago Spoot Black Tee", "tshirts", 35000, "SSDD.jpeg", ["ink"], "NEW"),
makeProduct(18, "Konibaje Originals Renaissance Tee", "tshirts", 35000, "freepik_edit_.jpeg", ["ink"], "NEW"),
  makeProduct(19, "Konibaje Originals Mago Spoot Tee", "tshirts", 35000, "B1.jpeg", ["indigo"], "NEW"),
makeProduct(20, "Konibaje Originals Classic Tee", "tshirts", 50000, "B5.jpeg", ["bone"], "NEW"),
makeProduct(21, "Konibaje Originals Double Six Pink Tee", "tshirts", 50000, "HXHH.jpeg", ["pink"], "NEW"),
makeProduct(22, "Konibaje Originals Double Six White Tee", "tshirts", 35000, "SE.jpeg", ["bone"], "NEW"),
makeProduct(23, "Konibaje Originals Mago Spoot Black Tee", "tshirts", 35000, "SSDD.jpeg", ["ink"], "NEW"),
makeProduct(24, "Konibaje Originals Renaissance Tee", "tshirts", 35000, "freepik_edit_.jpeg", ["ink"], "NEW"),enaissance Tee", "tshirts", 35000, "FREEPIK", ["ink"], "NEW"),
];

const money = (n) => "₦" + n.toLocaleString("en-NG");

/* --------------------------- SMALL PIECES --------------------------- */

function TagLabel({ children, tone = "ink" }) {
  const colors = { ink: "text-[var(--ink)] border-[var(--ink)]", clay: "text-white bg-[var(--clay)] border-[var(--clay)]" };
  return (
    <span className={`kj-mono text-[10px] px-2 py-1 border ${colors[tone]} inline-block`}>
      {children}
    </span>
  );
}

function SectionHeading({ eyebrow, title, action }) {
  return (
    <div className="flex items-end justify-between mb-8 md:mb-10">
      <div>
        {eyebrow && <div className="kj-mono text-xs text-[var(--indigo)] mb-2">{eyebrow}</div>}
        <h2 className="kj-display text-3xl md:text-5xl leading-none">{title}</h2>
      </div>
      {action}
    </div>
  );
}

function ZigZagDivider() {
  return <div className="kj-zigzag my-0" aria-hidden="true" />;
}

function ColorDot({ color, selected, onClick, size = "w-6 h-6" }) {
  return (
    <button
      onClick={onClick}
      aria-label={color.name}
      title={color.name}
      className={`${size} rounded-full border transition-all ${selected ? "ring-2 ring-offset-2 ring-[var(--ink)]" : "border-[var(--line)]"}`}
      style={{ backgroundColor: color.hex }}
    />
  );
}

/* ------------------------------ HEADER ------------------------------ */

function Header({ view, setView, cartCount, wishlistCount, onOpenCart, mobileMenuOpen, setMobileMenuOpen, onSearch, searchOpen, setSearchOpen, searchQuery, setSearchQuery }) {
  const navItems = [
    { id: "home", label: "Home" },
    { id: "shop", label: "Shop" },
    { id: "new", label: "New Arrivals" },
    { id: "lookbook", label: "Collections" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];
  return (
    <header className="sticky top-0 z-40 bg-[var(--bone)]/95 backdrop-blur border-b border-[var(--line)]">
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 md:h-20 flex items-center justify-between">
        <button className="md:hidden" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
          <Menu size={22} />
        </button>

        <button onClick={() => setView("home")} className="brand-font-text-lg md:text-2xl tracking-wide">
          KONIBAJE <span className="text-[var(--indigo)]">ORIGINALS</span>
        </button>

        <nav className="hidden md:flex items-center gap-7 kj-mono text-xs">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id === "new" ? { page: "shop", category: "new" } : item.id)}
              className={`kj-underline uppercase ${view === item.id ? "text-[var(--indigo)]" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4 md:gap-5">
          <button aria-label="Search" onClick={() => setSearchOpen(!searchOpen)}>
            <Search size={19} />
          </button>
          <button aria-label="Account" className="hidden sm:block">
            <User size={19} />
          </button>
          <button aria-label="Wishlist" onClick={() => setView("wishlist")} className="relative">
            <Heart size={19} />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 kj-mono text-[9px] bg-[var(--clay)] text-white w-4 h-4 rounded-full flex items-center justify-center">{wishlistCount}</span>
            )}
          </button>
          <button aria-label="Shopping bag" onClick={onOpenCart} className="relative">
            <ShoppingBag size={19} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 kj-mono text-[9px] bg-[var(--indigo)] text-white w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>
            )}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-[var(--line)] bg-[var(--bone)]">
          <div className="max-w-7xl mx-auto px-5 md:px-8 py-3 flex items-center gap-3">
            <Search size={16} className="text-[var(--ink)]/50" />
            <input
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { onSearch(); } }}
              placeholder="Search products…"
              className="flex-1 bg-transparent outline-none kj-mono text-sm"
            />
            <button onClick={onSearch} className="kj-mono text-xs uppercase kj-underline">Search</button>
            <button onClick={() => setSearchOpen(false)} aria-label="Close search"><X size={16} /></button>
          </div>
        </div>
      )}

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-[82%] max-w-xs bg-[var(--bone)] p-6 flex flex-col kj-fade-up">
            <div className="flex items-center justify-between mb-10">
              <span className="kj-display text-lg">MENU</span>
              <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu"><X size={22} /></button>
            </div>
            <nav className="flex flex-col gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setView(item.id === "new" ? "shop" : item.id); setMobileMenuOpen(false); }}
                  className="kj-display text-2xl text-left"
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="mt-auto pt-8 border-t border-[var(--line)] flex gap-5">
              <Instagram size={20} /><Facebook size={20} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* ----------------------------- PRODUCT CARD ----------------------------- */

function ProductCard({ product, onOpen, onQuickView, onToggleWishlist, isWishlisted }) {
  const [hover, setHover] = useState(false);
  return (
    <div className="group kj-fade-up">
      <div
        className="relative aspect-[4/5] overflow-hidden bg-[var(--bone-2)] kj-photo-wrap cursor-pointer"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => onOpen(product)}
      >
        <img
          src={hover ? product.images[1] : product.images[0]}
          alt={product.name}
          className="kj-photo w-full h-full object-cover"
          loading="lazy"
        />
        {product.tag && (
          <div className="absolute top-3 left-3"><TagLabel tone="clay">{product.tag}</TagLabel></div>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }}
          aria-label="Add to wishlist"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[var(--bone)]/90 flex items-center justify-center"
        >
          <Heart size={15} fill={isWishlisted ? "var(--clay)" : "none"} color={isWishlisted ? "var(--clay)" : "var(--ink)"} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
          className="absolute left-0 right-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 kj-btn-ink kj-mono text-[11px] uppercase py-2.5 text-center"
        >
          Quick View
        </button>
      </div>
      <div className="pt-3">
        <div className="flex items-start justify-between gap-2">
          <button onClick={() => onOpen(product)} className="kj-underline text-sm md:text-[15px] font-medium text-left">{product.name}</button>
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <span className="kj-mono text-sm">{money(product.price)}</span>
          <div className="flex gap-1">
            {product.colors.slice(0, 4).map((cid) => {
              const c = COLORS.find((x) => x.id === cid);
              return <span key={cid} className="w-3 h-3 rounded-full border border-[var(--line)]" style={{ backgroundColor: c.hex }} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ QUICK VIEW ------------------------------ */

function QuickViewModal({ product, onClose, onAddToCart }) {
  const [size, setSize] = useState(product.sizes[2]);
  const [color, setColor] = useState(product.colors[0]);
  if (!product) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-[var(--bone)] max-w-3xl w-full grid grid-cols-1 md:grid-cols-2 kj-fade-up max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-[var(--bone)] flex items-center justify-center border border-[var(--line)]"><X size={16} /></button>
        <div className="aspect-[4/5] bg-[var(--bone-2)]">
          <img src={product.images[0]} className="kj-photo w-full h-full object-cover" alt={product.name} />
        </div>
        <div className="p-6 md:p-8 flex flex-col">
          <div className="kj-mono text-xs text-[var(--indigo)] mb-2 uppercase">{product.category}</div>
          <h3 className="kj-display text-2xl mb-2">{product.name}</h3>
          <div className="kj-mono text-base mb-4">{money(product.price)}</div>
          <p className="text-sm text-[var(--ink)]/70 mb-5">{product.description}</p>

          <div className="mb-4">
            <div className="kj-mono text-[11px] uppercase mb-2">Colour</div>
            <div className="flex gap-2">
              {product.colors.map((cid) => {
                const c = COLORS.find((x) => x.id === cid);
                return <ColorDot key={cid} color={c} selected={color === cid} onClick={() => setColor(cid)} />;
              })}
            </div>
          </div>

          <div className="mb-6">
            <div className="kj-mono text-[11px] uppercase mb-2">Size</div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button key={s} onClick={() => setSize(s)} className={`kj-mono text-xs w-10 h-10 border ${size === s ? "kj-btn-ink" : "border-[var(--line)]"}`}>{s}</button>
              ))}
            </div>
          </div>

          <button
            onClick={() => { onAddToCart(product, size, color, 1); onClose(); }}
            className="kj-btn-ink kj-mono text-xs uppercase py-3.5 mt-auto"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- HOME -------------------------------- */

function Home({ setView, openProduct, onAddToCart, onToggleWishlist, wishlist, onQuickView }) {
  const featured = PRODUCTS.slice(0, 4);
  const newArrivals = PRODUCTS.slice(4, 10);
  return (
    <div>
      {/* HERO */}
      <section className="relative h-[86vh] min-h-[560px] overflow-hidden">
        <img
          src="https://picsum.photos/seed/kj-hero-main/1600/1200"
          alt="Konibaje Originals editorial"
          className="absolute inset-0 w-full h-full object-cover kj-photo"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/85 via-[var(--ink)]/20 to-transparent" />
        <div className="relative h-full max-w-7xl mx-auto px-5 md:px-8 flex flex-col justify-end pb-14 md:pb-20">
          <div className="kj-fade-up">
            <div className="kj-mono text-[11px] text-[var(--bone)]/80 mb-4 uppercase">Konibaje Originals — Est. Culture, Worn Daily</div>
            <h1 className="kj-display text-[13vw] leading-[0.85] md:text-8xl text-[var(--bone)] mb-6">
              Wear Your<br />Identity.
            </h1>
            <p className="text-[var(--bone)]/85 max-w-md mb-8 text-sm md:text-base">
              Contemporary streetwear inspired by culture, creativity and individuality.
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => setView("shop")} className="kj-mono text-xs uppercase px-7 py-3.5 bg-[var(--bone)] text-[var(--ink)] hover:bg-[var(--indigo)] hover:text-[var(--bone)] transition-colors">
                Shop Collection
              </button>
              <button onClick={() => setView("about")} className="kj-mono text-xs uppercase px-7 py-3.5 border border-[var(--bone)] text-[var(--bone)] hover:bg-[var(--bone)] hover:text-[var(--ink)] transition-colors">
                Explore Konibaje
              </button>
            </div>
          </div>
        </div>
      </section>

      <ZigZagDivider />

      {/* FEATURED COLLECTION */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-24">
        <SectionHeading
          eyebrow="Season 04"
          title="The Latest Drop"
          action={<button onClick={() => setView("shop")} className="hidden md:flex items-center gap-1 kj-mono text-xs uppercase kj-underline">View All <ArrowUpRight size={14} /></button>}
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
          {featured.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onOpen={openProduct}
              onQuickView={onQuickView}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlist.includes(p.id)}
            />
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="bg-[var(--bone-2)] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <SectionHeading eyebrow="Shop By" title="Category" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setView({ page: "shop", category: c.id })}
                className="relative aspect-[4/5] overflow-hidden group kj-photo-wrap"
              >
                <img src={c.img} className="kj-photo w-full h-full object-cover" alt={c.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/70 to-transparent" />
                <div className="absolute bottom-4 left-4 kj-display text-white text-xl md:text-2xl">{c.name}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND STATEMENT */}
      <section className="max-w-5xl mx-auto px-5 md:px-8 py-20 md:py-28 text-center">
        <div className="kj-mono text-xs text-[var(--indigo)] mb-4 uppercase">The Philosophy</div>
        <h2 className="kj-display text-4xl md:text-6xl mb-6 leading-[0.95]">Built Different.</h2>
        <p className="text-base md:text-lg text-[var(--ink)]/75 max-w-2xl mx-auto">
          Konibaje Originals represents individuality, culture and creative expression through
          contemporary fashion. Every piece is designed for people who choose to stand apart.
        </p>
      </section>

      <ZigZagDivider />

      {/* NEW ARRIVALS */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-24">
        <SectionHeading eyebrow="Just In" title="New Arrivals" />
        <div className="flex gap-5 md:gap-8 overflow-x-auto kj-scrollbar-none pb-2 -mx-5 px-5 md:mx-0 md:px-0 md:grid md:grid-cols-6">
          {newArrivals.map((p) => (
            <div key={p.id} className="min-w-[46%] sm:min-w-[30%] md:min-w-0">
              <ProductCard
                product={p}
                onOpen={openProduct}
                onQuickView={onQuickView}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlist.includes(p.id)}
              />
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button onClick={() => setView("shop")} className="kj-mono text-xs uppercase px-7 py-3.5 border border-[var(--ink)] hover:kj-btn-ink hover:bg-[var(--ink)] hover:text-[var(--bone)] transition-colors">
            View All Products
          </button>
        </div>
      </section>

      {/* LOOKBOOK */}
      <section className="bg-[var(--ink)] text-[var(--bone)] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="kj-mono text-xs text-[var(--bone)]/60 mb-2 uppercase">Season 04</div>
              <h2 className="kj-display text-3xl md:text-5xl">The Lookbook</h2>
            </div>
            <button onClick={() => setView("lookbook")} className="kj-mono text-xs uppercase kj-underline hidden md:block">Explore Lookbook</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {["kj-look-1","kj-look-2","kj-look-3","kj-look-4","kj-look-5","kj-look-6"].map((seed, i) => (
              <div key={seed} className={`overflow-hidden kj-photo-wrap ${i === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-auto" : "aspect-[4/5]"}`}>
                <img src={`https://picsum.photos/seed/${seed}/900/1100`} className="kj-photo w-full h-full object-cover" alt="Lookbook editorial" />
              </div>
            ))}
          </div>
          <button onClick={() => setView("lookbook")} className="kj-mono text-xs uppercase px-7 py-3.5 border border-[var(--bone)] mt-8 md:hidden">Explore Lookbook</button>
        </div>
      </section>

      {/* NEWSLETTER */}
      <Newsletter />
    </div>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  return (
    <section className="py-16 md:py-24 px-5 md:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="kj-display text-3xl md:text-5xl mb-4">Join The Konibaje World.</h2>
        <p className="text-[var(--ink)]/70 mb-8 text-sm md:text-base">
          Be the first to discover new drops, exclusive releases and everything happening at Konibaje Originals.
        </p>
        {joined ? (
          <div className="kj-mono text-sm text-[var(--indigo)] flex items-center justify-center gap-2"><Check size={16} /> You're on the list.</div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); if (email) setJoined(true); }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 bg-transparent border border-[var(--ink)] px-4 py-3 kj-mono text-sm outline-none focus:border-[var(--indigo)]"
            />
            <button type="submit" className="kj-btn-ink kj-mono text-xs uppercase px-7 py-3">Join Us</button>
          </form>
        )}
      </div>
    </section>
  );
}

/* -------------------------------- SHOP -------------------------------- */

function Shop({ openProduct, onAddToCart, onToggleWishlist, wishlist, initialCategory, onQuickView, searchQuery }) {
  const [category, setCategory] = useState(initialCategory || "all");
  const [sort, setSort] = useState("newest");
  const [priceMax, setPriceMax] = useState(80000);
  const [sizeFilter, setSizeFilter] = useState(null);
  const [colorFilter, setColorFilter] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [query, setQuery] = useState(searchQuery || "");

  useEffect(() => { setCategory(initialCategory || "all"); }, [initialCategory]);
  useEffect(() => { setQuery(searchQuery || ""); }, [searchQuery]);

  const filtered = useMemo(() => {let list = PRODUCTS.filter((p) => p.price <= priceMax);
if (category === "new") {list = list.filter(  (p) => String(p.tag || "").toUpperCase() === "NEW" ); } else if (category !== "all") {list = list.filter((p) => p.category === category);  }
if (sizeFilter) { list = list.filter((p) => p.sizes?.includes(sizeFilter));  }
if (colorFilter) {  list = list.filter((p) => p.colors?.includes(colorFilter));  }
if (query.trim()) {
    const q = query.trim().toLowerCase();
    list = list.filter( (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)   ); }
  if (sort === "price-asc") { list = [...list].sort((a, b) => a.price - b.price);  }
if (sort === "price-desc") {list = [...list].sort((a, b) => b.price - a.price); }
if (sort === "newest") {  list = [...list].sort((a, b) => b.id - a.id); }
if (sort === "bestselling") { list = [...list].sort((a, b) => (b.tag ? 1 : 0) - (a.tag ? 1 : 0));  }

  return list;
}, [category, sort, priceMax, sizeFilter, colorFilter, query]);

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-10 md:py-14">
      <div className="mb-8">
        <div className="kj-mono text-xs text-[var(--indigo)] mb-2 uppercase">Full Catalogue</div>
        <h1 className="kj-display text-4xl md:text-6xl">Shop</h1>
      </div>

      <div className="flex items-center justify-between mb-6 gap-3">
        <div className="flex-1 flex items-center gap-2 border border-[var(--line)] px-3 py-2 max-w-sm">
          <Search size={15} className="text-[var(--ink)]/50" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products…" className="flex-1 bg-transparent outline-none kj-mono text-xs" />
        </div>
        <button onClick={() => setFiltersOpen(!filtersOpen)} className="md:hidden kj-mono text-xs uppercase border border-[var(--ink)] px-4 py-2">Filters</button>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="hidden md:block kj-mono text-xs uppercase border border-[var(--ink)] px-3 py-2 bg-transparent">
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="bestselling">Best Selling</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10">
        <aside className={`${filtersOpen ? "block" : "hidden"} md:block`}>
          <div className="mb-7">
            <div className="kj-mono text-[11px] uppercase mb-3 pb-2 border-b border-[var(--line)]">Category</div>
            <div className="flex flex-col gap-2">
              <button onClick={() => setCategory("all")} className={`text-left text-sm ${category === "all" ? "text-[var(--indigo)] font-semibold" : ""}`}>All Products</button>
              {CATEGORIES.map((c) => (
                <button key={c.id} onClick={() => setCategory(c.id)} className={`text-left text-sm ${category === c.id ? "text-[var(--indigo)] font-semibold" : ""}`}>{c.name}</button>
              ))}
            </div>
          </div>
          <div className="mb-7">
            <div className="kj-mono text-[11px] uppercase mb-3 pb-2 border-b border-[var(--line)]">Price — up to {money(priceMax)}</div>
            <input type="range" min={10000} max={80000} step={1000} value={priceMax} onChange={(e) => setPriceMax(Number(e.target.value))} className="w-full accent-[var(--indigo)]" />
          </div>
          <div className="mb-7">
            <div className="kj-mono text-[11px] uppercase mb-3 pb-2 border-b border-[var(--line)]">Size</div>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((s) => (
                <button key={s} onClick={() => setSizeFilter(sizeFilter === s ? null : s)} className={`kj-mono text-xs w-9 h-9 border ${sizeFilter === s ? "kj-btn-ink" : "border-[var(--line)]"}`}>{s}</button>
              ))}
            </div>
          </div>
          <div className="mb-7">
            <div className="kj-mono text-[11px] uppercase mb-3 pb-2 border-b border-[var(--line)]">Colour</div>
            <div className="flex flex-wrap gap-2">
              {COLORS.map((c) => (
                <ColorDot key={c.id} color={c} selected={colorFilter === c.id} onClick={() => setColorFilter(colorFilter === c.id ? null : c.id)} />
              ))}
            </div>
          </div>
          <button
            onClick={() => { setCategory("all"); setPriceMax(80000); setSizeFilter(null); setColorFilter(null); setQuery(""); }}
            className="kj-mono text-xs uppercase kj-underline"
          >
            Clear Filters
          </button>
        </aside>

        <div>
          <div className="kj-mono text-xs text-[var(--ink)]/60 mb-4">{filtered.length} products</div>
          {filtered.length === 0 ? (
            <div className="py-20 text-center kj-mono text-sm text-[var(--ink)]/60">No products match those filters. Try widening your search.</div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} onOpen={openProduct} onQuickView={onQuickView} onToggleWishlist={onToggleWishlist} isWishlisted={wishlist.includes(p.id)} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- PRODUCT PAGE ----------------------------- */

function ProductPage({ product, onAddToCart, setView, onToggleWishlist, wishlist }) {
  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const [tab, setTab] = useState("details");

  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const isWishlisted = wishlist.includes(product.id);

  const handleAdd = (buyNow) => {
    if (!size) return;
    onAddToCart(product, size, color, qty);
    if (buyNow) { setView("checkout"); return; }
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-10 md:py-14">
      <div className="kj-mono text-xs text-[var(--ink)]/50 mb-6 flex items-center gap-1 flex-wrap">
        <button onClick={() => setView("home")} className="kj-underline">Home</button> /
        <button onClick={() => setView("shop")} className="kj-underline capitalize">{product.category}</button> /
        <span className="text-[var(--ink)]">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14">
        <div>
          <div className="aspect-[4/5] bg-[var(--bone-2)] overflow-hidden mb-3">
            <img src={product.images[activeImg]} className="kj-photo w-full h-full object-cover" alt={product.name} />
          </div>
          <div className="flex gap-3">
            {product.images.map((img, i) => (
              <button key={i} onClick={() => setActiveImg(i)} className={`w-20 h-24 overflow-hidden border ${activeImg === i ? "border-[var(--ink)]" : "border-[var(--line)]"}`}>
                <img src={img} className="kj-photo w-full h-full object-cover" alt="" />
              </button>
            ))}
          </div>
        </div>

        <div>
          {product.tag && <div className="mb-3"><TagLabel tone="clay">{product.tag}</TagLabel></div>}
          <div className="kj-mono text-xs text-[var(--indigo)] mb-2 uppercase">{product.category}</div>
          <h1 className="kj-display text-3xl md:text-4xl mb-3">{product.name}</h1>
          <div className="kj-mono text-lg mb-6">{money(product.price)}</div>
          <p className="text-sm text-[var(--ink)]/70 mb-7 max-w-md">{product.description}</p>

          <div className="mb-6">
            <div className="kj-mono text-[11px] uppercase mb-2">Colour — {COLORS.find(c=>c.id===color)?.name}</div>
            <div className="flex gap-2">
              {product.colors.map((cid) => {
                const c = COLORS.find((x) => x.id === cid);
                return <ColorDot key={cid} color={c} selected={color === cid} onClick={() => setColor(cid)} size="w-8 h-8" />;
              })}
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="kj-mono text-[11px] uppercase">Size {!size && <span className="text-[var(--clay)]">— select a size</span>}</div>
              <button onClick={() => setSizeGuideOpen(true)} className="kj-mono text-[11px] uppercase kj-underline">Size Guide</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button key={s} onClick={() => setSize(s)} className={`kj-mono text-xs w-11 h-11 border ${size === s ? "kj-btn-ink" : "border-[var(--line)]"}`}>{s}</button>
              ))}
            </div>
          </div>

          <div className="mb-7">
            <div className="kj-mono text-[11px] uppercase mb-2">Quantity</div>
            <div className="flex items-center border border-[var(--line)] w-fit">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center"><Minus size={14} /></button>
              <span className="kj-mono text-sm w-10 text-center">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center"><Plus size={14} /></button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-3">
            <button onClick={() => handleAdd(false)} className="flex-1 kj-btn-ink kj-mono text-xs uppercase py-4">
              {added ? "Added ✓" : "Add to Cart"}
            </button>
            <button onClick={() => handleAdd(true)} className="flex-1 border border-[var(--ink)] kj-mono text-xs uppercase py-4 hover:bg-[var(--ink)] hover:text-[var(--bone)] transition-colors">
              Buy Now
            </button>
            <button onClick={() => onToggleWishlist(product.id)} aria-label="Wishlist" className="w-12 h-12 border border-[var(--line)] flex items-center justify-center shrink-0">
              <Heart size={16} fill={isWishlisted ? "var(--clay)" : "none"} color={isWishlisted ? "var(--clay)" : "var(--ink)"} />
            </button>
          </div>
          {!size && <div className="kj-mono text-[11px] text-[var(--clay)] mb-4">Please select a size to continue.</div>}

          <div className="grid grid-cols-3 gap-3 py-6 border-y border-[var(--line)] mt-4 text-center">
            <div><Truck size={18} className="mx-auto mb-1.5" /><div className="kj-mono text-[10px] uppercase">Nationwide Delivery</div></div>
            <div><RotateCcw size={18} className="mx-auto mb-1.5" /><div className="kj-mono text-[10px] uppercase">7-Day Returns</div></div>
            <div><ShieldCheck size={18} className="mx-auto mb-1.5" /><div className="kj-mono text-[10px] uppercase">Secure Checkout</div></div>
          </div>

          <div className="mt-6">
            <div className="flex gap-6 border-b border-[var(--line)] mb-4">
              {["details", "shipping", "returns"].map((t) => (
                <button key={t} onClick={() => setTab(t)} className={`kj-mono text-xs uppercase pb-3 capitalize ${tab === t ? "border-b-2 border-[var(--ink)]" : "text-[var(--ink)]/50"}`}>{t}</button>
              ))}
            </div>
            {tab === "details" && (
              <ul className="text-sm text-[var(--ink)]/75 space-y-1.5 list-disc list-inside">
                {product.details.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
            )}
            {tab === "shipping" && (
              <p className="text-sm text-[var(--ink)]/75">Lagos delivery in 1–3 business days. Nationwide delivery in 3–7 business days. Delivery fees are calculated at checkout based on location.</p>
            )}
            {tab === "returns" && (
              <p className="text-sm text-[var(--ink)]/75">Unworn items with tags attached can be returned within 7 days of delivery for a refund or exchange. See our Returns page for full details.</p>
            )}
          </div>
        </div>
      </div>

      {sizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSizeGuideOpen(false)} />
          <div className="relative bg-[var(--bone)] max-w-lg w-full p-6 md:p-8 kj-fade-up">
            <button onClick={() => setSizeGuideOpen(false)} className="absolute top-4 right-4"><X size={18} /></button>
            <h3 className="kj-display text-xl mb-4">Size Guide</h3>
            <table className="w-full text-sm kj-mono">
              <thead><tr className="border-b border-[var(--line)]"><th className="text-left py-2">Size</th><th className="text-left py-2">Chest (in)</th><th className="text-left py-2">Length (in)</th></tr></thead>
              <tbody>
                {[["XS","34-36","26"],["S","36-38","27"],["M","38-40","28"],["L","40-42","29"],["XL","42-44","30"],["XXL","44-46","31"]].map((row) => (
                  <tr key={row[0]} className="border-b border-[var(--line)]/60"><td className="py-2">{row[0]}</td><td className="py-2">{row[1]}</td><td className="py-2">{row[2]}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {related.length > 0 && (
        <div className="mt-20">
          <SectionHeading eyebrow="You Might Also Like" title="Related Products" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} onOpen={(pr) => { setView("product"); setTimeout(()=>window.scrollTo(0,0),0); }} onQuickView={() => {}} onToggleWishlist={onToggleWishlist} isWishlisted={wishlist.includes(p.id)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* -------------------------------- CART -------------------------------- */

function CartPanel({ open, onClose, cart, updateQty, removeItem, setView }) {
  const subtotal = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}>
      <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`} onClick={onClose} />
      <div className={`absolute right-0 top-0 bottom-0 w-full max-w-md bg-[var(--bone)] flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between p-5 border-b border-[var(--line)]">
          <h3 className="kj-display text-xl">Shopping Bag ({cart.length})</h3>
          <button onClick={onClose} aria-label="Close cart"><X size={20} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <p className="kj-mono text-sm text-[var(--ink)]/60 mb-4">Your bag is empty.</p>
              <button onClick={() => { onClose(); setView("shop"); }} className="kj-btn-ink kj-mono text-xs uppercase px-6 py-3">Shop Now</button>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {cart.map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="w-20 h-24 bg-[var(--bone-2)] overflow-hidden shrink-0">
                    <img src={item.product.images[0]} className="kj-photo w-full h-full object-cover" alt={item.product.name} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between gap-2">
                      <div className="text-sm font-medium">{item.product.name}</div>
                      <button onClick={() => removeItem(idx)} aria-label="Remove"><X size={14} className="text-[var(--ink)]/50" /></button>
                    </div>
                    <div className="kj-mono text-[11px] text-[var(--ink)]/60 mt-1">Size {item.size} · {COLORS.find(c=>c.id===item.color)?.name}</div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-[var(--line)]">
                        <button onClick={() => updateQty(idx, Math.max(1, item.qty - 1))} className="w-7 h-7 flex items-center justify-center"><Minus size={11} /></button>
                        <span className="kj-mono text-xs w-7 text-center">{item.qty}</span>
                        <button onClick={() => updateQty(idx, item.qty + 1)} className="w-7 h-7 flex items-center justify-center"><Plus size={11} /></button>
                      </div>
                      <span className="kj-mono text-xs">{money(item.product.price * item.qty)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {cart.length > 0 && (
          <div className="p-5 border-t border-[var(--line)]">
            <div className="flex justify-between kj-mono text-sm mb-4">
              <span>Subtotal</span>
              <span>{money(subtotal)}</span>
            </div>
            <button onClick={() => { onClose(); setView("cart"); }} className="w-full border border-[var(--ink)] kj-mono text-xs uppercase py-3 mb-2">View Bag</button>
            <button onClick={() => { onClose(); setView("checkout"); }} className="w-full kj-btn-ink kj-mono text-xs uppercase py-3.5">Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
}

function CartPage({ cart, updateQty, removeItem, setView }) {
  const subtotal = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  const shipping = cart.length === 0 ? 0 : (subtotal > 60000 ? 0 : 3500);
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-5 py-24 text-center">
        <h1 className="kj-display text-3xl mb-4">Your Bag Is Empty</h1>
        <p className="text-sm text-[var(--ink)]/60 mb-8">Looks like you haven't added anything yet.</p>
        <button onClick={() => setView("shop")} className="kj-btn-ink kj-mono text-xs uppercase px-8 py-3.5">Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 md:py-14">
      <h1 className="kj-display text-4xl md:text-5xl mb-10">Shopping Bag</h1>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_340px] gap-10">
        <div className="flex flex-col divide-y divide-[var(--line)]">
          {cart.map((item, idx) => (
            <div key={idx} className="flex gap-4 py-5">
              <div className="w-24 h-28 md:w-28 md:h-32 bg-[var(--bone-2)] overflow-hidden shrink-0">
                <img src={item.product.images[0]} className="kj-photo w-full h-full object-cover" alt={item.product.name} />
              </div>
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between gap-2">
                  <div>
                    <div className="font-medium">{item.product.name}</div>
                    <div className="kj-mono text-[11px] text-[var(--ink)]/60 mt-1">Size {item.size} · {COLORS.find(c=>c.id===item.color)?.name}</div>
                  </div>
                  <button onClick={() => removeItem(idx)} className="kj-mono text-[11px] uppercase text-[var(--clay)] h-fit">Remove</button>
                </div>
                <div className="flex items-center justify-between mt-auto pt-3">
                  <div className="flex items-center border border-[var(--line)]">
                    <button onClick={() => updateQty(idx, Math.max(1, item.qty - 1))} className="w-8 h-8 flex items-center justify-center"><Minus size={12} /></button>
                    <span className="kj-mono text-xs w-8 text-center">{item.qty}</span>
                    <button onClick={() => updateQty(idx, item.qty + 1)} className="w-8 h-8 flex items-center justify-center"><Plus size={12} /></button>
                  </div>
                  <span className="kj-mono text-sm">{money(item.product.price * item.qty)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-fit border border-[var(--line)] p-6">
          <h3 className="kj-display text-lg mb-4">Order Summary</h3>
          <div className="flex justify-between text-sm mb-2 kj-mono"><span>Subtotal</span><span>{money(subtotal)}</span></div>
          <div className="flex justify-between text-sm mb-4 kj-mono">
            <span>Shipping</span><span>{shipping === 0 ? "Free" : money(shipping)}</span>
          </div>
          <div className="kj-tear mb-4" />
          <div className="flex justify-between text-base font-semibold mb-6 kj-mono"><span>Total</span><span>{money(total)}</span></div>
          <button onClick={() => setView("checkout")} className="w-full kj-btn-ink kj-mono text-xs uppercase py-4">Proceed to Checkout</button>
          <button onClick={() => setView("shop")} className="w-full kj-mono text-xs uppercase py-3 mt-2 kj-underline">Continue Shopping</button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ CHECKOUT ------------------------------ */

function Checkout({ cart, setView, clearCart }) {
  const [step, setStep] = useState(1);
  const [placed, setPlaced] = useState(false);
  const subtotal = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  const shipping = subtotal > 60000 ? 0 : 3500;
  const total = subtotal + shipping;

  if (cart.length === 0 && !placed) {
    return (
      <div className="max-w-xl mx-auto px-5 py-24 text-center">
        <h1 className="kj-display text-3xl mb-4">Nothing To Check Out</h1>
        <button onClick={() => setView("shop")} className="kj-btn-ink kj-mono text-xs uppercase px-8 py-3.5">Shop Now</button>
      </div>
    );
  }

  if (placed) {
    return (
      <div className="max-w-xl mx-auto px-5 py-24 text-center kj-fade-up">
        <div className="w-16 h-16 rounded-full bg-[var(--indigo)] text-white flex items-center justify-center mx-auto mb-6"><Check size={26} /></div>
        <h1 className="kj-display text-3xl mb-3">Order Received.</h1>
        <p className="text-sm text-[var(--ink)]/70 mb-8">Thank you for shopping Konibaje Originals. A confirmation has been sent to your email — we'll notify you as soon as your order ships.</p>
        <button onClick={() => setView("home")} className="kj-btn-ink kj-mono text-xs uppercase px-8 py-3.5">Back To Home</button>
      </div>
    );
  }

  const steps = ["Information", "Shipping", "Payment"];

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 md:py-14">
      <h1 className="kj-display text-4xl md:text-5xl mb-3">Checkout</h1>
      <div className="flex items-center gap-2 mb-10 kj-mono text-[11px] uppercase text-[var(--ink)]/60">
        <ShieldCheck size={14} /> Secure checkout — your information is protected
      </div>

      <div className="flex gap-4 mb-10">
        {steps.map((s, i) => (
          <div key={s} className={`flex items-center gap-2 kj-mono text-xs uppercase ${step === i + 1 ? "text-[var(--indigo)]" : step > i + 1 ? "text-[var(--ink)]" : "text-[var(--ink)]/35"}`}>
            <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] ${step > i + 1 ? "kj-btn-ink border-transparent" : step === i+1 ? "border-[var(--indigo)]" : "border-[var(--ink)]/30"}`}>
              {step > i + 1 ? <Check size={12} /> : i + 1}
            </span>
            {s}
            {i < steps.length - 1 && <span className="w-6 h-px bg-[var(--line)] ml-2" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_340px] gap-10">
        <form onSubmit={(e) => { e.preventDefault(); if (step < 3) setStep(step + 1); else { setPlaced(true); clearCart(); } }}>
          {step === 1 && (
            <div className="flex flex-col gap-4 kj-fade-up">
              <h3 className="kj-display text-lg mb-1">Customer Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <input required placeholder="First name" className="border border-[var(--line)] px-4 py-3 text-sm outline-none focus:border-[var(--indigo)]" />
                <input required placeholder="Last name" className="border border-[var(--line)] px-4 py-3 text-sm outline-none focus:border-[var(--indigo)]" />
              </div>
              <input required type="email" placeholder="Email address" className="border border-[var(--line)] px-4 py-3 text-sm outline-none focus:border-[var(--indigo)]" />
              <input required type="tel" placeholder="Phone number" className="border border-[var(--line)] px-4 py-3 text-sm outline-none focus:border-[var(--indigo)]" />
            </div>
          )}
          {step === 2 && (
            <div className="flex flex-col gap-4 kj-fade-up">
              <h3 className="kj-display text-lg mb-1">Shipping Address</h3>
              <input required placeholder="Street address" className="border border-[var(--line)] px-4 py-3 text-sm outline-none focus:border-[var(--indigo)]" />
              <div className="grid grid-cols-2 gap-4">
                <input required placeholder="City" className="border border-[var(--line)] px-4 py-3 text-sm outline-none focus:border-[var(--indigo)]" />
                <input required placeholder="State" className="border border-[var(--line)] px-4 py-3 text-sm outline-none focus:border-[var(--indigo)]" />
              </div>
              <input placeholder="Delivery notes (optional)" className="border border-[var(--line)] px-4 py-3 text-sm outline-none focus:border-[var(--indigo)]" />
            </div>
          )}
          {step === 3 && (
            <div className="flex flex-col gap-4 kj-fade-up">
              <h3 className="kj-display text-lg mb-1">Payment</h3>
              <div className="border border-[var(--line)] p-5">
                <div className="flex items-center gap-2 kj-mono text-xs uppercase mb-3"><ShieldCheck size={14} className="text-[var(--indigo)]" /> Secure Payment</div>
                <p className="text-sm text-[var(--ink)]/65 mb-4">Card and bank transfer payments are processed securely via Paystack at the final step. No payment details are stored on this site.</p>
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="Card number" className="border border-[var(--line)] px-4 py-3 text-sm outline-none focus:border-[var(--indigo)] col-span-2" />
                  <input placeholder="MM / YY" className="border border-[var(--line)] px-4 py-3 text-sm outline-none focus:border-[var(--indigo)]" />
                  <input placeholder="CVC" className="border border-[var(--line)] px-4 py-3 text-sm outline-none focus:border-[var(--indigo)]" />
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-8">
            {step > 1 && <button type="button" onClick={() => setStep(step - 1)} className="border border-[var(--ink)] kj-mono text-xs uppercase px-6 py-3.5">Back</button>}
            <button type="submit" className="flex-1 kj-btn-ink kj-mono text-xs uppercase py-3.5">
              {step < 3 ? "Continue" : `Place Order — ${money(total)}`}
            </button>
          </div>
        </form>

        <div className="h-fit border border-[var(--line)] p-6">
          <h3 className="kj-display text-lg mb-4">Order Summary</h3>
          <div className="flex flex-col gap-3 mb-4 max-h-64 overflow-y-auto">
            {cart.map((item, idx) => (
              <div key={idx} className="flex gap-3">
                <div className="w-14 h-16 bg-[var(--bone-2)] overflow-hidden shrink-0"><img src={item.product.images[0]} className="kj-photo w-full h-full object-cover" alt="" /></div>
                <div className="flex-1 text-xs">
                  <div className="font-medium">{item.product.name}</div>
                  <div className="kj-mono text-[10px] text-[var(--ink)]/60">Size {item.size} · Qty {item.qty}</div>
                </div>
                <span className="kj-mono text-xs">{money(item.product.price * item.qty)}</span>
              </div>
            ))}
          </div>
          <div className="kj-tear mb-4" />
          <div className="flex justify-between text-sm mb-2 kj-mono"><span>Subtotal</span><span>{money(subtotal)}</span></div>
          <div className="flex justify-between text-sm mb-4 kj-mono"><span>Shipping</span><span>{shipping === 0 ? "Free" : money(shipping)}</span></div>
          <div className="kj-tear mb-4" />
          <div className="flex justify-between text-base font-semibold kj-mono"><span>Total</span><span>{money(total)}</span></div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- ABOUT -------------------------------- */

function About() {
  const pillars = [
    { t: "Culture", d: "Rooted in West African textile heritage — adire, kente and the craft of resist-dyeing — reinterpreted for the street." },
    { t: "Individuality", d: "No two people wear a piece the same way. We design room for that." },
    { t: "Creativity", d: "Every drop starts as a sketch, a pattern, a question — never a repeat of the last one." },
    { t: "Quality", d: "Heavyweight cottons, reinforced seams, garment dyeing. Built to outlast the season." },
  ];
  return (
    <div>
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <img src="https://picsum.photos/seed/kj-about-hero/1600/1000" className="absolute inset-0 w-full h-full object-cover kj-photo" alt="Konibaje Originals studio" />
        <div className="absolute inset-0 bg-[var(--ink)]/55" />
        <div className="relative h-full max-w-5xl mx-auto px-5 flex items-center justify-center text-center">
          <h1 className="kj-display text-4xl md:text-7xl text-[var(--bone)] leading-[0.95] kj-fade-up">This Is Konibaje Originals.</h1>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-5 py-16 md:py-24 text-center">
        <p className="text-lg md:text-xl leading-relaxed text-[var(--ink)]/80">
          "Konibaje" carries the spirit of transformation — the idea that identity is something worn,
          shaped and re-shaped every day. We build clothing for people who treat getting dressed as an
          act of self-expression, not routine.
        </p>
      </section>

      <ZigZagDivider />

      <section className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-4">
        {pillars.map((p) => (
          <div key={p.t} className="border border-[var(--line)] p-8">
            <h3 className="kj-display text-2xl mb-3 text-[var(--indigo)]">{p.t}</h3>
            <p className="text-sm text-[var(--ink)]/70">{p.d}</p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4">
        {["kj-about-1","kj-about-2","kj-about-3","kj-about-4"].map((seed) => (
          <div key={seed} className="aspect-[3/4] overflow-hidden kj-photo-wrap">
            <img src={`https://picsum.photos/seed/${seed}/700/900`} className="kj-photo w-full h-full object-cover" alt="Studio" />
          </div>
        ))}
      </section>
    </div>
  );
}

/* ------------------------------- LOOKBOOK ------------------------------- */

function Lookbook({ setView }) {
  const seeds = ["kj-look-1","kj-look-2","kj-look-3","kj-look-4","kj-look-5","kj-look-6","kj-look-7","kj-look-8"];
  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-14">
      <div className="text-center mb-12">
        <div className="kj-mono text-xs text-[var(--indigo)] mb-2 uppercase">Season 04</div>
        <h1 className="kj-display text-4xl md:text-6xl">The Lookbook</h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {seeds.map((seed, i) => (
          <div key={seed} className={`overflow-hidden kj-photo-wrap ${i % 5 === 0 ? "md:col-span-2 aspect-[3/2] md:aspect-[16/10]" : "aspect-[4/5]"}`}>
            <img src={`https://picsum.photos/seed/${seed}/1100/900`} className="kj-photo w-full h-full object-cover" alt="Lookbook editorial" />
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <button onClick={() => setView("shop")} className="kj-btn-ink kj-mono text-xs uppercase px-8 py-4">Shop This Collection</button>
      </div>
    </div>
  );
}

/* -------------------------------- CONTACT -------------------------------- */

function Contact() {
  const [sent, setSent] = useState(false);
  const faqs = [
    { q: "How long does delivery take?", a: "Lagos: 1–3 business days. Nationwide: 3–7 business days." },
    { q: "What is your returns policy?", a: "Unworn items with tags attached can be returned within 7 days of delivery." },
    { q: "Do you ship internationally?", a: "Not yet — currently we ship within Nigeria only. International shipping is coming soon." },
    { q: "How do I know my size?", a: "Check the size guide on any product page for detailed chest and length measurements." },
  ];
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-14">
      <div className="mb-12 text-center">
        <div className="kj-mono text-xs text-[var(--indigo)] mb-2 uppercase">Get In Touch</div>
        <h1 className="kj-display text-4xl md:text-6xl">Contact</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-14 mb-20">
        <div>
          <h3 className="kj-display text-xl mb-5">Send A Message</h3>
          {sent ? (
            <div className="kj-mono text-sm text-[var(--indigo)] flex items-center gap-2"><Check size={16}/> Message sent — we'll be in touch shortly.</div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="flex flex-col gap-4">
              <input required placeholder="Your name" className="border border-[var(--line)] px-4 py-3 text-sm outline-none focus:border-[var(--indigo)]" />
              <input required type="email" placeholder="Your email" className="border border-[var(--line)] px-4 py-3 text-sm outline-none focus:border-[var(--indigo)]" />
              <input placeholder="Subject" className="border border-[var(--line)] px-4 py-3 text-sm outline-none focus:border-[var(--indigo)]" />
              <textarea required placeholder="Message" rows={5} className="border border-[var(--line)] px-4 py-3 text-sm outline-none focus:border-[var(--indigo)] resize-none" />
              <button type="submit" className="kj-btn-ink kj-mono text-xs uppercase py-3.5">Send Message</button>
            </form>
          )}
        </div>

        <div>
          <h3 className="kj-display text-xl mb-5">Reach Us Directly</h3>
          <div className="flex flex-col gap-4 kj-mono text-sm mb-8">
            <div><span className="text-[var(--ink)]/50 uppercase text-[11px] block mb-1">Email</span>hello@konibajeoriginals.com</div>
            <div><span className="text-[var(--ink)]/50 uppercase text-[11px] block mb-1">Customer Support</span>Mon–Sat, 9am–6pm WAT</div>
            <div><span className="text-[var(--ink)]/50 uppercase text-[11px] block mb-1">Studio</span>Jos, Plateau State, Nigeria</div>
          </div>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 border border-[var(--line)] flex items-center justify-center"><Instagram size={17} /></a>
            <a href="#" className="w-10 h-10 border border-[var(--line)] flex items-center justify-center"><Facebook size={17} /></a>
          </div>
        </div>
      </div>

      <div>
        <h3 className="kj-display text-xl mb-5">Frequently Asked Questions</h3>
        <div className="flex flex-col divide-y divide-[var(--line)] border-t border-b border-[var(--line)]">
          {faqs.map((f, i) => (
            <div key={i}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between py-4 text-left">
                <span className="font-medium text-sm">{f.q}</span>
                <ChevronDown size={16} className={`transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
              </button>
              {openFaq === i && <p className="text-sm text-[var(--ink)]/65 pb-4">{f.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- WISHLIST -------------------------------- */

function WishlistPage({ wishlist, openProduct, onAddToCart, onToggleWishlist, onQuickView, setView }) {
  const items = PRODUCTS.filter((p) => wishlist.includes(p.id));
  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-14">
      <h1 className="kj-display text-4xl md:text-6xl mb-10">Wishlist</h1>
      {items.length === 0 ? (
        <div className="text-center py-16">
          <p className="kj-mono text-sm text-[var(--ink)]/60 mb-4">You haven't saved anything yet.</p>
          <button onClick={() => setView("shop")} className="kj-btn-ink kj-mono text-xs uppercase px-8 py-3.5">Browse Shop</button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} onOpen={openProduct} onQuickView={onQuickView} onToggleWishlist={onToggleWishlist} isWishlisted={true} />
          ))}
        </div>
      )}
    </div>
  );
}

/* -------------------------------- FOOTER -------------------------------- */

function Footer({ setView }) {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const cols = [
    { title: "Shop", items: [["Shop All", "shop"], ["About", "about"], ["Contact", "contact"]] },
    { title: "Support", items: [["FAQ", "contact"], ["Shipping", "contact"], ["Returns", "contact"]] },
    { title: "Legal", items: [["Privacy Policy", "contact"], ["Terms & Conditions", "contact"]] },
  ];
  return (
    <footer className="bg-[var(--ink)] text-[var(--bone)] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-[var(--bone)]/15">
          <div className="col-span-2">
            <div className="kj-display text-xl mb-3">KONIBAJE ORIGINALS</div>
            <p className="text-sm text-[var(--bone)]/60 max-w-xs mb-5">Contemporary streetwear inspired by culture, creativity and individuality.</p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 border border-[var(--bone)]/30 rounded-full flex items-center justify-center"><Instagram size={15} /></a>
              <a href="#" className="w-9 h-9 border border-[var(--bone)]/30 rounded-full flex items-center justify-center"><Facebook size={15} /></a>
              <a href="#" className="w-9 h-9 border border-[var(--bone)]/30 rounded-full flex items-center justify-center kj-mono text-[11px]">TT</a>
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="kj-mono text-xs uppercase mb-4 text-[var(--bone)]/50">{c.title}</div>
              <div className="flex flex-col gap-2.5">
                {c.items.map(([label, dest]) => (
                  <button key={label} onClick={() => setView(dest)} className="text-sm text-[var(--bone)]/80 hover:text-[var(--bone)] text-left kj-underline w-fit">{label}</button>
                ))}
              </div>
            </div>
          ))}
          <div className="col-span-2 md:col-span-1">
            <div className="kj-mono text-xs uppercase mb-4 text-[var(--bone)]/50">Newsletter</div>
            {joined ? (
              <div className="kj-mono text-xs text-[var(--bone)]/70">Thanks — you're on the list.</div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); if (email) setJoined(true); }} className="flex flex-col gap-2">
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="bg-transparent border border-[var(--bone)]/30 px-3 py-2.5 text-xs kj-mono outline-none focus:border-[var(--bone)]" />
                <button type="submit" className="bg-[var(--bone)] text-[var(--ink)] kj-mono text-[11px] uppercase py-2.5">Join Us</button>
              </form>
            )}
          </div>
        </div>
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-3 kj-mono text-[11px] text-[var(--bone)]/45">
          <span>© {new Date().getFullYear()} Konibaje Originals. All rights reserved.</span>
          <span>Designed &amp; built with intent.</span>
        </div>
      </div>
    </footer>
  );
}

/* --------------------------------- APP --------------------------------- */

export default function KonibajeApp() {
  const [view, setViewRaw] = useState("home");
  const [shopCategory, setShopCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const setView = (v) => {
    if (typeof v === "object" && v.page) {
      setShopCategory(v.category || "all");
      setViewRaw(v.page);
    } else {
      if (v === "shop") setShopCategory("all");
      setViewRaw(v);
    }
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    setMobileMenuOpen(false);
  };

  const openProduct = (p) => { setSelectedProduct(p); setView("product"); };

  const addToCart = (product, size, color, qty) => {
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.product.id === product.id && i.size === size && i.color === color);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [...prev, { product, size, color, qty }];
    });
    setCartOpen(true);
  };

  const updateQty = (idx, qty) => setCart((prev) => prev.map((it, i) => (i === idx ? { ...it, qty } : it)));
  const removeItem = (idx) => setCart((prev) => prev.filter((_, i) => i !== idx));
  const clearCart = () => setCart([]);
  const toggleWishlist = (id) => setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const runSearch = () => { setSearchOpen(false); setView("shop"); };

  let page;
  if (view === "home") page = <Home setView={setView} openProduct={openProduct} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} wishlist={wishlist} onQuickView={setQuickViewProduct} />;
  else if (view === "shop") page = <Shop openProduct={openProduct} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} wishlist={wishlist} initialCategory={shopCategory} onQuickView={setQuickViewProduct} searchQuery={searchQuery} />;
  else if (view === "product") page = <ProductPage product={selectedProduct} onAddToCart={addToCart} setView={setView} onToggleWishlist={toggleWishlist} wishlist={wishlist} />;
  else if (view === "cart") page = <CartPage cart={cart} updateQty={updateQty} removeItem={removeItem} setView={setView} />;
  else if (view === "checkout") page = <Checkout cart={cart} setView={setView} clearCart={clearCart} />;
  else if (view === "about") page = <About />;
  else if (view === "lookbook") page = <Lookbook setView={setView} />;
  else if (view === "contact") page = <Contact />;
  else if (view === "wishlist") page = <WishlistPage wishlist={wishlist} openProduct={openProduct} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} onQuickView={setQuickViewProduct} setView={setView} />;
  else page = <Home setView={setView} openProduct={openProduct} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} wishlist={wishlist} onQuickView={setQuickViewProduct} />;

  return (
    <div className="kj-root min-h-screen">
      <style>{FONT_IMPORT + TOKENS}</style>
      <Header
        view={view}
        setView={setView}
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setCartOpen(true)}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onSearch={runSearch}
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {page}
      <Footer setView={setView} />
      <CartPanel open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} updateQty={updateQty} removeItem={removeItem} setView={setView} />
      {quickViewProduct && <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} onAddToCart={addToCart} />}
    </div>
  );
}
