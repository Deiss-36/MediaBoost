

import { ServiceItem, ServiceCategory, TaskItem } from './types';

export const SERVICES: ServiceItem[] = [
  // --- SOFTWARE & DESIGN TOOLS (NEW) ---
  {
    id: 'canva-pro-invite',
    title: 'Canva Pro (انضمام لفريق - تفعيل رسمي)',
    description: 'احصل على جميع ميزات Canva Pro عبر دعوة رسمية إلى فريقنا. استمتع بملايين القوالب والصور والخطوط الاحترافية.',
    price: 6,
    category: ServiceCategory.SOFTWARE,
    serviceType: 'SUBSCRIPTION',
    requiredInputs: ['EMAIL'],
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop', // Creative/Design
    platform: 'Canva',
    features: ['تفعيل على بريدك الشخصي', 'اشتراك لمدة سنة', 'وصول كامل لمكتبة البرو', 'ضمان كامل المدة'],
    unitSize: 1,
    unitType: 'اشتراك',
    previewImage: 'https://images.unsplash.com/photo-1626785774573-4b79931b7cbe?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'adobe-full-suite',
    title: 'Adobe Creative Cloud (كل التطبيقات)',
    description: 'اشتراك أدوبي كرييتف كلاود الكامل يشمل Photoshop, Illustrator, Premiere Pro وغيرها. تفعيل رسمي.',
    price: 35,
    category: ServiceCategory.SOFTWARE,
    serviceType: 'SUBSCRIPTION',
    requiredInputs: ['EMAIL'],
    image: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?q=80&w=1000&auto=format&fit=crop', // Design/Software
    platform: 'Adobe',
    features: ['ترخيص رسمي 100%', 'مساحة تخزين سحابية', 'تحديثات مستمرة', 'يدعم جميع الأجهزة'],
    unitSize: 1,
    unitType: 'شهر'
  },
  {
    id: 'capcut-pro-year',
    title: 'CapCut Pro (اشتراك سنوي)',
    description: 'فتح جميع ميزات CapCut Pro للمونتاج الاحترافي. إزالة العلامة المائية، قوالب حصرية، ومؤثرات متقدمة.',
    price: 15,
    category: ServiceCategory.SOFTWARE,
    serviceType: 'SUBSCRIPTION',
    requiredInputs: ['EMAIL'],
    image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1000&auto=format&fit=crop', // Video Editing
    platform: 'CapCut',
    features: ['حساب خاص', 'اشتراك لمدة 12 شهر', 'يعمل على الجوال والكمبيوتر', 'تفعيل فوري'],
    unitSize: 1,
    unitType: 'سنة'
  },

  // --- PURE FOLLOWERS SERVICES (EXISTING) ---
  {
    id: 'fb-followers-only',
    title: 'متابعين فيسبوك (Facebook Followers)',
    description: 'زيادة متابعين لصفحتك العامة أو الملف الشخصي (Profile) وتفعيل وضع الاحترافي. حسابات عالمية ومختلطة.',
    price: 3,
    category: ServiceCategory.SOCIAL_GROWTH,
    serviceType: 'GROWTH',
    requiredInputs: ['LINK'],
    image: 'https://images.unsplash.com/photo-1563986768427-620ca6717551?q=80&w=1000&auto=format&fit=crop', // Blue tech
    platform: 'Facebook',
    features: ['ضمان 30 يوم', 'سرعة متوسطة', 'بدون نقص (Non-Drop)'],
    unitSize: 1000,
    unitType: 'متابع',
    previewImage: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'yt-subscribers-only',
    title: 'مشتركين يوتيوب (YouTube Subscribers)',
    description: 'مشتركين قنوات يوتيوب حقيقيين للمساعدة في تحقيق شروط الربح وتوثيق القناة.',
    price: 15,
    category: ServiceCategory.SOCIAL_GROWTH,
    serviceType: 'GROWTH',
    requiredInputs: ['LINK'],
    image: 'https://images.unsplash.com/photo-1611162618479-ee3d24aaef0b?q=80&w=1000&auto=format&fit=crop', // YouTube Red
    platform: 'YouTube',
    features: ['جودة عالية', 'سرعة طبيعية', 'ضمان التعويض'],
    unitSize: 1000,
    unitType: 'مشترك',
    previewImage: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'ig-followers-hq',
    title: 'متابعين انستقرام (High Quality)',
    description: 'متابعين انستقرام بجودة عالية مع صور شخصية. الأفضل لزيادة المظهر الاحترافي للحساب.',
    price: 4,
    category: ServiceCategory.SOCIAL_GROWTH,
    serviceType: 'GROWTH',
    requiredInputs: ['USERNAME'],
    image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?q=80&w=1000&auto=format&fit=crop', // Instagram Gradient
    platform: 'Instagram',
    features: ['وصول فوري', 'ضمان الثبات', 'لا نحتاج كلمة سر'],
    unitSize: 1000,
    unitType: 'متابع',
    previewImage: 'https://images.unsplash.com/photo-1516251193000-18e6586ee186?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'tiktok-followers-only',
    title: 'متابعين تيك توك (TikTok Followers)',
    description: 'زيادة متابعين تيك توك لفتح ميزة البث المباشر (Live) وزيادة مصداقية الحساب.',
    price: 6,
    category: ServiceCategory.SOCIAL_GROWTH,
    serviceType: 'GROWTH',
    requiredInputs: ['LINK'],
    image: 'https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea?q=80&w=1000&auto=format&fit=crop', // TikTok aesthetic
    platform: 'TikTok',
    features: ['تفعيل اللايف', 'حسابات نشطة', 'سرعة عالية'],
    unitSize: 1000,
    unitType: 'متابع',
    previewImage: 'https://images.unsplash.com/photo-1528642474493-2276c8b6d0d2?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'x-followers-only',
    title: 'متابعين X / تويتر (Twitter)',
    description: 'متابعين لمنصة X (تويتر سابقاً) لزيادة التأثير الاجتماعي.',
    price: 8,
    category: ServiceCategory.SOCIAL_GROWTH,
    serviceType: 'GROWTH',
    requiredInputs: ['USERNAME'],
    image: 'https://images.unsplash.com/photo-1611605698335-8b15f5c290f6?q=80&w=1000&auto=format&fit=crop', // Twitter/X Blue
    platform: 'X',
    features: ['مظهر حقيقي', 'ضمان 30 يوم', 'بدون كلمة مرور'],
    unitSize: 1000,
    unitType: 'متابع'
  },
  {
    id: 'snap-subscribers',
    title: 'مشتركين سناب شات (Snapchat)',
    description: 'زيادة عدد المشتركين في الملف التعريفي العام (Public Profile) لتوثيق الحساب وفتح الإحصائيات.',
    price: 12,
    category: ServiceCategory.SOCIAL_GROWTH,
    serviceType: 'GROWTH',
    requiredInputs: ['LINK'],
    image: 'https://images.unsplash.com/photo-1588701198662-7935df40b5c1?q=80&w=1000&auto=format&fit=crop', // Yellow background
    platform: 'Snapchat',
    features: ['للملفات العامة', 'آمن 100%', 'سرية تامة'],
    unitSize: 1000,
    unitType: 'مشترك'
  },

  // --- FINANCIAL SERVICES ---
  {
    id: 'paypal-verified-account',
    title: 'حساب بايبال مفعل بالكامل (Verified)',
    description: 'حساب بايبال شخصي أو تجاري جاهز، مفعل ببطاقة وهوية، يقبل الإرسال والاستقبال بدون مشاكل التعليق (Hold).',
    price: 45,
    category: ServiceCategory.FINANCIAL,
    serviceType: 'ASSET', // Buying a product, no input needed
    requiredInputs: [],
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1000&auto=format&fit=crop', // Currency/Money
    platform: 'PayPal',
    features: ['مفعل بالهوية والبطاقة', 'تاريخ إنشاء قديم', 'عملات متعددة', 'وثائق الحساب كاملة'],
    unitSize: 1,
    unitType: 'حساب',
    maxQuantity: 1,
    previewImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'paypal-topup-balance',
    title: 'شحن رصيد بايبال (Top-up)',
    description: 'شحن رصيد لحسابك في بايبال بشكل آمن وفوري لدفع مشترياتك أو تمويل حملاتك الإعلانية.',
    price: 10,
    category: ServiceCategory.FINANCIAL,
    serviceType: 'TOPUP', // Sending money, needs email
    requiredInputs: ['EMAIL'],
    image: 'https://images.unsplash.com/photo-1616077744362-ee8dd3e8555e?q=80&w=1000&auto=format&fit=crop', // Digital Wallet
    platform: 'PayPal',
    features: ['تحويل آمن 100%', 'عمولة منخفضة', 'وصول فوري للرصيد', 'ضمان عدم الاسترجاع'],
    unitSize: 10,
    unitType: 'دولار'
  },

  // --- GOOGLE PLAY CARDS ---
  {
    id: 'google-play-10',
    title: 'بطاقة جوجل بلاي 10$ (Google Play)',
    description: 'بطاقة هدايا جوجل بلاي أمريكي بقيمة 10 دولار. صالحة لشراء التطبيقات والألعاب وشحن داخل الألعاب.',
    price: 11, 
    category: ServiceCategory.GAMING, 
    serviceType: 'ASSET',
    requiredInputs: [],
    image: 'https://images.unsplash.com/photo-1551651768-d0695079860b?q=80&w=1000&auto=format&fit=crop',
    platform: 'Google Play',
    features: ['كود رقمي فوري', 'حساب أمريكي (US)', 'صالح للألعاب والتطبيقات', 'تسليم آمن للبريد'],
    unitSize: 10,
    unitType: '$',
    previewImage: 'https://images.unsplash.com/photo-1551651768-d0695079860b?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'google-play-25',
    title: 'بطاقة جوجل بلاي 25$ (Google Play)',
    description: 'بطاقة هدايا جوجل بلاي أمريكي بقيمة 25 دولار. اشحن رصيدك واستمتع بملايين التطبيقات.',
    price: 27,
    category: ServiceCategory.GAMING, 
    serviceType: 'ASSET',
    requiredInputs: [],
    image: 'https://images.unsplash.com/photo-1628126235206-5260b9ea6441?q=80&w=1000&auto=format&fit=crop',
    platform: 'Google Play',
    features: ['كود رقمي فوري', 'حساب أمريكي (US)', 'صالح للألعاب والتطبيقات', 'تسليم آمن للبريد'],
    unitSize: 25,
    unitType: '$',
    previewImage: 'https://images.unsplash.com/photo-1628126235206-5260b9ea6441?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'google-play-50',
    title: 'بطاقة جوجل بلاي 50$ (Google Play)',
    description: 'بطاقة هدايا جوجل بلاي أمريكي بقيمة 50 دولار. الرصيد المثالي للاعبين المحترفين.',
    price: 53,
    category: ServiceCategory.GAMING, 
    serviceType: 'ASSET',
    requiredInputs: [],
    image: 'https://images.unsplash.com/photo-1590252973641-13527dac3cae?q=80&w=1000&auto=format&fit=crop',
    platform: 'Google Play',
    features: ['كود رقمي فوري', 'حساب أمريكي (US)', 'صالح للألعاب والتطبيقات', 'تسليم آمن للبريد'],
    unitSize: 50,
    unitType: '$',
    previewImage: 'https://images.unsplash.com/photo-1590252973641-13527dac3cae?q=80&w=1000&auto=format&fit=crop'
  },

  // --- FACEBOOK PAGES ---
  {
    id: 'fb-monetized-page',
    title: 'صفحة فيسبوك مفعلة الربح (Ad Breaks)',
    description: 'صفحة فيسبوك خضراء (Green Status) حققت شروط الربح وجاهزة لربط الحساب البنكي والبدء بجني الأرباح فوراً.',
    price: 180,
    category: ServiceCategory.FACEBOOK_PAGES,
    serviceType: 'ASSET',
    requiredInputs: [],
    image: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=1000&auto=format&fit=crop', // Business/Analytics
    platform: 'Facebook',
    features: ['60k دقيقة مشاهدة', 'سياسات نظيفة', 'مؤهلة للإعلانات المضمنة', 'إمكانية تغيير الاسم'],
    unitSize: 1,
    unitType: 'صفحة',
    maxQuantity: 1,
    previewImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'fb-business-verified',
    title: 'مدير أعمال فيسبوك موثق (BM Verified)',
    description: 'حساب مدير أعمال (Business Manager) موثق بهوية رسمية، بحد صرف يومي مفتوح (No Daily Limit) لإطلاق إعلانات قوية.',
    price: 120,
    category: ServiceCategory.FACEBOOK_PAGES,
    serviceType: 'ASSET',
    requiredInputs: [],
    image: 'https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=1000&auto=format&fit=crop', // Corporate Office
    platform: 'Facebook',
    features: ['موثق بهوية', 'حد صرف مفتوح', 'مشاركة البيكسل', 'جاهز للإعلانات'],
    unitSize: 1,
    unitType: 'حساب',
    maxQuantity: 1
  },
  {
    id: 'fb-verified-blue',
    title: 'صفحة فيسبوك موثقة (Blue Badge)',
    description: 'صفحة موثقة بالعلامة الزرقاء رسمياً. تمنحك مصداقية مطلقة وتصدر في نتائج البحث. نقل ملكية كامل.',
    price: 1200,
    category: ServiceCategory.FACEBOOK_PAGES,
    serviceType: 'ASSET',
    requiredInputs: [],
    image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=1000&auto=format&fit=crop', // Verified Concept
    platform: 'Facebook',
    features: ['علامة زرقاء أصلية', 'حماية ضد الإغلاق', 'وصول (Reach) عالي جداً', 'دعم مدير أعمال'],
    unitSize: 1,
    unitType: 'صفحة',
    maxQuantity: 1
  },
  {
    id: 'fb-verification-service',
    title: 'خدمة توثيق صفحات فيسبوك',
    description: 'خدمة احترافية لتوثيق صفحتك الحالية بالعلامة الزرقاء (Meta Verified) بطرق رسمية.',
    price: 450,
    category: ServiceCategory.FACEBOOK_PAGES,
    serviceType: 'SERVICE',
    requiredInputs: ['LINK'],
    image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=1000&auto=format&fit=crop',
    platform: 'Facebook',
    features: ['توثيق رسمي', 'للشخصيات والشركات', 'ضمان الخدمة'],
    unitSize: 1,
    unitType: 'خدمة'
  },
  {
    id: 'fb-aged-2015',
    title: 'صفحة فيسبوك قديمة (2010-2018)',
    description: 'صفحات قديمة عالية الثقة (High Trust Authority) ممتازة لإطلاق الحملات الإعلانية وتجنب الحظر.',
    price: 45,
    category: ServiceCategory.FACEBOOK_PAGES,
    serviceType: 'ASSET',
    requiredInputs: [],
    image: 'https://images.unsplash.com/photo-1585241936939-be0596f63a5c?q=80&w=1000&auto=format&fit=crop', // Vintage/Classic feel
    platform: 'Facebook',
    features: ['تاريخ إنشاء قديم', 'جودة إعلانية عالية', 'متاحة لتغيير الاسم', 'IP نظيف'],
    unitSize: 1,
    unitType: 'صفحة',
    maxQuantity: 5
  },
  {
    id: 'fb-100k-fans',
    title: 'صفحة 100 ألف متابع (عربي)',
    description: 'صفحة مليونية أو كبيرة بجمهور عربي حقيقي ومتفاعل. مثالية للبدء بمشروع تجاري كبير أو براند.',
    price: 350,
    category: ServiceCategory.FACEBOOK_PAGES,
    serviceType: 'ASSET',
    requiredInputs: [],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop', // Crowd/Audience
    platform: 'Facebook',
    features: ['100k متابع حقيقي', 'تفاعل نشط', 'جمهور خليجي/عربي', 'خالية من المخالفات'],
    unitSize: 100000,
    unitType: 'متابع',
    maxQuantity: 1
  },

  // Social Growth (Packs)
  {
    id: 'ig-growth-starter',
    title: 'باقة النمو للمؤثرين (Instagram)',
    description: 'خطة متكاملة لزيادة المتابعين الحقيقيين والتفاعل لتعزيز ظهور حسابك في الاكسبلور.',
    price: 49,
    category: ServiceCategory.SOCIAL_GROWTH,
    serviceType: 'GROWTH',
    requiredInputs: ['LINK'],
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop', // Influencer/Camera
    platform: 'Instagram',
    features: ['1000 متابع نشط', 'تحليل للحساب', 'ضمان الثبات 90 يوم'],
    unitSize: 1,
    unitType: 'باقة',
    previewImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'tiktok-viral-pack',
    title: 'حزمة الانتشار الفيروسي (TikTok)',
    description: 'دفعة قوية لخوارزميات تيك توك تتضمن مشاهدات وتفاعل لرفع احتمالية التصدر.',
    price: 39,
    category: ServiceCategory.SOCIAL_GROWTH,
    serviceType: 'GROWTH',
    requiredInputs: ['LINK'],
    image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?q=80&w=1000&auto=format&fit=crop', // Neon/Viral
    platform: 'TikTok',
    features: ['100k مشاهدة عالية الجودة', '500 مشاركة', 'دعم فني للأفكار'],
    unitSize: 1,
    unitType: 'حزمة',
    previewImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop'
  },

  // Gaming
  {
    id: 'freefire-diamonds-big',
    title: 'شحن جواهر فري فاير (2200 جوهرة)',
    description: 'شحن فوري عبر المعرف (ID) لجميع السيرفرات. آمن ورسمي 100%.',
    price: 20,
    category: ServiceCategory.GAMING,
    serviceType: 'TOPUP',
    requiredInputs: ['PLAYER_ID'],
    image: 'https://images.unsplash.com/photo-1599582260672-46d5f7f91754?q=80&w=1000&auto=format&fit=crop', // Battle Royale Fire
    platform: 'FreeFire',
    features: ['شحن عبر ID فقط', 'وصول فوري', 'بونس إضافي'],
    unitSize: 2200,
    unitType: 'جوهرة',
    previewImage: 'https://images.unsplash.com/photo-1592478411213-61535fdd861d?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'pubg-uc-elite',
    title: 'شحن شدات ببجي (PUBG UC)',
    description: 'حزمة شدات ببجي موبايل العالمية. تفعيل فوري للكود.',
    price: 25,
    category: ServiceCategory.GAMING,
    serviceType: 'TOPUP',
    requiredInputs: ['PLAYER_ID'],
    image: 'https://images.unsplash.com/photo-1632210853503-68d2b339199d?q=80&w=1000&auto=format&fit=crop', // Tactical Gear
    platform: 'PUBG',
    features: ['1800 UC', 'نسخة عالمية', 'كود رقمي فوري'],
    unitSize: 1800,
    unitType: 'UC'
  },
  {
    id: 'fortnite-vbucks-2800',
    title: 'شحن في-بوكس فورتنايت (2800 V-Bucks)',
    description: 'اشحن رصيد V-Bucks في فورتنايت لشراء أحدث السكنات والباتل باس. شحن رسمي وآمن.',
    price: 22,
    category: ServiceCategory.GAMING,
    serviceType: 'TOPUP',
    requiredInputs: ['PLAYER_ID'],
    image: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?q=80&w=1000&auto=format&fit=crop', // Colorful/Gaming
    platform: 'Fortnite',
    features: ['جميع المنصات', 'شحن رسمي', 'بدون باند'],
    unitSize: 2800,
    unitType: 'V-Bucks'
  },
  {
    id: 'cod-points-2400',
    title: 'نقاط كود موبايل/وارزون (2400 CP)',
    description: 'نقاط Call of Duty (CP) لشراء الباقات والأسلحة. تدعم COD Mobile و Warzone.',
    price: 20,
    category: ServiceCategory.GAMING,
    serviceType: 'TOPUP',
    requiredInputs: ['PLAYER_ID'],
    image: 'https://images.unsplash.com/photo-1555617981-d704c7c34b12?q=80&w=1000&auto=format&fit=crop', // Military/Gaming
    platform: 'Call of Duty',
    features: ['شحن عبر ID', 'وصول فوري', 'آمن 100%'],
    unitSize: 2400,
    unitType: 'CP'
  },
  {
    id: 'apex-coins-2150',
    title: 'عملات أبيكس ليجندز (2150 Apex Coins)',
    description: 'حزمة عملات Apex لشراء الباتل باس والسكنات الأسطورية. كود رقمي عالمي.',
    price: 19,
    category: ServiceCategory.GAMING,
    serviceType: 'TOPUP',
    requiredInputs: ['PLAYER_ID'],
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop', // Sci-fi Gaming
    platform: 'Apex Legends',
    features: ['كود عالمي', 'تفعيل فوري', 'ضمان العمل'],
    unitSize: 2150,
    unitType: 'Coins'
  },

  // Streaming
  {
    id: 'netflix-premium-4k',
    title: 'حساب Netflix Premium (4K)',
    description: 'استمتع بأفلامك ومسلسلاتك المفضلة بجودة 4K HDR بدون إعلانات. ملف خاص بك.',
    price: 5,
    category: ServiceCategory.STREAMING,
    serviceType: 'SUBSCRIPTION',
    requiredInputs: [], // Just delivery
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8efe85?q=80&w=1000&auto=format&fit=crop', // Netflix Red
    platform: 'Netflix',
    features: ['جودة 4K Ultra HD', 'ملف خاص مقفل برقم', 'ضمان كامل المدة'],
    unitSize: 1,
    unitType: 'شهر',
    previewImage: 'https://images.unsplash.com/photo-1522869635100-8f47562584a5?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'spotify-premium-individual',
    title: 'اشتراك Spotify Premium',
    description: 'ترقية حسابك الخاص إلى بريميوم. استماع بدون إعلانات، جودة صوت عالية، وتحميل الأغاني.',
    price: 4,
    category: ServiceCategory.STREAMING,
    serviceType: 'SUBSCRIPTION',
    requiredInputs: ['EMAIL'],
    image: 'https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?q=80&w=1000&auto=format&fit=crop', // Spotify Green
    platform: 'Spotify',
    features: ['على ايميلك الشخصي', 'بدون إعلانات', 'ضمان كامل المدة'],
    unitSize: 1,
    unitType: 'شهر'
  },

  // Accounts & Assets
  {
    id: 'tiktok-us-beta',
    title: 'حساب تيك توك أمريكي (Beta Program)',
    description: 'حساب جاهز IP أمريكي، مؤهل للانضمام لبرنامج الإبداع (Creativity Program) للربح بالدولار.',
    price: 85,
    category: ServiceCategory.ACCOUNTS,
    serviceType: 'ASSET',
    requiredInputs: [],
    image: 'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=1000&auto=format&fit=crop', // USA/Flag concept
    platform: 'TikTok',
    features: ['IP أمريكي أصلي', 'RPM مرتفع', 'ايميل أساسي'],
    unitSize: 1,
    unitType: 'حساب',
    maxQuantity: 1,
    previewImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'tiktok-uk-account',
    title: 'حساب تيك توك بريطاني (UK)',
    description: 'استهدف الجمهور الأوروبي والبريطاني بقوة شرائية عالية مع حساب تيك توك بريطاني موثوق.',
    price: 60,
    category: ServiceCategory.ACCOUNTS,
    serviceType: 'ASSET',
    requiredInputs: [],
    image: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?q=80&w=1000&auto=format&fit=crop', // UK
    platform: 'TikTok',
    features: ['سوق بريطاني', 'بدون رقم هاتف', 'تسليم فوري'],
    unitSize: 1,
    unitType: 'حساب'
  },
  {
    id: 'linkedin-premium-biz',
    title: 'تفعيل LinkedIn Premium Business',
    description: 'اشتراك لينكد إن بزنس على حسابك الشخصي لمدة 6 أشهر. ميزات InMail والبحث المتقدم.',
    price: 45,
    category: ServiceCategory.ACCOUNTS,
    serviceType: 'SUBSCRIPTION',
    requiredInputs: ['LINK'],
    image: 'https://images.unsplash.com/photo-1611944212129-29990460f15d?q=80&w=1000&auto=format&fit=crop', // Office/Business
    platform: 'LinkedIn',
    features: ['تفعيل 6 أشهر', 'رؤية من زار ملفك', 'رسائل InMail مفتوحة'],
    unitSize: 6,
    unitType: 'أشهر'
  },

  // Interactions
  {
    id: 'custom-engagement',
    title: 'إدارة التفاعل والردود',
    description: 'فريق متخصص للتعليق والتفاعل مع جمهورك لزيادة الثقة والمصداقية.',
    price: 25,
    category: ServiceCategory.INTERACTIONS,
    serviceType: 'SERVICE',
    requiredInputs: ['LINK'],
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop', // Meeting/Discussion
    platform: 'General',
    features: ['50 تعليق مخصص', 'حسابات عربية', 'آمن 100%'],
    unitSize: 50,
    unitType: 'تعليق'
  },
  {
    id: 'telegram-members',
    title: 'أعضاء تيليجرام (Telegram Members)',
    description: 'زيادة أعضاء قنوات ومجموعات تيليجرام. أعضاء حقيقيين ومتفاعلين.',
    price: 15,
    category: ServiceCategory.SOCIAL_GROWTH,
    serviceType: 'GROWTH',
    requiredInputs: ['LINK'],
    image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=1000&auto=format&fit=crop', // Telegram Blue (using generic blue tech)
    platform: 'Telegram',
    features: ['سرعة عالية', 'بدون هبوط', 'للقنوات والمجموعات'],
    unitSize: 1000,
    unitType: 'عضو'
  },

  // Ads Management & Local SEO
  {
    id: 'google-agency-acc',
    title: 'حساب إعلاني Google Ads (وكالة)',
    description: 'حساب إعلاني موثق ومجهز للإنفاق العالي دون مشاكل التعليق المعتادة.',
    price: 199,
    category: ServiceCategory.ADS_MANAGEMENT,
    serviceType: 'ASSET',
    requiredInputs: [],
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=1000&auto=format&fit=crop', // Analytics Dashboard
    platform: 'Google',
    features: ['توثيق هوية كامل', 'جاهزية فورية', 'دعم استشاري'],
    unitSize: 1,
    unitType: 'حساب',
    maxQuantity: 1,
    previewImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'google-maps-seo',
    title: 'إضافة موقع مشروعك على خرائط Google مع تقيم بنجوم',
    description: 'خدمة متكاملة لإضافة موقع مشروعك أو نشاطك التجاري على خرائط جوجل (Google Maps) مع تقييمات 5 نجوم لتعزيز الثقة.',
    price: 49,
    category: ServiceCategory.ADS_MANAGEMENT,
    serviceType: 'SERVICE',
    requiredInputs: ['LINK'], // Link to location or name
    image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop', // Map/Location
    platform: 'Google',
    features: ['إضافة الموقع على الخريطة', '10 تقييمات 5 نجوم', 'تحسين ظهور البحث', 'دعم إضافة الصور'],
    unitSize: 1,
    unitType: 'مشروع'
  },
  {
    id: 'shopify-store-setup',
    title: 'بناء متجر دروبشيبينغ احترافي',
    description: 'متجر جاهز بالمنتجات الرابحة مع هوية بصرية كاملة.',
    price: 399,
    category: ServiceCategory.WEB_DEV,
    serviceType: 'SERVICE',
    requiredInputs: [], // We discuss details later
    image: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?q=80&w=1000&auto=format&fit=crop', // Coding/Web
    platform: 'Web',
    features: ['منتجات رابحة', 'ثيم احترافي', 'تطبيقات المبيعات'],
    unitSize: 1,
    unitType: 'متجر',
    previewImage: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?q=80&w=1000&auto=format&fit=crop'
  }
];

export const EARN_TASKS: TaskItem[] = [
  {
    id: 'community-join',
    title: 'انضم لمجتمعنا على تيليجرام',
    type: 'FOLLOW',
    points: 100,
    platform: 'General',
    url: '#'
  },
  {
    id: 'insta-support',
    title: 'دعم المحتوى التقني (انستقرام)',
    type: 'LIKE',
    points: 30,
    platform: 'Instagram',
    url: '#'
  },
  {
    id: 'tweet-share',
    title: 'نشر تغريدة عن خدماتنا',
    type: 'SHARE',
    points: 75,
    platform: 'Twitter',
    url: '#'
  }
];