// services/translationService.ts
import axios from 'axios';

const apiUrl = 'https://api.mymemory.translated.net/get';

export const translateText = async (text: string, langFrom: string, langTo: string): Promise<string> => {
  try {
    const response = await axios.get(apiUrl, {
      params: {
        q: text,
        langpair: `${langFrom}|${langTo}`,
      },
    });
    return response.data.responseData.translatedText;
  } catch (error) {
    console.error('Error translating text:', error);
    return 'Translation error';
  }
};
