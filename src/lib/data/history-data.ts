import type { HistoryEvent, HistoryCategory } from '@/types'

export const historyEvents: HistoryEvent[] = [
  {
    id: '1',
    year: -550,
    title: 'Cyrus the Great Founds the Achaemenid Empire',
    titleFa: 'کوروش بزرگ امپراتوری هخامنشی را بنیان‌گذاری کرد',
    summary: 'Cyrus II conquers Median, Lydian, and Babylonian empires, establishing the largest empire the world had seen. Known for the Cyrus Cylinder, often considered the first declaration of human rights.',
    category: 'ancient',
    significance: 5,
    images: ['https://picsum.photos/seed/history1/800/450'],
    sources: ['Encyclopedia Britannica', 'UNESCO'],
  },
  {
    id: '2',
    year: -330,
    title: 'Alexander Conquers the Persian Empire',
    summary: 'Alexander the Great defeats Darius III, ending the Achaemenid dynasty. Persian culture and administration continue to influence the region.',
    category: 'ancient',
    significance: 4,
    images: ['https://picsum.photos/seed/history2/800/450'],
    sources: ['Ancient History Encyclopedia'],
  },
  {
    id: '3',
    year: 651,
    title: 'Arab Conquest of Persia',
    summary: 'The Sasanian Empire falls to the Arab Rashidun Caliphate, beginning the gradual Islamization of Iran while Persian culture endures.',
    category: 'medieval',
    significance: 5,
    images: ['https://picsum.photos/seed/history3/800/450'],
    sources: ['Cambridge History of Iran'],
  },
  {
    id: '4',
    year: 1010,
    title: 'Ferdowsi Completes the Shahnameh',
    titleFa: 'فردوسی شاهنامه را به پایان رساند',
    summary: 'The epic poem "Book of Kings" preserves Persian language and mythology, becoming a cornerstone of Iranian cultural identity.',
    category: 'medieval',
    significance: 5,
    images: ['https://picsum.photos/seed/history4/800/450'],
    sources: ['UNESCO Memory of the World'],
  },
  {
    id: '5',
    year: 1501,
    title: 'Safavid Dynasty Establishes Shia Islam',
    summary: 'Shah Ismail I founds the Safavid dynasty and declares Twelver Shia Islam the state religion, shaping modern Iranian religious identity.',
    category: 'medieval',
    significance: 5,
    images: ['https://picsum.photos/seed/history5/800/450'],
    sources: ['Cambridge History of Iran'],
  },
  {
    id: '6',
    year: 1906,
    month: 8,
    title: 'Persian Constitutional Revolution',
    titleFa: 'انقلاب مشروطه',
    summary: 'Mass protests lead to the establishment of Iran\'s first parliament (Majles) and constitution, limiting royal power.',
    category: 'qajar',
    significance: 5,
    images: ['https://picsum.photos/seed/history6/800/450'],
    sources: ['Iran Chamber Society'],
  },
  {
    id: '7',
    year: 1925,
    title: 'Reza Khan Becomes Shah',
    summary: 'Reza Khan overthrows the Qajar dynasty, founding the Pahlavi dynasty and beginning rapid modernization of Iran.',
    category: 'pahlavi',
    significance: 4,
    images: ['https://picsum.photos/seed/history7/800/450'],
    sources: ['Encyclopedia Iranica'],
  },
  {
    id: '8',
    year: 1953,
    month: 8,
    day: 19,
    title: 'CIA/MI6 Coup Overthrows Mosaddegh',
    titleFa: 'کودتای ۲۸ مرداد',
    summary: 'Democratically elected Prime Minister Mohammad Mosaddegh is overthrown in a coup orchestrated by the CIA and MI6, restoring Shah Mohammad Reza Pahlavi to power.',
    category: 'pahlavi',
    significance: 5,
    images: ['https://picsum.photos/seed/history8/800/450'],
    sources: ['CIA declassified documents', 'The Guardian'],
  },
  {
    id: '9',
    year: 1979,
    month: 2,
    day: 11,
    title: 'Islamic Revolution',
    titleFa: 'انقلاب اسلامی',
    summary: 'Mass protests lead to the overthrow of the Shah. Ayatollah Khomeini returns from exile to establish the Islamic Republic of Iran.',
    category: 'revolution',
    significance: 5,
    images: ['https://picsum.photos/seed/history9/800/450'],
    sources: ['BBC', 'Encyclopedia Britannica'],
  },
  {
    id: '10',
    year: 1979,
    month: 11,
    day: 4,
    title: 'Iran Hostage Crisis Begins',
    summary: 'Students storm the US Embassy in Tehran, taking 52 American diplomats hostage for 444 days, defining US-Iran relations for decades.',
    category: 'islamic-republic',
    significance: 4,
    images: ['https://picsum.photos/seed/history10/800/450'],
    sources: ['State Department archives'],
  },
  {
    id: '11',
    year: 1980,
    month: 9,
    title: 'Iran-Iraq War Begins',
    summary: 'Iraq invades Iran, beginning an 8-year war that kills over a million people and shapes regional politics.',
    category: 'islamic-republic',
    significance: 5,
    images: ['https://picsum.photos/seed/history11/800/450'],
    sources: ['UN archives', 'Encyclopedia Britannica'],
  },
  {
    id: '12',
    year: 2009,
    month: 6,
    title: 'Green Movement Protests',
    titleFa: 'جنبش سبز',
    summary: 'Millions protest disputed election results. The movement is suppressed but represents the largest demonstrations since 1979.',
    category: 'protest',
    significance: 4,
    images: ['https://picsum.photos/seed/history12/800/450'],
    sources: ['Human Rights Watch', 'BBC'],
  },
  {
    id: '13',
    year: 2022,
    month: 9,
    day: 16,
    title: 'Mahsa Amini Dies in Custody',
    titleFa: 'مهسا امینی',
    summary: 'Mahsa Jina Amini dies after arrest by morality police, sparking the "Woman, Life, Freedom" movement - the largest protests since 1979.',
    category: 'protest',
    significance: 5,
    images: ['https://picsum.photos/seed/history13/800/450'],
    sources: ['Amnesty International', 'UN Human Rights Council'],
  },
  {
    id: '14',
    year: 2022,
    month: 9,
    day: 17,
    title: 'Woman, Life, Freedom Movement Begins',
    titleFa: 'زن، زندگی، آزادی',
    summary: 'Protests erupt across Iran and globally with the slogan "Woman, Life, Freedom" (Zan, Zendegi, Azadi), demanding fundamental change.',
    category: 'protest',
    significance: 5,
    images: ['https://picsum.photos/seed/history14/800/450'],
    sources: ['Human Rights Watch', 'BBC', 'The Guardian'],
  },
]

export const categoryInfo: Record<HistoryCategory, { label: string; color: string; years: string }> = {
  ancient: { label: 'Ancient Persia', color: 'bg-amber-500', years: '550 BCE - 651 CE' },
  medieval: { label: 'Medieval Period', color: 'bg-emerald-500', years: '651 - 1501' },
  qajar: { label: 'Qajar Dynasty', color: 'bg-purple-500', years: '1789 - 1925' },
  pahlavi: { label: 'Pahlavi Era', color: 'bg-blue-500', years: '1925 - 1979' },
  revolution: { label: '1979 Revolution', color: 'bg-red-500', years: '1979' },
  'islamic-republic': { label: 'Islamic Republic', color: 'bg-slate-500', years: '1979 - Present' },
  protest: { label: 'Protest Movements', color: 'bg-pink-500', years: 'Various' },
}

export function getHistoryEventsByCategory(category?: HistoryCategory): HistoryEvent[] {
  if (!category) return historyEvents
  return historyEvents.filter((e) => e.category === category)
}

export function getHistoryEventById(id: string): HistoryEvent | undefined {
  return historyEvents.find((e) => e.id === id)
}

export function formatHistoryDate(event: HistoryEvent): string {
  const year = event.year < 0 ? `${Math.abs(event.year)} BCE` : `${event.year}`
  if (event.month && event.day) {
    const date = new Date(Math.abs(event.year), event.month - 1, event.day)
    const monthName = date.toLocaleDateString('en-US', { month: 'long' })
    return `${monthName} ${event.day}, ${year}`
  }
  if (event.month) {
    const date = new Date(2000, event.month - 1)
    const monthName = date.toLocaleDateString('en-US', { month: 'long' })
    return `${monthName} ${year}`
  }
  return year
}
