export type Lang = "fa" | "en";
export type TimeKey = "dawn" | "day" | "sunset" | "night";
export type LandmarkId =
  | "ali-qapu"
  | "veranda"
  | "imam-mosque"
  | "sheikh-lotfollah"
  | "qeysarieh"
  | "bazaar"
  | "central-pool"
  | "full-square";
export type CameraPresetId =
  "hero" | "ali-qapu" | "full-square" | "sunset" | "night" | "imam-mosque" | "bazaar";
export type Vec3 = [number, number, number];

export interface CameraView {
  position: Vec3;
  target: Vec3;
}
export interface Hotspot {
  id: LandmarkId;
  anchor: Vec3;
  view: CameraView;
  title: Record<Lang, string>;
  body: Record<Lang, string>;
  meta: Record<Lang, string>;
  source: string;
}
export interface Landmark {
  id: LandmarkId;
  title: Record<Lang, string>;
  labelAnchor: Vec3;
  view: CameraView;
}

export const CAMERA_PRESETS: Record<CameraPresetId, CameraView> = {
  hero: { position: [-178, 70, 118], target: [0, 12, 5] },
  "ali-qapu": { position: [-58, 34, 42], target: [-110, 17, 0] },
  "full-square": { position: [0, 225, 300], target: [0, 4, 0] },
  sunset: { position: [-190, 78, 175], target: [0, 10, 5] },
  night: { position: [155, 66, 168], target: [0, 10, 0] },
  "imam-mosque": { position: [0, 38, -112], target: [0, 16, -176] },
  bazaar: { position: [0, 34, 114], target: [0, 12, 176] },
};
export const HERO_VIEW = CAMERA_PRESETS.hero;
export const INTRO_VIEW: CameraView = { position: [260, 155, 350], target: [0, 8, 0] };
export const SOCIAL_VIEWS: Record<TimeKey, CameraView> = {
  dawn: { position: [-158, 66, -128], target: [0, 9, 0] },
  day: HERO_VIEW,
  sunset: CAMERA_PRESETS.sunset,
  night: CAMERA_PRESETS.night,
};

export const HOTSPOTS: Hotspot[] = [
  {
    id: "ali-qapu",
    anchor: [-91, 18, 0],
    view: CAMERA_PRESETS["ali-qapu"],
    title: { fa: "عالی‌قاپو", en: "Ali Qapu Palace" },
    body: {
      fa: "کاخ عالی‌قاپو در میانهٔ ضلع غربی میدان، ورودی تشریفاتی دولتخانهٔ صفوی بود. ایوان بلند آن چشم‌اندازی مستقیم به محور بزرگ میدان و بناهای پیرامون داشت.",
      en: "Ali Qapu anchors the western side of the square and served as the ceremonial entrance to the Safavid royal precinct. Its elevated veranda commands the square’s long central axis.",
    },
    meta: { fa: "ضلع غربی · دورهٔ صفوی", en: "West side · Safavid period" },
    source: "UNESCO World Heritage — Meidan Emam, Esfahan",
  },
  {
    id: "veranda",
    anchor: [-91, 26, 3],
    view: { position: [-65, 37, 30], target: [-110, 23, 2] },
    title: { fa: "ایوان عالی‌قاپو", en: "Ali Qapu Veranda" },
    body: {
      fa: "ایوان ستون‌دار جایگاه تماشای آیین‌ها، جشن‌ها و بازی چوگان بود. ستون‌های باریک چوبی و سقف عمیق، مرز میان کاخ و میدان را شکل می‌دهند.",
      en: "The columned veranda was a royal viewing platform for ceremonies, festivals and polo. Slender timber columns and a deep roof form a threshold between palace and square.",
    },
    meta: { fa: "تالار مرتفع", en: "Elevated talar" },
    source: "Scholarly surveys of Safavid Isfahan",
  },
  {
    id: "imam-mosque",
    anchor: [0, 25, -165],
    view: CAMERA_PRESETS["imam-mosque"],
    title: { fa: "مسجد امام", en: "Imam Mosque" },
    body: {
      fa: "مسجد جامع عباسی در انتهای جنوبی میدان با سردر بلند، مناره‌ها و گنبد کاشی‌کاری‌شده، محور مذهبی مجموعهٔ صفوی را می‌سازد.",
      en: "The royal congregational mosque closes the southern end of the square with a monumental portal, minarets and tiled dome, forming the religious focus of the Safavid ensemble.",
    },
    meta: { fa: "ضلع جنوبی · مسجد جامع عباسی", en: "South side · Royal congregational mosque" },
    source: "UNESCO World Heritage — Meidan Emam, Esfahan",
  },
  {
    id: "sheikh-lotfollah",
    anchor: [90, 19, 0],
    view: { position: [58, 30, 28], target: [108, 15, 0] },
    title: { fa: "مسجد شیخ لطف‌الله", en: "Sheikh Lotfollah Mosque" },
    body: {
      fa: "مسجد شیخ لطف‌الله در ضلع شرقی میدان، با گنبد نخودی‌رنگ و ورودی کاشی‌کاری‌شده، مسجد خصوصی دربار صفوی بود و برخلاف مسجد امام مناره ندارد.",
      en: "On the eastern side, Sheikh Lotfollah Mosque is distinguished by its cream-toned dome and tiled portal. Built for the royal court, it notably has no minarets.",
    },
    meta: { fa: "ضلع شرقی · مسجد درباری", en: "East side · Royal court mosque" },
    source: "UNESCO World Heritage — Meidan Emam, Esfahan",
  },
  {
    id: "qeysarieh",
    anchor: [0, 22, 160],
    view: CAMERA_PRESETS.bazaar,
    title: { fa: "سردر قیصریه", en: "Qeysarieh Gate" },
    body: {
      fa: "سردر قیصریه ورودی باشکوه بازار در انتهای شمالی میدان است؛ پیوندی میان فضای باز میدان و شبکهٔ سرپوشیدهٔ تجارت تاریخی اصفهان.",
      en: "Qeysarieh Gate is the monumental northern entrance, linking the open civic square to Isfahan’s dense network of covered historic markets.",
    },
    meta: { fa: "ضلع شمالی · ورودی بازار", en: "North side · Bazaar portal" },
    source: "UNESCO World Heritage — Meidan Emam, Esfahan",
  },
  {
    id: "bazaar",
    anchor: [-33, 9, 164],
    view: { position: [-62, 24, 117], target: [-32, 7, 169] },
    title: { fa: "بازار قیصریه", en: "Qeysarieh Bazaar" },
    body: {
      fa: "رواق‌ها و دهانه‌های تکرارشونده، مسیرهای بازار تاریخی را در پیرامون ورودی شمالی نشان می‌دهند. فضای نیمه‌تاریک گذرها با روشنایی میدان تضاد دارد.",
      en: "Repeated arcades and shop openings suggest the historic market network around the northern entrance, where shaded passages contrast with the bright open square.",
    },
    meta: { fa: "بازار تاریخی اصفهان", en: "Historic Bazaar of Isfahan" },
    source: "Encyclopaedia Iranica — Isfahan Bazaar",
  },
  {
    id: "central-pool",
    anchor: [0, 3, 12],
    view: { position: [74, 38, 95], target: [0, 0, 5] },
    title: { fa: "حوض مرکزی", en: "Central Pool" },
    body: {
      fa: "حوض کشیدهٔ مرکزی بر محور طولی میدان تأکید می‌کند و بازتاب آسمان و بناها را به فضای باز می‌آورد. این بازسازی، بیان تفسیری از آب‌نماهای تاریخی میدان است.",
      en: "The long central pool reinforces the square’s main axis and brings reflections of sky and architecture into the open space. This is an interpretive representation of the historic water features.",
    },
    meta: { fa: "محور مرکزی میدان", en: "Central axis of the square" },
    source: "Interpretive reconstruction based on historic views",
  },
];

export const LANDMARKS: Landmark[] = [
  ...HOTSPOTS.map(({ id, title, anchor, view }) => ({ id, title, labelAnchor: anchor, view })),
  {
    id: "full-square",
    title: { fa: "تمام میدان", en: "Full Square" },
    labelAnchor: [0, 4, 0],
    view: CAMERA_PRESETS["full-square"],
  },
];

export const UI = {
  brand: { fa: "نقش‌جهان", en: "NAQSH-E JAHAN" },
  subtitle: { fa: "عالی‌قاپو و میدان تاریخی اصفهان", en: "Ali Qapu & the historic square" },
  tagline: { fa: "چهار سوی نقش‌جهان", en: "The Four Sides of Naqsh-e Jahan" },
  enter: { fa: "ورود به میدان", en: "Enter the square" },
  skip: { fa: "رد کردن مقدمه", en: "Skip intro" },
  loading: { fa: "در حال ساختن میدان تاریخی…", en: "Reconstructing the historic square…" },
  reset: { fa: "بازگشت دوربین", en: "Reset camera" },
  cinematic: { fa: "نمای سینمایی", en: "Cinematic view" },
  performance: { fa: "حالت روان", en: "Performance mode" },
  fullscreen: { fa: "تمام‌صفحه", en: "Fullscreen" },
  help: { fa: "راهنما", en: "Controls" },
  sound: { fa: "صدا", en: "Sound" },
  capture: { fa: "عکس از نما", en: "Capture view" },
  close: { fa: "بستن", en: "Close" },
  about: { fa: "دربارهٔ تجربه", en: "About" },
  source: { fa: "منبع", en: "Source" },
  showUi: { fa: "نمایش رابط", en: "Show interface" },
  explore: { fa: "کاوش", en: "Explore" },
  camera: { fa: "دوربین", en: "Camera" },
  labels: { fa: "برچسب‌ها", en: "Labels" },
  more: { fa: "تنظیمات", en: "More" },
  exploreTitle: { fa: "کاوش نقش‌جهان", en: "Explore Naqsh-e Jahan" },
  cameraTitle: { fa: "نماهای دوربین", en: "Camera views" },
  loadingError: {
    fa: "بخشی از صحنه بارگذاری نشد.",
    en: "Part of the 3D scene could not be loaded.",
  },
  time: {
    dawn: { fa: "سپیده", en: "Dawn" },
    day: { fa: "روز", en: "Day" },
    sunset: { fa: "غروب", en: "Sunset" },
    night: { fa: "شب", en: "Night" },
  },
  cameraViews: {
    hero: { fa: "نمای اصلی", en: "Hero View" },
    "ali-qapu": { fa: "عالی‌قاپو", en: "Ali Qapu" },
    "full-square": { fa: "تمام میدان", en: "Full Square" },
    sunset: { fa: "نمای غروب", en: "Sunset View" },
    night: { fa: "نمای شب", en: "Night View" },
    "imam-mosque": { fa: "مسجد امام", en: "Mosque View" },
    bazaar: { fa: "بازار", en: "Bazaar View" },
  },
  helpItems: [
    { fa: "کلیدهای جهت‌دار یا WASD — حرکت مثل بازی", en: "Arrow keys or WASD — move like a game" },
    { fa: "درگ با کلیک چپ — چرخش", en: "Left drag — orbit" },
    { fa: "درگ با کلیک راست — جابه‌جایی", en: "Right drag — pan" },
    { fa: "چرخ موس — بزرگ‌نمایی", en: "Scroll — zoom" },
    { fa: "نقطه یا نام بنا — حرکت دوربین", en: "Marker or place name — focus camera" },
    { fa: "Esc — بستن پنل", en: "Esc — close panel" },
    { fa: "H — بازگشت به نمای اصلی", en: "H — return to hero view" },
  ],
  aboutBody: {
    fa: "این تجربه بازسازی هنری و تفسیری میدان نقش‌جهان در دورهٔ صفوی است، نه سند دقیق باستان‌شناسی. تناسبات و تزیینات برای نمایش ساختار چهار سوی میدان و ارتباط عالی‌قاپو، مسجد امام، مسجد شیخ لطف‌الله و سردر قیصریه ساده‌سازی شده‌اند.",
    en: "This experience is an artistic, interpretive reconstruction of Safavid Naqsh-e Jahan Square, not an archaeological record. Proportions and ornament are simplified to communicate the four-sided relationship between Ali Qapu, Imam Mosque, Sheikh Lotfollah Mosque and Qeysarieh Gate.",
  },
  webglError: {
    fa: "نمایش سه‌بعدی روی این مرورگر اجرا نشد.",
    en: "The interactive 3D view could not be started on this browser.",
  },
  retry: { fa: "تلاش دوباره", en: "Retry" },
} as const;
