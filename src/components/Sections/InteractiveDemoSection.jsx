import React, { useState, useRef, useEffect } from 'react';
import { 
  UploadCloud, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Languages, 
  Leaf, 
  Loader2, 
  FileCheck, 
  BookmarkCheck, 
  Info, 
  ArrowRight,
  Zap,
  Activity,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// Benchmark sample crop leaves with translations in 6 Indian languages
const PRESET_SAMPLES = [
  {
    id: 'sample-1',
    crop: 'Tomato',
    cropHindi: 'टमाटर',
    cropMarathi: 'टोमॅटो',
    tag: 'Fungal Pathogen',
    disease: 'Early Blight (Alternaria solani)',
    confidence: 94.6,
    severity: 'Moderate Infection (35% Canopy)',
    severityColor: 'amber',
    icon: '🍅',
    organicRemedy: 'Remove affected lower leaves. Spray cold-pressed Neem Oil (5ml/L) or Trichoderma viride every 5 days.',
    chemicalRemedy: 'Mancozeb 75% WP @ 2.5g per litre of water or Chlorothalonil 75% WP @ 2g/L at 7-day intervals.',
    translations: {
      en: {
        diseaseName: 'Early Blight (Alternaria solani)',
        audioText: 'Tomato Early Blight detected with 94.6 percent confidence. Severity is moderate. Remove infected lower leaves. Spray neem oil at 5 milliliters per liter or Mancozeb 75 percent WP at 2.5 grams per liter.',
        langCode: 'en-IN'
      },
      hi: {
        diseaseName: 'अगेती झुलसा (अर्ली ब्लाइट)',
        audioText: 'टमाटर में अगेती झुलसा रोग पाया गया है, विश्वसनीयता 94.6 प्रतिशत। मध्यम संक्रमण। संक्रमित निचली पत्तियों को तुरंत हटा दें। 5 मिलीलीटर प्रति लीटर की दर से नीम तेल का छिड़काव करें या मेंकोज़ेब 2.5 ग्राम प्रति लीटर पानी में मिलाकर छिड़कें।',
        langCode: 'hi-IN'
      },
      mr: {
        diseaseName: 'करपा रोग (अर्ली ब्लाइट)',
        audioText: 'टोमॅटो पिकावर करपा अर्ली ब्लाइट रोग आढळला आहे, अचूकता 94.6 टक्के. मध्यम प्रादुर्भाव. प्रादुर्भाव झालेली खालची पाने काढून टाका. 5 मिली प्रति लिटर निंबोळी अर्क फवारा किंवा मॅन्कोझेब 2.5 ग्रॅम प्रति लिटर पाण्यात मिसळून फवारणी करावी.',
        langCode: 'mr-IN'
      },
      bn: {
        diseaseName: 'আর্লি ব্লাইট (আলটারনারিয়া)',
        audioText: 'টমেটোতে আর্লি ব্লাইট রোগ শনাক্ত হয়েছে, নির্ভুলতা ৯৪.৬ শতাংশ। মাঝারি সংক্রমণ। আক্রান্ত নিচের পাতাগুলো কেটে ফেলুন এবং প্রতি লিটারে ৫ মিলি নিম তেল অথবা ম্যানকোজেব স্প্রে করুন।',
        langCode: 'bn-IN'
      },
      ta: {
        diseaseName: 'ஆரம்பகால இலைக்கருகல் நோய்',
        audioText: 'தக்காளி பயிரில் ஆரம்பகால இலைக்கருகல் நோய் கண்டறியப்பட்டுள்ளது, 94.6 சதவீதம் துல்லியம். பாதிக்கப்பட்ட இலைகளை அகற்றி, ஒரு லிட்டர் தண்ணீருக்கு 5 மிலி வேப்பெண்ணெய் அல்லது மேன்கோசெப் தெளிக்கவும்.',
        langCode: 'ta-IN'
      },
      te: {
        diseaseName: 'ఎర్లీ బ్లైట్ తెగులు',
        audioText: 'టమాట పంటలో ఎర్లీ బ్లైట్ తెగులు గుర్తించబడింది, 94.6 శాతం ఖచ్చితత్వం. సోకిన ఆకులను తొలగించి, లీటరు నీటికి 5 మిల్లీలీటర్ల వేప నూనె లేదా మాంకోజెబ్ పిచికారీ చేయండి.',
        langCode: 'te-IN'
      }
    }
  },
  {
    id: 'sample-2',
    crop: 'Corn (Maize)',
    cropHindi: 'मक्का',
    cropMarathi: 'मका',
    tag: 'Fungal Rust',
    disease: 'Common Rust (Puccinia sorghi)',
    confidence: 91.2,
    severity: 'Mild Pustules (15% Canopy)',
    severityColor: 'amber',
    icon: '🌽',
    organicRemedy: 'Ensure field aeration and sunlight exposure. Apply Pseudomonas fluorescens bio-agent @ 10g/L.',
    chemicalRemedy: 'Foliar spray of Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1ml/L if rust pustules expand.',
    translations: {
      en: {
        diseaseName: 'Common Rust (Puccinia sorghi)',
        audioText: 'Corn Common Rust detected with 91.2 percent confidence. Mild infection stage. Ensure proper drainage and sunlight. Spray bio-agent Pseudomonas or Azoxystrobin at 1 milliliter per liter.',
        langCode: 'en-IN'
      },
      hi: {
        diseaseName: 'कॉमन रस्ट (गेरुआ रोग)',
        audioText: 'मक्का में सामान्य गेरुआ रोग पाया गया है, विश्वसनीयता 91.2 प्रतिशत। शुरुआती लक्षण। खेत में धूप और वायु संचार सुनिश्चित करें। स्यूडोमोनास बायो-एजेंट अथवा एज़ोक्सिस्ट्रोबिन 1 मिली प्रति लीटर छिड़कें।',
        langCode: 'hi-IN'
      },
      mr: {
        diseaseName: 'तांबेरा रोग (कॉमन रस्ट)',
        audioText: 'मका पिकावर तांबेरा रोग आढळला आहे, अचूकता 91.2 टक्के. सौम्य प्रादुर्भाव. शेतात हवा खेळती ठेवा आणि स्यूडोमोनास किंवा अझॉक्सीस्ट्रोबिन 1 मिली प्रति लिटर फवारा.',
        langCode: 'mr-IN'
      },
      bn: {
        diseaseName: 'সাধারণ মরিচা রোগ (কমন রাস্ট)',
        audioText: 'ভুট্টায় সাধারণ মরিচা রোগ শনাক্ত হয়েছে, নির্ভুলতা ৯১.২ শতাংশ। প্রাথমিক স্তর। সিউডোমোনাস বা অ্যাজোক্সিস্ট্রোবিন স্প্রে করুন।',
        langCode: 'bn-IN'
      },
      ta: {
        diseaseName: 'பொதுவான துரு நோய்',
        audioText: 'மக்காச்சோளத்தில் துரு நோய் கண்டறியப்பட்டுள்ளது, 91.2 சதவீதம் துல்லியம். ஆரம்ப நிலை. சூடோமோனாஸ் அல்லது அசோக்ஸிஸ்ட்ரோபின் தெளிக்கவும்.',
        langCode: 'ta-IN'
      },
      te: {
        diseaseName: 'కామన్ రస్ట్ తెగులు',
        audioText: 'మొక్కజొన్నలో రస్ట్ తెగులు గుర్తించబడింది, 91.2 శాతం ఖచ్చితత్వం. సూడోమోనాస్ లేదా అజాక్సీస్ట్రోబిన్ పిచికారీ చేయండి.',
        langCode: 'te-IN'
      }
    }
  },
  {
    id: 'sample-3',
    crop: 'Rice (Paddy)',
    cropHindi: 'धान',
    cropMarathi: 'भात',
    tag: 'Bacterial Blight',
    disease: 'Bacterial Leaf Blight (Xanthomonas oryzae)',
    confidence: 96.8,
    severity: 'Severe Wilting (60% Foliage)',
    severityColor: 'red',
    icon: '🌾',
    organicRemedy: 'Drain standing stagnant field water immediately. Delay nitrogen top-dressing until lesion margins dry.',
    chemicalRemedy: 'Copper Oxychloride 50% WP @ 2.5g/L mixed with Streptocycline @ 0.5g/10L water.',
    translations: {
      en: {
        diseaseName: 'Bacterial Leaf Blight (Xanthomonas oryzae)',
        audioText: 'Rice Bacterial Leaf Blight detected with 96.8 percent confidence. Severe infection stage. Immediately drain standing water from field, stop urea nitrogen, and spray Copper Oxychloride with Streptocycline.',
        langCode: 'en-IN'
      },
      hi: {
        diseaseName: 'जीवाणु झुलसा (बैक्टीरियल लीफ ब्लाइट)',
        audioText: 'धान में जीवाणु झुलसा रोग पाया गया है, विश्वसनीयता 96.8 प्रतिशत। गंभीर स्थिति। खेत से तुरंत पानी निकालें, यूरिया का प्रयोग रोकें, और कॉपर ऑक्सीक्लोराइड 2.5 ग्राम प्रति लीटर के साथ स्ट्रेप्टोसाइक्लिन मिलाकर छिड़कें।',
        langCode: 'hi-IN'
      },
      mr: {
        diseaseName: 'जिवाणूजन्य करपा रोग',
        audioText: 'भात पिकावर जिवाणूजन्य करपा रोग आढळला आहे, अचूकता 96.8 टक्के. गंभीर प्रादुर्भाव. शेतातील साचलेले पाणी तातडीने काढून टाका, युरिया खत देणे थांबवा आणि कॉपर ऑक्सिक्लोराईड 2.5 ग्रॅम प्रति लिटर फवारा.',
        langCode: 'mr-IN'
      },
      bn: {
        diseaseName: 'ব্যাকটেরিয়াল ব্লাইট',
        audioText: 'ধানের ব্যাকটেরিয়াল ব্লাইট রোগ শনাক্ত হয়েছে, নির্ভুলতা ৯৬.৮ শতাংশ। গুরুতর অবস্থা। মাঠের জমা পানি নিষ্কাশন করুন এবং কপার অক্সিক্লোরাইড স্প্রে করুন।',
        langCode: 'bn-IN'
      },
      ta: {
        diseaseName: 'பாக்டீரியா இலைக்கருகல் நோய்',
        audioText: 'நெல் பயிரில் பாக்டீரியா இலைக்கருகல் நோய் கண்டறியப்பட்டுள்ளது, 96.8 சதவீதம் துல்லியம். தேங்கிய நீரை வெளியேற்றி காப்பர் ஆக்ஸிகுளோரைடு தெளிக்கவும்.',
        langCode: 'ta-IN'
      },
      te: {
        diseaseName: 'బ్యాక్టీరియల్ లీఫ్ బ్లైట్',
        audioText: 'వరి పంటలో బ్యాక్టీరియల్ బ్లైట్ తెగులు గుర్తించబడింది, 96.8 శాతం ఖచ్చితత్వం. పొలంలోని నీటిని తీసివేసి కాపర్ ఆక్సిక్లోరైడ్ పిచికారీ చేయండి.',
        langCode: 'te-IN'
      }
    }
  },
  {
    id: 'sample-4',
    crop: 'Wheat',
    cropHindi: 'गेहूं',
    cropMarathi: 'गहू',
    tag: 'Healthy Foliage',
    disease: 'Optimal Healthy Canopy (No Pathogen)',
    confidence: 98.4,
    severity: 'Zero Symptoms (100% Healthy)',
    severityColor: 'green',
    icon: '🌿',
    organicRemedy: 'Foliage is vibrant and active. Maintain routine seaweed extract liquid foliar spray (2ml/L) for growth.',
    chemicalRemedy: 'No chemical fungicides needed. Continue recommended balanced NPK 120:60:40 kg/ha split schedule.',
    translations: {
      en: {
        diseaseName: 'Healthy Wheat Leaf (Optimal Condition)',
        audioText: 'Wheat leaf diagnosed as completely healthy with 98.4 percent confidence. Zero disease symptoms or pathogen lesions detected. Continue standard balanced fertilization and irrigation.',
        langCode: 'en-IN'
      },
      hi: {
        diseaseName: 'गेहूं की स्वस्थ पत्ती (रोगमुक्त)',
        audioText: 'गेहूं की पत्ती पूर्णतः स्वस्थ है, विश्वसनीयता 98.4 प्रतिशत। कोई रोग या कीट संक्रमण नहीं पाया गया। सामान्य पोषक तत्व और सिंचाई चक्र जारी रखें।',
        langCode: 'hi-IN'
      },
      mr: {
        diseaseName: 'निरोगी गहू पान (रोगमुक्त)',
        audioText: 'गव्हाचे पान पूर्णपणे निरोगी आहे, अचूकता 98.4 टक्के. कोणताही रोग किंवा कीड आढळलेली नाही. नियमित खत व पाणी व्यवस्थापन सुरू ठेवा.',
        langCode: 'mr-IN'
      },
      bn: {
        diseaseName: 'সুস্থ গমের পাতা (রোগমুক্ত)',
        audioText: 'গমের পাতা সম্পূর্ণ সুস্থ, নির্ভুলতা ৯৮.৪ শতাংশ। কোনো রোগ সংক্রমণ নেই। স্বাভাবিক পরিচর্যা চালিয়ে যান।',
        langCode: 'bn-IN'
      },
      ta: {
        diseaseName: 'ஆரோக்கியமான கோதுமை இலை',
        audioText: 'கோதுமை இலை முற்றிலும் ஆரோக்கியமாக உள்ளது, 98.4 சதவீதம் துல்லியம். வழக்கமான பாசனம் மற்றும் உரமிடுதலை தொடரவும்.',
        langCode: 'ta-IN'
      },
      te: {
        diseaseName: 'ఆరోగ్యకరమైన గోధుమ ఆకు',
        audioText: 'గోధుమ ఆకు పూర్తి ఆరోగ్యంగా ఉంది, 98.4 శాతం ఖచ్చితత్వం. సాధారణ నీటిపారుదల మరియు పోషకాలను కొనసాగించండి.',
        langCode: 'te-IN'
      }
    }
  },
  {
    id: 'sample-5',
    crop: 'Potato',
    cropHindi: 'आलू',
    cropMarathi: 'बटाटा',
    tag: 'Fungal Water Mold',
    disease: 'Late Blight (Phytophthora infestans)',
    confidence: 93.1,
    severity: 'High Spore Load (45% Foliage)',
    severityColor: 'red',
    icon: '🥔',
    organicRemedy: 'High humidity spore surge. Remove decaying vines immediately. Dust field edges with wood ash and sulfur.',
    chemicalRemedy: 'Apply systemic fungicide Metalaxyl-M 4% + Mancozeb 64% WP @ 2.5g/L within 24 hours to arrest tuber rot.',
    translations: {
      en: {
        diseaseName: 'Potato Late Blight (Phytophthora infestans)',
        audioText: 'Potato Late Blight detected with 93.1 percent confidence. Spore load is high. Immediately apply systemic fungicide Metalaxyl plus Mancozeb at 2.5 grams per liter to prevent tuber rot.',
        langCode: 'en-IN'
      },
      hi: {
        diseaseName: 'पछेती झुलसा (लेट ब्लाइट)',
        audioText: 'आलू में पछेती झुलसा रोग पाया गया है, विश्वसनीयता 93.1 प्रतिशत। फफूंद संक्रमण अधिक है। तुरंत मेटालेक्सिल और मेंकोज़ेब 2.5 ग्राम प्रति लीटर मिलाकर छिड़काव करें ताकि कंद सुरक्षित रहें।',
        langCode: 'hi-IN'
      },
      mr: {
        diseaseName: 'उशिरा येणारा करपा (लेट ब्लाइट)',
        audioText: 'बटाटा पिकावर लेट ब्लाइट करपा आढळला आहे, अचूकता 93.1 टक्के. बुरशीचा प्रादुर्भाव जास्त आहे. कंद सडू नये म्हणून तात्काळ मेटॅलॅक्सिल अधिक मॅन्कोझेब 2.5 ग्रॅम प्रति लिटर पाण्यात मिसळून फवारा.',
        langCode: 'mr-IN'
      },
      bn: {
        diseaseName: 'লেইট ব্লাইট (নাবী ধসা)',
        audioText: 'আলুতে লেইট ব্লাইট রোগ শনাক্ত হয়েছে, নির্ভুলতা ৯৩.১ শতাংশ। দ্রুত মেটালাক্সিল ও ম্যানকোজেব স্প্রে করুন যাতে আলুর পচন রোধ করা যায়।',
        langCode: 'bn-IN'
      },
      ta: {
        diseaseName: 'உருளைக்கிழங்கு லேட் பிளைட்',
        audioText: 'உருளைக்கிழங்கில் லேட் பிளைட் நோய் கண்டறியப்பட்டுள்ளது, 93.1 சதவீதம் துல்லியம். மெட்டலாக்சில் மற்றும் மேன்கோசெப் உடனடியாக தெளிக்கவும்.',
        langCode: 'ta-IN'
      },
      te: {
        diseaseName: 'లేట్ బ్లైట్ తెగులు',
        audioText: 'బంగాళాదుంపలో లేట్ బ్లైట్ తెగులు గుర్తించబడింది, 93.1 శాతం ఖచ్చితత్వం. వెంటనే మెటలాక్సిల్ మరియు మాంకోజెబ్ పిచికారీ చేయండి.',
        langCode: 'te-IN'
      }
    }
  }
];

const LANGUAGE_OPTIONS = [
  { code: 'en', name: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', native: 'मराठी (Maharashtra)', flag: '🚩' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', flag: '🌾' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', flag: '🌴' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', flag: '🌱' },
];

export default function InteractiveDemoSection() {
  const { user, saveScan, openAuthModal } = useAuth();

  const [selectedSample, setSelectedSample] = useState(PRESET_SAMPLES[0]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState('');
  const [scanProgress, setScanProgress] = useState(0);
  const [result, setResult] = useState(PRESET_SAMPLES[0]);
  const [selectedLang, setSelectedLang] = useState('en');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const fileInputRef = useRef(null);

  // Stop speech when unmounting or changing
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Run Mocked Diagnosis with realistic animation
  const handleTriggerScan = (targetSample = selectedSample, customImage = uploadedImage) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    }

    setIsScanning(true);
    setScanProgress(15);
    setScanStep('Preprocessing leaf tensor matrices (224x224 RGB)...');
    setSaveSuccess(false);

    setTimeout(() => {
      setScanProgress(45);
      setScanStep('Running MobileNetV3 convolutional feature extraction...');
    }, 800);

    setTimeout(() => {
      setScanProgress(80);
      setScanStep('Synthesizing pathogen classification & precision dosage...');
    }, 1700);

    setTimeout(() => {
      setScanProgress(100);
      setScanStep('Diagnosis complete!');
      setResult(targetSample);
      setIsScanning(false);

      // Auto save to scan history if logged in
      if (user) {
        const trans = targetSample.translations[selectedLang] || targetSample.translations.en;
        saveScan({
          crop: targetSample.crop,
          disease: trans.diseaseName || targetSample.disease,
          confidence: targetSample.confidence,
          severity: targetSample.severity,
          remedyOrganic: targetSample.organicRemedy,
          remedyChemical: targetSample.chemicalRemedy,
          voiceText: trans.audioText,
          imageName: customImage ? 'Custom uploaded crop leaf' : `${targetSample.crop} benchmark leaf`
        });
        setSaveSuccess(true);
      }
    }, 2400);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
        // Map to random sample for simulation
        const randomPreset = PRESET_SAMPLES[Math.floor(Math.random() * PRESET_SAMPLES.length)];
        setSelectedSample(randomPreset);
        handleTriggerScan(randomPreset, event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Play SpeechSynthesis Voice Advice
  const handlePlayVoice = () => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-Speech Web API is not supported in your browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const currentTrans = result.translations[selectedLang] || result.translations.en;
    const textToSpeak = currentTrans.audioText;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    // Look for best matching installed voice
    const voices = window.speechSynthesis.getVoices();
    const targetLangCode = currentTrans.langCode.toLowerCase();
    const matchedVoice = voices.find(v => v.lang.toLowerCase().startsWith(targetLangCode.split('-')[0]));

    if (matchedVoice) {
      utterance.voice = matchedVoice;
      setVoiceNotice('');
    } else {
      // Fallback to English voice if regional voice pack isn't installed
      const enVoice = voices.find(v => v.lang.toLowerCase().startsWith('en'));
      if (enVoice) utterance.voice = enVoice;
      if (selectedLang !== 'en') {
        setVoiceNotice(`Native ${LANGUAGE_OPTIONS.find(l => l.code === selectedLang)?.native} voice pack not installed on your system. Playing with available system voice; translated text displayed below.`);
      }
    }

    utterance.rate = 0.92; // Slightly slower for clarity
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  };

  const activeTranslation = result.translations[selectedLang] || result.translations.en;

  return (
    <section id="demo" className="min-h-screen relative py-20 px-4 sm:px-6 lg:px-8 bg-[#081C15]/90">
      {/* Glow backdrop */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#40916C]/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B4332] border border-[#B9FBC0]/40 text-[#B9FBC0] text-xs font-extrabold uppercase tracking-wider mb-4 shadow-lg">
            <Sparkles className="w-4 h-4 text-[#FFB703]" />
            <span>Working Interactive Prototype Demo</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            AI Crop Disease <span className="text-[#B9FBC0]">Diagnostic Scanner</span>
          </h2>

          <p className="text-sm sm:text-base text-[#74C69D] mt-3">
            Upload your own crop leaf photo or choose a benchmark sample below to run instant neural pathology detection and listen to vernacular voice treatment advice.
          </p>
        </div>

        {/* Demo Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Leaf Input & Benchmark Presets (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Upload Box */}
            <div className="glass-panel p-6 rounded-3xl border border-[#40916C]/30 bg-[#081C15]/80 shadow-xl">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#B9FBC0] mb-3 flex items-center gap-2">
                <UploadCloud className="w-4 h-4" />
                <span>Upload Leaf Photograph</span>
              </h3>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#40916C]/60 hover:border-[#B9FBC0] rounded-2xl p-6 text-center cursor-pointer transition-all bg-[#1B4332]/20 hover:bg-[#1B4332]/40 group relative overflow-hidden"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                {uploadedImage ? (
                  <div className="space-y-3">
                    <img
                      src={uploadedImage}
                      alt="Uploaded crop leaf"
                      className="w-full h-44 object-cover rounded-xl border border-[#B9FBC0]/40 shadow-md mx-auto"
                    />
                    <p className="text-xs text-[#B9FBC0] font-semibold">Click to upload a different leaf</p>
                  </div>
                ) : (
                  <div className="space-y-3 py-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#1B4332] border border-[#B9FBC0]/30 flex items-center justify-center text-[#B9FBC0] mx-auto group-hover:scale-110 transition-transform shadow-lg">
                      <Leaf className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">Drag & drop or browse crop photo</p>
                      <p className="text-xs text-[#74C69D] mt-1">Supports JPG, PNG, WEBP (Leaves, foliar spots, rusts)</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Benchmark Samples Selector */}
            <div className="glass-panel p-6 rounded-3xl border border-[#40916C]/30 bg-[#081C15]/80 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#74C69D]">
                  Or Select Benchmark Leaf Sample
                </h3>
                <span className="text-[10px] text-[#B9FBC0] bg-[#1B4332] px-2 py-0.5 rounded-full">
                  PlantVillage Dataset
                </span>
              </div>

              <div className="space-y-2.5">
                {PRESET_SAMPLES.map((sample) => {
                  const isSelected = selectedSample.id === sample.id && !uploadedImage;
                  return (
                    <button
                      key={sample.id}
                      onClick={() => {
                        setUploadedImage(null);
                        setSelectedSample(sample);
                        handleTriggerScan(sample, null);
                      }}
                      className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${
                        isSelected
                          ? 'bg-[#1B4332] border-[#B9FBC0] shadow-md shadow-[#40916C]/30'
                          : 'bg-[#081C15]/60 hover:bg-[#1B4332]/60 border-[#40916C]/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{sample.icon}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <strong className="text-xs font-bold text-white">{sample.crop}</strong>
                            <span className="text-[10px] px-2 py-0.2 rounded bg-[#081C15] text-[#74C69D] border border-[#40916C]/30">
                              {sample.tag}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#74C69D] truncate max-w-[200px] sm:max-w-xs">
                            {sample.disease}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-mono font-extrabold text-[#B9FBC0]">
                          {sample.confidence}%
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: AI Scan Execution & Diagnostic Card (7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#B9FBC0]/30 bg-gradient-to-br from-[#1B4332]/90 via-[#081C15]/95 to-[#081C15]/95 shadow-2xl relative overflow-hidden">
              {/* Decorative Glow */}
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#B9FBC0]/15 blur-[60px] rounded-full pointer-events-none" />

              {/* Scanning Progress Overlay */}
              {isScanning ? (
                <div className="py-20 text-center space-y-6 animate-in fade-in duration-200">
                  <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                    <Loader2 className="w-20 h-20 text-[#B9FBC0] animate-spin" />
                    <Zap className="w-8 h-8 text-[#FFB703] absolute animate-pulse" />
                  </div>

                  <div>
                    <h4 className="text-lg font-extrabold text-white mb-1">
                      Analyzing Crop Foliage...
                    </h4>
                    <p className="text-xs font-mono text-[#B9FBC0]">{scanStep}</p>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full max-w-md mx-auto bg-[#081C15] h-3 rounded-full overflow-hidden border border-[#40916C]/40">
                    <div 
                      className="bg-gradient-to-r from-[#40916C] via-[#52B788] to-[#B9FBC0] h-full transition-all duration-300 rounded-full"
                      style={{ width: `${scanProgress}%` }}
                    />
                  </div>

                  <span className="text-[11px] text-[#74C69D]">MobileNetV3 Edge Tensor Pipeline • ~2.4s</span>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Card Header & Severity */}
                  <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-[#40916C]/30">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-[#74C69D]">
                          Pathology Report • {result.crop}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#1B4332] text-[#B9FBC0] border border-[#B9FBC0]/40">
                          {result.confidence}% Confidence
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                        {activeTranslation.diseaseName || result.disease}
                      </h3>
                      <p className="text-xs text-[#74C69D] mt-0.5">
                        Scientific Taxonomy: <em>{result.disease}</em>
                      </p>
                    </div>

                    <div className={`px-3.5 py-1.5 rounded-xl border text-xs font-extrabold shrink-0 ${
                      result.severityColor === 'green'
                        ? 'bg-emerald-950/60 border-emerald-400 text-emerald-300'
                        : result.severityColor === 'amber'
                        ? 'bg-amber-950/60 border-amber-400 text-amber-300'
                        : 'bg-red-950/60 border-red-500 text-red-300'
                    }`}>
                      {result.severity}
                    </div>
                  </div>

                  {/* Vernacular Language Audio Player Block */}
                  <div className="p-4 rounded-2xl bg-[#081C15]/90 border border-[#B9FBC0]/30 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Languages className="w-4 h-4 text-[#B9FBC0]" />
                        <span className="text-xs font-bold text-white">Select Vernacular Language:</span>
                      </div>

                      {/* Language Selector Dropdown */}
                      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                        {LANGUAGE_OPTIONS.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => {
                              setSelectedLang(lang.code);
                              if ('speechSynthesis' in window) {
                                window.speechSynthesis.cancel();
                                setIsPlayingAudio(false);
                              }
                            }}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              selectedLang === lang.code
                                ? 'bg-[#40916C] text-white shadow-md'
                                : 'bg-[#1B4332]/40 text-[#74C69D] hover:text-white'
                            }`}
                          >
                            <span>{lang.native}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Audio Playback Controls */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-[#40916C]/20">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handlePlayVoice}
                          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                            isPlayingAudio
                              ? 'bg-amber-400 text-[#081C15] shadow-lg shadow-amber-400/30 animate-pulse'
                              : 'bg-gradient-to-r from-[#40916C] to-[#52B788] text-white shadow-md shadow-[#40916C]/30 hover:scale-105'
                          }`}
                        >
                          {isPlayingAudio ? (
                            <>
                              <VolumeX className="w-4 h-4" />
                              <span>Stop Speech</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-4 h-4" />
                              <span>Play Voice Advice ({LANGUAGE_OPTIONS.find(l => l.code === selectedLang)?.native})</span>
                            </>
                          )}
                        </button>

                        {isPlayingAudio && (
                          <div className="flex items-center gap-1 px-2 text-[#B9FBC0]">
                            <span className="w-1 h-3 bg-[#B9FBC0] animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-1 h-5 bg-[#B9FBC0] animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-1 h-2 bg-[#B9FBC0] animate-bounce" style={{ animationDelay: '300ms' }} />
                            <span className="text-[10px] ml-1 font-mono">Synthesizing audio...</span>
                          </div>
                        )}
                      </div>

                      <span className="text-[10px] text-[#74C69D] font-mono">
                        SpeechSynthesis Web API • Localized Audio
                      </span>
                    </div>

                    {/* Fallback Notice */}
                    {voiceNotice && (
                      <p className="text-[10px] text-amber-300/90 bg-amber-950/40 p-2 rounded-lg border border-amber-500/20">
                        ⚠️ {voiceNotice}
                      </p>
                    )}
                  </div>

                  {/* Recommendations Cards (Organic & Chemical) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Organic Remedy */}
                    <div className="p-4 rounded-2xl bg-[#081C15]/70 border border-[#40916C]/30 space-y-2">
                      <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase tracking-wide">
                        <Leaf className="w-4 h-4" />
                        <span>Organic Bio-Treatment</span>
                      </div>
                      <p className="text-xs text-white/90 leading-relaxed">
                        {result.organicRemedy}
                      </p>
                    </div>

                    {/* Chemical Dosage Formulation */}
                    <div className="p-4 rounded-2xl bg-[#081C15]/70 border border-[#40916C]/30 space-y-2">
                      <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wide">
                        <Activity className="w-4 h-4" />
                        <span>Precision Chemical Formulation</span>
                      </div>
                      <p className="text-xs text-white/90 leading-relaxed">
                        {result.chemicalRemedy}
                      </p>
                    </div>
                  </div>

                  {/* Auth / Scan History Integration Prompt */}
                  <div className="pt-2">
                    {user ? (
                      <div className="p-3 rounded-xl bg-[#1B4332] border border-[#B9FBC0]/40 flex items-center justify-between text-xs text-[#B9FBC0]">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Saved to <strong>{user.name}&apos;s</strong> personal field history.</span>
                        </div>
                        <span className="text-[10px] uppercase tracking-wider font-bold">Synced</span>
                      </div>
                    ) : (
                      <div className="p-3.5 rounded-2xl bg-[#1B4332]/40 border border-[#40916C]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <BookmarkCheck className="w-4 h-4 text-[#FFB703] shrink-0" />
                          <p className="text-xs text-[#D8F3DC]">
                            Want to save this diagnosis and track treatment recovery over time?
                          </p>
                        </div>
                        <button
                          onClick={() => openAuthModal('signup')}
                          className="px-4 py-1.5 rounded-xl bg-[#B9FBC0] hover:bg-white text-[#081C15] font-extrabold text-xs shrink-0 transition-all cursor-pointer shadow-md"
                        >
                          Sign Up to Save History
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Prototype Capability Disclaimer */}
                  <div className="flex items-start gap-2 pt-2 text-[10px] text-[#74C69D]/80 border-t border-[#40916C]/20">
                    <Info className="w-3.5 h-3.5 text-[#B9FBC0] shrink-0 mt-0.5" />
                    <span>
                      <strong>Honest Prototype Disclosure:</strong> This interactive demo simulates inference across benchmark PlantVillage crop leaves (MobileNetV3 benchmark). Production deployment connects to the Python FastAPI edge worker. Zero hardware is required.
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
