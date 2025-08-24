import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useParallax } from "@/hooks/use-mobile";
import { formDraftDB } from "@/lib/database";
import { supabase } from "@/integrations/supabase/client";

export interface FormData {
  name: string;
  registrationNumber: string;
  branch: string;
  department: string;
  emailId: string;
  phoneNumber: string;
  domain: "Technical" | "Management";
  subdomain: string;
  domainAnswers: Record<string, string>;
}

// Form steps configuration
const formSteps = [
  {
    id: "personal",
    title: "Personal Information",
    description: "Tell us about yourself",
    icon: "👤"
  },
  {
    id: "domain",
    title: "Domain Selection",
    description: "Choose your area of expertise",
    icon: "🎯"
  },
  {
    id: "questions",
    title: "Domain Questions",
    description: "Answer domain-specific questions",
    icon: "💭"
  },
  {
    id: "review",
    title: "Review & Submit",
    description: "Review your application",
    icon: "✅"
  }
];

const technicalSubdomains = [
  { value: "web-app-development", label: "Web & App Development", description: "Build modern web applications and mobile apps" },
  { value: "ai-ml", label: "AI/ML", description: "Artificial Intelligence and Machine Learning" }
];

const managementSubdomains = [
  { value: "content", label: "Content", description: "Create engaging content and media" },
  { value: "creatives", label: "Creatives", description: "Design and creative content creation" },
  { value: "events", label: "Events", description: "Organize and execute amazing events" },
  { value: "corporate", label: "Corporate", description: "Manage corporate partnerships and sponsorships" }
];

const domainQuestions = {
  "web-app-development": [
    "If you had all the resources, what problem would you solve with a web app or website? Briefly explain your idea",
    "Which tech stack do you prefer for web/app development, and what are your reasons for choosing it",
    "You are the Technical Co-Lead of IEEE-GRSS and are about to organize a hackathon. One of the key rounds (PPT evaluation) is judged by students, which raises concerns about bias and favoritism. Propose a web-based solution to ensure a fair and unbiased evaluation process. Briefly explain your idea, features, and the tech stack you'd use."
  ],
  "ai-ml": [
    "Assume you are building an object detection model, and you have low dataset size, and also assume increasing the dataset size is not a feasible option. As you may already know traditional object detection models perform very badly when dataset size is low, how will you go about solving this problem, such that the model performs well in low dataset size",
    `Suppose you have to build a simple language model from scratch with a very limited training set of 20 question-answer pairs.
Because the dataset is small, fine-tuning a typical LLM results in bad generalization. However, since the output space is well-contained and the questions are not very complicated, there is hope to build a lightweight model that acts robustly in this constrained domain.
With this background, how would you design and implement such a system with a small amount of code and few resources?`
  ],
  "content": [
    "Your friend asks you to write a social media post that makes 'doing laundry' sound exciting, but you can only use words that a 10-year-old would understand, and it has to be exactly 15 words. Go!",
    "You want to find out what your classmates really think about the campus food, but you can't use surveys, social media, or ask them directly. You have 2 days and zero budget. Describe your creative research method.",
    "Ur thought on what is content and research domain",
    "If your pen could talk, what story would it tell?"
  ],
  "creatives": [
    "What design tools are you proficient with?",
    "Share your portfolio or any creative work you've done.",
    "What type of creative content do you enjoy making most?"
  ],
  "events": [
    "Can you suggest a new event idea that would engage students from multiple departments?",
    "If we gave you a small budget and full creative freedom, what kind of event would you plan?",
    "How would you promote an event on a limited budget?",
    "Imagine you have to organize an event in 7 days. What would your step-by-step plan look like?",
    "Why do you want to join the events team, and what will you bring to the table?"
  ],
  "corporate": [
    "How would you handle a low budget allocation?",
    "How would you deal with multiple sponsors?",
    "If a sponsor backs out at the last moment, how would you handle the situation?",
    "How would you convince a deal when there is a lesser head count?",
    "If a collaborator offers a lower fund than expected, how will you respond?",
    "How would you get funds for a larger event?",
    "If an event is to be organised in a shorter span, how would you effectively plan for action?",
    "How would you explore fund sources apart from sponsorship?"
  ]
};

const CosmicParticleBackground = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number }>>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 20 + 10
      }));
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  return (
    <div className="cosmic-bg">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="cosmic-particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}s`
          }}
        />
      ))}
    </div>
  );
};

const CosmicAnimatedBackground = () => {
  const [elements, setElements] = useState<Array<{ id: number; x: number; y: number; type: string; delay: number }>>([]);

  useEffect(() => {
    const generateElements = () => {
      const newElements = [
        // Lines
        ...Array.from({ length: 8 }, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          type: 'line',
          delay: Math.random() * 6
        })),
        // Dots
        ...Array.from({ length: 12 }, (_, i) => ({
          id: i + 8,
          x: Math.random() * 100,
          y: Math.random() * 100,
          type: 'dot',
          delay: Math.random() * 4
        })),
        // Floating elements
        ...Array.from({ length: 5 }, (_, i) => ({
          id: i + 20,
          x: Math.random() * 100,
          y: Math.random() * 100,
          type: 'floating',
          delay: Math.random() * 8
        }))
      ];
      setElements(newElements);
    };

    generateElements();
  }, []);

  return (
    <div className="cosmic-animated-bg">
      {elements.map((element) => (
        <div
          key={element.id}
          className={
            element.type === 'line' ? 'cosmic-line' :
            element.type === 'dot' ? 'cosmic-dot' : 'cosmic-floating-element'
          }
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            animationDelay: `${element.delay}s`
          }}
        >
          {element.type === 'floating' && '✦'}
        </div>
      ))}
    </div>
  );
};

export default function RecruitmentForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const scrollY = useParallax();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
    control,
    getValues
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      domain: "Technical",
      subdomain: "",
      domainAnswers: {}
    }
  });

  const selectedDomain = watch("domain");
  const selectedSubdomain = watch("subdomain");

  // Load draft on component mount
  useEffect(() => {
    const savedDraft = formDraftDB.loadDraft(sessionId);
    if (savedDraft) {
      Object.entries(savedDraft).forEach(([key, value]) => {
        setValue(key as keyof FormData, value);
      });
    }
  }, [sessionId, setValue]);

  // Save draft whenever form data changes
  useEffect(() => {
    const subscription = watch((data) => {
      formDraftDB.saveDraft(sessionId, data);
    });
    return () => subscription.unsubscribe();
  }, [watch, sessionId]);

  const onSubmit = async (data: FormData) => {
    try {
      // Submit data to Supabase
      const { error } = await supabase
        .from('recruitment_applications')
        .insert({
          name: data.name,
          registration_number: data.registrationNumber,
          branch: data.branch,
          department: data.department,
          email_id: data.emailId,
          phone_number: data.phoneNumber,
          domain: data.domain,
          subdomain: data.subdomain,
          domain_answers: data.domainAnswers
          // created_at and updated_at are automatically managed by Supabase
        });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      // Delete draft after successful submission
      formDraftDB.deleteDraft(sessionId);
      
      toast({
        title: "Application Submitted!",
        description: "Thank you for your application. We'll get back to you soon!",
      });
      
      // Reset form and go back to first step
      setCurrentStep(0);
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const nextStep = () => {
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    const values = getValues();
    
    switch (currentStep) {
      case 0: // Personal Information
        return values.name && values.registrationNumber && values.branch && values.department;
      case 1: // Domain Selection
        return values.domain && values.subdomain;
      case 2: // Domain Questions
        { if (!values.subdomain || !values.domainAnswers) return false;
        // Only check questions for the selected subdomain
        const questions = domainQuestions[values.subdomain as keyof typeof domainQuestions] || [];
        const isValid = questions.every((_, index) => values.domainAnswers[index] && values.domainAnswers[index].trim().length > 0);
        
        // Debug logging
        if (currentStep === 2) {
          console.log('Validation Debug:', {
            subdomain: values.subdomain,
            questions: questions,
            answers: values.domainAnswers,
            isValid: isValid
          });
        }
        
        return isValid; }
      case 3: // Review
        return true;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6 md:space-y-10">
            <div className="text-center mb-8 md:mb-12">
              <div className="text-4xl md:text-6xl mb-4">👤</div>
              <h2 className="text-2xl md:text-4xl font-bold text-blue-100 mb-4">
                Personal Information
              </h2>
              <p className="text-lg md:text-xl text-blue-200/80">
                Tell us about yourself to get started
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
              {[
                { id: "name", label: "Full Name", placeholder: "Enter your full name", icon: "👤" },
                {
                  id: "registrationNumber",
                  label: "Registration Number",
                  placeholder: "Enter your registration number",
                  icon: "🆔"
                },
                {
                  id: "branch",
                  label: "Branch",
                  placeholder: "e.g., Computer Science, Electronics",
                  icon: "🎓"
                },
                {
                  id: "department",
                  label: "Department",
                  placeholder: "Enter your department",
                  icon: "🏢"
                },
                {
                  id: "emailId",
                  label: "Email ID",
                  placeholder: "Enter your email address",
                  icon: "📧"
                },
                {
                  id: "phoneNumber",
                  label: "Phone Number",
                  placeholder: "Enter your phone number",
                  icon: "📞"
                }
              ].map(({ id, label, placeholder, icon }) => (
                <div key={id} className="cosmic-fade-in group">
                  <div className="flex items-center gap-3 mb-3 md:mb-4">
                    <div className="text-xl md:text-2xl">{icon}</div>
                    <Label htmlFor={id} className="text-blue-100 font-semibold text-base md:text-lg">
                      {label}
                    </Label>
                  </div>
                  <Input
                    id={id}
                    {...register(id as keyof FormData, { required: `${label} is required` })}
                    placeholder={placeholder}
                    className="premium-glass-input text-blue-100 placeholder:text-blue-300/50 h-12 md:h-16 rounded-xl md:rounded-2xl text-base md:text-lg border-2 group-hover:border-blue-400/50 transition-all duration-300"
                  />
                  {errors[id as keyof FormData] && (
                    <p className="text-sm text-red-400 mt-2 md:mt-3 flex items-center gap-2">
                      <span className="text-red-400">⚠️</span>
                      {errors[id as keyof FormData]?.message as string}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6 md:space-y-10 cosmic-fade-in">
            <div className="text-center mb-8 md:mb-12">
              <div className="text-4xl md:text-6xl mb-4">🎯</div>
              <h2 className="text-2xl md:text-4xl font-bold text-blue-100 mb-4">
                Domain Selection
              </h2>
              <p className="text-lg md:text-xl text-blue-200/80">
                Choose your area of expertise
              </p>
            </div>
            
            <div className="space-y-6 md:space-y-8">
              <div>
                <Label className="text-blue-100 font-semibold mb-4 md:mb-6 block text-lg md:text-xl">
                  Choose Your Domain
                </Label>
                <RadioGroup
                  value={selectedDomain}
                  onValueChange={(value) => {
                    setValue("domain", value as "Technical" | "Management");
                    setValue("subdomain", "");
                  }}
                  className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6"
                >
                  {[
                    { value: "Technical", description: "Build the future with cutting-edge technology", icon: "⚡" },
                    { value: "Management", description: "Lead and organize amazing events and projects", icon: "🎪" }
                  ].map((d) => (
                    <div key={d.value} className="relative group">
                      <input
                        type="radio"
                        id={d.value}
                        value={d.value}
                        checked={selectedDomain === d.value}
                        onChange={(e) => setValue("domain", e.target.value as "Technical" | "Management")}
                        className="hidden"
                      />
                      <label
                        htmlFor={d.value}
                        className={`block p-4 md:p-8 rounded-2xl md:rounded-3xl cursor-pointer transition-all duration-500 group-hover:scale-105 ${
                          selectedDomain === d.value
                            ? "premium-glass selected"
                            : "premium-glass hover:bg-blue-500/5"
                        }`}
                      >
                        <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                          <div className="text-2xl md:text-4xl">{d.icon}</div>
                          <div className="text-xl md:text-3xl font-bold text-blue-100">
                            {d.value}
                          </div>
                        </div>
                        <div className="text-blue-200/80 text-sm md:text-lg">
                          {d.description}
                        </div>
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {selectedDomain && (
                <div className="space-y-4 md:space-y-6">
                  <Label className="text-blue-100 font-semibold block text-lg md:text-xl">
                    Select Your Specialization
                  </Label>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
                    {(selectedDomain === "Technical" ? technicalSubdomains : managementSubdomains).map((subdomain) => (
                      <div key={subdomain.value} className="relative group">
                        <input
                          type="radio"
                          id={subdomain.value}
                          value={subdomain.value}
                          checked={selectedSubdomain === subdomain.value}
                          onChange={(e) => setValue("subdomain", e.target.value)}
                          className="hidden"
                        />
                        <label
                          htmlFor={subdomain.value}
                          className={`block p-4 md:p-6 rounded-xl md:rounded-2xl cursor-pointer transition-all duration-300 group-hover:scale-105 ${
                            selectedSubdomain === subdomain.value
                              ? "premium-glass selected"
                              : "premium-glass hover:bg-blue-500/5"
                          }`}
                        >
                          <div className="text-base md:text-xl font-semibold text-blue-100 mb-1 md:mb-2">
                            {subdomain.label}
                          </div>
                          <div className="text-blue-200/70 text-xs md:text-sm">
                            {subdomain.description}
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 2:
        { const questions = selectedSubdomain ? domainQuestions[selectedSubdomain as keyof typeof domainQuestions] || [] : [];
        return (
          <div className="space-y-6 md:space-y-10 cosmic-fade-in">
            <div className="text-center mb-8 md:mb-12">
              <div className="text-4xl md:text-6xl mb-4">💭</div>
              <h2 className="text-2xl md:text-4xl font-bold text-blue-100 mb-4">
                Domain Questions
              </h2>
              <p className="text-lg md:text-xl text-blue-200/80">
                Share your expertise and experience
              </p>
            </div>
            
            <div className="space-y-6 md:space-y-10">
              {questions.map((question, index) => (
                <div key={index} className="space-y-4 md:space-y-6 group">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="flex-shrink-0 w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center text-base md:text-xl font-bold text-blue-100 border border-blue-400/30">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <Label className="text-blue-100 font-semibold block text-lg md:text-xl mb-3 md:mb-4">
                        {question}
                      </Label>
                      <Textarea
                        {...register(`domainAnswers.${index}` as any, { 
                          required: "This question is required" 
                        })}
                        placeholder="Share your detailed response..."
                        className="premium-glass-input text-blue-100 placeholder:text-blue-300/50 min-h-32 md:min-h-40 rounded-xl md:rounded-2xl text-base md:text-lg resize-none border-2 group-hover:border-blue-400/50 transition-all duration-300"
                      />
                      {errors.domainAnswers?.[index as any] && (
                        <p className="text-sm text-red-400 mt-2 md:mt-3">
                          {errors.domainAnswers[index as any]?.message as string}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ); }

      case 3:
        { const values = getValues();
        return (
          <div className="space-y-6 md:space-y-10 cosmic-fade-in">
            <div className="text-center mb-8 md:mb-12">
              <div className="text-4xl md:text-6xl mb-4">✅</div>
              <h2 className="text-2xl md:text-4xl font-bold text-blue-100 mb-4">
                Review Your Application
              </h2>
              <p className="text-lg md:text-xl text-blue-200/80">
                Double-check everything before submitting
              </p>
            </div>
            
            <div className="space-y-6 md:space-y-8">
              <div className="premium-glass p-4 md:p-8 rounded-2xl md:rounded-3xl border border-blue-400/20">
                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                  <div className="text-2xl md:text-3xl">👤</div>
                  <h3 className="text-xl md:text-2xl font-bold text-blue-100">Personal Information</h3>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 text-blue-200">
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                    <span className="font-semibold text-sm md:text-base">Name:</span>
                    <span className="text-blue-100 text-sm md:text-base">{values.name}</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                    <span className="font-semibold text-sm md:text-base">Registration Number:</span>
                    <span className="text-blue-100 text-sm md:text-base">{values.registrationNumber}</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                    <span className="font-semibold text-sm md:text-base">Branch:</span>
                    <span className="text-blue-100 text-sm md:text-base">{values.branch}</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                    <span className="font-semibold text-sm md:text-base">Department:</span>
                    <span className="text-blue-100 text-sm md:text-base">{values.department}</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                    <span className="font-semibold text-sm md:text-base">Email ID:</span>
                    <span className="text-blue-100 text-sm md:text-base">{values.emailId}</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                    <span className="font-semibold text-sm md:text-base">Phone Number:</span>
                    <span className="text-blue-100 text-sm md:text-base">{values.phoneNumber}</span>
                  </div>
                </div>
              </div>

              <div className="premium-glass p-4 md:p-8 rounded-2xl md:rounded-3xl border border-blue-400/20">
                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                  <div className="text-2xl md:text-3xl">🎯</div>
                  <h3 className="text-xl md:text-2xl font-bold text-blue-100">Domain Selection</h3>
                </div>
                <div className="space-y-3 md:space-y-4 text-blue-200">
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                    <span className="font-semibold text-sm md:text-base">Domain:</span>
                    <span className="text-blue-100 text-sm md:text-base">{values.domain}</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                    <span className="font-semibold text-sm md:text-base">Specialization:</span>
                    <span className="text-blue-100 text-sm md:text-base">{values.subdomain}</span>
                  </div>
                </div>
              </div>

              {values.domainAnswers && Object.keys(values.domainAnswers).length > 0 && (
                <div className="premium-glass p-4 md:p-8 rounded-2xl md:rounded-3xl border border-blue-400/20">
                  <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                    <div className="text-2xl md:text-3xl">💭</div>
                    <h3 className="text-xl md:text-2xl font-bold text-blue-100">Your Answers</h3>
                  </div>
                  <div className="space-y-4 md:space-y-6">
                    {(() => {
                      const questions = domainQuestions[values.subdomain as keyof typeof domainQuestions] || [];
                      return questions.map((question, index) => (
                        <div key={index} className="space-y-2 md:space-y-3">
                          <div className="flex items-start gap-2 md:gap-3">
                            <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center text-xs md:text-sm font-bold text-blue-100 border border-blue-400/30">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-blue-100 text-sm md:text-base mb-1 md:mb-2">{question}</div>
                              <div className="text-blue-300/80 bg-blue-500/10 p-3 md:p-4 rounded-lg md:rounded-xl border border-blue-400/20 text-sm md:text-base">
                                {values.domainAnswers[index] || 'No answer provided'}
                              </div>
                            </div>
                          </div>
                        </div>
                      ));
                    })()}
                  </div>
                </div>
              )}
            </div>
          </div>
        ); }

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <CosmicParticleBackground />
      <CosmicAnimatedBackground />
      
      {/* Hero Section */}
      <div 
        className="relative z-10 text-center py-12 md:py-24 px-4 scroll-parallax"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-4xl text-blue-200/80 font-light tracking-wider mb-4 md:mb-6">
              Recruiting Soon...
            </h2>
          </div>
          
          <h1 className="text-4xl md:text-[12rem] font-black mb-8 md:mb-12 million-dollar-title bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-clip-text text-transparent leading-tight">
            IEEE GRSS Recruitment 2025
          </h1>
          
          <p className="text-xl md:text-4xl text-blue-100/90 font-light tracking-wide mb-12 md:mb-16 max-w-5xl mx-auto">
            Join the next generation of explorers. Enlist for deep space missions.
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 mb-8 md:mb-12">
        <div className="premium-glass rounded-2xl md:rounded-3xl p-4 md:p-8 border border-blue-400/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 gap-4 md:gap-0">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="text-2xl md:text-3xl">{formSteps[currentStep].icon}</div>
              <div>
                <h2 className="text-xl md:text-3xl font-bold text-blue-100">
                  {formSteps[currentStep].title}
                </h2>
                <p className="text-blue-200/80 text-base md:text-lg">
                  {formSteps[currentStep].description}
                </p>
              </div>
            </div>
            <div className="text-blue-200 text-lg md:text-xl font-semibold self-end md:self-auto">
              Step {currentStep + 1} of {formSteps.length}
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {formSteps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500 ${
                  index <= currentStep 
                    ? 'border-blue-400 bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30' 
                    : 'border-blue-400/30 text-blue-400/30'
                }`}>
                  {index + 1}
                </div>
                {index < formSteps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 transition-all duration-500 rounded-full ${
                    index < currentStep ? 'bg-gradient-to-r from-blue-400 to-cyan-400' : 'bg-blue-400/30'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          {/* Mobile progress indicator */}
          <div className="md:hidden flex justify-center mt-4">
            <div className="flex space-x-2">
              {formSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-500 ${
                    index === currentStep
                      ? 'bg-blue-400 scale-125'
                      : index < currentStep
                      ? 'bg-blue-400/70'
                      : 'bg-blue-400/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Form Container */}
      <div 
        className="relative z-10 max-w-5xl mx-auto px-4 mb-12 md:mb-16 scroll-parallax"
        style={{
          transform: `translateY(${scrollY * 0.05}px)`,
        }}
      >
        <div className="premium-glass rounded-2xl md:rounded-3xl p-6 md:p-12 lg:p-20 shadow-2xl border border-blue-400/20">
          {renderStepContent()}
          
          {/* Navigation Buttons */}
          <div className="flex flex-col-reverse md:flex-row justify-between items-center mt-12 md:mt-16 pt-6 md:pt-8 border-t border-blue-400/20 gap-4 md:gap-0">
            <Button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="million-dollar-btn w-full md:w-auto px-6 py-3 md:px-10 md:py-4 text-base md:text-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </Button>
            
            {currentStep < formSteps.length - 1 ? (
              <Button
                type="button"
                onClick={nextStep}
                disabled={!isStepValid()}
                className="million-dollar-btn w-full md:w-auto px-6 py-3 md:px-10 md:py-4 text-base md:text-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next →
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={!isStepValid()}
                className="million-dollar-btn w-full md:w-auto px-6 py-3 md:px-12 md:py-4 text-base md:text-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                🚀 Submit Application
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}