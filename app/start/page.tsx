"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Lottie from "lottie-react";
import { ArrowRight, Check, CornerDownLeft, HeartPulse } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FaMale, FaFemale } from "react-icons/fa";
export default function Welcome() {
  const [age, setAge] = useState<string | undefined>(undefined);
  const [gender, setGender] = useState<string | undefined>(undefined);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [bp, setBp] = useState<string | undefined>("normal");
  const [cholesterol, setCholesterol] = useState<string | undefined>("normal");
  const [flow, setFlow] = useState<number>(0);

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
          onKeyDown={(e) => e.key === "Enter" && setFlow(1)}
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
          defaultValue="male"
          onValueChange={(value) => setGender(value)}
          value={gender}
        >
          <TabsList className="flex justify-between gap-4 bg-transparent px-0 text-primary">
            <TabsTrigger
              value="male"
              className='flex w-full items-center justify-center gap-2 rounded-md border px-3 py-4  data-[state="active"]:border-primary'
              onKeyDown={(e) => e.key === "Enter" && setFlow(2)}
            >
              <FaMale size={20} />
              Male
            </TabsTrigger>
            <TabsTrigger
              value="female"
              className='flex w-full items-center justify-center gap-2 rounded-md border px-3 py-4 data-[state="active"]:border-primary'
              onKeyDown={(e) => e.key === "Enter" && setFlow(2)}
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
        You can select multiple symptoms.
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
            onKeyDown={(e) => e.key === "Enter" && setFlow(3)}
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
      <div>
        <Lottie
          className={cn(
            "w-[450px] mt-auto",
            flow == 2 && "w-[350px]",
            flow == 3 && "w-[350px]"
          )}
          animationData={getNextLottie(flow)}
          loop
        />
      </div>
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
    default:
      return require("@/components/age.json");
  }
};
