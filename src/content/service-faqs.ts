/**
 * Questions specific to each service, keyed by slug.
 *
 * These replace the six general questions that used to repeat on thirty six of
 * thirty seven pages. That block was the site's largest duplicate-content
 * problem and, on the thinnest pages, outweighed the page's own content.
 *
 * Three rules were applied to every answer:
 *
 *   1. The first sentence answers the question completely. Someone who reads
 *      only that sentence should have what they came for, and a search engine
 *      or assistant quoting one sentence should quote a true and useful one.
 *   2. No guarantees, no "painless", no superlatives, no outcome promises.
 *      Mississippi's dental board treats a claim of special qualification as
 *      licensure-actionable whether or not it is true, and fee advertising must
 *      state what it includes. Ranges are described as varying by case, never
 *      quoted as prices.
 *   3. Nothing is claimed that the practice has not told us it does. Where a
 *      question would need a fact we do not hold, it is not asked.
 */

export type Faq = { q: string; a: string };

export const serviceFaqs: Record<string, Faq[]> = {
  /* ---------------------------------------------------------------- general */
  "general-dentistry": [
    {
      q: "How often should I have a checkup and cleaning?",
      a: "Most adults do well with a cleaning and exam every six months, though some people need to come more often and some can safely come less. The interval depends on your gum health, how quickly you build tartar, and your history of decay. We will tell you what we think is right for you rather than applying one schedule to everybody.",
    },
    {
      q: "It has been years since I saw a dentist. Is it too late?",
      a: "No. Coming back after a long gap is one of the most common reasons people call us, and it is not a conversation you need to dread. We start by finding out where things actually stand, then talk through what needs doing first and what can wait. Nobody here is going to lecture you.",
    },
    {
      q: "Do you see children as well as adults?",
      a: "Yes. Park Place Dental is a family practice, and we see children alongside their parents and grandparents. Seeing the whole family in one place tends to make appointments easier to arrange and helps children feel less anxious about the visit.",
    },
    {
      q: "What happens at a first appointment?",
      a: "A first visit usually includes a full examination, any imaging we need to see what is happening below the surface, and a conversation about what you want from your teeth. If treatment is needed we will explain the options and what each involves before anything is scheduled.",
    },
    {
      q: "Can you see me quickly if I am in pain?",
      a: "We keep room in the schedule for people in pain and will do our best to see you the same day. Call the office rather than using the website form if it is urgent, because the phone reaches us immediately and a form does not.",
    },
  ],

  "cleanings-exams": [
    {
      q: "What is the difference between a cleaning and a deep cleaning?",
      a: "A regular cleaning removes plaque and tartar from the tooth surfaces at and just below the gum line, while a deep cleaning, known as scaling and root planing, goes further beneath the gum to treat active gum disease. Which one you need depends on the condition of your gums, not on preference.",
    },
    {
      q: "Does a cleaning hurt?",
      a: "Most people find a routine cleaning uncomfortable at worst rather than painful, and it is usually easier the more regularly you come. Sensitive teeth and inflamed gums make it harder, so tell your hygienist before she starts rather than gritting your teeth through it.",
    },
    {
      q: "Do I need x-rays every time?",
      a: "No. Imaging is taken when it will show us something an examination cannot, which for most patients is considerably less often than every visit. How often depends on your age, your history of decay and what we are monitoring.",
    },
    {
      q: "Will a cleaning whiten my teeth?",
      a: "A cleaning removes surface staining from coffee, tea and tobacco, so teeth often look brighter afterwards, but it does not change the underlying colour of the tooth. If you want a genuine change in shade, that is whitening, which is a separate treatment.",
    },
    {
      q: "My gums bleed when I brush. Is that normal?",
      a: "Bleeding gums are common but they are not normal, and they are usually the first visible sign of gum inflammation. It is worth having looked at early, because gum disease is far easier to reverse in its first stage than later on.",
    },
  ],

  fillings: [
    {
      q: "Are tooth-colored fillings as strong as silver ones?",
      a: "Modern composite fillings are strong enough for the great majority of everyday cavities, including on back teeth, and they bond to the tooth rather than simply sitting in it. Very large cavities in heavy chewing areas sometimes call for a crown instead, which we would discuss with you before starting.",
    },
    {
      q: "Can I have a filling without a numbing shot?",
      a: "Sometimes. We use the Solea dental laser for many fillings, and in a good number of those cases little or no anesthesia is needed. Whether it suits your particular cavity depends on its size and position, so ask when you book and we will tell you honestly.",
    },
    {
      q: "How long does a filling last?",
      a: "A well-placed composite filling commonly lasts several years to well over a decade, and the range is wide because it depends on the size of the filling, where it sits, and habits like grinding. Fillings are repairs, not permanent replacements, and all of them eventually need attention.",
    },
    {
      q: "How long will the appointment take?",
      a: "A single straightforward filling usually takes under an hour from sitting down to leaving. If several teeth need work we will often group them into one visit so you are not making repeated trips, which matters more when you are driving in from out of town.",
    },
    {
      q: "Can I eat afterwards?",
      a: "A composite filling is set hard before you leave, so you can eat as soon as you like. If you have had anesthetic, wait until the numbness wears off, because a numb lip or cheek is very easy to bite without noticing.",
    },
  ],

  "root-canals": [
    {
      q: "Does a root canal hurt?",
      a: "The procedure itself is done under anesthetic and most people find it comparable to having a filling placed. The pain people associate with root canals is nearly always the pain of the infection beforehand, which is what the treatment relieves.",
    },
    {
      q: "How do I know if I need one?",
      a: "The common signs are a persistent toothache, lingering sensitivity to heat or cold after the source is removed, pain on biting, a darkening tooth, or swelling around the gum. None of these is proof on its own, and only an examination and imaging can tell you for certain.",
    },
    {
      q: "Is it better to just pull the tooth?",
      a: "Keeping your own tooth is usually the better outcome where it is possible, because natural teeth preserve the bone around them and need no replacement. Extraction is sometimes the right answer when a tooth is too damaged to restore, and we will tell you which situation you are in.",
    },
    {
      q: "Will I need a crown afterwards?",
      a: "Usually yes, particularly on back teeth. A tooth that has had a root canal is more brittle than it was, and a crown protects it from fracturing. Because our lab is in the building, that crown does not have to be mailed away and waited on.",
    },
    {
      q: "How many visits does it take?",
      a: "Many root canals can be completed in a single appointment, though some need a second visit depending on the tooth and whether infection needs time to settle. We will tell you which to expect before we begin rather than partway through.",
    },
  ],

  "emergency-dentistry": [
    {
      q: "What counts as a dental emergency?",
      a: "Severe or worsening toothache, a knocked-out or broken tooth, swelling in the face or gum, bleeding that will not stop, and a lost crown or filling that leaves a sharp or painful tooth all count as emergencies. If you are unsure, call and describe it rather than waiting to see whether it settles.",
    },
    {
      q: "What should I do with a knocked-out tooth?",
      a: "Pick it up by the crown rather than the root, keep it moist in milk or in your own saliva, never in water, and get to a dentist as quickly as you can. A permanent tooth has its best chance of being saved within about an hour of coming out.",
    },
    {
      q: "Should I go to the emergency room instead?",
      a: "Go to an emergency room for a suspected broken jaw, bleeding you cannot control, or facial swelling that is affecting your breathing or swallowing. For almost everything else a dentist is the right call, because a hospital can usually only manage the pain rather than treat the cause.",
    },
    {
      q: "Can you see me today?",
      a: "We hold room in the schedule for urgent problems and will do our best to fit you in the same day. Telephone the office rather than sending a message through the site, because the phone reaches us straight away.",
    },
    {
      q: "What if my denture or crown breaks?",
      a: "Bring it with you, including any pieces. Our in-house lab means many repairs can be handled here rather than posted to an outside laboratory, which is often the difference between waiting hours and waiting a week.",
    },
  ],

  /* ------------------------------------------------------------ restorative */
  "restorative-dentistry": [
    {
      q: "What does restorative dentistry cover?",
      a: "Restorative dentistry is the work that rebuilds teeth which are damaged, worn or missing: crowns, bridges, dentures and implants. The aim is to get normal chewing, speech and appearance back, rather than simply to stop something hurting.",
    },
    {
      q: "How do I know which option is right for me?",
      a: "It depends on how many teeth are involved, the condition of the bone and gums beneath them, and what you want day to day. There is rarely only one workable answer, and the useful conversation is about trade-offs rather than a single recommendation.",
    },
    {
      q: "What difference does an in-house lab make?",
      a: "Most practices send crowns, dentures and partials to an outside laboratory and wait for them to come back. Ours are made and repaired in the building, which shortens waiting, makes adjustments quicker, and removes one set of outside fees from the cost.",
    },
    {
      q: "Will people be able to tell?",
      a: "Modern materials are matched to the shade and shape of your own teeth, and well-made restorations are not obvious in ordinary conversation. We will show you what is planned before it is made.",
    },
  ],

  "crowns-bridges": [
    {
      q: "Can you make a crown in one day?",
      a: "Many crowns can be made and fitted here rather than sent to an outside laboratory, because our dental lab is in the building. Whether a given crown can be finished in a single visit depends on the tooth and the material, so ask when it is planned.",
    },
    {
      q: "What is the difference between a crown and a bridge?",
      a: "A crown covers and protects one damaged tooth. A bridge replaces a missing tooth by joining to the teeth on either side of the gap. If the neighbouring teeth are healthy and untouched, an implant is often worth considering instead of reshaping them for a bridge.",
    },
    {
      q: "How long do crowns last?",
      a: "Crowns commonly last many years and often well over a decade, with the range depending on the material, where the crown sits, your bite, and whether you grind your teeth. They need the same brushing and flossing as a natural tooth.",
    },
    {
      q: "Does getting a crown hurt?",
      a: "Preparing a tooth for a crown is done under anesthetic and is usually comparable to having a filling. Some tenderness in the days afterwards is normal, particularly if the tooth was already inflamed.",
    },
    {
      q: "What if my crown comes loose?",
      a: "Keep it, avoid chewing on that side, and call us. A crown that has come off cleanly can often be recemented, and because our lab is here, one that cannot be reused can usually be remade faster than if it had to be sent away.",
    },
  ],

  "dental-implants": [
    {
      q: "What does a dental implant actually involve?",
      a: "An implant has three separate parts: a post placed into the jawbone, an abutment that connects to it, and a crown on top that you see. The post needs time to fuse with the bone before the final crown goes on, which is why implant treatment runs over months rather than a single visit.",
    },
    {
      q: "How much do dental implants cost?",
      a: "Cost varies by case rather than sitting at one figure, because it depends on how many teeth are involved, whether bone grafting is needed first, and which materials are used. We will give you a written breakdown showing what each part covers before you decide anything.",
    },
    {
      q: "How long do implants last?",
      a: "Implants are designed to last for decades and many do, provided the gums and bone around them stay healthy. They are not immune to problems: implants can fail, particularly where gum disease or smoking is involved, and they need the same regular care as natural teeth.",
    },
    {
      q: "Am I a candidate for implants?",
      a: "The main requirements are enough healthy bone to hold the post and gums free of active disease. Smoking, uncontrolled diabetes and some medications make implants harder to place successfully. Where bone has already been lost, grafting can sometimes make treatment possible.",
    },
    {
      q: "Is it better than a bridge or a denture?",
      a: "An implant stands on its own without altering neighbouring teeth and helps preserve the bone where the tooth was, which a denture does not. It also costs more and takes longer. Which is better genuinely depends on your situation, and we would rather talk it through than push one option.",
    },
  ],

  dentures: [
    {
      q: "How long does it take to get used to dentures?",
      a: "Most people need a few weeks to adjust to speaking and eating with a new denture, and it is normal for it to feel bulky at first. Sore spots in the early days are common and are usually solved with a small adjustment rather than by waiting it out.",
    },
    {
      q: "My denture is loose. Can it be fixed?",
      a: "Usually, yes. Jawbone changes shape over the years after teeth are lost, so a denture that fitted well once will eventually loosen. A reline refits the existing denture to the shape your mouth is now, and implant-supported options are available where a reline is not enough.",
    },
    {
      q: "Can you repair a broken denture the same day?",
      a: "Often, because our lab is in the building rather than at the other end of a courier route. Bring every piece with you and call first so we know it is coming. A repair that is posted away commonly takes days; one done here frequently does not.",
    },
    {
      q: "What is the difference between full and partial dentures?",
      a: "A full denture replaces all the teeth in an arch and rests on the gum. A partial fills the gaps where some natural teeth remain and clasps onto them for support. Keeping natural teeth where they are sound is generally worth doing.",
    },
    {
      q: "Will I be without teeth while they are made?",
      a: "Not usually. Where teeth need removing, an immediate denture can often be fitted the same day so you are not left without them, and then relined or replaced once the gum has healed and settled.",
    },
  ],

  /* --------------------------------------------------------------- cosmetic */
  "cosmetic-dentistry": [
    {
      q: "Where should I start if I am unhappy with my smile?",
      a: "Start with a conversation rather than a procedure. The useful first step is working out what specifically bothers you, whether that is colour, shape, spacing or wear, because the answer decides whether the right treatment is whitening, bonding, veneers or something structural.",
    },
    {
      q: "Does cosmetic work look obvious?",
      a: "It should not. Well-planned cosmetic dentistry is matched to your face and to the teeth around it, and the aim is that people notice you rather than your dentistry. We will show you the plan before anything irreversible is done.",
    },
    {
      q: "Is cosmetic dentistry covered by insurance?",
      a: "Purely cosmetic treatment is usually not covered, while work that also restores function often is at least partly. The line between the two is not always obvious, so it is worth asking us to check your specific plan before assuming either way.",
    },
    {
      q: "Do I have to fix everything at once?",
      a: "No. Cosmetic treatment can usually be staged over time, and there is nothing wrong with starting with the thing that bothers you most and seeing how you feel about it.",
    },
  ],

  veneers: [
    {
      q: "What are veneers and what do they fix?",
      a: "Veneers are thin custom shells bonded to the front of the teeth that show when you smile, and they address colour, chips, small gaps, and uneven shape. They change how a tooth looks rather than how it works, so they are not the answer for a structurally failing tooth.",
    },
    {
      q: "Do veneers ruin your teeth?",
      a: "Most veneers require some enamel to be removed from the front of the tooth, and that part is not reversible, which is the honest trade-off. It is why we would rather talk through whitening or bonding first if either would get you close to what you want.",
    },
    {
      q: "How long do veneers last?",
      a: "Porcelain veneers commonly last a decade or more with good care, and they can chip or come loose, particularly if you grind your teeth or bite hard objects. A night guard is often recommended for grinders.",
    },
    {
      q: "Will they match my other teeth?",
      a: "Shade is chosen deliberately against the teeth beside them and against your face, and because our lab is in the building we can adjust rather than send work back and forth. If you are whitening as well, that is done first, because veneers do not change colour afterwards.",
    },
  ],

  "teeth-whitening": [
    {
      q: "How white will my teeth actually get?",
      a: "Most people see a noticeable lightening over several shades, but the realistic result depends on what is staining them and on the natural colour of your teeth underneath. Yellowish staining generally responds better than grey, and no whitening changes teeth to a single uniform white.",
    },
    {
      q: "Does whitening damage enamel?",
      a: "Professionally supervised whitening does not damage enamel at the concentrations and timings used. Temporary sensitivity during and shortly after treatment is common and settles; persistent sensitivity is worth telling us about rather than working through.",
    },
    {
      q: "Will it whiten crowns, veneers or fillings?",
      a: "No. Whitening works on natural tooth structure only, so existing crowns, veneers and tooth-colored fillings stay the shade they were made. This matters for planning: if restorations are visible when you smile, whitening is usually done first and the restorations matched afterwards.",
    },
    {
      q: "How long does it last?",
      a: "Results commonly hold for a year or more, and the honest variable is what you put in your mouth. Coffee, tea, red wine and tobacco all bring staining back sooner.",
    },
  ],

  "smile-makeovers": [
    {
      q: "What is a smile makeover?",
      a: "A smile makeover is a plan rather than a single procedure: several treatments sequenced together to change how your smile looks as a whole. It might combine whitening, veneers, crowns or replacement of missing teeth, depending on what you want changed.",
    },
    {
      q: "How long does the whole process take?",
      a: "It depends entirely on what is involved, from a few weeks for straightforward work to several months where implants or healing time are part of the plan. We map the sequence out with you at the start so you know what happens when.",
    },
    {
      q: "Can I see what it will look like first?",
      a: "Yes. We use RAYFace 3D facial scanning to plan treatment against your whole face rather than your teeth alone, which makes the conversation about the result a good deal more concrete than describing it.",
    },
    {
      q: "Does it have to be done all at once?",
      a: "No, and often it should not be. Staging treatment spreads both the cost and the recovery, and lets you live with each step before committing to the next.",
    },
  ],

  "smile-gallery-before-after": [
    {
      q: "Are these photographs of real patients?",
      a: "Yes. Everything shown is work done at Park Place Dental, published with the patient's permission. We do not use stock photography or manufactured examples for treatment results.",
    },
    {
      q: "Will my results look like these?",
      a: "Not necessarily, and anyone promising otherwise is overselling. Results depend on your starting point, the condition of the teeth and gums, and what treatment you choose. These photographs show what has been possible for particular people, not what is guaranteed for anyone.",
    },
    {
      q: "How do I find out what is possible for me?",
      a: "Come and ask. A consultation is where we look at what you have, listen to what bothers you, and tell you plainly what the realistic options are, including when the answer is that a simpler treatment would do.",
    },
  ],

  /* ------------------------------------------------------------ periodontal */
  "periodontal-care": [
    {
      q: "What is gum disease and how do I know if I have it?",
      a: "Gum disease is bacterial inflammation of the tissue and bone that hold your teeth in place, and its early signs are bleeding when brushing, persistent bad breath, tenderness, or gums that look red and puffy. It is often painless in the stages where it is easiest to treat, which is why it goes unnoticed.",
    },
    {
      q: "Can gum disease be reversed?",
      a: "The first stage, gingivitis, can usually be reversed with professional cleaning and better daily care at home. Once it has progressed to periodontitis and bone has been lost, treatment aims to stop it going further rather than to undo it, because that bone does not grow back on its own.",
    },
    {
      q: "Is gum disease connected to the rest of my health?",
      a: "Research has repeatedly found associations between gum disease and conditions including diabetes and heart disease, and the relationship with diabetes in particular runs in both directions. We would not tell you treating your gums treats those conditions, but it is a reason not to leave it.",
    },
    {
      q: "Will I lose teeth?",
      a: "Not necessarily. Advanced gum disease is the most common reason adults lose teeth, but treatment that starts early enough usually stabilises it. The important variable is how soon it is caught.",
    },
  ],

  "gum-disease-treatment": [
    {
      q: "What does scaling and root planing involve?",
      a: "Scaling removes plaque and hardened tartar from below the gum line, and root planing smooths the root surface so the gum can reattach and bacteria have less to cling to. It is usually done under local anesthetic, often across more than one appointment.",
    },
    {
      q: "Is it painful?",
      a: "The treatment itself is done with the area numbed. Tenderness and some sensitivity for a few days afterwards are normal, and are usually manageable with ordinary over-the-counter pain relief.",
    },
    {
      q: "How many appointments will I need?",
      a: "Deep cleaning is commonly done in two visits, treating one side of the mouth at a time so you are not numb everywhere at once. More advanced cases need a longer course and regular maintenance visits afterwards.",
    },
    {
      q: "What happens after treatment?",
      a: "Gum disease is managed rather than cured, so most patients move onto a maintenance schedule with more frequent cleanings than the usual six months. Keeping to that schedule is what stops the problem returning.",
    },
  ],

  /* ------------------------------------------------------- facial aesthetics */
  "facial-aesthetics": [
    {
      q: "Why does a dental practice offer facial aesthetics?",
      a: "Dentists work with the muscles, nerves and proportions of the lower face every day, and the same anatomy underlies facial aesthetic treatment. Offering both means the appearance of your teeth and the face around them can be considered together rather than separately.",
    },
    {
      q: "Are these treatments only cosmetic?",
      a: "Not always. The same injectable treatments are used clinically for problems including jaw clenching and some facial pain, alongside their cosmetic uses. What is appropriate depends on what you are trying to address.",
    },
    {
      q: "How do I know what I need?",
      a: "Through a consultation. These are treatments where the assessment matters more than the product, and we would rather tell you that something is not worth doing than sell it to you.",
    },
  ],

  botox: [
    {
      q: "What is Botox used for at a dental practice?",
      a: "Alongside its familiar cosmetic use for lines around the forehead and eyes, botulinum toxin is used clinically to ease the muscle tension involved in jaw clenching and grinding, which for some patients also helps with associated facial pain and headaches.",
    },
    {
      q: "How long do the results last?",
      a: "Cosmetic results typically last around three to four months before the muscle gradually returns to its previous activity, at which point treatment can be repeated. Individual response varies more than most people expect.",
    },
    {
      q: "Is it safe?",
      a: "Botulinum toxin has a long record of clinical use when administered by a trained practitioner in appropriate doses. Temporary bruising or tenderness at the injection site is the most common side effect. We will go through the risks with you properly beforehand.",
    },
    {
      q: "Does it hurt?",
      a: "The injections are done with a very fine needle and most people describe a brief sting rather than pain. The appointment itself is short.",
    },
  ],

  "dermal-fillers": [
    {
      q: "What are dermal fillers?",
      a: "Dermal fillers are gels, most commonly based on hyaluronic acid, injected to restore volume that has been lost or to soften folds and contours. They add structure, which is a different job from Botox, which relaxes muscle activity.",
    },
    {
      q: "How long do fillers last?",
      a: "Most hyaluronic acid fillers last somewhere between six months and around eighteen, depending on the product, where it is placed, and how your body breaks it down. Areas that move a great deal tend to need topping up sooner.",
    },
    {
      q: "Will it look obvious?",
      a: "It should not. Conservative treatment placed with the proportions of your own face in mind is the aim, and building up gradually over more than one appointment is usually a better route to that than doing everything at once.",
    },
    {
      q: "What should I expect afterwards?",
      a: "Some swelling, redness or bruising at the injection sites for a few days is normal and settles. We will give you aftercare instructions and tell you what is worth calling us about.",
    },
  ],
};
