/**
 * The practice photo shoot, as data.
 *
 * Every photograph here was taken in the Booneville office in September 2026.
 * Intrinsic sizes are recorded so a photograph can be laid out at its natural
 * shape without a layout shift, and so the few layouts that crop can choose
 * a photograph whose shape suits the slot.
 *
 * Captions describe what is in the frame and nothing more. Where the shoot
 * shows equipment the site copy does not yet talk about, the caption names
 * what is visible on the machine or the screen rather than making a claim
 * about what it does for a patient.
 *
 * Patient details were visible on four screens in the originals. They were
 * removed from the pixels before these files were written, not hidden by a
 * crop in CSS, so they cannot be recovered from the published images.
 */

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

const portrait = (name: string, alt: string, caption?: string): Photo => ({
  src: `/images/${name}.jpg`,
  alt,
  width: 1500,
  height: 2000,
  caption,
});

const landscape = (name: string, alt: string, caption?: string): Photo => ({
  src: `/images/${name}.jpg`,
  alt,
  width: 2400,
  height: 1800,
  caption,
});

export const photos = {
  drGoodwinHallway: portrait(
    "dr-goodwin-hallway",
    "Dr. Ken Goodwin in the hallway at Park Place Dental in Booneville",
  ),
  goodwinWithAssistant: portrait(
    "goodwin-with-assistant",
    "Dr. Ken Goodwin at the chair with a member of his team",
    "Chairside, with one of his assistants",
  ),
  goodwinImplantStation: landscape(
    "goodwin-guided-implant-station",
    "Dr. Ken Goodwin in a treatment room beside a screen of 3D scans",
    "In the treatment room set up for guided implant work",
  ),
  teamGroupFour: landscape(
    "team-group-four",
    "Four members of the Park Place Dental team together in the office",
    "Four of the team who look after you",
  ),
  teamGroupTrio: landscape(
    "team-group-trio",
    "Three members of the Park Place Dental team together in the office",
    "Three more familiar faces",
  ),
  hygienistCleaning: portrait(
    "hygienist-cleaning",
    "A hygienist cleaning a patient's teeth at Park Place Dental",
    "A cleaning in progress",
  ),
  frontDeskPhone: portrait(
    "front-desk-phone",
    "A member of the front desk team on the phone at Park Place Dental",
    "The front desk",
  ),
  restorationDesign: landscape(
    "restoration-design-screen",
    "A team member designing a restoration on screen at Park Place Dental",
    "Designing a restoration before it is milled",
  ),
  mcdougaldPortrait: {
    src: "/images/dr-rebecca-mcdougald.jpg",
    alt: "Dr. Rebecca McDougald, dentist at Park Place Dental in Booneville",
    width: 1000,
    height: 1250,
  },
  mcdougaldWithAssistant: portrait(
    "mcdougald-treating-with-assistant",
    "Dr. Rebecca McDougald and an assistant treating a patient at Park Place Dental",
    "Dr. McDougald at the chair, with her assistant",
  ),
  mcdougaldLoupes: portrait(
    "mcdougald-procedure-loupes",
    "Dr. Rebecca McDougald working under magnifying loupes at Park Place Dental",
    "Working under magnification",
  ),
  exteriorSign: portrait(
    "exterior-sign",
    "The Park Place Dental sign outside the practice on North 3rd Street",
    "The sign out front on North 3rd Street",
  ),
  exteriorBuilding: landscape(
    "exterior-building",
    "The Park Place Dental building, brick with a columned porch, on North 3rd Street in Booneville",
    "403 N 3rd St",
  ),
  waitingRoom: portrait(
    "waiting-room",
    "The waiting room at Park Place Dental",
    "The waiting room",
  ),
  refreshmentBar: portrait(
    "refreshment-bar",
    "The refreshment corner at Park Place Dental, with a mirror and framed photographs",
    "The refreshment corner",
  ),
  appreciatedFrame: portrait(
    "youre-appreciated-frame",
    "A silver frame at Park Place Dental reading You're Appreciated",
    "Small touches",
  ),
  operatoryWindow: portrait(
    "operatory-window",
    "A sunlit treatment room at Park Place Dental",
    "A treatment room with plenty of daylight",
  ),
  millingChamber: portrait(
    "milling-chamber-closeup",
    "Inside the milling chamber where crowns are made in the office",
    "Inside the milling chamber",
  ),
  millingUnit: landscape(
    "milling-unit",
    "A CEREC milling unit in the Park Place Dental in-house lab",
    "A CEREC milling unit in the in-house lab",
  ),
  inlabMill: portrait(
    "inlab-milling-unit",
    "An inLab milling unit in the Park Place Dental in-house lab",
    "An inLab mill, one of several in the lab",
  ),
  cbctImaging: {
    src: "/images/cbct-3d-imaging.jpg",
    alt: "3D imaging of the jaw on screen at Park Place Dental",
    width: 1986,
    height: 2000,
    caption: "3D imaging of the jaw",
  },
  implantPlanning: portrait(
    "implant-planning-screen",
    "An implant position planned on 3D imaging at Park Place Dental",
    "An implant position planned in 3D",
  ),
  implantPlanningCloseup: portrait(
    "implant-planning-closeup",
    "An implant's angle and depth planned on a 3D scan",
    "Angle and depth, set before treatment begins",
  ),
  guidedSurgeryRoom: portrait(
    "guided-surgery-operatory",
    "A treatment room set up with X-Guide navigation at Park Place Dental",
    "A treatment room with X-Guide navigation",
  ),
  xrayFindings: portrait(
    "ai-xray-findings",
    "X-ray findings for decay, bone level and calculus reviewed on screen",
    "X-ray findings, reviewed on screen",
  ),
} satisfies Record<string, Photo>;

/**
 * The team portraits.
 *
 * Names are not attached yet, because nothing in the shoot says which face
 * belongs to which name and a wrong name on a real person is worse than none.
 * Add `name` and `role` here and both the homepage and the team page pick
 * them up, with the name used as the alt text.
 *
 * Eleven, not twelve. The twelfth portrait from the shoot is Dr. Rebecca
 * McDougald, confirmed by the practice, and a dentist belongs beside the
 * dentist rather than in a row of unnamed staff. See `mcdougaldPortrait`.
 */
export type TeamPortrait = Photo & { name?: string; role?: string };

export const teamPortraits: TeamPortrait[] = Array.from({ length: 11 }, (_, i) => ({
  src: `/images/team-portrait-${String(i + 1).padStart(2, "0")}.jpg`,
  alt: "A member of the Park Place Dental team",
  width: 1000,
  height: 1250,
}));
