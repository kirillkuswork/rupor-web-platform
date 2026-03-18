import { z } from 'zod';
import {
  NOT_CYRILLIC_EMAIL_REGEX,
  USER_EMAIL_LENGTH_MAX,
} from '@/features/Auth/consts/user';

export enum FAQReportToFormFields {
  userEmail = 'userEmail',
  comment = 'comment',
}

export const ModerationVideoComplaint = {
  Undefined: 'VIDEO_COMPLAINT_UNDEFINED',
  Sex: 'VIDEO_COMPLAINT_SEX',
  Violence: 'VIDEO_COMPLAINT_VIOLENCE',
  Copyright: 'VIDEO_COMPLAINT_COPYRIGHT',
  BannedItem: 'VIDEO_COMPLAINT_BANNED_ITEM',
  Terrorism: 'VIDEO_COMPLAINT_TERRORISM',
  HateSpeech: 'VIDEO_COMPLAINT_HATE_SPEECH',
  Spam: 'VIDEO_COMPLAINT_SPAM',
  Another: 'VIDEO_COMPLAINT_ANOTHER',
} as const;

export const SupportProblemVideo = {
  Undefined: 'PROBLEM_TYPE_VIDEO_UNDEFINED',
  PlayingFails: 'PROBLEM_TYPE_VIDEO_PLAYING_FAILS',
  Freezes: 'PROBLEM_TYPE_VIDEO_FREEZES',
  AudioIssues: 'PROBLEM_TYPE_VIDEO_AUDIO_ISSUES',
  PlayerIssue: 'PROBLEM_TYPE_VIDEO_PLAYER_ISSUE',
  Another: 'PROBLEM_TYPE_VIDEO_ANOTHER',
} as const;

type ModerationVideoComplaintType =
  (typeof ModerationVideoComplaint)[keyof typeof ModerationVideoComplaint];
type SupportProblemTypeVideo =
  (typeof SupportProblemVideo)[keyof typeof SupportProblemVideo];

const faqEmailValidation = z.string()
  .email('Zod_Email_Validation_Valid_Email')
  .max(USER_EMAIL_LENGTH_MAX, 'Zod_Email_Validation_Valid_Email')
  .regex(NOT_CYRILLIC_EMAIL_REGEX, 'Zod_Email_Validation_Valid_Email');

const faqCommentValidation = z.string()
  .trim()
  .min(1, 'Zod_Faq_Comment_Validation_Message')
  .max(1000, 'Zod_Faq_Comment_Validation_Limit')
  .optional();

export const faqFormeSchema = z.object({
  userEmail: faqEmailValidation,
  comment: faqCommentValidation,
});

export type FaqFormData = z.infer<typeof faqFormeSchema>;

export interface IFormSubmitData {
  complaints?: ModerationVideoComplaintType[] & SupportProblemTypeVideo[];
  description?: string;
}

export interface ReportFAQProblemRequest {
  id?: string;
  name?: string;
}
