"use client";

import { useState } from "react";
import { translateText } from '../services/translationService';

export default function Translate(){
    const [text, setText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [sourceLang, setSourceLang] = useState('en');
    const [targetLang, setTargetLang] = useState('fr');

    const handleTranslate = async () => {
        const result = await translateText(text, sourceLang, targetLang);
        setTranslatedText(result);
    };
    return (
        <div className='flex flex-col gap-4'>
          <div className="bg-gray-800 bg-opacity-90 p-8 rounded-xl shadow-lg max-w-lg w-full mx-auto">
              <div className="flex justify-start space-x-4 mb-4">
                <p className='m-auto text-[#4D5562]'>Detect Language</p>
                <button onClick={() => setSourceLang('en')} className={`px-4 py-2 rounded-xl ${sourceLang === 'en' ? 'bg-[#4D5562] text-white' : ' text-[#4D5562]'}`}>English</button>
                <button onClick={() => setSourceLang('fr')} className={`px-4 py-2 rounded-xl ${sourceLang === 'fr' ? 'bg-[#4D5562] text-white' : 'text-[#4D5562]'}`}>French</button>
                <button onClick={() => setSourceLang('es')} className={`px-4 py-2 rounded-xl ${sourceLang === 'es' ? 'bg-[#4D5562] text-white' : 'text-[#4D5562]'}`}>Spanish</button>
              </div>
              <hr />
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to translate"
                className="w-full py-4 rounded-lg bg-gray-800 bg-opacity-0 text-white resize-none"
                rows={5}
              />
            <div className="text-end mb-4">
              <button onClick={handleTranslate} className="bg-blue-600 text-white px-6 py-2 rounded-lg">Translate</button>
            </div>
          </div>
          <div className="bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-lg max-w-lg w-full mx-auto">
            <div className="flex justify-start space-x-4 mb-2">
              <button onClick={() => setTargetLang('en')} className={`px-4 py-2 rounded-xl ${targetLang === 'en' ? 'bg-[#4D5562] text-white' : 'text-[#4D5562]'}`}>English</button>
              <button onClick={() => setTargetLang('fr')} className={`px-4 py-2 rounded-xl ${targetLang === 'fr' ? 'bg-[#4D5562] text-white' : 'text-[#4D5562]'}`}>French</button>
              <button onClick={() => setTargetLang('es')} className={`px-4 py-2 rounded-xl ${targetLang === 'es' ? 'bg-[#4D5562] text-white' : 'text-[#4D5562]'}`}>Spanish</button>
            </div>
            <hr  className=''/>
            <textarea
                value={translatedText}
                placeholder="Translated text"
                readOnly
                className="w-full py-4 rounded-lg bg-gray-800 bg-opacity-0 text-white resize-none"
                rows={5}
              />
            
          </div>
        </div>
        
      );
    };