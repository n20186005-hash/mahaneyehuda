/**
 * מקור יחיד לעובדות הקשות על שוק מחנה יהודה.
 * כל שינוי בשם, כתובת, קואורדינטות, דירוג או קישורי מפה נעשה כאן בלבד.
 */
export const SITE_URL = 'https://mahaneyehuda.org';

export const ATTRACTION = {
  // שמות: עברית (שפת האתר) + השם הרשמי באנגלית לקשירת הישות ברשת
  nameHe: 'שוק מחנה יהודה',
  nameEn: 'Mahaneh Yehudah Market',
  shortNameHe: 'מחנה יהודה',
  shortNameEn: 'Mahane Yehuda',
  alternateNames: [
    'Mahaneh Yehudah Market',
    'Mahane Yehuda Market',
    'Jerusalem Mahaneh Yehudah Market',
    'שוק מחנה יהודה ירושלים'
  ],
  // היררכיה גאוגרפית
  cityHe: 'ירושלים',
  cityEn: 'Jerusalem',
  regionHe: 'מחוז ירושלים',
  regionEn: 'Jerusalem District',
  countryHe: 'ישראל',
  countryEn: 'Israel',
  countryCode: 'IL',
  // כתובת
  streetAddressHe: 'רחוב אגריפס 90',
  streetAddressEn: 'Agripas St 90',
  // מיקום
  latitude: 31.785556,
  longitude: 35.212222,
  plusCode: 'Q6M7+W3',
  plusCodeLabel: 'Q6M7+W3 ירושלים, ישראל',
  // מפות
  mapsShareUrl: 'https://maps.app.goo.gl/v8vQ8S95CBASWi8r7',
  mapsEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6041.062666109796!2d35.21006057730445!3d31.78483547409407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1502d628437b49bd%3A0xe1566ca192ce80f!2z6ams5ZOI5bC86IC26IOh6L6-5biC5Zy6!5e1!3m2!1she!2sil!4v1787566630322!5m2!1she!2sil',
  // קטגוריה ודירוג (מסונכרן מ-Google Maps)
  categoryHe: 'שוק עירוני',
  ratingValue: 4.6,
  ratingCount: 66960,
  ratingSourceNote: 'Google Maps',
  ratingSyncedAt: 'ספטמבר 2026',
  // אתרים סמכותיים המזהים את אותה ישות
  sameAs: [
    'https://maps.app.goo.gl/v8vQ8S95CBASWi8r7',
    'https://en.wikipedia.org/wiki/Mahane_Yehuda_Market',
    'https://he.wikipedia.org/wiki/%D7%A9%D7%95%D7%A7_%D7%9E%D7%97%D7%A0%D7%94_%D7%99%D7%94%D7%95%D7%93%D7%94'
  ],
  // נקודות עניין סמוכות
  nearby: [
    { nameHe: 'נחלאות', nameEn: 'Nahlaot' },
    { nameHe: 'רחוב יפו וכיכר הדוידקה', nameEn: 'Jaffa Road & Davidka Square' },
    { nameHe: 'גן סאקר', nameEn: 'Sacher Park' },
    { nameHe: 'העיר העתיקה', nameEn: 'The Old City of Jerusalem' }
  ],
  // פורטל תיירות ממשלתי רשמי (קישור סמכות ראשי)
  tourismPortal: {
    label: 'משרד התיירות — הפורטל הממשלתי הרשמי',
    url: 'https://www.gov.il/he/departments/ministry_of_tourism/govil-landing-page'
  },
  // גופים רשמיים — קישורי יציאה לחיזוק אמינות (Sources)
  officialLinks: [
    { label: 'עיריית ירושלים', url: 'https://www.jerusalem.muni.il/' },
    { label: 'הרשות לפיתוח ירושלים — תיירות', url: 'https://www.jda.gov.il/תיירות/' },
    {
      label: 'משרד התיירות',
      url: 'https://www.gov.il/he/departments/ministry_of_tourism/govil-landing-page'
    },
    { label: 'רשות שדות התעופה', url: 'https://www.iaa.gov.il/' },
    { label: 'צוות תכנית אב לתחבורה ירושלים', url: 'https://www.jerusalemtransport.co.il/' }
  ]
} as const;

export const SITE_NAME = `שוק מחנה יהודה (${ATTRACTION.nameEn}) — מדריך מבקרים לירושלים`;

/** כותרת לעמודי משנה: מוסיף את שם הישות כסיומת אחידה. */
export function withSiteName(title: string): string {
  return title.includes(ATTRACTION.nameHe) ? title : `${title} | ${ATTRACTION.nameHe}`;
}
