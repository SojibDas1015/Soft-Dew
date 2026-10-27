import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, RotateCcw, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatPrice } from '../../utils/formatters';

export const BeautyQuizModal = () => {
  const { isQuizOpen, setIsQuizOpen, products, addToCart, currency, showToast } = useStore();

  const [step, setStep] = useState(1);
  const [skinType, setSkinType] = useState('dry'); // 'dry' | 'oily' | 'sensitive' | 'hair'
  const [targetGoal, setTargetGoal] = useState('glass-skin'); // 'glass-skin' | 'acne-calm' | 'anti-aging' | 'salon-keratin'
  const [routineComplexity, setRoutineComplexity] = useState('full'); // 'minimal' | 'full'

  if (!isQuizOpen) return null;

  // Filter recommendations based on quiz choices
  const getMatchedProducts = () => {
    if (skinType === 'hair' || targetGoal === 'salon-keratin') {
      return products.filter((p) => p.category === 'haircare' || p.category === 'salon-tools').slice(0, 3);
    }
    if (skinType === 'oily' || targetGoal === 'acne-calm') {
      return products.filter((p) => p.category === 'skincare' && (p.name.includes('Centella') || p.name.includes('Cica') || p.skinType.includes('Acne-prone'))).slice(0, 3);
    }
    // Default dewy glowing glass skin
    return products.filter((p) => p.category === 'skincare' || p.category === 'makeup').slice(0, 3);
  };

  const matched = getMatchedProducts();
  const bundleSubtotal = matched.reduce((sum, item) => sum + (item.discountPrice || item.price), 0);
  const bundleDiscount = Math.round(bundleSubtotal * 0.1); // 10% routine bundle discount
  const bundleTotal = bundleSubtotal - bundleDiscount;

  const handleAddRoutineToCart = () => {
    matched.forEach((prod) => {
      addToCart(prod, 1);
    });
    setIsQuizOpen(false);
    showToast('✨ Entire personalized routine added to your bag with 10% Bundle Discount!', 'success');
  };

  const resetQuiz = () => {
    setStep(1);
    setSkinType('dry');
    setTargetGoal('glass-skin');
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsQuizOpen(false)}>
      <div 
        className="modal-container quiz-modal animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={() => setIsQuizOpen(false)} 
          className="modal-close-btn"
          aria-label="Close Quiz"
        >
          <X size={20} />
        </button>

        {/* Quiz Header */}
        <div className="quiz-header">
          <div className="quiz-icon-badge">
            <Sparkles size={22} className="text-amber-500" />
          </div>
          <h2 className="quiz-title serif">Soft-Dew Beauty Diagnostic</h2>
          <p className="quiz-subtitle">
            Find your custom clinical routine formulated for your unique skin & hair profile
          </p>

          {/* Progress dots */}
          <div className="quiz-progress-dots">
            <div className={`quiz-dot ${step >= 1 ? 'active' : ''}`}>1</div>
            <div className="quiz-line"></div>
            <div className={`quiz-dot ${step >= 2 ? 'active' : ''}`}>2</div>
            <div className="quiz-line"></div>
            <div className={`quiz-dot ${step >= 3 ? 'active' : ''}`}>3</div>
          </div>
        </div>

        {/* Step 1: Skin or Hair Type */}
        {step === 1 && (
          <div className="quiz-step-content animate-fade-in">
            <h3 className="step-heading">Step 1: What is your primary focus or skin condition?</h3>
            <div className="quiz-options-grid">
              {[
                { id: 'dry', label: 'Dry, Dull & Dehydrated', desc: 'Flaky patches, tight feeling, lack of healthy dew' },
                { id: 'oily', label: 'Oily & Acne-Prone', desc: 'Excess sebum, visible pores, frequent breakouts' },
                { id: 'sensitive', label: 'Sensitive & Compromised Barrier', desc: 'Easily reddened, burning after harsh products' },
                { id: 'hair', label: 'Frizzy / Damaged Salon Hair', desc: 'Split ends, bleached or chemically straightened tresses' }
              ].map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => setSkinType(opt.id)}
                  className={`quiz-card-option ${skinType === opt.id ? 'selected' : ''}`}
                >
                  <div className="opt-check">
                    {skinType === opt.id ? <Check size={16} /> : null}
                  </div>
                  <h4 className="opt-label">{opt.label}</h4>
                  <p className="opt-desc">{opt.desc}</p>
                </div>
              ))}
            </div>

            <div className="quiz-footer-actions">
              <button 
                onClick={() => setStep(2)}
                className="btn btn-primary"
              >
                <span>Continue to Goals</span>
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Target Goal */}
        {step === 2 && (
          <div className="quiz-step-content animate-fade-in">
            <h3 className="step-heading">Step 2: What is your dream transformation result?</h3>
            <div className="quiz-options-grid">
              {[
                { id: 'glass-skin', label: '72H Korean Glass Skin Dew', desc: 'Translucent, plumped, hydrated natural glow' },
                { id: 'anti-aging', label: 'Firming & Peptide Collagen Lift', desc: 'Smooth fine lines, tighten facial contours' },
                { id: 'acne-calm', label: 'Purified & Soothed Cica Calm', desc: 'Pore shrinking, reduce redness, clear acne' },
                { id: 'salon-keratin', label: 'Mirror-Shine Salon Keratin', desc: 'Zero frizz, silky texture, heat protection' }
              ].map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => setTargetGoal(opt.id)}
                  className={`quiz-card-option ${targetGoal === opt.id ? 'selected' : ''}`}
                >
                  <div className="opt-check">
                    {targetGoal === opt.id ? <Check size={16} /> : null}
                  </div>
                  <h4 className="opt-label">{opt.label}</h4>
                  <p className="opt-desc">{opt.desc}</p>
                </div>
              ))}
            </div>

            <div className="quiz-footer-actions">
              <button onClick={() => setStep(1)} className="btn btn-outline">Back</button>
              <button onClick={() => setStep(3)} className="btn btn-primary">
                <span>See My Prescription</span>
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Diagnostic Results & Bundle Recommendation */}
        {step === 3 && (
          <div className="quiz-step-content animate-fade-in">
            <div className="prescription-banner glass-panel">
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck size={18} className="text-emerald" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald">
                  Tailored Aesthetic Prescription
                </span>
              </div>
              <h3 className="serif text-xl font-bold">
                {skinType === 'hair' ? 'Salon Botox & Keratin Rejuvenation Routine' : 'Ultra-Hydrating Glass Dew Barrier Protocol'}
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Clinically matched to optimize moisture levels and seal active nutrients without clogging pores.
              </p>
            </div>

            {/* Matched Products List */}
            <div className="matched-products-list">
              {matched.map((item, idx) => (
                <div key={item.id} className="matched-item-row">
                  <div className="matched-step-badge">Step {idx + 1}</div>
                  <img src={item.image} alt={item.name} className="matched-thumb" />
                  <div className="matched-info">
                    <span className="matched-brand">{item.brand}</span>
                    <h5 className="matched-name">{item.name}</h5>
                    <span className="matched-price">
                      {formatPrice(item.discountPrice || item.price, currency)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bundle Savings Box */}
            <div className="routine-bundle-box">
              <div className="bundle-price-details">
                <span className="text-xs text-slate-500">Curated 3-Piece Routine Total:</span>
                <div className="flex items-baseline gap-2">
                  <span className="line-through text-slate-400 text-sm">
                    {formatPrice(bundleSubtotal, currency)}
                  </span>
                  <span className="text-lg font-bold text-rose-600">
                    {formatPrice(bundleTotal, currency)}
                  </span>
                </div>
                <span className="text-xs font-semibold text-emerald">
                  Includes 10% Routine Bundle Discount (-{formatPrice(bundleDiscount, currency)})
                </span>
              </div>

              <div className="bundle-actions">
                <button 
                  onClick={resetQuiz} 
                  className="btn btn-outline btn-sm"
                  title="Retake diagnostic"
                >
                  <RotateCcw size={15} />
                  <span>Retake</span>
                </button>

                <button
                  onClick={handleAddRoutineToCart}
                  className="btn btn-primary"
                >
                  <ShoppingBag size={17} />
                  <span>Add Entire Routine to Bag</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
