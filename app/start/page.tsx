"use client";
import PartsSelector from "@/components/parts-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Lottie from "lottie-react";
import {
  ArrowRight,
  Check,
  CornerDownLeft,
  HeartPulse,
  RotateCcw,
  Wand,
  Wand2,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaMale, FaFemale } from "react-icons/fa";

type HealthCondition = string;

type HomeRemedy = [
  string, // Remedy title
  string // Remedy description
];

type HealthConditionsList = HealthCondition[];

type HomeRemediesList = HomeRemedy[];

type HealthData = [HealthConditionsList, HomeRemediesList];

const defaultParts = [
  "Blood sugar regulation system (Internal)",
  "Breast tissue (Internal)",
  "Colon (Internal)",
  "Ear (External)",
  "Esophagus (Internal)",
  "Rectum (Internal)",
  "Testicles (Internal)",
  "Bladder (Internal)",
  "Blood (Internal)",
  "Blood vessels (Internal)",
  "Bone marrow (Internal)",
  "Bones (Internal)",
  "Chromosomes (Internal)",
  "Connective tissues (Internal)",
  "Gallbladder (Internal)",
  "Immune system (Internal)",
  "Joints (Internal)",
  "Middle ear (Internal)",
  "Nose (External)",
  "Ovaries (Internal)",
  "Prostate (Internal)",
  "Salivary glands (Internal)",
  "Sinuses (Internal)",
  "Throat (Internal)",
  "Thyroid (Internal)",
  "Tonsils (Internal)",
  "reproductive system (Internal)",
  "Pancreas (Internal)",
  "Respiratory system (Internal)",
  "Liver (Internal)",
  "Kidneys (Internal)",
  "Muscles (Internal)",
  "Spine (Internal)",
  "Urinary system (Internal)",
  "Heart (Internal)",
  "Digestive system (Internal)",
  "Eyes (External)",
  "Skin (External)",
  "Nervous system (Internal)",
  "Reproductive system (Internal)",
  "Brain (Internal)",
  "Lungs (Internal)",
];

export default function Welcome() {
  const [age, setAge] = useState<string | undefined>(undefined);
  const [gender, setGender] = useState<string | undefined>(undefined);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [bp, setBp] = useState<string | undefined>("normal");
  const [cholesterol, setCholesterol] = useState<string | undefined>("normal");
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const [flow, setFlow] = useState<number>(0);
  const [predicting, setPredicting] = useState<boolean>(false);
  const [result, setResult] = useState<HealthData | undefined>(undefined);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      setFlow((flow) => {
        if (flow < 4) {
          return flow + 1;
        }
        if (flow == 4) {
          preditDisesase();
          return flow + 1;
        }
        setAge(undefined);
        setGender(undefined);
        setSymptoms([]);
        setBp("normal");
        setCholesterol("normal");
        setSelectedParts([]);
        setPredicting(false);
        setResult(undefined);
        return 0;
      });
    }
  };

  const preditDisesase = () => {
    let data: { [key: string]: string } = {
      Fever: symptoms.includes("Fever") ? "Yes" : "No",
      Cough: symptoms.includes("Cough") ? "Yes" : "No",
      Fatigue: symptoms.includes("Fatigue") ? "Yes" : "No",
      "Difficulty Breathing": symptoms.includes("Difficulty Breathing")
        ? "Yes"
        : "No",
      Age: age?.toString() || "0",
      Gender: gender || "Male",
      "Blood Pressure": bp ? bp[0].toUpperCase() + bp.slice(1) : "Normal",
      "Cholesterol Level": cholesterol
        ? cholesterol[0].toUpperCase() + cholesterol.slice(1)
        : "Normal",
    };
    const partsData = defaultParts.reduce(
      (acc: { [key: string]: string }, part) => {
        acc[part] = "No";
        return acc;
      },
      {}
    );

    for (let key in partsData) {
      if (selectedParts.includes(key.toLowerCase())) {
        partsData[key] = "Yes";
      }
    }

    data = { ...data, ...partsData };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    setPredicting(true);
    fetch("https://t4kvk44l-8000.inc1.devtunnels.ms/predict", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setPredicting(false);
        setResult(data);
      });
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const ageSection = (
    <div className="flex flex-col">
      <div className="flex gap-2">
        <p className="flex items-center gap-1">
          1 <ArrowRight className="w-3 h-3 text-blu" strokeWidth={4} />
        </p>
        <h1 className="text-2xl font-normal text-blu">
          Let&apos;s start with your{" "}
          <span className="font-semibold">age.*</span>
        </h1>
      </div>
      <p className="text-base text-dark-gray mt-1">
        *We use your age to determine the likelihood of certain diseases.
      </p>
      <div className="mt-5">
        <Input
          type="number"
          className="text-lg px-4 py-6"
          placeholder="Type your age here..."
          min={1}
          value={age || ""}
          onChange={(e) => setAge(e.target.value)}
          // onKeyDown={(e) => e.key === "Enter" && setFlow(1)}
        />
        <div className="flex gap-4 items-center mt-6">
          <Button className="flex gap-2 shadow-sm" onClick={() => setFlow(1)}>
            Continue <Check size={16} strokeWidth={3} />
          </Button>
          <p className="flex text-sm">
            press&nbsp;
            <span className="font-semibold items-center flex gap-1">
              Enter <CornerDownLeft size={15} />
            </span>
          </p>
        </div>
      </div>
    </div>
  );

  const genderSection = (
    <div className="flex flex-col">
      <div className="flex gap-2">
        <p className="flex items-center gap-1">
          2 <ArrowRight className="w-3 h-3 text-blu" strokeWidth={4} />
        </p>
        <h1 className="text-2xl font-normal text-blu">
          What is your <span className="font-semibold">gender?*</span>
        </h1>
      </div>
      <p className="text-base text-dark-gray mt-1">
        *We use your gender to determine the likelihood of certain diseases.
      </p>
      <div className="mt-6">
        <Tabs
          defaultValue="Male"
          onValueChange={(value) => setGender(value)}
          value={gender}
        >
          <TabsList className="flex justify-between gap-4 bg-transparent px-0 text-primary">
            <TabsTrigger
              value="Male"
              className='flex w-full items-center justify-center gap-2 rounded-md border px-3 py-4  data-[state="active"]:border-primary'
              // onKeyDown={(e) => e.key === "Enter" && setFlow(2)}
            >
              <FaMale size={20} />
              Male
            </TabsTrigger>
            <TabsTrigger
              value="Female"
              className='flex w-full items-center justify-center gap-2 rounded-md border px-3 py-4 data-[state="active"]:border-primary'
              // onKeyDown={(e) => e.key === "Enter" && setFlow(2)}
            >
              <FaFemale size={20} />
              Female
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex gap-4 items-center mt-7">
          <Button className="flex gap-2 shadow-sm" onClick={() => setFlow(2)}>
            Continue <Check size={16} strokeWidth={3} />
          </Button>
          <p className="flex text-sm">
            press&nbsp;
            <span className="font-semibold items-center flex gap-1">
              Enter <CornerDownLeft size={15} />
            </span>
          </p>
        </div>
      </div>
    </div>
  );

  const commonSymptoms = (
    <div className="flex flex-col">
      <div className="flex gap-2">
        <p className="flex items-center gap-1">
          3 <ArrowRight className="w-3 h-3 text-blu" strokeWidth={4} />
        </p>
        <h1 className="text-2xl font-normal text-blu">
          Are you having any of these{" "}
          <span className="font-semibold">common symptoms?</span>
        </h1>
      </div>
      <p className="text-base text-dark-gray mt-1">
        You can select multiple symptoms or skip this step.
      </p>
      <div className="mt-6">
        <div className="grid grid-cols-2 gap-2">
          <div
            className={cn(
              "border rounded-md text-center py-3 cursor-pointer shadow-sm hover:scale-[1.01] transition-all duration-150 select-none",
              symptoms.includes("Fever") && "bg-light-gray"
            )}
            onClick={() => {
              if (symptoms.includes("Fever")) {
                setSymptoms(symptoms.filter((s) => s !== "Fever"));
              } else {
                setSymptoms([...symptoms, "Fever"]);
              }
            }}
            // onKeyDown={(e) => e.key === "Enter" && setFlow(3)}
          >
            Fever
          </div>
          <div
            className={cn(
              "border rounded-md text-center py-3 cursor-pointer shadow-sm hover:scale-[1.01] transition-all duration-150 select-none",
              symptoms.includes("Cough") && "bg-light-gray"
            )}
            onClick={() => {
              if (symptoms.includes("Cough")) {
                setSymptoms(symptoms.filter((s) => s !== "Cough"));
              } else {
                setSymptoms([...symptoms, "Cough"]);
              }
            }}
          >
            Cough
          </div>
          <div
            className={cn(
              "border rounded-md text-center py-3 cursor-pointer shadow-sm hover:scale-[1.01] transition-all duration-150 select-none",
              symptoms.includes("Fatigue") && "bg-light-gray"
            )}
            onClick={() => {
              if (symptoms.includes("Fatigue")) {
                setSymptoms(symptoms.filter((s) => s !== "Fatigue"));
              } else {
                setSymptoms([...symptoms, "Fatigue"]);
              }
            }}
          >
            Fatigue
          </div>
          <div
            className={cn(
              "border rounded-md text-center py-3 cursor-pointer shadow-sm hover:scale-[1.01] transition-all duration-150 select-none",
              symptoms.includes("Difficulty Breathing") && "bg-light-gray"
            )}
            onClick={() => {
              if (symptoms.includes("Difficulty Breathing")) {
                setSymptoms(
                  symptoms.filter((s) => s !== "Difficulty Breathing")
                );
              } else {
                setSymptoms([...symptoms, "Difficulty Breathing"]);
              }
            }}
          >
            Difficulty Breathing
          </div>
        </div>
        <div className="flex gap-4 items-center mt-7">
          <Button className="flex gap-2 shadow-sm" onClick={() => setFlow(3)}>
            Continue <Check size={16} strokeWidth={3} />
          </Button>
          <p className="flex text-sm">
            press&nbsp;
            <span className="font-semibold items-center flex gap-1">
              Enter <CornerDownLeft size={15} />
            </span>
          </p>
        </div>
      </div>
    </div>
  );

  const bpCholesterolSection = (
    <div className="flex flex-col">
      <div className="flex gap-2">
        <p className="flex items-center gap-1">
          4 <ArrowRight className="w-3 h-3 text-blu" strokeWidth={4} />
        </p>
        <h1 className="text-2xl font-normal text-blu">
          Tell us about your{" "}
          <span className="font-semibold">BP & Cholesterol Levels.</span>
        </h1>
      </div>
      <p className="text-base text-dark-gray mt-1">
        You can choose to skip this step.
      </p>
      <div className="mt-5">
        <p className="text-lg font-medium">Blood Pressure</p>
        <div className="grid grid-cols-3 gap-2 mt-2">
          <div
            className={cn(
              "border rounded-md text-center py-2 cursor-pointer shadow-sm hover:scale-[1.01] transition-all duration-150 select-none",
              bp == "normal" && "bg-light-gray"
            )}
            onClick={() => setBp("normal")}
          >
            Normal
          </div>
          <div
            className={cn(
              "border rounded-md text-center py-2 cursor-pointer shadow-sm hover:scale-[1.01] transition-all duration-150 select-none",
              bp == "high" && "bg-light-gray"
            )}
            onClick={() => setBp("high")}
          >
            High
          </div>
          <div
            className={cn(
              "border rounded-md text-center py-2 cursor-pointer shadow-sm hover:scale-[1.01] transition-all duration-150 select-none",
              bp == "low" && "bg-light-gray"
            )}
            onClick={() => setBp("low")}
          >
            Low
          </div>
        </div>
        <p className="text-lg font-medium mt-2">Cholestrol</p>
        <div className="grid grid-cols-3 gap-2 mt-2">
          <div
            className={cn(
              "border rounded-md text-center py-2 cursor-pointer shadow-sm hover:scale-[1.01] transition-all duration-150 select-none",
              cholesterol == "normal" && "bg-light-gray"
            )}
            onClick={() => setCholesterol("normal")}
          >
            Normal
          </div>
          <div
            className={cn(
              "border rounded-md text-center py-2 cursor-pointer shadow-sm hover:scale-[1.01] transition-all duration-150 select-none",
              cholesterol == "high" && "bg-light-gray"
            )}
            onClick={() => setCholesterol("high")}
          >
            High
          </div>
          <div
            className={cn(
              "border rounded-md text-center py-2 cursor-pointer shadow-sm hover:scale-[1.01] transition-all duration-150 select-none",
              cholesterol == "low" && "bg-light-gray"
            )}
            onClick={() => setCholesterol("low")}
          >
            Low
          </div>
        </div>
        <div className="flex gap-4 items-center mt-7">
          <Button className="flex gap-2 shadow-sm" onClick={() => setFlow(4)}>
            Continue <Check size={16} strokeWidth={3} />
          </Button>
          <p className="flex text-sm">
            press&nbsp;
            <span className="font-semibold items-center flex gap-1">
              Enter <CornerDownLeft size={15} />
            </span>
          </p>
        </div>
      </div>
    </div>
  );

  const bodypartSection = (
    <div className="flex flex-col">
      <div className="flex gap-2">
        <p className="flex items-center gap-1">
          5 <ArrowRight className="w-3 h-3 text-blu" strokeWidth={4} />
        </p>
        <h1 className="text-2xl font-normal text-blu">
          Are you facing issues with any of these{" "}
          <span className="font-semibold">body functions?</span>
        </h1>
      </div>
      <p className="text-base text-dark-gray mt-1">
        You can choose to skip this step.
      </p>
      <div className="mt-5">
        {/* <p className="text-lg font-medium">Body Functions</p> */}
        <PartsSelector
          parts={defaultParts}
          selectedParts={selectedParts}
          setSelectedParts={setSelectedParts}
        />
        <div className="flex gap-4 items-center mt-7">
          <Button
            className="flex gap-2 shadow-sm w-32"
            onClick={() => {
              preditDisesase();
              setFlow(5);
            }}
          >
            Predict <Wand2 size={16} />
          </Button>
          <p className="flex text-sm">
            press&nbsp;
            <span className="font-semibold items-center flex gap-1">
              Enter <CornerDownLeft size={15} />
            </span>
          </p>
        </div>
      </div>
    </div>
  );

  const finalSection = (
    <div className="flex flex-col w-full">
      {predicting ? (
        <>
          <div className="flex gap-2 items-center">
            <h1 className="text-2xl font-normal text-blu">Predicting...</h1>
            <Wand2 className="w-4 h-4 text-blu" />
          </div>
          <p className="text-base text-dark-gray mt-1">
            We&apos;re predicting your disease based on your inputs. This might
            take a while.
          </p>
        </>
      ) : (
        <div className="flex gap-2 items-center">
          <h1 className="text-2xl font-normal text-blu">
            Here&apos;s what we found:
          </h1>
        </div>
      )}

      {result && (
        <>
          <div className="flex flex-col">
            {result[0].length > 0 ? (
              <>
                <p className="text-lg font-medium mt-2">
                  You might have any of these diseases*:
                </p>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {result[0].slice(0, 4).map((disease, i) => (
                    <div
                      key={i}
                      className="border rounded-md text-center py-2 cursor-pointer shadow-sm hover:scale-[1.01] transition-all duration-150 select-none"
                    >
                      {disease}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-dark-gray mt-2">
                  *These are the most likely diseases based on your inputs. We
                  do not guarantee the accuracy of these results. Please consult
                  a doctor for a proper diagnosis.
                </p>
                {result[1].length > 0 && (
                  <>
                    <h1 className="mt-4 text-lg font-medium text-blu">
                      Some Ayurvedic home remedies for these diseases:
                    </h1>
                    <div className="mt-2 flex  gap-2 scrollbar-none overflow-scroll scroll">
                      {result[1].slice(0, 4).map((remedy, i) => (
                        <div
                          key={i}
                          className="flex min-w-[49%] max-h-56 overflow-y-scroll flex-col border rounded-md px-4 pt-3 pb-5 shadow-sm transition-all duration-150 select-none"
                        >
                          <p className="text-lg font-medium mb-1">
                            {remedy[0].split(" ").slice(1).join(" ")}
                          </p>
                          {remedy[1]
                            .split(/Step\s*\d+: /)
                            .filter(Boolean)
                            .map((remedy, i) => {
                              return (
                                <p key={i} className="text-dark-gray">
                                  <span className="font-semibold">
                                    Step {i + 1}:{" "}
                                  </span>{" "}
                                  {remedy}
                                </p>
                              );
                            })}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <p className="text-lg font-medium mt-5">
                You are healthy! No diseases found.
              </p>
            )}
          </div>
        </>
      )}

      <div className="mt-5">
        {!predicting && (
          <div className="flex gap-4 items-center mt-3">
            <Button
              className="flex gap-2 shadow-sm w-32"
              onClick={() => {
                setAge(undefined);
                setGender(undefined);
                setSymptoms([]);
                setBp("normal");
                setCholesterol("normal");
                setSelectedParts([]);
                setFlow(0);
                setPredicting(false);
                setResult(undefined);
              }}
            >
              Start Again <RotateCcw size={16} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  const getNextFlow = (flow: number) => {
    switch (flow) {
      case 0:
        return ageSection;
      case 1:
        return genderSection;
      case 2:
        return commonSymptoms;
      case 3:
        return bpCholesterolSection;
      case 4:
        return bodypartSection;
      case 5:
        return finalSection;
      default:
        return ageSection;
    }
  };

  return (
    <section className="flex items-center justify-between max-w-5xl mx-auto h-screen relative">
      <Link className="mt-12 absolute top-0" href="/">
        <div className="flex gap-2">
          <HeartPulse className="w-8 h-8 text-blu" />
          <h1 className="text-2xl font-semibold text-blu">Sehat</h1>
        </div>
      </Link>
      {getNextFlow(flow)}
      {flow != 5 && (
        <div>
          <Lottie
            className={cn(
              "w-[450px] mt-auto",
              flow == 2 && "w-[350px]",
              flow == 3 && "w-[350px]",
              flow == 4 && "w-[300px]"
            )}
            animationData={getNextLottie(flow)}
            loop
          />
        </div>
      )}
    </section>
  );
}

const getNextLottie = (flow: number) => {
  switch (flow) {
    case 0:
      return require("@/components/age.json");
    case 1:
      return require("@/components/gender.json");
    case 2:
      return require("@/components/common.json");
    case 3:
      return require("@/components/bp.json");
    case 4:
      return require("@/components/body.json");
    default:
      ``;
      return require("@/components/age.json");
  }
};
