import { Vote, ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="text-center pt-8 pb-6 flex flex-col items-center gap-6">
      {/* Indian tri-color accent bar */}
      <div className="flex w-40 h-1.5 rounded-full overflow-hidden mb-1">
        <span className="flex-1 bg-saffron-500" />
        <span className="flex-1 bg-white border-y border-slate-200" />
        <span className="flex-1 bg-india-green" />
      </div>

      <div className="inline-flex items-center gap-2 bg-saffron-50 border border-saffron-200 text-saffron-700 px-4 py-2 rounded-full font-semibold text-sm">
        🗳️ <span><span lang="hi">भारत का चुनाव मार्गदर्शक</span> · India's Election Guide</span>
      </div>

      <h1 className="text-5xl lg:text-6xl font-extrabold max-w-4xl tracking-tight leading-tight">
        <span className="text-slate-900">Understand India's </span>
        <span className="text-saffron-500">Democracy</span>
        <br />
        <span className="text-india-navy">with Clarity</span>
      </h1>

      <p className="text-xl text-slate-600 max-w-2xl mt-2 leading-relaxed">
        Your interactive guide to India's democratic election process — from Voter ID registration to Oath-taking. Powered by AI, built for every Indian citizen.
      </p>

      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <button
          onClick={() => document.getElementById('timeline').scrollIntoView({ behavior: 'smooth' })}
          className="bg-india-navy text-white px-8 py-4 text-lg rounded-lg font-semibold shadow-md hover:bg-blue-900 hover:shadow-lg transition-all flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Explore Timeline <ArrowRight size={20} aria-hidden="true" />
        </button>
        <button
          onClick={() => document.getElementById('quiz').scrollIntoView({ behavior: 'smooth' })}
          className="bg-white text-india-navy border-2 border-blue-200 px-8 py-4 text-lg rounded-lg font-semibold shadow-sm hover:border-india-navy hover:bg-blue-50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Take the Quiz 📝
        </button>
      </div>

      {/* Stat badges */}
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {[
          { label: 'Registered Voters', value: '96.8 Crore' },
          { label: 'Lok Sabha Seats', value: '543' },
          { label: 'Polling Booths', value: '10.5 Lakh+' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-slate-200 rounded-xl px-5 py-3 shadow-sm text-center">
            <p className="text-2xl font-extrabold text-saffron-500">{stat.value}</p>
            <p className="text-xs text-slate-500 font-medium mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
