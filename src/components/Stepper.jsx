import React, { useState } from 'react';
import '../Styles/Stepper.css';

export const Step = ({ children }) => {
  return <div className="step-content">{children}</div>;
};

const Stepper = ({ 
  children, 
  initialStep = 0, 
  onStepChange, 
  onFinalStepCompleted,
  backButtonText = "Previous",
  nextButtonText = "Next"
}) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const steps = React.Children.toArray(children);

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      onStepChange && onStepChange(nextStep);
    } else {
      onFinalStepCompleted && onFinalStepCompleted();
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      onStepChange && onStepChange(prevStep);
    }
  };

  return (
    <div className="stepper-container">
      <div className="stepper-header">
        {steps.map((_, index) => (
          <React.Fragment key={index}>
            <div className={`stepper-step ${index <= currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}>
              <div className="step-number">{index + 1}</div>
            </div>
            {index < steps.length - 1 && (
              <div className={`stepper-line ${index < currentStep ? 'completed' : ''}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="stepper-body">
        {steps[currentStep]}
      </div>

      <div className="stepper-footer">
        <button 
          className="stepper-button back"
          onClick={goToPreviousStep}
          disabled={currentStep === 0}
        >
          {backButtonText}
        </button>
        <button 
          className="stepper-button next"
          onClick={goToNextStep}
        >
          {currentStep === steps.length - 1 ? "Finish" : nextButtonText}
        </button>
      </div>
    </div>
  );
};

export default Stepper;