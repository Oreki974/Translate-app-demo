// pages/index.tsx
"use client";
import { useState } from 'react';
import { translateText } from '../services/translationService'; 
import Image from 'next/image';
import { url } from 'inspector';

const Home = () => {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('fr');
  const [charCount, setCharCount] = useState(0); // 新增字符计数状态

  const handleTranslate = async () => {
    const result = await translateText(text, sourceLang, targetLang);
    setTranslatedText(result);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    if (inputText.length <= 500) { // 限制输入字符最大值为500
      setText(inputText);
      setCharCount(inputText.length); // 更新字符计数
    }
  };

  const handleSpeech = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = sourceLang;
    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Text copied to clipboard');
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };

  return (
    <div className='flex flex-col justify-center'>
      <div>
        <Image 
          src={'/images/logo.svg'}
          alt="Logo"
          width={150}
          height={150}
          className='mx-auto my-10'
        />
      </div>
      <div className='flex flex-col gap-4 md:flex-row'>
        <div className="bg-gray-800 bg-opacity-90 p-8 rounded-xl shadow-lg max-w-lg w-full mx-auto md:ml-auto md:mr-1">
            <div className="flex justify-start space-x-4 mb-2">
              <p className='m-auto text-[#4D5562]'>Detect Language</p>
              <button onClick={() => setSourceLang('en')} className={`px-4 py-2 rounded-xl ${sourceLang === 'en' ? 'bg-[#4D5562] text-white' : ' text-[#4D5562]'}`}>English</button>
              <button onClick={() => setSourceLang('fr')} className={`px-4 py-2 rounded-xl ${sourceLang === 'fr' ? 'bg-[#4D5562] text-white' : 'text-[#4D5562]'}`}>French</button>
              <select 
                title='language'
                onChange={(e) => setSourceLang(e.target.value)} 
                // className=" rounded-xl text-[#4D5562] bg-gray-800 bg-opacity-0"
                //改变被选中时的背景颜色与文字颜色
                className={`rounded-xl ${sourceLang !== 'en' && sourceLang !== 'fr'? 'bg-[#4D5562] text-white' : 'bg-gray-800 bg-opacity-0 text-[#4D5562]'}`}
                value={sourceLang}
              >
                <option value="es">Spanish</option>
                <option value="de">German</option>
                <option value="it">Italian</option>
                <option value="pt">Portuguese</option>
                <option value="zh">Chinese</option>
                <option value="ja">Japanese</option>
                <option value="ko">Korean</option>
                <option value="ru">Russian</option>
                {/* 可以根据需求添加更多语言 */}
              </select>
            </div>
            <hr />
            <textarea
              value={text}
              // onChange={(e) => setText(e.target.value)}
              onChange={handleTextChange}
              placeholder="Enter text to translate"
              className="w-full py-4 rounded-lg bg-gray-800 bg-opacity-0 text-white resize-none"
              rows={5}
              maxLength={500} // 限制最大字符数量
            />
            <div className="text-right text-gray-400">{charCount}/500</div>
          <div className="text-end mb-4 flex justify-between">
            <div className='flex'>
              <button onClick={handleSpeech} className="px-2 rounded-lg flex items-center" title='speech'>
                <div className='border-2 border-[#4D5562] rounded-lg p-1'>
                  <Image
                    src={'/images/sound_max_fill.svg'}
                    alt="Sound"
                    width={24}
                    height={24}
                  />
                </div>
              </button>
              <button onClick={handleCopy} className="px-2 rounded-lg flex items-center" title='copy'>
                <div className='border-2 border-[#4D5562] rounded-lg p-1'>
                  <Image
                    src={'/images/Copy.svg'}
                    alt="Copy"
                    width={24}
                    height={24}
                  />
                </div>
              </button>
            </div>
            <button onClick={handleTranslate} className="bg-blue-600 text-white px-6 py-2 rounded-lg flex">
            <Image
              src={'/images/Sort_alfa.svg'}
              alt="Sort Alphabetically"
              width={24}
              height={24}
            />
              Translate</button>
          </div>
        </div>
        <div className="bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-lg max-w-lg w-full mx-auto md:mr-auto md:ml-1">
          <div className="flex justify-start space-x-4 mb-2">
            <button onClick={() => setTargetLang('en')} className={`px-4 py-2 rounded-xl ${targetLang === 'en' ? 'bg-[#4D5562] text-white' : 'text-[#4D5562]'}`}>English</button>
            <button onClick={() => setTargetLang('fr')} className={`px-4 py-2 rounded-xl ${targetLang === 'fr' ? 'bg-[#4D5562] text-white' : 'text-[#4D5562]'}`}>French</button>
            <select 
              title='language'
              onChange={(e) => setTargetLang(e.target.value)} 
              // className="rounded-xl bg-gray-800 bg-opacity-0 text-[#4D5562]"
              //改变被选中时的背景颜色与文字颜色
              className={`rounded-xl ${targetLang !== 'en' && targetLang !== 'fr'? 'bg-[#4D5562] text-white' : 'bg-gray-800 bg-opacity-0 text-[#4D5562]'}`}
              value={targetLang}
            >
              <option value="es">Spanish</option>
              <option value="de">German</option>
              <option value="it">Italian</option>
              <option value="pt">Portuguese</option>
              <option value="zh">Chinese</option>
              <option value="ja">Japanese</option>
              <option value="ko">Korean</option>
              <option value="ru">Russian</option>
              {/* 可以根据需求添加更多语言 */}
            </select>
          </div>
          <hr />
          <textarea
            value={translatedText}
            placeholder="Translation"
            className="w-full py-4 rounded-lg bg-gray-800 bg-opacity-0 text-white resize-none"
            rows={5}
          />
          <div className='h-[24px]'></div>
          <div className='flex'>
              <button onClick={handleSpeech} className="px-2 rounded-lg flex items-center" title='speech'>
                <div className='border-2 border-[#4D5562] rounded-lg p-1'>
                  <Image
                    src={'/images/sound_max_fill.svg'}
                    alt="Sound"
                    width={24}
                    height={24}
                  />
                </div>
              </button>
              <button onClick={handleCopy} className="px-2 rounded-lg flex items-center" title='copy'>
                <div className='border-2 border-[#4D5562] rounded-lg p-1'>
                  <Image
                    src={'/images/Copy.svg'}
                    alt="Copy"
                    width={24}
                    height={24}
                  />
                </div>
              </button>
            </div>
        </div>
      </div>
    </div>
    
  );
};

export default Home;
