// import React from 'react';
// import { useTranslation } from 'react-i18next';
// import { Languages, ChevronDown } from 'lucide-react';

// interface LanguageSwitcherProps {
//   variant?: 'full' | 'mini';
// }

// const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ variant = 'full' }) => {
//   const { i18n } = useTranslation();
  

//   const languages = [
//     { code: 'en', label: 'English', flag: '🇬🇧' },
//     { code: 'nl-NL', label: 'Nederlands (NL)', flag: '🇳🇱' },
//     { code: 'nl-BE', label: 'Vlaams (BE)', flag: '🇧🇪' },
//     { code: 'nl-SR', label: 'Surinaams (SR)', flag: '🇸🇷' },
//     { code: 'nl-CW', label: 'Caribisch (CW)', flag: '🇨🇼' },
//     { code: 'pl', label: 'Polski', flag: '🇵🇱' },
//   ];

//   const currentLanguage = languages.find((l) => l.code === i18n.language) || languages[0];

//   const changeLanguage = (lng: string) => {
//     i18n.changeLanguage(lng);
//     localStorage.setItem('i18nextLng', lng);
//     localStorage.setItem('i18nextLngTimestamp', Date.now().toString());
//   };

//   if (variant === 'mini') {
//     return (
//       <div className="relative group inline-block text-left">
//         <button className="flex items-center gap-1 px-2 py-1 text-lg hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-all duration-200">
//           <span>{currentLanguage.flag}</span>
//           <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
//         </button>

//         <div className="absolute right-0 mt-2 w-40 origin-top-right rounded-xl bg-white dark:bg-gray-900 shadow-2xl ring-1 ring-black/5 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[9999] overflow-hidden">
//           <div className="py-1">
//             {languages.map((lang) => (
//               <button
//                 key={lang.code}
//                 onClick={() => changeLanguage(lang.code)}
//                 className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 transition-colors ${
//                   i18n.language === lang.code
//                     ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 font-semibold'
//                     : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
//                 }`}
//               >
//                 <span className="text-base">{lang.flag}</span>
//                 <span className="truncate">{lang.label}</span>
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="relative group inline-block text-left">
//       <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
//         <Languages size={18} />
//         <span>{currentLanguage.label}</span>
//       </button>

//       <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
//         <div className="py-1">
//           {languages.map((lang) => (
//             <button
//               key={lang.code}
//               onClick={() => changeLanguage(lang.code)}
//               className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 transition-colors ${
//                 i18n.language === lang.code
//                   ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold'
//                   : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
//               }`}
//             >
//               <span>{lang.flag}</span>
//               {lang.label}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LanguageSwitcher;



import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages, ChevronDown } from 'lucide-react';

interface LanguageSwitcherProps {
  variant?: 'full' | 'mini';
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ variant = 'full' }) => {
  const { i18n } = useTranslation();

  // ✅ ONLY ADDED (for mobile click support)
  const [open, setOpen] = React.useState(false);

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'nl-NL', label: 'Nederlands (NL)', flag: '🇳🇱' },
    { code: 'nl-BE', label: 'Vlaams (BE)', flag: '🇧🇪' },
    { code: 'nl-SR', label: 'Surinaams (SR)', flag: '🇸🇷' },
    { code: 'nl-CW', label: 'Caribisch (CW)', flag: '🇨🇼' },
    { code: 'pl', label: 'Polski', flag: '🇵🇱' },
  ];

  const currentLanguage =
    languages.find((l) => l.code === i18n.language) || languages[0];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
    localStorage.setItem('i18nextLngTimestamp', Date.now().toString());
  };

  if (variant === 'mini') {
    return (
      <div className="relative group inline-block text-left">

        {/* ✅ ONLY ADD CLICK (desktop unchanged) */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-1 px-2 py-1 text-lg hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-all duration-200"
        >
          <span>{currentLanguage.flag}</span>
          <ChevronDown
            size={14}
            className="text-gray-400 group-hover:text-gray-600 transition-colors"
          />
        </button>

        {/* ✅ HYBRID DROPDOWN (hover + mobile click support) */}
        <div
          className={`
            absolute left-1/2 mt-2 w-40 origin-top-right rounded-xl bg-white dark:bg-gray-900 shadow-2xl ring-1 ring-black/5 focus:outline-none z-[9999] overflow-hidden
            transition-all duration-300

            /* desktop (UNCHANGED behavior) */
            opacity-0 invisible group-hover:opacity-100 group-hover:visible

            /* mobile override via state */
            ${open ? "opacity-100 visible" : ""}
          `}
        >
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  changeLanguage(lang.code);
                  setOpen(false); // close on select (mobile)
                }}
                className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 transition-colors ${
                  i18n.language === lang.code
                    ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 font-semibold'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <span className="text-base">{lang.flag}</span>
                <span className="truncate">{lang.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group inline-block text-left">
      <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
        <Languages size={18} />
        <span>{currentLanguage.label}</span>
      </button>

      <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 transition-colors ${
                i18n.language === lang.code
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <span>{lang.flag}</span>
              {lang.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;