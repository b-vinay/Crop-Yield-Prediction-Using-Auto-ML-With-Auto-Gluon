import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// English, Hindi, Telugu, Tamil
const resources = {
  en: {
    translation: {
      "appTitle": "Advanced Crop Yield Predictor",
      "cropName": "Crop Name",
      "cropVariety": "Crop Variety",
      "season": "Season",
      "monthPeriod": "Month Period",
      "cultivationPractices": "Cultivation Practices",
      "fertilizers": "Fertilizers (kg/acre)",
      "waterSupply": "Water Supply",
      "soilType": "Soil Type",
      "state": "State",
      "soilFertility": "Soil Fertility",
      "rainfall": "Rainfall (mm)",
      "predictYield": "Predict Yield",
      "processing": "Processing AutoML...",
      "predictedYield": "Predicted Crop Yield",
      "tonnesPerHectare": "Tonnes/Hectare",
      "basedOnModel": "Based on an advanced AutoGluon tabular model prediction.",
      "reset": "Reset",
      "loginEmail": "Email",
      "loginPhone": "Phone",
      "requestOTP": "Request OTP",
      "verifyOTP": "Verify OTP",
      "enterEmail": "Enter Email address",
      "enterPhone": "Enter Phone Number",
      "enterOTP": "Enter 4-Digit OTP",
      "welcomeBack": "Welcome Back"
    }
  },
  hi: {
    translation: {
      "appTitle": "उन्नत फसल उपज भविष्यवक्ता",
      "cropName": "फसल का नाम",
      "cropVariety": "फसल की किस्म",
      "season": "मौसम",
      "monthPeriod": "माह अवधि",
      "cultivationPractices": "खेती के तरीके",
      "fertilizers": "उर्वरक (किग्रा/एकड़)",
      "waterSupply": "जल आपूर्ति",
      "soilType": "मिट्टी का प्रकार",
      "state": "राज्य",
      "soilFertility": "मिट्टी की उर्वरता",
      "rainfall": "वर्षा (मिमी)",
      "predictYield": "उपज की भविष्यवाणी करें",
      "processing": "ऑटोएमएल संसाधित हो रहा है...",
      "predictedYield": "अनुमानित फसल उपज",
      "tonnesPerHectare": "टन/हेक्टेयर",
      "basedOnModel": "उन्नत ऑटोएमएल मॉडल भविष्यवाणी के आधार पर।",
      "reset": "रीसेट करें",
      "loginEmail": "ईमेल",
      "loginPhone": "फ़ोन",
      "requestOTP": "ओटीपी का अनुरोध करें",
      "verifyOTP": "ओटीपी सत्यापित करें",
      "enterEmail": "ईमेल पता दर्ज करें",
      "enterPhone": "फोन नंबर दर्ज करें",
      "enterOTP": "4 अंकों का ओटीपी दर्ज करें",
      "welcomeBack": "वापसी पर स्वागत है"
    }
  },
  te: {
    translation: {
      "appTitle": "అధునాతన పంట దిగుబడి అంచనా",
      "cropName": "పంట పేరు",
      "cropVariety": "పంట రకం",
      "season": "సీజన్ (కాలం)",
      "monthPeriod": "నెల వ్యవధి",
      "cultivationPractices": "సాగు పద్ధతులు",
      "fertilizers": "ఎరువులు (కిలోలు / ఎకరం)",
      "waterSupply": "నీటి సరఫరా",
      "soilType": "నేల రకం",
      "state": "రాష్ట్రం",
      "soilFertility": "నేల సారం",
      "rainfall": "వర్షపాతం (మి.మీ)",
      "predictYield": "దిగుబడిని అంచనా వేయండి",
      "processing": "ఆటోఎంఎల్ ప్రాసెస్ అవుతోంది...",
      "predictedYield": "అంచనా వేసిన పంట దిగుబడి",
      "tonnesPerHectare": "టన్నులు/హెక్టారు",
      "basedOnModel": "ఆటోఎంఎల్ మోడల్ ప్రాతిపదికన",
      "reset": "రీసెట్ చేయండి",
      "loginEmail": "ఈ-మెయిల్",
      "loginPhone": "ఫోన్ నంబర్",
      "requestOTP": "ఓటీపీని కోరండి",
      "verifyOTP": "ఓటీపీ నిర్ధారించండి",
      "enterEmail": "ఈ-మెయిల్ చిరునామా నమోదు చేయండి",
      "enterPhone": "ఫోన్ నంబర్ నమోదు చేయండి",
      "enterOTP": "4-అంకెల ఓటీపీని నమోదు చేయండి",
      "welcomeBack": "తిరిగి స్వాగతం"
    }
  },
  ta: {
    translation: {
      "appTitle": "மேம்பட்ட பயிர் மகசூல் கணிப்பு",
      "cropName": "பயிர் பெயர்",
      "cropVariety": "பயிர் வகை",
      "season": "பருவம்",
      "monthPeriod": "மாத காலம்",
      "cultivationPractices": "சாகுபடி முறைகள்",
      "fertilizers": "உரங்கள் (கிலோ/ஏக்கர்)",
      "waterSupply": "நீர் விநியோகம்",
      "soilType": "மண் வகை",
      "state": "மாநிலம்",
      "soilFertility": "மண் வளம்",
      "rainfall": "மழைப்பொழிவு (மிமீ)",
      "predictYield": "மகசூலை கணி",
      "processing": "செயலாக்குகிறது...",
      "predictedYield": "கணிக்கப்பட்ட பயிர் மகசூல்",
      "tonnesPerHectare": "டன்கள்/ஹெக்டேர்",
      "basedOnModel": "ஒரு மேம்பட்ட மாடல் அடிப்படையிலானது",
      "reset": "மீட்டமை",
      "loginEmail": "மின்னஞ்சல்",
      "loginPhone": "தொலைபேசி எண்",
      "requestOTP": "OTP-ஐ கோரு",
      "verifyOTP": "OTP-ஐ சரிபார்",
      "enterEmail": "மின்னஞ்சல் உள்ளிடவும்",
      "enterPhone": "தொலைபேசி எண் உள்ளிடவும்",
      "enterOTP": "4 இலக்க OTP-ஐ உள்ளிடவும்",
      "welcomeBack": "மீண்டும் வருக"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
