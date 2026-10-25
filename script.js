const $ = (id) => document.getElementById(id);
const fields = ["fullName","jobTitle","email","phone","location","summary","experience","education","skills","languages"];
const preview = $("resumePreview");
let currentLanguage = "en";
let currentTemplate = "classic";

const translations = {
  en: {
    navBuilder:"Resume Builder",navTemplates:"Templates",heroEyebrow:"YOUR NEXT CHAPTER STARTS HERE",
    heroTitle:'A better resume.<br><span>A brighter future.</span>',heroText:"Create a polished, job-ready resume in minutes. Fill in your details, choose a design, then print or save as PDF.",
    startBuilding:"Start building free →",noSignup:"No account required",private:"Your details stay in this browser",
    stepEyebrow:"YOUR RESUME, YOUR WAY",builderTitle:"Build your resume",builderSub:"Complete the fields below. Your preview updates as you type.",
    yourDetails:"Your details",clearAll:"Clear all",fullName:"Full name",jobTitle:"Target job title",email:"Email",phone:"Phone",location:"City / Location",
    summary:"Professional summary",experience:"Work experience",lineTip:"Tip: use a new line for each point.",education:"Education",skills:"Skills",
    skillsTip:"Separate skills with commas.",languages:"Languages",privacyNote:"Your information stays on this device. This demo does not send your resume details to a server.",
    livePreview:"Live preview",updatesLive:"Updates live",downloadPdf:"Print / Save PDF",chooseTemplate:"Choose a template",
    premiumNote:"Premium designs are preview demos",classic:"Classic",modern:"Modern",elegant:"Elegant",free:"FREE",premium:"PREMIUM",
    summaryHeading:"PROFILE",experienceHeading:"EXPERIENCE",educationHeading:"EDUCATION",skillsHeading:"SKILLS",languagesHeading:"LANGUAGES",
    printHelp:'Tip: click “Print / Save PDF”, then choose “Save as PDF” in your browser’s print window.',
    simpleSteps:"THREE SIMPLE STEPS",howTitle:"From details to download",stepOne:"Add your details",stepOneText:"Enter your contact details, education, experience and skills.",
    stepTwo:"Pick a design",stepTwoText:"Switch between clean, readable resume styles.",stepThree:"Save as PDF",stepThreeText:"Print or save a PDF, ready to share with employers.",
    about:"About",privacy:"Privacy",contact:"Contact",footerNote:"Built to help you take the next step."
  },
  hi: {
    navBuilder:"रिज़्यूमे बनाएँ",navTemplates:"डिज़ाइन",heroEyebrow:"आपके करियर की नई शुरुआत",
    heroTitle:'बेहतर रिज़्यूमे।<br><span>बेहतर भविष्य।</span>',heroText:"कुछ ही मिनटों में नौकरी के लिए तैयार रिज़्यूमे बनाएँ। जानकारी भरें, डिज़ाइन चुनें और PDF सेव करें।",
    startBuilding:"मुफ़्त बनाना शुरू करें →",noSignup:"अकाउंट की ज़रूरत नहीं",private:"आपकी जानकारी इसी ब्राउज़र में रहती है",
    stepEyebrow:"आपका रिज़्यूमे, आपका तरीका",builderTitle:"अपना रिज़्यूमे बनाएँ",builderSub:"नीचे जानकारी भरें। आपका प्रीव्यू साथ-साथ अपडेट होगा।",
    yourDetails:"आपकी जानकारी",clearAll:"सभी हटाएँ",fullName:"पूरा नाम",jobTitle:"जिस पद के लिए आवेदन है",email:"ईमेल",phone:"फ़ोन",location:"शहर / स्थान",
    summary:"प्रोफ़ेशनल परिचय",experience:"काम का अनुभव",lineTip:"सुझाव: हर पॉइंट नई लाइन में लिखें।",education:"शिक्षा",skills:"कौशल",
    skillsTip:"कौशल को कॉमा से अलग करें।",languages:"भाषाएँ",privacyNote:"आपकी जानकारी इसी डिवाइस पर रहती है। यह डेमो आपका रिज़्यूमे किसी सर्वर पर नहीं भेजता।",
    livePreview:"लाइव प्रीव्यू",updatesLive:"लाइव अपडेट",downloadPdf:"प्रिंट / PDF सेव करें",chooseTemplate:"डिज़ाइन चुनें",
    premiumNote:"प्रीमियम डिज़ाइन अभी प्रीव्यू डेमो हैं",classic:"क्लासिक",modern:"मॉडर्न",elegant:"एलिगेंट",free:"मुफ़्त",premium:"प्रीमियम",
    summaryHeading:"परिचय",experienceHeading:"अनुभव",educationHeading:"शिक्षा",skillsHeading:"कौशल",languagesHeading:"भाषाएँ",
    printHelp:'“प्रिंट / PDF सेव करें” पर क्लिक करें, फिर प्रिंट विंडो में “Save as PDF” चुनें।',
    simpleSteps:"तीन आसान चरण",howTitle:"जानकारी से PDF तक",stepOne:"जानकारी भरें",stepOneText:"अपनी संपर्क जानकारी, शिक्षा, अनुभव और कौशल लिखें।",
    stepTwo:"डिज़ाइन चुनें",stepTwoText:"साफ़ और पढ़ने में आसान रिज़्यूमे डिज़ाइन चुनें।",stepThree:"PDF सेव करें",stepThreeText:"प्रिंट करें या PDF सेव करके नियोक्ता के साथ साझा करें।",
    about:"हमारे बारे में",privacy:"गोपनीयता",contact:"संपर्क",footerNote:"आपके अगले कदम में मदद के लिए बनाया गया।"
  }
};

function textOrFallback(id, fallback) {
  const value = $(id).value.trim();
  return value || fallback;
}
function addTextLines(container, raw) {
  container.replaceChildren();
  const lines = raw.trim().split(/\n/).map(line => line.trim()).filter(Boolean);
  if (!lines.length) {
    const p = document.createElement("p");
    p.textContent = "Add details in the form to show them here.";
    p.className = "muted-placeholder";
    container.appendChild(p);
    return;
  }
  lines.forEach(line => {
    const p = document.createElement("p");
    p.className = "resume-entry";
    p.textContent = line;
    container.appendChild(p);
  });
}
function updatePreview() {
  $("previewName").textContent = textOrFallback("fullName", currentLanguage === "hi" ? "आपका नाम" : "Your Name");
  $("previewJob").textContent = textOrFallback("jobTitle", currentLanguage === "hi" ? "आपका पद" : "Target Job Title");
  const contacts = [
    $("email").value.trim() || (currentLanguage === "hi" ? "ईमेल जोड़ें" : "Add your email"),
    $("phone").value.trim() || (currentLanguage === "hi" ? "फ़ोन जोड़ें" : "Add your phone"),
    $("location").value.trim() || (currentLanguage === "hi" ? "स्थान जोड़ें" : "Add your location")
  ];
  $("previewContact").textContent = contacts.join("  ·  ");
  $("previewSummary").textContent = textOrFallback("summary", currentLanguage === "hi" ? "अपना संक्षिप्त परिचय यहाँ लिखें।" : "Add a short professional summary here.");
  addTextLines($("previewExperience"), $("experience").value || (currentLanguage === "hi" ? "अपना अनुभव यहाँ जोड़ें।" : "Add your experience here."));
  addTextLines($("previewEducation"), $("education").value || (currentLanguage === "hi" ? "अपनी शिक्षा यहाँ जोड़ें।" : "Add your education here."));
  $("previewSkills").textContent = textOrFallback("skills", currentLanguage === "hi" ? "अपने कौशल जोड़ें।" : "Add your skills.");
  $("previewLanguages").textContent = textOrFallback("languages", currentLanguage === "hi" ? "हिंदी, अंग्रेज़ी" : "Hindi, English");
  $("year").textContent = new Date().getFullYear();
}
function setLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = language === "hi" ? "hi" : "en";
  document.documentElement.dir = "ltr";
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const value = translations[language][el.dataset.i18n];
    if (value !== undefined) el.innerHTML = value;
  });
  $("languageToggle").textContent = language === "en" ? "हिंदी" : "English";
  updatePreview();
}
function setTemplate(template) {
  currentTemplate = template;
  preview.classList.remove("template-classic", "template-modern", "template-elegant");
  preview.classList.add(`template-${template}`);
  document.querySelectorAll(".template-option").forEach(button => {
    const active = button.dataset.template === template;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}
fields.forEach(id => $(id).addEventListener("input", updatePreview));
document.querySelectorAll(".template-option").forEach(button => {
  button.addEventListener("click", () => setTemplate(button.dataset.template));
});
$("languageToggle").addEventListener("click", () => setLanguage(currentLanguage === "en" ? "hi" : "en"));
$("printBtn").addEventListener("click", () => window.print());
$("resetBtn").addEventListener("click", () => {
  if (!window.confirm(currentLanguage === "hi" ? "क्या आप सभी भरी हुई जानकारी हटाना चाहते हैं?" : "Clear all the information you entered?")) return;
  $("resumeForm").reset();
  updatePreview();
});
setLanguage("en");
setTemplate("classic");
updatePreview();
