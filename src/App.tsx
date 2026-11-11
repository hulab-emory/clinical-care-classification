import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { OverviewScreen } from './screens/OverviewScreen';
import { FrameworkScreen } from './screens/FrameworkScreen';
import { CodeBuilderScreen } from './screens/CodeBuilderScreen';
import { NewsScreen } from './screens/NewsScreen';
import { AboutScreen } from './screens/AboutScreen';
import { TranslationsScreen } from './screens/TranslationsScreen';
import { TerminologyScreen } from './screens/TerminologyScreen';
import { ContactScreen } from './screens/ContactScreen';
import { ArticleModal } from './components/ArticleModal';
import { FhirModal } from './components/FhirModal';
import { NewsArticle } from './data/cccData';

type ScreenType = 'overview' | 'framework' | 'translations' | 'code-builder' | 'terminology' | 'news' | 'about' | 'contact';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('overview');
  const [selectedBuilderComp, setSelectedBuilderComp] = useState<string>('A');

  // Modals state
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);
  const [fhirData, setFhirData] = useState<any>(null);

  // Scroll to top on screen change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScreen]);

  const handleNavigate = (screen: ScreenType) => {
    setCurrentScreen(screen);
  };

  const handleOpenTerminology = () => {
    setCurrentScreen('terminology');
  };

  const handleSelectComponentFromFramework = (componentCode: string) => {
    setSelectedBuilderComp(componentCode);
    setCurrentScreen('code-builder');
  };

  const handleSelectComponentFromTerminology = (componentCode: string) => {
    setSelectedBuilderComp(componentCode);
    setCurrentScreen('code-builder');
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between selection:bg-primary-fixed selection:text-primary">
      {/* Universal Fixed Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        onOpenTerminology={handleOpenTerminology}
      />

      {/* Main View Port Container */}
      <main className="w-full pt-20 flex-1">
        {currentScreen === 'overview' && (
          <OverviewScreen
            onNavigate={handleNavigate}
            onOpenTerminology={handleOpenTerminology}
          />
        )}

        {currentScreen === 'framework' && (
          <FrameworkScreen
            onNavigate={handleNavigate}
            onSelectComponentForBuilder={handleSelectComponentFromFramework}
          />
        )}

        {currentScreen === 'translations' && (
          <TranslationsScreen
            onNavigate={handleNavigate}
            onOpenTerminology={handleOpenTerminology}
          />
        )}

        {currentScreen === 'terminology' && (
          <TerminologyScreen
            onNavigate={handleNavigate}
            onSelectComponentForBuilder={handleSelectComponentFromTerminology}
          />
        )}

        {currentScreen === 'code-builder' && (
          <CodeBuilderScreen
            onNavigate={handleNavigate}
            onOpenFhirModal={(data) => setFhirData(data)}
            selectedComponentCode={selectedBuilderComp}
          />
        )}

        {currentScreen === 'news' && (
          <NewsScreen
            onNavigate={handleNavigate}
            onOpenArticle={(article) => setActiveArticle(article)}
            onOpenTerminology={handleOpenTerminology}
          />
        )}

        {currentScreen === 'about' && (
          <AboutScreen
            onNavigate={handleNavigate}
            onOpenTerminology={handleOpenTerminology}
          />
        )}

        {currentScreen === 'contact' && (
          <ContactScreen
            onNavigate={handleNavigate}
            onOpenTerminology={handleOpenTerminology}
          />
        )}
      </main>

      {/* Universal Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenTerminology={handleOpenTerminology}
      />

      {/* Article Reader Modal */}
      <ArticleModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
      />

      {/* FHIR JSON Export Modal */}
      <FhirModal
        isOpen={!!fhirData}
        onClose={() => setFhirData(null)}
        fullCode={fhirData?.fullCode || 'A01.1.1 - A10.0.2.1'}
        diagCode={fhirData?.diagCode || 'A01.1.1'}
        diagName={fhirData?.diagName || 'Activity Intolerance'}
        qualifierName={fhirData?.qualifierName || 'Impaired'}
        goalName={fhirData?.goalName || 'Improve'}
        goalCode={fhirData?.goalCode || '1'}
        intervCode={fhirData?.intervCode || 'A10.0'}
        intervName={fhirData?.intervName || 'Exercise Ambulation'}
        actionName={fhirData?.actionName || 'Care / Perform'}
        actionCode={fhirData?.actionCode || '2'}
        outcomeName={fhirData?.outcomeName || 'Improved'}
        outcomeCode={fhirData?.outcomeCode || '1'}
        snomed={fhirData?.snomed || '409586006'}
        loinc={fhirData?.loinc || '75282-4'}
      />
    </div>
  );
}
