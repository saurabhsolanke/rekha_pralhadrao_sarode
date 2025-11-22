import { useState, useRef, useEffect } from "react";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const beepAudioRef = useRef<HTMLAudioElement>(null);
  const votingAudioRef = useRef<HTMLAudioElement>(null);

  const handleVoteClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (beepAudioRef.current) {
      beepAudioRef.current.pause();
      beepAudioRef.current.currentTime = 0;
    }
    if (votingAudioRef.current) {
      votingAudioRef.current.pause();
      votingAudioRef.current.currentTime = 0;
    }
  };

  const handleShare = () => {
    const shareText = "आपण सौ. रेखा प्रल्हादराव सरोदे यांना मत दिले आहे. (चिन्ह: घड्याळ, अनुक्रमांक: 2)";
    const shareUrl = window.location.href;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`;
    window.open(whatsappUrl, '_blank');
  };

  useEffect(() => {
    if (isModalOpen) {
      const beepAudio = beepAudioRef.current;
      const votingAudio = votingAudioRef.current;
      
      const handleBeepEnded = () => {
        // When beep.mp3 ends, play voting.aac
        if (votingAudio) {
          votingAudio.play().catch((error) => {
            console.error("Error playing voting audio:", error);
          });
        }
      };

      // Set up event listener for beep audio
      if (beepAudio) {
        beepAudio.addEventListener('ended', handleBeepEnded);
        
        // Play beep.mp3 first
        beepAudio.play().catch((error) => {
          console.error("Error playing beep audio:", error);
        });
      }

      // Cleanup function
      return () => {
        if (beepAudio) {
          beepAudio.removeEventListener('ended', handleBeepEnded);
        }
      };
    }
  }, [isModalOpen]);

  return (
    <div className="w-full max-w-full m-0 p-0 bg-gradient-to-b from-gray-50 to-white min-h-screen font-sans antialiased">

      {/* Main Banner Section */}
      <div className="bg-gradient-to-br from-yellow-50 via-white to-yellow-50 p-3 sm:p-4 md:p-6 lg:p-8 relative overflow-hidden shadow-soft">
        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <img 
            className="w-full h-auto rounded-lg sm:rounded-xl md:rounded-2xl shadow-medium transition-all duration-500 hover:shadow-strong" 
            src="/baner3.jpeg" 
            alt="Banner"
            loading="eager"
          />
        </div>
      </div>

      {/* Election Date Bar */}
      <div className="bg-gradient-to-r from-election-blue to-blue-600 text-white py-3 px-4 sm:py-4 sm:px-6 md:py-5 md:px-8 lg:py-6 text-center text-xs sm:text-sm md:text-base lg:text-lg font-semibold shadow-md relative overflow-hidden">
        <div className="relative z-10">
          मतदान दिनांक ०२ डिसेंबर २०२५ स. ०७:०० ते सायं. ०६:००
        </div>
      </div>

      {/* Ballot Table */}
      <div className="p-4 sm:p-6 md:p-8 lg:p-10 bg-white overflow-x-auto">
        <div className="max-w-7xl mx-auto">
          <div className="overflow-x-auto rounded-xl sm:rounded-2xl shadow-soft border border-gray-100">
            <table className="w-full border-collapse bg-white text-[11px] sm:text-xs md:text-sm lg:text-base min-w-[300px]">
              <thead>
                <tr className="bg-gradient-to-r from-election-blue to-blue-600 text-white">
                  <th className="p-3 sm:p-4 md:p-5 text-left font-bold border-r border-blue-500/30 whitespace-nowrap tracking-wide">अ.क्र</th>
                  <th className="p-3 sm:p-4 md:p-5 text-left font-bold border-r border-blue-500/30 whitespace-nowrap tracking-wide">उमेदवाराचे नाव</th>
                  <th className="lg:p-3 sm:p-0 md:p-5 text-left font-bold border-r border-blue-500/30 whitespace-nowrap tracking-wide">निवडणूक चिन्ह</th>
                  <th className="p-3 sm:p-4 md:p-5 text-left font-bold whitespace-nowrap tracking-wide">बटन</th>
                </tr>
              </thead>
              <tbody>
                <tr className="even:bg-gray-50/50 hover:bg-gray-100/50 transition-colors duration-200">
                  <td className="p-3 sm:p-4 md:p-5 border-b border-gray-200 text-gray-800 font-medium">1.</td>
                  <td className="p-3 sm:p-4 md:p-5 border-b border-gray-200"></td>
                  <td className="p-3 sm:p-4 md:p-5 border-b border-gray-200"></td>
                  <td className="p-3 sm:p-4 md:p-5 border-b border-gray-200">
                    <button className="bg-gray-200 text-gray-500 border-none px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-full text-[10px] sm:text-xs md:text-sm font-semibold cursor-not-allowed whitespace-nowrap transition-all duration-200 opacity-50">  </button>
                  </td>
                </tr>
                <tr className="bg-gradient-to-r from-blue-50 to-blue-100/50 even:bg-blue-50 hover:from-blue-100 hover:to-blue-200/50 transition-all duration-300 border-l-4 border-election-blue">
                  <td className="p-3 sm:p-4 md:p-5 border-b border-gray-200 text-gray-900 font-semibold align-middle">2.</td>
                  <td className="lg:p-3 sm:p-0 md:p-5 border-b border-gray-200 align-middle">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-election-blue/20 shadow-md">
                        <img className="w-full h-full object-cover rounded-full transition-transform duration-300 hover:scale-110" src="/kaku.jpeg" alt="Candidate" />
                      </div>
                      <span className="text-gray-900 text-xs sm:text-sm md:text-base font-semibold leading-tight">सौ. रेखा प्रल्हादराव सरोदे</span>
                    </div>
                  </td>
                  <td className="lg:p-3 sm:p-0 md:p-5 border-b border-gray-200 align-middle">
                    <span className="inline-flex items-center justify-center p-2 bg-white rounded-lg shadow-sm">
                      <img className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 object-contain transition-transform duration-300 hover:scale-110" src="/ncp.jpeg" alt="Clock" />
                    </span>
                  </td>
                  <td className="lg:p-3 sm:p-0 md:p-5 border-b border-gray-200 align-middle">
                    <button 
                      className="bg-gradient-to-r from-blue-900 to-blue-800 text-white border-none px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-full text-xs sm:text-sm md:text-base font-bold cursor-pointer whitespace-nowrap transition-all duration-300 hover:from-blue-800 hover:to-blue-700 hover:shadow-lg hover:scale-105 active:scale-95 shadow-md" 
                      onClick={handleVoteClick}
                    >
                      मत द्या
                    </button>
                  </td>
                </tr>
                {[3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <tr key={num} className="even:bg-gray-50/50 hover:bg-gray-100/50 transition-colors duration-200">
                    <td className="p-3 sm:p-4 md:p-5 border-b border-gray-200 text-gray-800 font-medium">{num}.</td>
                    <td className="p-3 sm:p-4 md:p-5 border-b border-gray-200"></td>
                    <td className="p-3 sm:p-4 md:p-5 border-b border-gray-200"></td>
                    <td className="p-3 sm:p-4 md:p-5 border-b border-gray-200">
                      <button className="bg-gray-200 text-gray-500 border-none px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-full text-[10px] sm:text-xs md:text-sm font-semibold cursor-not-allowed whitespace-nowrap transition-all duration-200 opacity-50">  </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-b from-white to-gray-50 p-4 sm:p-6 md:p-8 text-center border-t border-gray-200">
        <p className="text-gray-600 text-xs sm:text-sm md:text-base font-medium">Developed by <a href="https://saurabhsolanke.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">Saurabh Solanke</a></p>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[1000] p-4 sm:p-5 md:p-6 animate-fadeIn"
          onClick={handleCloseModal}
        >
          <div 
            className="bg-white rounded-2xl sm:rounded-3xl max-w-md w-full relative shadow-strong animate-slideUp border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 sm:top-5 sm:right-5 bg-gray-100 hover:bg-gray-200 border-none text-xl sm:text-2xl md:text-3xl text-gray-600 hover:text-gray-900 cursor-pointer w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 active:scale-95 p-0 leading-none z-10"
              onClick={handleCloseModal}
            >
              ×
            </button>
            <div className="p-6 sm:p-8 md:p-10 text-center">
              <div className="flex justify-center mb-4 sm:mb-6 animate-scaleIn">
                <div className="p-3 bg-blue-50 rounded-full">
                  <img className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain transition-transform duration-300 hover:scale-110" src="/ncp.jpeg" alt="Clock Symbol" />
                </div>
              </div>
              <h2 className="text-gray-900 text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 leading-tight tracking-tight">सौ. रेखा प्रल्हादराव सरोदे</h2>
              <div className="mb-4 sm:mb-6 space-y-2">
                <p className="text-gray-700 text-sm sm:text-base md:text-lg my-2 leading-relaxed font-medium">चिन्ह : घड्याळ</p>
                <p className="text-gray-700 text-sm sm:text-base md:text-lg my-2 leading-relaxed font-medium">अनुक्रमांक : 2</p>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent my-5 sm:my-6"></div>
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                <span className="bg-gradient-to-br from-green-500 to-green-600 text-white w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-base sm:text-lg md:text-xl font-bold flex-shrink-0 shadow-md animate-scaleIn">✓</span>
                <p className="text-gray-800 text-sm sm:text-base md:text-lg m-0 font-semibold">तुमचे मत नोंदवले गेले आहे.</p>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base m-0 mb-6 sm:mb-8 leading-relaxed">आपण सौ. रेखा प्रल्हादराव सरोदे यांना मत दिले आहे.</p>
              <button 
                className="bg-gradient-to-r from-whatsapp-green to-[#20ba5a] text-white border-none py-3 sm:py-3.5 md:py-4 px-6 sm:px-8 rounded-xl text-sm sm:text-base md:text-lg font-bold cursor-pointer w-full flex items-center justify-center gap-3 transition-all duration-300 hover:from-[#20ba5a] hover:to-[#1da851] hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] shadow-md"
                onClick={handleShare}
              >
                <span className="text-xl sm:text-2xl">💬</span>
                <span>शेअर करा</span>
              </button>
              <audio ref={beepAudioRef} src="/beep.mp3" preload="auto" className="hidden" />
              <audio ref={votingAudioRef} src="/voting.aac" preload="auto" className="hidden" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
