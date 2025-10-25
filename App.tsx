
import React, { useState, useCallback } from 'react';
import { Tone, Length, Language, Formality, Templates } from './types';
import { generateWhatsAppMessage } from './services/geminiService';
import InputGroup from './components/InputGroup';
import SelectGroup from './components/SelectGroup';
import ResultDisplay from './components/ResultDisplay';
import SparklesIcon from './components/icons/SparklesIcon';

const App: React.FC = () => {
  const [scenario, setScenario] = useState<string>('');
  const [tone, setTone] = useState<Tone>(Tone.Friendly);
  const [length, setLength] = useState<Length>(Length.Short);
  const [language, setLanguage] = useState<Language>(Language.English);
  const [formality, setFormality] = useState<Formality>(Formality.Standard);
  const [recipientName, setRecipientName] = useState<string>('');
  const [relationship, setRelationship] = useState<string>('');

  const [generatedMessages, setGeneratedMessages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const templateText = e.target.value;
    setScenario(templateText);
  };
  
  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!scenario) {
      setError('Please provide a scenario.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedMessages([]);

    try {
      const messages = await generateWhatsAppMessage({
        scenario,
        tone,
        length,
        language,
        formality,
        recipientName,
        relationship,
      });
      setGeneratedMessages(messages);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [scenario, tone, length, language, formality, recipientName, relationship]);
  
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <main className="w-full max-w-4xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
            KoshurConvo
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Craft the perfect WhatsApp message for any situation, powered by AI.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="template" className="block text-sm font-medium text-gray-300">Smart Templates</label>
                <select id="template" onChange={handleTemplateChange} className="block w-full mt-2 rounded-lg border-gray-600 bg-gray-700/50 text-gray-200 focus:border-teal-500 focus:ring-teal-500 transition duration-150 ease-in-out">
                  {Object.keys(Templates).map(key => <option key={key} value={Templates[key]}>{key}</option>)}
                </select>
              </div>

              <InputGroup
                label="Scenario"
                id="scenario"
                type="textarea"
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                placeholder="e.g., Birthday wish for a best friend"
                required
              />
              
              <div className="p-4 border border-gray-700 rounded-lg space-y-4 bg-gray-800/30">
                <h3 className="text-sm font-semibold text-gray-400 -mb-1">Advanced Personalization (Optional)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputGroup label="Recipient's Name" id="recipientName" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} placeholder="e.g., Alex" />
                  <InputGroup label="Relationship" id="relationship" value={relationship} onChange={(e) => setRelationship(e.target.value)} placeholder="e.g., Boss, Crush" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <SelectGroup<Tone> label="Tone" id="tone" value={tone} onChange={(e) => setTone(e.target.value as Tone)} options={Object.values(Tone)} />
                <SelectGroup<Length> label="Length" id="length" value={length} onChange={(e) => setLength(e.target.value as Length)} options={Object.values(Length)} />
                <SelectGroup<Formality> label="Formality" id="formality" value={formality} onChange={(e) => setFormality(e.target.value as Formality)} options={Object.values(Formality)} />
                <SelectGroup<Language> label="Language" id="language" value={language} onChange={(e) => setLanguage(e.target.value as Language)} options={Object.values(Language)} />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-200 ease-in-out transform hover:scale-105"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <SparklesIcon className="w-5 h-5 mr-2" />
                    Generate Messages
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="flex flex-col">
             <ResultDisplay messages={generatedMessages} isLoading={isLoading} error={error} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
