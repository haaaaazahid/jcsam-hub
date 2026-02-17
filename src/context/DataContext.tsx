import React, { createContext, useContext, useState } from "react";
import { collegesData, playersData, schedulesData, resultsData, noticesData, galleryData } from "@/data/dummyData";
import { committeeData, CommitteeMember } from "@/data/committeeData";
import { sportsData, Sport } from "@/data/sportsData";
import type { College, Player, Schedule, Result, Notice, GalleryImage } from "@/data/dummyData";

interface DataContextType {
  sports: Sport[];
  setSports: React.Dispatch<React.SetStateAction<Sport[]>>;
  colleges: College[];
  setColleges: React.Dispatch<React.SetStateAction<College[]>>;
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  schedules: Schedule[];
  setSchedules: React.Dispatch<React.SetStateAction<Schedule[]>>;
  results: Result[];
  setResults: React.Dispatch<React.SetStateAction<Result[]>>;
  notices: Notice[];
  setNotices: React.Dispatch<React.SetStateAction<Notice[]>>;
  gallery: GalleryImage[];
  setGallery: React.Dispatch<React.SetStateAction<GalleryImage[]>>;
  committee: CommitteeMember[];
  setCommittee: React.Dispatch<React.SetStateAction<CommitteeMember[]>>;
}

const DataContext = createContext<DataContextType | null>(null);

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sports, setSports] = useState<Sport[]>(sportsData);
  const [colleges, setColleges] = useState<College[]>(collegesData);
  const [players, setPlayers] = useState<Player[]>(playersData);
  const [schedules, setSchedules] = useState<Schedule[]>(schedulesData);
  const [results, setResults] = useState<Result[]>(resultsData);
  const [notices, setNotices] = useState<Notice[]>(noticesData);
  const [gallery, setGallery] = useState<GalleryImage[]>(galleryData);
  const [committee, setCommittee] = useState<CommitteeMember[]>(committeeData);

  return (
    <DataContext.Provider value={{ sports, setSports, colleges, setColleges, players, setPlayers, schedules, setSchedules, results, setResults, notices, setNotices, gallery, setGallery, committee, setCommittee }}>
      {children}
    </DataContext.Provider>
  );
};
