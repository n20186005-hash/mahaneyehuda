import { TOPICS, GROUP_LABELS, type Topic, type TopicGroup } from '../data/topics';

/** מזהה נתיב לנושא: /<group>/<slug>/ */
export function topicPath(topic: Pick<Topic, 'group' | 'slug'>): string {
  return `/${topic.group}/${topic.slug}/`;
}

/** חיפוש נושא לפי slug (חוצה קבוצות, ה־slug ייחודי) */
export function getTopic(slug: string): Topic | undefined {
  return TOPICS.find((t) => t.slug === slug);
}

/** כל הנושאים */
export function allTopics(): Topic[] {
  return TOPICS;
}

/** נושאים בקבוצה מסוימת (לפי סדר ההגדרה) */
export function topicsByGroup(group: TopicGroup): Topic[] {
  return TOPICS.filter((t) => t.group === group);
}

/** תווית עברית לקבוצה */
export function groupLabel(group: TopicGroup): string {
  return GROUP_LABELS[group];
}

/** רשימת קבוצות לפי סדר רציוני לתצוגה */
export const GROUP_ORDER: TopicGroup[] = [
  'visit',
  'history',
  'food',
  'shopping',
  'culture',
  'nearby',
  'itineraries'
];

/** פתרון רשימת slugs לרשימת נושאים (מסנן לא קיימים) */
export function resolveRelated(slugs: string[]): Topic[] {
  return slugs
    .map((s) => getTopic(s))
    .filter((t): t is Topic => Boolean(t));
}
