export enum Tone {
  Friendly = 'Friendly',
  Formal = 'Formal',
  Humorous = 'Humorous',
  Romantic = 'Romantic',
  Polite = 'Polite',
  Persuasive = 'Persuasive',
  Sarcastic = 'Sarcastic',
  Motivational = 'Motivational',
  Flirty = 'Flirty',
  Caring = 'Caring',
  Urgent = 'Urgent',
  Celebratory = 'Celebratory',
}

export enum Length {
  Short = 'Short',
  Medium = 'Medium',
  Long = 'Long',
}

export enum Language {
  English = 'English',
  Arabic = 'Arabic',
  Bengali = 'Bengali',
  Danish = 'Danish',
  Dutch = 'Dutch',
  Finnish = 'Finnish',
  French = 'French',
  German = 'German',
  Greek = 'Greek',
  Hebrew = 'Hebrew',
  Hindi = 'Hindi',
  Hinglish = 'Hinglish',
  Indonesian = 'Indonesian',
  Italian = 'Italian',
  Japanese = 'Japanese',
  Kashmiri = 'Kashmiri',
  KashmiriMixed = 'Kashmiri (Mixed)',
  Korean = 'Korean',
  Mandarin = 'Mandarin (Simplified)',
  Norwegian = 'Norwegian',
  Polish = 'Polish',
  Portuguese = 'Portuguese',
  Russian = 'Russian',
  Spanish = 'Spanish',
  Swedish = 'Swedish',
  Thai = 'Thai',
  Turkish = 'Turkish',
  Urdu = 'Urdu',
  Vietnamese = 'Vietnamese',
}

export enum Formality {
  Casual = 'Casual (with slang)',
  Standard = 'Standard',
  Formal = 'Formal (professional)',
}

export const Templates: { [key: string]: string } = {
  'Select a template...': '',
  'Birthday Wish': 'Happy birthday to my friend.',
  'Meeting Reminder': 'Remind my team about the meeting tomorrow.',
  'Thank You': 'Thank someone for their help.',
  'Apology': 'Apologize for being late.',
  'Date Invite': 'Ask someone out on a date.',
  'Follow-up': 'Follow up after a meeting.',
  'Good Luck': 'Wish someone good luck for an exam.',
};