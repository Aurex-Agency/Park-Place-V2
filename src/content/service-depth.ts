import type { Block } from "./services";

/**
 * Additional depth for the six commercial pages that have to compete.
 *
 * The audit measured every treatment page at a median of 481 unique words,
 * built from one template: a definition, a list of benefits, a set of process
 * steps. That is enough to describe a service and nowhere near enough to rank
 * for it against practices in Tupelo and Corinth, or to be the page an
 * assistant quotes when somebody asks whether they are a candidate for an
 * implant.
 *
 * What was missing was never length for its own sake. It was the four things a
 * patient actually wants before committing to treatment and that almost no
 * dental site publishes: who this is and is not suitable for, what can go
 * wrong, what recovery is really like, and what the alternatives are. Those
 * are the questions people take to a search engine, and answering them
 * honestly is also what makes a page worth citing.
 *
 * Kept in its own file rather than merged into `services.ts` so the added
 * material can be read, reviewed and revised as a body of clinical copy in one
 * place, rather than scattered through a thousand-line data file.
 *
 * Rules, same as everywhere: no guarantees, no "permanent", no "painless", no
 * prices, and nothing asserted about this practice's offering that has not been
 * confirmed.
 */
export const serviceDepth: Record<string, Block[]> = {
  /* ------------------------------------------------------------- implants */
  "dental-implants": [
    {
      kind: "terms",
      heading: "Are you a candidate?",
      intro:
        "Most people who have lost a tooth can have an implant, but not everyone, and it is better to know why before you get attached to the idea.",
      items: [
        {
          term: "Enough healthy bone",
          text: "The implant post needs bone to hold it. Bone starts shrinking as soon as a tooth is gone, so the longer a gap has been there, the more likely grafting is needed first. This is the commonest thing that changes a treatment plan.",
        },
        {
          term: "Gums free of active disease",
          text: "Gum disease has to be treated and stabilised before implants are placed. Putting an implant into an infected mouth risks losing it, so periodontal treatment comes first where it is needed.",
        },
        {
          term: "General health that allows healing",
          text: "Uncontrolled diabetes, some medications including certain bone treatments, and recent radiotherapy to the jaw all affect healing. Tell us what you take and what you are being treated for, including things that seem unrelated.",
        },
        {
          term: "Not smoking, ideally",
          text: "Smoking measurably raises the risk of implant failure. It does not automatically rule treatment out, but you should know the odds are different, and we will tell you so rather than letting you find out afterwards.",
        },
        {
          term: "Finished growing",
          text: "Implants are not usually placed in teenagers whose jaws are still developing, because the implant stays where it is put while the surrounding bone continues to change.",
        },
      ],
    },
    {
      kind: "steps",
      heading: "What the treatment actually involves, stage by stage",
      intro:
        "Implant treatment is measured in months rather than visits, and most of that time is healing rather than appointments.",
      items: [
        {
          term: "Assessment and planning",
          text: "An examination, three-dimensional imaging, and a conversation about what you want. We use RAYFace 3D facial scanning so the plan can be judged against your whole face rather than the gap alone. Nothing is scheduled until you have seen the plan and a written estimate.",
        },
        {
          term: "Preparation, if it is needed",
          text: "Removing a failing tooth, or grafting bone where there is not enough. Grafting adds months to the timeline because the graft has to integrate before the implant can go in.",
        },
        {
          term: "Placing the implant",
          text: "A minor surgical procedure under local anaesthetic. The post is placed into the bone and the gum closed over or around it. Most people describe the days afterwards as comparable to having a tooth out.",
        },
        {
          term: "Healing and integration",
          text: "Usually somewhere between three and six months, during which bone grows onto the surface of the implant. This is the part that cannot be rushed, and a practice offering to skip it is one to ask hard questions of.",
        },
        {
          term: "Abutment and crown",
          text: "Once the implant is stable, the connector goes on and the crown is made to match your other teeth. Because our lab is in the building, that crown is made here and adjusted here.",
        },
        {
          term: "Reviews afterwards",
          text: "Implants need checking and cleaning like natural teeth. The gum around an implant can become inflamed and, left alone, that can cost you the implant.",
        },
      ],
    },
    {
      kind: "prose",
      heading: "Risks and what can go wrong",
      body: [
        "Implants have a high success rate, and they are not certain. Being straight about that is part of consenting to treatment properly rather than a disclaimer at the bottom of a page.",
        "An implant can fail to integrate with the bone, most often in the first months, and it then has to be removed and the site allowed to heal before trying again. Peri-implantitis, which is inflammation of the gum and bone around an implant, behaves much like gum disease and is the main long-term threat. Nerve irritation and sinus involvement are recognised risks in particular positions in the jaw, which is exactly what the three-dimensional imaging is for.",
        "Smoking, uncontrolled diabetes, grinding and poor cleaning all raise the risk. Regular check-ups and cleaning around the implant are what keep it, and that is not a formality.",
      ],
    },
    {
      kind: "terms",
      heading: "The alternatives, fairly described",
      intro:
        "An implant is not automatically the right answer, and a practice that never says so is selling rather than advising.",
      items: [
        {
          term: "A bridge",
          text: "Faster and usually less expensive. The cost is that the healthy teeth either side of the gap are reshaped to carry it, and the bone under the gap keeps shrinking.",
        },
        {
          term: "A partial denture",
          text: "The least expensive option and the least fixed. It comes out for cleaning, and it takes adjusting to, but it changes nothing irreversibly and can be a sensible staging post.",
        },
        {
          term: "An implant-supported denture",
          text: "Where several teeth or a whole arch are involved, a small number of implants can secure a denture. Considerably more stable than a conventional one and considerably less expensive than replacing every tooth individually.",
        },
        {
          term: "Leaving the gap",
          text: "Sometimes reasonable, particularly at the back of the mouth. The trade-off is that neighbouring teeth drift into the space over time and the bone continues to shrink, which narrows your options later.",
        },
      ],
    },
  ],

  /* ------------------------------------------------------------- dentures */
  dentures: [
    {
      kind: "terms",
      heading: "The kinds of denture, and who each suits",
      items: [
        {
          term: "Full dentures",
          text: "Replace every tooth in an arch and rest on the gum. An upper denture is usually more stable than people expect, because the palate provides suction. A lower one has far less to hold it, which is why it is the more common source of complaint.",
        },
        {
          term: "Partial dentures",
          text: "Fill the gaps where sound natural teeth remain, clasping onto them for support. Keeping your own teeth is generally worth doing, and a partial is what makes that possible.",
        },
        {
          term: "Immediate dentures",
          text: "Fitted the same day teeth are removed, so you are not left without them. The gum shrinks as it heals underneath, so an immediate denture is relined or remade once things have settled. That is planned for, not a failure.",
        },
        {
          term: "Implant-supported dentures",
          text: "Clip onto a small number of implants rather than resting on the gum. Markedly more stable, particularly for a lower denture, at a considerably higher cost and over a longer timeline.",
        },
      ],
    },
    {
      kind: "steps",
      heading: "Living with a new denture: what the first months are like",
      intro:
        "Nobody puts in a new denture and forgets about it. Knowing the normal course makes the difference between persevering and giving up.",
      items: [
        {
          term: "The first few days",
          text: "It will feel bulky and your mouth will produce more saliva than usual. Both settle. Sore spots are common and are fixed with a small adjustment, so ring us rather than enduring them.",
        },
        {
          term: "Learning to eat again",
          text: "Start with softer food cut small, and chew on both sides at once rather than one. Most people are managing normally within a few weeks, and the things that stay difficult longest are usually very hard or very sticky.",
        },
        {
          term: "Learning to speak again",
          text: "Certain sounds take practice. Reading aloud to yourself for a few minutes a day is genuinely the fastest way through it, however odd it feels.",
        },
        {
          term: "Cleaning it properly",
          text: "Dentures are brushed and soaked daily, and taken out overnight unless you have been told otherwise, so the gum gets a rest. Clean your gums and tongue too.",
        },
        {
          term: "Relines, over the years",
          text: "The ridge under a denture keeps changing shape, so a denture that fitted perfectly will loosen with time. A reline refits it to the mouth you have now, and it is maintenance rather than a sign anything went wrong.",
        },
      ],
    },
    {
      kind: "prose",
      heading: "The part people are not told about: bone",
      body: [
        "When teeth come out, the bone that held them is no longer loaded by chewing and begins to shrink. This carries on for years and it is why an old denture can look too big for the face around it.",
        "A conventional denture does not change that process. Implants do slow it, because they transmit chewing force into the bone. It is worth knowing early, because the more bone you have when you decide, the more options you have.",
        "None of which means a conventional denture is the wrong choice. It means the decision has a timing element, and you should make it knowing that.",
      ],
    },
    {
      kind: "prose",
      heading: "Why our lab matters more for dentures than for anything else",
      body: [
        "Dentures need adjusting. That is not a defect, it is how they work: a piece of acrylic fitted to living tissue that changes shape. The practical question is how long each adjustment takes.",
        "Sent to an outside laboratory, a repair or a reline commonly means days without the denture. Made and mended in this building, it frequently does not. For anyone driving in from Corinth, Ripley or Fulton, that is usually the whole reason they are here.",
      ],
    },
  ],

  /* ------------------------------------------------------- crowns/bridges */
  "crowns-bridges": [
    {
      kind: "terms",
      heading: "When a crown is the right answer, and when it is not",
      items: [
        {
          term: "After a root canal, usually yes",
          text: "A tooth that has had root canal treatment is more brittle than it was and is prone to fracturing. A crown protects what is left, and a fractured root often cannot be saved at all.",
        },
        {
          term: "For a large cavity or an old, failing filling",
          text: "Where too little sound tooth remains to hold a filling reliably, a crown rebuilds the whole biting surface. A filling that keeps breaking is telling you something.",
        },
        {
          term: "For a cracked tooth",
          text: "A crown holds a cracked tooth together and can stop the crack spreading. How well it works depends on where the crack runs, which is not always visible until we look.",
        },
        {
          term: "Not simply for appearance",
          text: "If the tooth is sound and it is only the look you want to change, a veneer or bonding removes far less tooth structure. We would rather point you at the smaller intervention.",
        },
      ],
    },
    {
      kind: "prose",
      heading: "Bridge or implant?",
      body: [
        "Both replace a missing tooth and they involve entirely different trade-offs. A bridge joins to the teeth on either side of the gap, which means those teeth are reshaped to carry it. Where they already have large fillings or crowns, that is no great loss. Where they are pristine, it is a real cost and worth weighing.",
        "A bridge is quicker, usually less expensive, and does not involve surgery. An implant leaves the neighbouring teeth alone, helps preserve the bone under the gap, and takes months rather than weeks.",
        "The honest summary: if the teeth either side need work anyway, a bridge often makes sense. If they are healthy and untouched, it is worth at least discussing an implant before reshaping them.",
      ],
    },
    {
      kind: "steps",
      heading: "What to expect, and how to look after it",
      items: [
        {
          term: "Preparing the tooth",
          text: "Done under local anaesthetic. The tooth is shaped so the crown fits over it, and a scan or impression is taken. Some tenderness for a few days afterwards is normal, particularly if the tooth was already inflamed.",
        },
        {
          term: "Made here, not posted away",
          text: "Our dental laboratory is in the building, which shortens the wait and means adjustments are a short visit rather than another round trip. Whether a specific crown can be finished in one appointment depends on the tooth and the material.",
        },
        {
          term: "If you have a temporary",
          text: "Avoid anything very sticky on that side and floss by pulling the floss out sideways rather than up, so you do not lift the temporary off.",
        },
        {
          term: "Looking after the finished crown",
          text: "Brush and floss it exactly like a natural tooth. Decay starts at the margin where crown meets tooth, and that margin is the part that needs the floss.",
        },
        {
          term: "If you grind your teeth",
          text: "Tell us. Grinding is one of the main reasons crowns and bridges fail early, and a night guard is a great deal cheaper than a remake.",
        },
      ],
    },
  ],

  /* ----------------------------------------------------- emergency dental */
  "emergency-dentistry": [
    {
      kind: "terms",
      heading: "What to do before you get here",
      intro:
        "First aid buys time. It does not replace being seen, but for some of these it makes the difference between saving a tooth and losing it.",
      items: [
        {
          term: "Knocked-out permanent tooth",
          text: "Hold it by the crown, never the root. Keep it moist in milk or your own saliva, never in water. If you can, put it gently back in the socket and bite on a clean cloth. Aim to be seen within the hour.",
        },
        {
          term: "Knocked-out baby tooth",
          text: "Do not put it back. Replanting a baby tooth risks damaging the permanent tooth forming above it. Keep the child comfortable and call us for advice.",
        },
        {
          term: "Broken or cracked tooth",
          text: "Rinse with warm water, hold a cold compress to the outside of the face, keep any pieces, and stay off that side. Mention on the phone if it hurts on cold or on air, because that suggests the inner pulp is exposed.",
        },
        {
          term: "Bleeding after an extraction",
          text: "Bite firmly on clean gauze or a folded handkerchief for a full fifteen minutes without checking it. Most bleeding settles. If it has not after two attempts, call us.",
        },
        {
          term: "Swelling",
          text: "Swelling means infection, and it is the symptom on this list most worth acting on quickly even when the pain itself is bearable. Swelling that is closing the eye, spreading down the neck or affecting breathing is a hospital, not a dentist.",
        },
        {
          term: "Lost crown or filling",
          text: "Keep the piece and bring it. Temporary cement from a pharmacy can protect the tooth for a day or two but it is a stopgap, not a repair.",
        },
      ],
    },
    {
      kind: "prose",
      heading: "How urgent is it, really?",
      body: [
        "Same hour: a knocked-out permanent tooth, uncontrolled bleeding, or swelling that is affecting breathing or swallowing. The last of those is an emergency room rather than a dental practice.",
        "Same day: severe pain, facial swelling, a broken tooth with exposed pulp, or an injury to the jaw. Ring the office and describe what has happened.",
        "Within a few days: a lost filling or crown with no pain, a chipped tooth that is not sensitive, a broken denture. Uncomfortable and inconvenient rather than dangerous, but do not let them drift, because small problems in the mouth reliably become larger ones.",
      ],
    },
    {
      kind: "prose",
      heading: "Why a hospital is usually not the answer",
      body: [
        "Emergency rooms are not set up to treat teeth. In most cases they can manage your pain and prescribe antibiotics if there is infection, and then you still need a dentist to deal with the cause. That is two trips instead of one and a delay in between.",
        "The exceptions are real and worth repeating: a suspected broken jaw, bleeding that will not stop, or swelling that is affecting your airway. Those need a hospital, immediately.",
      ],
    },
  ],

  /* ----------------------------------------------------------- root canal */
  "root-canals": [
    {
      kind: "terms",
      heading: "How to tell whether you need one",
      intro:
        "No single sign is proof, and some teeth needing treatment give no warning at all, which is one reason examinations matter. These are the signals worth acting on.",
      items: [
        {
          term: "Pain that lingers after heat or cold",
          text: "Sensitivity that stops as soon as the cold does is usually just sensitivity. Pain that carries on for half a minute or more after the trigger is gone suggests the nerve is inflamed.",
        },
        {
          term: "Pain that wakes you, or throbs",
          text: "Spontaneous pain, and pain that is worse lying down, both point towards the pulp rather than the gum.",
        },
        {
          term: "Pain on biting",
          text: "Sharp pain when you bite down, or when you release, can indicate a crack or inflammation at the root tip.",
        },
        {
          term: "A tooth that has darkened",
          text: "A single tooth going grey compared to its neighbours often means the nerve inside has died, sometimes years after a knock that seemed to have healed.",
        },
        {
          term: "A gum boil or swelling",
          text: "A small spot on the gum near a tooth that comes and goes is often a sinus draining an infection at the root. It may relieve pressure and stop the pain, which is not the same as getting better.",
        },
      ],
    },
    {
      kind: "steps",
      heading: "What happens during treatment",
      items: [
        {
          term: "Numbing and isolating the tooth",
          text: "Local anaesthetic first, then a rubber sheet placed around the tooth to keep it clean and dry and to stop anything reaching the back of your throat.",
        },
        {
          term: "Reaching and cleaning the canals",
          text: "A small opening is made through the biting surface, and the inflamed or infected tissue inside the root canals is removed and the canals shaped and disinfected. This is the bulk of the appointment.",
        },
        {
          term: "Filling and sealing",
          text: "The cleaned canals are filled with an inert material and sealed so bacteria cannot get back in. Some teeth are completed in one visit; some need a second, with a dressing in between.",
        },
        {
          term: "Restoring the tooth properly",
          text: "A back tooth that has had root canal treatment usually needs a crown, because it has been hollowed out and is liable to fracture. Leaving it with only a filling is the most common reason a successful root canal is lost afterwards.",
        },
      ],
    },
    {
      kind: "prose",
      heading: "Afterwards, and what to expect",
      body: [
        "Tenderness for a few days, particularly on biting, is normal and usually manageable with ordinary over-the-counter pain relief. It should be improving, not worsening: increasing pain or swelling is worth a phone call.",
        "Root canal treatment has a good long-term success rate, and it is not certain. Canals can be complex, an infection can persist, and a tooth can crack later. Where a treated tooth fails it can sometimes be re-treated, and sometimes the answer is extraction and replacement.",
        "The alternative to a root canal is removing the tooth. That is quicker and usually less expensive today, and then you are deciding between a gap, a bridge, a denture or an implant. Keeping your own tooth, where it can be kept, is generally the better outcome.",
      ],
    },
  ],

  /* -------------------------------------------------------------- veneers */
  veneers: [
    {
      kind: "prose",
      heading: "The honest trade-off",
      body: [
        "Most porcelain veneers require a thin layer of enamel to be removed from the front of the tooth so the veneer sits flush rather than bulky. Enamel does not grow back. Once a tooth is prepared for a veneer, it will need a veneer or a crown on it from then on.",
        "That is not an argument against veneers. It is an argument for being sure, and for asking whether something less invasive would get you close enough. If the problem is colour alone, whitening changes nothing irreversibly. If it is a small chip or a narrow gap, bonding adds material rather than removing it.",
        "Where veneers are the right answer, they are a very good one. We would just rather you chose them knowing what they cost in tooth structure.",
      ],
    },
    {
      kind: "terms",
      heading: "What veneers do and do not fix",
      items: [
        {
          term: "Good for",
          text: "Deep staining that does not respond to whitening, chips, worn edges, small gaps, and teeth that are slightly out of line or misshapen.",
        },
        {
          term: "Not the answer for",
          text: "A structurally failing tooth, which needs a crown; significant crowding or bite problems, which need orthodontics; or active decay and gum disease, which have to be treated before any cosmetic work begins.",
        },
        {
          term: "Order matters",
          text: "If you intend to whiten, whiten first. Veneers are made to a shade and they do not change colour afterwards, so whitening later leaves them looking darker than the teeth around them.",
        },
        {
          term: "Grinding changes the calculation",
          text: "If you grind or clench, veneers are more likely to chip. That does not rule them out, but a night guard becomes part of the plan rather than an optional extra.",
        },
      ],
    },
    {
      kind: "steps",
      heading: "How the process runs",
      items: [
        {
          term: "Planning, before anything is touched",
          text: "We look at your teeth against your face using RAYFace 3D scanning, agree the shape and the shade, and make sure we are solving the thing that actually bothers you.",
        },
        {
          term: "Preparing the teeth",
          text: "A thin layer of enamel removed under local anaesthetic, then a scan or impression. Temporaries protect the teeth while the veneers are made.",
        },
        {
          term: "Made and matched here",
          text: "Because the laboratory is in the building, shade matching and adjustment happen on site rather than through a courier, which is exactly where cosmetic work usually goes wrong.",
        },
        {
          term: "Fitting",
          text: "Veneers are tried in before they are bonded, so you see them in your own mouth in daylight and can say something while it is still easy to change.",
        },
        {
          term: "Living with them",
          text: "Brush and floss normally. Avoid biting nails, pens and ice. Porcelain veneers commonly last a decade or more, and they can chip or come loose, at which point they are repaired or replaced.",
        },
      ],
    },
  ],
};
