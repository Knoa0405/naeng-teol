"use client";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

const tutorialSteps = [
  {
    title: "냉장고 털기 시작하기",
    desc: "냉장고에 남은 식재료를 입력하거나 사진을 업로드해보세요.",
  },
  {
    title: "AI 레시피 생성",
    desc: "AI가 입력한 재료로 레시피를 추천해줍니다.",
  },
  {
    title: "레시피 저장 & 공유",
    desc: "마음에 드는 레시피는 저장하거나 커뮤니티에 공유할 수 있어요.",
  },
];

export default function TutorialModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    // localStorage에 튜토리얼 본 기록이 없으면 자동 오픈
    if (!localStorage.getItem("tutorialSeen")) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem("tutorialSeen", "true");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>{tutorialSteps[step].title}</DialogTitle>
        <DialogDescription>{tutorialSteps[step].desc}</DialogDescription>
        <div className="mt-4 flex justify-between">
          <Button
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
            variant="outline"
          >
            이전
          </Button>
          {step < tutorialSteps.length - 1 ? (
            <Button onClick={() => setStep(s => s + 1)}>다음</Button>
          ) : (
            <Button onClick={handleClose}>튜토리얼 종료</Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
