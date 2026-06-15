// Centralized mock data for the CPD Nursing Portal.
// All values are illustrative and reset on every load.

export type TrendDirection = "up" | "down" | "flat";

export interface CurrentUser {
  name: string;
  role: string;
  department: string;
  initials: string;
  yearsExp: number;
  email: string;
  phone: string;
}

export const currentUser: CurrentUser = {
  name: "Sarah Johnson",
  role: "Staff Nurse",
  department: "Cardiology",
  initials: "SJ",
  yearsExp: 5,
  email: "sarah.johnson@hospital.nhs.uk",
  phone: "+44 7700 900123",
};

export interface KPIDatum {
  id: string;
  label: string;
  value: number;
  target: number | null;
  icon: string;
  color: string;
  trend: TrendDirection;
  trendValue: string;
  suffix: string;
}

export const kpiData: KPIDatum[] = [
  {
    id: "total-hours",
    label: "Total CPD Hours",
    value: 42,
    target: 50,
    icon: "Clock",
    color: "#0077B6",
    trend: "up",
    trendValue: "+6 this month",
    suffix: "hrs",
  },
  {
    id: "required-hours",
    label: "Required Hours",
    value: 50,
    target: null,
    icon: "Target",
    color: "#00B4D8",
    trend: "flat",
    trendValue: "Annual target",
    suffix: "hrs",
  },
  {
    id: "hours-remaining",
    label: "Hours Remaining",
    value: 8,
    target: null,
    icon: "Hourglass",
    color: "#F4A261",
    trend: "down",
    trendValue: "-6 vs last month",
    suffix: "hrs",
  },
  {
    id: "completed-activities",
    label: "Completed Activities",
    value: 18,
    target: null,
    icon: "CheckCircle2",
    color: "#2E8B57",
    trend: "up",
    trendValue: "+3 this month",
    suffix: "",
  },
  {
    id: "pending-activities",
    label: "Pending Activities",
    value: 3,
    target: null,
    icon: "Clock4",
    color: "#00B4D8",
    trend: "flat",
    trendValue: "Awaiting approval",
    suffix: "",
  },
  {
    id: "expiring-certs",
    label: "Expiring Certifications",
    value: 2,
    target: null,
    icon: "AlertTriangle",
    color: "#E63946",
    trend: "up",
    trendValue: "Action needed",
    suffix: "",
  },
];

export type ActivityType =
  | "Workshop"
  | "Conference"
  | "E-Learning"
  | "Seminar"
  | "Simulation"
  | "Webinar";

export type RegistrationStatus = "Registered" | "Open" | "Waitlist" | "Full";

export interface UpcomingActivity {
  id: string;
  title: string;
  date: string;
  venue: string;
  type: ActivityType;
  registrationStatus: RegistrationStatus;
  hours: number;
  isOnline: boolean;
  instructor: string;
}

export const upcomingActivities: UpcomingActivity[] = [
  {
    id: "act-1",
    title: "Advanced Cardiac Life Support (ACLS) Refresher",
    date: "2026-06-22",
    venue: "Simulation Suite, Block C",
    type: "Simulation",
    registrationStatus: "Registered",
    hours: 6,
    isOnline: false,
    instructor: "Dr. Mark Reynolds",
  },
  {
    id: "act-2",
    title: "Infection Prevention & Control Update",
    date: "2026-06-25",
    venue: "Online",
    type: "Webinar",
    registrationStatus: "Open",
    hours: 2,
    isOnline: true,
    instructor: "Linda Carter, IPC Lead",
  },
  {
    id: "act-3",
    title: "Wound Care Management Workshop",
    date: "2026-07-02",
    venue: "Education Centre, Room 4",
    type: "Workshop",
    registrationStatus: "Open",
    hours: 4,
    isOnline: false,
    instructor: "Sister Amelia Brooks",
  },
  {
    id: "act-4",
    title: "National Cardiology Nursing Conference",
    date: "2026-07-10",
    venue: "ICC, Birmingham",
    type: "Conference",
    registrationStatus: "Waitlist",
    hours: 12,
    isOnline: false,
    instructor: "Multiple Speakers",
  },
  {
    id: "act-5",
    title: "Medication Safety & Pharmacology",
    date: "2026-07-15",
    venue: "Online",
    type: "E-Learning",
    registrationStatus: "Open",
    hours: 3,
    isOnline: true,
    instructor: "Self-paced",
  },
  {
    id: "act-6",
    title: "Leadership in Clinical Practice Seminar",
    date: "2026-07-21",
    venue: "Lecture Theatre A",
    type: "Seminar",
    registrationStatus: "Full",
    hours: 5,
    isOnline: false,
    instructor: "Prof. Helen Whitfield",
  },
];

export type CertStatus = "Active" | "Expiring Soon" | "Expired";

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  expiryDate: string;
  issuedDate: string;
  status: CertStatus;
  category: string;
  credentialId: string;
}

export const certifications: Certification[] = [
  {
    id: "cert-1",
    name: "Basic Life Support (BLS)",
    issuer: "Resuscitation Council UK",
    issuedDate: "2025-08-01",
    expiryDate: "2027-08-01",
    status: "Active",
    category: "Clinical",
    credentialId: "BLS-2025-4471",
  },
  {
    id: "cert-2",
    name: "Advanced Cardiac Life Support (ACLS)",
    issuer: "American Heart Association",
    issuedDate: "2024-09-15",
    expiryDate: "2026-09-15",
    status: "Active",
    category: "Clinical",
    credentialId: "ACLS-2024-8820",
  },
  {
    id: "cert-3",
    name: "Manual Handling & Patient Moving",
    issuer: "Trust Education Dept.",
    issuedDate: "2025-07-20",
    expiryDate: "2026-07-20",
    status: "Expiring Soon",
    category: "Mandatory",
    credentialId: "MH-2025-1203",
  },
  {
    id: "cert-4",
    name: "Safeguarding Adults Level 3",
    issuer: "NHS Safeguarding Board",
    issuedDate: "2024-06-30",
    expiryDate: "2026-06-30",
    status: "Expiring Soon",
    category: "Mandatory",
    credentialId: "SG-2024-5567",
  },
  {
    id: "cert-5",
    name: "Venepuncture & Cannulation",
    issuer: "Trust Education Dept.",
    issuedDate: "2025-02-10",
    expiryDate: "2027-02-10",
    status: "Active",
    category: "Clinical",
    credentialId: "VC-2025-3398",
  },
  {
    id: "cert-6",
    name: "Information Governance",
    issuer: "NHS Digital",
    issuedDate: "2025-09-01",
    expiryDate: "2026-09-01",
    status: "Active",
    category: "Mandatory",
    credentialId: "IG-2025-7741",
  },
  {
    id: "cert-7",
    name: "Mentorship & Practice Supervision",
    issuer: "University of Leeds",
    issuedDate: "2023-05-12",
    expiryDate: "2025-05-12",
    status: "Expired",
    category: "Professional",
    credentialId: "MN-2023-2210",
  },
  {
    id: "cert-8",
    name: "Fire Safety Awareness",
    issuer: "Trust Estates & Facilities",
    issuedDate: "2025-10-05",
    expiryDate: "2027-10-05",
    status: "Active",
    category: "Mandatory",
    credentialId: "FS-2025-9912",
  },
];

export interface Competency {
  id: string;
  name: string;
  currentLevel: number;
  requiredLevel: number;
  lastAssessed: string;
  category: string;
}

export const competencies: Competency[] = [
  {
    id: "comp-1",
    name: "Clinical Assessment",
    currentLevel: 4,
    requiredLevel: 4,
    lastAssessed: "2026-03-12",
    category: "Clinical",
  },
  {
    id: "comp-2",
    name: "Medication Administration",
    currentLevel: 5,
    requiredLevel: 4,
    lastAssessed: "2026-02-20",
    category: "Clinical",
  },
  {
    id: "comp-3",
    name: "Patient Communication",
    currentLevel: 4,
    requiredLevel: 5,
    lastAssessed: "2026-01-30",
    category: "Professional",
  },
  {
    id: "comp-4",
    name: "Emergency Response",
    currentLevel: 3,
    requiredLevel: 5,
    lastAssessed: "2025-12-15",
    category: "Clinical",
  },
  {
    id: "comp-5",
    name: "Leadership & Delegation",
    currentLevel: 3,
    requiredLevel: 4,
    lastAssessed: "2026-04-02",
    category: "Leadership",
  },
  {
    id: "comp-6",
    name: "Documentation & Record Keeping",
    currentLevel: 5,
    requiredLevel: 4,
    lastAssessed: "2026-03-28",
    category: "Professional",
  },
];

export interface DepartmentStat {
  name: string;
  compliance: number;
  participation: number;
  totalStaff: number;
  compliantStaff: number;
}

export interface TopPerformer {
  name: string;
  hours: number;
  completion: number;
  department: string;
}

export interface DepartmentStats {
  departments: DepartmentStat[];
  topPerformers: TopPerformer[];
}

export const departmentStats: DepartmentStats = {
  departments: [
    { name: "Cardiology", compliance: 88, participation: 92, totalStaff: 48, compliantStaff: 42 },
    { name: "Emergency", compliance: 76, participation: 84, totalStaff: 65, compliantStaff: 49 },
    { name: "Intensive Care", compliance: 94, participation: 96, totalStaff: 38, compliantStaff: 36 },
    { name: "Paediatrics", compliance: 82, participation: 79, totalStaff: 42, compliantStaff: 34 },
    { name: "Oncology", compliance: 90, participation: 88, totalStaff: 36, compliantStaff: 32 },
    { name: "Surgery", compliance: 71, participation: 73, totalStaff: 54, compliantStaff: 38 },
  ],
  topPerformers: [
    { name: "Emily Watson", hours: 58, completion: 100, department: "Intensive Care" },
    { name: "James Patel", hours: 54, completion: 98, department: "Cardiology" },
    { name: "Sarah Johnson", hours: 42, completion: 84, department: "Cardiology" },
    { name: "Maria Gomez", hours: 39, completion: 78, department: "Oncology" },
    { name: "David Owen", hours: 36, completion: 72, department: "Emergency" },
  ],
};

export type NotificationType = "deadline" | "approval" | "reminder" | "achievement" | "system";
export type Severity = "info" | "success" | "warning" | "error";

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: NotificationType;
  read: boolean;
  severity: Severity;
}

export const notifications: AppNotification[] = [
  {
    id: "n-1",
    title: "Certification Expiring",
    message: "Your Manual Handling certificate expires in 35 days. Renew now.",
    timestamp: "2026-06-15T08:30:00Z",
    type: "deadline",
    read: false,
    severity: "warning",
  },
  {
    id: "n-2",
    title: "Activity Approved",
    message: "Your reflection for 'Wound Care Workshop' has been approved.",
    timestamp: "2026-06-14T16:05:00Z",
    type: "approval",
    read: false,
    severity: "success",
  },
  {
    id: "n-3",
    title: "Upcoming Session",
    message: "ACLS Refresher starts on 22 Jun in Simulation Suite, Block C.",
    timestamp: "2026-06-14T09:00:00Z",
    type: "reminder",
    read: false,
    severity: "info",
  },
  {
    id: "n-4",
    title: "Achievement Unlocked",
    message: "You earned the '7-Day Learning Streak' badge. Keep it up!",
    timestamp: "2026-06-13T18:45:00Z",
    type: "achievement",
    read: true,
    severity: "success",
  },
  {
    id: "n-5",
    title: "Mandatory Training Due",
    message: "Safeguarding Adults Level 3 renewal due within 15 days.",
    timestamp: "2026-06-12T11:20:00Z",
    type: "deadline",
    read: false,
    severity: "error",
  },
  {
    id: "n-6",
    title: "New Catalogue Item",
    message: "A new course 'Sepsis Recognition' is now available to book.",
    timestamp: "2026-06-11T14:10:00Z",
    type: "system",
    read: true,
    severity: "info",
  },
  {
    id: "n-7",
    title: "Assessment Result",
    message: "You passed 'Medication Safety Quiz' with a score of 92%.",
    timestamp: "2026-06-10T10:00:00Z",
    type: "achievement",
    read: true,
    severity: "success",
  },
  {
    id: "n-8",
    title: "Evidence Requested",
    message: "Please upload evidence for your Cardiology Conference attendance.",
    timestamp: "2026-06-09T13:30:00Z",
    type: "reminder",
    read: false,
    severity: "warning",
  },
];

export interface Achievement {
  id: string;
  name: string;
  iconName: string;
  earned: boolean;
  date: string | null;
  points: number;
  description: string;
}

export const achievements: Achievement[] = [
  { id: "a-1", name: "Fast Starter", iconName: "Zap", earned: true, date: "2026-01-10", points: 50, description: "Completed first CPD activity of the year." },
  { id: "a-2", name: "7-Day Streak", iconName: "Star", earned: true, date: "2026-06-13", points: 75, description: "Logged learning activity 7 days in a row." },
  { id: "a-3", name: "Certified Pro", iconName: "Award", earned: true, date: "2026-03-01", points: 100, description: "Maintained 5+ active certifications." },
  { id: "a-4", name: "Top Performer", iconName: "Trophy", earned: false, date: null, points: 150, description: "Rank in the top 3 of your department." },
  { id: "a-5", name: "Safety Champion", iconName: "Shield", earned: true, date: "2026-02-15", points: 80, description: "Completed all mandatory safety training." },
  { id: "a-6", name: "Goal Crusher", iconName: "Target", earned: false, date: null, points: 120, description: "Reach 100% of annual CPD target." },
  { id: "a-7", name: "Lifelong Learner", iconName: "BookOpen", earned: true, date: "2026-04-22", points: 90, description: "Completed 15 CPD activities." },
  { id: "a-8", name: "Patient First", iconName: "Heart", earned: false, date: null, points: 110, description: "Complete the patient experience pathway." },
];

export const learningStreak = 7;
export const totalPoints = achievements
  .filter((a) => a.earned)
  .reduce((sum, a) => sum + a.points, 0);

export type CalendarEventType = "Workshop" | "Conference" | "E-Learning" | "Deadline" | "Assessment" | "Webinar";

export interface CalendarEvent {
  id: string;
  date: string;
  title: string;
  type: CalendarEventType;
  color: string;
  startTime: string;
  endTime: string;
}

export const calendarEvents: CalendarEvent[] = [
  { id: "e-1", date: "2026-06-18", title: "Sepsis Recognition E-Learning", type: "E-Learning", color: "#00B4D8", startTime: "09:00", endTime: "11:00" },
  { id: "e-2", date: "2026-06-22", title: "ACLS Refresher", type: "Workshop", color: "#0077B6", startTime: "08:30", endTime: "16:00" },
  { id: "e-3", date: "2026-06-25", title: "IPC Update Webinar", type: "Webinar", color: "#2E8B57", startTime: "13:00", endTime: "15:00" },
  { id: "e-4", date: "2026-06-30", title: "Safeguarding Renewal Deadline", type: "Deadline", color: "#E63946", startTime: "00:00", endTime: "23:59" },
  { id: "e-5", date: "2026-07-02", title: "Wound Care Workshop", type: "Workshop", color: "#0077B6", startTime: "09:00", endTime: "13:00" },
  { id: "e-6", date: "2026-07-08", title: "Medication Safety Assessment", type: "Assessment", color: "#F4A261", startTime: "10:00", endTime: "11:30" },
  { id: "e-7", date: "2026-07-10", title: "Cardiology Nursing Conference", type: "Conference", color: "#7C3AED", startTime: "08:00", endTime: "17:00" },
  { id: "e-8", date: "2026-07-15", title: "Pharmacology E-Learning", type: "E-Learning", color: "#00B4D8", startTime: "00:00", endTime: "23:59" },
  { id: "e-9", date: "2026-07-21", title: "Leadership Seminar", type: "Workshop", color: "#0077B6", startTime: "14:00", endTime: "17:00" },
  { id: "e-10", date: "2026-06-20", title: "Reflection Submission Deadline", type: "Deadline", color: "#E63946", startTime: "00:00", endTime: "23:59" },
];

export interface MonthlyDatum {
  month: string;
  hours: number;
  target: number;
  compliance: number;
}

export interface CategoryDatum {
  name: string;
  value: number;
  color: string;
}

export interface ComplianceTrendDatum {
  month: string;
  rate: number;
}

export interface AnalyticsData {
  monthly: MonthlyDatum[];
  categoryBreakdown: CategoryDatum[];
  complianceTrend: ComplianceTrendDatum[];
}

export const analyticsData: AnalyticsData = {
  monthly: [
    { month: "Jan", hours: 4, target: 4, compliance: 100 },
    { month: "Feb", hours: 3, target: 4, compliance: 75 },
    { month: "Mar", hours: 5, target: 4, compliance: 100 },
    { month: "Apr", hours: 6, target: 4, compliance: 100 },
    { month: "May", hours: 4, target: 4, compliance: 100 },
    { month: "Jun", hours: 6, target: 4, compliance: 100 },
    { month: "Jul", hours: 3, target: 4, compliance: 75 },
    { month: "Aug", hours: 2, target: 4, compliance: 50 },
    { month: "Sep", hours: 4, target: 4, compliance: 100 },
    { month: "Oct", hours: 3, target: 4, compliance: 75 },
    { month: "Nov", hours: 1, target: 4, compliance: 25 },
    { month: "Dec", hours: 1, target: 4, compliance: 25 },
  ],
  categoryBreakdown: [
    { name: "Clinical", value: 18, color: "#0077B6" },
    { name: "Professional", value: 10, color: "#00B4D8" },
    { name: "Leadership", value: 6, color: "#2E8B57" },
    { name: "Mandatory", value: 8, color: "#F4A261" },
  ],
  complianceTrend: [
    { month: "Jan", rate: 78 },
    { month: "Feb", rate: 80 },
    { month: "Mar", rate: 82 },
    { month: "Apr", rate: 85 },
    { month: "May", rate: 83 },
    { month: "Jun", rate: 88 },
    { month: "Jul", rate: 86 },
    { month: "Aug", rate: 84 },
    { month: "Sep", rate: 87 },
    { month: "Oct", rate: 89 },
    { month: "Nov", rate: 90 },
    { month: "Dec", rate: 92 },
  ],
};

export type AttendanceStatus = "Attended" | "Missed" | "Pending";

export interface AttendanceRecord {
  id: string;
  date: string;
  activity: string;
  type: ActivityType;
  hours: number;
  status: AttendanceStatus;
  signatureRequired: boolean;
}

export const attendanceRecords: AttendanceRecord[] = [
  { id: "att-1", date: "2026-06-10", activity: "Sepsis Recognition E-Learning", type: "E-Learning", hours: 2, status: "Attended", signatureRequired: false },
  { id: "att-2", date: "2026-06-05", activity: "Cardiac Monitoring Workshop", type: "Workshop", hours: 4, status: "Attended", signatureRequired: true },
  { id: "att-3", date: "2026-05-28", activity: "Pain Management Seminar", type: "Seminar", hours: 3, status: "Missed", signatureRequired: true },
  { id: "att-4", date: "2026-05-20", activity: "Diabetes Care Update", type: "Webinar", hours: 2, status: "Attended", signatureRequired: false },
  { id: "att-5", date: "2026-05-12", activity: "Resuscitation Simulation", type: "Simulation", hours: 5, status: "Attended", signatureRequired: true },
  { id: "att-6", date: "2026-05-04", activity: "Ethics in Nursing Conference", type: "Conference", hours: 6, status: "Attended", signatureRequired: true },
  { id: "att-7", date: "2026-04-26", activity: "Pressure Ulcer Prevention", type: "Workshop", hours: 3, status: "Missed", signatureRequired: true },
  { id: "att-8", date: "2026-04-18", activity: "Mental Health First Aid", type: "Seminar", hours: 4, status: "Attended", signatureRequired: false },
  { id: "att-9", date: "2026-06-22", activity: "ACLS Refresher", type: "Simulation", hours: 6, status: "Pending", signatureRequired: true },
  { id: "att-10", date: "2026-06-25", activity: "IPC Update Webinar", type: "Webinar", hours: 2, status: "Pending", signatureRequired: false },
];

export type AssessmentStatus = "Passed" | "Failed" | "Pending";

export interface Assessment {
  id: string;
  title: string;
  type: string;
  score: number;
  passMark: number;
  status: AssessmentStatus;
  date: string;
  attempts: number;
  maxAttempts: number;
}

export const assessments: Assessment[] = [
  { id: "as-1", title: "Medication Safety Quiz", type: "Quiz", score: 92, passMark: 70, status: "Passed", date: "2026-06-10", attempts: 1, maxAttempts: 3 },
  { id: "as-2", title: "Infection Control Exam", type: "Exam", score: 85, passMark: 75, status: "Passed", date: "2026-05-22", attempts: 1, maxAttempts: 3 },
  { id: "as-3", title: "Basic Life Support Test", type: "Practical", score: 88, passMark: 80, status: "Passed", date: "2026-04-15", attempts: 2, maxAttempts: 3 },
  { id: "as-4", title: "Pharmacology Calculations", type: "Quiz", score: 58, passMark: 70, status: "Failed", date: "2026-03-30", attempts: 2, maxAttempts: 3 },
  { id: "as-5", title: "Safeguarding Knowledge Check", type: "Quiz", score: 95, passMark: 70, status: "Passed", date: "2026-03-12", attempts: 1, maxAttempts: 3 },
  { id: "as-6", title: "Clinical Documentation Audit", type: "Exam", score: 0, passMark: 75, status: "Pending", date: "2026-06-28", attempts: 0, maxAttempts: 3 },
  { id: "as-7", title: "Manual Handling Assessment", type: "Practical", score: 64, passMark: 70, status: "Failed", date: "2026-02-18", attempts: 1, maxAttempts: 3 },
  { id: "as-8", title: "Data Protection (GDPR) Test", type: "Quiz", score: 0, passMark: 80, status: "Pending", date: "2026-07-05", attempts: 0, maxAttempts: 3 },
];
